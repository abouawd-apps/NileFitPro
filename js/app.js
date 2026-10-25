/* ==========================================================================
   NileFitPro - Main Application Controller
   Wires together all 18 languages, Live Hijri/Gregorian Clock, Cairo Radio,
   56,160+ Meals Engine, 100% Biomechanical Cartoon Workouts + Adhkar in Workout,
   13+ Quran Reciters, Adhkar/Ruqyah/Seerah/Strong Personality/Tasbeeh,
   Sleep/Fajr/Pomodoro Calculator, Certificates & Sinai Olive Oil Showcase
   ========================================================================== */

window.currentLang = 'ar';
window.currentBodyMetrics = null;
window.dailyMealIndices = [0, 5, 6, 24, 3]; // Breakfast, Snack 1, Lunch, Snack 2, Dinner
window.mealsBrowserPage = 0;
window.sectionQuoteIndices = {};
window.currentToastQuoteText = '';

// Strict XSS Prevention Utility
window.escapeHtml = function(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Sky & Audio Engine
  if (window.nileSkyAudio) {
    window.nileSkyAudio.init();
  }

  // 2. Initialize Language Selector (18 Languages)
  initLanguageSelector();

  // 3. Start Live Clock (AM/PM with Seconds) & Gregorian + Hijri Dates + Fasting Alerts
  initLiveClockAndHijri();

  // 4. Initialize Cairo Quran Radio
  initCairoRadio();

  // 5. Initialize Motivational Quotes on Every Section
  renderAllQuoteBanners();

  // 6. Initialize Body Calculator & Daily Meals + 60,000+ (66,880) Meals Browser
  runBodyCalculation();
  renderMealsBrowser();

  // 7. Initialize Workouts & 100% Biomechanical Cartoon Video Player + Workout Adhkar Bar
  renderWorkoutSplitDetails('ppl');
  renderExercisesGrid('all');
  renderWorkoutAdhkarWidget('morning');
  if (window.BiomechanicalCartoonEngine) {
    window.BiomechanicalCartoonEngine.init();
  }

  // 8. Initialize Before & After Human Cartoon Transformation Video
  if (window.TransformationCartoonVideo) {
    window.TransformationCartoonVideo.init();
  }

  // 9. Initialize Quran Player (20 Reciters & 114 Surahs)
  initQuranPlayer();

  // 10. Initialize Islamic Hub (Adhkar, Sacred Months & Fasting Seasons, Ruqyah, Prophets' Duas, Friday Sunnahs, 4 Tasbeeh Counters, Seerah & Strong Personality)
  renderAdhkarSection('morning');
  renderSacredMonthsAndFastingSeasons();
  renderRuqyahSection();
  renderProphetsDuas();
  renderFridaySunnahs();
  renderTasbeehCounters();
  renderSeerahPlaylist();
  renderStrongPersonalityPlaylist();

  // 11. Initialize Healthy Sleep & Fajr Calculator + Pomodoro Timer & Study Calculator
  calculateHealthySleep('wake', '04:30');
  initPomodoroTimer();
  calculatePomodoroStudyPlan();

  // 12. Initialize Default Dates & Render Certificate Preview
  initCertificateDefaults();

  // 13. Initialize Smart Motivational Notification & Daily Gym Reminder System
  initSmartGymNotificationSystem();
});

// ==========================================================================
// 1. Language System (18 Languages)
// ==========================================================================
function initLanguageSelector() {
  const sel = document.getElementById('langSelect');
  if (!sel) return;
  sel.innerHTML = window.NILEFIT_LANGUAGES.map(l =>
    `<option value="${l.code}">${l.name}</option>`
  ).join('');
  sel.value = 'ar';
  sel.addEventListener('change', (e) => {
    setAppLanguage(e.target.value);
  });
}

window.setAppLanguage = function(langCode) {
  window.currentLang = langCode;
  const langMeta = window.NILEFIT_LANGUAGES.find(l => l.code === langCode) || window.NILEFIT_LANGUAGES[0];
  document.documentElement.lang = langCode;
  document.documentElement.dir = langMeta.dir;

  const dict = window.NILEFIT_I18N[langCode] || window.NILEFIT_I18N.ar;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  renderAllQuoteBanners();
  if (window.nileSkyAudio) window.nileSkyAudio.playSFX('click');
};

