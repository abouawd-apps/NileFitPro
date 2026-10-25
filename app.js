/* ==========================================================================
   NileFitPro - Main Interactive Application Engine (Part 1)
   Designed by Mohamed Awad Khair with Gemini 4 Argon
   ========================================================================== */

const todayISO = new Date().toISOString().split("T")[0];
const thirtyDaysAgoISO = new Date(Date.now() - 30 * 86400000).toISOString().split("T")[0];

const AppState = {
  lang: localStorage.getItem("nilefit_lang") || "ar",
  theme: localStorage.getItem("nilefit_theme") || "dark",
  cloudsEnabled: localStorage.getItem("nilefit_clouds") !== "false",
  sfxEnabled: true,
  rainLevel: 2, // 0: off, 1: light, 2: heavy, 3: storm
  preferredFat: localStorage.getItem("nilefit_fat") || "olive", // 'olive' or 'ghee'
  profile: JSON.parse(localStorage.getItem("nilefit_profile")) || {
    name: "محمد عوض خير",
    age: 26,
    gender: "male",
    height: 176,
    weight: 82,
    activity: "moderate",
    goal: "lose",
    level: "intermediate"
  },
  selectedMealOptions: JSON.parse(localStorage.getItem("nilefit_meals")) || {
    breakfast: 0,
    snack1: 0,
    lunch: 0,
    snack2: 0,
    dinner: 0
  },
  selectedSplit: localStorage.getItem("nilefit_split") || "ppl",
  selectedDayIdx: 0,
  trainerSpeed: 1,
  completedExercises: JSON.parse(localStorage.getItem("nilefit_done_ex")) || {},
  transformMonths: 3,
  weekDays: JSON.parse(localStorage.getItem("nilefit_week")) || [true, true, true, true, true, true, false],
  certPeriod: localStorage.getItem("nilefit_cert_period") || "week", // 'week','month','3months','6months','12months','custom_dates'
  certStartDate: localStorage.getItem("nilefit_start_date") || thirtyDaysAgoISO,
  certEndDate: localStorage.getItem("nilefit_end_date") || todayISO,
  waterCups: parseInt(localStorage.getItem("nilefit_water") || "6", 10),
  currentReciter: "islam",
  currentSurahIdx: -1,
  isPlayingQuran: false,
  currentAdhkarTab: "morning",
  adhkarCounts: {},
  speakingDhikrId: null,
  autoPlayAdhkar: false,
  quoteIdx: 0
};

/* ==========================================================================
   1. WEB AUDIO API: PRO SOUND EFFECTS & PROCEDURAL NATURE SOUNDS MIXER
   ========================================================================== */
const SoundEngine = {
  ctx: null,
  natureNodes: {},
  masterVolume: 0.6,

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  },

  playSFX(type = "click") {
    if (!AppState.sfxEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      if (type === "click") {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(250, now + 0.06);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.connect(gain).connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.06);
      } else if (type === "success") {
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, now + i * 0.075);
          gain.gain.setValueAtTime(0.15, now + i * 0.075);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.075 + 0.24);
          osc.connect(gain).connect(this.ctx.destination);
          osc.start(now + i * 0.075);
          osc.stop(now + i * 0.075 + 0.24);
        });
      } else if (type === "fanfare") {
        [440, 554.37, 659.25, 880, 659.25, 880].forEach((freq, i) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "triangle";
          const start = now + i * 0.1;
          osc.frequency.setValueAtTime(freq, start);
          gain.gain.setValueAtTime(0.2, start);
          gain.gain.exponentialRampToValueAtTime(0.001, start + 0.32);
          osc.connect(gain).connect(this.ctx.destination);
          osc.start(start);
          osc.stop(start + 0.32);
        });
      } else if (type === "tasbih") {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(760, now);
        osc.frequency.exponentialRampToValueAtTime(420, now + 0.045);
        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
        osc.connect(gain).connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.045);
      }
    } catch (e) {}
  },

  toggleNatureSound(id) {
    this.init();
    if (!this.ctx) return false;
    if (this.natureNodes[id]) {
      this.stopNatureSound(id);
      return false;
    } else {
      this.startNatureSound(id);
      return true;
    }
  },

  startNatureSound(id) {
    if (!this.ctx) return;
    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    const gainNode = this.ctx.createGain();
    gainNode.gain.value = this.masterVolume * 0.35;

    let intervalId = null;

    if (id === "heavy_rain") {
      filter.type = "bandpass";
      filter.frequency.value = 1100;
      filter.Q.value = 0.5;
      AppState.rainLevel = 3;
      updateRainButtonLabel();
    } else if (id === "gentle_rain") {
      filter.type = "lowpass";
      filter.frequency.value = 650;
      gainNode.gain.value = this.masterVolume * 0.22;
    } else if (id === "nile_waves" || id === "ocean") {
      filter.type = "lowpass";
      filter.frequency.value = 420;
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.value = id === "ocean" ? 0.14 : 0.25;
      lfoGain.gain.value = 280;
      lfo.connect(lfoGain).connect(filter.frequency);
      lfo.start();
      this.natureNodes[id + "_lfo"] = lfo;
    } else if (id === "thunder") {
      filter.type = "lowpass";
      filter.frequency.value = 160;
      gainNode.gain.value = this.masterVolume * 0.5;
    } else if (id === "wind") {
      filter.type = "bandpass";
      filter.frequency.value = 380;
      filter.Q.value = 4.0;
      const lfo = this.ctx.createOscillator();
      lfo.frequency.value = 0.18;
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.value = 180;
      lfo.connect(lfoGain).connect(filter.frequency);
      lfo.start();
      this.natureNodes[id + "_lfo"] = lfo;
    } else if (id === "fire") {
      filter.type = "highpass";
      filter.frequency.value = 1500;
      gainNode.gain.value = this.masterVolume * 0.18;
    } else if (id === "birds") {
      filter.type = "lowpass";
      filter.frequency.value = 300;
      gainNode.gain.value = this.masterVolume * 0.07;
      intervalId = setInterval(() => {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.frequency.setValueAtTime(2200 + Math.random() * 800, now);
        osc.frequency.exponentialRampToValueAtTime(3200 + Math.random() * 600, now + 0.09);
        g.gain.setValueAtTime(this.masterVolume * 0.09, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(g).connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.12);
      }, 1700);
    } else if (id === "focus_alpha") {
      filter.type = "lowpass";
      filter.frequency.value = 220;
      gainNode.gain.value = this.masterVolume * 0.15;
    }

    whiteNoise.connect(filter).connect(gainNode).connect(this.ctx.destination);
    whiteNoise.start();
    this.natureNodes[id] = { source: whiteNoise, gain: gainNode, intervalId };
  },

  stopNatureSound(id) {
    const node = this.natureNodes[id];
    if (node) {
      try { node.source.stop(); } catch (e) {}
      if (node.intervalId) clearInterval(node.intervalId);
      delete this.natureNodes[id];
    }
    if (this.natureNodes[id + "_lfo"]) {
      try { this.natureNodes[id + "_lfo"].stop(); } catch (e) {}
      delete this.natureNodes[id + "_lfo"];
    }
  },

  setMasterVolume(val) {
    this.masterVolume = val;
    Object.values(this.natureNodes).forEach(n => {
      if (n && n.gain) n.gain.gain.value = val * 0.35;
    });
    const qAudio = document.getElementById("quranAudioElement");
    if (qAudio) qAudio.volume = val;
    const aAudio = document.getElementById("adhkarAudioElement");
    if (aAudio) aAudio.volume = val;
  }
};

/* ==========================================================================
   2. REALISTIC SKY ENGINE (SUN IN DAY, MOON & STARS IN NIGHT, OPTIONAL CLOUDS)
   ========================================================================== */
