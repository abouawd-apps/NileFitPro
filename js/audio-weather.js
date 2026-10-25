// NileFitPro - Realistic Sky/Weather Engine (Auto Time-Sync: Fajr Dawn, Morning Sunrise, Daytime Sun, Evening Sunset, Night Moon & Stars), Optional Clouds, Heavy Rain, Web Audio SFX, Nature Sounds Mixer, Cairo Radio & Live Hijri/Gregorian Clock

(function () {
  // skyMode: 'auto' (default - switches automatically by clock time) or manual override: 'fajr' | 'sunrise' | 'day' | 'sunset' | 'night'
  let skyMode = 'auto';
  let currentSkyPhase = 'night'; // 'fajr' | 'sunrise' | 'day' | 'sunset' | 'night'
  let isDarkMode = true;
  let cloudsEnabled = true;
  let rainEnabled = false;
  let sfxEnabled = true;

  const SKY_PHASE_LABELS = {
    fajr: '🌌 وقت الفجر (نجوم الفجر وشفق الصباح)',
    sunrise: '🌅 شروق الشمس في الصباح',
    day: '☀️ النهار الساطع (شمس مشرقة)',
    sunset: '🌇 غروب الشمس وقت الغروب',
    night: '🌙 الليل (قمر واقعي ونجوم متلألئة)'
  };

  function detectPhaseFromTime(dateObj) {
    const h = dateObj.getHours();
    const m = dateObj.getMinutes();
    const totalMins = h * 60 + m;

    // 04:00 (240) to 05:59 (359) -> Fajr / Dawn (الفجر)
    if (totalMins >= 240 && totalMins < 360) {
      return 'fajr';
    }
    // 06:00 (360) to 08:29 (509) -> Sunrise (شروق الشمس في الصباح)
    if (totalMins >= 360 && totalMins < 510) {
      return 'sunrise';
    }
    // 08:30 (510) to 16:44 (1004) -> Daytime (النهار والشمس)
    if (totalMins >= 510 && totalMins < 1005) {
      return 'day';
    }
    // 16:45 (1005) to 18:29 (1109) -> Sunset (غروب الشمس وقت الغروب)
    if (totalMins >= 1005 && totalMins < 1110) {
      return 'sunset';
    }
    // 18:30 (1110) to 03:59 (239) -> Night (الليل والقمر والنجوم)
    return 'night';
  }

  function applySkyPhaseAndTheme(phase) {
    currentSkyPhase = phase;
    // Night, Fajr, and Sunset use dark glass UI theme for optimal contrast; Sunrise and Day use light UI theme
    isDarkMode = (phase === 'night' || phase === 'fajr' || phase === 'sunset');
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.setAttribute('data-sky', phase);

    const modeLabel = document.getElementById('theme-mode-icon');
    if (modeLabel) {
      modeLabel.textContent = isDarkMode
        ? `🌙 الدارك مود مفعّل (${SKY_PHASE_LABELS[phase]})`
        : `☀️ الوضع النهاري (${SKY_PHASE_LABELS[phase]})`;
    }

    const autoStatusEl = document.getElementById('sky-auto-status-badge');
    if (autoStatusEl) {
      autoStatusEl.textContent = skyMode === 'auto'
        ? `⏱️ تلقائي حسب الساعة الآن: ${SKY_PHASE_LABELS[phase]}`
        : `🎨 معاينة يدوية للخلفية: ${SKY_PHASE_LABELS[phase]}`;
    }

    const selectEl = document.getElementById('sky-phase-select');
    if (selectEl && selectEl.value !== skyMode) {
      selectEl.value = skyMode;
    }
  }

  // --- 1. LIVE CLOCK (AM/PM with Seconds) + GREGORIAN & HIJRI DATES + AUTO SKY SYNC ---
  function updateLiveDateTime() {
    const now = new Date();

    // Auto-switch sky phase based on clock time if in 'auto' mode
    if (skyMode === 'auto') {
      const detected = detectPhaseFromTime(now);
      if (detected !== currentSkyPhase || !document.documentElement.getAttribute('data-sky')) {
        applySkyPhaseAndTheme(detected);
      } else {
        const autoStatusEl = document.getElementById('sky-auto-status-badge');
        if (autoStatusEl) {
          autoStatusEl.textContent = `⏱️ تلقائي حسب الساعة الآن: ${SKY_PHASE_LABELS[currentSkyPhase]}`;
        }
      }
    }

    // Time with Hours, Minutes, Seconds, AM/PM
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampmAr = hours >= 12 ? 'م (PM)' : 'ص (AM)';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const strHours = String(hours).padStart(2, '0');

    const clockEl = document.getElementById('live-clock-display');
    if (clockEl) {
      clockEl.textContent = `${strHours}:${minutes}:${seconds} ${ampmAr}`;
    }

    // Gregorian Date
    try {
      const gregFmt = new Intl.DateTimeFormat('ar-EG', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(now);
      const gregEl = document.getElementById('gregorian-date-display');
      if (gregEl) gregEl.textContent = `📅 الميلادي: ${gregFmt}`;
    } catch (e) {}

    // Hijri Date
    try {
      const hijriFmt = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(now);
      const hijriDayNumStr = new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', {
        day: 'numeric'
      }).format(now);
      const hijriDayNum = parseInt(hijriDayNumStr, 10) || 1;

      const hijriEl = document.getElementById('hijri-date-display');
      if (hijriEl) hijriEl.textContent = `🌙 الهجري: ${hijriFmt}`;

      // Highlight fasting status today
      const dayOfWeek = now.getDay(); // 0 Sun, 1 Mon, 4 Thu, 5 Fri
      const fastingStatusEl = document.getElementById('today-fasting-badge');
      if (fastingStatusEl) {
        const badges = [];
        if (dayOfWeek === 5) badges.push('✨ اليوم الجمعة: لا تنسَ سورة الكهف والصلاة على النبي ﷺ');
        if (dayOfWeek === 1) badges.push('🌟 اليوم الإثنين: يوم عرض الأعمال (سُنّة الصيام)');
        if (dayOfWeek === 4) badges.push('🌟 اليوم الخميس: يوم عرض الأعمال (سُنّة الصيام)');
        if ([13, 14, 15].includes(hijriDayNum)) {
          badges.push(`🌕 اليوم (${hijriDayNum}) من الأيام البيض المباركة لصيام ثلاثة أيام من الشهر الهجري!`);
        }
        if (badges.length > 0) {
          fastingStatusEl.textContent = badges.join(' | ');
          fastingStatusEl.style.display = 'inline-flex';
        } else {
          fastingStatusEl.textContent = `🌙 اليوم ${hijriDayNum} هجري — تذكير بصيام الإثنين والخميس والأيام البيض (13 و14 و15)`;
        }
      }
    } catch (e) {}
  }

  setInterval(updateLiveDateTime, 1000);
  window.addEventListener('DOMContentLoaded', updateLiveDateTime);

  // --- 2. REALISTIC SKY, DAWN, SUNRISE, DAY SUN, SUNSET, NIGHT MOON/STARS, CLOUDS & RAIN CANVAS ENGINE ---
  let canvas, ctx;
  const stars = [];
  const clouds = [];
  const raindrops = [];
  let shootingStar = null;

  function initSkyObjects() {
    stars.length = 0;
    for (let i = 0; i < 230; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random() * 0.76,
        r: Math.random() * 1.95 + 0.4,
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.03 + 0.008,
        phase: Math.random() * Math.PI * 2
      });
    }

    clouds.length = 0;
    for (let i = 0; i < 9; i++) {
      clouds.push({
        x: Math.random() * 1700,
        y: 45 + Math.random() * 250,
        scale: 0.65 + Math.random() * 0.9,
        speed: 0.18 + Math.random() * 0.34,
        opacity: 0.48 + Math.random() * 0.35
      });
    }

    raindrops.length = 0;
    for (let i = 0; i < 290; i++) {
      raindrops.push({
        x: Math.random() * 1920,
        y: Math.random() * 1080,
        len: 16 + Math.random() * 22,
        speed: 14 + Math.random() * 10,
        wind: -2.5
      });
    }
  }

  function drawSkyBackgroundGradient(w, h, phase) {
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    if (phase === 'fajr') {
      // Fajr Dawn: Deep starry indigo top -> twilight royal purple -> rose-amber dawn horizon
      grad.addColorStop(0, '#04081a');
      grad.addColorStop(0.45, '#17153b');
      grad.addColorStop(0.76, '#4c1d95');
      grad.addColorStop(0.92, '#9a3412');
      grad.addColorStop(1, '#f59e0b');
    } else if (phase === 'sunrise') {
      // Morning Sunrise: Crisp morning blue -> soft sky cyan -> warm golden-peach horizon
      grad.addColorStop(0, '#1e40af');
      grad.addColorStop(0.4, '#38bdf8');
      grad.addColorStop(0.75, '#fdba74');
      grad.addColorStop(0.92, '#fb923c');
      grad.addColorStop(1, '#fef08a');
    } else if (phase === 'day') {
      // Bright Daytime Sky
      grad.addColorStop(0, '#0284c7');
      grad.addColorStop(0.55, '#38bdf8');
      grad.addColorStop(1, '#e0f2fe');
    } else if (phase === 'sunset') {
      // Sunset (Maghrib): Deep dusk violet-indigo -> crimson-magenta -> fiery orange-gold horizon
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(0.35, '#4c1d95');
      grad.addColorStop(0.65, '#be123c');
      grad.addColorStop(0.86, '#ea580c');
      grad.addColorStop(1, '#fbbf24');
    } else {
      // Night Mode: Deep cosmic midnight sky
      grad.addColorStop(0, '#020617');
      grad.addColorStop(0.55, '#0f172a');
      grad.addColorStop(1, '#1e293b');
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  }

  function drawTwinklingStars(w, h, timestamp, intensityFactor = 1.0) {
    stars.forEach(s => {
      const twinkle = 0.35 + 0.65 * Math.abs(Math.sin(timestamp * 0.0018 * s.speed * 40 + s.phase));
      const alpha = s.alpha * twinkle * intensityFactor;
      if (alpha <= 0.02) return;
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.beginPath();
      ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function drawRealisticMoon(w, h, yRatio = 0.17, alphaMultiplier = 1.0) {
    const mx = w * 0.82;
    const my = h * yRatio;
    const radius = Math.min(w, h) * 0.068;

    ctx.save();
    ctx.globalAlpha = alphaMultiplier;

    // Outer atmospheric lunar glow
    const glow = ctx.createRadialGradient(mx, my, radius * 0.5, mx, my, radius * 4.2);
    glow.addColorStop(0, 'rgba(254, 249, 195, 0.38)');
    glow.addColorStop(0.35, 'rgba(186, 230, 253, 0.14)');
    glow.addColorStop(1, 'rgba(15, 23, 42, 0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(mx, my, radius * 4.2, 0, Math.PI * 2);
    ctx.fill();

    // Moon sphere surface
    const surf = ctx.createRadialGradient(mx - radius * 0.25, my - radius * 0.25, radius * 0.1, mx, my, radius);
    surf.addColorStop(0, '#fefce8');
    surf.addColorStop(0.65, '#fde68a');
    surf.addColorStop(1, '#ca8a04');
    ctx.fillStyle = surf;
    ctx.beginPath();
    ctx.arc(mx, my, radius, 0, Math.PI * 2);
    ctx.fill();

    // Realistic Lunar Maria / Craters details
    ctx.fillStyle = 'rgba(161, 98, 7, 0.22)';
    const craters = [
      { dx: -0.28, dy: -0.18, r: 0.26 },
      { dx: 0.22, dy: -0.25, r: 0.19 },
      { dx: 0.15, dy: 0.24, r: 0.28 },
      { dx: -0.32, dy: 0.28, r: 0.15 },
      { dx: 0.0, dy: -0.05, r: 0.18 }
    ];
    craters.forEach(c => {
      ctx.beginPath();
      ctx.arc(mx + c.dx * radius, my + c.dy * radius, c.r * radius, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.restore();
  }

  function drawRealisticSun(w, h, time, phase) {
    // Position & colors depend on whether it's Sunrise, High Day, or Sunset!
    let sx = w * 0.82;
    let sy = h * 0.17;
    let radius = Math.min(w, h) * 0.072;
    let coreMiddle = '#fef08a';
    let coreEdge = '#f59e0b';
    let glowOuter = 'rgba(251, 146, 60, 0.22)';

    if (phase === 'sunrise') {
      sx = w * 0.78;
      sy = h * 0.66; // Rising near eastern horizon
      radius = Math.min(w, h) * 0.088;
      coreMiddle = '#fde047';
      coreEdge = '#ea580c';
      glowOuter = 'rgba(249, 115, 22, 0.38)';
    } else if (phase === 'sunset') {
      sx = w * 0.22;
      sy = h * 0.68; // Setting near western horizon
      radius = Math.min(w, h) * 0.094;
      coreMiddle = '#fb923c';
      coreEdge = '#dc2626';
      glowOuter = 'rgba(225, 29, 72, 0.42)';
    }

    // Solar Corona & warm sky scattering
    const glow = ctx.createRadialGradient(sx, sy, radius * 0.4, sx, sy, radius * 5.8);
    glow.addColorStop(0, 'rgba(255, 251, 235, 0.95)');
    glow.addColorStop(0.22, 'rgba(253, 224, 71, 0.55)');
    glow.addColorStop(0.55, glowOuter);
    glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(sx, sy, radius * 5.8, 0, Math.PI * 2);
    ctx.fill();

    // Rotating sunbeams
    ctx.save();
    ctx.translate(sx, sy);
    ctx.rotate(time * 0.00015);
    ctx.strokeStyle = phase === 'sunset' ? 'rgba(251, 146, 60, 0.26)' : 'rgba(254, 240, 138, 0.24)';
    ctx.lineWidth = 4;
    for (let i = 0; i < 12; i++) {
      ctx.rotate(Math.PI / 6);
      ctx.beginPath();
      ctx.moveTo(radius * 1.15, 0);
      ctx.lineTo(radius * 2.8, 0);
      ctx.stroke();
    }
    ctx.restore();

    // Sun core disc
    const core = ctx.createRadialGradient(sx, sy, radius * 0.1, sx, sy, radius);
    core.addColorStop(0, '#ffffff');
    core.addColorStop(0.6, coreMiddle);
    core.addColorStop(1, coreEdge);
    ctx.fillStyle = core;
    ctx.beginPath();
    ctx.arc(sx, sy, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawVolumetricCloud(c, phase) {
    ctx.save();
    ctx.translate(c.x, c.y);
    ctx.scale(c.scale, c.scale);

    let baseColor, shadowColor;
    if (phase === 'night' || phase === 'fajr') {
      baseColor = `rgba(148, 163, 184, ${c.opacity * 0.42})`;
      shadowColor = `rgba(30, 41, 59, ${c.opacity * 0.48})`;
    } else if (phase === 'sunrise') {
      baseColor = `rgba(255, 247, 237, ${c.opacity * 0.85})`;
      shadowColor = `rgba(251, 146, 60, ${c.opacity * 0.55})`;
    } else if (phase === 'sunset') {
      baseColor = `rgba(254, 215, 170, ${c.opacity * 0.72})`;
      shadowColor = `rgba(190, 18, 60, ${c.opacity * 0.52})`;
    } else {
      baseColor = `rgba(255, 255, 255, ${c.opacity * 0.9})`;
      shadowColor = `rgba(203, 213, 225, ${c.opacity * 0.65})`;
    }

    const puffs = [
      { x: 0, y: 0, r: 46 },
      { x: 42, y: -14, r: 54 },
      { x: 90, y: -6, r: 48 },
      { x: 130, y: 6, r: 38 },
      { x: -38, y: 10, r: 36 }
    ];

    ctx.fillStyle = shadowColor;
    puffs.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y + 8, p.r, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.fillStyle = baseColor;
    puffs.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.restore();
  }

  function renderSkyLoop(timestamp) {
    if (!canvas || !ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // 1. Sky Background Gradient for current phase
    drawSkyBackgroundGradient(w, h, currentSkyPhase);

    // 2. Celestial Bodies per Phase
    if (currentSkyPhase === 'night') {
      drawTwinklingStars(w, h, timestamp, 1.0);

      // Occasional shooting star
      if (!shootingStar && Math.random() < 0.004) {
        shootingStar = {
          x: Math.random() * w * 0.7,
          y: Math.random() * h * 0.35,
          vx: 9,
          vy: 4,
          life: 1.0
        };
      }
      if (shootingStar) {
        ctx.strokeStyle = `rgba(254, 249, 195, ${shootingStar.life})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(shootingStar.x - 55, shootingStar.y - 24);
        ctx.stroke();
        shootingStar.x += shootingStar.vx;
        shootingStar.y += shootingStar.vy;
        shootingStar.life -= 0.03;
        if (shootingStar.life <= 0) shootingStar = null;
      }

      drawRealisticMoon(w, h, 0.17, 1.0);
    } else if (currentSkyPhase === 'fajr') {
      // Fajr: Dawn stars in upper sky + gentle moon + dawn glow at horizon
      drawTwinklingStars(w, h * 0.75, timestamp, 0.72);
      drawRealisticMoon(w, h, 0.24, 0.82);
    } else if (currentSkyPhase === 'sunrise') {
      // Sunrise: Morning sun rising on eastern horizon
      drawRealisticSun(w, h, timestamp, 'sunrise');
    } else if (currentSkyPhase === 'day') {
      // Daytime: Bright high sun
      drawRealisticSun(w, h, timestamp, 'day');
    } else if (currentSkyPhase === 'sunset') {
      // Sunset: Early evening stars at very top + dramatic setting sun on horizon
      drawTwinklingStars(w, h * 0.45, timestamp, 0.38);
      drawRealisticSun(w, h, timestamp, 'sunset');
    }

    // 3. Optional Realistic Clouds in ANY mode
    if (cloudsEnabled) {
      clouds.forEach(c => {
        c.x += c.speed;
        if (c.x - 120 > w) c.x = -250;
        drawVolumetricCloud(c, currentSkyPhase);
      });
    }

    // 4. Heavy Rain Effect
    if (rainEnabled) {
      ctx.strokeStyle = isDarkMode ? 'rgba(186, 230, 253, 0.55)' : 'rgba(30, 58, 138, 0.42)';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      raindrops.forEach(r => {
        ctx.moveTo(r.x, r.y);
        ctx.lineTo(r.x + r.wind, r.y + r.len);
        r.x += r.wind;
        r.y += r.speed;
        if (r.y > h) {
          r.y = -25;
          r.x = Math.random() * w;
        }
        if (r.x < 0) r.x = w;
      });
      ctx.stroke();
    }

    requestAnimationFrame(renderSkyLoop);
  }

  function setupSkyCanvas() {
    canvas = document.getElementById('sky-weather-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    initSkyObjects();

    // Initial auto time detection
    const initialPhase = detectPhaseFromTime(new Date());
    applySkyPhaseAndTheme(initialPhase);
    requestAnimationFrame(renderSkyLoop);
  }

  window.addEventListener('DOMContentLoaded', setupSkyCanvas);

  // --- 3. WEB AUDIO API: UI SFX & REALISTIC NATURE SOUNDS SYNTHESIZER ---
  let audioCtx = null;
  function getAudioCtx() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playUiSound(type) {
    if (!sfxEnabled) return;
    try {
      const ctx = getAudioCtx();
      const now = ctx.currentTime;
      if (type === 'click') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(580, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.06);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.065);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.07);
      } else if (type === 'tasbeeh') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(528, now);
        osc.frequency.exponentialRampToValueAtTime(660, now + 0.09);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.11);
      } else if (type === 'success' || type === 'fanfare') {
        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.09);
          gain.gain.setValueAtTime(0.16, now + idx * 0.09);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.35);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.09);
          osc.stop(now + idx * 0.09 + 0.36);
        });
      }
    } catch (e) {}
  }

  // Procedural Multi-Channel Nature Sound Generators
  const activeNatureNodes = {};

  function createNoiseBuffer(ctx, type = 'pink') {
    const bufferSize = ctx.sampleRate * 3;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      if (type === 'white') {
        output[i] = white * 0.5;
      } else {
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
        b6 = white * 0.115926;
      }
    }
    return buffer;
  }

  function toggleNatureSound(soundId, tileEl) {
    const ctx = getAudioCtx();
    if (activeNatureNodes[soundId]) {
      try {
        activeNatureNodes[soundId].stop();
      } catch (e) {}
      delete activeNatureNodes[soundId];
      if (tileEl) tileEl.classList.remove('active');
      if (soundId === 'heavy_rain') {
        rainEnabled = false;
        const rainBtn = document.getElementById('btn-toggle-rain');
        if (rainBtn) rainBtn.classList.remove('active');
      }
      return false;
    }

    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.32;
    masterGain.connect(ctx.destination);

    let intervalId = null;
    const src = ctx.createBufferSource();
    src.buffer = createNoiseBuffer(ctx, soundId === 'heavy_rain' ? 'white' : 'pink');
    src.loop = true;

    const filter = ctx.createBiquadFilter();

    if (soundId === 'heavy_rain') {
      filter.type = 'bandpass';
      filter.frequency.value = 1100;
      filter.Q.value = 0.7;
      masterGain.gain.value = 0.28;
      src.connect(filter);
      filter.connect(masterGain);
      src.start();
      rainEnabled = true;
      const rainBtn = document.getElementById('btn-toggle-rain');
      if (rainBtn) rainBtn.classList.add('active');
    } else if (soundId === 'ocean_waves') {
      filter.type = 'lowpass';
      filter.frequency.value = 420;
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = 0.14;
      lfoGain.gain.value = 300;
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();
      src.connect(filter);
      filter.connect(masterGain);
      src.start();
    } else if (soundId === 'forest_wind') {
      filter.type = 'bandpass';
      filter.frequency.value = 520;
      filter.Q.value = 3.5;
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = 0.22;
      lfoGain.gain.value = 260;
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();
      src.connect(filter);
      filter.connect(masterGain);
      src.start();
    } else if (soundId === 'waterfall') {
      filter.type = 'lowpass';
      filter.frequency.value = 850;
      masterGain.gain.value = 0.25;
      src.connect(filter);
      filter.connect(masterGain);
      src.start();
    } else if (soundId === 'campfire') {
      filter.type = 'lowpass';
      filter.frequency.value = 320;
      src.connect(filter);
      filter.connect(masterGain);
      src.start();
      intervalId = setInterval(() => {
        if (!activeNatureNodes[soundId]) return;
        const pop = ctx.createOscillator();
        const popGain = ctx.createGain();
        pop.type = 'sawtooth';
        pop.frequency.setValueAtTime(120 + Math.random() * 600, ctx.currentTime);
        popGain.gain.setValueAtTime(0.08, ctx.currentTime);
        popGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
        pop.connect(popGain);
        popGain.connect(ctx.destination);
        pop.start();
        pop.stop(ctx.currentTime + 0.045);
      }, 280);
    } else if (soundId === 'morning_birds') {
      masterGain.gain.value = 0.06;
      filter.type = 'bandpass';
      filter.frequency.value = 600;
      src.connect(filter);
      filter.connect(masterGain);
      src.start();
      intervalId = setInterval(() => {
        if (!activeNatureNodes[soundId]) return;
        const now = ctx.currentTime;
        const chirp = ctx.createOscillator();
        const cGain = ctx.createGain();
        chirp.type = 'sine';
        const baseFreq = 2200 + Math.random() * 1200;
        chirp.frequency.setValueAtTime(baseFreq, now);
        chirp.frequency.exponentialRampToValueAtTime(baseFreq * 1.35, now + 0.08);
        chirp.frequency.exponentialRampToValueAtTime(baseFreq * 0.9, now + 0.16);
        cGain.gain.setValueAtTime(0.09, now);
        cGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        chirp.connect(cGain);
        cGain.connect(ctx.destination);
        chirp.start(now);
        chirp.stop(now + 0.19);
      }, 950);
    } else if (soundId === 'night_crickets') {
      masterGain.gain.value = 0.04;
      src.connect(masterGain);
      src.start();
      intervalId = setInterval(() => {
        if (!activeNatureNodes[soundId]) return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(4100, now);
        g.gain.setValueAtTime(0.05, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(g);
        g.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.13);
      }, 600);
    } else if (soundId === 'thunder') {
      filter.type = 'lowpass';
      filter.frequency.value = 160;
      masterGain.gain.value = 0.45;
      src.connect(filter);
      filter.connect(masterGain);
      src.start();
    }

    activeNatureNodes[soundId] = {
      stop: () => {
        if (intervalId) clearInterval(intervalId);
        try { src.stop(); } catch (e) {}
        try { masterGain.disconnect(); } catch (e) {}
      }
    };

    if (tileEl) tileEl.classList.add('active');
    return true;
  }

  // --- 4. TOP CONTROLS: AUTO/MANUAL SKY PHASE, DARK MODE, CLOUDS, HEAVY RAIN, CAIRO QURAN RADIO ---
  window.setSkyPhaseMode = function (modeVal) {
    skyMode = modeVal;
    if (modeVal === 'auto') {
      const detected = detectPhaseFromTime(new Date());
      applySkyPhaseAndTheme(detected);
    } else {
      applySkyPhaseAndTheme(modeVal);
    }
    playUiSound('click');
  };

  window.toggleThemeMode = function () {
    // Quick toggle between Night (Moon & Stars) and Day (Sun)
    if (isDarkMode) {
      skyMode = 'day';
      applySkyPhaseAndTheme('day');
    } else {
      skyMode = 'night';
      applySkyPhaseAndTheme('night');
    }
    playUiSound('click');
  };

  window.toggleCloudsMode = function (btnEl) {
    cloudsEnabled = !cloudsEnabled;
    if (btnEl) btnEl.classList.toggle('active', cloudsEnabled);
    playUiSound('click');
  };

  window.toggleHeavyRainMode = function (btnEl) {
    const rainTile = document.querySelector('[data-sound="heavy_rain"]');
    toggleNatureSound('heavy_rain', rainTile);
    if (btnEl) btnEl.classList.toggle('active', rainEnabled);
  };

  // Live Cairo Quran Radio
  const CAIRO_RADIO_STREAMS = [
    'https://stream.radiojar.com/8s5u5tpdtwzuv',
    'https://n0a.radiojar.com/8s5u5tpdtwzuv',
    'https://backup.qurango.net/radio/tarateel'
  ];
  let radioAudio = null;
  let isRadioPlaying = false;
  let streamIdx = 0;

  window.toggleCairoRadio = function () {
    const btn = document.getElementById('cairo-radio-btn');
    const statusText = document.getElementById('cairo-radio-status');
    if (!radioAudio) {
      radioAudio = new Audio();
      radioAudio.crossOrigin = 'anonymous';
      radioAudio.onerror = function () {
        streamIdx = (streamIdx + 1) % CAIRO_RADIO_STREAMS.length;
        if (isRadioPlaying) {
          radioAudio.src = CAIRO_RADIO_STREAMS[streamIdx];
          radioAudio.play().catch(() => {});
        }
      };
    }

    if (isRadioPlaying) {
      radioAudio.pause();
      isRadioPlaying = false;
      if (btn) {
        btn.classList.remove('playing');
        btn.innerHTML = '▶️ <span data-i18n="playRadio">تشغيل الإذاعة</span>';
      }
      if (statusText) statusText.textContent = 'إذاعة القرآن الكريم من القاهرة';
    } else {
      radioAudio.src = CAIRO_RADIO_STREAMS[streamIdx];
      radioAudio.play().then(() => {
        isRadioPlaying = true;
        if (btn) {
          btn.classList.add('playing');
          btn.innerHTML = '⏹️ <span data-i18n="stopRadio">إيقاف البث</span>';
        }
        if (statusText) statusText.textContent = '🔴 بث مباشر الآن: إذاعة القرآن الكريم بالقاهرة';
      }).catch(() => {
        streamIdx = (streamIdx + 1) % CAIRO_RADIO_STREAMS.length;
        radioAudio.src = CAIRO_RADIO_STREAMS[streamIdx];
        radioAudio.play().catch(() => {});
        isRadioPlaying = true;
        if (btn) btn.classList.add('playing');
      });
    }
  };

  window.playUiSound = playUiSound;
  window.toggleNatureSound = toggleNatureSound;
})();