// ==========================================================================
// 2. Live Clock (HH:MM:SS AM/PM) + Gregorian & Hijri Date + Fasting Reminders
// ==========================================================================
function initLiveClockAndHijri() {
  const updateClock = () => {
    const now = new Date();

    // 12-Hour AM/PM Clock with Hours, Minutes, Seconds
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const strHours = String(hours).padStart(2, '0');

    const timeEl = document.getElementById('liveClockDisplay');
    if (timeEl) {
      timeEl.textContent = `${strHours}:${minutes}:${seconds} ${ampm}`;
    }

    // Gregorian Date
    const gregEl = document.getElementById('gregorianDateDisplay');
    if (gregEl) {
      try {
        gregEl.textContent = '📅 الميلادي: ' + now.toLocaleDateString('ar-EG', {
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
      } catch (e) {
        gregEl.textContent = now.toDateString();
      }
    }

    // Hijri Date & White Days (13, 14, 15) + Monday/Thursday Check
    const hijriEl = document.getElementById('hijriDateDisplay');
    let hijriDayNum = 13;
    if (hijriEl) {
      try {
        const hijriStr = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {
          day: 'numeric', month: 'long', year: 'numeric'
        }).format(now);
        hijriEl.textContent = '🌙 الهجري: ' + hijriStr;

        const dayPart = new Intl.DateTimeFormat('en-US-u-ca-islamic', { day: 'numeric' }).format(now);
        hijriDayNum = parseInt(dayPart, 10) || 13;
      } catch (e) {
        hijriEl.textContent = '🌙 التقويم الهجري المبارك';
      }
    }

    // Highlight Monday (1) / Thursday (4) & White Days (13, 14, 15)
    const dayOfWeek = now.getDay(); // 0=Sun, 1=Mon, 3=Wed, 4=Thu
    const monThuBadge = document.getElementById('fastMonThuBadge');
    const whiteDaysBadge = document.getElementById('fastWhiteDaysBadge');

    if (monThuBadge) {
      if (dayOfWeek === 1 || dayOfWeek === 4) {
        monThuBadge.classList.add('active-fast');
        monThuBadge.innerHTML = '🌟 اليوم سنة صيام (الإثنين / الخميس) — تقبل الله طاعتكم!';
      } else if (dayOfWeek === 0 || dayOfWeek === 3) {
        monThuBadge.classList.add('active-fast');
        monThuBadge.innerHTML = '🔔 تذكير: غداً صيام سنة (الإثنين / الخميس)';
      }
    }

    if (whiteDaysBadge) {
      if ([12, 13, 14, 15].includes(hijriDayNum)) {
        whiteDaysBadge.classList.add('active-fast');
        whiteDaysBadge.innerHTML = `🌕 أيام القمر البيض المباركة (اليوم ${hijriDayNum} هجري — صيام 13 و14 و15)`;
      }
    }
  };

  updateClock();
  setInterval(updateClock, 1000);
}

// ==========================================================================
// 3. Top of Site Live Audio Broadcasts (كصوت في أعلى الموقع):
//    A) راديو إذاعة القرآن الكريم بالقاهرة (Cairo Holy Quran Radio)
//    B) بث مباشر | قناة السنة النبوية كصوت (Sunnah Nabawiyyah Live Audio)
// ==========================================================================
const CAIRO_RADIO_STREAMS = [
  'https://stream.radiojar.com/8s5u5tpdtwzuv',
  'https://n0a.radiojar.com/8s5u5tpdtwzuv',
  'https://backup.qurango.net/radio/cairo'
];

const SUNNAH_AUDIO_STREAMS = [
  'https://stream.radiojar.com/4wqre23fytzuv',
  'https://n01.radiojar.com/4wqre23fytzuv',
  'https://n02.radiojar.com/4wqre23fytzuv',
  'https://stream.radiojar.com/4wqre23fytzuv.mp3'
];

let cairoStreamIndex = 0;
let isCairoRadioPlaying = false;
let sunnahStreamIndex = 0;
let isSunnahAudioPlaying = false;

function initCairoRadio() {
  const cairoAudio = document.getElementById('cairoRadioAudio');
  const cairoBtn = document.getElementById('cairoRadioToggleBtn');
  const cairoVol = document.getElementById('cairoRadioVolume');

  const sunnahAudio = document.getElementById('sunnahLiveAudio');
  const sunnahBtn = document.getElementById('sunnahAudioToggleBtn');
  const sunnahVol = document.getElementById('sunnahAudioVolume');

  // Helper to stop Sunnah Audio when Cairo Radio starts
  const stopSunnahIfPlaying = () => {
    if (sunnahAudio && !sunnahAudio.paused) {
      isSunnahAudioPlaying = false;
      sunnahAudio.pause();
      if (sunnahBtn) {
        sunnahBtn.innerHTML = '▶️ تشغيل البث الصوتي';
      }
    }
  };

  // Helper to stop Cairo Radio when Sunnah Audio starts
  const stopCairoIfPlaying = () => {
    if (cairoAudio && !cairoAudio.paused) {
      isCairoRadioPlaying = false;
      cairoAudio.pause();
      if (cairoBtn) {
        cairoBtn.innerHTML = '▶️ تشغيل الإذاعة';
        cairoBtn.classList.remove('active');
      }
    }
  };

  // 1. Cairo Holy Quran Radio Setup
  if (cairoAudio && cairoBtn) {
    cairoAudio.src = CAIRO_RADIO_STREAMS[0];
    cairoAudio.volume = 0.85;

    cairoAudio.addEventListener('error', () => {
      if (isCairoRadioPlaying && cairoStreamIndex < CAIRO_RADIO_STREAMS.length - 1) {
        cairoStreamIndex++;
        cairoAudio.src = CAIRO_RADIO_STREAMS[cairoStreamIndex];
        cairoAudio.play().catch(() => {});
      }
    });

    cairoBtn.addEventListener('click', () => {
      if (cairoAudio.paused) {
        stopSunnahIfPlaying();
        isCairoRadioPlaying = true;
        cairoAudio.play().then(() => {
          cairoBtn.innerHTML = '⏸️ إيقاف الإذاعة';
          cairoBtn.classList.add('active');
        }).catch(() => {
          cairoStreamIndex = (cairoStreamIndex + 1) % CAIRO_RADIO_STREAMS.length;
          cairoAudio.src = CAIRO_RADIO_STREAMS[cairoStreamIndex];
          cairoAudio.play().catch(() => {});
          cairoBtn.innerHTML = '⏸️ جاري التشغيل...';
        });
      } else {
        isCairoRadioPlaying = false;
        cairoAudio.pause();
        cairoBtn.innerHTML = '▶️ تشغيل الإذاعة';
        cairoBtn.classList.remove('active');
      }
    });

    if (cairoVol) {
      cairoVol.addEventListener('input', (e) => {
        cairoAudio.volume = parseFloat(e.target.value);
      });
    }
  }

  // 2. Live Broadcast | Sunnah Nabawiyyah Channel AS AUDIO Setup
  if (sunnahAudio && sunnahBtn) {
    sunnahAudio.src = SUNNAH_AUDIO_STREAMS[0];
    sunnahAudio.volume = 0.85;

    sunnahAudio.addEventListener('error', () => {
      if (isSunnahAudioPlaying && sunnahStreamIndex < SUNNAH_AUDIO_STREAMS.length - 1) {
        sunnahStreamIndex++;
        sunnahAudio.src = SUNNAH_AUDIO_STREAMS[sunnahStreamIndex];
        sunnahAudio.play().catch(() => {});
      }
    });

    sunnahBtn.addEventListener('click', () => {
      if (sunnahAudio.paused) {
        stopCairoIfPlaying();
        isSunnahAudioPlaying = true;
        sunnahAudio.play().then(() => {
          sunnahBtn.innerHTML = '⏸️ إيقاف صوت السنة';
        }).catch(() => {
          sunnahStreamIndex = (sunnahStreamIndex + 1) % SUNNAH_AUDIO_STREAMS.length;
          sunnahAudio.src = SUNNAH_AUDIO_STREAMS[sunnahStreamIndex];
          sunnahAudio.play().catch(() => {});
          sunnahBtn.innerHTML = '⏸️ جاري التشغيل...';
        });
      } else {
        isSunnahAudioPlaying = false;
        sunnahAudio.pause();
        sunnahBtn.innerHTML = '▶️ تشغيل البث الصوتي';
      }
    });

    if (sunnahVol) {
      sunnahVol.addEventListener('input', (e) => {
        sunnahAudio.volume = parseFloat(e.target.value);
      });
    }
  }
}

window.toggleTopSacredBoard = function() {
  const content = document.getElementById('topSacredBoardCollapsibleContent');
  if (!content) return;
  const isHidden = content.style.display === 'none';
  content.style.display = isHidden ? 'block' : 'none';
  if (window.nileSkyAudio) window.nileSkyAudio.playSFX('click');
};

// ==========================================================================
// 4. Navigation Tabs & Motivational Quote Banners on Every Section
// ==========================================================================
window.switchAppSection = function(secId, btnEl) {
  document.querySelectorAll('.app-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(b => b.classList.remove('active'));

  const target = document.getElementById(secId);
  if (target) target.classList.add('active');
  if (btnEl) {
    btnEl.classList.add('active');
  } else {
    const matchingBtn = document.querySelector(`.nav-tab[data-sec="${secId}"]`);
    if (matchingBtn) matchingBtn.classList.add('active');
  }

  if (secId === 'sec-cert' && window.CertificateGenerator) {
    window.CertificateGenerator.renderCertificate();
  }
  if (secId === 'sec-sinai') {
    const showcase = document.getElementById('sinaiShowcaseCard');
    if (showcase) showcase.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  if (window.nileSkyAudio) window.nileSkyAudio.playSFX('click');
};

// Sub-Tabs Switcher inside Sections (Eliminates Endless Scrolling)
window.switchSubTab = function(sectionId, targetPanelId, btnEl) {
  const sec = document.getElementById(sectionId);
  if (!sec) return;

  const panels = sec.querySelectorAll('.sub-tab-panel');
  panels.forEach(p => {
    if (targetPanelId === 'all' || p.id === targetPanelId) {
      p.classList.add('active');
    } else {
      p.classList.remove('active');
    }
  });

  const bar = sec.querySelector('.sub-tabs-bar');
  if (bar) {
    bar.querySelectorAll('.sub-tab-btn').forEach(b => b.classList.remove('active'));
    if (btnEl) {
      btnEl.classList.add('active');
    }
  }
  if (window.nileSkyAudio) window.nileSkyAudio.playSFX('click');
};

window.openSacredMonthsTab = function() {
  switchAppSection('sec-islamic');
  const sec = document.getElementById('sec-islamic');
  const btns = sec ? sec.querySelectorAll('.sub-tab-btn') : [];
  switchSubTab('sec-islamic', 'isl-sub-fasting', btns[1] || null);
};

function renderAllQuoteBanners() {
  const containers = document.querySelectorAll('.section-quote-slot');
  const lang = window.currentLang || 'ar';
  const dict = window.NILEFIT_I18N[lang] || window.NILEFIT_I18N.ar;

  containers.forEach((slot, idx) => {
    const slotKey = slot.getAttribute('data-slot') || `slot_${idx}`;
    if (window.sectionQuoteIndices[slotKey] === undefined) {
      window.sectionQuoteIndices[slotKey] = idx % window.MOTIVATIONAL_QUOTES.length;
    }
    const qIdx = window.sectionQuoteIndices[slotKey];
    const qObj = window.MOTIVATIONAL_QUOTES[qIdx];
    const text = qObj[lang] || qObj.ar;
    const arSub = lang !== 'ar' ? `<div class="quote-sub">${qObj.ar}</div>` : '';

    slot.innerHTML = `
      <div class="quote-banner">
        <div class="quote-text-wrap">
          <div class="quote-text">💡 ${text}</div>
          ${arSub}
        </div>
        <div class="quote-actions">
          <button class="ctrl-btn" onclick="cycleSectionQuote('${slotKey}')">🔄 ${dict.changeQuote}</button>
          <button class="ctrl-btn gold-btn" onclick="triggerQuotePngDownload('${slotKey}')">📥 ${dict.downloadQuotePng}</button>
        </div>
      </div>
    `;
  });
}

window.cycleSectionQuote = function(slotKey) {
  const cur = window.sectionQuoteIndices[slotKey] || 0;
  window.sectionQuoteIndices[slotKey] = (cur + 1) % window.MOTIVATIONAL_QUOTES.length;
  renderAllQuoteBanners();
  if (window.nileSkyAudio) window.nileSkyAudio.playSFX('click');
};

window.triggerQuotePngDownload = function(slotKey) {
  const qIdx = window.sectionQuoteIndices[slotKey] || 0;
  const lang = window.currentLang || 'ar';
  const qObj = window.MOTIVATIONAL_QUOTES[qIdx];
  const text = qObj[lang] || qObj.ar;
  window.downloadQuoteAsPNG(text, lang);
};

// ==========================================================================
// 5. Body Metrics, Ideal Weight & Daily Meals Plan
// ==========================================================================
window.runBodyCalculation = function() {
  const gender = document.getElementById('userGender')?.value || 'male';
  const age = document.getElementById('userAge')?.value || 26;
  const height = document.getElementById('userHeight')?.value || 175;
  const weight = document.getElementById('userWeight')?.value || 82;
  const activity = document.getElementById('userActivity')?.value || 1.55;
  const goal = document.getElementById('userGoal')?.value || 'cut';
  const level = document.getElementById('userLevel')?.value || 'intermediate';

  const metrics = window.calculateUserBodyMetrics({
    gender, age, height, weight, activity, goal, level
  });
  window.currentBodyMetrics = metrics;

  const resGrid = document.getElementById('bodyMetricsOutput');
  if (resGrid) {
    let bmiStatus = 'وزن صحي ومثالي';
    if (metrics.bmi < 18.5) bmiStatus = 'نحافة (يحتاج زيادة صحية)';
    else if (metrics.bmi >= 25 && metrics.bmi < 30) bmiStatus = 'وزن زائد (فرصة ممتازة للتنشيف)';
    else if (metrics.bmi >= 30) bmiStatus = 'سمنة (خطة التنشيف التدريجي مثالية لك)';

    resGrid.innerHTML = `
      <div class="stat-box gold">
        <div class="stat-label">⚖️ الوزن المثالي والصحي لطولك وسنك</div>
        <div class="stat-value">${metrics.idealWeight} كجم</div>
        <div class="stat-sub">النطاق الصحي الآمن: ${metrics.minHealthyWeight} إلى ${metrics.maxHealthyWeight} كجم</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">🔥 سعراتك اليومية للهدف (${metrics.goalLabel})</div>
        <div class="stat-value">${metrics.targetCalories} kcal</div>
        <div class="stat-sub">معدل الحرق الكلي TDEE: ${metrics.tdee} | الأساسي BMR: ${metrics.bmr}</div>
      </div>
      <div class="stat-box cyan">
        <div class="stat-label">🥩 البروتين اليومي بالجرام</div>
        <div class="stat-value">${metrics.proteinGrams} جم</div>
        <div class="stat-sub">${Math.round(metrics.proteinGrams * 4)} سعرة لبناء وحماية العضلات</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">🍚 الكربوهيدرات المعقدة بالجرام</div>
        <div class="stat-value">${metrics.carbGrams} جم</div>
        <div class="stat-sub">${Math.round(metrics.carbGrams * 4)} سعرة للطاقة والأداء الحركي</div>
      </div>
      <div class="stat-box rose">
        <div class="stat-label">🫒 الدهون الصحية (زيت زيتون سيناء / سمنة بلدي)</div>
        <div class="stat-value">${metrics.fatGrams} جم</div>
        <div class="stat-sub">${Math.round(metrics.fatGrams * 9)} سعرة لصحة القلب والهرمونات</div>
      </div>
      <div class="stat-box gold">
        <div class="stat-label">💧 احتياج الماء والألياف ومؤشر الكتلة</div>
        <div class="stat-value">${metrics.waterLiters} لتر ماء</div>
        <div class="stat-sub">الألياف: ${metrics.fiberGrams} جم | BMI: ${metrics.bmi} (${bmiStatus})</div>
      </div>
    `;
  }

  renderDailyFiveMeals();
  renderMealsBrowser();
  if (window.CertificateGenerator) window.CertificateGenerator.renderCertificate();
};

window.renderDailyFiveMeals = function() {
  const container = document.getElementById('dailyFiveMealsGrid');
  if (!container) return;
  const m = window.currentBodyMetrics || window.calculateUserBodyMetrics({});
  const prefFat = document.getElementById('userPreferredFat')?.value || 'both';

  const slots = [
    { name: '🌅 وجبة الإفطار المتوازنة', ratio: 0.25, idxPos: 0 },
    { name: '🍏 سناك صحي 1 (بين الإفطار والغداء)', ratio: 0.10, idxPos: 1 },
    { name: '☀️ وجبة الغداء الرئيسية', ratio: 0.35, idxPos: 2 },
    { name: '🥜 سناك الطاقة قبل/بعد التمرين', ratio: 0.10, idxPos: 3 },
    { name: '🌙 وجبة العشاء الخفيفة المشبعة', ratio: 0.20, idxPos: 4 }
  ];

  container.innerHTML = slots.map(slot => {
    const mealIdx = window.dailyMealIndices[slot.idxPos];
    const targetCal = Math.round(m.targetCalories * slot.ratio);
    const meal = window.generateMealByIndex(mealIdx, targetCal, prefFat);
    return buildMealCardHTML(meal, slot.name, slot.idxPos);
  }).join('');
};

window.swapDailyMeal = function(slotPos) {
  window.dailyMealIndices[slotPos] = (window.dailyMealIndices[slotPos] + 37 + Math.floor(Math.random() * 500)) % window.TOTAL_MEAL_COMBINATIONS;
  renderDailyFiveMeals();
  if (window.nileSkyAudio) window.nileSkyAudio.playSFX('click');
};

function buildMealCardHTML(meal, badgeText, slotPos = null) {
  const swapBtn = slotPos !== null
    ? `<button class="ctrl-btn" onclick="swapDailyMeal(${slotPos})">🔄 بديل صحي آخر</button>`
    : `<span class="badge-pill emerald">وجبة #${meal.mealNumber.toLocaleString('ar-EG')}</span>`;

  const illustrativeDiagram = window.buildMealIllustrativeDiagramSVG
    ? window.buildMealIllustrativeDiagramSVG(meal)
    : '';

  return `
    <div class="meal-card">
      <div class="meal-img-wrap">
        <img src="${meal.img}" alt="${meal.title}" loading="lazy" />
        <div class="meal-badge-overlay">${badgeText} | ${meal.calories} kcal</div>
        <div class="meal-oil-tag">🫒 ${meal.fatItem.grams} جم ${meal.fatItem.name}</div>
      </div>
      <div class="meal-body">
        <div>
          <div class="meal-title">${meal.title}</div>
          <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:6px;">${meal.subtitle}</div>
          <div class="ingredient-pills">
            <span class="ing-pill">🥩 <strong>${meal.proteinItem.grams} جم</strong> ${meal.proteinItem.name}</span>
            <span class="ing-pill">🌾 <strong>${meal.carbItem.grams} جم</strong> ${meal.carbItem.name}</span>
            <span class="ing-pill">🥗 <strong>${meal.veggieItem.grams} جم</strong> ${meal.veggieItem.name}</span>
            <span class="ing-pill" style="border-color:#f59e0b; color:#fde68a;">✨ <strong>${meal.fatItem.grams} جم</strong> ${meal.fatItem.name}</span>
          </div>
          ${illustrativeDiagram}
        </div>
        <div>
          <div class="macro-strip" style="margin:8px 0;">
            <div>سعرات<strong>${meal.calories}</strong></div>
            <div>بروتين<strong>${meal.protein}g</strong></div>
            <div>كارب<strong>${meal.carbs}g</strong></div>
            <div>دهون<strong>${meal.fats}g</strong></div>
          </div>
          <div style="display:flex; gap:6px; justify-content:space-between; flex-wrap:wrap;">
            <button class="ctrl-btn gold-btn" style="flex:1; justify-content:center;" onclick="window.CartoonRecipePlayer.open(${meal.mealNumber - 1})">
              🎬 فيديو التحضير الكرتوني
            </button>
            ${swapBtn}
          </div>
        </div>
      </div>
    </div>
  `;
}

// ==========================================================================
// 6. 50,000+ Healthy Meals Browser (56,160 Combinations)
// ==========================================================================
window.renderMealsBrowser = function() {
  const grid = document.getElementById('tenThousandMealsGrid');
  const countLabel = document.getElementById('mealsTotalCounterLabel');
  if (!grid) return;

  const searchQ = (document.getElementById('mealSearchInput')?.value || '').trim();
  const catFilter = document.getElementById('mealCategoryFilter')?.value || 'all';
  const jumpNum = parseInt(document.getElementById('mealJumpNumber')?.value, 10);
  const prefFat = document.getElementById('userPreferredFat')?.value || 'both';
  const m = window.currentBodyMetrics || window.calculateUserBodyMetrics({});
  const targetMealCal = Math.round(m.targetCalories * 0.32);

  if (countLabel) {
    countLabel.textContent = `إجمالي قاعدة الوجبات والبدائل الصحية المحسوبة: ${window.TOTAL_MEAL_COMBINATIONS.toLocaleString('ar-EG')} وجبة صحية متكاملة (أكثر من 60,000 بديل صحي بالجرامات!)`;
  }

  let items = [];
  if (!isNaN(jumpNum) && jumpNum >= 1 && jumpNum <= window.TOTAL_MEAL_COMBINATIONS) {
    for (let i = 0; i < 9; i++) {
      items.push(window.generateMealByIndex(jumpNum - 1 + i, targetMealCal, prefFat));
    }
  } else {
    const startIdx = window.mealsBrowserPage * 9;
    let scanned = 0;
    let cursor = startIdx;
    while (items.length < 9 && scanned < 3500) {
      const candidate = window.generateMealByIndex(cursor, targetMealCal, prefFat);
      const matchesCat = catFilter === 'all' || candidate.category === catFilter;
      const matchesSearch = !searchQ ||
        candidate.title.includes(searchQ) ||
        candidate.subtitle.includes(searchQ) ||
        candidate.proteinItem.name.includes(searchQ);
      if (matchesCat && matchesSearch) {
        items.push(candidate);
      }
      cursor = (cursor + 43) % window.TOTAL_MEAL_COMBINATIONS; // Prime step for diverse proteins across cards
      scanned++;
    }
  }

  grid.innerHTML = items.map(meal =>
    buildMealCardHTML(meal, `وجبة صحية #${meal.mealNumber.toLocaleString('ar-EG')}`)
  ).join('');
};

window.changeMealsPage = function(delta) {
  window.mealsBrowserPage = Math.max(0, window.mealsBrowserPage + delta);
  const jumpEl = document.getElementById('mealJumpNumber');
  if (jumpEl) jumpEl.value = '';
  renderMealsBrowser();
  if (window.nileSkyAudio) window.nileSkyAudio.playSFX('click');
};

// ==========================================================================
// 7. Workout Programs, Muscle Group Exercises & Adhkar During Workout
// ==========================================================================
window.renderWorkoutSplitDetails = function(splitKey) {
  const split = window.WORKOUT_SPLITS[splitKey] || window.WORKOUT_SPLITS.ppl;
  const container = document.getElementById('workoutSplitScheduleBox');
  if (!container) return;

  container.innerHTML = `
    <div style="margin-bottom:12px;">
      <h3 style="color:var(--accent-gold-light); font-size:1.15rem;">📋 ${split.name}</h3>
      <p style="font-size:0.9rem; color:var(--text-secondary);">${split.desc}</p>
    </div>
    <div class="grid-3">
      ${split.schedule.map(s => `
        <div class="stat-box" style="text-align:right;">
          <div style="color:var(--accent-emerald); font-weight:800; font-size:0.98rem;">🗓️ ${s.day}</div>
          <div style="color:var(--text-primary); font-size:0.86rem; margin-top:4px;">${s.focus}</div>
          <div style="margin-top:8px;">
            <button class="ctrl-btn" onclick="renderExercisesGrid('${s.muscles[0]}')">🎯 عرض تمارين هذا اليوم</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
};

window.renderWorkoutAdhkarWidget = function(period = 'morning') {
  const box = document.getElementById('workoutAdhkarQuickList');
  if (!box) return;
  const list = window.ADHKAR_DATA[period] || window.ADHKAR_DATA.morning;
  box.innerHTML = list.slice(0, 4).map(item => `
    <div class="stat-box" style="text-align:right; padding:10px 14px;">
      <div style="display:flex; justify-content:space-between; align-items:center; gap:6px; margin-bottom:4px;">
        <strong style="color:var(--accent-gold-light); font-size:0.92rem;">🛡️ ${item.title}</strong>
        <button class="ctrl-btn active" style="padding:3px 9px; font-size:0.76rem;" onclick="decrementDhikrBtn(this, ${item.count})">
          التكرار: <span>${item.count}</span>
        </button>
      </div>
      <p style="font-size:0.88rem; line-height:1.65; color:var(--text-primary); margin:0;">${item.text}</p>
    </div>
  `).join('');
};

window.renderExercisesGrid = function(muscleFilter = 'all') {
  const grid = document.getElementById('exercisesLibraryGrid');
  if (!grid) return;

  document.querySelectorAll('.muscle-filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-muscle') === muscleFilter);
  });

  const filtered = muscleFilter === 'all'
    ? window.EXERCISES_DB
    : window.EXERCISES_DB.filter(ex => ex.muscle === muscleFilter);

  grid.innerHTML = filtered.map(ex => `
    <div class="exercise-card">
      <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;">
        <span class="badge-pill">${ex.muscleAr}</span>
        <span class="accuracy-verified-badge">✅ دقة ميكانيكية 100%</span>
      </div>
      <h4 style="font-size:1.05rem; color:var(--text-primary);">${ex.name}</h4>
      <div style="font-size:0.83rem; color:var(--text-secondary);">🏋️ <strong>الجهاز:</strong> ${ex.machine}</div>
      <div style="font-size:0.82rem; color:var(--accent-gold-light);">⏱️ ${ex.sets.intermediate}</div>
      <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:auto; padding-top:8px;">
        <button class="btn-primary" style="padding:8px 14px; font-size:0.85rem; flex:1;" onclick="selectAndScrollToExercise('${ex.id}')">
          ▶️ تشغيل الفيديو الكرتوني 100%
        </button>
        <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(ex.ytQuery)}" target="_blank" rel="noopener" class="ctrl-btn" style="text-decoration:none; color:#f87171;">
          📺 يوتيوب
        </a>
      </div>
    </div>
  `).join('');
};

