// NileFitPro — Qiyam Al-Layl, Healthy Fajr Sleep, Pomodoro Deep Study, Before/After Visualizer, Certificates & 1-Page PDF / Infographic Exporter

(function () {
  function fmtMinutesToAmPm(totalMin) {
    const norm = ((Math.round(totalMin) % 1440) + 1440) % 1440;
    const h24 = Math.floor(norm / 60);
    const m = norm % 60;
    const ampm = h24 >= 12 ? 'PM' : 'AM';
    const h12 = h24 % 12 || 12;
    return `${String(h12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${ampm}`;
  }

  function parseHHMM(val, fallbackMin) {
    if (!val || !val.includes(':')) return fallbackMin;
    const [h, m] = val.split(':').map(Number);
    return (h * 60) + (m || 0);
  }

  // ==================== 1. QIYAM AL-LAYL & LAST THIRD CALCULATOR ====================
  function calculateQiyamTimes(maghribStr = '18:05', fajrStr = '04:45') {
    const magMin = parseHHMM(maghribStr, 18 * 60 + 5);
    let fajrMin = parseHHMM(fajrStr, 4 * 60 + 45);
    if (fajrMin <= magMin) fajrMin += 1440; // Next dawn

    const nightDuration = fajrMin - magMin;
    const third = nightDuration / 3;
    const midnight = magMin + nightDuration / 2;
    const firstThirdEnd = magMin + third;
    const lastThirdStart = fajrMin - third;

    const hrs = Math.floor(nightDuration / 60);
    const mins = Math.round(nightDuration % 60);

    return {
      nightLengthLabel: `${hrs} ساعة و ${mins} دقيقة`,
      maghribAmPm: fmtMinutesToAmPm(magMin),
      fajrAmPm: fmtMinutesToAmPm(fajrMin),
      midnightAmPm: fmtMinutesToAmPm(midnight),
      firstThirdAmPm: `${fmtMinutesToAmPm(magMin)} — ${fmtMinutesToAmPm(firstThirdEnd)}`,
      secondThirdAmPm: `${fmtMinutesToAmPm(firstThirdEnd)} — ${fmtMinutesToAmPm(lastThirdStart)}`,
      lastThirdStartAmPm: fmtMinutesToAmPm(lastThirdStart),
      lastThirdEndAmPm: fmtMinutesToAmPm(fajrMin)
    };
  }

  // ==================== 2. HEALTHY SLEEP & EARLY FAJR AWAKENING CALCULATOR ====================
  function calculateHealthySleep(timeStr = '04:30', mode = 'wake') {
    const baseMin = parseHHMM(timeStr, mode === 'bed' ? 21 * 60 : 4 * 60 + 30);
    const fallAsleepBuffer = 14; // Average 14 minutes to fall asleep
    if (mode === 'bed') {
      return {
        mode: 'bed',
        refAmPm: fmtMinutesToAmPm(baseMin),
        cycles6: {
          time: fmtMinutesToAmPm(baseMin + fallAsleepBuffer + (6 * 90)),
          hours: '9 ساعات (6 دورات نوم كاملة — استشفاء رياضي عميق)'
        },
        cycles5: {
          time: fmtMinutesToAmPm(baseMin + fallAsleepBuffer + (5 * 90)),
          hours: '7.5 ساعات (5 دورات نوم مثالية — الأفضل علمياً للنشاط والفجر)'
        },
        cycles4: {
          time: fmtMinutesToAmPm(baseMin + fallAsleepBuffer + (4 * 90)),
          hours: '6 ساعات (4 دورات نوم + قيلولة نهارية 20 دقيقة بعد الظهر)'
        },
        wakeAmPm: fmtMinutesToAmPm(baseMin + fallAsleepBuffer + (5 * 90)),
        bedtime5: fmtMinutesToAmPm(baseMin)
      };
    }
    return {
      mode: 'wake',
      refAmPm: fmtMinutesToAmPm(baseMin),
      wakeAmPm: fmtMinutesToAmPm(baseMin),
      bedtime5: fmtMinutesToAmPm(baseMin - (5 * 90) - fallAsleepBuffer),
      cycles6: {
        time: fmtMinutesToAmPm(baseMin - (6 * 90) - fallAsleepBuffer),
        bedtime: fmtMinutesToAmPm(baseMin - (6 * 90) - fallAsleepBuffer),
        hours: '9 ساعات (6 دورات نوم كاملة — استشفاء رياضي عميق)'
      },
      cycles5: {
        time: fmtMinutesToAmPm(baseMin - (5 * 90) - fallAsleepBuffer),
        bedtime: fmtMinutesToAmPm(baseMin - (5 * 90) - fallAsleepBuffer),
        hours: '7.5 ساعات (5 دورات نوم مثالية — الأفضل علمياً للنشاط والفجر)'
      },
      cycles4: {
        time: fmtMinutesToAmPm(baseMin - (4 * 90) - fallAsleepBuffer),
        bedtime: fmtMinutesToAmPm(baseMin - (4 * 90) - fallAsleepBuffer),
        hours: '6 ساعات (4 دورات نوم + قيلولة نهارية 20 دقيقة بعد الظهر)'
      }
    };
  }

  // ==================== 3. POMODORO DEEP STUDY PLANNER ====================
  function calculatePomodoroPlan(totalHours = 3, focusMin = 25, breakMin = 5) {
    const totalStudyMin = Math.max(25, Number(totalHours) * 60);
    const fMin = Math.max(10, Number(focusMin) || 25);
    const bMin = Math.max(3, Number(breakMin) || 5);
    const sessions = Math.ceil(totalStudyMin / fMin);
    const longBreaks = Math.floor((sessions - 1) / 4);
    const shortBreaks = Math.max(0, (sessions - 1) - longBreaks);
    const totalElapsedMin = sessions * fMin + shortBreaks * bMin + longBreaks * 15;
    const now = new Date();
    const nowMin = now.getHours() * 60 + now.getMinutes();

    return {
      sessions,
      focusMin: fMin,
      breakMin: bMin,
      totalElapsedLabel: `${Math.floor(totalElapsedMin / 60)} ساعة و ${totalElapsedMin % 60} دقيقة`,
      expectedFinishAmPm: fmtMinutesToAmPm(nowMin + totalElapsedMin)
    };
  }

  // ==================== 4. MOTIVATIONAL QUOTE PNG EXPORTER ====================
  function downloadMotivationPng(quoteText, langCode = 'ar', sectionLabel = 'NileFitPro') {
    const c = document.createElement('canvas');
    c.width = 1080;
    c.height = 620;
    const ctx = c.getContext('2d');

    const bg = ctx.createLinearGradient(0, 0, c.width, c.height);
    bg.addColorStop(0, '#042f2e');
    bg.addColorStop(0.55, '#0f172a');
    bg.addColorStop(1, '#422006');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 5;
    ctx.strokeRect(28, 28, c.width - 56, c.height - 56);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#6ee7b7';
    ctx.font = 'bold 26px Cairo, Inter, sans-serif';
    ctx.fillText(`✨ NileFitPro — ${sectionLabel} ✨`, c.width / 2, 105);

    // Wrap quote text centered
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px Cairo, Inter, sans-serif';
    const words = quoteText.split(' ');
    const lines = [];
    let cur = '';
    for (const w of words) {
      const test = cur ? `${cur} ${w}` : w;
      if (ctx.measureText(test).width > c.width - 170 && cur) {
        lines.push(cur);
        cur = w;
      } else {
        cur = test;
      }
    }
    if (cur) lines.push(cur);

    let y = (c.height / 2) - ((lines.length - 1) * 28);
    for (const l of lines) {
      ctx.fillText(`« ${l} »`, c.width / 2, y);
      y += 58;
    }

    ctx.fillStyle = '#fde68a';
    ctx.font = 'bold 20px Cairo, Inter, sans-serif';
    ctx.fillText(`NileFitPro • اللغات الـ 18 • (${langCode.toUpperCase()})`, c.width / 2, c.height - 65);

    const a = document.createElement('a');
    a.href = c.toDataURL('image/png');
    a.download = `NileFitPro-Quote-${langCode}.png`;
    a.click();
  }

  // ==================== 5. BEFORE & AFTER EXPECTED PHYSIQUE VISUALIZER ====================
  function drawBodySilhouette(ctx, cx, topY, gender, bmiFactor, muscleTone, isAfter) {
    // bmiFactor: 0 (very lean) .. 1 (heavy waist); muscleTone: 0 .. 1
    const accent = isAfter ? '#10b981' : '#94a3b8';
    const glow = isAfter ? 'rgba(16, 185, 129, 0.25)' : 'rgba(148, 163, 184, 0.12)';

    const rad = ctx.createRadialGradient(cx, topY + 135, 15, cx, topY + 135, 130);
    rad.addColorStop(0, glow);
    rad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = rad;
    ctx.beginPath(); ctx.arc(cx, topY + 135, 130, 0, Math.PI * 2); ctx.fill();

    const isMale = gender !== 'female';
    const shoulderHalf = isMale ? (38 + muscleTone * 14) : (31 + muscleTone * 7);
    const chestHalf = isMale ? (33 + muscleTone * 10 + bmiFactor * 12) : (30 + muscleTone * 5 + bmiFactor * 10);
    const waistHalf = (isMale ? 24 : 20) + bmiFactor * 28 - muscleTone * 4;
    const hipHalf = (isMale ? 27 : 33) + bmiFactor * 20;
    const armThick = (isMale ? 9 : 7.5) + muscleTone * 4.5 + bmiFactor * 3;
    const thighThick = 13 + muscleTone * 4.5 + bmiFactor * 6;

    // Head
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.arc(cx, topY + 22, 18, 0, Math.PI * 2);
    ctx.fill();
    // Neck
    ctx.fillRect(cx - 7, topY + 38, 14, 14);

    // Sculpted Torso Bezier Silhouette
    ctx.beginPath();
    ctx.moveTo(cx - shoulderHalf, topY + 55);
    ctx.quadraticCurveTo(cx, topY + 46, cx + shoulderHalf, topY + 55);
    ctx.bezierCurveTo(cx + chestHalf + 4, topY + 88, cx + waistHalf, topY + 118, cx + hipHalf, topY + 150);
    ctx.lineTo(cx - hipHalf, topY + 150);
    ctx.bezierCurveTo(cx - waistHalf, topY + 118, cx - chestHalf - 4, topY + 88, cx - shoulderHalf, topY + 55);
    ctx.closePath();
    ctx.fill();

    // Arms
    ctx.strokeStyle = accent;
    ctx.lineCap = 'round';
    ctx.lineWidth = armThick * 1.45;
    ctx.beginPath();
    ctx.moveTo(cx - shoulderHalf + 2, topY + 58);
    ctx.quadraticCurveTo(cx - shoulderHalf - 14, topY + 102, cx - shoulderHalf - 8, topY + 148);
    ctx.moveTo(cx + shoulderHalf - 2, topY + 58);
    ctx.quadraticCurveTo(cx + shoulderHalf + 14, topY + 102, cx + shoulderHalf + 8, topY + 148);
    ctx.stroke();

    // Legs
    ctx.lineWidth = thighThick * 1.45;
    ctx.beginPath();
    ctx.moveTo(cx - hipHalf * 0.52, topY + 150);
    ctx.lineTo(cx - hipHalf * 0.56, topY + 258);
    ctx.moveTo(cx + hipHalf * 0.52, topY + 150);
    ctx.lineTo(cx + hipHalf * 0.56, topY + 258);
    ctx.stroke();

    // Athletic abdominal/chest definition lines when toned ("After")
    if (isAfter) {
      ctx.strokeStyle = 'rgba(2, 6, 23, 0.45)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx - chestHalf * 0.7, topY + 82);
      ctx.quadraticCurveTo(cx, topY + 88, cx + chestHalf * 0.7, topY + 82);
      ctx.moveTo(cx, topY + 86);
      ctx.lineTo(cx, topY + 136);
      ctx.stroke();
    }
  }

  function renderTransformationCanvas(canvas, metrics, daysCommitted = 90, splitName = '') {
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    const bg = ctx.createLinearGradient(0, 0, w, h);
    bg.addColorStop(0, '#091122');
    bg.addColorStop(1, '#042f2e');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // Expected physiological change over daysCommitted
    const dailyDiff = metrics.targetCalories - metrics.tdee; // negative on cut, positive on bulk
    const rawKgChange = (dailyDiff * daysCommitted) / 7700;
    let projectedWeight = +(metrics.weight + rawKgChange).toFixed(1);
    if (metrics.goal === 'cut') {
      projectedWeight = Math.max(metrics.healthyMin, Math.max(metrics.goalWeight, projectedWeight));
    } else if (metrics.goal === 'bulk') {
      projectedWeight = Math.min(metrics.weight + (daysCommitted / 30) * 1.6, Math.min(metrics.goalWeight, projectedWeight));
    } else {
      projectedWeight = +((metrics.weight * 0.6 + metrics.idealWeight * 0.4)).toFixed(1);
    }

    const hM = metrics.height / 100;
    const afterBmi = +(projectedWeight / (hM * hM)).toFixed(1);
    const beforeFatFactor = Math.max(0.05, Math.min(1, (metrics.bmi - 19) / 16));
    const afterFatFactor = Math.max(0.04, Math.min(0.85, (afterBmi - 19) / 16));
    const beforeMuscle = metrics.level === 'advanced' ? 0.55 : metrics.level === 'intermediate' ? 0.35 : 0.18;
    const afterMuscle = Math.min(1, beforeMuscle + Math.min(0.5, (daysCommitted / 180) * 0.45));

    // Title
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fde68a';
    ctx.font = 'bold 20px Cairo, sans-serif';
    ctx.fillText(`🔥 الشكل المتوقع قبل وبعد الالتزام لمدة (${daysCommitted} يوماً)`, w / 2, 34);

    // Before (Right side in RTL) & After (Left side in RTL)
    const beforeX = w * 0.73;
    const afterX = w * 0.27;

    ctx.fillStyle = '#cbd5e1';
    ctx.font = 'bold 16px Cairo, sans-serif';
    ctx.fillText('قبل الالتزام (الحالي)', beforeX, 66);
    ctx.fillStyle = '#6ee7b7';
    ctx.fillText('بعد الالتزام والتمارين ✨', afterX, 66);

    drawBodySilhouette(ctx, beforeX, 80, metrics.gender, beforeFatFactor, beforeMuscle, false);
    drawBodySilhouette(ctx, afterX, 80, metrics.gender, afterFatFactor, afterMuscle, true);

    // Transformation Arrow in Center
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 28px Cairo, sans-serif';
    ctx.fillText('⬅️', w / 2, 205);
    ctx.font = 'bold 13px Cairo, sans-serif';
    ctx.fillText(`${metrics.targetCalories} سعرة/يوم`, w / 2, 232);
    ctx.fillStyle = '#a7f3d0';
    ctx.fillText(`بروتين ${metrics.proteinG} جم`, w / 2, 252);

    // Bottom Comparison Metrics Strip
    ctx.fillStyle = 'rgba(2, 6, 23, 0.82)';
    ctx.fillRect(0, h - 74, w, 74);
    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 15px Cairo, sans-serif';
    ctx.fillText(`الوزن: ${metrics.weight} كجم  |  BMI: ${metrics.bmi}`, beforeX, h - 42);
    ctx.fillStyle = '#10b981';
    ctx.fillText(`الوزن المتوقع: ${projectedWeight} كجم  |  BMI: ${afterBmi}`, afterX, h - 42);

    ctx.fillStyle = '#fde68a';
    ctx.font = '13px Cairo, sans-serif';
    ctx.fillText(`الوزن المثالي لطولك وسنك: ${metrics.idealWeight} كجم • النظام: ${splitName}`, w / 2, h - 15);

    return { projectedWeight, afterBmi, daysCommitted };
  }

  // ==================== 6. APPRECIATION CERTIFICATE GENERATOR & PNG DOWNLOAD ====================
  function computeAutoDays(startStr, endStr) {
    if (!startStr || !endStr) return 7;
    const d1 = new Date(startStr);
    const d2 = new Date(endStr);
    const diff = Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
    return Math.max(1, diff || 7);
  }

  function renderCertificateCanvas(canvas, opts) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    // Luxury Dark Emerald & Royal Gold Parchment Background
    const bg = ctx.createLinearGradient(0, 0, w, h);
    bg.addColorStop(0, '#022c22');
    bg.addColorStop(0.5, '#0f172a');
    bg.addColorStop(1, '#3b1d06');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // Double Ornamental Gold Frame
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 7;
    ctx.strokeRect(24, 24, w - 48, h - 48);
    ctx.strokeStyle = '#fde68a';
    ctx.lineWidth = 2;
    ctx.strokeRect(38, 38, w - 76, h - 76);

    // Corner Medallions
    for (const [cx, cy] of [[48, 48], [w - 48, 48], [48, h - 48], [w - 48, h - 48]]) {
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath(); ctx.arc(cx, cy, 11, 0, Math.PI * 2); ctx.fill();
    }

    ctx.textAlign = 'center';
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 22px Cairo, sans-serif';
    ctx.fillText('🏆 منصة NileFitPro العالمية للتغذية والتمارين الاحترافية 🏆', w / 2, 92);

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 44px Cairo, sans-serif';
    ctx.fillText('شـهـادة تـقـديـر وإتـمـام الـتـزام', w / 2, 152);

    ctx.fillStyle = '#6ee7b7';
    ctx.font = 'bold 21px Cairo, sans-serif';
    ctx.fillText('تُمنح هذه الشهادة بكل فخر واعتزاز إلى البطل / البطلة:', w / 2, 204);

    // Recipient Name Highlight
    ctx.fillStyle = 'rgba(245, 158, 11, 0.14)';
    ctx.beginPath(); ctx.roundRect(w * 0.2, 224, w * 0.6, 66, 16); ctx.fill();
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.65)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#fde68a';
    ctx.font = '900 36px Cairo, sans-serif';
    ctx.fillText(opts.userName || 'بطل NileFitPro الملتزم', w / 2, 269);

    ctx.fillStyle = '#f1f5f9';
    ctx.font = 'bold 22px Cairo, sans-serif';
    ctx.fillText(`تقديراً لإتمام مدة الالتزام بنجاح: ( ${opts.durationLabel} — ${opts.daysCount} يوماً )`, w / 2, 336);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '20px Cairo, sans-serif';
    ctx.fillText(`على نظام التمارين: « ${opts.workoutName} »`, w / 2, 380);
    ctx.fillText(`والنظام الغذائي المحسوب: « ${opts.calories} سعرة حرارية يومياً | بروتين ${opts.proteinG} جم »`, w / 2, 418);

    ctx.fillStyle = '#a7f3d0';
    ctx.font = 'bold 20px Cairo, sans-serif';
    ctx.fillText('« إنَّ القوة الحقيقية تُولد من الانضباط اليومي والاستعانة بالله؛ استمر فأنت تصنع نسخة استثنائية من نفسك! »', w / 2, 474);

    // Golden Seal Badge
    const sealX = w * 0.18, sealY = h - 108;
    const sealG = ctx.createRadialGradient(sealX, sealY, 8, sealX, sealY, 52);
    sealG.addColorStop(0, '#fef08a');
    sealG.addColorStop(0.7, '#d97706');
    sealG.addColorStop(1, '#92400e');
    ctx.fillStyle = sealG;
    ctx.beginPath(); ctx.arc(sealX, sealY, 48, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#0f172a';
    ctx.font = '900 15px Cairo, sans-serif';
    ctx.fillText('ختم التميز', sealX, sealY - 4);
    ctx.fillText('NileFitPro', sealX, sealY + 16);

    // Dates & Signature
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 17px Cairo, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(`فترة الالتزام: من ${opts.startDate} إلى ${opts.endDate}`, w - 68, h - 98);
    ctx.fillStyle = '#fde68a';
    ctx.fillText('إشراف وتصميم: NileFitPro • محمد عوض خير', w - 68, h - 66);
  }

  // ==================== 7. ONE-PAGE COMPLETE PLAN PDF & MOTIVATIONAL INFOGRAPHIC EXPORTER ====================
  function buildOnePageInfographicCanvas(stateData) {
    const c = document.createElement('canvas');
    c.width = 1400;
    c.height = 1980; // Exact A4 aspect ratio (1 : 1.414) so EVERYTHING fits on ONE crisp page!
    const ctx = c.getContext('2d');

    const { userName, metrics, meals, splitObj, qiyam, sleep, daysCount, quoteText } = stateData;

    const bg = ctx.createLinearGradient(0, 0, 0, c.height);
    bg.addColorStop(0, '#042f2e');
    bg.addColorStop(0.45, '#0f172a');
    bg.addColorStop(1, '#1e293b');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 6;
    ctx.strokeRect(24, 24, c.width - 48, c.height - 48);

    // Header
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fde68a';
    ctx.font = '900 44px Cairo, sans-serif';
    ctx.fillText(`NileFitPro — الخطة الشاملة وإنفوجرافيك التحول لـ (${userName || 'بطل النيل'})`, c.width / 2, 96);

    ctx.fillStyle = '#6ee7b7';
    ctx.font = 'bold 22px Cairo, sans-serif';
    ctx.fillText(`« ${quoteText} »`, c.width / 2, 142);

    // Row 1: Body Metrics & Ideal Weight Cards
    const kpis = [
      { lbl: 'السعرات اليومية المستهدفة', val: `${metrics.targetCalories} kcal`, sub: `TDEE: ${metrics.tdee} | BMR: ${metrics.bmr}` },
      { lbl: 'الوزن المثالي لطولك وسنك', val: `${metrics.idealWeight} كجم`, sub: `النطاق الصحي: ${metrics.healthyMin} - ${metrics.healthyMax} كجم` },
      { lbl: 'الماكروز اليومية بالجرام', val: `P:${metrics.proteinG}g C:${metrics.carbsG}g F:${metrics.fatG}g`, sub: `ألياف: ${metrics.fiberG} جم | ماء: ${metrics.waterLiters} لتر` },
      { lbl: 'بيانات الجسم والهدف', val: `${metrics.weight} ← ${metrics.goalWeight} كجم`, sub: `الطول: ${metrics.height} سم | السن: ${metrics.age} | BMI: ${metrics.bmi}` }
    ];

    kpis.forEach((k, i) => {
      const bw = 310, bh = 135;
      const bx = c.width - 56 - (i + 1) * bw - i * 16;
      const by = 176;
      ctx.fillStyle = 'rgba(255,255,255,0.07)';
      ctx.beginPath(); ctx.roundRect(bx, by, bw, bh, 16); ctx.fill();
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.5)'; ctx.lineWidth = 2; ctx.stroke();

      ctx.textAlign = 'center';
      ctx.fillStyle = '#94a3b8'; ctx.font = 'bold 17px Cairo, sans-serif';
      ctx.fillText(k.lbl, bx + bw / 2, by + 34);
      ctx.fillStyle = '#fde68a'; ctx.font = '900 26px Cairo, sans-serif';
      ctx.fillText(k.val, bx + bw / 2, by + 76);
      ctx.fillStyle = '#cbd5e1'; ctx.font = '16px Cairo, sans-serif';
      ctx.fillText(k.sub, bx + bw / 2, by + 110);
    });

    // Row 2: Daily Meals Breakdown in Grams (Right Column) + Workout & Before/After (Left Column)
    ctx.textAlign = 'right';
    ctx.fillStyle = '#fbbf24';
    ctx.font = '900 28px Cairo, sans-serif';
    ctx.fillText('🥗 جدول الوجبات اليومية المحسوبة بالجرامات (بزيت زيتون مزارع سيناء / السمنة البلدي):', c.width - 56, 366);

    let my = 390;
    meals.slice(0, 6).forEach((m) => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.78)';
      ctx.beginPath(); ctx.roundRect(680, my, c.width - 736, 155, 14); ctx.fill();
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.35)'; ctx.lineWidth = 1.5; ctx.stroke();

      ctx.fillStyle = '#6ee7b7'; ctx.font = 'bold 20px Cairo, sans-serif';
      ctx.fillText(`• ${m.slotLabel}: ${m.title.slice(0, 48)} (${m.kcal} سعرة)`, c.width - 74, my + 34);
      ctx.fillStyle = '#fde68a'; ctx.font = 'bold 16px Cairo, sans-serif';
      ctx.fillText(`بروتين: ${m.protein} جم | كارب: ${m.carbs} جم | دهون صحية: ${m.fat} جم | ألياف: ${m.fiber} جم`, c.width - 74, my + 64);

      ctx.fillStyle = '#e2e8f0'; ctx.font = '15.5px Cairo, sans-serif';
      const ingLine1 = m.ingredients.slice(0, 2).map(x => `${x.grams} جم ${x.name.slice(0, 32)}`).join('  +  ');
      const ingLine2 = m.ingredients.slice(2).map(x => `${x.grams} جم ${x.name.slice(0, 38)}`).join('  +  ');
      ctx.fillText(ingLine1, c.width - 74, my + 98);
      if (ingLine2) {
        ctx.fillStyle = '#fbbf24';
        ctx.fillText(ingLine2, c.width - 74, my + 128);
      }
      my += 168;
    });

    // Left Column: Expected Before/After Physique + Workout Split + Qiyam & Fajr Sleep
    const leftBoxX = 56, leftBoxW = 595;
    const miniTrans = document.createElement('canvas');
    miniTrans.width = leftBoxW;
    miniTrans.height = 415;
    renderTransformationCanvas(miniTrans, metrics, daysCount, splitObj.nameAr);
    ctx.drawImage(miniTrans, leftBoxX, 390);

    // Workout Summary Box
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    ctx.beginPath(); ctx.roundRect(leftBoxX, 825, leftBoxW, 330, 16); ctx.fill();
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.45)'; ctx.stroke();

    ctx.textAlign = 'right';
    ctx.fillStyle = '#fde68a'; ctx.font = '900 24px Cairo, sans-serif';
    ctx.fillText(`🏋️ نظام التمارين: ${splitObj.nameAr}`, leftBoxX + leftBoxW - 22, 868);

    let wy = 910;
    splitObj.days.slice(0, 5).forEach((d) => {
      ctx.fillStyle = '#6ee7b7'; ctx.font = 'bold 18px Cairo, sans-serif';
      ctx.fillText(`▸ ${d.dayAr} (${d.list.length} تمارين مشروحة بالفيديو)`, leftBoxX + leftBoxW - 24, wy);
      wy += 44;
    });

    // Spiritual & Productivity Summary Box (Fajr Sleep, Pomodoro Deep Study, Adhkar, Olive Oil)
    ctx.fillStyle = 'rgba(245, 158, 11, 0.1)';
    ctx.beginPath(); ctx.roundRect(leftBoxX, 1175, leftBoxW, 255, 16); ctx.fill();
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.45)'; ctx.stroke();

    ctx.fillStyle = '#fde68a'; ctx.font = '900 23px Cairo, sans-serif';
    ctx.fillText('🌅 برنامج النوم الصحي والفجر والبومودورو والبركة:', leftBoxX + leftBoxW - 22, 1218);
    ctx.fillStyle = '#f8fafc'; ctx.font = 'bold 18px Cairo, sans-serif';
    ctx.fillText(`• النوم المثالي للاستيقاظ لصلاة الفجر (5 دورات): ${sleep.bedtime5 || sleep.cycles5.time} ➔ الفجر ${sleep.wakeAmPm}`, leftBoxX + leftBoxW - 22, 1262);
    ctx.fillText(`• المذاكرة العميقة (البومودورو): ${stateData.pomo?.sessions || 6} جلسات تركيز (${stateData.pomo?.totalElapsedLabel || '3 ساعات'})`, leftBoxX + leftBoxW - 22, 1304);
    ctx.fillText('• التحصين اليومي: أذكار الصباح والمساء والقرآن الكريم والذكر للتوفيق', leftBoxX + leftBoxW - 22, 1346);
    ctx.fillStyle = '#6ee7b7';
    ctx.fillText('• الدهون الصحية المعتمدة: زيت زيتون مزارع سيناء البكر الطبيعي 100%', leftBoxX + leftBoxW - 22, 1388);

    // Bottom Dedication Footer
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(2, 6, 23, 0.85)';
    ctx.fillRect(30, c.height - 115, c.width - 60, 82);
    ctx.fillStyle = '#fde68a'; ctx.font = 'bold 21px Cairo, sans-serif';
    ctx.fillText('تم بحمد الله وتوفيقه برمجة وتصميم هذا الموقع بواسطة Gemini 4 Argon وبمساعدة محمد عوض خير', c.width / 2, c.height - 72);
    ctx.fillStyle = '#94a3b8'; ctx.font = 'bold 18px Cairo, sans-serif';
    ctx.fillText('للتواصل (تليفون / واتساب / تليجرام): 01011805464  •  زيت زيتون مزارع سيناء البكر الطبيعي 100%', c.width / 2, c.height - 42);

    return c;
  }

  function exportFullPlanInfographicPng(stateData) {
    const c = buildOnePageInfographicCanvas(stateData);
    const a = document.createElement('a');
    a.href = c.toDataURL('image/png');
    a.download = `NileFitPro-Infographic-${stateData.userName || 'Plan'}.png`;
    a.click();
  }

  function exportFullPlanOnePagePdf(stateData) {
    const c = buildOnePageInfographicCanvas(stateData);
    const imgData = c.toDataURL('image/jpeg', 0.95);
    if (window.jspdf && window.jspdf.jsPDF) {
      const pdf = new window.jspdf.jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
      pdf.save(`NileFitPro-1Page-Plan-${stateData.userName || 'Pro'}.pdf`);
    } else {
      exportFullPlanInfographicPng(stateData);
    }
  }

  window.NFP_CalcsExport = {
    calculateQiyamTimes,
    calculateHealthySleep,
    calculatePomodoroPlan,
    downloadMotivationPng,
    renderTransformationCanvas,
    computeAutoDays,
    renderCertificateCanvas,
    exportFullPlanInfographicPng,
    exportFullPlanOnePagePdf
  };
})();
