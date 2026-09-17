/* NEMO site: живые частицы на canvas */
(function () {
  'use strict';

  var RED = '229,50,45';
  var GRAY = '120,120,132';
  var LINK_DIST = 130;
  var MOUSE_R = 170;
  var MAX_DPR = 2;

  var reduced = false;
  try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { /* ignore */ }
  var fine = true;
  try { fine = window.matchMedia('(pointer: fine)').matches; } catch (e) { /* ignore */ }

  var cv = document.createElement('canvas');
  cv.id = 'fx';
  cv.setAttribute('aria-hidden', 'true');
  document.body.insertBefore(cv, document.body.firstChild);
  var g = cv.getContext('2d');

  var W = 0, H = 0, dpr = 1;
  var pts = [];
  var mx = -9999, my = -9999;
  var running = true;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    W = window.innerWidth;
    H = window.innerHeight;
    cv.width = Math.floor(W * dpr);
    cv.height = Math.floor(H * dpr);
    cv.style.width = W + 'px';
    cv.style.height = H + 'px';
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
  }

  function seed() {
    var n = Math.max(45, Math.min(130, Math.floor((W * H) / 16000)));
    pts = [];
    for (var i = 0; i < n; i++) {
      pts.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 0.8 + Math.random() * 1.5,
        red: Math.random() < 0.22,
        a: 0.25 + Math.random() * 0.45
      });
    }
  }

  function step() {
    g.clearRect(0, 0, W, H);

    var i, j, p, q, dx, dy, d2;
    for (i = 0; i < pts.length; i++) {
      p = pts[i];
      if (!reduced) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = W + 10; else if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10; else if (p.y > H + 10) p.y = -10;
        // курсор отталкивает и подсвечивает
        dx = p.x - mx;
        dy = p.y - my;
        d2 = dx * dx + dy * dy;
        if (d2 < MOUSE_R * MOUSE_R && d2 > 1) {
          var d = Math.sqrt(d2);
          var f = (MOUSE_R - d) / MOUSE_R;
          p.x += (dx / d) * f * 1.6;
          p.y += (dy / d) * f * 1.6;
        }
      }
      var glow = 0;
      if (fine) {
        dx = p.x - mx; dy = p.y - my;
        var md = Math.sqrt(dx * dx + dy * dy);
        if (md < MOUSE_R) glow = (MOUSE_R - md) / MOUSE_R;
      }
      var col = p.red ? RED : GRAY;
      g.beginPath();
      g.arc(p.x, p.y, p.r + glow * 1.4, 0, 6.2832);
      g.fillStyle = 'rgba(' + col + ',' + Math.min(1, p.a + glow * 0.5).toFixed(3) + ')';
      g.fill();
    }

    // связи
    g.lineWidth = 1;
    for (i = 0; i < pts.length; i++) {
      p = pts[i];
      for (j = i + 1; j < pts.length; j++) {
        q = pts[j];
        dx = p.x - q.x;
        if (dx > LINK_DIST || dx < -LINK_DIST) continue;
        dy = p.y - q.y;
        if (dy > LINK_DIST || dy < -LINK_DIST) continue;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > LINK_DIST) continue;
        g.beginPath();
        g.moveTo(p.x, p.y);
        g.lineTo(q.x, q.y);
        g.strokeStyle = 'rgba(' + RED + ',' + ((1 - dist / LINK_DIST) * 0.14).toFixed(3) + ')';
        g.stroke();
      }
    }

    if (!reduced && running) requestAnimationFrame(step);
  }

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX;
    my = e.clientY;
  });
  document.addEventListener('mouseleave', function () {
    mx = my = -9999;
  });
  document.addEventListener('visibilitychange', function () {
    if (reduced) return;
    if (document.hidden) {
      running = false;
    } else if (!running) {
      running = true;
      requestAnimationFrame(step);
    }
  });
  window.addEventListener('resize', resize);

  resize();
  step();
})();