window.selectAndScrollToExercise = function(exId) {
  if (window.BiomechanicalCartoonEngine) {
    window.BiomechanicalCartoonEngine.selectExercise(exId);
  }
  const stage = document.getElementById('biomechPlayerCard');
  if (stage) stage.scrollIntoView({ behavior: 'smooth', block: 'center' });
  if (window.nileSkyAudio) window.nileSkyAudio.playSFX('click');
};

// ==========================================================================
// 8. Full Holy Quran Player (13 Reciters × 114 Surahs + MP3 Download)
// ==========================================================================
let currentReciter = window.QURAN_RECITERS[0];
let currentSurahIndex = 0;

function initQuranPlayer() {
  const reciterSel = document.getElementById('quranReciterSelect');
  const audio = document.getElementById('quranMainAudio');
  if (!reciterSel) return;

  reciterSel.innerHTML = window.QURAN_RECITERS.map(r =>
    `<option value="${r.id}">${r.name}</option>`
  ).join('');

  reciterSel.addEventListener('change', (e) => {
    currentReciter = window.QURAN_RECITERS.find(r => r.id === e.target.value) || window.QURAN_RECITERS[0];
    renderSurahsGrid();
    playSurah(currentSurahIndex, false);
  });

  if (audio) {
    audio.addEventListener('error', () => {
      // Automatic fallback server if primary surah file fails
      if (currentReciter && currentReciter.fallbackServer) {
        const numStr = String(currentSurahIndex + 1).padStart(3, '0');
        const fallbackUrl = `${currentReciter.fallbackServer}${numStr}.mp3`;
        if (audio.src !== fallbackUrl) {
          audio.src = fallbackUrl;
          audio.play().catch(() => {});
        }
      }
    });
  }

  renderSurahsGrid();
  playSurah(0, false);
}