function initSkyAndRain() {
  const sky = document.getElementById("sky-canvas-container");
  const cloudsLayer = document.getElementById("cloudsLayer");
  if (!sky) return;

  // Create Realistic Twinkling Stars for Night Mode
  for (let i = 0; i < 110; i++) {
    const star = document.createElement("div");
    star.className = "sky-star";
    const size = (Math.random() * 2.8 + 1).toFixed(1);
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.top = `${Math.random() * 78}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.setProperty("--twinkle-dur", `${(Math.random() * 3 + 1.4).toFixed(1)}s`);
    star.style.animationDelay = `${(Math.random() * 3).toFixed(1)}s`;
    sky.appendChild(star);
  }

  // Create Shooting Stars
  for (let i = 0; i < 3; i++) {
    const shoot = document.createElement("div");
    shoot.className = "shooting-star";
    shoot.style.top = `${8 + i * 15}%`;
    shoot.style.left = `${60 + i * 15}%`;
    shoot.style.animationDelay = `${i * 3.8}s`;
    sky.appendChild(shoot);
  }

  // Create Optional Volumetric Clouds (Visible in ANY mode when enabled)
  if (cloudsLayer) {
    for (let i = 0; i < 6; i++) {
      const cloud = document.createElement("div");
      cloud.className = "sky-cloud";
      cloud.style.width = `${170 + i * 42}px`;
      cloud.style.height = `${52 + i * 10}px`;
      cloud.style.top = `${7 + i * 10}%`;
      cloud.style.animationDuration = `${42 + i * 14}s`;
      cloud.style.animationDelay = `-${i * 8}s`;
      cloudsLayer.appendChild(cloud);
    }
  }
  updateCloudsVisibility();

  // Realistic Heavy Rain Canvas
  const canvas = document.getElementById("rainCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const drops = Array.from({ length: 280 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    len: Math.random() * 24 + 12,
    speed: Math.random() * 9 + 11,
    opacity: Math.random() * 0.45 + 0.15
  }));

  function animateRain() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const activeCount = AppState.rainLevel === 0 ? 0 : AppState.rainLevel === 1 ? 70 : AppState.rainLevel === 2 ? 160 : 280;

    if (activeCount > 0) {
      ctx.lineWidth = AppState.rainLevel === 3 ? 1.85 : 1.35;
      const isDark = AppState.theme === "dark";

      for (let i = 0; i < activeCount; i++) {
        const d = drops[i];
        ctx.strokeStyle = isDark
          ? `rgba(174, 214, 241, ${d.opacity})`
          : `rgba(41, 128, 185, ${d.opacity * 0.8})`;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 3.2, d.y + d.len);
        ctx.stroke();

        d.y += d.speed * (AppState.rainLevel * 0.55);
        d.x -= 1.6;

        if (d.y > canvas.height) {
          d.y = -25;
          d.x = Math.random() * canvas.width;
        }
        if (d.x < 0) d.x = canvas.width;
      }
    }
    requestAnimationFrame(animateRain);
  }
  animateRain();
}

function toggleSkyClouds() {
  SoundEngine.playSFX("click");
  AppState.cloudsEnabled = !AppState.cloudsEnabled;
  localStorage.setItem("nilefit_clouds", String(AppState.cloudsEnabled));
  updateCloudsVisibility();
}

function updateCloudsVisibility() {
  const layer = document.getElementById("cloudsLayer");
  const btn = document.getElementById("cloudsToggleBtn");
  if (layer) {
    layer.classList.toggle("clouds-hidden", !AppState.cloudsEnabled);
  }
  if (btn) {
    const dict = NILEFIT_I18N[AppState.lang];
    btn.classList.toggle("active", AppState.cloudsEnabled);
    btn.innerHTML = `<i class="fas fa-cloud"></i> <span>${AppState.cloudsEnabled ? dict.cloudsBtnOn : dict.cloudsBtnOff}</span>`;
  }
}

function cycleRainIntensity() {
  SoundEngine.playSFX("click");
  AppState.rainLevel = (AppState.rainLevel + 1) % 4;
  updateRainButtonLabel();
}

function updateRainButtonLabel() {
  const btn = document.getElementById("rainToggleBtn");
  if (!btn) return;
  const labelsAr = ["المطر: متوقف", "مطر خفيف 🌦️", "مطر غزير 🌧️", "عاصفة ممطرة ⛈️"];
  const labelsEn = ["Rain: Off", "Light Rain 🌦️", "Heavy Rain 🌧️", "Storm Rain ⛈️"];
  btn.innerHTML = `<i class="fas fa-cloud-showers-heavy"></i> <span>${AppState.lang === "ar" ? labelsAr[AppState.rainLevel] : labelsEn[AppState.rainLevel]}</span>`;
  btn.classList.toggle("active", AppState.rainLevel > 0);
}

/* ==========================================================================
   3. LIVE CLOCK & DATE (WITH DAY, HOUR, MINUTE & SECOND)
   ========================================================================== */
function updateLiveClock() {
  const el = document.getElementById("liveClockDisplay");
  if (!el) return;
  const now = new Date();
  const locale = AppState.lang === "ar" ? "ar-EG" : "en-US";

  const dayStr = now.toLocaleDateString(locale, {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric"
  });

  let hijriStr = "";
  try {
    hijriStr = now.toLocaleDateString(AppState.lang === "ar" ? "ar-SA-u-ca-islamic" : "en-TN-u-ca-islamic", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  } catch (e) {}

  const timeStr = now.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  el.innerHTML = `
    <i class="far fa-calendar-alt"></i>
    <span>${dayStr}${hijriStr ? ` • ${hijriStr}` : ""}</span>
    <span class="clock-time"><i class="far fa-clock"></i> ${timeStr}</span>
  `;
}

/* ==========================================================================
   4. PROFILE, IDEAL WEIGHT (BY HEIGHT & AGE), BMI & NUTRITION CALCULATOR
   ========================================================================== */
function getCalculatedMetrics() {
  const p = AppState.profile;
  const heightM = p.height / 100;
  const bmi = +(p.weight / (heightM * heightM)).toFixed(1);

  const ageOffset = p.age > 35 ? (p.age - 35) * 0.12 : 0;
  const minHealthyWeight = +(18.5 * heightM * heightM + ageOffset * 0.5).toFixed(1);
  const maxHealthyWeight = +(24.9 * heightM * heightM + ageOffset).toFixed(1);

  const heightInchesOver5Ft = Math.max(0, (p.height - 152.4) / 2.54);
  const baseIdeal = p.gender === "male"
    ? 50 + 2.3 * heightInchesOver5Ft
    : 45.5 + 2.3 * heightInchesOver5Ft;
  const idealWeight = +(baseIdeal + ageOffset * 0.6).toFixed(1);

  const bmr = Math.round(
    p.gender === "male"
      ? 10 * p.weight + 6.25 * p.height - 5 * p.age + 5
      : 10 * p.weight + 6.25 * p.height - 5 * p.age - 161
  );

  const multMap = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    athlete: 1.9
  };
  const tdee = Math.round(bmr * (multMap[p.activity] || 1.55));

  let targetCal = tdee;
  if (p.goal === "lose") targetCal = Math.max(1350, tdee - 500);
  else if (p.goal === "gain") targetCal = tdee + 400;

  const levelBonusPro = p.level === "advanced" ? 0.2 : p.level === "intermediate" ? 0.1 : 0;
  const proteinPerKg = (p.goal === "lose" ? 2.0 : p.goal === "gain" ? 1.9 : 1.7) + levelBonusPro;
  const proteinG = Math.round(p.weight * proteinPerKg);
  const fatG = Math.round((targetCal * 0.26) / 9);
  const carbG = Math.max(60, Math.round((targetCal - proteinG * 4 - fatG * 9) / 4));
  const fiberG = Math.round((targetCal / 1000) * 14);
  const waterL = +(p.weight * 0.038).toFixed(1);

  return {
    bmi,
    minHealthyWeight,
    maxHealthyWeight,
    idealWeight,
    bmr,
    tdee,
    targetCal,
    proteinG,
    carbG,
    fatG,
    fiberG,
    waterL
  };
}

function saveAndCalculateProfile() {
  SoundEngine.playSFX("success");
  const nameEl = document.getElementById("inpName");
  const ageEl = document.getElementById("inpAge");
  const genderEl = document.getElementById("inpGender");
  const heightEl = document.getElementById("inpHeight");
  const weightEl = document.getElementById("inpWeight");
  const actEl = document.getElementById("inpActivity");
  const goalEl = document.getElementById("inpGoal");
  const lvlEl = document.getElementById("inpLevel");

  if (nameEl) {
    AppState.profile = {
      name: nameEl.value.trim() || (AppState.lang === "ar" ? "بطل NileFitPro" : "NileFitPro Hero"),
      age: Math.min(90, Math.max(12, parseInt(ageEl.value, 10) || 25)),
      gender: genderEl.value,
      height: Math.min(230, Math.max(120, parseInt(heightEl.value, 10) || 175)),
      weight: Math.min(250, Math.max(35, parseFloat(weightEl.value) || 80)),
      activity: actEl.value,
      goal: goalEl.value,
      level: lvlEl.value
    };
    localStorage.setItem("nilefit_profile", JSON.stringify(AppState.profile));
  }

  renderAllSections();
}

function renderProfileAndIdealWeight() {
  const m = getCalculatedMetrics();
  const p = AppState.profile;
  const isAr = AppState.lang === "ar";

  let bmiCat = "";
  let bmiColor = "#10b981";
  if (m.bmi < 18.5) {
    bmiCat = isAr ? "نحافة (يحتاج زيادة وزن صحية)" : "Underweight (Needs Lean Mass)";
    bmiColor = "#38bdf8";
  } else if (m.bmi < 25) {
    bmiCat = isAr ? "وزن مثالي وصحي ممتاز ✨" : "Healthy & Optimal Weight ✨";
    bmiColor = "#10b981";
  } else if (m.bmi < 30) {
    bmiCat = isAr ? "زيادة في الوزن (فرصة رائعة للتنشيف)" : "Overweight (Great Recomp Potential)";
    bmiColor = "#f59e0b";
  } else {
    bmiCat = isAr ? "سمنة (ننصح بنظام عجز سعرات + كارديو)" : "Obese (Deficit + Cardio Recommended)";
    bmiColor = "#ef4444";
  }

  const weightDiff = +(p.weight - m.idealWeight).toFixed(1);
  const diffText = Math.abs(weightDiff) <= 2
    ? (isAr ? "أنت في نطاق وزنك المثالي تماماً بالنسبة لطولك وسنك! 🎉" : "You are right at your ideal weight for your height and age! 🎉")
    : weightDiff > 0
      ? (isAr ? `تحتاج لخسارة حوالي ${weightDiff} كجم للوصول للوزن المثالي لطولك (${p.height} سم) وسنك (${p.age} سنة)` : `Lose ~${weightDiff} kg to reach your ideal weight for height & age`)
      : (isAr ? `تحتاج لزيادة حوالي ${Math.abs(weightDiff)} كجم عضلات صافية للوصول للوزن المثالي` : `Gain ~${Math.abs(weightDiff)} kg of lean mass to reach ideal weight`);

  const pointerPos = Math.min(96, Math.max(4, ((m.bmi - 14) / 26) * 100));

  const out = document.getElementById("idealWeightOutput");
  if (!out) return;

  out.innerHTML = `
    <div class="grid-4" style="margin-bottom:20px;">
      <div class="stat-card">
        <div class="stat-icon">⚖️</div>
        <div class="stat-value">${m.idealWeight} <small style="font-size:0.5em">${isAr ? "كجم" : "kg"}</small></div>
        <div class="stat-label">${isAr ? `الوزن المثالي لطولك (${p.height}سم) وسنك (${p.age}سنة)` : `Ideal Weight (${p.height}cm, ${p.age}yo)`}</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">🎯</div>
        <div class="stat-value" style="font-size:1.45rem;">${m.minHealthyWeight} - ${m.maxHealthyWeight} <small style="font-size:0.55em">${isAr ? "كجم" : "kg"}</small></div>
        <div class="stat-label">${isAr ? "النطاق الصحي الآمن للوزن" : "Healthy Weight Range"}</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">🔥</div>
        <div class="stat-value">${m.targetCal} <small style="font-size:0.5em">kcal</small></div>
        <div class="stat-label">${isAr ? "سعراتك اليومية المستهدفة" : "Target Daily Calories"}</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">💧</div>
        <div class="stat-value">${m.waterL} <small style="font-size:0.5em">${isAr ? "لتر" : "L"}</small></div>
        <div class="stat-label">${isAr ? "احتياج الماء اليومي" : "Daily Water Need"}</div>
      </div>
    </div>

    <div class="bmi-meter-wrap">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
        <div>
          <h4 style="font-size:1.1rem;">${isAr ? "مؤشر كتلة الجسم (BMI) وتحليل الوزن المثالي بالنسبة للطول والسن" : "BMI & Height/Age Ideal Weight Analysis"}</h4>
          <p style="color:var(--text-muted);font-size:0.9rem;margin-top:4px;">${diffText}</p>
        </div>
        <div style="text-align:center;">
          <span style="font-size:2rem;font-weight:900;color:${bmiColor};">BMI: ${m.bmi}</span>
          <div style="font-size:0.85rem;font-weight:700;color:${bmiColor};">${bmiCat}</div>
        </div>
      </div>
      <div class="bmi-scale-bar">
        <div class="bmi-marker" style="left:${pointerPos}%;"></div>
      </div>
      <div class="bmi-scale-labels">
        <span>15 (${isAr ? "نحافة" : "Underweight"})</span>
        <span>18.5 - 24.9 (${isAr ? "مثالي وصحي" : "Healthy"})</span>
        <span>25 - 29.9 (${isAr ? "وزن زائد" : "Overweight"})</span>
        <span>30+ (${isAr ? "سمنة" : "Obese"})</span>
      </div>
    </div>

    <div class="grid-4">
      <div class="stat-card" style="border-bottom:4px solid #10b981;">
        <div class="stat-value" style="color:#10b981;">${m.proteinG}g</div>
        <div class="stat-label">${isAr ? "البروتين اليومي (لبناء العضلات)" : "Daily Protein"} (${m.proteinG * 4} kcal)</div>
      </div>
      <div class="stat-card" style="border-bottom:4px solid #f59e0b;">
        <div class="stat-value" style="color:#f59e0b;">${m.carbG}g</div>
        <div class="stat-label">${isAr ? "الكربوهيدرات اليومية (للطاقة)" : "Daily Carbs"} (${m.carbG * 4} kcal)</div>
      </div>
      <div class="stat-card" style="border-bottom:4px solid #8b5cf6;">
        <div class="stat-value" style="color:#8b5cf6;">${m.fatG}g</div>
        <div class="stat-label">${isAr ? "الدهون الصحية (زيت زيتون سيناء / سمنة بلدي)" : "Healthy Fats"} (${m.fatG * 9} kcal)</div>
      </div>
      <div class="stat-card" style="border-bottom:4px solid #0ea5e9;">
        <div class="stat-value" style="color:#0ea5e9;">${m.fiberG}g</div>
        <div class="stat-label">${isAr ? "الألياف الغذائية والفيتامينات" : "Dietary Fiber"} (BMR: ${m.bmr})</div>
      </div>
    </div>
  `;
}

/* ==========================================================================
   5. DIET PLANNER (28+ ALTERNATIVES, OLIVE OIL / BALADI GHEE, CARTOON PREP VIDEO)
   ========================================================================== */
function setPreferredFat(fatType) {
  SoundEngine.playSFX("click");
  AppState.preferredFat = fatType;
  localStorage.setItem("nilefit_fat", fatType);
  renderDietPlan();
}

function renderDietPlan() {
  const m = getCalculatedMetrics();
  const isAr = AppState.lang === "ar";
  const scale = m.targetCal / 2000;
  const totalAltsCount = NILEFIT_MEALS.reduce((acc, s) => acc + s.options.length, 0);

  const summaryEl = document.getElementById("dietMacrosSummary");
  if (summaryEl) {
    summaryEl.innerHTML = `
      <div style="display:flex;flex-wrap:wrap;gap:14px;align-items:center;justify-content:space-between;background:var(--bg-elevated);padding:18px 20px;border-radius:var(--radius-md);margin-bottom:20px;border:1px solid var(--border-color);">
        <div style="max-width:740px;">
          <h3 style="font-size:1.12rem;color:var(--primary);">
            <i class="fas fa-check-circle"></i>
            ${isAr
              ? `إجمالي خطتك المحسوبة بدقة لبياناتك (${AppState.profile.weight} كجم • ${NILEFIT_I18N.ar["lvl" + capitalize(AppState.profile.level)]}): ${m.targetCal} سعرة حرارية`
              : `Your Precision-Scaled Daily Plan (${AppState.profile.weight}kg • ${capitalize(AppState.profile.level)}): ${m.targetCal} kcal`}
          </h3>
          <p style="font-size:0.86rem;color:var(--text-muted);margin-top:5px;line-height:1.6;">
            ${isAr
              ? `💡 وفرنا لك <strong>${totalAltsCount} بديلاً صحياً واقتصادياً</strong> محسوب السعرات والماكروز بدقة (كشري صحي، عدس، فول، جبنة قريش، سردين، تونة، بيض، كبدة، فاصوليا، دجاج) لأن مفيش حد هيقدر ياكل ربع كيلو لحمة أو فراخ كل يوم! وأي وجبة تحتاج لدهون صحية نستخدم فيها <strong>زيت زيتون مزارع سيناء البكر</strong> أو <strong>السمنة البلدي الطبيعية</strong>.`
              : `💡 Choose from <strong>${totalAltsCount} precision-scaled healthy & budget-friendly alternatives</strong> prepared with <strong>Sinai Extra Virgin Olive Oil</strong> or <strong>Natural Baladi Ghee</strong>!`}
          </p>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;align-items:center;">
            <span style="font-size:0.82rem;font-weight:800;">${isAr ? "الدهون الصحية المفضلة للتحضير:" : "Preferred Healthy Cooking Fat:"}</span>
            <button class="action-btn ${AppState.preferredFat === "olive" ? "active" : ""}" style="height:34px;font-size:0.8rem;" onclick="setPreferredFat('olive')">
              🫒 ${isAr ? "زيت زيتون مزارع سيناء (معصور على البارد)" : "Sinai Extra Virgin Olive Oil"}
            </button>
            <button class="action-btn ${AppState.preferredFat === "ghee" ? "active" : ""}" style="height:34px;font-size:0.8rem;" onclick="setPreferredFat('ghee')">
              🧈 ${isAr ? "السمنة البلدي الطبيعية" : "Natural Baladi Ghee"}
            </button>
          </div>
        </div>
        <div class="macro-pills" style="margin:0;">
          <span class="macro-pill cal">🔥 ${m.targetCal} kcal</span>
          <span class="macro-pill pro">🥩 ${m.proteinG}g ${isAr ? "بروتين" : "Protein"}</span>
          <span class="macro-pill carb">🌾 ${m.carbG}g ${isAr ? "كارب" : "Carbs"}</span>
          <span class="macro-pill fat">🫒 ${m.fatG}g ${isAr ? "دهون صحية" : "Healthy Fats"}</span>
          <span class="macro-pill fib">🥬 ${m.fiberG}g ${isAr ? "ألياف" : "Fiber"}</span>
        </div>
      </div>
    `;
  }

  const grid = document.getElementById("mealsGridContainer");
  if (!grid) return;

  grid.innerHTML = NILEFIT_MEALS.map(slot => {
    const chosenIdx = AppState.selectedMealOptions[slot.slotId] || 0;
    const opt = slot.options[chosenIdx] || slot.options[0];

    const cal = Math.round(opt.baseCal * scale);
    const pro = Math.round(opt.basePro * scale);
    const carb = Math.round(opt.baseCarb * scale);
    const fat = Math.round(opt.baseFat * scale);
    const fib = Math.round(opt.baseFib * scale);
    const oilSpoonGrams = Math.max(4, Math.round(6 * scale));
    const activeFatLabel = AppState.preferredFat === "olive"
      ? (isAr ? `🫒 مضاف إليها: ${oilSpoonGrams} جم زيت زيتون مزارع سيناء البكر (أو سمنة بلدي)` : `🫒 Prepared with: ${oilSpoonGrams}g Sinai Extra Virgin Olive Oil`)
      : (isAr ? `🧈 مضاف إليها: ${oilSpoonGrams} جم سمنة بلدي طبيعية (أو زيت زيتون سيناء)` : `🧈 Prepared with: ${oilSpoonGrams}g Natural Baladi Ghee`);

    const portionFactor = scale >= 1.15
      ? (isAr ? `حصة ضخامة (${Math.round(scale * 100)}%)` : `Bulk Portion (${Math.round(scale * 100)}%)`)
      : scale <= 0.88
        ? (isAr ? `حصة تنشيف (${Math.round(scale * 100)}%)` : `Cut Portion (${Math.round(scale * 100)}%)`)
        : (isAr ? "حصة قياسية متوازنة (100%)" : "Balanced Portion (100%)");

    return `
      <div class="meal-card">
        <div class="meal-media">
          <img src="${opt.image}" alt="${opt.name[AppState.lang]}" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'">
          <span class="meal-time-badge"><i class="far fa-clock"></i> ${slot.slotName[AppState.lang]} • ${slot.time[AppState.lang]}</span>
          <button class="meal-video-btn" onclick="openMealRecipeModal('${slot.slotId}', ${chosenIdx})">
            <i class="fas fa-film"></i> ${isAr ? "فيديو كرتوني مبسط لطريقة التحضير" : "Cartoon Prep Video & Steps"}
          </button>
        </div>
        <div class="meal-body">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:6px;flex-wrap:wrap;">
            <span style="font-size:0.75rem;font-weight:800;color:var(--primary);background:rgba(0,184,148,0.12);padding:3px 10px;border-radius:12px;">
              ✨ ${opt.tag[AppState.lang]}
            </span>
            <span style="font-size:0.75rem;color:var(--text-muted);font-weight:700;">⚖️ ${portionFactor}</span>
          </div>
          <h3 class="meal-title">${opt.name[AppState.lang]}</h3>
          <p class="meal-desc">${opt.desc[AppState.lang]}</p>

          <div class="oil-highlight-box">
            <span>${activeFatLabel}</span>
            <button class="action-btn" style="height:26px;font-size:0.72rem;padding:0 10px;" onclick="switchSection('product')">
              ${isAr ? "فوائد زيت سيناء" : "Sinai Oil Info"}
            </button>
          </div>

          <div class="macro-pills">
            <span class="macro-pill cal">🔥 ${cal} ${isAr ? "سعرة" : "kcal"}</span>
            <span class="macro-pill pro">💪 ${pro}g ${isAr ? "بروتين" : "Pro"}</span>
            <span class="macro-pill carb">⚡ ${carb}g ${isAr ? "كارب" : "Carb"}</span>
            <span class="macro-pill fat">🫒 ${fat}g ${isAr ? "دهون" : "Fat"}</span>
            <span class="macro-pill fib">🌿 ${fib}g ${isAr ? "ألياف" : "Fiber"}</span>
          </div>

          <div class="alternatives-box">
            <div class="alternatives-title">
              <i class="fas fa-sync-alt" style="color:var(--primary)"></i>
              ${isAr ? `البدائل الصحية المحسوبة لهذه الوجبة (${slot.options.length} بدائل - اضغط للتبديل):` : `Calculated Healthy Alternatives (${slot.options.length} options - Click to Swap):`}
            </div>
            <div class="alt-chips">
              ${slot.options.map((alt, idx) => {
                const altCal = Math.round(alt.baseCal * scale);
                const altPro = Math.round(alt.basePro * scale);
                return `
                  <button class="alt-chip ${idx === chosenIdx ? "active" : ""}" onclick="selectMealAlternative('${slot.slotId}', ${idx})">
                    ${idx === chosenIdx ? "✓ " : ""}${alt.name[AppState.lang].split("+")[0].trim()} (${altCal} kcal | ${altPro}g P)
                  </button>
                `;
              }).join("")}
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function selectMealAlternative(slotId, idx) {
  SoundEngine.playSFX("click");
  AppState.selectedMealOptions[slotId] = idx;
  localStorage.setItem("nilefit_meals", JSON.stringify(AppState.selectedMealOptions));
  renderDietPlan();
}

function openAllAlternativesModal() {
  SoundEngine.playSFX("click");
  const m = getCalculatedMetrics();
  const scale = m.targetCal / 2000;
  const isAr = AppState.lang === "ar";

  const modal = document.getElementById("universalModal");
  const body = document.getElementById("universalModalBody");
  if (!modal || !body) return;

  let rowsHtml = "";
  let counter = 1;
  NILEFIT_MEALS.forEach(slot => {
    slot.options.forEach((opt, idx) => {
      const cal = Math.round(opt.baseCal * scale);
      const pro = Math.round(opt.basePro * scale);
      const carb = Math.round(opt.baseCarb * scale);
      const fat = Math.round(opt.baseFat * scale);
      rowsHtml += `
        <tr style="border-bottom:1px solid var(--border-color);">
          <td style="padding:8px;font-weight:800;color:var(--primary);">#${counter++}</td>
          <td style="padding:8px;font-size:0.82rem;font-weight:700;">${slot.slotName[AppState.lang].split("(")[0]}</td>
          <td style="padding:8px;font-size:0.85rem;font-weight:800;">${opt.name[AppState.lang]}</td>
          <td style="padding:8px;font-weight:800;color:#ef4444;">${cal} kcal</td>
          <td style="padding:8px;font-weight:800;color:#10b981;">${pro}g</td>
          <td style="padding:8px;font-weight:700;">${carb}g</td>
          <td style="padding:8px;font-weight:700;">${fat}g</td>
          <td style="padding:8px;">
            <button class="action-btn active" style="height:30px;font-size:0.75rem;padding:0 10px;" onclick="selectMealAlternative('${slot.slotId}', ${idx});closeUniversalModal();">
              ${isAr ? "اختيار" : "Select"}
            </button>
          </td>
        </tr>
      `;
    });
  });

  body.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
      <h3 style="font-size:1.2rem;color:var(--primary);">
        <i class="fas fa-table-list"></i>
        ${isAr ? `موسوعة البدائل الصحية المحسوبة لبياناتك (${counter - 1} بديل بالجرام والسعرات)` : `All ${counter - 1} Calculated Healthy Meal Alternatives`}
      </h3>
      <button class="action-btn" onclick="closeUniversalModal()"><i class="fas fa-times"></i></button>
    </div>
    <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:12px;">
      ${isAr ? "جميع القيم الغذائية أدناه محسوبة تلقائياً لتناسب سعراتك اليومية المستهدفة (" + m.targetCal + " سعرة) مع زيت زيتون مزارع سيناء أو السمنة البلدي:" : "All macros below are dynamically scaled to your daily target (" + m.targetCal + " kcal):"}
    </p>
    <div style="overflow-x:auto;max-height:62vh;">
      <table style="width:100%;border-collapse:collapse;text-align:inherit;">
        <thead>
          <tr style="background:var(--bg-elevated);border-bottom:2px solid var(--primary);">
            <th style="padding:10px;">#</th>
            <th style="padding:10px;">${isAr ? "الوجبة" : "Slot"}</th>
            <th style="padding:10px;">${isAr ? "البديل الصحي ومكوناته" : "Meal Alternative"}</th>
            <th style="padding:10px;">${isAr ? "السعرات" : "Calories"}</th>
            <th style="padding:10px;">${isAr ? "بروتين" : "Protein"}</th>
            <th style="padding:10px;">${isAr ? "كارب" : "Carbs"}</th>
            <th style="padding:10px;">${isAr ? "دهون" : "Fats"}</th>
            <th style="padding:10px;">${isAr ? "تفعيل" : "Action"}</th>
          </tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    </div>
  `;
  modal.classList.add("open");
}

/* ==========================================================================
   CARTOON CHEF ANIMATED RECIPE PREP VIDEO PLAYER (ERROR-FREE HTML5 CANVAS!)
   ========================================================================== */
let chefAnimFrameId = null;

function openMealRecipeModal(slotId, idx) {
  SoundEngine.playSFX("click");
  const slot = NILEFIT_MEALS.find(s => s.slotId === slotId);
  if (!slot) return;
  const opt = slot.options[idx] || slot.options[0];
  const isAr = AppState.lang === "ar";
  const m = getCalculatedMetrics();
  const scale = m.targetCal / 2000;

  const modal = document.getElementById("universalModal");
  const body = document.getElementById("universalModalBody");
  if (!modal || !body) return;

  const stepsList = opt.steps[AppState.lang];

  body.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;gap:10px;">
      <h3 style="font-size:1.18rem;color:var(--primary);"><i class="fas fa-hat-chef"></i> ${isAr ? "فيديو كرتوني مبسط لطريقة التحضير:" : "Cartoon Cooking Guide:"} ${opt.name[AppState.lang]}</h3>
      <button class="action-btn" onclick="closeUniversalModal()"><i class="fas fa-times"></i></button>
    </div>

    <!-- CARTOON CHEF VIDEO CANVAS -->
    <div style="position:relative;border-radius:16px;overflow:hidden;background:linear-gradient(180deg,#0f172a 0%,#1e293b 100%);border:2px solid var(--primary);margin-bottom:16px;">
      <canvas id="cartoonChefCanvas" width="700" height="310" style="width:100%;height:auto;display:block;"></canvas>
      <div style="position:absolute;top:10px;right:10px;background:rgba(0,184,148,0.9);color:#fff;padding:4px 12px;border-radius:14px;font-size:0.78rem;font-weight:800;">
        👨‍🍳 ${isAr ? "الشيف الكرتوني الذكي • NileFitPro" : "NileFitPro Cartoon Chef"}
      </div>
      <button class="action-btn active" style="position:absolute;top:10px;left:10px;height:32px;font-size:0.78rem;" onclick="narrateRecipeSteps('${slotId}', ${idx})">
        <i class="fas fa-volume-high"></i> ${isAr ? "شرح صوتي للوصفة" : "Voice Narration"}
      </button>
    </div>

    <div class="oil-highlight-box" style="margin-bottom:14px;">
      <span>🫒 <strong>${isAr ? "إضافة الزيوت الصحية:" : "Healthy Oil/Fat:"}</strong> ${opt.oilOption ? opt.oilOption[AppState.lang] : ""}</span>
    </div>

    <h4 style="margin-bottom:8px;color:var(--text-main);">📋 ${isAr ? "خطوات التحضير الصحية بالتفصيل:" : "Step-by-Step Healthy Preparation:"}</h4>
    <ol style="padding-inline-start:22px;line-height:1.9;color:var(--text-muted);margin-bottom:16px;">
      ${stepsList.map((s, i) => `<li><strong>${isAr ? `الخطوة ${i + 1}:` : `Step ${i + 1}:`}</strong> ${s}</li>`).join("")}
    </ol>

    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;padding-top:12px;border-top:1px solid var(--border-color);">
      <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(opt.name[AppState.lang] + " طريقة عمل صحية")}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="background:linear-gradient(135deg,#ef4444,#b91c1c);text-decoration:none;padding:9px 16px;font-size:0.85rem;">
        <i class="fab fa-youtube"></i> ${isAr ? "بحث عن الوصفة على اليوتيوب" : "Search Recipe on YouTube"}
      </a>
      <span style="font-size:0.85rem;font-weight:800;color:var(--primary);">
        🔥 ${Math.round(opt.baseCal * scale)} kcal | 💪 ${Math.round(opt.basePro * scale)}g Protein
      </span>
      <button class="btn btn-primary" onclick="closeUniversalModal()">${isAr ? "تم، إغلاق الفيديو" : "Done"}</button>
    </div>
  `;

  modal.classList.add("open");
  startCartoonChefCanvas(opt, stepsList);
}

function narrateRecipeSteps(slotId, idx) {
  const slot = NILEFIT_MEALS.find(s => s.slotId === slotId);
  if (!slot) return;
  const opt = slot.options[idx] || slot.options[0];
  const text = opt.name[AppState.lang] + ". " + opt.steps[AppState.lang].join(" ثم ");
  speakTextWithWebSpeech(text, AppState.lang === "ar" ? "ar-EG" : "en-US");
}

function startCartoonChefCanvas(opt, stepsList) {
  if (chefAnimFrameId) cancelAnimationFrame(chefAnimFrameId);
  const canvas = document.getElementById("cartoonChefCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const startTime = performance.now();

  function drawChefLoop(now) {
    if (!document.getElementById("cartoonChefCanvas")) return;
    const elapsed = (now - startTime) / 1000;
    const stepIdx = Math.floor(elapsed / 4.5) % stepsList.length;
    const phase = (Math.sin(elapsed * 3.5) + 1) / 2;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Kitchen Wall & Tile Background
    ctx.fillStyle = "#111b2e";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(148,163,184,0.1)";
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 45) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h - 85); ctx.stroke();
    }
    for (let y = 0; y < h - 85; y += 35) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    // Kitchen Countertop
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(0, h - 85, w, 85);
    ctx.fillStyle = "#334155";
    ctx.fillRect(0, h - 85, w, 8);

    // Cartoon Chef Character (Center-Left)
    const chefX = 185;
    const chefY = h - 90;
    const bob = Math.sin(elapsed * 4) * 3;

    // Chef Coat / Torso
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.roundRect(chefX - 38, chefY - 95 + bob, 76, 95, 16);
    ctx.fill();
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Chef Buttons & Green Scarf
    ctx.fillStyle = "#00b894";
    ctx.beginPath();
    ctx.moveTo(chefX - 20, chefY - 92 + bob);
    ctx.lineTo(chefX + 20, chefY - 92 + bob);
    ctx.lineTo(chefX, chefY - 72 + bob);
    ctx.closePath();
    ctx.fill();

    // Chef Head
    ctx.fillStyle = "#fed7aa";
    ctx.beginPath();
    ctx.arc(chefX, chefY - 125 + bob, 26, 0, Math.PI * 2);
    ctx.fill();

    // Eyes & Smile
    ctx.fillStyle = "#0f172a";
    ctx.beginPath();
    ctx.arc(chefX - 9, chefY - 128 + bob, 3, 0, Math.PI * 2);
    ctx.arc(chefX + 9, chefY - 128 + bob, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.arc(chefX, chefY - 120 + bob, 9, 0.15 * Math.PI, 0.85 * Math.PI);
    ctx.stroke();

    // Tall Puffy Cartoon Chef Hat (Toque)
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.roundRect(chefX - 24, chefY - 165 + bob, 48, 22, 6);
    ctx.arc(chefX - 14, chefY - 172 + bob, 16, 0, Math.PI * 2);
    ctx.arc(chefX, chefY - 178 + bob, 19, 0, Math.PI * 2);
    ctx.arc(chefX + 14, chefY - 172 + bob, 16, 0, Math.PI * 2);
    ctx.fill();

    // Animated Chef Arm Stirring / Pouring Olive Oil
    const armAngle = Math.sin(elapsed * 5) * 14;
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 13;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(chefX + 32, chefY - 75 + bob);
    ctx.lineTo(chefX + 85, chefY - 58 + armAngle * 0.5);
    ctx.lineTo(325, chefY - 45 + armAngle * 0.3);
    ctx.stroke();

    // Stove & Cooking Pot / Skillet (Center-Right)
    const stoveX = 365;
    const stoveY = h - 85;

    // Animated Blue/Orange Cooking Flames
    for (let f = -2; f <= 2; f++) {
      ctx.fillStyle = f % 2 === 0 ? "#f59e0b" : "#38bdf8";
      ctx.beginPath();
      ctx.arc(stoveX + f * 14, stoveY - 4, 6 + phase * 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Pot / Pan
    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.roundRect(stoveX - 52, stoveY - 48, 104, 42, [4, 4, 18, 18]);
    ctx.fill();
    ctx.fillStyle = "#94a3b8";
    ctx.fillRect(stoveX - 64, stoveY - 44, 12, 6);
    ctx.fillRect(stoveX + 52, stoveY - 44, 12, 6);

    // Rising Steam & Healthy Food Bubbles
    for (let s = 0; s < 4; s++) {
      const sy = stoveY - 60 - ((elapsed * 35 + s * 22) % 75);
      const sx = stoveX - 25 + s * 18 + Math.sin(elapsed * 3 + s) * 6;
      ctx.strokeStyle = `rgba(255,255,255,${Math.max(0, (stoveY - 50 - sy) / 90)})`;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(sx, sy, 6, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Sinai Extra Virgin Olive Oil Bottle & Baladi Ghee Jar on Counter
    const bottleX = 525;
    const bottleY = h - 85;
    // Green Glass Olive Oil Bottle
    ctx.fillStyle = "#4b830d";
    ctx.beginPath();
    ctx.roundRect(bottleX, bottleY - 68, 34, 68, 8);
    ctx.fill();
    ctx.fillStyle = "#facc15";
    ctx.fillRect(bottleX + 4, bottleY - 46, 26, 26);
    ctx.fillStyle = "#0f172a";
    ctx.font = "bold 9px Cairo, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("زيت سيناء", bottleX + 17, bottleY - 30);

    // Golden Olive Oil Droplets Pouring Animation
    const dropY = stoveY - 82 + ((elapsed * 60) % 35);
    ctx.fillStyle = "#facc15";
    ctx.beginPath();
    ctx.arc(stoveX, dropY, 4.5, 0, Math.PI * 2);
    ctx.fill();

    // Subtitle Banner Showing Current Preparation Step
    ctx.fillStyle = "rgba(15, 23, 42, 0.92)";
    ctx.fillRect(16, h - 68, w - 32, 56);
    ctx.strokeStyle = "#00b894";
    ctx.lineWidth = 2;
    ctx.strokeRect(16, h - 68, w - 32, 56);

    ctx.fillStyle = "#55efc4";
    ctx.font = "bold 13px Cairo, Poppins, sans-serif";
    ctx.textAlign = "center";
    const stepTitle = AppState.lang === "ar"
      ? `الخطوة (${stepIdx + 1} من ${stepsList.length}) — تحضير صحي بزيت زيتون سيناء أو السمنة البلدي:`
      : `Step (${stepIdx + 1} of ${stepsList.length}) — Healthy Prep with Sinai Olive Oil / Ghee:`;
    ctx.fillText(stepTitle, w / 2, h - 46);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 13.5px Cairo, Poppins, sans-serif";
    const stepText = stepsList[stepIdx] || "";
    ctx.fillText(stepText.length > 82 ? stepText.slice(0, 82) + "..." : stepText, w / 2, h - 24);

    chefAnimFrameId = requestAnimationFrame(drawChefLoop);
  }

  chefAnimFrameId = requestAnimationFrame(drawChefLoop);
}

function closeUniversalModal() {
  if (chefAnimFrameId) {
    cancelAnimationFrame(chefAnimFrameId);
    chefAnimFrameId = null;
  }
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
  const modal = document.getElementById("universalModal");
  const body = document.getElementById("universalModalBody");
  if (body) body.innerHTML = "";
  if (modal) modal.classList.remove("open");
}

/* ==========================================================================
   6. WORKOUT SYSTEMS & ERROR-FREE CARTOON ATHLETE ON GYM MACHINES
   ========================================================================== */
let trainerAnimFrameId = null;

function setTrainerSpeed(spd) {
  SoundEngine.playSFX("click");
  AppState.trainerSpeed = spd;
  renderWorkoutSection();
}

function renderWorkoutSection() {
  const isAr = AppState.lang === "ar";
  const splitSelector = document.getElementById("workoutSplitsGrid");
  if (!splitSelector) return;

  splitSelector.innerHTML = Object.values(NILEFIT_WORKOUTS).map(sys => `
    <div class="split-card ${AppState.selectedSplit === sys.id ? "active" : ""}" onclick="selectWorkoutSplit('${sys.id}')">
      <span class="split-emoji">${sys.emoji}</span>
      <h4>${sys.name[AppState.lang]}</h4>
      <p>${sys.desc[AppState.lang]}</p>
    </div>
  `).join("");

  const currentSys = NILEFIT_WORKOUTS[AppState.selectedSplit] || NILEFIT_WORKOUTS.ppl;
  if (AppState.selectedDayIdx >= currentSys.days.length) {
    AppState.selectedDayIdx = 0;
  }

  const lvl = AppState.profile.level;
  const setBonus = lvl === "advanced" ? 1 : lvl === "beginner" ? -1 : 0;
  const restAdj = lvl === "advanced" ? -10 : lvl === "beginner" ? 15 : 0;
  const levelBadgeText = isAr
    ? `مُخصص لمستواك: ${NILEFIT_I18N.ar["lvl" + capitalize(lvl)]}`
    : `Tailored for: ${NILEFIT_I18N.en["lvl" + capitalize(lvl)]}`;

  const dayTabsHtml = currentSys.days.map((d, idx) => `
    <button class="action-btn ${idx === AppState.selectedDayIdx ? "active" : ""}" onclick="selectWorkoutDay(${idx})">
      <i class="fas fa-calendar-day"></i> ${d.dayName[AppState.lang]}
    </button>
  `).join("");

  const currentDay = currentSys.days[AppState.selectedDayIdx];
  const exContainer = document.getElementById("workoutExercisesArea");
  if (!exContainer) return;

  exContainer.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:18px;">
      <div style="display:flex;gap:8px;flex-wrap:wrap;">${dayTabsHtml}</div>
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
        <span style="font-size:0.8rem;font-weight:800;color:var(--text-muted);">${isAr ? "سرعة شرح الفيديو الكرتوني:" : "Cartoon Speed:"}</span>
        <button class="action-btn ${AppState.trainerSpeed === 0.5 ? "active" : ""}" style="height:32px;padding:0 10px;font-size:0.76rem;" onclick="setTrainerSpeed(0.5)">0.5x ${isAr ? "بطيء" : "Slow"}</button>
        <button class="action-btn ${AppState.trainerSpeed === 1 ? "active" : ""}" style="height:32px;padding:0 10px;font-size:0.76rem;" onclick="setTrainerSpeed(1)">1x ${isAr ? "طبيعي" : "Normal"}</button>
        <button class="action-btn ${AppState.trainerSpeed === 1.5 ? "active" : ""}" style="height:32px;padding:0 10px;font-size:0.76rem;" onclick="setTrainerSpeed(1.5)">1.5x ${isAr ? "سريع" : "Fast"}</button>
        <span style="padding:6px 14px;border-radius:20px;background:rgba(0,184,148,0.15);color:var(--primary);font-weight:800;font-size:0.82rem;">
          ⚡ ${levelBadgeText}
        </span>
      </div>
    </div>

    <div class="grid-3">
      ${currentDay.exercises.map(ex => {
        const sets = Math.max(2, ex.baseSets + setBonus);
        const rest = Math.max(0, ex.baseRest + restAdj);
        const isDone = !!AppState.completedExercises[ex.id];
        const ytSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(ex.name[AppState.lang] + " " + (ex.searchQuery || ""))}`;

        return `
          <div class="exercise-card ${isDone ? "done" : ""}" id="exCard_${ex.id}">
            <div class="exercise-visual-box">
              <div class="exercise-mode-switch">
                <span class="ex-mode-btn active">
                  🎬 ${isAr ? "فيديو كرتوني على الجهاز" : "Cartoon Machine Video"}
                </span>
                <a href="${ytSearchUrl}" target="_blank" rel="noopener noreferrer" class="ex-mode-btn yt-link" title="${isAr ? "بحث عن التمرين على اليوتيوب" : "Search on YouTube"}">
                  <i class="fab fa-youtube"></i> ${isAr ? "بحث يوتيوب" : "YouTube Search"}
                </a>
              </div>
              <div class="trainer-canvas-wrap">
                <canvas class="pro-trainer-canvas" data-anim="${ex.animType}" data-exname="${ex.name[AppState.lang]}" width="380" height="240"></canvas>
              </div>
              <span class="machine-badge"><i class="fas fa-dumbbell"></i> ${ex.machine[AppState.lang]}</span>
            </div>

            <div class="exercise-body">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;">
                <h4 style="font-size:1.05rem;font-weight:800;margin-bottom:6px;">${ex.name[AppState.lang]}</h4>
                <button class="action-btn ${isDone ? "active" : ""}" onclick="toggleExerciseDone('${ex.id}')" title="${isAr ? "إتمام التمرين" : "Mark Completed"}">
                  <i class="fas fa-check"></i>
                </button>
              </div>
              <div style="font-size:0.82rem;color:var(--primary);font-weight:800;margin-bottom:6px;">
                🎯 ${isAr ? "العضلة المستهدفة:" : "Target Muscle:"} ${ex.muscle[AppState.lang]}
              </div>
              <p style="font-size:0.83rem;color:var(--text-muted);line-height:1.6;margin-bottom:12px;">
                💡 ${ex.tip[AppState.lang]}
              </p>

              <div class="macro-pills" style="margin-top:auto;">
                <span class="macro-pill pro">🔁 ${sets} ${isAr ? "مجموعات" : "Sets"}</span>
                <span class="macro-pill carb">🔢 ${ex.baseReps} ${isAr ? "عدة" : "Reps"}</span>
                ${rest > 0 ? `<span class="macro-pill fib" style="cursor:pointer;" onclick="startRestTimer(${rest})">⏱️ ${rest}${isAr ? "ث راحة" : "s Rest"}</span>` : ""}
              </div>

              <a href="${ytSearchUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="margin-top:8px;padding:7px 12px;font-size:0.8rem;text-decoration:none;width:100%;">
                <i class="fab fa-youtube" style="color:#ef4444;"></i>
                <span>${isAr ? "فتح شرح التمرين على اليوتيوب" : "Search Exercise Video on YouTube"}</span>
              </a>
            </div>
          </div>
        `;
      }).join("")}
    </div>
  `;

  startTrainerCanvases();
}

function selectWorkoutSplit(splitId) {
  SoundEngine.playSFX("click");
  AppState.selectedSplit = splitId;
  AppState.selectedDayIdx = 0;
  localStorage.setItem("nilefit_split", splitId);
  renderWorkoutSection();
  renderBodyTransformation();
  renderTrackerAndCertificate();
}

function selectWorkoutDay(dayIdx) {
  SoundEngine.playSFX("click");
  AppState.selectedDayIdx = dayIdx;
  renderWorkoutSection();
}

function toggleExerciseDone(exId) {
  AppState.completedExercises[exId] = !AppState.completedExercises[exId];
  localStorage.setItem("nilefit_done_ex", JSON.stringify(AppState.completedExercises));
  SoundEngine.playSFX(AppState.completedExercises[exId] ? "success" : "click");
  renderWorkoutSection();
}

let restTimerInterval = null;
function startRestTimer(seconds) {
  SoundEngine.playSFX("click");
  clearInterval(restTimerInterval);
  let rem = seconds;
  const modal = document.getElementById("universalModal");
  const body = document.getElementById("universalModalBody");
  const isAr = AppState.lang === "ar";

  function updateModal() {
    body.innerHTML = `
      <div style="text-align:center;padding:20px;">
        <h3 style="color:var(--primary);margin-bottom:10px;"><i class="fas fa-stopwatch"></i> ${isAr ? "مؤقت الراحة بين المجموعات" : "Between-Sets Rest Timer"}</h3>
        <div style="font-size:4.2rem;font-weight:900;color:var(--text-main);margin:20px 0;font-variant-numeric:tabular-nums;">
          ${rem}s
        </div>
        <p style="color:var(--text-muted);margin-bottom:20px;">
          ${isAr ? "خذ نفساً عميقاً، اشرب رشفة ماء، وسبّح الله استعداداً للمجموعة القادمة 💪" : "Breathe deeply and hydrate for your next set 💪"}
        </p>
        <button class="btn btn-primary" onclick="clearInterval(restTimerInterval);closeUniversalModal();">
          ${isAr ? "إنهاء الراحة والعودة للتمرين" : "Skip Rest & Continue"}
        </button>
      </div>
    `;
  }

  updateModal();
  modal.classList.add("open");

  restTimerInterval = setInterval(() => {
    rem--;
    if (rem <= 0) {
      clearInterval(restTimerInterval);
      SoundEngine.playSFX("fanfare");
      closeUniversalModal();
    } else {
      updateModal();
    }
  }, 1000);
}

/* ==========================================================================
   FULL-COLOR CARTOON CHARACTER ATHLETE ON GYM MACHINES (60FPS CANVAS ENGINE)
   ========================================================================== */
function drawCartoonHead(ctx, x, y, r = 13, facing = 1) {
  // Skin Head
  ctx.fillStyle = "#fdba74";
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();

  // Stylish Dark Hair
  ctx.fillStyle = "#1e293b";
  ctx.beginPath();
  ctx.arc(x, y - 3, r, Math.PI, Math.PI * 2);
  ctx.fill();

  // Sporty Green Headband
  ctx.fillStyle = "#00b894";
  ctx.fillRect(x - r, y - 5, r * 2, 4);

  // Expressive Eyes & Determined Smile
  ctx.fillStyle = "#0f172a";
  ctx.beginPath();
  ctx.arc(x + facing * 4, y - 1, 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#0f172a";
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.arc(x + facing * 3, y + 4, 4, 0.1 * Math.PI, 0.85 * Math.PI);
  ctx.stroke();
}

function drawLimb(ctx, x1, y1, x2, y2, thickness, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = thickness;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function startTrainerCanvases() {
  if (trainerAnimFrameId) cancelAnimationFrame(trainerAnimFrameId);

  function renderLoop(timestamp) {
    const canvases = document.querySelectorAll(".pro-trainer-canvas");
    const spd = AppState.trainerSpeed || 1;
    const t = ((timestamp || 0) * 0.0032) * spd;
    const phase = (Math.sin(t) + 1) / 2;
    const repCount = Math.floor(t / (Math.PI * 2)) % 12 + 1;

    canvases.forEach(canvas => {
      const ctx = canvas.getContext("2d");
      const w = canvas.width;
      const h = canvas.height;
      const type = canvas.getAttribute("data-anim") || "bench_press";

      ctx.clearRect(0, 0, w, h);

      // Gym Studio Wall & Mirror Grid
      ctx.strokeStyle = "rgba(148, 163, 184, 0.09)";
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 32) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h - 30); ctx.stroke();
      }
      // Gym Rubber Floor
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(0, h - 30, w, 30);
      ctx.fillStyle = "#00b894";
      ctx.fillRect(0, h - 30, w, 3);

      const pulseAlpha = 0.35 + phase * 0.5;
      const muscleGlow = `rgba(239, 68, 68, ${pulseAlpha})`;

      if (type === "bench_press" || type === "incline_press") {
        const isInc = type === "incline_press";
        // Steel Bench Press Rack & Bench Pad
        ctx.strokeStyle = "#64748b";
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.moveTo(95, h - 30); ctx.lineTo(95, h - 70);
        ctx.moveTo(240, h - 30); ctx.lineTo(240, h - 70);
        ctx.moveTo(118, h - 30); ctx.lineTo(118, h - 150);
        ctx.stroke();

        // Padded Bench
        ctx.strokeStyle = "#334155";
        ctx.lineWidth = 12;
        ctx.beginPath();
        if (isInc) {
          ctx.moveTo(98, h - 115); ctx.lineTo(190, h - 68); ctx.lineTo(248, h - 68);
        } else {
          ctx.moveTo(85, h - 72); ctx.lineTo(255, h - 72);
        }
        ctx.stroke();

        const shX = isInc ? 132 : 126;
        const shY = isInc ? h - 106 : h - 86;
        const hipX = 200;
        const hipY = h - 82;

        // Cartoon Legs & Gym Shoes
        drawLimb(ctx, hipX, hipY, 245, h - 76, 11, "#0284c7");
        drawLimb(ctx, 245, h - 76, 255, h - 34, 10, "#fdba74");
        ctx.fillStyle = "#ef4444";
        ctx.fillRect(248, h - 36, 18, 7);

        // Cartoon Muscular Torso (Sport Tank Top)
        drawLimb(ctx, shX, shY, hipX, hipY, 18, "#00b894");

        // Target Chest Muscle Glow
        ctx.fillStyle = muscleGlow;
        ctx.beginPath();
        ctx.arc(shX + 18, shY - 5, 15, 0, Math.PI * 2);
        ctx.fill();

        // Cartoon Head
        drawCartoonHead(ctx, shX - 22, shY - (isInc ? 8 : 2), 12, 1);

        // Moving Barbell / Dumbbells & Cartoon Arms
        const barY = shY - 22 - phase * 46;
        const elbowX = shX + 15;
        const elbowY = shY - 6 - phase * 20;

        drawLimb(ctx, shX, shY, elbowX, elbowY, 9, "#fdba74");
        drawLimb(ctx, elbowX, elbowY, shX + 6, barY, 8, "#fdba74");

        // Barbell Shaft & Olympic Weight Plates
        ctx.fillStyle = "#cbd5e1";
        ctx.fillRect(shX - 18, barY - 6, 48, 5);
        ctx.fillStyle = "#ef4444";
        ctx.beginPath();
        ctx.arc(shX + 6, barY - 4, 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#facc15";
        ctx.beginPath();
        ctx.arc(shX + 6, barY - 4, 6, 0, Math.PI * 2);
        ctx.fill();

      } else if (type === "lat_pulldown" || type === "cable_row") {
        // Pulley Machine Frame & Moving Weight Stack
        ctx.strokeStyle = "#64748b";
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.moveTo(105, h - 30); ctx.lineTo(105, 34); ctx.lineTo(200, 34);
        ctx.stroke();

        // Weight Stack Plates Moving Up & Down
        const stackY = h - 62 - phase * 48;
        ctx.fillStyle = "#f59e0b";
        ctx.fillRect(88, stackY, 34, 24);
        ctx.fillStyle = "#334155";
        ctx.fillRect(88, h - 55, 34, 25);

        const hipX = 205, hipY = h - 72;
        const shX = 205 + (type === "cable_row" ? phase * 14 : 4);
        const shY = h - 134;

        // Machine Seat
        ctx.fillStyle = "#475569";
        ctx.fillRect(182, h - 66, 48, 9);
        ctx.fillRect(202, h - 66, 8, 36);

        // Cartoon Legs & Shoes
        drawLimb(ctx, hipX, hipY, 160, h - 70, 11, "#0284c7");
        drawLimb(ctx, 160, h - 70, 160, h - 34, 9, "#fdba74");
        ctx.fillStyle = "#ef4444";
        ctx.fillRect(148, h - 36, 18, 7);

        // Cartoon Torso
        drawLimb(ctx, hipX, hipY, shX, shY, 18, "#00b894");

        // Glowing Back Lats Muscle
        ctx.fillStyle = muscleGlow;
        ctx.beginPath();
        ctx.arc(shX + 8, shY + 22, 16, 0, Math.PI * 2);
        ctx.fill();

        // Cartoon Head
        drawCartoonHead(ctx, shX, shY - 22, 12, -1);

        const handX = type === "lat_pulldown" ? 196 : 148 + phase * 42;
        const handY = type === "lat_pulldown" ? 50 + phase * 55 : h - 102;

        // Steel Cable Line
        ctx.strokeStyle = "#e2e8f0";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        if (type === "lat_pulldown") {
          ctx.moveTo(196, 34); ctx.lineTo(handX, handY);
        } else {
          ctx.moveTo(105, h - 102); ctx.lineTo(handX, handY);
        }
        ctx.stroke();

        // Cartoon Arms Pulling Handle
        drawLimb(ctx, shX, shY, (shX + handX) / 2 + 8, (shY + handY) / 2 + 12, 9, "#fdba74");
        drawLimb(ctx, (shX + handX) / 2 + 8, (shY + handY) / 2 + 12, handX, handY, 8, "#fdba74");

      } else if (type === "leg_press") {
        // 45-Degree Incline Leg Press Machine
        ctx.strokeStyle = "#64748b";
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.moveTo(80, h - 30); ctx.lineTo(290, h - 30);
        ctx.moveTo(95, h - 35); ctx.lineTo(225, 55);
        ctx.stroke();

        // Angled Seat Backrest
        ctx.strokeStyle = "#334155";
        ctx.lineWidth = 12;
        ctx.beginPath();
        ctx.moveTo(235, h - 40); ctx.lineTo(280, h - 95);
        ctx.stroke();

        const hipX = 235, hipY = h - 48;
        const shX = 268, shY = h - 88;

        // Cartoon Torso & Head on Leg Press Seat
        drawLimb(ctx, hipX, hipY, shX, shY, 17, "#00b894");
        drawCartoonHead(ctx, shX + 8, shY - 16, 12, -1);

        // Moving 45-Degree Sled Platform & Weight Plates
        const pushDist = phase * 38;
        const footX = 165 - pushDist;
        const footY = 118 - pushDist * 0.65;
        const kneeX = 205 - pushDist * 0.35;
        const kneeY = h - 95 - pushDist * 0.15;

        // Cartoon Quads & Shins
        drawLimb(ctx, hipX, hipY, kneeX, kneeY, 13, "#0284c7");
        drawLimb(ctx, kneeX, kneeY, footX, footY, 10, "#fdba74");

        // Glowing Quads Muscle
        ctx.fillStyle = muscleGlow;
        ctx.beginPath();
        ctx.arc((hipX + kneeX) / 2, (hipY + kneeY) / 2, 16, 0, Math.PI * 2);
        ctx.fill();

        // Sled & Heavy Plates
        ctx.strokeStyle = "#f59e0b";
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(footX - 18, footY + 22);
        ctx.lineTo(footX + 16, footY - 22);
        ctx.stroke();
        ctx.fillStyle = "#ef4444";
        ctx.beginPath();
        ctx.arc(footX - 16, footY - 12, 18, 0, Math.PI * 2);
        ctx.fill();

      } else if (type === "squat") {
        // Olympic Squat Rack
        ctx.strokeStyle = "#64748b";
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.moveTo(130, h - 30); ctx.lineTo(130, 35);
        ctx.moveTo(115, h - 30); ctx.lineTo(155, h - 30);
        ctx.stroke();

        const drop = phase * 42;
        const ankleX = 190, ankleY = h - 35;
        const kneeX = 164 - phase * 14, kneeY = h - 80 + drop * 0.35;
        const hipX = 205 + phase * 16, hipY = h - 120 + drop;
        const shX = 184, shY = h - 172 + drop;

        // Cartoon Legs & Shoes
        drawLimb(ctx, ankleX, ankleY, kneeX, kneeY, 10, "#fdba74");
        drawLimb(ctx, kneeX, kneeY, hipX, hipY, 13, "#0284c7");
        ctx.fillStyle = "#ef4444";
        ctx.fillRect(ankleX - 12, h - 36, 20, 7);

        // Glowing Quads & Glutes
        ctx.fillStyle = muscleGlow;
        ctx.beginPath();
        ctx.arc((kneeX + hipX) / 2, (kneeY + hipY) / 2, 16, 0, Math.PI * 2);
        ctx.fill();

        // Cartoon Torso & Head
        drawLimb(ctx, hipX, hipY, shX, shY, 18, "#00b894");
        drawCartoonHead(ctx, shX - 4, shY - 20, 12, -1);

        // Olympic Barbell & Plates on Traps
        ctx.fillStyle = "#ef4444";
        ctx.beginPath();
        ctx.arc(shX + 5, shY + 2, 17, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#facc15";
        ctx.beginPath();
        ctx.arc(shX + 5, shY + 2, 7, 0, Math.PI * 2);
        ctx.fill();

      } else if (type === "treadmill_walk") {
        // Motorized Incline Treadmill Machine
        ctx.strokeStyle = "#64748b";
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(95, h - 34); ctx.lineTo(275, h - 52); // Incline deck
        ctx.lineTo(255, 68); // Console mast
        ctx.lineTo(225, 62); // Screen
        ctx.stroke();

        const cx = 185;
        const baseY = h - 46;
        const stride = Math.sin(t * 2.4) * 22;

        // Cartoon Legs Walking on Incline
        drawLimb(ctx, cx, baseY - 58, cx - stride, baseY, 10, "#0284c7");
        drawLimb(ctx, cx, baseY - 58, cx + stride, baseY - 4, 10, "#0284c7");
        // Torso & Head
        drawLimb(ctx, cx, baseY - 58, cx + 8, baseY - 114, 17, "#00b894");
        drawCartoonHead(ctx, cx + 10, baseY - 134, 12, 1);
        // Swinging Arms
        drawLimb(ctx, cx + 8, baseY - 108, cx + stride * 0.8, baseY - 72, 8, "#fdba74");

        // Heart / Calorie Glow
        ctx.fillStyle = muscleGlow;
        ctx.beginPath();
        ctx.arc(cx + 8, baseY - 92, 14, 0, Math.PI * 2);
        ctx.fill();

      } else if (type === "pushup") {
        // Exercise Mat on Floor
        ctx.fillStyle = "#0984e3";
        ctx.fillRect(90, h - 34, 200, 5);

        const drop = phase * 28;
        const toeX = 250, toeY = h - 38;
        const hipX = 188, hipY = h - 68 + drop * 0.55;
        const shX = 128, shY = h - 92 + drop;

        drawLimb(ctx, toeX, toeY, hipX, hipY, 11, "#0284c7");
        drawLimb(ctx, hipX, hipY, shX, shY, 16, "#00b894");

        ctx.fillStyle = muscleGlow;
        ctx.beginPath();
        ctx.arc(shX + 12, shY + 4, 14, 0, Math.PI * 2);
        ctx.fill();

        drawCartoonHead(ctx, shX - 18, shY - 4, 11, -1);
        drawLimb(ctx, shX, shY, shX + 12, shY + 18 - drop * 0.3, 8, "#fdba74");
        drawLimb(ctx, shX + 12, shY + 18 - drop * 0.3, shX - 2, h - 35, 8, "#fdba74");

      } else {
        // Standing Cartoon Athlete (Shoulder Press, Lateral Raise, Cable Fly, Bicep Curl, Tricep Pushdown, Jumping Jacks)
        const cx = w / 2;
        const baseY = h - 34;
        const shY = baseY - 118;
        const hipY = baseY - 64;

        // Cable Tower in background if Cable Fly or Tricep Pushdown
        if (type === "cable_fly" || type === "tricep_pushdown") {
          ctx.strokeStyle = "#475569";
          ctx.lineWidth = 6;
          ctx.beginPath();
          ctx.moveTo(cx - 75, baseY); ctx.lineTo(cx - 75, 32); ctx.lineTo(cx + 75, 32); ctx.lineTo(cx + 75, baseY);
          ctx.stroke();
        }

        const spread = type === "jumping_jacks" ? phase * 26 : 12;
        // Cartoon Legs & Shoes
        drawLimb(ctx, cx, hipY, cx - spread, baseY, 11, "#0284c7");
        drawLimb(ctx, cx, hipY, cx + spread, baseY, 11, "#0284c7");
        ctx.fillStyle = "#ef4444";
        ctx.fillRect(cx - spread - 10, baseY - 4, 16, 6);
        ctx.fillRect(cx + spread - 6, baseY - 4, 16, 6);

        // Cartoon Muscular Torso
        drawLimb(ctx, cx, hipY, cx, shY, 20, "#00b894");

        // Cartoon Head
        drawCartoonHead(ctx, cx, shY - 22, 13, 1);

        // Glowing Target Muscle
        ctx.fillStyle = muscleGlow;
        ctx.beginPath();
        const glowY = (type === "bicep_curl" || type === "tricep_pushdown") ? shY + 20 : shY + 4;
        ctx.arc(cx - 18, glowY, 13, 0, Math.PI * 2);
        ctx.arc(cx + 18, glowY, 13, 0, Math.PI * 2);
        ctx.fill();

        const armLift = phase * 44;
        if (type === "bicep_curl") {
          const handY = shY + 48 - armLift;
          drawLimb(ctx, cx - 15, shY, cx - 20, shY + 28, 8, "#fdba74");
          drawLimb(ctx, cx - 20, shY + 28, cx - 24, handY, 8, "#fdba74");
          drawLimb(ctx, cx + 15, shY, cx + 20, shY + 28, 8, "#fdba74");
          drawLimb(ctx, cx + 20, shY + 28, cx + 24, handY, 8, "#fdba74");
          // EZ-Curl Bar & Plates
          ctx.strokeStyle = "#e2e8f0";
          ctx.lineWidth = 4;
          ctx.beginPath(); ctx.moveTo(cx - 38, handY); ctx.lineTo(cx + 38, handY); ctx.stroke();
          ctx.fillStyle = "#ef4444";
          ctx.fillRect(cx - 42, handY - 9, 8, 18);
          ctx.fillRect(cx + 34, handY - 9, 8, 18);
        } else if (type === "tricep_pushdown") {
          const handY = shY + 12 + armLift;
          // Cable from top pulley
          ctx.strokeStyle = "#cbd5e1";
          ctx.lineWidth = 2;
          ctx.beginPath(); ctx.moveTo(cx, 32); ctx.lineTo(cx, handY); ctx.stroke();
          drawLimb(ctx, cx - 15, shY, cx - 18, shY + 26, 8, "#fdba74");
          drawLimb(ctx, cx - 18, shY + 26, cx - 8 - phase * 14, handY, 8, "#fdba74");
          drawLimb(ctx, cx + 15, shY, cx + 18, shY + 26, 8, "#fdba74");
          drawLimb(ctx, cx + 18, shY + 26, cx + 8 + phase * 14, handY, 8, "#fdba74");
        } else if (type === "shoulder_press") {
          const handY = shY - 6 - armLift;
          drawLimb(ctx, cx - 15, shY, cx - 28, shY - 4 - armLift * 0.4, 8, "#fdba74");
          drawLimb(ctx, cx - 28, shY - 4 - armLift * 0.4, cx - 24, handY, 8, "#fdba74");
          drawLimb(ctx, cx + 15, shY, cx + 28, shY - 4 - armLift * 0.4, 8, "#fdba74");
          drawLimb(ctx, cx + 28, shY - 4 - armLift * 0.4, cx + 24, handY, 8, "#fdba74");
          // Dumbbells
          ctx.fillStyle = "#f59e0b";
          ctx.fillRect(cx - 34, handY - 4, 20, 8);
          ctx.fillRect(cx + 14, handY - 4, 20, 8);
        } else {
          // Lateral Raise / Cable Fly / Jumping Jacks
          const handY = shY + 26 - armLift;
          drawLimb(ctx, cx - 15, shY, cx - 44, handY, 8, "#fdba74");
          drawLimb(ctx, cx + 15, shY, cx + 44, handY, 8, "#fdba74");
          if (type !== "jumping_jacks") {
            ctx.fillStyle = "#f59e0b";
            ctx.beginPath();
            ctx.arc(cx - 46, handY, 6, 0, Math.PI * 2);
            ctx.arc(cx + 46, handY, 6, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Live HUD: Concentric / Eccentric Bar & Rep Counter
      ctx.fillStyle = "rgba(15, 23, 42, 0.84)";
      ctx.fillRect(w - 135, 10, 125, 42);
      ctx.fillStyle = "#00b894";
      ctx.fillRect(w - 131, 14, 117 * phase, 14);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 10px Cairo, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(phase > 0.5 ? "انقباض (زفير 💨)" : "انبساط (شهيق 🫁)", w - 126, 25);
      ctx.fillStyle = "#facc15";
      ctx.fillText(`العدة: ${repCount} / 12 ✓`, w - 126, 44);
    });

    trainerAnimFrameId = requestAnimationFrame(renderLoop);
  }

  trainerAnimFrameId = requestAnimationFrame(renderLoop);
}

/* ==========================================================================
   7. EXPECTED BODY TRANSFORMATION (BEFORE VS AFTER ANATOMICAL SVG MORPH)
   ========================================================================== */
function setTransformMonths(months) {
  SoundEngine.playSFX("click");
  AppState.transformMonths = months;
  renderBodyTransformation();
}

function createBodySilhouetteSVG(bmi, isAfter, goal) {
  const clampedBmi = Math.min(38, Math.max(17, bmi));
  const waistFactor = (clampedBmi - 21) * 1.65;
  const shoulderHalf = isAfter && (goal === "gain" || goal === "maintain") ? 48 : 42;
  const waistHalf = Math.max(22, Math.min(54, 29 + (isAfter ? waistFactor * 0.35 : waistFactor)));
  const hipHalf = Math.max(26, Math.min(52, 33 + (isAfter ? waistFactor * 0.45 : waistFactor * 0.85)));

  const strokeCol = isAfter ? "#00b894" : "#f59e0b";
  const fillGradId = isAfter ? "gradAfter" : "gradBefore";

  return `
    <svg viewBox="0 0 200 320" width="190" height="290" style="overflow:visible;">
      <defs>
        <linearGradient id="${fillGradId}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${isAfter ? "#00b894" : "#f59e0b"}" stop-opacity="0.45"/>
          <stop offset="100%" stop-color="${isAfter ? "#0984e3" : "#ef4444"}" stop-opacity="0.2"/>
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="165" rx="${waistHalf + 24}" ry="125" fill="url(#${fillGradId})" opacity="0.35" />
      <circle cx="100" cy="36" r="20" fill="url(#${fillGradId})" stroke="${strokeCol}" stroke-width="3"/>
      <rect x="92" y="56" width="16" height="12" rx="4" fill="url(#${fillGradId})" stroke="${strokeCol}" stroke-width="2"/>
      <path d="
        M ${100 - shoulderHalf} 72
        Q 100 64 ${100 + shoulderHalf} 72
        L ${100 + shoulderHalf + 12} 150
        L ${100 + shoulderHalf + 2} 154
        L ${100 + shoulderHalf - 6} 98
        Q ${100 + waistHalf} 135 ${100 + hipHalf} 178
        L ${100 + 26} 295
        L ${100 + 10} 295
        L 100 195
        L ${100 - 10} 295
        L ${100 - 26} 295
        L ${100 - hipHalf} 178
        Q ${100 - waistHalf} 135 ${100 - shoulderHalf + 6} 98
        L ${100 - shoulderHalf - 2} 154
        L ${100 - shoulderHalf - 12} 150
        Z
      " fill="url(#${fillGradId})" stroke="${strokeCol}" stroke-width="3" stroke-linejoin="round"/>
      ${isAfter ? `
        <path d="M 78 96 Q 100 105 122 96" fill="none" stroke="#00b894" stroke-width="2.2"/>
        <line x1="100" y1="105" x2="100" y2="162" stroke="#00b894" stroke-width="2"/>
        <line x1="88" y1="120" x2="112" y2="120" stroke="#00b894" stroke-width="1.8"/>
        <line x1="89" y1="136" x2="111" y2="136" stroke="#00b894" stroke-width="1.8"/>
        <line x1="90" y1="152" x2="110" y2="152" stroke="#00b894" stroke-width="1.8"/>
      ` : `
        <ellipse cx="100" cy="142" rx="${Math.max(12, waistHalf - 12)}" ry="22" fill="none" stroke="${strokeCol}" stroke-width="1.5" stroke-dasharray="4 4"/>
      `}
    </svg>
  `;
}

function renderBodyTransformation() {
  const area = document.getElementById("transformationOutput");
  if (!area) return;

  const p = AppState.profile;
  const m = getCalculatedMetrics();
  const isAr = AppState.lang === "ar";
  const months = AppState.transformMonths;
  const weeks = months * 4;

  let weeklyWeightChange = 0;
  if (p.goal === "lose") weeklyWeightChange = -0.75;
  else if (p.goal === "gain") weeklyWeightChange = 0.4;
  else weeklyWeightChange = -0.15;

  const expectedWeight = +(Math.max(45, p.weight + weeklyWeightChange * weeks)).toFixed(1);
  const heightM = p.height / 100;
  const expectedBmi = +(expectedWeight / (heightM * heightM)).toFixed(1);

  const curBodyFat = Math.max(8, Math.min(45, Math.round(1.2 * m.bmi + 0.23 * p.age - (p.gender === "male" ? 16.2 : 5.4))));
  const afterBodyFat = p.goal === "lose"
    ? Math.max(9, curBodyFat - months * 2.1).toFixed(1)
    : p.goal === "gain"
      ? Math.max(11, curBodyFat - months * 0.4).toFixed(1)
      : Math.max(10, curBodyFat - months * 1.1).toFixed(1);

  const muscleGainKg = +(months * (p.goal === "gain" ? 1.05 : 0.6)).toFixed(1);
  const currentSplitName = (NILEFIT_WORKOUTS[AppState.selectedSplit] || NILEFIT_WORKOUTS.ppl).name[AppState.lang];

  area.innerHTML = `
    <div style="display:flex;justify-content:center;gap:10px;margin-bottom:24px;flex-wrap:wrap;">
      <button class="action-btn ${months === 1 ? "active" : ""}" onclick="setTransformMonths(1)">
        📅 ${isAr ? "بعد شهر واحد (4 أسابيع)" : "After 1 Month (4 Weeks)"}
      </button>
      <button class="action-btn ${months === 3 ? "active" : ""}" onclick="setTransformMonths(3)">
        🔥 ${isAr ? "بعد 3 شهور (12 أسبوع - تحول ملحوظ)" : "After 3 Months (12 Weeks)"}
      </button>
      <button class="action-btn ${months === 6 ? "active" : ""}" onclick="setTransformMonths(6)">
        💎 ${isAr ? "بعد 6 شهور (24 أسبوع - فورمة متكاملة)" : "After 6 Months (24 Weeks)"}
      </button>
      <button class="action-btn ${months === 12 ? "active" : ""}" onclick="setTransformMonths(12)">
        👑 ${isAr ? "بعد 12 شهر (سنة كاملة - فورمة الأحلام)" : "After 12 Months (1 Year Peak Form)"}
      </button>
    </div>

    <div class="transform-grid">
      <div class="body-stage-card">
        <span style="padding:4px 14px;border-radius:20px;background:rgba(245,158,11,0.16);color:#f59e0b;font-weight:800;font-size:0.85rem;">
          ${isAr ? "قبل الالتزام (الوضع الحالي)" : "BEFORE (Current State)"}
        </span>
        <div style="margin:14px 0;">
          ${createBodySilhouetteSVG(m.bmi, false, p.goal)}
        </div>
        <div class="grid-2" style="gap:10px;text-align:center;">
          <div class="stat-card" style="padding:10px;">
            <div style="font-size:1.3rem;font-weight:900;color:#f59e0b;">${p.weight} kg</div>
            <div class="stat-label">${isAr ? "الوزن الحالي" : "Current Weight"}</div>
          </div>
          <div class="stat-card" style="padding:10px;">
            <div style="font-size:1.3rem;font-weight:900;color:#f59e0b;">~${curBodyFat}%</div>
            <div class="stat-label">${isAr ? "نسبة الدهون التقريبية" : "Est. Body Fat %"}</div>
          </div>
        </div>
      </div>

      <div style="text-align:center;padding:10px;">
        <div style="font-size:3rem;color:var(--primary);">
          ${isAr ? "⬅️" : "➡️"}
        </div>
        <div style="font-weight:900;color:var(--primary);margin:8px 0;">
          ${months} ${isAr ? (months === 1 ? "شهر من الالتزام" : "شهور من الالتزام") : "Months Committed"}
        </div>
        <div style="font-size:0.8rem;color:var(--text-muted);max-width:190px;margin:0 auto;">
          ${m.targetCal} kcal/day<br>+ ${currentSplitName}
        </div>
      </div>

      <div class="body-stage-card after-card">
        <span style="padding:4px 14px;border-radius:20px;background:rgba(0,184,148,0.2);color:var(--primary);font-weight:800;font-size:0.85rem;">
          ✨ ${isAr ? `بعد الالتزام (${weeks} أسبوع)` : `AFTER (${weeks} Weeks)`}
        </span>
        <div style="margin:14px 0;">
          ${createBodySilhouetteSVG(expectedBmi, true, p.goal)}
        </div>
        <div class="grid-2" style="gap:10px;text-align:center;">
          <div class="stat-card" style="padding:10px;border-color:var(--primary);">
            <div style="font-size:1.3rem;font-weight:900;color:var(--primary);">${expectedWeight} kg</div>
            <div class="stat-label">${isAr ? "الوزن المتوقع" : "Projected Weight"}</div>
          </div>
          <div class="stat-card" style="padding:10px;border-color:var(--primary);">
            <div style="font-size:1.3rem;font-weight:900;color:var(--primary);">~${afterBodyFat}%</div>
            <div class="stat-label">${isAr ? "نسبة الدهون المتوقعة" : "Projected Body Fat %"}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid-3" style="margin-top:20px;">
      <div class="stat-card">
        <div class="stat-value">+${muscleGainKg} kg</div>
        <div class="stat-label">${isAr ? "زيادة الكتلة العضلية الصافية وشد الترهلات" : "Projected Lean Muscle Gain & Toning"}</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">+${Math.min(300, months * 26)}%</div>
        <div class="stat-label">${isAr ? "تطور القوة البدنية وصحة القلب والشرايين" : "Strength & Cardiovascular Surge"}</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">100%</div>
        <div class="stat-label">${isAr ? "ثقة بالنفس ونشاط يومي ونوم عميق" : "Confidence, Energy & Sleep Quality"}</div>
      </div>
    </div>
  `;
}

/* ==========================================================================
   8. TRACKER, AUTO DAY COUNTER (START & END DATE) & APPRECIATION CERTIFICATE
   ========================================================================== */
function getAutoCalculatedDays() {
  const s = new Date(AppState.certStartDate);
  const e = new Date(AppState.certEndDate);
  if (isNaN(s.getTime()) || isNaN(e.getTime())) return 30;
  const diffDays = Math.round((e.getTime() - s.getTime()) / 86400000);
  return Math.max(1, diffDays);
}

function getCertificateDurationText() {
  const isAr = AppState.lang === "ar";
  const p = AppState.certPeriod;
  const autoDays = getAutoCalculatedDays();

  if (p === "week") {
    return isAr ? "أسبوع كامل (7 أيام متواصلة من الالتزام بالتمرين والتغذية)" : "1 Full Week (7 Consecutive Days of Commitment)";
  } else if (p === "month") {
    return isAr ? "شهر كامل (30 يوماً من الالتزام المتواصل)" : "1 Full Month (30 Days of Dedication)";
  } else if (p === "3months") {
    return isAr ? "3 شهور كاملة (90 يوماً من التحول الرياضي والغذائي)" : "3 Full Months (90 Days of Fitness Transformation)";
  } else if (p === "6months") {
    return isAr ? "6 شهور كاملة (180 يوماً من الإرادة الحديدية)" : "6 Full Months (180 Days of Iron Discipline)";
  } else if (p === "12months") {
    return isAr ? "12 شهراً — عام كامل (365 يوماً من الاحتراف والالتزام)" : "12 Full Months — 1 Year (365 Days of Mastery)";
  } else {
    return isAr
      ? `${autoDays} يوماً من الالتزام المتواصل (من ${AppState.certStartDate} إلى ${AppState.certEndDate})`
      : `${autoDays} Committed Days (From ${AppState.certStartDate} to ${AppState.certEndDate})`;
  }
}

function updateCertDates() {
  const sEl = document.getElementById("inpCertStart");
  const eEl = document.getElementById("inpCertEnd");
  if (sEl && eEl) {
    AppState.certStartDate = sEl.value || thirtyDaysAgoISO;
    AppState.certEndDate = eEl.value || todayISO;
    AppState.certPeriod = "custom_dates";
    localStorage.setItem("nilefit_start_date", AppState.certStartDate);
    localStorage.setItem("nilefit_end_date", AppState.certEndDate);
    localStorage.setItem("nilefit_cert_period", "custom_dates");
    SoundEngine.playSFX("success");
    renderTrackerAndCertificate();
  }
}

function unlockCertificate(period) {
  SoundEngine.playSFX("fanfare");
  AppState.certPeriod = period;
  localStorage.setItem("nilefit_cert_period", period);
  if (period === "week") {
    AppState.weekDays = [true, true, true, true, true, true, true];
    localStorage.setItem("nilefit_week", JSON.stringify(AppState.weekDays));
  }
  renderTrackerAndCertificate();
}

function renderTrackerAndCertificate() {
  const isAr = AppState.lang === "ar";
  const dayNames = isAr
    ? ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"]
    : ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

  const weekEl = document.getElementById("weekDaysTracker");
  if (weekEl) {
    weekEl.innerHTML = dayNames.map((name, i) => `
      <button
        class="action-btn ${AppState.weekDays[i] ? "active" : ""}"
        style="height:48px;padding:0 16px;border-radius:14px;"
        onclick="toggleWeekDay(${i})">
        <i class="fas ${AppState.weekDays[i] ? "fa-check-circle" : "fa-circle"}"></i>
        <span>${name}</span>
      </button>
    `).join("");
  }

  const waterEl = document.getElementById("waterGlassesRow");
  if (waterEl) {
    waterEl.innerHTML = Array.from({ length: 8 }, (_, i) => `
      <button
        class="action-btn ${i < AppState.waterCups ? "active" : ""}"
        style="height:46px;border-radius:12px;"
        onclick="setWaterCups(${i + 1})">
        💧 ${i + 1}
      </button>
    `).join("");
  }

  const sysName = (NILEFIT_WORKOUTS[AppState.selectedSplit] || NILEFIT_WORKOUTS.ppl).name[AppState.lang];
  const m = getCalculatedMetrics();
  const autoDays = getAutoCalculatedDays();
  const durationLabel = getCertificateDurationText();

  const certContainer = document.getElementById("certificatePreviewBox");
  if (!certContainer) return;

  certContainer.innerHTML = `
    <!-- AUTOMATIC DAY COUNTER BY START DATE & END DATE -->
    <div style="background:var(--bg-elevated);border:1px solid var(--border-color);border-radius:var(--radius-md);padding:18px;margin-bottom:20px;">
      <h4 style="color:var(--primary);margin-bottom:12px;">
        <i class="fas fa-calendar-alt"></i>
        ${isAr ? "حساب عدد أيام الالتزام تلقائياً بناءً على تاريخ البدء وتاريخ النهاية (أو اختر مدة جاهزة):" : "Automatic Commitment Day Counter (Start Date to End Date):"}
      </h4>
      <div style="display:flex;flex-wrap:wrap;gap:14px;align-items:flex-end;justify-content:space-between;">
        <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:flex-end;">
          <div>
            <label style="display:block;font-size:0.8rem;font-weight:700;color:var(--text-muted);margin-bottom:4px;">📅 ${isAr ? "تاريخ البدء:" : "Start Date:"}</label>
            <input type="date" id="inpCertStart" class="form-input" style="padding:8px 12px;" value="${AppState.certStartDate}" onchange="updateCertDates()" />
          </div>
          <div>
            <label style="display:block;font-size:0.8rem;font-weight:700;color:var(--text-muted);margin-bottom:4px;">🏁 ${isAr ? "تاريخ النهاية:" : "End Date:"}</label>
            <input type="date" id="inpCertEnd" class="form-input" style="padding:8px 12px;" value="${AppState.certEndDate}" onchange="updateCertDates()" />
          </div>
          <button class="btn btn-primary" style="padding:9px 18px;" onclick="updateCertDates()">
            <i class="fas fa-calculator"></i>
            <span>${isAr ? `تطبيق المدة المحسوبة (${autoDays} يوم)` : `Apply Auto Days (${autoDays} Days)`}</span>
          </button>
        </div>

        <div style="padding:10px 18px;border-radius:14px;background:rgba(0,184,148,0.14);border:1px solid var(--primary);font-weight:900;color:var(--primary);">
          ⏱️ ${isAr ? `إجمالي الأيام المحسوبة تلقائياً: ${autoDays} يوماً` : `Auto-Counted Duration: ${autoDays} Days`}
        </div>
      </div>

      <!-- MILESTONE DURATION BUTTONS (1 WEEK, 1M, 3M, 6M, 12M, CUSTOM DATES) -->
      <div style="display:flex;justify-content:center;gap:8px;margin-top:16px;flex-wrap:wrap;">
        <button class="action-btn ${AppState.certPeriod === "week" ? "active" : ""}" onclick="unlockCertificate('week')">
          🏅 ${isAr ? "أسبوع (7 أيام)" : "1 Week (7d)"}
        </button>
        <button class="action-btn ${AppState.certPeriod === "month" ? "active" : ""}" onclick="unlockCertificate('month')">
          🌟 ${isAr ? "شهر (30 يوم)" : "1 Month (30d)"}
        </button>
        <button class="action-btn ${AppState.certPeriod === "3months" ? "active" : ""}" onclick="unlockCertificate('3months')">
          🔥 ${isAr ? "3 شهور (90 يوم)" : "3 Months (90d)"}
        </button>
        <button class="action-btn ${AppState.certPeriod === "6months" ? "active" : ""}" onclick="unlockCertificate('6months')">
          💎 ${isAr ? "6 شهور (180 يوم)" : "6 Months (180d)"}
        </button>
        <button class="action-btn ${AppState.certPeriod === "12months" ? "active" : ""}" onclick="unlockCertificate('12months')">
          👑 ${isAr ? "12 شهر (365 يوم)" : "12 Months (365d)"}
        </button>
        <button class="action-btn ${AppState.certPeriod === "custom_dates" ? "active" : ""}" onclick="unlockCertificate('custom_dates')">
          📆 ${isAr ? `عدّ تلقائي بالتاريخ (${autoDays} يوم)` : `Auto Date Count (${autoDays}d)`}
        </button>
      </div>
    </div>

    <div style="text-align:center;margin-bottom:16px;">
      <button class="btn btn-gold" style="font-size:1.02rem;padding:13px 28px;" onclick="downloadCertificatePNG()">
        <i class="fas fa-download"></i> ${isAr ? "تحميل شهادة التقدير كصورة PNG عالية الجودة" : "Download Appreciation Certificate as PNG"}
      </button>
    </div>

    <div class="certificate-wrapper">
      <div class="nilefit-certificate" id="domCertificateCard">
        <div style="font-size:3.2rem;margin-bottom:6px;">🏆</div>
        <div style="font-size:0.92rem;font-weight:900;color:#b45309;letter-spacing:1px;">
          NILEFITPRO OFFICIAL ACADEMY • أكاديمية نايل فيت برو الرياضية
        </div>
        <h2 style="font-size:2.1rem;font-weight:900;color:#92400e;margin:8px 0;">
          ${isAr ? "شهادة تقدير والتزام رياضي" : "Certificate of Fitness Excellence"}
        </h2>
        <p style="color:#475569;font-size:1rem;">
          ${isAr ? "تتشرف منصة NileFitPro بمنح هذه الشهادة التقديرية المحفزة إلى البطل:" : "NileFitPro proudly presents this certificate of dedication to:"}
        </p>
        <div style="font-size:2.3rem;font-weight:900;color:#0f172a;margin:14px 0;padding:8px 26px;border-bottom:3px solid #d97706;display:inline-block;">
          ${AppState.profile.name}
        </div>
        <p style="font-size:1.05rem;color:#1e293b;line-height:1.9;max-width:680px;margin:10px auto;">
          ${isAr
            ? `تقديراً لالتزامه المثالي وإرادته الحديدية في إتمام <strong>${durationLabel}</strong> على نظام التمارين <strong>(${sysName})</strong> والنظام الغذائي الصحي المحسوب (<strong>${m.targetCal} سعرة/يوم</strong>).`
            : `In recognition of outstanding discipline completing <strong>${durationLabel}</strong> following the <strong>${sysName}</strong> workout program and a <strong>${m.targetCal} kcal/day</strong> nutrition plan.`}
        </p>
        <div style="display:flex;justify-content:space-around;align-items:center;flex-wrap:wrap;gap:14px;margin-top:24px;padding-top:16px;border-top:1px solid rgba(217,119,6,0.35);font-size:0.88rem;color:#475569;font-weight:800;">
          <div>📅 ${isAr ? `من ${AppState.certStartDate} إلى ${AppState.certEndDate}` : `${AppState.certStartDate} → ${AppState.certEndDate}`}</div>
          <div>💪 ${sysName}</div>
          <div>✍️ ${isAr ? "تصميم وإشراف: محمد عوض خير • NileFitPro" : "Signed: Mohamed Awad Khair • NileFitPro"}</div>
        </div>
      </div>
    </div>
  `;
}

function toggleWeekDay(idx) {
  AppState.weekDays[idx] = !AppState.weekDays[idx];
  localStorage.setItem("nilefit_week", JSON.stringify(AppState.weekDays));
  const doneCount = AppState.weekDays.filter(Boolean).length;
  SoundEngine.playSFX(doneCount === 7 ? "fanfare" : "success");
  renderTrackerAndCertificate();
}

function setWaterCups(count) {
  SoundEngine.playSFX("click");
  AppState.waterCups = count;
  localStorage.setItem("nilefit_water", String(count));
  renderTrackerAndCertificate();
}

function downloadCertificatePNG() {
  SoundEngine.playSFX("fanfare");
  const canvas = document.createElement("canvas");
  canvas.width = 1300;
  canvas.height = 880;
  const ctx = canvas.getContext("2d");

  const isAr = AppState.lang === "ar";
  const sysName = (NILEFIT_WORKOUTS[AppState.selectedSplit] || NILEFIT_WORKOUTS.ppl).name[AppState.lang];
  const m = getCalculatedMetrics();
  const durationLabel = getCertificateDurationText();

  const grad = ctx.createLinearGradient(0, 0, 1300, 880);
  grad.addColorStop(0, "#fffdf5");
  grad.addColorStop(0.5, "#fef3c7");
  grad.addColorStop(1, "#fde68a");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1300, 880);

  ctx.strokeStyle = "#d97706";
  ctx.lineWidth = 14;
  ctx.strokeRect(28, 28, 1244, 824);

  ctx.strokeStyle = "#00b894";
  ctx.lineWidth = 4;
  ctx.strokeRect(46, 46, 1208, 788);

  ctx.textAlign = "center";
  ctx.fillStyle = "#b45309";
  ctx.font = "bold 25px Cairo, Poppins, sans-serif";
  ctx.fillText("🏆 NILEFITPRO OFFICIAL FITNESS ACADEMY • أكاديمية نايل فيت برو 🏆", 650, 115);

  ctx.fillStyle = "#92400e";
  ctx.font = "900 52px Cairo, Poppins, sans-serif";
  ctx.fillText(isAr ? "شهادة تقدير والتزام رياضي" : "CERTIFICATE OF APPRECIATION", 650, 195);

  ctx.fillStyle = "#475569";
  ctx.font = "bold 26px Cairo, Poppins, sans-serif";
  ctx.fillText(isAr ? "تُمنح هذه الشهادة بكل فخر واعتزاز إلى البطل:" : "Proudly awarded for outstanding dedication to:", 650, 268);

  ctx.fillStyle = "#0f172a";
  ctx.font = "900 60px Cairo, Poppins, sans-serif";
  ctx.fillText(AppState.profile.name, 650, 355);

  ctx.strokeStyle = "#d97706";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(350, 382);
  ctx.lineTo(950, 382);
  ctx.stroke();

  ctx.fillStyle = "#1e293b";
  ctx.font = "bold 27px Cairo, Poppins, sans-serif";
  ctx.fillText(durationLabel, 650, 452);

  ctx.fillStyle = "#008f72";
  ctx.font = "bold 30px Cairo, Poppins, sans-serif";
  ctx.fillText(
    isAr ? `نظام التمرين: ${sysName}  |  السعرات المحسوبة: ${m.targetCal} kcal` : `Workout: ${sysName}  |  Daily Target: ${m.targetCal} kcal`,
    650,
    520
  );

  ctx.fillStyle = "#475569";
  ctx.font = "bold 23px Cairo, Poppins, sans-serif";
  ctx.fillText(
    isAr
      ? `الفترة الزمنية: من ${AppState.certStartDate} إلى ${AppState.certEndDate} (${getAutoCalculatedDays()} يوماً)`
      : `Period: ${AppState.certStartDate} to ${AppState.certEndDate} (${getAutoCalculatedDays()} Days)`,
    650,
    585
  );

  ctx.fillStyle = "#b45309";
  ctx.font = "bold 24px Cairo, Poppins, sans-serif";
  ctx.fillText(
    isAr
      ? "«الالتزام يصنع المعجزات.. استمر في رحلتك نحو القوة والصحة والعافية!»"
      : "\"Consistency builds champions. Keep pushing forward!\"",
    650,
    655
  );

  ctx.fillStyle = "#334155";
  ctx.font = "bold 22px Cairo, Poppins, sans-serif";
  ctx.fillText(
    `${isAr ? "تصميم محمد عوض خير بمساعدة Gemini 4 Argon" : "Designed by Mohamed Awad Khair with Gemini 4 Argon"}  •  01011805464`,
    650,
    765
  );

  const link = document.createElement("a");
  link.download = `NileFitPro-Certificate-${AppState.profile.name.replace(/\s+/g, "-")}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

/* ==========================================================================
   9. SINAI FARMS OLIVE OIL PRODUCT SHOWCASE (3 REAL UPLOADED PHOTOS, NO PRICE!)
   ========================================================================== */
function openProductImageModal(imgSrc, caption) {
  SoundEngine.playSFX("click");
  const modal = document.getElementById("universalModal");
  const body = document.getElementById("universalModalBody");
  if (!modal || !body) return;

  body.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
      <h3 style="color:#6ab04c;font-size:1.15rem;">🫒 ${caption}</h3>
      <button class="action-btn" onclick="closeUniversalModal()"><i class="fas fa-times"></i></button>
    </div>
    <div style="text-align:center;">
      <img src="${imgSrc}" alt="${caption}" style="max-width:100%;max-height:72vh;border-radius:16px;border:3px solid #6ab04c;" />
    </div>
  `;
  modal.classList.add("open");
}

function renderSinaiProductSection() {
  const isAr = AppState.lang === "ar";
  const homeSpot = document.getElementById("homeSinaiSpotlight");
  const prodSec = document.getElementById("sinaiProductSectionContent");

  const productHTML = `
    <div class="sinai-hero-card">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px;margin-bottom:16px;">
        <div>
          <span style="display:inline-block;padding:5px 14px;border-radius:20px;background:rgba(106,176,76,0.2);color:#6ab04c;font-weight:900;font-size:0.85rem;margin-bottom:8px;">
            🫒 ${isAr ? "ذهب سيناء السائل • إنتاج مزارع شبه جزيرة سيناء" : "Liquid Gold of Sinai • 100% Pure Sinai Peninsula Farms"}
          </span>
          <h2 style="font-size:1.95rem;font-weight:900;color:var(--text-main);">
            ${isAr ? "زيت زيتون مزارع سيناء — طبيعي بكر ممتاز 100%" : "Sinai Farms Extra Virgin Olive Oil — 100% Natural"}
          </h2>
          <p style="color:var(--text-muted);font-size:0.98rem;margin-top:4px;line-height:1.7;">
            ${isAr
              ? "عصرة أولى على البارد • حموضة أقل من 0.2% • خالٍ تماماً من أي معاملات كيميائية أو صناعية وخالٍ من الكوليسترول • رفيقك الصحي الأول في جميع وجبات NileFitPro!"
              : "First Cold Press • Acidity < 0.2% • 100% Free of Chemicals & Cholesterol • Rich in Vitamins A & E and Monounsaturated Healthy Fats!"}
          </p>
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          <a href="tel:01011805464" class="btn btn-olive" style="text-decoration:none;">
            <i class="fas fa-phone-volume"></i> ${isAr ? "للتواصل والاستفسار: 01011805464" : "Call Now: 01011805464"}
          </a>
          <a href="https://wa.me/201011805464?text=${encodeURIComponent("السلام عليكم أستاذ محمد عوض خير، أريد الاستفسار عن زيت زيتون مزارع سيناء الطبيعي")}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="background:linear-gradient(135deg,#25D366,#128C7E);text-decoration:none;">
            <i class="fab fa-whatsapp"></i> ${isAr ? "طلب عبر واتساب" : "WhatsApp Inquiry"}
          </a>
          <a href="https://t.me/+201011805464" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="background:linear-gradient(135deg,#0088cc,#005f8f);text-decoration:none;">
            <i class="fab fa-telegram"></i> ${isAr ? "تليجرام" : "Telegram"}
          </a>
        </div>
      </div>

      <!-- 3 REAL UPLOADED PRODUCT IMAGES GALLERY -->
      <div class="sinai-gallery-grid">
        <div class="sinai-photo-card" onclick="openProductImageModal('assets/sinai-poster-gold.jpg', 'زيت زيتون مزارع سيناء - ذهب سيناء السائل')">
          <img src="assets/sinai-poster-gold.jpg" alt="زيت زيتون مزارع سيناء - ذهب سيناء السائل" />
          <div class="sinai-photo-caption">✨ زيت زيتون مزارع سيناء — ذهب سيناء السائل (عصرة أولى على البارد)</div>
        </div>
        <div class="sinai-photo-card" onclick="openProductImageModal('assets/sinai-poster-heart.jpg', 'حافظ على صحة قلبك مع زيت زيتون مزارع سيناء')">
          <img src="assets/sinai-poster-heart.jpg" alt="حافظ على صحة قلبك - زيت زيتون مزارع سيناء" />
          <div class="sinai-photo-caption">💚 حافظ على صحة قلبك — معصور على البارد وحموضة أقل من 0.2%</div>
        </div>
        <div class="sinai-photo-card" onclick="openProductImageModal('assets/sinai-bottle-label.jpg', 'البطاقة الغذائية لزيت زيتون سيناء الطبيعي')">
          <img src="assets/sinai-bottle-label.jpg" alt="بطاقة زيت زيتون سيناء الطبيعي" />
          <div class="sinai-photo-caption">🏷️ عصير طبيعي لفاكهة الزيتون خالٍ من الكوليسترول وغني بفيتامين (أ، هـ)</div>
        </div>
      </div>

      <!-- PRODUCT DETAILS & BENEFITS (ZERO PRICE DETAILS AS REQUESTED) -->
      <div class="sinai-benefits-grid">
        <div class="sinai-benefit-item">
          <div class="sinai-benefit-icon"><i class="fas fa-heart-pulse"></i></div>
          <div>
            <h4 style="font-size:1rem;font-weight:800;margin-bottom:4px;">حماية القلب والشرايين</h4>
            <p style="font-size:0.84rem;color:var(--text-muted);line-height:1.6;">
              خالٍ تماماً من الكوليسترول وغني بالأحماض الدهنية الأحادية غير المشبعة التي ترفع الكوليسترول النافع وتحمي القلب.
            </p>
          </div>
        </div>
        <div class="sinai-benefit-item">
          <div class="sinai-benefit-icon"><i class="fas fa-snowflake"></i></div>
          <div>
            <h4 style="font-size:1rem;font-weight:800;margin-bottom:4px;">عصرة أولى على البارد (حموضة &lt; 0.2%)</h4>
            <p style="font-size:0.84rem;color:var(--text-muted);line-height:1.6;">
              معصور على البارد بدون أي حرارة أو معاملات كيميائية أو صناعية للاحتفاظ بكامل القيمة الغذائية والإنزيمات الطبيعية.
            </p>
          </div>
        </div>
        <div class="sinai-benefit-item">
          <div class="sinai-benefit-icon"><i class="fas fa-capsules"></i></div>
          <div>
            <h4 style="font-size:1rem;font-weight:800;margin-bottom:4px;">غني بفيتامينات (A &amp; E / أ ، هـ)</h4>
            <p style="font-size:0.84rem;color:var(--text-muted);line-height:1.6;">
              مضادات أكسدة طبيعية قوية تدعم الاستشفاء العضلي للرياضيين، وتمنح نضارة البشرة وقوة المناعة والمفاصل.
            </p>
          </div>
        </div>
        <div class="sinai-benefit-item">
          <div class="sinai-benefit-icon"><i class="fas fa-certificate"></i></div>
          <div>
            <h4 style="font-size:1rem;font-weight:800;margin-bottom:4px;">إنتاج مزارع شبه جزيرة سيناء الموثوق</h4>
            <p style="font-size:0.84rem;color:var(--text-muted);line-height:1.6;">
              س.ت: 436898 • ب.ض: 873-576-228 | متوفر لدى: <strong>محمد عوض خير</strong> (قنا - قفط - قرية البراهمة - كوبري نجع الزاملي).
            </p>
          </div>
        </div>
      </div>

      <div style="margin-top:20px;padding:14px 20px;border-radius:14px;background:var(--bg-card-solid);border:1px solid rgba(106,176,76,0.4);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
        <div style="font-weight:800;font-size:0.95rem;">
          📍 <strong>العنوان والتواصل المباشر:</strong> محمد عوض خير — قنا - قفط - قرية البراهمة - كوبري نجع الزاملي
        </div>
        <div style="font-weight:900;color:#6ab04c;font-size:1.05rem;">
          📞 تليفون / واتس / تليجرام: <a href="tel:01011805464" style="color:inherit;">01011805464</a>
        </div>
      </div>
    </div>
  `;

  if (homeSpot) homeSpot.innerHTML = productHTML;
  if (prodSec) prodSec.innerHTML = productHTML;
}

/* ==========================================================================
   10. SINGLE-PAGE PROFESSIONAL PDF EXPORT (ALL DATA IN ONE A4 PAGE!)
   ========================================================================== */
function exportFullReportPDF() {
  SoundEngine.playSFX("success");
  const p = AppState.profile;
  const m = getCalculatedMetrics();
  const isAr = AppState.lang === "ar";
  const sys = NILEFIT_WORKOUTS[AppState.selectedSplit] || NILEFIT_WORKOUTS.ppl;
  const scale = m.targetCal / 2000;
  const autoDays = getAutoCalculatedDays();

  const printWin = window.open("", "_blank", "width=1000,height=850");
  if (!printWin) {
    window.print();
    return;
  }

  const mealsRows = NILEFIT_MEALS.map(slot => {
    const idx = AppState.selectedMealOptions[slot.slotId] || 0;
    const opt = slot.options[idx] || slot.options[0];
    return `
      <tr>
        <td><strong>${slot.slotName[AppState.lang].split("(")[0]}</strong></td>
        <td>${opt.name[AppState.lang]}</td>
        <td><strong>${Math.round(opt.baseCal * scale)} kcal</strong></td>
        <td>${Math.round(opt.basePro * scale)}g</td>
        <td>${Math.round(opt.baseCarb * scale)}g</td>
        <td>${Math.round(opt.baseFat * scale)}g</td>
      </tr>
    `;
  }).join("");

  const workoutDaysCompact = sys.days.map(d => `
    <div class="wk-box">
      <div class="wk-day">${d.dayName[AppState.lang]}</div>
      <div class="wk-list">${d.exercises.map(ex => `• ${ex.name[AppState.lang]} (${ex.baseSets}×${ex.baseReps})`).join("<br>")}</div>
    </div>
  `).join("");

  printWin.document.write(`
    <!DOCTYPE html>
    <html lang="${AppState.lang}" dir="${isAr ? "rtl" : "ltr"}">
    <head>
      <meta charset="UTF-8">
      <title>NileFitPro 1-Page Plan - ${p.name}</title>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;800;900&display=swap" rel="stylesheet">
      <style>
        @page { size: A4 portrait; margin: 7mm; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          font-family: 'Cairo', sans-serif;
          color: #0f172a;
          background: #ffffff;
          font-size: 11px;
          line-height: 1.38;
        }
        .page-wrap {
          border: 2px solid #00b894;
          border-radius: 12px;
          padding: 12px 14px;
        }
        .header-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #00b894;
          padding-bottom: 8px;
          margin-bottom: 8px;
        }
        .header-bar h1 { font-size: 17px; color: #008f72; font-weight: 900; }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 6px;
          margin-bottom: 8px;
        }
        .stat-pill {
          background: #f1f5f9;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          padding: 5px 6px;
          text-align: center;
        }
        .stat-pill strong { display: block; font-size: 12.5px; color: #008f72; }
        h2 {
          font-size: 12.5px;
          color: #0f172a;
          background: #e6fffa;
          border-right: 4px solid #00b894;
          padding: 3px 8px;
          margin: 6px 0 5px;
        }
        table { width: 100%; border-collapse: collapse; margin-bottom: 6px; }
        th, td { border: 1px solid #cbd5e1; padding: 4px 6px; text-align: inherit; font-size: 10.2px; }
        th { background: #00b894; color: #fff; font-weight: 800; }
        .wk-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 6px;
          margin-bottom: 6px;
        }
        .wk-box {
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          padding: 5px 7px;
          background: #f8fafc;
        }
        .wk-day { font-weight: 800; color: #008f72; font-size: 10.5px; margin-bottom: 2px; }
        .wk-list { font-size: 9.6px; color: #334155; }
        .olive-banner {
          background: #f0fdf4;
          border: 1px solid #86efac;
          border-radius: 8px;
          padding: 6px 10px;
          margin: 6px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 10.2px;
        }
        .footer-bar {
          margin-top: 6px;
          border-top: 1px solid #cbd5e1;
          padding-top: 5px;
          text-align: center;
          font-size: 10px;
          color: #334155;
        }
      </style>
    </head>
    <body>
      <div class="page-wrap">
        <div class="header-bar">
          <div>
            <h1>⚡ NileFitPro — ${isAr ? "الخطة الرياضية والغذائية الشاملة (في صفحة واحدة)" : "Complete 1-Page Fitness & Nutrition Plan"}</h1>
            <div>
              <strong>${isAr ? "البطل:" : "Athlete:"}</strong> ${p.name} &nbsp;|&nbsp;
              <strong>${isAr ? "السن:" : "Age:"}</strong> ${p.age} &nbsp;|&nbsp;
              <strong>${isAr ? "الطول:" : "Height:"}</strong> ${p.height}cm &nbsp;|&nbsp;
              <strong>${isAr ? "الوزن الحالي:" : "Weight:"}</strong> ${p.weight}kg &nbsp;|&nbsp;
              <strong>${isAr ? "أيام الالتزام:" : "Committed Days:"}</strong> ${autoDays} ${isAr ? "يوم" : "days"}
            </div>
          </div>
          <div style="text-align:left;font-weight:800;font-size:10.5px;">
            📅 ${new Date().toLocaleDateString(isAr ? "ar-EG" : "en-US")}
          </div>
        </div>

        <div class="stats-grid">
          <div class="stat-pill"><span>${isAr ? "الوزن المثالي" : "Ideal Weight"}</span><strong>${m.idealWeight} kg</strong></div>
          <div class="stat-pill"><span>${isAr ? "النطاق الصحي" : "Healthy Range"}</span><strong>${m.minHealthyWeight}-${m.maxHealthyWeight}kg</strong></div>
          <div class="stat-pill"><span>BMI</span><strong>${m.bmi}</strong></div>
          <div class="stat-pill"><span>${isAr ? "السعرات اليومية" : "Daily Calories"}</span><strong>${m.targetCal} kcal</strong></div>
          <div class="stat-pill"><span>${isAr ? "الماكروز (P/C/F)" : "Macros"}</span><strong>${m.proteinG}P / ${m.carbG}C / ${m.fatG}F</strong></div>
          <div class="stat-pill"><span>${isAr ? "الماء والألياف" : "Water & Fiber"}</span><strong>${m.waterL}L / ${m.fiberG}g</strong></div>
        </div>

        <h2>🥗 ${isAr ? "جدول الوجبات اليومي المحسوب (مُعد بزيت زيتون مزارع سيناء البكر أو السمنة البلدي)" : "Calculated Daily Meal Plan (with Sinai Olive Oil / Baladi Ghee)"}</h2>
        <table>
          <thead>
            <tr>
              <th>${isAr ? "الوجبة" : "Meal"}</th>
              <th>${isAr ? "الاختيار الغذائي الصحي" : "Selected Healthy Option"}</th>
              <th>${isAr ? "السعرات" : "Calories"}</th>
              <th>${isAr ? "بروتين" : "Protein"}</th>
              <th>${isAr ? "كارب" : "Carbs"}</th>
              <th>${isAr ? "دهون" : "Fats"}</th>
            </tr>
          </thead>
          <tbody>${mealsRows}</tbody>
        </table>

        <h2>🏋️ ${isAr ? "نظام التمارين المختار:" : "Workout System:"} ${sys.name[AppState.lang]}</h2>
        <div class="wk-grid">${workoutDaysCompact}</div>

        <div class="olive-banner">
          <div>
            🫒 <strong>زيت زيتون مزارع سيناء (ذهب سيناء السائل):</strong> طبيعي 100% • عصرة أولى على البارد • حموضة أقل من 0.2% • خالٍ من الكوليسترول والكيماويات • غني بفيتامين A &amp; E.
          </div>
          <div style="font-weight:900;color:#15803d;white-space:nowrap;">
            📞 للتواصل: 01011805464
          </div>
        </div>

        <div class="footer-bar">
          <strong>تصميم محمد عوض خير بمساعدة Gemini 4 Argon</strong> &nbsp;|&nbsp;
          تليفون / واتساب / تليجرام: <strong>01011805464</strong> &nbsp;|&nbsp;
          YouTube: <strong>youtube.com/@abouawd</strong> &nbsp;|&nbsp;
          LinkedIn: <strong>linkedin.com/in/mohammed-awd-kheir-898424205</strong>
        </div>
      </div>
      <script>
        window.onload = function() { setTimeout(function() { window.print(); }, 350); };
      <\/script>
    </body>
    </html>
  `);
  printWin.document.close();
}

/* ==========================================================================
   11. HOLY QURAN PLAYER (6 RECITERS)
   ========================================================================== */
function renderQuranSection() {
  const isAr = AppState.lang === "ar";
  const recitersEl = document.getElementById("quranRecitersGrid");
  const surahsEl = document.getElementById("quranSurahsList");
  if (!recitersEl || !surahsEl) return;

  recitersEl.innerHTML = Object.values(NILEFIT_QURAN).map(r => `
    <div class="reciter-card ${AppState.currentReciter === r.id ? "active" : ""}" onclick="selectQuranReciter('${r.id}')">
      <div style="font-size:2.3rem;margin-bottom:6px;">${r.avatar}</div>
      <h4 style="font-size:1.05rem;font-weight:800;">${r.name[AppState.lang]}</h4>
      <p style="font-size:0.78rem;color:var(--text-muted);">${r.title[AppState.lang]}</p>
    </div>
  `).join("");

  const curReciter = NILEFIT_QURAN[AppState.currentReciter] || NILEFIT_QURAN.islam;
  surahsEl.innerHTML = curReciter.surahs.map((s, idx) => {
    const isThisPlaying = AppState.isPlayingQuran && AppState.currentSurahIdx === idx;
    return `
      <div class="surah-item ${isThisPlaying ? "playing" : ""}">
        <div style="display:flex;align-items:center;gap:12px;">
          <span style="width:36px;height:36px;border-radius:10px;background:rgba(0,184,148,0.15);color:var(--primary);display:flex;align-items:center;justify-content:center;font-weight:800;">
            ${s.num}
          </span>
          <div>
            <h4 style="font-size:1rem;font-weight:800;">${s.name[AppState.lang]}</h4>
            <span style="font-size:0.8rem;color:var(--text-muted);">${curReciter.name[AppState.lang]}</span>
          </div>
        </div>
        <button class="btn ${isThisPlaying ? "btn-gold" : "btn-primary"}" style="padding:8px 18px;" onclick="playQuranSurah(${idx})">
          <i class="fas ${isThisPlaying ? "fa-pause" : "fa-play"}"></i>
          <span>${isThisPlaying ? (isAr ? "إيقاف مؤقت" : "Pause") : (isAr ? "استماع خاشع" : "Listen")}</span>
        </button>
      </div>
    `;
  }).join("");
}

function selectQuranReciter(reciterId) {
  SoundEngine.playSFX("click");
  AppState.currentReciter = reciterId;
  AppState.currentSurahIdx = -1;
  renderQuranSection();
}

function playQuranSurah(idx) {
  const audio = document.getElementById("quranAudioElement");
  const bar = document.getElementById("floatingQuranBar");
  const titleEl = document.getElementById("floatingQuranTitle");
  if (!audio) return;

  const reciter = NILEFIT_QURAN[AppState.currentReciter];
  const surah = reciter.surahs[idx];

  if (AppState.currentSurahIdx === idx && AppState.isPlayingQuran) {
    audio.pause();
    AppState.isPlayingQuran = false;
    renderQuranSection();
    updateFloatingBarIcon();
    return;
  }

  AppState.currentSurahIdx = idx;
  audio.src = surah.url;
  audio.onerror = () => {
    if (surah.fallbackUrl && audio.src !== surah.fallbackUrl) {
      audio.src = surah.fallbackUrl;
      audio.play().catch(() => {});
    }
  };
  audio.play().then(() => {
    AppState.isPlayingQuran = true;
    if (bar) bar.classList.add("visible");
    if (titleEl) titleEl.textContent = `${surah.name[AppState.lang]} — ${reciter.name[AppState.lang]}`;
    renderQuranSection();
    updateFloatingBarIcon();
  }).catch(() => {
    AppState.isPlayingQuran = false;
  });
}

function toggleFloatingQuranPlay() {
  const audio = document.getElementById("quranAudioElement");
  if (!audio) return;
  if (audio.paused) {
    audio.play().catch(() => {});
    AppState.isPlayingQuran = true;
  } else {
    audio.pause();
    AppState.isPlayingQuran = false;
  }
  updateFloatingBarIcon();
  renderQuranSection();
}

function stopFloatingQuran() {
  const bar = document.getElementById("floatingQuranBar");
  const audio = document.getElementById("quranAudioElement");
  if (bar) bar.classList.remove("visible");
  if (audio) audio.pause();
  AppState.isPlayingQuran = false;
  renderQuranSection();
}

function updateFloatingBarIcon() {
  const btn = document.getElementById("floatingPlayPauseBtn");
  if (btn) {
    btn.innerHTML = `<i class="fas ${AppState.isPlayingQuran ? "fa-pause" : "fa-play"}"></i>`;
  }
}

/* ==========================================================================
   12. COMPLETE MORNING / EVENING ADHKAR & WORKOUT PROTECTION (TEXT + AUDIO!)
   ========================================================================== */
function speakTextWithWebSpeech(text, lang = "ar-SA", onEndCallback = null) {
  const adhkarAudio = document.getElementById("adhkarAudioElement");
  if (adhkarAudio) {
    adhkarAudio.pause();
  }
  if (!("speechSynthesis" in window)) {
    if (onEndCallback) onEndCallback();
    return;
  }
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  utter.rate = 0.9;
  utter.pitch = 1.0;

  const voices = window.speechSynthesis.getVoices();
  const arVoice = voices.find(v => v.lang && v.lang.toLowerCase().startsWith("ar"));
  if (arVoice && lang.startsWith("ar")) {
    utter.voice = arVoice;
  }

  utter.onend = () => {
    if (onEndCallback) onEndCallback();
  };
  utter.onerror = () => {
    if (onEndCallback) onEndCallback();
  };
  window.speechSynthesis.speak(utter);
}

function playSingleDhikrAudio(dhikrId) {
  SoundEngine.playSFX("tasbih");
  const items = NILEFIT_ADHKAR[AppState.currentAdhkarTab] || NILEFIT_ADHKAR.morning;
  const item = items.find(x => x.id === dhikrId);
  if (!item) return;

  if (AppState.speakingDhikrId === dhikrId) {
    stopAllAdhkarAudio();
    return;
  }

  AppState.speakingDhikrId = dhikrId;
  renderAdhkarSection();

  const adhkarAudio = document.getElementById("adhkarAudioElement");
  if (item.audioUrl && adhkarAudio) {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    adhkarAudio.src = item.audioUrl;
    adhkarAudio.onended = () => {
      AppState.speakingDhikrId = null;
      renderAdhkarSection();
      if (AppState.autoPlayAdhkar) playNextDhikrInQueue(dhikrId);
    };
    adhkarAudio.onerror = () => {
      speakTextWithWebSpeech(item.speechText || item.text, "ar-SA", () => {
        AppState.speakingDhikrId = null;
        renderAdhkarSection();
        if (AppState.autoPlayAdhkar) playNextDhikrInQueue(dhikrId);
      });
    };
    adhkarAudio.play().catch(() => {
      speakTextWithWebSpeech(item.speechText || item.text, "ar-SA", () => {
        AppState.speakingDhikrId = null;
        renderAdhkarSection();
        if (AppState.autoPlayAdhkar) playNextDhikrInQueue(dhikrId);
      });
    });
  } else {
    speakTextWithWebSpeech(item.speechText || item.text, "ar-SA", () => {
      AppState.speakingDhikrId = null;
      renderAdhkarSection();
      if (AppState.autoPlayAdhkar) playNextDhikrInQueue(dhikrId);
    });
  }
}

function playNextDhikrInQueue(currentId) {
  const items = NILEFIT_ADHKAR[AppState.currentAdhkarTab] || NILEFIT_ADHKAR.morning;
  const idx = items.findIndex(x => x.id === currentId);
  if (idx >= 0 && idx + 1 < items.length) {
    playSingleDhikrAudio(items[idx + 1].id);
  } else {
    AppState.autoPlayAdhkar = false;
    AppState.speakingDhikrId = null;
    renderAdhkarSection();
  }
}

function togglePlayAllAdhkarAudio() {
  if (AppState.autoPlayAdhkar || AppState.speakingDhikrId) {
    stopAllAdhkarAudio();
    return;
  }
  AppState.autoPlayAdhkar = true;
  const items = NILEFIT_ADHKAR[AppState.currentAdhkarTab] || NILEFIT_ADHKAR.morning;
  if (items.length > 0) {
    playSingleDhikrAudio(items[0].id);
  }
}

function stopAllAdhkarAudio() {
  AppState.autoPlayAdhkar = false;
  AppState.speakingDhikrId = null;
  const adhkarAudio = document.getElementById("adhkarAudioElement");
  if (adhkarAudio) adhkarAudio.pause();
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  renderAdhkarSection();
}

function switchAdhkarCategory(cat) {
  stopAllAdhkarAudio();
  SoundEngine.playSFX("click");
  AppState.currentAdhkarTab = cat;
  renderAdhkarSection();
}

function renderAdhkarSection() {
  const isAr = AppState.lang === "ar";
  const listEl = document.getElementById("adhkarCardsContainer");
  const bannerEl = document.getElementById("adhkarImportanceBanner");
  const playAllBtn = document.getElementById("playAllAdhkarBtn");
  if (!listEl) return;

  ["morning", "evening", "hasad"].forEach(t => {
    const btn = document.getElementById(`adhkarTab_${t}`);
    if (btn) btn.classList.toggle("active", AppState.currentAdhkarTab === t);
  });

  if (playAllBtn) {
    playAllBtn.innerHTML = (AppState.autoPlayAdhkar || AppState.speakingDhikrId)
      ? `<i class="fas fa-stop-circle"></i> <span>${isAr ? "إيقاف القراءة الصوتية" : "Stop Audio Adhkar"}</span>`
      : `<i class="fas fa-volume-high"></i> <span>${isAr ? "تشغيل الأذكار صوتياً بالتتابع" : "Play All Adhkar Audio"}</span>`;
  }

  if (bannerEl) {
    bannerEl.innerHTML = `
      <div style="background:linear-gradient(135deg,rgba(0,184,148,0.14),rgba(243,156,18,0.14));border:1px solid var(--primary);border-radius:16px;padding:18px 22px;margin-bottom:20px;">
        <h4 style="color:var(--primary);font-size:1.08rem;margin-bottom:6px;">
          🛡️ ${isAr ? "أهمية أذكار الصباح والمساء والتحصين من الحسد والعين أثناء التمرين:" : "Importance of Morning/Evening Adhkar & Protection During Workouts:"}
        </h4>
        <p style="font-size:0.9rem;color:var(--text-main);line-height:1.8;">
          ${isAr
            ? "إن المواظبة على <strong>أذكار الصباح والمساء قراءةً واستماعاً</strong> هي الحصن الحصين للمسلم، وبها يحفظ الله عليك صحتك وعافيتك وقوتك العضلية من <strong>العين والحسد والإصابات المفاجئة والكسل</strong> أثناء التمرين في الجيم أو المنزل. قال ﷺ: <em>«العين حق»</em>، ومن رأى في نفسه أو صحته أو أوزانه ما يعجبه فليحصّن نفسه بـ <strong>(ما شاء الله لا قوة إلا بالله)</strong> والمعوذات وآية الكرسي."
            : "Consistent Morning & Evening Adhkar (both reading and listening) shield your health, strength, and athletic progress from envy (Hasad), fatigue, and injury while training."}
        </p>
      </div>
    `;
  }

  const items = NILEFIT_ADHKAR[AppState.currentAdhkarTab] || NILEFIT_ADHKAR.morning;

  listEl.innerHTML = items.map(item => {
    const cur = AppState.adhkarCounts[item.id] || 0;
    const done = cur >= item.target;
    const isSpeaking = AppState.speakingDhikrId === item.id;

    return `
      <div class="dhikr-item ${done ? "completed" : ""} ${isSpeaking ? "speaking-now" : ""}">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
          <span style="font-weight:800;color:var(--primary);font-size:0.98rem;">📿 ${item.title}</span>
          <div style="display:flex;gap:8px;align-items:center;">
            <button class="action-btn ${isSpeaking ? "active" : ""}" style="height:34px;font-size:0.8rem;" onclick="playSingleDhikrAudio('${item.id}')">
              <i class="fas ${isSpeaking ? "fa-stop" : "fa-volume-high"}"></i>
              <span>${isSpeaking ? (isAr ? "جاري القراءة الصوتية..." : "Playing Audio...") : (isAr ? "استماع صوتي للذكر 🔊" : "Listen Audio 🔊")}</span>
            </button>
            <span style="padding:4px 12px;border-radius:16px;background:rgba(243,156,18,0.16);color:var(--gold);font-size:0.8rem;font-weight:800;">
              ${isAr ? `التكرار: ${item.target}` : `Repeat: ${item.target}x`}
            </span>
          </div>
        </div>
        <div class="dhikr-arabic">${item.text}</div>
        <p style="text-align:center;font-size:0.85rem;color:var(--text-muted);margin-bottom:14px;">
          ✨ ${item.virtue}
        </p>
        <div style="text-align:center;display:flex;justify-content:center;gap:10px;flex-wrap:wrap;">
          <button
            class="btn ${done ? "btn-gold" : "btn-primary"}"
            onclick="incrementDhikrCount('${item.id}', ${item.target})">
            <i class="fas ${done ? "fa-check-double" : "fa-fingerprint"}"></i>
            <span>${done ? (isAr ? `تم التحصين (${cur}/${item.target}) ✓` : `Completed (${cur}/${item.target}) ✓`) : (isAr ? `اضغط للتسبيح والعد (${cur} / ${item.target})` : `Tap to Count (${cur} / ${item.target})`)}</span>
          </button>
        </div>
      </div>
    `;
  }).join("");
}

function incrementDhikrCount(id, target) {
  const cur = AppState.adhkarCounts[id] || 0;
  if (cur < target) {
    AppState.adhkarCounts[id] = cur + 1;
    SoundEngine.playSFX(cur + 1 === target ? "success" : "tasbih");
  } else {
    AppState.adhkarCounts[id] = 0;
    SoundEngine.playSFX("click");
  }
  renderAdhkarSection();
}

/* ==========================================================================
   13. NATURE SOUNDS MIXER UI
   ========================================================================== */
const NATURE_SOUNDS_LIST = [
  { id: "heavy_rain", icon: "🌧️", ar: "غزارة المطر على النافذة", en: "Heavy Rain Downpour" },
  { id: "gentle_rain", icon: "🌦️", ar: "مطر هادئ ومريح للأعصاب", en: "Gentle Soothing Rain" },
  { id: "thunder", icon: "⛈️", ar: "صوت الرعد في الأفق", en: "Distant Rolling Thunder" },
  { id: "nile_waves", icon: "🌊", ar: "أمواج نهر النيل الهادئة", en: "Calm Nile River Waves" },
  { id: "ocean", icon: "🏖️", ar: "أمواج البحر والشاطئ", en: "Ocean Surf Waves" },
  { id: "wind", icon: "🍃", ar: "نسيم الليل وحفيف الأشجار", en: "Night Breeze & Leaves" },
  { id: "birds", icon: "🐦", ar: "عصافير الفجر والغابة", en: "Morning Forest Birds" },
  { id: "fire", icon: "🔥", ar: "دفء الحطب والنار المشتعلة", en: "Crackling Campfire" },
  { id: "focus_alpha", icon: "🧘", ar: "ترددات استرخاء وتركيز عميق", en: "Deep Focus Alpha Waves" }
];

function renderNatureSoundsSection() {
  const grid = document.getElementById("natureSoundsGrid");
  if (!grid) return;
  const isAr = AppState.lang === "ar";

  grid.innerHTML = NATURE_SOUNDS_LIST.map(s => {
    const active = !!SoundEngine.natureNodes[s.id];
    return `
      <div
        class="split-card ${active ? "active" : ""}"
        onclick="handleNatureSoundClick('${s.id}')">
        <span class="split-emoji">${s.icon}</span>
        <h4>${isAr ? s.ar : s.en}</h4>
        <p style="margin-top:6px;color:${active ? "var(--primary)" : "var(--text-muted)"};font-weight:700;">
          ${active ? (isAr ? "🔊 قيد التشغيل (اضغط للإيقاف)" : "🔊 Playing (Tap to Stop)") : (isAr ? "اضغط للتشغيل والدمج" : "Tap to Play & Mix")}
        </p>
      </div>
    `;
  }).join("");
}

function handleNatureSoundClick(id) {
  SoundEngine.toggleNatureSound(id);
  renderNatureSoundsSection();
}

/* ==========================================================================
   14. NAVIGATION, LANGUAGE & THEME SWITCHING
   ========================================================================== */
function switchSection(sectionId) {
  SoundEngine.playSFX("click");
  document.querySelectorAll(".app-section").forEach(sec => {
    sec.classList.toggle("active", sec.id === `sec-${sectionId}`);
  });
  document.querySelectorAll(".nav-tab").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-target") === sectionId);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleAppTheme() {
  SoundEngine.playSFX("click");
  AppState.theme = AppState.theme === "dark" ? "light" : "dark";
  localStorage.setItem("nilefit_theme", AppState.theme);
  applyThemeAndLanguage();
}

function toggleAppLanguage() {
  SoundEngine.playSFX("click");
  AppState.lang = AppState.lang === "ar" ? "en" : "ar";
  localStorage.setItem("nilefit_lang", AppState.lang);
  applyThemeAndLanguage();
  renderAllSections();
}

function toggleSFX() {
  AppState.sfxEnabled = !AppState.sfxEnabled;
  if (AppState.sfxEnabled) SoundEngine.playSFX("success");
  const btn = document.getElementById("sfxToggleBtn");
  if (btn) btn.classList.toggle("active", AppState.sfxEnabled);
}

function cycleMotivationalQuote() {
  SoundEngine.playSFX("click");
  AppState.quoteIdx = (AppState.quoteIdx + 1) % 3;
  const qEl = document.getElementById("footerQuoteText");
  if (qEl) {
    const dict = NILEFIT_I18N[AppState.lang];
    qEl.textContent = dict[`footerQuote${AppState.quoteIdx + 1}`];
  }
}

function applyThemeAndLanguage() {
  document.body.setAttribute("data-theme", AppState.theme);
  document.documentElement.lang = AppState.lang;
  document.body.dir = AppState.lang === "ar" ? "rtl" : "ltr";

  const themeBtn = document.getElementById("themeToggleBtn");
  if (themeBtn) {
    themeBtn.innerHTML = AppState.theme === "dark"
      ? `<i class="fas fa-sun" style="color:#ffd32a"></i> <span>${AppState.lang === "ar" ? "الوضع النهاري (شمس) ☀️" : "Day Mode (Sun) ☀️"}</span>`
      : `<i class="fas fa-moon" style="color:#6c5ce7"></i> <span>${AppState.lang === "ar" ? "الوضع الليلي (قمر ونجوم) 🌙" : "Night Mode (Moon) 🌙"}</span>`;
  }

  const langBtn = document.getElementById("langToggleBtn");
  if (langBtn) {
    langBtn.innerHTML = `<i class="fas fa-globe"></i> <span>${AppState.lang === "ar" ? "English" : "العربية"}</span>`;
  }

  const dict = NILEFIT_I18N[AppState.lang];
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });

  updateCloudsVisibility();
  updateRainButtonLabel();
  updateLiveClock();
}

function populateProfileInputs() {
  const p = AppState.profile;
  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.value = val;
  };
  setVal("inpName", p.name);
  setVal("inpAge", p.age);
  setVal("inpGender", p.gender);
  setVal("inpHeight", p.height);
  setVal("inpWeight", p.weight);
  setVal("inpActivity", p.activity);
  setVal("inpGoal", p.goal);
  setVal("inpLevel", p.level);
}

function renderAllSections() {
  renderProfileAndIdealWeight();
  renderDietPlan();
  renderWorkoutSection();
  renderBodyTransformation();
  renderTrackerAndCertificate();
  renderSinaiProductSection();
  renderQuranSection();
  renderAdhkarSection();
  renderNatureSoundsSection();
}

function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : "";
}

window.addEventListener("DOMContentLoaded", () => {
  initSkyAndRain();
  populateProfileInputs();
  applyThemeAndLanguage();
  renderAllSections();
  setInterval(updateLiveClock, 1000);
});
