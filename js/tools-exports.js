/* ==========================================================================
   NileFitPro - Interactive Simulators, Productivity Tools & Exporters
   Features:
   - Human Cartoon Before & After Rapid Body Transformation Video Simulator
   - Commitment Certificate Generator (1W, 1M, 3M, 6M, 9M, 12M, or Auto Days) + PNG
   - Single-Page Professional PDF & Motivational Infographic PNG Exporter
   - Adhkar & Ruqyah PDF / PNG / MP3 Downloaders
   - Healthy Sleep & Fajr Awakening Calculator + Pomodoro Deep Study Calculator
   ========================================================================== */

// ==========================================================================
// 1. Before & After Human Cartoon Rapid Transformation Video Simulator
// ==========================================================================
window.TransformationCartoonVideo = {
  frame: 0,
  isPlaying: true,
  speed: 0.45, // Default Slow-Motion (سلوموشن) for clear anatomical transformation
  speedLabel: '🐢 عرض سلوموشن (Slow-Motion)',
  manualProgress: null,
  animId: null,

  init() {
    const canvas = document.getElementById('transformCartoonCanvas');
    if (!canvas) return;
    const loop = () => {
      if (this.isPlaying && this.manualProgress === null) {
        this.frame += this.speed;
      }
      this.draw(canvas);
      this.animId = requestAnimationFrame(loop);
    };
    this.animId = requestAnimationFrame(loop);
  },

  setSpeedMode(mode) {
    this.manualProgress = null;
    this.isPlaying = true;
    if (mode === 'slowmo') {
      this.speed = 0.42;
      this.speedLabel = '🐢 عرض سلوموشن (Slow-Motion)';
    } else if (mode === 'normal') {
      this.speed = 1.1;
      this.speedLabel = '🎬 سرعة قياسية (1x)';
    } else {
      this.speed = 2.8;
      this.speedLabel = '⚡ تغير سريع فائق (2x)';
    }
    if (window.nileSkyAudio) window.nileSkyAudio.playSFX('click');
    return this.speedLabel;
  },

  toggleSpeed() {
    if (this.speed < 0.8) {
      return this.setSpeedMode('rapid');
    } else if (this.speed > 2.0) {
      return this.setSpeedMode('normal');
    } else {
      return this.setSpeedMode('slowmo');
    }
  },

  draw(canvas) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const metrics = window.currentBodyMetrics || window.calculateUserBodyMetrics({});

    // Progress p goes smoothly from 0 (Day 1 Before) to 1 (After Commitment Goal)
    const cycle = (this.frame % 420);
    const p = this.manualProgress !== null ? this.manualProgress : Math.min(1, cycle / 320);

    // Studio Gym / Stage Background Gradient
    const bg = ctx.createLinearGradient(0, 0, w, h);
    bg.addColorStop(0, '#090d16');
    bg.addColorStop(0.55, '#0f172a');
    bg.addColorStop(1, '#064e3b');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // Subtle Grid / Floor Reflection
    ctx.fillStyle = 'rgba(16, 185, 129, 0.08)';
    ctx.fillRect(0, h - 72, w, 72);

    // Top Header Banner
    ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
    ctx.fillRect(12, 10, w - 24, 46);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(12, 10, w - 24, 46);

    const startW = metrics.weightKg;
    const endW = metrics.idealWeight;
    const currentSimW = (startW + (endW - startW) * p).toFixed(1);
    const weekNum = Math.max(1, Math.round(p * 12));
    const startFatPct = metrics.gender === 'female' ? Math.min(38, Math.max(24, Math.round(metrics.bmi * 1.1))) : Math.min(32, Math.max(18, Math.round(metrics.bmi * 0.92)));
    const endFatPct = metrics.gender === 'female' ? 19 : 11;
    const curFatPct = (startFatPct + (endFatPct - startFatPct) * p).toFixed(1);

    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 13px Cairo, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(
      `🎬 ${this.speedLabel} (${metrics.targetCalories} kcal): الأسبوع ${weekNum}/12 | الوزن: ${currentSimW} كجم | الدهون: ${curFatPct}%`,
      w / 2,
      38
    );

    // Draw Left Side: "قبل الالتزام (Before)" Human Cartoon Character
    this.drawHumanCharacter(
      ctx,
      w * 0.23,
      h * 0.57,
      0,
      'قبل الالتزام (البداية)',
      `${startW} كجم | دهون ${startFatPct}%`,
      metrics.goal,
      metrics.gender
    );

    // Center Transformation Energy Bridge & Stats
    const pulse = 0.85 + Math.sin(this.frame * 0.12) * 0.15;
    ctx.save();
    ctx.fillStyle = 'rgba(16, 185, 129, 0.16)';
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(w * 0.41, h * 0.31, w * 0.18, 92, 10);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#34d399';
    ctx.font = `bold ${Math.round(13 * pulse + 2)}px Cairo, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText('⚡ التغير السريع ⚡', w * 0.5, h * 0.39);
    ctx.fillStyle = '#fde68a';
    ctx.font = 'bold 11.5px Cairo, sans-serif';
    ctx.fillText(`🔥 حرق + بناء عضل`, w * 0.5, h * 0.47);
    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 11px Cairo, sans-serif';
    ctx.fillText(`بروتين: ${metrics.proteinGrams}g/يوم`, w * 0.5, h * 0.54);
    ctx.fillStyle = '#38bdf8';
    ctx.fillText(`${Math.round(p * 100)}% إنجاز الهدف`, w * 0.5, h * 0.60);
    ctx.restore();

    // Draw Right Side: "بعد الالتزام (Live Morphing Human Character)"
    const stageLabel = p > 0.85 ? '🏆 بعد الالتزام (الجسم المثالي!)' : `💪 جاري التحول السريع (${Math.round(p * 100)}%)`;
    this.drawHumanCharacter(
      ctx,
      w * 0.77,
      h * 0.57,
      p,
      stageLabel,
      `${currentSimW} كجم | دهون ${curFatPct}%`,
      metrics.goal,
      metrics.gender
    );

    // Timeline Progress Bar at Bottom
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.fillRect(24, h - 22, w - 48, 9);
    const barGrad = ctx.createLinearGradient(24, 0, w - 24, 0);
    barGrad.addColorStop(0, '#f59e0b');
    barGrad.addColorStop(0.5, '#10b981');
    barGrad.addColorStop(1, '#38bdf8');
    ctx.fillStyle = barGrad;
    ctx.fillRect(24, h - 22, (w - 48) * p, 9);
  },

  drawHumanCharacter(ctx, cx, cy, morphP, label, weightLabel, goal, gender) {
    const isCut = goal === 'cut' || goal === 'recomp';
    // Glowing Aura as fitness increases
    if (morphP > 0.25) {
      const auraGrad = ctx.createRadialGradient(cx, cy - 10, 10, cx, cy - 10, 78);
      auraGrad.addColorStop(0, `rgba(16, 185, 129, ${morphP * 0.38})`);
      auraGrad.addColorStop(1, 'rgba(16, 185, 129, 0)');
      ctx.fillStyle = auraGrad;
      ctx.beginPath();
      ctx.arc(cx, cy - 10, 78, 0, Math.PI * 2);
      ctx.fill();
    }

    // Platform Pedestal
    ctx.fillStyle = morphP > 0.7 ? 'rgba(16, 185, 129, 0.4)' : 'rgba(148, 163, 184, 0.25)';
    ctx.beginPath();
    ctx.ellipse(cx, cy + 72, 64, 13, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = morphP > 0.7 ? '#fbbf24' : '#64748b';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Anatomical Human Proportions based on morphP
    // Before: wider belly/waist, narrower sloped shoulders; After: tight waist, broad athletic shoulders & chest
    const bellyCurve = isCut ? (42 - morphP * 22) : (23 + morphP * 4);
    const shoulderHalf = (gender === 'female' ? 25 : 29) + morphP * (gender === 'female' ? 8 : 15);
    const chestHalf = (gender === 'female' ? 22 : 25) + morphP * 11;
    const armThick = (gender === 'female' ? 8.5 : 10) + morphP * 5.5;
    const thighThick = 13 + (isCut ? -morphP * 1.5 + morphP * 3 : morphP * 4);

    const skinColor = '#f1c27d';
    const skinShadow = '#d69e5c';

    // 1. Human Legs (Quads, Knees, Calves & Sneakers)
    ctx.strokeStyle = skinColor;
    ctx.lineWidth = thighThick;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx - 14, cy + 14);
    ctx.lineTo(cx - 17, cy + 63);
    ctx.moveTo(cx + 14, cy + 14);
    ctx.lineTo(cx + 17, cy + 63);
    ctx.stroke();

    // Athletic Shorts
    ctx.fillStyle = morphP > 0.5 ? '#0f172a' : '#1e293b';
    ctx.beginPath();
    ctx.moveTo(cx - bellyCurve * 0.85, cy + 6);
    ctx.lineTo(cx + bellyCurve * 0.85, cy + 6);
    ctx.lineTo(cx + 24, cy + 36);
    ctx.lineTo(cx + 5, cy + 36);
    ctx.lineTo(cx, cy + 22);
    ctx.lineTo(cx - 5, cy + 36);
    ctx.lineTo(cx - 24, cy + 36);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Sneakers
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.ellipse(cx - 19, cy + 67, 11, 5, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 19, cy + 67, 11, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // 2. Neck & Trapezius
    ctx.fillStyle = skinShadow;
    ctx.beginPath();
    ctx.moveTo(cx - 8 - morphP * 4, cy - 56);
    ctx.lineTo(cx + 8 + morphP * 4, cy - 56);
    ctx.lineTo(cx + 7, cy - 68);
    ctx.lineTo(cx - 7, cy - 68);
    ctx.closePath();
    ctx.fill();

    // 3. Human Torso & Athletic Tank / Jersey
    const torsoGrad = ctx.createLinearGradient(cx - shoulderHalf, cy - 58, cx + shoulderHalf, cy + 10);
    torsoGrad.addColorStop(0, morphP > 0.55 ? '#059669' : '#2563eb');
    torsoGrad.addColorStop(1, morphP > 0.55 ? '#047857' : '#1d4ed8');
    ctx.fillStyle = torsoGrad;

    ctx.beginPath();
    ctx.moveTo(cx - shoulderHalf, cy - 56);
    ctx.lineTo(cx + shoulderHalf, cy - 56);
    ctx.quadraticCurveTo(cx + chestHalf, cy - 34, cx + bellyCurve, cy - 14);
    ctx.quadraticCurveTo(cx + bellyCurve * 0.95, cy + 2, cx + bellyCurve * 0.82, cy + 10);
    ctx.lineTo(cx - bellyCurve * 0.82, cy + 10);
    ctx.quadraticCurveTo(cx - bellyCurve * 0.95, cy + 2, cx - bellyCurve, cy - 14);
    ctx.quadraticCurveTo(cx - chestHalf, cy - 34, cx - shoulderHalf, cy - 56);
    ctx.closePath();
    ctx.fill();

    // Muscle Definition (Pectorals + Six-Pack Abs Contour Lines) when morphP > 0.35
    if (morphP > 0.35) {
      const alpha = Math.min(0.85, (morphP - 0.3) * 1.1);
      ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      // Pectorals
      ctx.moveTo(cx - 22, cy - 38);
      ctx.quadraticCurveTo(cx - 10, cy - 33, cx - 2, cy - 38);
      ctx.moveTo(cx + 22, cy - 38);
      ctx.quadraticCurveTo(cx + 10, cy - 33, cx + 2, cy - 38);
      // Center linea alba & abs
      ctx.moveTo(cx, cy - 36);
      ctx.lineTo(cx, cy + 2);
      ctx.moveTo(cx - 11, cy - 25);
      ctx.lineTo(cx + 11, cy - 25);
      ctx.moveTo(cx - 10, cy - 14);
      ctx.lineTo(cx + 10, cy - 14);
      ctx.stroke();
    }

    // 4. Human Arms, Deltoids, Biceps & Forearms (Transitioning from relaxed to athletic double-biceps flex!)
    const flexLift = morphP * 32;
    ctx.strokeStyle = skinColor;
    ctx.lineWidth = armThick;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Deltoid Caps
    ctx.fillStyle = skinColor;
    ctx.beginPath();
    ctx.arc(cx - shoulderHalf + 2, cy - 50, armThick * 0.68, 0, Math.PI * 2);
    ctx.arc(cx + shoulderHalf - 2, cy - 50, armThick * 0.68, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    // Left arm
    const lElbowX = cx - shoulderHalf - 16 - morphP * 6;
    const lElbowY = cy - 24 - flexLift * 0.65;
    const lHandX = cx - shoulderHalf - 10 - (1 - morphP) * 6;
    const lHandY = cy - 2 - flexLift * 1.45;
    ctx.moveTo(cx - shoulderHalf, cy - 50);
    ctx.lineTo(lElbowX, lElbowY);
    ctx.lineTo(lHandX, lHandY);

    // Right arm
    const rElbowX = cx + shoulderHalf + 16 + morphP * 6;
    const rElbowY = cy - 24 - flexLift * 0.65;
    const rHandX = cx + shoulderHalf + 10 + (1 - morphP) * 6;
    const rHandY = cy - 2 - flexLift * 1.45;
    ctx.moveTo(cx + shoulderHalf, cy - 50);
    ctx.lineTo(rElbowX, rElbowY);
    ctx.lineTo(rHandX, rHandY);
    ctx.stroke();

    // Bicep Peak Bulge when flexing
    if (morphP > 0.45) {
      ctx.fillStyle = skinColor;
      ctx.beginPath();
      ctx.arc((cx - shoulderHalf + lElbowX) / 2, lElbowY - 5, armThick * 0.58, 0, Math.PI * 2);
      ctx.arc((cx + shoulderHalf + rElbowX) / 2, rElbowY - 5, armThick * 0.58, 0, Math.PI * 2);
      ctx.fill();
    }

    // 5. Detailed Human Cartoon Head, Hair & Facial Expression
    const headY = cy - 82;
    const headRx = morphP < 0.3 && isCut ? 19.5 : 17.5; // Slimmer jawline as fat drops
    const headRy = 20;

    ctx.fillStyle = skinColor;
    ctx.beginPath();
    ctx.ellipse(cx, headY, headRx, headRy, 0, 0, Math.PI * 2);
    ctx.fill();

    // Hair / Headscarf
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.arc(cx, headY - 6, headRx + 1.5, Math.PI, Math.PI * 2);
    ctx.fill();

    // Eyebrows & Eyes
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(cx - 6.5, headY - 2, 2.4, 0, Math.PI * 2);
    ctx.arc(cx + 6.5, headY - 2, 2.4, 0, Math.PI * 2);
    ctx.fill();

    // Smile (grows from neutral to beaming confident smile)
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    if (morphP < 0.2) {
      ctx.moveTo(cx - 5, headY + 8);
      ctx.lineTo(cx + 5, headY + 8);
    } else {
      ctx.arc(cx, headY + 5, 5 + morphP * 3.5, 0.12 * Math.PI, 0.88 * Math.PI);
    }
    ctx.stroke();

    // Labels below character
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 13.5px Cairo, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(label, cx, cy + 94);
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 12.5px Cairo, sans-serif';
    ctx.fillText(weightLabel, cx, cy + 112);
  }
};

// ==========================================================================
// 2. Commitment Certificate Generator (Canvas + PNG Download)
// ==========================================================================
window.CertificateGenerator = {
  calculateAutoDays() {
    const startInput = document.getElementById('certStartDate');
    const endInput = document.getElementById('certEndDate');
    if (!startInput || !endInput || !startInput.value || !endInput.value) return null;
    const s = new Date(startInput.value);
    const e = new Date(endInput.value);
    const diffMs = e - s;
    const days = Math.max(1, Math.round(diffMs / (1000 * 60 * 60 * 24)));
    return {
      days,
      startStr: startInput.value,
      endStr: endInput.value
    };
  },

  renderCertificate() {
    const canvas = document.getElementById('certificateCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    const userName = (document.getElementById('certUserName')?.value || document.getElementById('userNameInput')?.value || 'بطل NileFitPro الملتزم').trim();
    const durationMode = document.getElementById('certDurationSelect')?.value || '1_week';
    const workoutSplitName = document.getElementById('workoutSplitSelect')?.selectedOptions?.[0]?.text || 'نظام بوش بول ليج (PPL)';
    const metrics = window.currentBodyMetrics || window.calculateUserBodyMetrics({});

    const durationMap = {
      '1_week': 'أسبوع كامل من الالتزام المتواصل (7 أيام)',
      '1_month': 'شهر كامل من الالتزام البطولي (30 يوماً)',
      '3_months': '3 شهور من التحول والانضباط (90 يوماً)',
      '6_months': '6 شهور من القوة والالتزام الاحترافي (180 يوماً)',
      '9_months': '9 شهور من التميز وأسلوب الحياة الصحي (270 يوماً)',
      '12_months': 'عام كامل (12 شهراً / 365 يوماً) من البطولة والالتزام'
    };

    let durationText = durationMap[durationMode] || durationMap['1_week'];
    if (durationMode === 'auto_dates') {
      const auto = this.calculateAutoDays();
      if (auto) {
        durationText = `${auto.days} يوماً من الالتزام المتواصل (من ${auto.startStr} إلى ${auto.endStr})`;
      } else {
        durationText = 'التزام متواصل محسوب بالتاريخ';
      }
    }

    // Luxury Royal Dark & Gold Background
    const bg = ctx.createLinearGradient(0, 0, w, h);
    bg.addColorStop(0, '#042f2e');
    bg.addColorStop(0.5, '#0f172a');
    bg.addColorStop(1, '#1e1b4b');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // Double Ornate Gold Frame
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 6;
    ctx.strokeRect(22, 22, w - 44, h - 44);
    ctx.strokeStyle = '#fde68a';
    ctx.lineWidth = 2;
    ctx.strokeRect(34, 34, w - 68, h - 68);

    // Corner Medallions
    [
      [34, 34], [w - 34, 34], [34, h - 34], [w - 34, h - 34]
    ].forEach(([cx, cy]) => {
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(cx, cy, 12, 0, Math.PI * 2);
      ctx.fill();
    });

    // Header Emblem & Title
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 34px Cairo, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🏆 شهادة تقدير والتزام احترافية — NileFitPro 🏆', w / 2, 105);

    ctx.fillStyle = '#a7f3d0';
    ctx.font = 'bold 18px Cairo, sans-serif';
    ctx.fillText('﴿ وَأَن لَّيْسَ لِلْإِنسَانِ إِلَّا مَا سَعَىٰ * وَأَنَّ سَعْيَهُ سَوْفَ يُرَىٰ ﴾', w / 2, 145);

    ctx.fillStyle = '#e2e8f0';
    ctx.font = '20px Cairo, sans-serif';
    ctx.fillText('تشهد منصة NileFitPro للتغذية الذكية والتمارين الميكانيكية بكل فخر واعتزاز بأن البطل:', w / 2, 198);

    // User Name Highlight Box
    ctx.fillStyle = 'rgba(245, 158, 11, 0.16)';
    ctx.fillRect(w * 0.18, 218, w * 0.64, 64);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.strokeRect(w * 0.18, 218, w * 0.64, 64);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px Cairo, sans-serif';
    ctx.fillText(userName, w / 2, 261);

    // Commitment Details
    ctx.fillStyle = '#fde68a';
    ctx.font = 'bold 21px Cairo, sans-serif';
    ctx.fillText(`قد أتمّ بنجاح التام: ${durationText}`, w / 2, 326);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = 'bold 18px Cairo, sans-serif';
    ctx.fillText(`🏋️ النظام التدريبي الملتزم به: ${workoutSplitName}`, w / 2, 368);
    ctx.fillText(
      `🥗 النظام الغذائي: ${metrics.goalLabel} (${metrics.targetCalories} سعرة | بروتين ${metrics.proteinGrams}g | كارب ${metrics.carbGrams}g | دهون صحية ${metrics.fatGrams}g)`,
      w / 2,
      405
    );

    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 18px Cairo, sans-serif';
    ctx.fillText('«استمر على هذا الطريق المبارك؛ فالقوة في الجسد والبركة في الفجر والأذكار تصنع المعجزات!»', w / 2, 452);

    // Golden Seal Badge at Bottom Center
    const sealX = w / 2;
    const sealY = 525;
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(sealX, sealY, 40, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 14px Cairo, sans-serif';
    ctx.fillText('معتمد 100%', sealX, sealY - 4);
    ctx.fillText('NileFitPro', sealX, sealY + 14);

    // Date & Signature
    const todayStr = new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 15px Cairo, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(`تاريخ الإصدار: ${todayStr}`, w - 60, h - 55);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText('إشراف وتصميم: محمد عوض خير & Gemini 4 Argon', 60, h - 55);
  },

  downloadPNG() {
    this.renderCertificate();
    const canvas = document.getElementById('certificateCanvas');
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `NileFitPro-Certificate-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    if (window.nileSkyAudio) window.nileSkyAudio.playSFX('success');
  }
};