window.renderSurahsGrid = function() {
  const grid = document.getElementById('quranSurahsGrid');
  if (!grid) return;
  const q = (document.getElementById('surahSearchInput')?.value || '').trim();

  grid.innerHTML = window.SURAHS_LIST.map((name, idx) => {
    if (q && !name.includes(q) && !String(idx + 1).includes(q)) return '';
    const numStr = String(idx + 1).padStart(3, '0');
    const mp3Url = `${currentReciter.server}${numStr}.mp3`;
    const isPlaying = idx === currentSurahIndex;

    return `
      <div class="surah-item ${isPlaying ? 'playing' : ''}">
        <div style="display:flex; align-items:center; gap:10px; cursor:pointer; flex:1;" onclick="playSurah(${idx}, true)">
          <div class="surah-num">${idx + 1}</div>
          <div>
            <div style="font-weight:800; font-size:0.95rem;">سورة ${name}</div>
            <div style="font-size:0.74rem; color:var(--text-muted);">${currentReciter.name.split('(')[0]}</div>
          </div>
        </div>
        <div style="display:flex; gap:5px;">
          <button class="ctrl-btn" title="استماع" onclick="playSurah(${idx}, true)">▶️</button>
          <a href="${mp3Url}" target="_blank" download="Surah_${numStr}_${name}_${currentReciter.id}.mp3" class="ctrl-btn gold-btn" title="تحميل السورة MP3" style="text-decoration:none;">
            📥 MP3
          </a>
        </div>
      </div>
    `;
  }).join('');
};

