export const SPARK_BADGE_MARKUP = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style>
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  
  html, body {
    width: 100%; height: 100%; overflow: hidden;
    background: transparent;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }

  .rain-container {
    position: fixed; inset: 0;
    overflow: hidden;
    pointer-events: none;
  }

  .rain-drop {
    position: absolute;
    top: -60px;
    width: 2px;
    background: linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.15) 100%);
    border-radius: 0 0 2px 2px;
    animation: rain-fall linear infinite;
  }

  @keyframes rain-fall {
    0% { transform: translateY(-60px) scaleY(0.8); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 0.6; }
    100% { transform: translateY(calc(100vh + 60px)) scaleY(1.2); opacity: 0; }
  }

  .glow-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.12;
    animation: orb-drift 12s ease-in-out infinite alternate;
  }

  @keyframes orb-drift {
    0% { transform: translate(0, 0) scale(1); }
    100% { transform: translate(30px, -20px) scale(1.15); }
  }

  .badge-wrapper {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    z-index: 10;
  }

  .spark-badge-card {
    width: 280px;
    padding: 24px;
    border-radius: 16px;
    background: linear-gradient(145deg, rgba(30,41,59,0.7) 0%, rgba(15,23,42,0.8) 100%);
    border: 1px solid rgba(255,255,255,0.08);
    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    opacity: 0;
    transform: translateY(20px) scale(0.95);
    animation: badge-enter 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.5s forwards;
  }

  @keyframes badge-enter {
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  .badge-header {
    display: flex; align-items: center; gap: 12px; margin-bottom: 16px;
  }

  .badge-icon {
    width: 44px; height: 44px; border-radius: 12px;
    background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 12px rgba(34,197,94,0.3);
  }

  .badge-icon svg { width: 22px; height: 22px; fill: none; stroke: white; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }

  .badge-title { color: #f8fafc; font-size: 14px; font-weight: 600; letter-spacing: -0.01em; }
  .badge-subtitle { color: rgba(148,163,184,0.8); font-size: 11px; margin-top: 2px; }

  .badge-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%);
    margin: 14px 0;
  }

  .badge-stats { display: flex; gap: 16px; }

  .badge-stat-value {
    color: #f1f5f9;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  .badge-stat-label {
    color: rgba(148,163,184,0.6);
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-top: 2px;
  }

  .badge-status {
    margin-top: 14px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .badge-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: #22c55e;
    box-shadow: 0 0 8px rgba(34,197,94,0.6);
    animation: pulse-dot 2s ease-in-out infinite;
  }

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(0.85); }
  }

  .badge-status-text {
    color: rgba(34,197,94,0.9);
    font-size: 10px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
</style>
</head>
<body>
<div class="rain-container">
  <div class="glow-orb" style="width:300px;height:300px;background:#22c55e;top:20%;left:60%;animation-delay:0s;"></div>
  <div class="glow-orb" style="width:250px;height:250px;background:#3b82f6;bottom:30%;left:30%;animation-delay:-4s;"></div>
  <div class="glow-orb" style="width:200px;height:200px;background:#8b5cf6;top:60%;right:20%;animation-delay:-8s;"></div>
</div>
<div class="badge-wrapper">
  <div class="spark-badge-card">
    <div class="badge-header">
      <div class="badge-icon">
        <svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      </div>
      <div>
        <div class="badge-title">Verified Skills</div>
        <div class="badge-subtitle">Lead2Learn Credential</div>
      </div>
    </div>
    <div class="badge-divider"></div>
    <div class="badge-stats">
      <div>
        <div class="badge-stat-value">340</div>
        <div class="badge-stat-label">Skills</div>
      </div>
      <div>
        <div class="badge-stat-value">91%</div>
        <div class="badge-stat-label">Match</div>
      </div>
      <div>
        <div class="badge-stat-value">12</div>
        <div class="badge-stat-label">Badges</div>
      </div>
    </div>
    <div class="badge-status">
      <div class="badge-dot"></div>
      <div class="badge-status-text">Evidence-backed</div>
    </div>
  </div>
</div>
<script>
  (function() {
    var container = document.querySelector('.rain-container');
    var count = 80;
    for (var i = 0; i < count; i++) {
      var drop = document.createElement('div');
      drop.className = 'rain-drop';
      drop.style.left = Math.random() * 100 + '%';
      drop.style.height = (Math.random() * 40 + 20) + 'px';
      drop.style.animationDuration = (Math.random() * 1.5 + 1) + 's';
      drop.style.animationDelay = (Math.random() * 3) + 's';
      drop.style.opacity = Math.random() * 0.5 + 0.1;
      container.appendChild(drop);
    }
  })();
</script>
</body>
</html>`;
