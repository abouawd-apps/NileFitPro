/* ==========================================================================
   NileFitPro - Realistic Sky Background Engine & Professional Audio / Nature Mixer
   Features:
   - Auto-time & manual Sunrise, Day Sun, Sunset, Night Moon & Stars
   - Optional Realistic Volumetric Clouds in any mode
   - Optional Heavy Rain (visual raindrops + realistic rain audio)
   - Web Audio API Professional Sound Effects & Multi-Channel Nature Sounds
   ========================================================================== */

class NileSkyAndAudioEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    // Sky state: 'auto' | 'sunrise' | 'day' | 'sunset' | 'night'
    this.skyMode = 'auto';
    this.effectivePhase = 'night';
    this.cloudsEnabled = true;
    this.rainEnabled = false;
    this.rainIntensity = 0; // 0=Off, 1=Light, 2=Moderate, 3=Heavy, 4=Torrential Storm
    this.sfxEnabled = true;
    this.masterVolume = 0.75;

    this.stars = [];
    this.clouds = [];
    this.raindrops = [];
    this.shootingStar = null;
    this.lightningAlpha = 0;

    // Web Audio API Context & Nature Channels
    this.audioCtx = null;
    this.natureChannels = {
      rain: { active: false, volume: 0.6, node: null, gain: null },
      thunder: { active: false, volume: 0.5, timer: null },
      waves: { active: false, volume: 0.5, node: null, gain: null, lfo: null },
      birds: { active: false, volume: 0.5, timer: null },
      night: { active: false, volume: 0.4, timer: null },
      wind: { active: false, volume: 0.45, node: null, gain: null }
    };
  }

  init() {
    this.canvas = document.getElementById('skyCanvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());

    this.initStars();
    this.initClouds();
    this.initRain();
    this.updateSkyPhaseFromClock();

    // Update auto phase every 30 seconds
    setInterval(() => this.updateSkyPhaseFromClock(), 30000);

    // Animation loop
    const animate = () => {
      this.renderSky();
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  resize() {
    if (!this.canvas) return;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  initStars() {
    this.stars = [];
    for (let i = 0; i < 220; i++) {
      this.stars.push({
        x: Math.random() * 2000,
        y: Math.random() * 1000,
        r: Math.random() * 1.9 + 0.4,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.04 + 0.01,
        hue: Math.random() > 0.8 ? '#fde68a' : (Math.random() > 0.5 ? '#bae6fd' : '#ffffff')
      });
    }
  }

  initClouds() {
    this.clouds = [];
    for (let i = 0; i < 12; i++) {
      this.clouds.push({
        x: Math.random() * 2000,
        y: 40 + Math.random() * 280,
        scale: 0.65 + Math.random() * 1.1,
        speed: 0.18 + Math.random() * 0.35,
        opacity: 0.5 + Math.random() * 0.35,
        puffs: [
          { dx: 0, dy: 0, r: 46 },
          { dx: 38, dy: -12, r: 54 },
          { dx: 82, dy: -6, r: 48 },
          { dx: 120, dy: 6, r: 38 },
          { dx: -34, dy: 10, r: 36 }
        ]
      });
    }
  }

  initRain(dropCount = 320) {
    this.raindrops = [];
    for (let i = 0; i < dropCount; i++) {
      this.raindrops.push({
        x: Math.random() * 2000,
        y: Math.random() * 1200,
        len: 15 + Math.random() * 22,
        speed: 13 + Math.random() * 10,
        drift: -2.8
      });
    }
  }

  updateSkyPhaseFromClock() {
    if (this.skyMode !== 'auto') {
      this.effectivePhase = this.skyMode;
    } else {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 7) {
        this.effectivePhase = 'sunrise';
      } else if (hour >= 7 && hour < 17) {
        this.effectivePhase = 'day';
      } else if (hour >= 17 && hour < 19) {
        this.effectivePhase = 'sunset';
      } else {
        this.effectivePhase = 'night';
      }
    }

    // Apply light/dark body class based on effective phase unless overridden
    if (this.effectivePhase === 'day') {
      document.body.classList.add('theme-light');
    } else {
      document.body.classList.remove('theme-light');
    }

    const badge = document.getElementById('currentSkyPhaseLabel');
    if (badge) {
      const labels = {
        sunrise: '🌅 شروق الشمس (Sunrise)',
        day: '☀️ النهار المشمس (Daylight)',
        sunset: '🌇 غروب الشمس (Sunset)',
        night: '🌙 الليل والنجوم والفجر (Night & Stars)'
      };
      badge.textContent = labels[this.effectivePhase] || labels.night;
    }
  }

  setSkyMode(mode) {
    this.skyMode = mode;
    this.updateSkyPhaseFromClock();
    this.playSFX('click');
  }

  toggleDarkLightManual() {
    if (this.effectivePhase === 'day') {
      this.setSkyMode('night');
      const sel = document.getElementById('skyModeSelect');
      if (sel) sel.value = 'night';
    } else {
      this.setSkyMode('day');
      const sel = document.getElementById('skyModeSelect');
      if (sel) sel.value = 'day';
    }
  }

  toggleClouds() {
    this.cloudsEnabled = !this.cloudsEnabled;
    this.playSFX('click');
    return this.cloudsEnabled;
  }

  toggleRain() {
    if (this.rainIntensity > 0) {
      this.setRainIntensity(0);
    } else {
      this.setRainIntensity(2);
    }
    return this.rainEnabled;
  }

  // Multi-Level Rain Intensity (0=Off, 1=Light, 2=Moderate, 3=Heavy, 4=Torrential Storm)
  setRainIntensity(level) {
    const lvl = parseInt(level, 10) || 0;
    this.rainIntensity = lvl;
    this.rainEnabled = lvl > 0;

    const dropCounts = { 0: 0, 1: 110, 2: 240, 3: 390, 4: 560 };
    if (lvl > 0) {
      this.initRain(dropCounts[lvl] || 240);
    }

    const sel = document.getElementById('rainIntensitySelect');
    if (sel && sel.value !== String(lvl)) sel.value = String(lvl);

    const selStudio = document.getElementById('studioRainIntensitySelect');
    if (selStudio && selStudio.value !== String(lvl)) selStudio.value = String(lvl);

    const volMap = { 0: 0, 1: 0.35, 2: 0.6, 3: 0.85, 4: 1.0 };
    if (lvl === 0) {
      this.setNatureSound('rain', false);
      if (this.natureChannels.thunder.active) {
        this.setNatureSound('thunder', false);
      }
    } else {
      const customVol = volMap[lvl] * this.masterVolume;
      if (!this.natureChannels.rain.active) {
        this.setNatureSound('rain', true, customVol);
      } else {
        this.setNatureVolume('rain', customVol);
      }
      if (lvl === 4 && !this.natureChannels.thunder.active) {
        this.setNatureSound('thunder', true, 0.65 * this.masterVolume);
      }
    }
    this.playSFX('click');
    return this.rainEnabled;
  }

  setNatureVolume(channelKey, volValue) {
    const v = Math.max(0, Math.min(1, parseFloat(volValue) || 0));
    const ch = this.natureChannels[channelKey];
    if (!ch) return;
    ch.volume = v;
    if (channelKey === 'rain') {
      this.masterVolume = v;
      const rVol1 = document.getElementById('headerRainVolume');
      const rVol2 = document.getElementById('studioRainVolume');
      if (rVol1 && document.activeElement !== rVol1) rVol1.value = String(v);
      if (rVol2 && document.activeElement !== rVol2) rVol2.value = String(v);
    }
    if (ch.gain && this.audioCtx) {
      ch.gain.gain.setTargetAtTime(v * 0.42, this.audioCtx.currentTime, 0.08);
    }
  }

  renderSky() {
    const ctx = this.ctx;
    if (!ctx) return;
    const w = this.width;
    const h = this.height;
    const phase = this.effectivePhase;

    // 1. Sky Gradient
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    if (phase === 'sunrise') {
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(0.35, '#3b1d5e');
      grad.addColorStop(0.7, '#d97706');
      grad.addColorStop(1, '#fde047');
    } else if (phase === 'day') {
      grad.addColorStop(0, '#0284c7');
      grad.addColorStop(0.45, '#38bdf8');
      grad.addColorStop(0.85, '#bae6fd');
      grad.addColorStop(1, '#e0f2fe');
    } else if (phase === 'sunset') {
      grad.addColorStop(0, '#1e1b4b');
      grad.addColorStop(0.35, '#7c2d12');
      grad.addColorStop(0.7, '#ea580c');
      grad.addColorStop(1, '#facc15');
    } else {
      // Night / Fajr
      grad.addColorStop(0, '#020617');
      grad.addColorStop(0.45, '#090d1e');
      grad.addColorStop(0.85, '#111827');
      grad.addColorStop(1, '#1e293b');
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // 2. Stars & Moon (Night, Sunrise dawn, Sunset dusk)
    if (phase === 'night' || phase === 'sunrise' || phase === 'sunset') {
      const starOpacityMult = phase === 'night' ? 1 : 0.32;
      for (const s of this.stars) {
        s.phase += s.speed;
        const alpha = (0.35 + 0.65 * Math.abs(Math.sin(s.phase))) * starOpacityMult;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = s.hue;
        ctx.beginPath();
        ctx.arc(s.x % w, s.y % (h * 0.78), s.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Occasional Shooting Star at Night
      if (phase === 'night') {
        if (!this.shootingStar && Math.random() < 0.004) {
          this.shootingStar = {
            x: Math.random() * w * 0.8 + w * 0.1,
            y: Math.random() * h * 0.3,
            vx: -9,
            vy: 4.5,
            life: 1.0
          };
        }
        if (this.shootingStar) {
          const st = this.shootingStar;
          ctx.save();
          const tailGrad = ctx.createLinearGradient(st.x, st.y, st.x - st.vx * 10, st.y - st.vy * 10);
          tailGrad.addColorStop(0, `rgba(255,255,255,${st.life})`);
          tailGrad.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.strokeStyle = tailGrad;
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.moveTo(st.x, st.y);
          ctx.lineTo(st.x - st.vx * 10, st.y - st.vy * 10);
          ctx.stroke();
          ctx.restore();
          st.x += st.vx;
          st.y += st.vy;
          st.life -= 0.03;
          if (st.life <= 0) this.shootingStar = null;
        }
      }
    }

    // 3. Realistic Moon (Night) or Realistic Sun (Sunrise / Day / Sunset)
    if (phase === 'night') {
      const mx = w * 0.82;
      const my = h * 0.16;
      const mr = 46;

      // Lunar Halo
      const halo = ctx.createRadialGradient(mx, my, mr * 0.5, mx, my, mr * 4.2);
      halo.addColorStop(0, 'rgba(254, 249, 195, 0.38)');
      halo.addColorStop(0.4, 'rgba(186, 230, 253, 0.12)');
      halo.addColorStop(1, 'rgba(15, 23, 42, 0)');
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(mx, my, mr * 4.2, 0, Math.PI * 2);
      ctx.fill();

      // Moon Body
      const moonGrad = ctx.createRadialGradient(mx - 12, my - 12, 6, mx, my, mr);
      moonGrad.addColorStop(0, '#ffffff');
      moonGrad.addColorStop(0.65, '#fef08a');
      moonGrad.addColorStop(1, '#cbd5e1');
      ctx.fillStyle = moonGrad;
      ctx.beginPath();
      ctx.arc(mx, my, mr, 0, Math.PI * 2);
      ctx.fill();

      // Realistic Lunar Craters
      ctx.fillStyle = 'rgba(148, 163, 184, 0.28)';
      [
        { dx: -14, dy: -8, r: 9 },
        { dx: 16, dy: 10, r: 12 },
        { dx: -6, dy: 18, r: 7 },
        { dx: 10, dy: -16, r: 6 },
        { dx: -20, dy: 12, r: 5 }
      ].forEach(c => {
        ctx.beginPath();
        ctx.arc(mx + c.dx, my + c.dy, c.r, 0, Math.PI * 2);
        ctx.fill();
      });
    } else {
      // Sun position & color by phase
      let sx = w * 0.78;
      let sy = h * 0.16;
      let sr = 54;
      let sunCore = '#ffffff';
      let sunMid = '#fde047';
      let sunOuter = 'rgba(251, 191, 36, 0)';

      if (phase === 'sunrise') {
        sx = w * 0.22;
        sy = h * 0.68;
        sr = 64;
        sunMid = '#fb923c';
        sunOuter = 'rgba(249, 115, 22, 0)';
      } else if (phase === 'sunset') {
        sx = w * 0.78;
        sy = h * 0.70;
        sr = 68;
        sunMid = '#f97316';
        sunOuter = 'rgba(220, 38, 38, 0)';
      }

      // Sun Corona Glow
      const sunHalo = ctx.createRadialGradient(sx, sy, sr * 0.3, sx, sy, sr * 4.5);
      sunHalo.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
      sunHalo.addColorStop(0.25, phase === 'day' ? 'rgba(253, 224, 71, 0.55)' : 'rgba(251, 146, 60, 0.55)');
      sunHalo.addColorStop(1, sunOuter);
      ctx.fillStyle = sunHalo;
      ctx.beginPath();
      ctx.arc(sx, sy, sr * 4.5, 0, Math.PI * 2);
      ctx.fill();

      // Sun Disk
      const diskGrad = ctx.createRadialGradient(sx, sy, 4, sx, sy, sr);
      diskGrad.addColorStop(0, sunCore);
      diskGrad.addColorStop(0.7, sunMid);
      diskGrad.addColorStop(1, '#f59e0b');
      ctx.fillStyle = diskGrad;
      ctx.beginPath();
      ctx.arc(sx, sy, sr, 0, Math.PI * 2);
      ctx.fill();
    }

    // 4. Optional Realistic Clouds
    if (this.cloudsEnabled) {
      for (const cl of this.clouds) {
        cl.x += cl.speed;
        if (cl.x - 200 > w) cl.x = -260;

        ctx.save();
        ctx.translate(cl.x, cl.y);
        ctx.scale(cl.scale, cl.scale);

        let cloudColor = 'rgba(255, 255, 255, 0.78)';
        if (phase === 'night') {
          cloudColor = this.rainEnabled ? 'rgba(51, 65, 85, 0.75)' : 'rgba(148, 163, 184, 0.25)';
        } else if (phase === 'sunrise' || phase === 'sunset') {
          cloudColor = 'rgba(254, 215, 170, 0.55)';
        } else if (this.rainEnabled) {
          cloudColor = 'rgba(100, 116, 139, 0.8)';
        }

        ctx.fillStyle = cloudColor;
        for (const p of cl.puffs) {
          ctx.beginPath();
          ctx.arc(p.dx, p.dy, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    // 5. Optional Multi-Level Rain & Lightning
    if (this.rainEnabled && this.rainIntensity > 0) {
      const intensityMult = 0.65 + (this.rainIntensity * 0.28);
      ctx.save();
      ctx.strokeStyle = phase === 'day' ? 'rgba(224, 242, 254, 0.8)' : 'rgba(186, 230, 253, 0.65)';
      ctx.lineWidth = 1.1 + (this.rainIntensity * 0.25);
      ctx.beginPath();
      for (const d of this.raindrops) {
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + d.drift * intensityMult, d.y + d.len * intensityMult);
        d.x += d.drift * intensityMult;
        d.y += d.speed * intensityMult;
        if (d.y > h) {
          d.y = -25;
          d.x = Math.random() * (w + 200);
        }
        if (d.x < -50) d.x = w + 50;
      }
      ctx.stroke();
      ctx.restore();

      // Subtle lightning flash (more frequent at higher rain intensity)
      const flashChance = this.rainIntensity >= 3 ? 0.0035 : 0.0012;
      if (Math.random() < flashChance) {
        this.lightningAlpha = 0.35;
      }
      if (this.lightningAlpha > 0) {
        ctx.fillStyle = `rgba(240, 249, 255, ${this.lightningAlpha})`;
        ctx.fillRect(0, 0, w, h);
        this.lightningAlpha -= 0.025;
      }
    }
  }

  ensureAudioCtx() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // Professional UI Sound Effects (Synthesized for 100% reliability)
  playSFX(type = 'click') {
    if (!this.sfxEnabled) return;
    try {
      this.ensureAudioCtx();
      const ctx = this.audioCtx;
      if (!ctx) return;
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
        osc.frequency.setValueAtTime(720, now);
        osc.frequency.exponentialRampToValueAtTime(1080, now + 0.08);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.095);
      } else if (type === 'success') {
        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.09);
          gain.gain.setValueAtTime(0.15, now + idx * 0.09);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.28);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.09);
          osc.stop(now + idx * 0.09 + 0.3);
        });
      }
    } catch (e) {
      // Ignore audio autoplay blocks until user interacts
    }
  }

  // Multi-Track Procedural Nature Sound Generator
  setNatureSound(channelKey, active, customVol = null) {
    this.ensureAudioCtx();
    const ctx = this.audioCtx;
    if (!ctx) return;
    const ch = this.natureChannels[channelKey];
    if (!ch) return;

    if (customVol !== null) {
      ch.volume = parseFloat(customVol);
      if (ch.gain) {
        ch.gain.gain.setTargetAtTime(ch.volume * 0.35, ctx.currentTime, 0.1);
      }
    }

    if (active === ch.active) return;
    ch.active = active;

    // Stop if turning off
    if (!active) {
      if (ch.node) {
        try { ch.node.stop(); } catch (e) {}
        ch.node.disconnect();
        ch.node = null;
      }
      if (ch.lfo) {
        try { ch.lfo.stop(); } catch (e) {}
        ch.lfo = null;
      }
      if (ch.timer) {
        clearInterval(ch.timer);
        ch.timer = null;
      }
      if (channelKey === 'rain') {
        this.rainEnabled = false;
        const rainBtn = document.getElementById('rainToggleBtn');
        if (rainBtn) rainBtn.classList.remove('active');
      }
      return;
    }

    // Start requested nature sound
    if (channelKey === 'rain' || channelKey === 'waves' || channelKey === 'wind') {
      // Create 3-second looping pink/brown noise buffer
      const bufferSize = ctx.sampleRate * 3;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= 3.2;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      if (channelKey === 'rain') {
        filter.type = 'bandpass';
        filter.frequency.value = 1100;
        filter.Q.value = 0.6;
        this.rainEnabled = true;
        const rainBtn = document.getElementById('rainToggleBtn');
        if (rainBtn) rainBtn.classList.add('active');
      } else if (channelKey === 'waves') {
        filter.type = 'lowpass';
        filter.frequency.value = 420;
        // LFO to swell waves in and out
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.value = 0.14; // ~7 sec wave cycle
        lfoGain.gain.value = 280;
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);
        lfo.start();
        ch.lfo = lfo;
      } else if (channelKey === 'wind') {
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
        ch.lfo = lfo;
      }

      const gain = ctx.createGain();
      gain.gain.value = ch.volume * 0.35;

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();

      ch.node = noise;
      ch.gain = gain;
    } else if (channelKey === 'birds') {
      const chirp = () => {
        if (!ch.active) return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        const base = 1800 + Math.random() * 900;
        osc.frequency.setValueAtTime(base, now);
        osc.frequency.exponentialRampToValueAtTime(base * 1.35, now + 0.08);
        osc.frequency.exponentialRampToValueAtTime(base * 0.9, now + 0.16);
        osc.frequency.exponentialRampToValueAtTime(base * 1.4, now + 0.26);
        g.gain.setValueAtTime(0.001, now);
        g.gain.linearRampToValueAtTime(ch.volume * 0.12, now + 0.04);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
        osc.connect(g);
        g.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
      };
      chirp();
      ch.timer = setInterval(chirp, 1600);
    } else if (channelKey === 'night') {
      const cricket = () => {
        if (!ch.active) return;
        const now = ctx.currentTime;
        for (let pulse = 0; pulse < 3; pulse++) {
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.frequency.value = 3900;
          const start = now + pulse * 0.06;
          g.gain.setValueAtTime(ch.volume * 0.06, start);
          g.gain.exponentialRampToValueAtTime(0.001, start + 0.04);
          osc.connect(g);
          g.connect(ctx.destination);
          osc.start(start);
          osc.stop(start + 0.045);
        }
      };
      cricket();
      ch.timer = setInterval(cricket, 1100);
    } else if (channelKey === 'thunder') {
      const rumble = () => {
        if (!ch.active) return;
        const bufferSize = ctx.sampleRate * 2.5;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.8));
        }
        const src = ctx.createBufferSource();
        src.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 145;
        const g = ctx.createGain();
        g.gain.value = ch.volume * 0.65;
        src.connect(filter);
        filter.connect(g);
        g.connect(ctx.destination);
        src.start();
        this.lightningAlpha = 0.4;
      };
      rumble();
      ch.timer = setInterval(rumble, 6500);
    }
  }
}

window.nileSkyAudio = new NileSkyAndAudioEngine();