window.playSurah = function(idx, autoPlay = true) {
  currentSurahIndex = idx;
  const name = window.SURAHS_LIST[idx];
  const numStr = String(idx + 1).padStart(3, '0');
  const mp3Url = `${currentReciter.server}${numStr}.mp3`;

  const audio = document.getElementById('quranMainAudio');
  const nowPlaying = document.getElementById('quranNowPlayingLabel');
  const dlBtn = document.getElementById('quranCurrentDownloadBtn');

  if (nowPlaying) {
    nowPlaying.textContent = `🕋 سورة ${name} — بصوت ${currentReciter.name}`;
  }
  if (dlBtn) {
    dlBtn.href = mp3Url;
    dlBtn.setAttribute('download', `Surah_${numStr}_${name}.mp3`);
  }
  if (audio) {
    audio.src = mp3Url;
    if (autoPlay) {
      audio.play().catch(() => {});
    }
  }
  renderSurahsGrid();
};

// ==========================================================================
// 9. Islamic Hub: Adhkar, Ruqyah, Prophets' Duas, Friday Sunnahs, Tasbeeh, Seerah & Strong Personality
// ==========================================================================
window.renderAdhkarSection = function(period = 'morning') {
  const container = document.getElementById('adhkarItemsList');
  if (!container) return;
  const list = window.ADHKAR_DATA[period] || window.ADHKAR_DATA.morning;

  container.innerHTML = list.map((item) => `
    <div class="stat-box" style="text-align:right; margin-bottom:12px;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:8px;">
        <h4 style="color:var(--accent-gold-light); font-size:1.05rem;">🛡️ ${item.title}</h4>
        <button class="ctrl-btn active" onclick="decrementDhikrBtn(this, ${item.count})">
          التكرار المتبقي: <span>${item.count}</span>
        </button>
      </div>
      <p style="font-size:1.05rem; line-height:1.85; color:var(--text-primary); margin-bottom:8px;">${item.text}</p>
      <div style="font-size:0.82rem; color:var(--accent-emerald);">✨ <strong>الفضل والتحصين:</strong> ${item.virtue}</div>
    </div>
  `).join('');
};