// ==========================================================================
// 3. Motivational Quote PNG Downloader (Supports all 18 Languages)
// ==========================================================================
window.downloadQuoteAsPNG = function(quoteText, langCode = 'ar') {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 540;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, 1080, 540);
  grad.addColorStop(0, '#064e3b');
  grad.addColorStop(0.5, '#0f172a');
  grad.addColorStop(1, '#78350f');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1080, 540);

  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 5;
  ctx.strokeRect(24, 24, 1032, 492);

  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 28px Cairo, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('✨ NileFitPro — رسالة تحفيزية لك اليوم ✨', 540, 88);

  // Word-wrap quoteText
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 26px Cairo, sans-serif';
  const words = quoteText.split(' ');
  let lines = [];
  let currentLine = '';
  for (const w of words) {
    const test = currentLine ? `${currentLine} ${w}` : w;
    if (ctx.measureText(test).width > 900) {
      lines.push(currentLine);
      currentLine = w;
    } else {
      currentLine = test;
    }
  }
  if (currentLine) lines.push(currentLine);

  const startY = 240 - ((lines.length - 1) * 22);
  lines.forEach((line, i) => {
    ctx.fillText(line, 540, startY + i * 46);
  });

  ctx.fillStyle = '#a7f3d0';
  ctx.font = 'bold 18px Cairo, sans-serif';
  ctx.fillText('NileFitPro | زيت زيتون مزارع سيناء البكر 100% | دليلك للصحة والقوة والبركة', 540, 475);

  const link = document.createElement('a');
  link.download = `NileFitPro-Quote-${langCode}-${Date.now()}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
  if (window.nileSkyAudio) window.nileSkyAudio.playSFX('success');
};

// ==========================================================================
// 4. Adhkar & Ruqyah Exporters (PNG, PDF One-Page, & MP3 Download)
// ==========================================================================
window.exportIslamicContent = function(type, format) {
  const isAdhkar = type === 'adhkar';
  const title = isAdhkar
    ? 'أذكار الصباح والمساء الكاملة — للتحصين والبركة أثناء التمرين واليوم'
    : 'الرقية الشرعية الكاملة من القرآن الكريم والسنة النبوية الشريفة';

  const items = isAdhkar
    ? [...window.ADHKAR_DATA.morning, ...window.ADHKAR_DATA.evening]
    : window.RUQYAH_ITEMS;

  if (format === 'mp3') {
    const mp3Url = isAdhkar
      ? 'https://archive.org/download/AzkarAlSabahWalMasaaMisharyAlafasy/Azkar_Al_Sabah_Mishary_Alafasy.mp3'
      : 'https://server8.mp3quran.net/afs/001.mp3';
    const a = document.createElement('a');
    a.href = mp3Url;
    a.target = '_blank';
    a.download = isAdhkar ? 'Adhkar_Mishary_Alafasy.mp3' : 'Ruqyah_Mishary_Alafasy.mp3';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    return;
  }

  if (format === 'png') {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 1650;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createLinearGradient(0, 0, 0, 1650);
    grad.addColorStop(0, '#022c22');
    grad.addColorStop(1, '#0f172a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1200, 1650);

    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 6;
    ctx.strokeRect(20, 20, 1160, 1610);

    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 30px Cairo, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`🛡️ ${title} 🛡️`, 600, 78);

    let y = 135;
    items.forEach((item, idx) => {
      ctx.fillStyle = '#34d399';
      ctx.font = 'bold 20px Cairo, sans-serif';
      ctx.fillText(`${idx + 1}. ${item.title} ${item.count ? `(التكرار: ${item.count})` : ''}`, 600, y);
      y += 32;

      ctx.fillStyle = '#f8fafc';
      ctx.font = '17.5px Cairo, sans-serif';
      const words = item.text.split(' ');
      let line = '';
      for (const w of words) {
        const test = line ? `${line} ${w}` : w;
        if (ctx.measureText(test).width > 1060) {
          ctx.fillText(line, 600, y);
          y += 26;
          line = w;
        } else {
          line = test;
        }
      }
      if (line) {
        ctx.fillText(line, 600, y);
        y += 34;
      }
    });

    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 18px Cairo, sans-serif';
    ctx.fillText('NileFitPro — تحصين المسلم وصحة الجسد والروح | محمد عوض خير (01011805464)', 600, 1600);

    const link = document.createElement('a');
    link.download = `NileFitPro-${type}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    return;
  }

  if (format === 'pdf') {
    const win = window.open('', '_blank');
    if (!win) return;
    const rowsHtml = items.map((it, idx) => `
      <div style="border:1px solid #d97706; border-radius:10px; padding:10px; margin-bottom:8px; background:#fffbeb;">
        <h3 style="margin:0 0 4px; color:#065f46; font-size:15px;">${idx + 1}. ${it.title} ${it.count ? `<span style="color:#b45309;">(${it.count} مرات)</span>` : ''}</h3>
        <p style="margin:0; font-size:13.5px; line-height:1.65; color:#0f172a;">${it.text}</p>
        ${it.virtue ? `<p style="margin:4px 0 0; font-size:11.5px; color:#047857;"><strong>الفضل:</strong> ${it.virtue}</p>` : ''}
      </div>
    `).join('');

    const imgsHtml = isAdhkar ? `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:12px;">
        <div style="text-align:center;">
          <strong style="display:block; margin-bottom:4px; color:#065f46;">🌅 بطاقة أذكار الصباح المرفقة</strong>
          <img src="assets/images/adhkar_morning.jpg" style="max-width:100%; height:auto; max-height:360px; border-radius:8px; border:2px solid #10b981;" />
        </div>
        <div style="text-align:center;">
          <strong style="display:block; margin-bottom:4px; color:#065f46;">🌆 بطاقة أذكار المساء المرفقة</strong>
          <img src="assets/images/adhkar_evening.jpg" style="max-width:100%; height:auto; max-height:360px; border-radius:8px; border:2px solid #d97706;" />
        </div>
      </div>
    ` : '';

    win.document.write(`
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <title>${title} - NileFitPro</title>
        <style>
          @page { size: A4; margin: 10mm; }
          body { font-family: 'Cairo', 'Segoe UI', Tahoma, sans-serif; direction: rtl; color: #0f172a; margin: 0; padding: 12px; }
          .header { text-align: center; border-bottom: 3px solid #10b981; padding-bottom: 8px; margin-bottom: 12px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 style="margin:0; color:#065f46; font-size:21px;">${title}</h1>
          <p style="margin:4px 0 0; font-size:13px; color:#475569;">منصة NileFitPro — احفظها بصيغة PDF أو اطبعها</p>
        </div>
        ${imgsHtml}
        ${rowsHtml}
        <footer style="text-align:center; font-size:12px; margin-top:10px; color:#64748b;">
          تم بحمد الله وتوفيقه برمجة وتصميم هذا الموقع بواسطة Gemini 4 Argon وبمساعدة محمد عوض خير | للتواصل: 01011805464
        </footer>
        <script>setTimeout(() => { window.print(); }, 550);<\/script>
      </body>
      </html>
    `);
    win.document.close();
  }
};

