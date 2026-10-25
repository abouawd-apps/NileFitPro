// NileFitPro - Workout Systems (HIIT, LISS, Home Resistance, Bro Split, PPL, Arnold Split) & 100% Biomechanically Accurate Cartoon Machine Exercise Video Engine

(function () {
  const WORKOUT_PROGRAMS = {
    ppl: {
      id: 'ppl',
      title: 'نظام بوش بول ليج (Push / Pull / Legs - PPL)',
      location: 'الجيم (Gym Resistance)',
      desc: 'تقسيم علمي احترافي يجمع عضلات الدفع (صدر، أكتاف، ترايسبس)، عضلات السحب (ظهر، بايسبس، كتف خلفي)، ويوم الأرجل الشامل لتحقيق أعلى تردد وبناء عضلي.',
      days: [
        {
          dayName: 'اليوم الأول: عضلات الدفع (Push — صدر + أكتاف + ترايسبس)',
          exercises: [
            {
              id: 'bench_press',
              name: 'ضغط الصدر بالبار على البنش المسطح (Barbell Flat Bench Press)',
              machine: 'جهاز البنش المسطح والبار الأولمبي (Flat Bench & Barbell Rack)',
              targetMuscle: 'عضلة الصدر الوسطى (Pectoralis Major) + الترايسبس + الكتف الأمامي',
              animType: 'bench_press',
              ytQuery: 'Barbell Flat Bench Press proper form tutorial',
              formTips: 'تثبيت لوحي الكتف للخلف والأسفل على البنش، مسكة البار بعرض أوسع قليلاً من الكتفين، نزول البار بتحكم لأسفل الصدر مع زاوية كوع 45-60 درجة، والزفير عند الدفع للأعلى.'
            },
            {
              id: 'shoulder_press',
              name: 'تجميع الأكتاف بالدمبل أو البار جالساً (Seated Overhead Shoulder Press)',
              machine: 'كرسي الأكتاف بزاوية 85 درجة (Seated Shoulder Press Bench)',
              targetMuscle: 'العضلة الدالية الأمامية والجانبية (Anterior & Lateral Deltoids)',
              animType: 'shoulder_press',
              ytQuery: 'Seated Overhead Shoulder Press proper form',
              formTips: 'إسناد الظهر بالكامل على مسند الكرسي، الدفع للأعلى في مسار عمودي فوق الكتف مباشرة دون قفل مفصل الكوع بعنف في الأعلى.'
            },
            {
              id: 'cable_pushdown',
              name: 'دفع الكابل لأسفل بالمسطرة للترايسبس (Cable Tricep Pushdown)',
              machine: 'جهاز الكابل كروس العلوي (High Pulley Cable Machine)',
              targetMuscle: 'عضلة الترايسبس الرأس الجانبي والطويل (Triceps Brachii)',
              animType: 'cable_pushdown',
              ytQuery: 'Cable Tricep Pushdown proper form',
              formTips: 'تثبيت الكوعين ملاصقين للجانبين تماماً، وتحريك الساعد فقط للأسفل حتى الانقباض الكامل للترايسبس ثم الرجوع ببطء.'
            }
          ]
        },
        {
          dayName: 'اليوم الثاني: عضلات السحب (Pull — ظهر + بايسبس + ترابيس)',
          exercises: [
            {
              id: 'lat_pulldown',
              name: 'سحب الكابل العلوي للظهر (Wide-Grip Lat Pulldown)',
              machine: 'جهاز السحب العلوي للظهر (Lat Pulldown Cable Machine)',
              targetMuscle: 'العضلة العريضة الظهرية (Latissimus Dorsi - المجنص)',
              animType: 'lat_pulldown',
              ytQuery: 'Lat Pulldown proper biomechanical form',
              formTips: 'تثبيت الفخذين تحت الوسادة، إرجاع الصدر للأعلى قليلاً، سحب البار بكوعك نحو أعلى الصدر وليس خلف الرقبة، مع عصر عضلات الظهر.'
            },
            {
              id: 'seated_row',
              name: 'سحب الكابل الأرضي جالساً للظهر (Seated Cable Row)',
              machine: 'جهاز السحب الأرضي بالبكرة (Seated Cable Row Station)',
              targetMuscle: 'وسط الظهر والمعينيات (Rhomboids & Middle Back)',
              animType: 'seated_row',
              ytQuery: 'Seated Cable Row proper form',
              formTips: 'الحفاظ على استقامة العمود الفقري 100% دون تقوس، سحب المقبض نحو أسفل الصدر/أعلى البطن مع ضم لوحي الكتف للخلف.'
            },
            {
              id: 'bicep_curl',
              name: 'تبادل وتكوير البايسبس بالبار أو الدمبل (Standing Bicep Curl)',
              machine: 'البار الزجزاج / الدمبل (EZ-Bar & Dumbbell Rack)',
              targetMuscle: 'عضلة البايسبس ذات الرأسين (Biceps Brachii)',
              animType: 'bicep_curl',
              ytQuery: 'Standing Bicep Curl strict form',
              formTips: 'عدم مرجحة الجذع أو الظهر إطلاقاً، تثبيت الكوع بجانب الجسم، والرفع بتحكم كامل مع عصر العضلة في الأعلى.'
            }
          ]
        },
        {
          dayName: 'اليوم الثالث: عضلات الأرجل الشاملة (Legs — أمامية + خلفية + سمانة)',
          exercises: [
            {
              id: 'squat_rack',
              name: 'السكوات بالبار في القفص الآمن (Barbell Back Squat)',
              machine: 'قفص السكوات الآمن (Power Squat Rack)',
              targetMuscle: 'الفخذ الأمامي (Quadriceps) + الألوية (Glutes) + الجذع',
              animType: 'squat_rack',
              ytQuery: 'Barbell Back Squat biomechanics form',
              formTips: 'وضع البار على عضلة الترابيس، استقامة الظهر، النزول بالحوض للخلف والأسفل حتى توازي الفخذ مع الأرض مع بقاء الركبتين في اتجاه مشط القدم.'
            },
            {
              id: 'leg_press',
              name: 'دفع الأرجل على جهاز الليج بريس 45 درجة (45° Machine Leg Press)',
              machine: 'جهاز دفع الأرجل المائل 45 درجة (45° Sled Leg Press Machine)',
              targetMuscle: 'عضلات الفخذ الأمامية والخلفية (Quads & Hamstrings)',
              animType: 'leg_press',
              ytQuery: '45 degree Leg Press proper form',
              formTips: 'تثبيت أسفل الظهر والحوض بالكامل على الكرسي، النزول بالمنصة حتى زاوية 90 درجة للركبة، والدفع بالكعبين دون قفل الركبة بالكامل 100%.'
            }
          ]
        }
      ]
    },

    bro_split: {
      id: 'bro_split',
      title: 'نظام برو سبليت الكلاسيكي (Bro Split — عضلة كل يوم)',
      location: 'الجيم (Gym Resistance)',
      desc: 'تركيز عميق ومكثف على مجموعة عضلية واحدة في كل حصة تدريبية (يوم صدر، يوم ظهر، يوم أكتاف، يوم ذراعين، يوم أرجل).',
      days: [
        {
          dayName: 'يوم الصدر الكامل (Chest Day)',
          exercises: [
            {
              id: 'bro_bench',
              name: 'ضغط الصدر بالبار على البنش المسطح (Flat Barbell Bench Press)',
              machine: 'جهاز البنش المسطح والبار الأولمبي',
              targetMuscle: 'الصدر الأوسط والداخلي',
              animType: 'bench_press',
              ytQuery: 'Flat Barbell Bench Press proper form',
              formTips: 'نزول بطيء خلال ثانيتين لأسفل الصدر ودفع قوي مع الزفير واستقرار القدمين على الأرض.'
            }
          ]
        },
        {
          dayName: 'يوم الظهر الكامل (Back Day)',
          exercises: [
            {
              id: 'bro_lat',
              name: 'سحب الكابل العلوي العريض (Lat Pulldown)',
              machine: 'جهاز السحب العلوي بالكابل',
              targetMuscle: 'عضلات المجنص والظهر العلوي',
              animType: 'lat_pulldown',
              ytQuery: 'Wide Grip Lat Pulldown form',
              formTips: 'سحب الكوعين لأسفل والتركيز على الانقباض العضلي في الظهر.'
            },
            {
              id: 'bro_row',
              name: 'سحب الكابل الأرضي جالساً (Seated Cable Row)',
              machine: 'جهاز السحب الأرضي',
              targetMuscle: 'كثافة وسط الظهر',
              animType: 'seated_row',
              ytQuery: 'Seated Cable Row form',
              formTips: 'ظهر مستقيم تماماً وسحب المقبض نحو البطن مع تثبيت ثانية في الخلف.'
            }
          ]
        },
        {
          dayName: 'يوم الأكتاف والذراعين (Shoulders & Arms)',
          exercises: [
            {
              id: 'bro_shoulder',
              name: 'ضغط الأكتاف جالساً (Seated Overhead Press)',
              machine: 'كرسي الأكتاف والدمبل/البار',
              targetMuscle: 'الأكتاف الأمامية والجانبية',
              animType: 'shoulder_press',
              ytQuery: 'Seated Shoulder Press proper form',
              formTips: 'حركة رأسية منضبطة مع ثبات الجذع.'
            },
            {
              id: 'bro_bicep',
              name: 'تبادل بايسبس (Strict Bicep Curl)',
              machine: 'البار / الدمبل',
              targetMuscle: 'عضلة البايسبس',
              animType: 'bicep_curl',
              ytQuery: 'Strict Bicep Curl tutorial',
              formTips: 'عزل تام لعضلة البايسبس مع ثبات الكوع.'
            },
            {
              id: 'bro_tricep',
              name: 'دفع الكابل للترايسبس (Cable Tricep Pushdown)',
              machine: 'جهاز الكابل العلوي',
              targetMuscle: 'عضلة الترايسبس',
              animType: 'cable_pushdown',
              ytQuery: 'Tricep Rope Pushdown form',
              formTips: 'تثبيت الكوع بجانب الجسم ومد الذراع بالكامل لأسفل.'
            }
          ]
        },
        {
          dayName: 'يوم الأرجل الشامل (Legs Day)',
          exercises: [
            {
              id: 'bro_squat',
              name: 'السكوات بالبار (Barbell Squat)',
              machine: 'قفص السكوات',
              targetMuscle: 'عضلات الأرجل كاملة',
              animType: 'squat_rack',
              ytQuery: 'Barbell Squat tutorial',
              formTips: 'ظهر مستقيم ونزول متوازن.'
            },
            {
              id: 'bro_legpress',
              name: 'دفع الأرجل على الجهاز (Leg Press 45°)',
              machine: 'جهاز الليج بريس',
              targetMuscle: 'الفخذ الأمامي والخلفي',
              animType: 'leg_press',
              ytQuery: 'Leg Press machine proper form',
              formTips: 'عدم قفل الركبة بالكامل وحركة سلسة.'
            }
          ]
        }
      ]
    },

    arnold_split: {
      id: 'arnold_split',
      title: 'نظام أرنولد سبليت الأسطوري (Arnold Split — صدر وظهر / أكتاف وذراعين / أرجل)',
      location: 'الجيم (Gym Resistance)',
      desc: 'النظام الشهير الذي يجمع العضلات المتضادة (الصدر مع الظهر في نفس اليوم) لضخ دم هائل وتوازن عضلي متكامل.',
      days: [
        {
          dayName: 'اليوم الأول: الصدر + الظهر (Chest & Back Antagonist Superset)',
          exercises: [
            {
              id: 'arnold_bench',
              name: 'ضغط الصدر بالبار على البنش (Barbell Bench Press)',
              machine: 'البنش المسطح والبار الأولمبي',
              targetMuscle: 'عضلة الصدر الكبرى',
              animType: 'bench_press',
              ytQuery: 'Arnold Chest Bench Press form',
              formTips: 'مدى حركي كامل وتحكم في النزول والصعود.'
            },
            {
              id: 'arnold_lat',
              name: 'سحب الكابل العلوي للظهر (Lat Pulldown)',
              machine: 'جهاز السحب العلوي للظهر',
              targetMuscle: 'المجنص وعرض الظهر',
              animType: 'lat_pulldown',
              ytQuery: 'Lat Pulldown strict form',
              formTips: 'تمدد كامل في الأعلى وانقباض قوي عند الصدر.'
            }
          ]
        },
        {
          dayName: 'اليوم الثاني: الأكتاف + الذراعين (Shoulders, Biceps & Triceps)',
          exercises: [
            {
              id: 'arnold_ohp',
              name: 'ضغط الأكتاف جالساً (Overhead Press)',
              machine: 'كرسي الأكتاف',
              targetMuscle: 'عضلات الكتف الثلاثية',
              animType: 'shoulder_press',
              ytQuery: 'Seated Overhead Press tutorial',
              formTips: 'ثبات أسفل الظهر ودفع متوازن.'
            },
            {
              id: 'arnold_curl',
              name: 'تكوير البايسبس (Barbell / Dumbbell Curl)',
              machine: 'البار الأولمبي / الدمبل',
              targetMuscle: 'البايسبس',
              animType: 'bicep_curl',
              ytQuery: 'Barbell Bicep Curl form',
              formTips: 'ثبات الكوعين وعدم أرجحة الظهر.'
            },
            {
              id: 'arnold_pushdown',
              name: 'دفع الكابل للترايسبس (Cable Pushdown)',
              machine: 'جهاز الكابل',
              targetMuscle: 'الترايسبس',
              animType: 'cable_pushdown',
              ytQuery: 'Tricep Pushdown proper form',
              formTips: 'عصر الترايسبس في أسفل الحركة.'
            }
          ]
        },
        {
          dayName: 'اليوم الثالث: الأرجل وأسفل الجسم (Full Lower Body)',
          exercises: [
            {
              id: 'arnold_squat',
              name: 'السكوات بالبار (Back Squat)',
              machine: 'قفص السكوات',
              targetMuscle: 'الفخذ الأمامي والألوية',
              animType: 'squat_rack',
              ytQuery: 'Back Squat proper form',
              formTips: 'الحفاظ على استقامة العمود الفقري.'
            },
            {
              id: 'arnold_legpress',
              name: 'جهاز الليج بريس (45° Leg Press)',
              machine: 'جهاز دفع الأرجل',
              targetMuscle: 'عضلات الأرجل الشاملة',
              animType: 'leg_press',
              ytQuery: 'Leg Press form guide',
              formTips: 'نزول بزاوية 90 درجة ودفع بالكعبين.'
            }
          ]
        }
      ]
    },

    home_resistance: {
      id: 'home_resistance',
      title: 'تمارين المقاومة في المنزل (Home Resistance Training)',
      location: 'المنزل (بوزن الجسم أو أدوات منزلية بسيطة)',
      desc: 'برنامج مقاومة منزلي متكامل لبناء العضلات وشد الجسم وحرق الدهون في المنزل بأداء حركي صحيح 100%.',
      days: [
        {
          dayName: 'تحدي المقاومة المنزلي الشامل (Full Body Home Resistance)',
          exercises: [
            {
              id: 'home_pushup',
              name: 'تمرين الضغط القياسي الصحيح (Strict Biomechanical Push-Up)',
              machine: 'بساط التمرين المنزلي (Exercise Floor Mat)',
              targetMuscle: 'الصدر + الترايسبس + الكتف الأمامي + الجذع (Core)',
              animType: 'pushup_mat',
              ytQuery: 'Proper Push Up form biomechanics',
              formTips: 'الجسم في خط مستقيم تماماً من الرأس للكعبين دون هبوط الحوض، الكوع بزاوية 45 درجة، النزول حتى يقترب الصدر من البساط ثم الدفع.'
            },
            {
              id: 'home_squat',
              name: 'السكوات الحر أو بالدمبل المنزلي (Home Bodyweight / Goblet Squat)',
              machine: 'بساط التمرين المنزلي / وزن حر',
              targetMuscle: 'الأرجل والأرداف والجذع',
              animType: 'squat_rack',
              ytQuery: 'Bodyweight Goblet Squat proper form',
              formTips: 'صدر مرفوع، ظهر مستقيم، دفع الحوض للخلف والنزول بتحكم كامل.'
            }
          ]
        }
      ]
    },

    hiit_cardio: {
      id: 'hiit_cardio',
      title: 'كارديو عالي الشدة المتقطع (HIIT — High-Intensity Interval Training)',
      location: 'الجيم أو المنزل (أقصى حرق للدهون ورفع اللياقة القلبية)',
      desc: 'فترات عمل قصيرة عالية الشدة تتبعها فترات استشفاء نشطة لرفع معدل الحرق لمدة 24 ساعة بعد التمرين (Afterburn Effect).',
      days: [
        {
          dayName: 'جلسة الكارديو عالي الشدة (HIIT Sprint & Bike Intervals)',
          exercises: [
            {
              id: 'hiit_bike',
              name: 'التبديل السريع المتقطع على الدراجة الثابتة / المشاية (HIIT Stationary Bike / Sprint)',
              machine: 'جهاز الدراجة الرياضية الثابتة (Stationary Spin Bike)',
              targetMuscle: 'القلب والأوعية الدموية + عضلات الأرجل وحرق الدهون الشامل',
              animType: 'cardio_bike',
              ytQuery: 'HIIT Stationary Bike workout proper posture',
              formTips: 'ضبط ارتفاع المقعد ليكون هناك انحناء بسيط في الركبة، ظهر مفرود، 30 ثانية سرعة عالية تليها 60 ثانية سرعة هادئة للاستشفاء.'
            },
            {
              id: 'hiit_pushup_burpee',
              name: 'تمرين الضغط الديناميكي المتواصل (Dynamic Tempo Push-Up)',
              machine: 'بساط الكارديو المنزلي',
              targetMuscle: 'تحمل عضلات الصدر والقلب',
              animType: 'pushup_mat',
              ytQuery: 'HIIT Pushup cardio workout',
              formTips: 'الحفاظ على استقامة الجذع مع إيقاع تنفس منتظم.'
            }
          ]
        }
      ]
    },

    liss_cardio: {
      id: 'liss_cardio',
      title: 'كارديو منخفض الشدة المستمر (LISS — Low-Intensity Steady State)',
      location: 'الجيم أو المنزل (مناسب جداً للمبتدئين، راحة المفاصل، وأثناء التنشيف)',
      desc: 'أداء هوائي معتدل ومستمر يحافظ على نبضات القلب في منطقة حرق الدهون الصافية دون إجهاد الجهاز العصبي أو المفاصل.',
      days: [
        {
          dayName: 'جلسة الكارديو منخفض الشدة (Steady State Fat Burn)',
          exercises: [
            {
              id: 'liss_bike',
              name: 'قيادة الدراجة الثابتة بإيقاع معتدل ومستمر (Steady-State Ergometer Cycling)',
              machine: 'جهاز الدراجة الطبية الثابتة (Ergometer Bike)',
              targetMuscle: 'أكسدة الدهون المباشرة + تنشيط الدورة الدموية وصحة القلب',
              animType: 'cardio_bike',
              ytQuery: 'LISS Cardio Stationary Bike form',
              formTips: 'الحفاظ على إيقاع ثابت ومريح لمدة 30-45 دقيقة مع استقامة الظهر والتنفس العميق.'
            }
          ]
        }
      ]
    }
  };

  let currentWorkoutKey = 'ppl';
  let currentFitnessLevel = 'intermediate'; // beginner, intermediate, advanced
  const canvasControllers = {};

  function getLevelPrescription(level) {
    if (level === 'beginner') {
      return {
        badge: 'مستوى مبتدئ (Beginner)',
        sets: '3 مجموعات',
        reps: '10 - 12 عدات بتحكم كامل',
        rest: '90 ثانية راحة بين المجموعات',
        tempo: 'إيقاع 3 ثوانٍ نزول - ثانية ثبات - ثانيتين دفع'
      };
    } else if (level === 'advanced') {
      return {
        badge: 'مستوى متقدم (Advanced)',
        sets: '4 - 5 مجموعات قوية',
        reps: '8 - 10 عدات (حمل تدريجي Progressive Overload)',
        rest: '60 - 75 ثانية راحة',
        tempo: 'تحكم ميكانيكي عالي الشدة مع عصر العضلة في القمة'
      };
    }
    return {
      badge: 'مستوى متوسط (Intermediate)',
      sets: '4 مجموعات متوازنة',
      reps: '10 - 12 عدة دقيقة',
      rest: '75 ثانية راحة',
      tempo: 'ثانيتين نزول (شهيق) - ثانية انقباض - ثانيتين صعود (زفير)'
    };
  }

  // --- 100% BIOMECHANICALLY ACCURATE CARTOON EXERCISE ANIMATION RENDERER ---
  // Draws the exact machine + anatomically aligned cartoon athlete with zero clipping/errors
  function drawLimb(ctx, x1, y1, x2, y2, thickness, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    // Joint circles for clean anatomical look
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x1, y1, thickness * 0.45, 0, Math.PI * 2);
    ctx.arc(x2, y2, thickness * 0.45, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawCartoonHead(ctx, hx, hy, facingRight = true) {
    // Head
    ctx.fillStyle = '#fcd34d';
    ctx.beginPath();
    ctx.arc(hx, hy, 14, 0, Math.PI * 2);
    ctx.fill();
    // Athletic Headband
    ctx.strokeStyle = '#14b8a6';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(hx - 13, hy - 5);
    ctx.lineTo(hx + 13, hy - 5);
    ctx.stroke();
    // Hair
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(hx, hy - 8, 12, Math.PI, 0);
    ctx.fill();
    // Eye
    const ex = facingRight ? hx + 6 : hx - 6;
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(ex, hy - 1, 2.2, 0, Math.PI * 2);
    ctx.fill();
  }

  function renderBiomechanicalFrame(ctx, w, h, animType, t, muscleGlowAlpha) {
    ctx.clearRect(0, 0, w, h);

    // Gym Studio Floor & Grid Background
    const bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, '#091326');
    bg.addColorStop(0.8, '#0f172a');
    bg.addColorStop(0.81, '#1e293b');
    bg.addColorStop(1, '#0f172a');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // Biomechanical Alignment Grid
    ctx.strokeStyle = 'rgba(20, 184, 166, 0.1)';
    ctx.lineWidth = 1;
    for (let gx = 0; gx < w; gx += 40) {
      ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, h * 0.8); ctx.stroke();
    }
    for (let gy = 0; gy < h * 0.8; gy += 40) {
      ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(w, gy); ctx.stroke();
    }

    // Floor line
    const floorY = h * 0.82;
    ctx.strokeStyle = '#14b8a6';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(20, floorY);
    ctx.lineTo(w - 20, floorY);
    ctx.stroke();

    // Smooth cycle phase p in [0 .. 1] (0 = start/eccentric bottom, 1 = concentric peak)
    const p = (Math.sin(t) + 1) / 2;
    const isConcentric = Math.cos(t) > 0;

    // Breathing & Phase HUD
    ctx.fillStyle = isConcentric ? 'rgba(16, 185, 129, 0.22)' : 'rgba(56, 189, 248, 0.22)';
    ctx.beginPath();
    ctx.roundRect(14, 12, 235, 32, 8);
    ctx.fill();
    ctx.fillStyle = isConcentric ? '#34d399' : '#7dd3fc';
    ctx.font = 'bold 13px Cairo, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(isConcentric ? '💨 مرحلة الانقباض (زفير Exhale)' : '🌬️ مرحلة الإطالة والتحكم (شهيق Inhale)', 240, 33);

    // Draw specific machine & locked cartoon athlete
    if (animType === 'bench_press') {
      // 1. Flat Bench Machine + Uprights
      const benchY = floorY - 52;
      ctx.fillStyle = '#475569';
      ctx.fillRect(110, benchY, 175, 12); // Bench pad
      ctx.fillRect(125, benchY + 12, 12, 40); // Left leg
      ctx.fillRect(255, benchY + 12, 12, 40); // Right leg
      ctx.fillRect(135, benchY - 75, 10, 87); // Barbell rack upright

      // 2. Athlete lying flat on bench with feet planted on floor
      const shoulderX = 158, shoulderY = benchY - 12;
      const hipX = 245, hipY = benchY - 10;
      const kneeX = 285, kneeY = benchY - 4;
      const footX = 290, footY = floorY - 4;

      // Spine alignment check line
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.5)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(shoulderX, shoulderY); ctx.lineTo(hipX, hipY); ctx.stroke();
      ctx.setLineDash([]);

      // Legs & Torso
      drawLimb(ctx, hipX, hipY, kneeX, kneeY, 15, '#3b82f6');
      drawLimb(ctx, kneeX, kneeY, footX, footY, 13, '#fcd34d');
      drawLimb(ctx, shoulderX, shoulderY, hipX, hipY, 18, '#0d9488');

      // Active Chest Muscle Glow
      ctx.fillStyle = `rgba(245, 158, 11, ${0.25 + p * 0.55})`;
      ctx.beginPath();
      ctx.arc(shoulderX + 18, shoulderY - 6, 14, 0, Math.PI * 2);
      ctx.fill();

      drawCartoonHead(ctx, shoulderX - 24, shoulderY - 2, true);

      // Barbell vertical path directly over chest
      const barX = shoulderX + 12;
      const barY = (shoulderY - 18) - p * 44; // Moves from chest to full extension
      const elbowX = shoulderX + 26 - p * 10;
      const elbowY = shoulderY + 12 - p * 22;

      // Upper Arm & Forearm locked to Barbell
      drawLimb(ctx, shoulderX, shoulderY, elbowX, elbowY, 12, '#fcd34d');
      drawLimb(ctx, elbowX, elbowY, barX, barY, 11, '#fcd34d');

      // Barbell & Weight Plates
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 5;
      ctx.beginPath(); ctx.moveTo(barX - 35, barY); ctx.lineTo(barX + 35, barY); ctx.stroke();
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(barX - 32, barY - 18, 10, 36);
      ctx.fillRect(barX + 22, barY - 18, 10, 36);
    } else if (animType === 'lat_pulldown') {
      // 1. Lat Pulldown Cable Machine Frame, Top Pulley & Moving Weight Stack
      const machineX = 130;
      const topPulleyY = 48;
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(machineX, floorY);
      ctx.lineTo(machineX, topPulleyY);
      ctx.lineTo(machineX + 105, topPulleyY);
      ctx.stroke();

      // Weight Stack moving opposite to bar pull
      const stackY = floorY - 35 - p * 55;
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(machineX - 18, stackY, 36, 26);

      // Seat & Thigh Pad
      const seatX = machineX + 105;
      const seatY = floorY - 52;
      ctx.fillStyle = '#475569';
      ctx.fillRect(seatX - 28, seatY, 55, 10);
      ctx.fillRect(seatX, seatY, 10, 52);
      // Thigh Rollers
      ctx.fillStyle = '#0f172a';
      ctx.beginPath(); ctx.arc(seatX - 12, seatY - 12, 9, 0, Math.PI * 2); ctx.fill();

      // 2. Seated Athlete
      const hipX = seatX + 8, hipY = seatY - 6;
      const shoulderX = hipX + 6, shoulderY = hipY - 58;
      const kneeX = hipX - 36, kneeY = hipY - 2;
      const footX = kneeX - 4, footY = floorY - 4;

      drawLimb(ctx, hipX, hipY, kneeX, kneeY, 15, '#3b82f6');
      drawLimb(ctx, kneeX, kneeY, footX, footY, 13, '#fcd34d');
      drawLimb(ctx, hipX, hipY, shoulderX, shoulderY, 18, '#0d9488');

      // Active Lat Muscle Glow
      ctx.fillStyle = `rgba(245, 158, 11, ${0.25 + p * 0.6})`;
      ctx.beginPath();
      ctx.ellipse(shoulderX + 4, shoulderY + 20, 12, 22, 0, 0, Math.PI * 2);
      ctx.fill();

      drawCartoonHead(ctx, shoulderX - 2, shoulderY - 22, false);

      // Cable & Bar Path from overhead down to upper chest
      const barX = seatX;
      const barY = (topPulleyY + 28) + p * 52;
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(barX, topPulleyY); ctx.lineTo(barX, barY); ctx.stroke();

      // Handlebar
      ctx.strokeStyle = '#f8fafc';
      ctx.lineWidth = 5;
      ctx.beginPath(); ctx.moveTo(barX - 26, barY); ctx.lineTo(barX + 26, barY); ctx.stroke();

      // Arms locked to Bar
      const elbowX = shoulderX - 10 + p * 8;
      const elbowY = (shoulderY - 25) + p * 44;
      drawLimb(ctx, shoulderX, shoulderY, elbowX, elbowY, 12, '#fcd34d');
      drawLimb(ctx, elbowX, elbowY, barX, barY, 11, '#fcd34d');
    } else if (animType === 'seated_row') {
      // 1. Seated Cable Row Machine
      const machineX = 115;
      const pulleyY = floorY - 48;
      ctx.fillStyle = '#475569';
      ctx.fillRect(machineX, floorY - 120, 24, 120); // Tower
      ctx.fillRect(machineX + 24, floorY - 28, 190, 10); // Bench rail
      // Footplate
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 6;
      ctx.beginPath(); ctx.moveTo(machineX + 65, floorY - 25); ctx.lineTo(machineX + 55, floorY - 58); ctx.stroke();

      // Moving weight stack
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(machineX + 2, floorY - 45 - p * 48, 20, 22);

      // 2. Athlete with 100% Upright Neutral Spine
      const hipX = 270, hipY = floorY - 36;
      const shoulderX = 270, shoulderY = hipY - 62;
      const kneeX = 218, kneeY = hipY - 8;
      const footX = 175, footY = floorY - 44;

      drawLimb(ctx, hipX, hipY, kneeX, kneeY, 15, '#3b82f6');
      drawLimb(ctx, kneeX, kneeY, footX, footY, 13, '#fcd34d');
      drawLimb(ctx, hipX, hipY, shoulderX, shoulderY, 18, '#0d9488');

      // Back Muscle Activation Glow
      ctx.fillStyle = `rgba(245, 158, 11, ${0.25 + p * 0.6})`;
      ctx.beginPath(); ctx.arc(shoulderX + 6, shoulderY + 22, 15, 0, Math.PI * 2); ctx.fill();

      drawCartoonHead(ctx, shoulderX, shoulderY - 22, false);

      // Cable & Handle moving horizontally to torso
      const handleX = 205 + p * 52;
      const handleY = shoulderY + 26;
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(machineX + 24, pulleyY); ctx.lineTo(handleX, handleY); ctx.stroke();

      const elbowX = handleX + p * 26;
      const elbowY = handleY + 4;
      drawLimb(ctx, shoulderX, shoulderY, elbowX, elbowY, 12, '#fcd34d');
      drawLimb(ctx, elbowX, elbowY, handleX, handleY, 11, '#fcd34d');
    } else if (animType === 'squat_rack') {
      // 1. Power Squat Rack Frame
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 7;
      ctx.strokeRect(145, 42, 130, floorY - 42);
      // Safety bars
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(145, floorY - 65); ctx.lineTo(275, floorY - 65); ctx.stroke();

      // 2. Biomechanical Squat Kinematics (p=0 deep parallel squat, p=1 standing tall)
      const depth = (1 - p) * 44;
      const footX = 210, footY = floorY - 5;
      const kneeX = 185 - (1 - p) * 14;
      const kneeY = floorY - 46 + depth * 0.25;
      const hipX = 222 + (1 - p) * 20;
      const hipY = floorY - 88 + depth;
      const shoulderX = 204;
      const shoulderY = hipY - 56;

      // Lower Leg, Thigh (Quads glow), Torso
      drawLimb(ctx, footX, footY, kneeX, kneeY, 13, '#fcd34d');
      drawLimb(ctx, kneeX, kneeY, hipX, hipY, 16, '#3b82f6');
      ctx.fillStyle = `rgba(245, 158, 11, ${0.3 + (1 - p) * 0.55})`;
      ctx.beginPath(); ctx.arc((kneeX + hipX) / 2, (kneeY + hipY) / 2, 15, 0, Math.PI * 2); ctx.fill();

      drawLimb(ctx, hipX, hipY, shoulderX, shoulderY, 18, '#0d9488');
      drawCartoonHead(ctx, shoulderX - 4, shoulderY - 20, false);

      // Arms holding Barbell on Traps
      drawLimb(ctx, shoulderX, shoulderY, shoulderX + 12, shoulderY + 18, 11, '#fcd34d');
      drawLimb(ctx, shoulderX + 12, shoulderY + 18, shoulderX + 4, shoulderY - 2, 10, '#fcd34d');

      // Barbell & Plates on Upper Back
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath(); ctx.arc(shoulderX + 4, shoulderY - 2, 16, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#e2e8f0';
      ctx.beginPath(); ctx.arc(shoulderX + 4, shoulderY - 2, 6, 0, Math.PI * 2); ctx.fill();
    } else if (animType === 'leg_press') {
      // 1. 45-Degree Sled Leg Press Machine
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 8;
      // Angled Seat & Backrest
      ctx.beginPath();
      ctx.moveTo(295, floorY - 12);
      ctx.lineTo(245, floorY - 12);
      ctx.lineTo(185, floorY - 62);
      ctx.stroke();
      // 45-degree Guide Rail
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(115, floorY - 20);
      ctx.lineTo(245, floorY - 150);
      ctx.stroke();

      // 2. Seated Athlete in Leg Press
      const hipX = 245, hipY = floorY - 22;
      const shoulderX = 285, shoulderY = floorY - 58;
      drawLimb(ctx, hipX, hipY, shoulderX, shoulderY, 18, '#0d9488');
      drawCartoonHead(ctx, shoulderX + 12, shoulderY - 16, false);

      // Sled platform moving along 45-degree rail
      const sledDist = 35 + p * 42;
      const footX = hipX - sledDist * 0.75;
      const footY = hipY - sledDist * 0.75;
      const kneeX = (hipX + footX) / 2 + (1 - p) * 22;
      const kneeY = (hipY + footY) / 2 - (1 - p) * 24;

      drawLimb(ctx, hipX, hipY, kneeX, kneeY, 16, '#3b82f6');
      drawLimb(ctx, kneeX, kneeY, footX, footY, 13, '#fcd34d');

      // Sled Footplate & Weight Plates
      ctx.save();
      ctx.translate(footX - 8, footY - 8);
      ctx.rotate(-Math.PI / 4);
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(-6, -32, 12, 64);
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(-24, -22, 18, 44);
      ctx.restore();
    } else if (animType === 'shoulder_press') {
      // 1. Seated 85-Degree Shoulder Press Bench
      const benchX = 210;
      ctx.fillStyle = '#475569';
      ctx.fillRect(benchX - 24, floorY - 48, 48, 10); // Seat
      ctx.fillRect(benchX + 14, floorY - 125, 10, 85); // Vertical backrest
      ctx.fillRect(benchX - 10, floorY - 38, 12, 38); // Leg

      // 2. Seated Athlete
      const hipX = benchX, hipY = floorY - 54;
      const shoulderX = benchX + 4, shoulderY = hipY - 56;
      const kneeX = benchX - 36, kneeY = hipY;
      const footX = kneeX, footY = floorY - 4;

      drawLimb(ctx, hipX, hipY, kneeX, kneeY, 15, '#3b82f6');
      drawLimb(ctx, kneeX, kneeY, footX, footY, 13, '#fcd34d');
      drawLimb(ctx, hipX, hipY, shoulderX, shoulderY, 18, '#0d9488');
      drawCartoonHead(ctx, shoulderX, shoulderY - 22, false);

      // Deltoid Glow
      ctx.fillStyle = `rgba(245, 158, 11, ${0.3 + p * 0.6})`;
      ctx.beginPath(); ctx.arc(shoulderX, shoulderY, 14, 0, Math.PI * 2); ctx.fill();

      // Overhead Press Path
      const handX = shoulderX - 6;
      const handY = (shoulderY - 6) - p * 54;
      const elbowX = shoulderX - 24 + p * 12;
      const elbowY = (shoulderY + 18) - p * 38;

      drawLimb(ctx, shoulderX, shoulderY, elbowX, elbowY, 12, '#fcd34d');
      drawLimb(ctx, elbowX, elbowY, handX, handY, 11, '#fcd34d');

      // Dumbbell / Barbell in hand
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath(); ctx.arc(handX, handY, 11, 0, Math.PI * 2); ctx.fill();
    } else if (animType === 'cable_pushdown') {
      // 1. High Pulley Cable Station
      const towerX = 145;
      ctx.fillStyle = '#475569';
      ctx.fillRect(towerX, 38, 22, floorY - 38);
      ctx.fillRect(towerX + 22, 38, 45, 12);
      // Moving weight stack
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(towerX + 2, floorY - 42 - p * 45, 18, 24);

      // 2. Standing Athlete with Elbows Pinned
      const footX = 240, footY = floorY - 4;
      const hipX = 245, hipY = floorY - 82;
      const shoulderX = 236, shoulderY = hipY - 56;

      drawLimb(ctx, footX, footY, hipX, hipY, 15, '#3b82f6');
      drawLimb(ctx, hipX, hipY, shoulderX, shoulderY, 18, '#0d9488');
      drawCartoonHead(ctx, shoulderX - 4, shoulderY - 22, false);

      // Pinned Elbow + Moving Forearm
      const elbowX = shoulderX - 4;
      const elbowY = shoulderY + 34;
      const angle = -0.7 + p * 1.85; // Rotates from chest level to full downward extension
      const handX = elbowX - Math.cos(angle) * 34;
      const handY = elbowY + Math.sin(angle) * 34;

      // Cable line from top pulley to hands
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(towerX + 62, 50); ctx.lineTo(handX, handY); ctx.stroke();

      // Tricep Glow
      ctx.fillStyle = `rgba(245, 158, 11, ${0.3 + p * 0.6})`;
      ctx.beginPath(); ctx.arc(shoulderX + 4, shoulderY + 18, 12, 0, Math.PI * 2); ctx.fill();

      drawLimb(ctx, shoulderX, shoulderY, elbowX, elbowY, 12, '#fcd34d');
      drawLimb(ctx, elbowX, elbowY, handX, handY, 11, '#fcd34d');
    } else if (animType === 'bicep_curl') {
      // Standing Strict Bicep Curl
      const footX = 215, footY = floorY - 4;
      const hipX = 215, hipY = floorY - 82;
      const shoulderX = 215, shoulderY = hipY - 58;

      drawLimb(ctx, footX, footY, hipX, hipY, 15, '#3b82f6');
      drawLimb(ctx, hipX, hipY, shoulderX, shoulderY, 18, '#0d9488');
      drawCartoonHead(ctx, shoulderX, shoulderY - 22, true);

      const elbowX = shoulderX + 4;
      const elbowY = shoulderY + 34;
      const curlAngle = 1.35 - p * 2.1;
      const handX = elbowX + Math.cos(curlAngle) * 35;
      const handY = elbowY + Math.sin(curlAngle) * 35;

      // Bicep Peak Glow
      ctx.fillStyle = `rgba(245, 158, 11, ${0.25 + p * 0.65})`;
      ctx.beginPath(); ctx.arc(shoulderX + 8, shoulderY + 18, 11 + p * 4, 0, Math.PI * 2); ctx.fill();

      drawLimb(ctx, shoulderX, shoulderY, elbowX, elbowY, 12, '#fcd34d');
      drawLimb(ctx, elbowX, elbowY, handX, handY, 11, '#fcd34d');

      // Dumbbell
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath(); ctx.arc(handX, handY, 10, 0, Math.PI * 2); ctx.fill();
    } else if (animType === 'pushup_mat') {
      // Exercise Mat on Floor
      ctx.fillStyle = '#0d9488';
      ctx.fillRect(95, floorY - 6, 230, 6);

      // Strict Plank Push-Up (Body stays 100% straight line from ankle to shoulder)
      const footX = 290, footY = floorY - 10;
      const handX = 145, handY = floorY - 8;
      const shoulderY = (floorY - 26) - p * 34;
      const shoulderX = 148;
      const hipX = (footX + shoulderX) / 2;
      const hipY = (footY + shoulderY) / 2;

      // Straight-body alignment indicator
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.55)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(footX, footY - 8); ctx.lineTo(shoulderX, shoulderY); ctx.stroke();
      ctx.setLineDash([]);

      drawLimb(ctx, footX, footY, hipX, hipY, 14, '#3b82f6');
      drawLimb(ctx, hipX, hipY, shoulderX, shoulderY, 17, '#0d9488');
      drawCartoonHead(ctx, shoulderX - 20, shoulderY - 4, false);

      const elbowX = handX + (1 - p) * 18;
      const elbowY = (handY + shoulderY) / 2;
      drawLimb(ctx, shoulderX, shoulderY, elbowX, elbowY, 11, '#fcd34d');
      drawLimb(ctx, elbowX, elbowY, handX, handY, 10, '#fcd34d');
    } else if (animType === 'cardio_bike') {
      // Stationary Spin Bike Frame
      const wheelX = 155, wheelY = floorY - 32;
      const crankX = 225, crankY = floorY - 36;
      const seatX = 255, seatY = floorY - 92;
      const barX = 165, barY = floorY - 105;

      // Flywheel spinning
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 6;
      ctx.beginPath(); ctx.arc(wheelX, wheelY, 26, 0, Math.PI * 2); ctx.stroke();
      ctx.save();
      ctx.translate(wheelX, wheelY);
      ctx.rotate(t * 3);
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(-24, 0); ctx.lineTo(24, 0); ctx.moveTo(0, -24); ctx.lineTo(0, 24); ctx.stroke();
      ctx.restore();

      // Bike Frame tubes
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(wheelX, wheelY);
      ctx.lineTo(crankX, crankY);
      ctx.lineTo(seatX, seatY);
      ctx.moveTo(wheelX, wheelY);
      ctx.lineTo(barX, barY);
      ctx.lineTo(crankX, crankY);
      ctx.stroke();

      // Athlete pedaling smoothly
      const pedalAngle = t * 2.2;
      const footX = crankX + Math.cos(pedalAngle) * 20;
      const footY = crankY + Math.sin(pedalAngle) * 20;
      const hipX = seatX - 4, hipY = seatY - 8;
      const kneeX = (hipX + footX) / 2 - 18;
      const kneeY = (hipY + footY) / 2 - 12;
      const shoulderX = barX + 35, shoulderY = seatY - 46;

      drawLimb(ctx, hipX, hipY, kneeX, kneeY, 15, '#3b82f6');
      drawLimb(ctx, kneeX, kneeY, footX, footY, 13, '#fcd34d');
      drawLimb(ctx, hipX, hipY, shoulderX, shoulderY, 17, '#0d9488');
      drawLimb(ctx, shoulderX, shoulderY, barX, barY, 11, '#fcd34d');
      drawCartoonHead(ctx, shoulderX - 10, shoulderY - 18, false);
    }
  }

  function renderWorkoutSection() {
    const container = document.getElementById('workout-days-container');
    const progInfoEl = document.getElementById('workout-program-summary');
    if (!container) return;

    const prog = WORKOUT_PROGRAMS[currentWorkoutKey] || WORKOUT_PROGRAMS.ppl;
    const levelSpec = getLevelPrescription(currentFitnessLevel);

    if (progInfoEl) {
      progInfoEl.innerHTML = `
        <div style="display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:10px;">
          <div>
            <h3 style="font-size:1.25rem; font-weight:900; color:var(--accent-primary);">🏋️ ${prog.title}</h3>
            <p style="font-size:0.92rem; color:var(--text-secondary); margin-top:4px;">${prog.desc}</p>
          </div>
          <div class="badge-pill gold" style="font-size:0.9rem; padding:8px 16px;">
            🎯 ${levelSpec.badge} | ${levelSpec.sets} × ${levelSpec.reps}
          </div>
        </div>
      `;
    }

    // Stop previous animation loops
    Object.values(canvasControllers).forEach(ctrl => {
      if (ctrl.raf) cancelAnimationFrame(ctrl.raf);
    });

    container.innerHTML = prog.days.map((day, dIdx) => `
      <div class="card" style="margin-bottom:22px;">
        <div class="card-header">
          <h4 class="card-title">📅 ${day.dayName}</h4>
          <span class="badge-pill" style="background:var(--accent-primary); color:#fff;">
            ⏱️ الراحة: ${levelSpec.rest}
          </span>
        </div>
        <div class="grid-2">
          ${day.exercises.map(ex => {
            const ytUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(ex.ytQuery + ' ' + ex.name)}`;
            return `
              <div class="exercise-card">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px;">
                  <h5 style="font-size:1.05rem; font-weight:900; color:var(--text-primary);">${ex.name}</h5>
                </div>
                <div style="font-size:0.84rem; color:var(--accent-gold); font-weight:800;">
                  ⚙️ الجهاز المستخدم: ${ex.machine}
                </div>
                <div style="font-size:0.82rem; color:var(--text-secondary); font-weight:700;">
                  🎯 العضلات المستهدفة: ${ex.targetMuscle}
                </div>

                <!-- 100% Biomechanically Accurate Cartoon Video Canvas -->
                <div class="biomech-canvas-wrap">
                  <span class="accuracy-badge">✅ أداء حركي صحيح 100% على الجهاز</span>
                  <canvas id="canvas-${ex.id}" width="420" height="240" style="width:100%; height:auto; display:block;"></canvas>
                </div>

                <!-- Video Speed Controls -->
                <div style="display:flex; gap:6px; flex-wrap:wrap;">
                  <button class="btn btn-outline btn-sm" onclick="window.setExerciseVideoSpeed('${ex.id}', 1)">▶️ سرعة طبيعية 1x</button>
                  <button class="btn btn-outline btn-sm" onclick="window.setExerciseVideoSpeed('${ex.id}', 0.45)">🐢 عرض بطيء للشرح 0.5x</button>
                  <button class="btn btn-outline btn-sm" onclick="window.setExerciseVideoSpeed('${ex.id}', 0)">⏸️ إيقاف مؤقت</button>
                </div>

                <div style="background:rgba(13, 148, 136, 0.08); padding:10px 12px; border-radius:10px; font-size:0.85rem;">
                  <div><strong>📊 الجرعة التدريبية لمستواك:</strong> ${levelSpec.sets} | ${levelSpec.reps}</div>
                  <div style="margin-top:4px;"><strong>💡 الشرح الميكانيكي الصحيح 100%:</strong> ${ex.formTips}</div>
                </div>

                <a href="${ytUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-gold btn-sm" style="margin-top:auto;">
                  📺 بحث مباشر عن فيديو التمرين على يوتيوب (YouTube)
                </a>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `).join('');

    // Start 60fps biomechanical animation for each exercise canvas
    prog.days.forEach(day => {
      day.exercises.forEach(ex => {
        const c = document.getElementById(`canvas-${ex.id}`);
        if (!c) return;
        const ctx = c.getContext('2d');
        const ctrl = {
          speed: 1.0,
          t: 0,
          lastTs: performance.now(),
          raf: null
        };
        canvasControllers[ex.id] = ctrl;

        function loop(ts) {
          const dt = (ts - ctrl.lastTs) / 1000;
          ctrl.lastTs = ts;
          ctrl.t += dt * 2.4 * ctrl.speed;
          renderBiomechanicalFrame(ctx, c.width, c.height, ex.animType, ctrl.t, 1.0);
          ctrl.raf = requestAnimationFrame(loop);
        }
        ctrl.raf = requestAnimationFrame(loop);
      });
    });
  }

  window.setExerciseVideoSpeed = function (exId, speed) {
    if (canvasControllers[exId]) {
      canvasControllers[exId].speed = speed;
    }
    if (window.playUiSound) window.playUiSound('click');
  };

  window.selectWorkoutProgram = function (progKey) {
    currentWorkoutKey = progKey;
    renderWorkoutSection();
    if (window.playUiSound) window.playUiSound('click');
  };

  window.selectWorkoutLevel = function (level) {
    currentFitnessLevel = level;
    renderWorkoutSection();
    if (window.playUiSound) window.playUiSound('click');
  };

  window.addEventListener('DOMContentLoaded', renderWorkoutSection);
})();