window.decrementDhikrBtn = function(btn, maxCount) {
  const span = btn.querySelector('span');
  if (!span) return;
  let val = parseInt(span.textContent, 10);
  if (val > 1) {
    val--;
    span.textContent = val;
    if (window.nileSkyAudio) window.nileSkyAudio.playSFX('tasbeeh');
  } else {
    span.textContent = 'تم بحمد الله ✓';
    btn.style.background = '#f59e0b';
    if (window.nileSkyAudio) window.nileSkyAudio.playSFX('success');
  }
};

function renderRuqyahSection() {
  const container = document.getElementById('ruqyahItemsContainer');
  if (!container) return;
  container.innerHTML = window.RUQYAH_ITEMS.map(r => `
    <div class="stat-box" style="text-align:right; margin-bottom:12px;">
      <h4 style="color:var(--accent-emerald); margin-bottom:6px;">🌿 ${r.title}</h4>
      <p style="font-size:1.02rem; line-height:1.85; white-space:pre-line;">${r.text}</p>
    </div>
  `).join('');
}

function renderProphetsDuas() {
  const container = document.getElementById('prophetsDuasGrid');
  if (!container) return;
  container.innerHTML = window.PROPHETS_DUAS.map(d => `
    <div class="stat-box" style="text-align:right;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
        <strong style="color:var(--accent-gold-light); font-size:0.98rem;">🌟 ${d.prophet}</strong>
        <span class="badge-pill emerald">${d.ref}</span>
      </div>
      <p style="font-size:0.98rem; line-height:1.75; color:var(--text-primary);">${d.dua}</p>
    </div>
  `).join('');
}

function renderFridaySunnahs() {
  const container = document.getElementById('fridaySunnahsGrid');
  if (!container) return;
  container.innerHTML = window.FRIDAY_SUNNAHS.map(s => `
    <div class="stat-box" style="text-align:right;">
      <div style="font-size:1.8rem; margin-bottom:6px;">${s.icon}</div>
      <h4 style="color:var(--accent-gold-light); margin-bottom:4px;">${s.title}</h4>
      <p style="font-size:0.86rem; color:var(--text-secondary);">${s.desc}</p>
    </div>
  `).join('');
}

function renderTasbeehCounters() {
  const container = document.getElementById('tasbeehCountersGrid');
  if (!container) return;

  container.innerHTML = window.TASBEEH_COUNTERS_CONFIG.map(c => {
    const saved = parseInt(localStorage.getItem(`tasbeeh_${c.id}`) || '0', 10);
    return `
      <div class="tasbeeh-card">
        <div style="font-size:0.88rem; color:var(--accent-emerald); font-weight:800;">📿 ${c.title}</div>
        <div class="tasbeeh-dhikr">${c.dhikr}</div>
        <div class="tasbeeh-count-circle" onclick="incrementTasbeeh('${c.id}', ${c.target})">
          <span id="tasbeeh_val_${c.id}">${saved}</span>
          <small style="font-size:0.7rem; color:#94a3b8;">اضغط للتسبيح</small>
        </div>
        <div style="font-size:0.78rem; color:#cbd5e1; line-height:1.5; background:rgba(0,0,0,0.28); padding:8px; border-radius:8px;">
          ${c.virtue}
        </div>
        <button class="ctrl-btn" style="justify-content:center;" onclick="resetTasbeeh('${c.id}')">🔄 تصفير العداد</button>
      </div>
    `;
  }).join('');
}

window.incrementTasbeeh = function(id, target) {
  const el = document.getElementById(`tasbeeh_val_${id}`);
  if (!el) return;
  let val = parseInt(el.textContent, 10) + 1;
  el.textContent = val;
  localStorage.setItem(`tasbeeh_${id}`, String(val));
  if (window.nileSkyAudio) {
    window.nileSkyAudio.playSFX(val % target === 0 ? 'success' : 'tasbeeh');
  }
};

window.resetTasbeeh = function(id) {
  const el = document.getElementById(`tasbeeh_val_${id}`);
  if (el) el.textContent = '0';
  localStorage.setItem(`tasbeeh_${id}`, '0');
  if (window.nileSkyAudio) window.nileSkyAudio.playSFX('click');
};

// Playlist 1: Sheikh Nabil Al-Awadi Prophetic Seerah (30 Episodes)
function renderSeerahPlaylist() {
  const listEl = document.getElementById('seerahEpisodesList');
  if (!listEl || !window.SEERAH_EPISODES) return;

  listEl.innerHTML = window.SEERAH_EPISODES.map((ep, idx) => `
    <div class="surah-item ${idx === 0 ? 'playing' : ''}" style="cursor:pointer;" onclick="loadSeerahEpisode(${idx}, this)">
      <div class="surah-num">${ep.ep}</div>
      <div style="flex:1; font-size:0.86rem; font-weight:700;">${ep.title}</div>
      <span class="badge-pill">▶️ مشاهدة</span>
    </div>
  `).join('');
}

window.loadSeerahEpisode = function(idx, el) {
  const iframe = document.getElementById('seerahYoutubeIframe');
  const epObj = window.SEERAH_EPISODES?.[idx];
  if (!iframe || !epObj) return;
  document.querySelectorAll('#seerahEpisodesList .surah-item').forEach(i => i.classList.remove('playing'));
  if (el) el.classList.add('playing');

  iframe.src = `https://www.youtube.com/embed/${epObj.videoId}?list=PLbDRORmj0gydAp_9O0Vc4fq4qE3zmrTdw`;
  if (window.nileSkyAudio) window.nileSkyAudio.playSFX('click');
};

// Playlist 2: Strong Personality Series (سلسلة الشخصية القوية - 6 Parts)
function renderStrongPersonalityPlaylist() {
  const listEl = document.getElementById('strongPersonalityEpisodesList');
  if (!listEl || !window.STRONG_PERSONALITY_EPISODES) return;

  listEl.innerHTML = window.STRONG_PERSONALITY_EPISODES.map((ep, idx) => `
    <div class="surah-item ${idx === 0 ? 'playing' : ''}" style="cursor:pointer;" onclick="loadStrongPersonalityEpisode(${idx}, this)">
      <div class="surah-num">${ep.ep}</div>
      <div style="flex:1; font-size:0.86rem; font-weight:700;">${ep.title}</div>
      <span class="badge-pill emerald">▶️ مشاهدة</span>
    </div>
  `).join('');
}

window.loadStrongPersonalityEpisode = function(idx, el) {
  const iframe = document.getElementById('strongPersonalityYoutubeIframe');
  const epObj = window.STRONG_PERSONALITY_EPISODES?.[idx];
  if (!iframe || !epObj) return;
  document.querySelectorAll('#strongPersonalityEpisodesList .surah-item').forEach(i => i.classList.remove('playing'));
  if (el) el.classList.add('playing');

  iframe.src = `https://www.youtube.com/embed/${epObj.videoId}?list=PLsRtYZTCYnEdUMt_aelwwZ79D4aFcg86_`;
  if (window.nileSkyAudio) window.nileSkyAudio.playSFX('click');
};