// Direct Downloader for the Uploaded Morning & Evening Adhkar Infographic Images (PNG or PDF)
window.downloadUploadedAdhkarImage = function(period = 'morning', format = 'png') {
  const isMorning = period === 'morning';
  const imgUrl = isMorning ? 'assets/images/adhkar_morning.jpg' : 'assets/images/adhkar_evening.jpg';
  const titleAr = isMorning ? 'أذكار الصباح — حصن المسلم في بداية يومه' : 'أذكار المساء — بعد صلاة العصر فهي حصنك المنيع';

  if (format === 'png') {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function() {
      const c = document.createElement('canvas');
      c.width = img.naturalWidth || 1000;
      c.height = img.naturalHeight || 1400;
      const ctx = c.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const a = document.createElement('a');
      a.download = `NileFitPro_Adhkar_${period}.png`;
      a.href = c.toDataURL('image/png');
      a.click();
    };
    img.onerror = function() {
      const a = document.createElement('a');
      a.href = imgUrl;
      a.download = `NileFitPro_Adhkar_${period}.jpg`;
      a.click();
    };
    img.src = imgUrl;
    if (window.nileSkyAudio) window.nileSkyAudio.playSFX('success');
    return;
  }

  if (format === 'pdf') {
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(`
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <title>${titleAr} - NileFitPro</title>
        <style>
          @page { size: A4; margin: 8mm; }
          body { font-family: 'Cairo', Tahoma, sans-serif; direction: rtl; text-align: center; margin: 0; padding: 8px; }
          img { max-width: 100%; max-height: 86vh; object-fit: contain; border-radius: 10px; border: 2px solid #059669; }
        </style>
      </head>
      <body>
        <h2 style="margin:0 0 8px; color:#065f46;">🛡️ ${titleAr} — NileFitPro</h2>
        <img src="${imgUrl}" alt="${titleAr}" onload="setTimeout(() => window.print(), 350)" />
        <p style="font-size:11px; color:#475569; margin-top:6px;">تم بحمد الله وتوفيقه برمجة وتصميم هذا الموقع بواسطة Gemini 4 Argon وبمساعدة محمد عوض خير (01011805464)</p>
      </body>
      </html>
    `);
    win.document.close();
  }
};

