/**
 * NEMO site worker.
 * Static landing lives in ./public (assets binding).
 * Dynamic routes:
 *   GET /api/latest   -> latest GitHub release (tag, assets, sizes), edge-cached 10 min
 *   GET /dl/setup     -> 302 to Setup exe of latest release
 *   GET /dl/portable  -> 302 to portable exe of latest release
 *   GET /dl/source    -> 302 to source .zip (codeload) of latest tag
 * Binaries stream from GitHub — worker only redirects, no bandwidth spent.
 */

const REPO = 'requiredhaun/NEMO-Launcher'
const API = `https://api.github.com/repos/${REPO}/releases/latest`
const RELEASES_PAGE = `https://github.com/${REPO}/releases`
const CACHE_TTL = 600

interface Env {
  ASSETS: Fetcher
}

interface Asset {
  kind: 'setup' | 'portable' | 'other'
  name: string
  size: number
  url: string
}

interface Latest {
  tag: string
  name: string
  published: string
  page: string
  assets: Asset[]
}

function kindOf(name: string): Asset['kind'] {
  const n = name.toLowerCase()
  if (!n.endsWith('.exe')) return 'other'
  if (n.includes('setup')) return 'setup'
  if (n.includes('portable')) return 'portable'
  return 'other'
}

async function fetchLatest(): Promise<Latest | null> {
  const res = await fetch(API, {
    headers: { 'User-Agent': 'nemo-site', Accept: 'application/vnd.github+json' },
  })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`github: ${res.status}`)
  const j: any = await res.json()
  const assets: Asset[] = ((j?.assets || []) as any[])
    .filter((a) => a?.browser_download_url)
    .map((a) => ({ kind: kindOf(String(a.name || '')), name: String(a.name), size: Number(a.size) || 0, url: String(a.browser_download_url) }))
  return {
    tag: String(j?.tag_name || ''),
    name: String(j?.name || j?.tag_name || ''),
    published: String(j?.published_at || ''),
    page: String(j?.html_url || RELEASES_PAGE),
    assets,
  }
}

async function getLatest(req: Request, env: Env, ctx: ExecutionContext): Promise<Latest | null> {
  const cache = caches.default
  const key = new Request(new URL('/api/latest', req.url).toString())
  const hit = await cache.match(key)
  if (hit) {
    try {
      return (await hit.json()) as Latest
    } catch {
      /* refetch */
    }
  }
  const data = await fetchLatest()
  if (data) {
    const res = new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json', 'Cache-Control': `public, max-age=${CACHE_TTL}` },
    })
    ctx.waitUntil(cache.put(key, res.clone()))
  }
  return data
}

function redirect(url: string, status = 302): Response {
  return new Response(null, { status, headers: { Location: url, 'Cache-Control': 'no-store' } })
}

export default {
  async fetch(req: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(req.url)

    if (url.pathname === '/api/latest') {
      try {
        const data = await getLatest(req, env, ctx)
        if (!data) return Response.json({ tag: '', assets: [], page: RELEASES_PAGE }, { status: 200 })
        return Response.json(data)
      } catch (e: any) {
        return Response.json({ error: String(e?.message || e) }, { status: 502 })
      }
    }

    if (url.pathname === '/dl/source') {
      try {
        const data = await getLatest(req, env, ctx)
        if (!data?.tag) return redirect(RELEASES_PAGE)
        return redirect(`https://codeload.github.com/${REPO}/zip/refs/tags/${data.tag}`)
      } catch {
        return redirect(RELEASES_PAGE)
      }
    }

    if (url.pathname === '/dl/setup' || url.pathname === '/dl/portable') {
      const want = url.pathname === '/dl/setup' ? 'setup' : 'portable'
      try {
        const data = await getLatest(req, env, ctx)
        const hit = data?.assets.find((a) => a.kind === want) || data?.assets.find((a) => a.kind !== 'other')
        return redirect(hit?.url || data?.page || RELEASES_PAGE)
      } catch {
        return redirect(RELEASES_PAGE)
      }
    }

    return env.ASSETS.fetch(req)
  },
};