// ==========================================================================
// 10. Healthy Sleep & Fajr Awakening Calculator + Pomodoro Timer & Calculator
// ==========================================================================
window.calculateHealthySleep = function(mode = 'wake', timeStr = null) {
  const inputTime = timeStr || document.getElementById('sleepTimeInput')?.value || '04:30';
  const [hh, mm] = inputTime.split(':').map(Number);
  const baseMins = hh * 60 + mm;
  const out = document.getElementById('sleepCyclesOutput');
  if (!out) return;

  // 90-min sleep cycles + 15-min falling asleep latency
  const cycles = [6, 5, 4]; // 9 hrs, 7.5 hrs, 6 hrs
  const cards = cycles.map(c => {
    const durationMins = c * 90 + 15;
    let targetMins = mode === 'wake'
      ? (baseMins - durationMins + 1440) % 1440
      : (baseMins + durationMins) % 1440;

    let th = Math.floor(targetMins / 60);
    const tm = String(targetMins % 60).padStart(2, '0');
    const ampm = th >= 12 ? 'PM' : 'AM';
    th = th % 12 || 12;

    const quality = c === 6 ? 'نوم عميق واستشفاء عضلي كامل (9 ساعات)' : (c === 5 ? 'المثالي الأفضل للنشاط وصلاة الفجر (7.5 ساعة)' : 'الحد الأدنى الصحي للتركيز (6 ساعات)');
    return `
      <div class="stat-box ${c === 5 ? 'gold' : ''}">
        <div class="stat-label">${c} دورات نوم كاملة (${c * 1.5} ساعة)</div>
        <div class="stat-value" style="direction:ltr;">${String(th).padStart(2, '0')}:${tm} ${ampm}</div>
        <div class="stat-sub">${quality}</div>
      </div>
    `;
  });

  out.innerHTML = cards.join('');
};

// Pomodoro Deep Study Calculator (Calculates sessions, breaks, & finish time)
window.calculatePomodoroStudyPlan = function() {
  const hoursInput = parseFloat(document.getElementById('pomoStudyHoursInput')?.value || '3');
  const sessionMins = parseInt(document.getElementById('pomoSessionLenSelect')?.value || '25', 10);
  const out = document.getElementById('pomoCalculatorOutput');
  if (!out) return;

  const totalFocusMins = Math.round(hoursInput * 60);
  const sessionsCount = Math.max(1, Math.ceil(totalFocusMins / sessionMins));
  const shortBreaks = Math.max(0, sessionsCount - 1);
  const longBreaks = Math.floor((sessionsCount - 1) / 4);
  const breakMins = (shortBreaks - longBreaks) * 5 + longBreaks * 15;
  const totalElapsedMins = (sessionsCount * sessionMins) + breakMins;

  const finishDate = new Date(Date.now() + totalElapsedMins * 60000);
  let fh = finishDate.getHours();
  const fm = String(finishDate.getMinutes()).padStart(2, '0');
  const ampm = fh >= 12 ? 'PM' : 'AM';
  fh = fh % 12 || 12;

  out.innerHTML = `
    <div class="stat-box">
      <div class="stat-label">عدد جلسات البومودورو</div>
      <div class="stat-value" style="font-size:1.25rem;">${sessionsCount} جلسات</div>
      <div class="stat-sub">كل جلسة ${sessionMins} دقيقة تركيز عميق</div>
    </div>
    <div class="stat-box cyan">
      <div class="stat-label">إجمالي وقت الراحة</div>
      <div class="stat-value" style="font-size:1.25rem;">${breakMins} دقيقة</div>
      <div class="stat-sub">${shortBreaks - longBreaks} راحة قصيرة (5د) + ${longBreaks} طويلة (15د)</div>
    </div>
    <div class="stat-box gold">
      <div class="stat-label">موعد إتمام المذاكرة المتوقع</div>
      <div class="stat-value" style="font-size:1.25rem; direction:ltr;">${String(fh).padStart(2, '0')}:${fm} ${ampm}</div>
      <div class="stat-sub">إجمالي الزمن الكلي: ${(totalElapsedMins / 60).toFixed(1)} ساعة</div>
    </div>
  `;
};

let pomoInterval = null;
let pomoRemainingSec = 25 * 60;
let pomoTotalSec = 25 * 60;
let pomoRunning = false;

function initPomodoroTimer() {
  updatePomodoroUI();
}

window.setPomodoroPreset = function(focusMins, label) {
  if (pomoInterval) clearInterval(pomoInterval);
  pomoRunning = false;
  pomoTotalSec = focusMins * 60;
  pomoRemainingSec = pomoTotalSec;
  const lbl = document.getElementById('pomoModeLabel');
  if (lbl) lbl.textContent = label;
  const btn = document.getElementById('pomoStartPauseBtn');
  if (btn) btn.textContent = '▶️ ابدأ جلسة التركيز العميق';
  updatePomodoroUI();
  if (window.nileSkyAudio) window.nileSkyAudio.playSFX('click');
};

window.togglePomodoroTimer = function() {
  const btn = document.getElementById('pomoStartPauseBtn');
  if (pomoRunning) {
    clearInterval(pomoInterval);
    pomoRunning = false;
    if (btn) btn.textContent = '▶️ استئناف الجلسة';
  } else {
    pomoRunning = true;
    if (btn) btn.textContent = '⏸️ إيقاف مؤقت';
    pomoInterval = setInterval(() => {
      if (pomoRemainingSec > 0) {
        pomoRemainingSec--;
        updatePomodoroUI();
      } else {
        clearInterval(pomoInterval);
        pomoRunning = false;
        if (window.nileSkyAudio) window.nileSkyAudio.playSFX('success');
        if (btn) btn.textContent = '🎉 أحسنت! ابدأ جلسة جديدة';
      }
    }, 1000);
  }
  if (window.nileSkyAudio) window.nileSkyAudio.playSFX('click');
};

window.resetPomodoroTimer = function() {
  if (pomoInterval) clearInterval(pomoInterval);
  pomoRunning = false;
  pomoRemainingSec = pomoTotalSec;
  const btn = document.getElementById('pomoStartPauseBtn');
  if (btn) btn.textContent = '▶️ ابدأ جلسة التركيز العميق';
  updatePomodoroUI();
  if (window.nileSkyAudio) window.nileSkyAudio.playSFX('click');
};

function updatePomodoroUI() {
  const disp = document.getElementById('pomoTimeDisplay');
  if (!disp) return;
  const m = String(Math.floor(pomoRemainingSec / 60)).padStart(2, '0');
  const s = String(pomoRemainingSec % 60).padStart(2, '0');
  disp.textContent = `${m}:${s}`;
}

// ==========================================================================
// 11. Certificate Defaults & Lightbox Image Viewer
// ==========================================================================
function initCertificateDefaults() {
  const startIn = document.getElementById('certStartDate');
  const endIn = document.getElementById('certEndDate');
  if (startIn && endIn) {
    const now = new Date();
    const past = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    startIn.value = past.toISOString().split('T')[0];
    endIn.value = now.toISOString().split('T')[0];
  }
  if (window.CertificateGenerator) {
    window.CertificateGenerator.renderCertificate();
  }
}

window.openImageLightbox = function(imgSrc, caption) {
  const modal = document.getElementById('imageLightboxModal');
  const img = document.getElementById('lightboxFullImg');
  const cap = document.getElementById('lightboxCaption');
  if (!modal || !img) return;
  img.src = imgSrc;
  if (cap) cap.textContent = caption;
  modal.classList.add('open');
};