// ==========================================================================
// 5. Full User Data One-Page Professional PDF & Infographic PNG Exporter
// ==========================================================================
window.exportFullPlanInfographicOrPDF = function(mode = 'pdf') {
  const m = window.currentBodyMetrics || window.calculateUserBodyMetrics({});
  const rawUserName = (document.getElementById('userNameInput')?.value || 'بطل NileFitPro').trim();
  const userName = window.escapeHtml ? window.escapeHtml(rawUserName) : rawUserName;
  const splitKey = document.getElementById('workoutSplitSelect')?.value || 'ppl';
  const splitObj = window.WORKOUT_SPLITS[splitKey] || window.WORKOUT_SPLITS.ppl;

  const bMeal = window.generateMealByIndex(0, Math.round(m.targetCalories * 0.28));
  const lMeal = window.generateMealByIndex(6, Math.round(m.targetCalories * 0.42));
  const dMeal = window.generateMealByIndex(3, Math.round(m.targetCalories * 0.30));

  if (mode === 'infographic') {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 1600;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createLinearGradient(0, 0, 1200, 1600);
    grad.addColorStop(0, '#0f172a');
    grad.addColorStop(0.5, '#064e3b');
    grad.addColorStop(1, '#1e1b4b');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1200, 1600);

    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 6;
    ctx.strokeRect(24, 24, 1152, 1552);

    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 36px Cairo, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`📊 إنفوجرافيك الخطة الشاملة — ${rawUserName} (NileFitPro)`, 600, 88);

    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 22px Cairo, sans-serif';
    ctx.fillText(`الوزن الحالي: ${m.weightKg} كجم | الطول: ${m.heightCm} سم | الوزن المثالي الصحي: ${m.idealWeight} كجم (${m.minHealthyWeight}-${m.maxHealthyWeight} كجم)`, 600, 140);

    // Macro Boxes
    const stats = [
      { label: 'السعرات اليومية', val: `${m.targetCalories} kcal`, col: '#f59e0b' },
      { label: 'البروتين اليومي', val: `${m.proteinGrams} جم`, col: '#10b981' },
      { label: 'الكربوهيدرات', val: `${m.carbGrams} جم`, col: '#38bdf8' },
      { label: 'الدهون الصحية', val: `${m.fatGrams} جم`, col: '#f43f5e' }
    ];
    stats.forEach((st, i) => {
      const bx = 70 + i * 270;
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.fillRect(bx, 180, 245, 120);
      ctx.strokeStyle = st.col;
      ctx.lineWidth = 3;
      ctx.strokeRect(bx, 180, 245, 120);
      ctx.fillStyle = st.col;
      ctx.font = 'bold 28px Cairo, sans-serif';
      ctx.fillText(st.val, bx + 122, 235);
      ctx.fillStyle = '#cbd5e1';
      ctx.font = 'bold 18px Cairo, sans-serif';
      ctx.fillText(st.label, bx + 122, 275);
    });

    // Meals Section
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 26px Cairo, sans-serif';
    ctx.fillText('🥗 نموذج الوجبات اليومية المحسوبة بالجرامات وزيت زيتون مزارع سيناء:', 600, 365);

    [
      { name: 'وجبة الإفطار', meal: bMeal },
      { name: 'وجبة الغداء', meal: lMeal },
      { name: 'وجبة العشاء', meal: dMeal }
    ].forEach((row, idx) => {
      const ry = 395 + idx * 145;
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fillRect(70, ry, 1060, 125);
      ctx.fillStyle = '#34d399';
      ctx.font = 'bold 22px Cairo, sans-serif';
      ctx.fillText(`${row.name}: ${row.meal.title} (${row.meal.calories} سعرة)`, 600, ry + 38);
      ctx.fillStyle = '#ffffff';
      ctx.font = '18px Cairo, sans-serif';
      ctx.fillText(
        `${row.meal.proteinItem.grams}g ${row.meal.proteinItem.name} + ${row.meal.carbItem.grams}g ${row.meal.carbItem.name} + ${row.meal.veggieItem.grams}g خضار + ${row.meal.fatItem.grams}g ${row.meal.fatItem.name}`,
        600,
        ry + 78
      );
      ctx.fillStyle = '#fde68a';
      ctx.font = 'bold 16px Cairo, sans-serif';
      ctx.fillText(`بروتين: ${row.meal.protein}g | كارب: ${row.meal.carbs}g | دهون: ${row.meal.fats}g | ألياف: ${row.meal.fiber}g`, 600, ry + 108);
    });

    // Workout Split Section
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 26px Cairo, sans-serif';
    ctx.fillText(`🏋️ جدول التمارين المختار: ${splitObj.name}`, 600, 885);

    splitObj.schedule.forEach((s, idx) => {
      const sy = 915 + idx * 72;
      ctx.fillStyle = 'rgba(15, 23, 42, 0.78)';
      ctx.fillRect(90, sy, 1020, 58);
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 19px Cairo, sans-serif';
      ctx.fillText(`${s.day} — ${s.focus}`, 600, sy + 36);
    });

    // Footer
    ctx.fillStyle = '#fde68a';
    ctx.font = 'bold 19px Cairo, sans-serif';
    ctx.fillText('تم بحمد الله وتوفيقه برمجة وتصميم هذا الموقع بواسطة Gemini 4 Argon وبمساعدة محمد عوض خير', 600, 1495);
    ctx.fillStyle = '#34d399';
    ctx.fillText('زيت زيتون مزارع سيناء طبيعي بكر 100% | للتواصل واتساب وتليفون: 01011805464', 600, 1532);

    const link = document.createElement('a');
    link.download = `NileFitPro-Infographic-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    if (window.nileSkyAudio) window.nileSkyAudio.playSFX('success');
    return;
  }

  // Single-Page Printable PDF
  const win = window.open('', '_blank');
  if (!win) return;
  const scheduleRows = splitObj.schedule.map(s => `
    <tr>
      <td style="padding:6px 10px; border:1px solid #cbd5e1; font-weight:bold;">${s.day}</td>
      <td style="padding:6px 10px; border:1px solid #cbd5e1;">${s.focus}</td>
    </tr>
  `).join('');

  win.document.write(`
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="UTF-8">
      <title>خطة NileFitPro الكاملة - ${userName}</title>
      <style>
        @page { size: A4; margin: 8mm; }
        body { font-family: 'Cairo', 'Segoe UI', Tahoma, sans-serif; direction: rtl; color: #0f172a; margin: 0; font-size: 12px; }
        .page-box { border: 3px solid #059669; border-radius: 12px; padding: 14px; }
        .grid4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin: 10px 0; }
        .kpi { background: #f0fdf4; border: 1px solid #10b981; border-radius: 8px; padding: 8px; text-align: center; }
        .kpi strong { display: block; font-size: 16px; color: #047857; }
        table { width: 100%; border-collapse: collapse; margin-top: 6px; }
      </style>
    </head>
    <body>
      <div class="page-box">
        <div style="text-align:center; border-bottom:2px solid #f59e0b; padding-bottom:8px;">
          <h1 style="margin:0; color:#065f46; font-size:20px;">NileFitPro — التقرير الشامل للتغذية والتمارين والوزن المثالي (صفحة واحدة)</h1>
          <p style="margin:4px 0 0; color:#475569;">الاسم: <strong>${userName}</strong> | الهدف: <strong>${m.goalLabel}</strong> | الطول: ${m.heightCm} سم | الوزن: ${m.weightKg} كجم | الوزن المثالي الصحي: <strong>${m.idealWeight} كجم (${m.minHealthyWeight}-${m.maxHealthyWeight} كجم)</strong></p>
        </div>

        <div class="grid4">
          <div class="kpi"><span>السعرات المستهدفة</span><strong>${m.targetCalories} سعرة</strong></div>
          <div class="kpi"><span>البروتين اليومي</span><strong>${m.proteinGrams} جرام</strong></div>
          <div class="kpi"><span>الكربوهيدرات</span><strong>${m.carbGrams} جرام</strong></div>
          <div class="kpi"><span>الدهون الصحية والماء</span><strong>${m.fatGrams} جم / ${m.waterLiters} لتر</strong></div>
        </div>

        <h3 style="margin:10px 0 4px; color:#b45309;">🥗 جدول الوجبات اليومي المحسوب بالجرامات (مع زيت زيتون مزارع سيناء البكر / السمنة البلدي):</h3>
        <table>
          <thead>
            <tr style="background:#fef3c7;">
              <th style="padding:6px; border:1px solid #cbd5e1;">الوجبة</th>
              <th style="padding:6px; border:1px solid #cbd5e1;">المكونات الدقيقة بالجرامات</th>
              <th style="padding:6px; border:1px solid #cbd5e1;">السعرات والماكروز</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:6px; border:1px solid #cbd5e1; font-weight:bold;">الإفطار</td>
              <td style="padding:6px; border:1px solid #cbd5e1;">${bMeal.proteinItem.grams}g ${bMeal.proteinItem.name} + ${bMeal.carbItem.grams}g ${bMeal.carbItem.name} + ${bMeal.veggieItem.grams}g ${bMeal.veggieItem.name} + ${bMeal.fatItem.grams}g ${bMeal.fatItem.name}</td>
              <td style="padding:6px; border:1px solid #cbd5e1;">${bMeal.calories} kcal (P:${bMeal.protein}g C:${bMeal.carbs}g F:${bMeal.fats}g)</td>
            </tr>
            <tr>
              <td style="padding:6px; border:1px solid #cbd5e1; font-weight:bold;">الغداء</td>
              <td style="padding:6px; border:1px solid #cbd5e1;">${lMeal.proteinItem.grams}g ${lMeal.proteinItem.name} + ${lMeal.carbItem.grams}g ${lMeal.carbItem.name} + ${lMeal.veggieItem.grams}g ${lMeal.veggieItem.name} + ${lMeal.fatItem.grams}g ${lMeal.fatItem.name}</td>
              <td style="padding:6px; border:1px solid #cbd5e1;">${lMeal.calories} kcal (P:${lMeal.protein}g C:${lMeal.carbs}g F:${lMeal.fats}g)</td>
            </tr>
            <tr>
              <td style="padding:6px; border:1px solid #cbd5e1; font-weight:bold;">العشاء</td>
              <td style="padding:6px; border:1px solid #cbd5e1;">${dMeal.proteinItem.grams}g ${dMeal.proteinItem.name} + ${dMeal.carbItem.grams}g ${dMeal.carbItem.name} + ${dMeal.veggieItem.grams}g ${dMeal.veggieItem.name} + ${dMeal.fatItem.grams}g ${dMeal.fatItem.name}</td>
              <td style="padding:6px; border:1px solid #cbd5e1;">${dMeal.calories} kcal (P:${dMeal.protein}g C:${dMeal.carbs}g F:${dMeal.fats}g)</td>
            </tr>
          </tbody>
        </table>

        <h3 style="margin:10px 0 4px; color:#047857;">🏋️ نظام التمارين المعتمد: ${splitObj.name}</h3>
        <table>
          <tbody>${scheduleRows}</tbody>
        </table>

        <div style="margin-top:12px; padding:8px; background:#ecfdf5; border:1px solid #10b981; border-radius:8px; text-align:center;">
          <strong>🌿 زيت زيتون مزارع سيناء — طبيعي بكر 100% (عصرة أولى على البارد، حموضة أقل من 0.2%، غني بفيتامينات A & E)</strong><br>
          تم بحمد الله وتوفيقه برمجة وتصميم هذا الموقع بواسطة Gemini 4 Argon وبمساعدة محمد عوض خير | للتواصل: 01011805464
        </div>
      </div>
      <script>setTimeout(() => { window.print(); }, 400);<\/script>
    </body>
    </html>
  `);
  win.document.close();
};