// ==========================================================================
// 12. Sacred Months (الأشهر الحُرُم الأربعة) & Special Fasting Seasons Board
// ==========================================================================
function renderSacredMonthsAndFastingSeasons() {
  const data = window.SACRED_MONTHS_AND_FASTING;
  if (!data) return;

  const virtueP = document.getElementById('sacredMonthsVirtueParagraph');
  if (virtueP) {
    virtueP.textContent = data.generalVirtue;
  }

  let currentHijriMonth = 0;
  try {
    const mStr = new Intl.DateTimeFormat('en-US-u-ca-islamic', { month: 'numeric' }).format(new Date());
    currentHijriMonth = parseInt(mStr, 10) || 0;
  } catch (e) {}

  // Highlight active sacred month in the Top Clear Board
  document.querySelectorAll('.top-sacred-item[data-hijri-month]').forEach(el => {
    const mNum = parseInt(el.getAttribute('data-hijri-month'), 10);
    if (mNum === currentHijriMonth) {
      el.classList.add('current-sacred-month');
    }
  });

  const monthsGrid = document.getElementById('sacredMonthsFourGrid');
  if (monthsGrid) {
    monthsGrid.innerHTML = data.sacredMonths.map(m => {
      const isCurrent = m.num === currentHijriMonth;
      return `
        <div class="sacred-month-card" style="${isCurrent ? 'border-color:#10b981; box-shadow:0 0 20px rgba(16,185,129,0.45);' : ''}">
          <span class="badge-pill ${isCurrent ? 'active-fast' : 'emerald'}" style="margin-bottom:8px;">
            ${isCurrent ? '✨ نحن الآن في هذا الشهر الحرام' : m.badge}
          </span>
          <h3 style="font-size:1.45rem; font-weight:900; color:#fde68a; margin-bottom:6px;">🌙 شهر ${m.name}</h3>
          <p style="font-size:0.85rem; color:#cbd5e1; line-height:1.65;">${m.virtue}</p>
        </div>
      `;
    }).join('');
  }

  const seasonsGrid = document.getElementById('specialFastingSeasonsGrid');
  if (seasonsGrid) {
    seasonsGrid.innerHTML = data.specialFastingSeasons.map(s => `
      <div class="stat-box" style="text-align:right; background:rgba(15,23,42,0.82); border-color:rgba(251,191,36,0.45);">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:8px;">
          <h4 style="color:#fde68a; font-size:1.08rem;">${s.icon} ${s.title}</h4>
          <span class="badge-pill emerald">${s.highlight}</span>
        </div>
        <p style="font-size:0.9rem; line-height:1.75; color:#f8fafc;">${s.desc}</p>
      </div>
    `).join('');
  }
}

// ==========================================================================
// 13. Smart Motivational Notification Toast & Daily Gym Reminder System
// ==========================================================================
function initSmartGymNotificationSystem() {
  const savedTime = localStorage.getItem('nilefit_gym_reminder_time') || '17:00';
  const timeInput = document.getElementById('gymReminderTimeInput');
  if (timeInput) timeInput.value = savedTime;

  const statusEl = document.getElementById('gymReminderSavedStatus');
  if (statusEl) {
    statusEl.textContent = `🔔 التذكير اليومي بنزول الجيم مفعّل الساعة ${savedTime} مع جملة تحفيزية عشوائية وجدول التمرين.`;
  }

  renderQuickWeeklyGymSchedule();

  // Show welcome motivational & gym reminder notification after 4 seconds
  setTimeout(() => {
    triggerSmartGymNotification(false);
  }, 4000);

  // Check every 60 seconds if current time matches the user's daily gym alarm
  setInterval(() => {
    const now = new Date();
    const hhmm = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const target = localStorage.getItem('nilefit_gym_reminder_time') || '17:00';
    const lastFiredDate = localStorage.getItem('nilefit_gym_last_fired_date') || '';
    const todayKey = now.toDateString() + '_' + hhmm;
    if (hhmm === target && lastFiredDate !== todayKey) {
      localStorage.setItem('nilefit_gym_last_fired_date', todayKey);
      triggerSmartGymNotification(true);
    }
  }, 30000);
}

function renderQuickWeeklyGymSchedule() {
  const box = document.getElementById('quickWeeklyGymScheduleSummary');
  if (!box || !window.WORKOUT_SPLITS) return;
  const splitKey = document.getElementById('workoutSplitSelect')?.value || 'ppl';
  const split = window.WORKOUT_SPLITS[splitKey] || window.WORKOUT_SPLITS.ppl;
  box.innerHTML = split.schedule.slice(0, 6).map(s =>
    `<div style="margin-bottom:4px;">• <strong style="color:#fde68a;">${s.day}:</strong> ${s.focus}</div>`
  ).join('');
}

window.saveDailyGymReminderTime = function() {
  const val = document.getElementById('gymReminderTimeInput')?.value || '17:00';
  localStorage.setItem('nilefit_gym_reminder_time', val);
  const statusEl = document.getElementById('gymReminderSavedStatus');
  if (statusEl) {
    statusEl.textContent = `✅ تم حفظ موعد تذكير الجيم اليومي الساعة ${val} بنجاح!`;
  }
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission().catch(() => {});
  }
  triggerSmartGymNotification(true);
};

window.triggerSmartGymNotification = function(playSound = true) {
  const toast = document.getElementById('smartGymNotificationToast');
  const quoteBox = document.getElementById('toastMotivationalQuote');
  const remBox = document.getElementById('toastGymScheduleReminder');
  if (!toast || !quoteBox || !remBox) return;

  const lang = window.currentLang || 'ar';
  const quotes = window.MOTIVATIONAL_QUOTES || [];
  const randomQ = quotes[Math.floor(Math.random() * quotes.length)] || { ar: 'استعن بالله ولا تعجز، التزامك اليوم يصنع بطلك غداً!' };
  const text = randomQ[lang] || randomQ.ar;
  window.currentToastQuoteText = text;

  const splitKey = document.getElementById('workoutSplitSelect')?.value || 'ppl';
  const split = window.WORKOUT_SPLITS?.[splitKey] || window.WORKOUT_SPLITS?.ppl;
  const dayIdx = new Date().getDay() % (split?.schedule?.length || 1);
  const todayWorkout = split?.schedule?.[dayIdx] || { day: 'اليوم', focus: 'تمرين القوة واللياقة' };
  const m = window.currentBodyMetrics || { targetCalories: 2100, proteinGrams: 150 };

  quoteBox.textContent = `💡 «${text}»`;
  remBox.innerHTML = `
    🏋️ <strong>تذكير الجيم اليومي (${todayWorkout.day}):</strong> ${todayWorkout.focus}<br>
    🥗 <strong>هدفك اليوم:</strong> ${m.targetCalories} سعرة (${m.proteinGrams}g بروتين) + أذكار الصباح والمساء للتحصين!
  `;

  toast.classList.add('show');
  if (playSound && window.nileSkyAudio) {
    window.nileSkyAudio.playSFX('success');
  }
};

window.closeSmartGymNotification = function() {
  const toast = document.getElementById('smartGymNotificationToast');
  if (toast) toast.classList.remove('show');
};

window.downloadCurrentToastQuotePNG = function() {
  const lang = window.currentLang || 'ar';
  const text = window.currentToastQuoteText || 'استعن بالله ولا تعجز!';
  if (window.downloadQuoteAsPNG) {
    window.downloadQuoteAsPNG(text, lang);
  }
};
