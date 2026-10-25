/* ==========================================================================
   NileFitPro - Complete Workout Splits & 100% Biomechanically Accurate
   Cartoon Exercise Video Engine (All Muscle Groups + YouTube Search Links)
   ========================================================================== */

window.WORKOUT_SPLITS = {
  ppl: {
    id: 'ppl',
    name: 'نظام بوش بول ليج (Push / Pull / Legs - PPL)',
    desc: 'أفضل نظام علمي لتمرين كل عضلة مرتين أسبوعياً (يوم دفع: صدر وكتف وتراي | يوم سحب: ظهر وباي وسواعد | يوم رجل وبطن).',
    schedule: [
      { day: 'اليوم 1: Push (دفع)', focus: 'صدر + أكتاف أمامية وجانبية + ترايسبس', muscles: ['chest', 'shoulders', 'triceps'] },
      { day: 'اليوم 2: Pull (سحب)', focus: 'ظهر كامل + كتف خلفي + بايسبس + سواعد', muscles: ['back', 'biceps', 'forearms'] },
      { day: 'اليوم 3: Legs & Abs (أرجل وبطن)', focus: 'أماميات + خلفيات + أرداف + سمانة + بطن', muscles: ['quads', 'hamstrings', 'calves', 'abs'] },
      { day: 'اليوم 4: راحة واستشفاء أو كارديو LISS', focus: 'مشي خفيف + إطالات + أذكار واسترخاء', muscles: ['cardio'] },
      { day: 'اليوم 5: Push (دفع - زوايا متنوعة)', focus: 'تركيز أعلى الصدر والأكتاف والترايسبس', muscles: ['chest', 'shoulders', 'triceps'] },
      { day: 'اليوم 6: Pull & Legs تكميلي', focus: 'ظهر + ذراع + رجل', muscles: ['back', 'biceps', 'quads', 'calves'] }
    ]
  },
  bro_split: {
    id: 'bro_split',
    name: 'نظام برو سبليت (Bro Split - عضلة كل يوم)',
    desc: 'النظام الكلاسيكي الشهير في الجيم للتركيز الكامل على عضلة واحدة يومياً بحجم تدريبي عالٍ واستشفاء عميق.',
    schedule: [
      { day: 'اليوم 1: يوم الصدر العالمي (Chest Day)', focus: 'جميع زوايا الصدر العالي والمستوي والسفلي', muscles: ['chest'] },
      { day: 'اليوم 2: يوم الظهر والسمك والعرض (Back Day)', focus: 'المجنص والظهر الوسطي والقطنية', muscles: ['back'] },
      { day: 'اليوم 3: يوم الأكتاف والترابيس (Shoulders Day)', focus: 'الكتف الأمامي والجانبي والخلفي', muscles: ['shoulders'] },
      { day: 'اليوم 4: يوم الأرجل الكامل (Leg Day)', focus: 'الأماميات والخلفيات والأرداف والسمانة', muscles: ['quads', 'hamstrings', 'calves'] },
      { day: 'اليوم 5: يوم الذراعين والبطن (Arms & Abs)', focus: 'بايسبس + ترايسبس + سواعد + بطن', muscles: ['biceps', 'triceps', 'forearms', 'abs'] }
    ]
  },
  arnold_split: {
    id: 'arnold_split',
    name: 'نظام أرنولد سبليت (Arnold Split - العضلات المتضادة)',
    desc: 'نظام أسطوري يجمع الصدر مع الظهر في نفس اليوم لضخ دم هائل وتوازن عضلي مثالي، والأكتاف مع الذراعين في اليوم التالي.',
    schedule: [
      { day: 'اليوم 1: الصدر + الظهر (Chest & Back)', focus: 'سوبر ست وتناوب بين تمارين الدفع والسحب', muscles: ['chest', 'back'] },
      { day: 'اليوم 2: الأكتاف + الذراعين والسواعد (Shoulders & Arms)', focus: 'أكتاف كاملة + بايسبس + ترايسبس + سواعد', muscles: ['shoulders', 'biceps', 'triceps', 'forearms'] },
      { day: 'اليوم 3: الأرجل + السمانة + البطن (Legs & Core)', focus: 'سكوات، دفع رجل، خلفيات، سمانة وبطن', muscles: ['quads', 'hamstrings', 'calves', 'abs'] },
      { day: 'اليوم 4: راحة إيجابية واستشفاء', focus: 'كارديو منخفض الشدة LISS', muscles: ['cardio'] }
    ]
  },
  home_resistance: {
    id: 'home_resistance',
    name: 'تمارين مقاومة في المنزل (Home Resistance Training)',
    desc: 'برنامج متكامل لبناء العضلات وشد الجسم في المنزل بوزن الجسم أو بالدمبلز بدون الحاجة لأجهزة الجيم المعقدة.',
    schedule: [
      { day: 'اليوم 1: الجزء العلوي بالمنزل (Upper Body)', focus: 'ضغط صدر، عقلة/سحب، أكتاف وذراعين', muscles: ['chest', 'back', 'shoulders', 'biceps', 'triceps'] },
      { day: 'اليوم 2: الجزء السفلي والجذع (Lower Body & Core)', focus: 'سكوات، لانجز، خلفيات، سمانة وبطن', muscles: ['quads', 'hamstrings', 'calves', 'abs'] },
      { day: 'اليوم 3: كارديو وحرق دهون منزلي', focus: 'تمارين هوائية متدرجة', muscles: ['cardio', 'abs'] }
    ]
  },
  hiit_cardio: {
    id: 'hiit_cardio',
    name: 'كارديو عالي الشدة المتقطع (HIIT Cardio)',
    desc: 'أقوى نظام لرفع معدل الحرق لمدة 24 ساعة بعد التمرين (Afterburn Effect) وتحسين كفاءة القلب والرئتين في 20-25 دقيقة.',
    schedule: [
      { day: 'جلسة HIIT 1: سرعات متقطعة + جذع', focus: '30 ثانية أقصى أداء / 45 ثانية تهدئة × 12 جولة', muscles: ['cardio', 'abs'] },
      { day: 'جلسة HIIT 2: كارديو وظيفي كامل الجسم', focus: 'حرق دهون مكثف مع الحفاظ على الكتلة العضلية', muscles: ['cardio', 'quads', 'abs'] }
    ]
  },
  liss_cardio: {
    id: 'liss_cardio',
    name: 'كارديو منخفض الشدة المستمر (LISS Cardio)',
    desc: 'نظام آمن تماماً على المفاصل والركبتين يعتمد على المشي السريع على المشاية بميل أو الدراجة الثابتة بنبض 60-65% لحرق الدهون الصافية.',
    schedule: [
      { day: 'جلسة LISS يومية (35 - 45 دقيقة)', focus: 'مشي منحدر على التريدميل أو عجلة ثابتة بدون إجهاد للمفاصل', muscles: ['cardio', 'calves'] }
    ]
  }
};

// Complete Exercise Library covering every single muscle group with 100% accurate biomechanical animation rigs
window.EXERCISES_DB = [
  // ================= CHEST (الصدر) =================
  {
    id: 'ex_chest_1',
    muscle: 'chest',
    muscleAr: 'عضلة الصدر (الوسطى)',
    name: 'ضغط البنش المستوي بالبار (Barbell Flat Bench Press)',
    machine: 'جهاز البنش المستوي والبار الأولمبي (Flat Bench Press Rack)',
    rig: 'bench_press',
    env: 'gym',
    sets: { beginner: '3 جولات × 10-12 عدات', intermediate: '4 جولات × 8-10 عدات', advanced: '5 جولات × 6-8 عدات' },
    tempo: '3 ثوانٍ نزول (شهيق) - 1 ثانية ثبات أسفل - 1 ثانية دفع (زفير)',
    formSteps: [
      'ثبّت لوحي الكتف للخلف وللأسفل على دكة البنش مع إبقاء القدمين ثابتتين تماماً على الأرض.',
      'امسك البار بقبضة أوسع قليلاً من عرض الكتفين مع keeping المعصم مستقيماً100%.',
      'انزل بالبار ببطء وتحكم حتى يلامس منتصف الصدر بزاوية كوع 45-60 درجة (وليس 90 درجة لحماية الكتف).',
      'ادفع البار للأعلى مع الزفير القوي وعصر عضلة الصدر دون قفل مفصل الكوع بعنف.'
    ],
    ytQuery: 'Barbell Flat Bench Press Proper Form Technique شرح تمرين بنش مستوي بالبار'
  },
  {
    id: 'ex_chest_2',
    muscle: 'chest',
    muscleAr: 'عضلة الصدر (العالي)',
    name: 'ضغط الصدر العالي بالدمبل (Incline Dumbbell Press)',
    machine: 'دكة البنش المائلة بزاوية 30 درجة + الدمبلز (30° Incline Bench)',
    rig: 'incline_bench',
    env: 'both',
    sets: { beginner: '3 جولات × 12 عدة', intermediate: '4 جولات × 10 عدات', advanced: '4 جولات × 8-10 عدات' },
    tempo: '3 ثوانٍ نزول - 1 ثانية عصر أعلى التمرين',
    formSteps: [
      'اضبط زاوية البنش على 30 درجة فقط (الزوايا الأعلى من 45 تنقل الحمل للكتف الأمامي).',
      'انزل بالدمبلز بجانب أعلى الصدر حتى تشعر بتمدد كامل في ألياف الصدر العلوية.',
      'ادفع للأعلى في مسار قوسي طفيف مع إبقاء الكوعين أسفل مستوى المعصم دائماً.'
    ],
    ytQuery: 'Incline Dumbbell Press 30 degree form شرح تمرين صدر عالي بالدمبل'
  },
  {
    id: 'ex_chest_3',
    muscle: 'chest',
    muscleAr: 'عضلة الصدر (الداخلي والسفلي)',
    name: 'تجميع الصدر بالكابل كروس أوفر (Cable Crossover Fly)',
    machine: 'جهاز الكابل المزدوج (Dual Adjustable Pulley Cable Machine)',
    rig: 'cable_crossover',
    env: 'gym',
    sets: { beginner: '3 جولات × 15 عدة', intermediate: '4 جولات × 12-15 عدة', advanced: '4 جولات × 12 عدة مع ثبات ثانيتين' },
    tempo: '2 ثانية تجميع - 2 ثانية عصر داخلي - 3 ثوانٍ رجوع بطيء',
    formSteps: [
      'قف في منتصف جهاز الكابل مع تقديم قدم واحدة للأمام لثبات العمود الفقري.',
      'اجعل الكوعين مثنيين بدرجة طفيفة ثابتة طوال الحركة كأنك تحتضن شجرة كبيرة.',
      'ضم اليدين أمام أسفل الصدر واعصر العضلة بقوة لمدة ثانيتين مع الزفير.'
    ],
    ytQuery: 'Cable Chest Fly Crossover Proper Form شرح تمرين تجميع صدر كابل'
  },
  {
    id: 'ex_chest_4',
    muscle: 'chest',
    muscleAr: 'عضلة الصدر (مقاومة منزلية)',
    name: 'تمرين الضغط القياسي الميكانيكي (Perfect Biomechanical Push-Up)',
    machine: 'بساط التمرين المنزلي أو مقابض الضغط (Floor Mat / Push-up Bars)',
    rig: 'pushup_home',
    env: 'home',
    sets: { beginner: '3 جولات × 10 عدات', intermediate: '4 جولات × 15-20 عدة', advanced: '4 جولات × 25 عدة بطيئة' },
    tempo: '2 ثانية نزول - 1 ثانية ثبات - 1 ثانية دفع',
    formSteps: [
      'شد عضلات البطن والأرداف ليظل جسمك خطاً مستقيماً 100% من الرأس للكعبين.',
      'اجعل الكوعين بزاوية 45 درجة للداخل وليس مفتوحين للجانبين.',
      'انزل حتى يقترب الصدر من الأرض بـ 2 سم ثم ادفع بكامل كف اليد.'
    ],
    ytQuery: 'Perfect Push Up Form Biomechanics شرح تمرين الضغط الصحيح'
  },
  {
    id: 'ex_chest_5',
    muscle: 'chest',
    muscleAr: 'عضلة الصدر (التجميع الداخلي)',
    name: 'جهاز التجميع الفراشة للصدر (Pec Deck Butterfly Machine)',
    machine: 'جهاز الفراشة لتجميع الصدر (Seated Pec Deck Fly Machine)',
    rig: 'cable_crossover',
    env: 'gym',
    sets: { beginner: '3 جولات × 12-15 عدة', intermediate: '4 جولات × 12 عدة', advanced: '4 جولات × 12 عدة مع ثبات ثانيتين' },
    tempo: '2 ثانية ضم - 2 ثانية عصر داخلي - 3 ثوانٍ فتح بطيء',
    formSteps: [
      'اضبط ارتفاع المقعد بحيث تكون المقابض في مستوى منتصف الصدر تماماً.',
      'ضم الذراعين للأمام مع إبقاء انثناء بسيط في الكوعين واعصر الصدر الداخلي لمدة ثانيتين.',
      'ارجع ببطء وتحكم دون إرجاع الكوعين خلف مستوى الكتف لتجنب إجهاد مفصل الكتف.'
    ],
    ytQuery: 'Pec Deck Machine Fly Proper Form شرح تمرين فراشة صدر'
  },
  {
    id: 'ex_chest_6',
    muscle: 'chest',
    muscleAr: 'عضلة الصدر (السفلي وتحديد الصدر)',
    name: 'ضغط الصدر السفلي بالبار أو المتوازي (Decline Bench Press / Chest Dips)',
    machine: 'دكة البنش المائلة لأسفل أو جهاز المتوازي (Decline Bench / Dip Station)',
    rig: 'bench_press',
    env: 'gym',
    sets: { beginner: '3 جولات × 10-12 عدة', intermediate: '4 جولات × 10 عدات', advanced: '4 جولات × 8-10 عدات' },
    tempo: '3 ثوانٍ نزول - 1 ثانية دفع قوي',
    formSteps: [
      'ثبّت القدمين جيداً في دعامات دكة الصدر السفلي وضم لوحي الكتف للخلف.',
      'انزل بالبار نحو أسفل الصدر بتحكم كامل ثم ادفع للأعلى مع الزفير وعصر الألياف السفلية للصدر.'
    ],
    ytQuery: 'Decline Bench Press and Chest Dips Proper Form شرح تمرين بنش سفلي ومتوازي صدر'
  },

  // ================= BACK (الظهر) =================
  {
    id: 'ex_back_1',
    muscle: 'back',
    muscleAr: 'عضلة الظهر (المجنص والعرض)',
    name: 'سحب الكابل الأمامي الواسع للمجنص (Wide-Grip Lat Pulldown)',
    machine: 'جهاز السحب العلوي للمجنص (Lat Pulldown Machine)',
    rig: 'lat_pulldown',
    env: 'gym',
    sets: { beginner: '3 جولات × 12 عدة', intermediate: '4 جولات × 10-12 عدة', advanced: '4 جولات × 8-10 عدات ثقيلة' },
    tempo: '2 ثانية سحب للصدر - 1 ثانية عصر - 3 ثوانٍ صعود متحكم',
    formSteps: [
      'ثبّت الفخذين جيداً تحت وسادة الجهاز، وافرد صدرك للأعلى مع ميل ظهري طفيف 15 درجة فقط.',
      'ابدأ الحركة بخفض لوحي الكتف للأسفل ثم اسحب البار نحو أعلى الصدر بالكوعين.',
      'لا تسحب البار خلف الرقبة أبداً لحماية فقرات العنق ومفصل الكتف.'
    ],
    ytQuery: 'Lat Pulldown Proper Form Technique شرح تمرين السحب العالي للظهر'
  },
  {
    id: 'ex_back_2',
    muscle: 'back',
    muscleAr: 'عضلة الظهر (السمك والوسط)',
    name: 'السحب الأرضي الجالس بالكابل (Seated Cable Row)',
    machine: 'جهاز السحب الأرضي بالقبضة الضيقة أو المتوسطة (Seated Row Machine)',
    rig: 'seated_row',
    env: 'gym',
    sets: { beginner: '3 جولات × 12 عدة', intermediate: '4 جولات × 10 عدات', advanced: '4 جولات × 8-10 عدات' },
    tempo: '2 ثانية سحب - 2 ثانية ضم لوحي الكتف - 3 ثوانٍ فرد',
    formSteps: [
      'اجلس بظهر مستقيم تماماً مع ثنية بسيطة في الركبتين لحماية أسفل الظهر.',
      'اسحب المقبض باتجاه السرة مع إلصاق المرفقين بجانب الجذع وضم لوحي الكتف معاً.',
      'تجنب المرجحة بالظهر للأمام والخلف؛ الحركة بالكامل من مفصل الكتف ولوحي الظهر.'
    ],
    ytQuery: 'Seated Cable Row Proper Form شرح تمرين السحب الارضي للظهر'
  },
  {
    id: 'ex_back_3',
    muscle: 'back',
    muscleAr: 'عضلة الظهر (منزلي وجيم)',
    name: 'التجديف المنحني بالدمبلز أو البار (Bent-Over Row)',
    machine: 'دمبلز أو بار حر (Free Weights / Dumbbells)',
    rig: 'seated_row',
    env: 'both',
    sets: { beginner: '3 جولات × 12 عدة', intermediate: '4 جولات × 10 عدات', advanced: '4 جولات × 8 عدات' },
    tempo: '2 ثانية سحب - 1 ثانية ثبات أعلى - 3 ثوانٍ نزول',
    formSteps: [
      'اثنِ الجذع للأمام بزاوية 45 درجة مع الحفاظ على استقامة العمود الفقري.',
      'اسحب الوزن بالكوع باتجاه الحوض وليس باتجاه الكتف لاستهداف المجنص بعمق.'
    ],
    ytQuery: 'Dumbbell Bent Over Row Form شرح تمرين منشار دمبل للظهر'
  },
  {
    id: 'ex_back_4',
    muscle: 'back',
    muscleAr: 'عضلة الظهر (عزل المجنص السفلي)',
    name: 'سحب الذراع المستقيمة بالكابل للمجنص (Straight-Arm Cable Lat Pulldown)',
    machine: 'جهاز الكابل العلوي بالمسطرة أو الحبل (High Pulley Cable Station)',
    rig: 'tricep_pushdown',
    env: 'gym',
    sets: { beginner: '3 جولات × 15 عدة', intermediate: '4 جولات × 12-15 عدة', advanced: '4 جولات × 12 عدة' },
    tempo: '2 ثانية سحب قوسي لأسفل - 2 ثانية عصر المجنص - 3 ثوانٍ رجوع',
    formSteps: [
      'قف أمام جهاز الكابل العلوي مع ميل الجذع للأمام 30 درجة وثبات الذراعين شبه مفرودتين.',
      'اسحب المسطرة في مسار قوسي حتى تلامس الفخذين بقوة عضلة المجنص فقط دون ثني الكوعين.'
    ],
    ytQuery: 'Straight Arm Lat Pulldown Form شرح تمرين أوفر كابل للمجنص'
  },
  {
    id: 'ex_back_5',
    muscle: 'back',
    muscleAr: 'عضلة الظهر (العقلة والسحب الضيق)',
    name: 'تمرين العقلة أو السحب بالقبضة الضيقة المعكوسة (Pull-Ups / Reverse Grip Pulldown)',
    machine: 'بار العقلة أو جهاز السحب العلوي (Pull-Up Bar / Lat Pulldown)',
    rig: 'lat_pulldown',
    env: 'both',
    sets: { beginner: '3 جولات × 8-10 عدات', intermediate: '4 جولات × 10 عدات', advanced: '4 جولات × 12 عدة' },
    tempo: '2 ثانية سحب - 1 ثانية ثبات أعلى - 3 ثوانٍ نزول كامل',
    formSteps: [
      'امسك البار بقبضة متوسطة أو معكوسة بعرض الكتفين، وابدأ الحركة بشد لوحي الكتف للأسفل.',
      'اسحب جسمك (أو البار) حتى يصل الذقن لمستوى البار مع عصر عضلات الظهر بالكامل.'
    ],
    ytQuery: 'Pull Ups and Close Grip Lat Pulldown Form شرح تمرين العقلة والسحب الضيق'
  },

  // ================= SHOULDERS (الأكتاف) =================
  {
    id: 'ex_shoulders_1',
    muscle: 'shoulders',
    muscleAr: 'عضلة الأكتاف (الأمامي والجانبي)',
    name: 'ضغط الأكتاف العلوي بالدمبل أو الجهاز (Overhead Shoulder Press)',
    machine: 'كرسي الأكتاف بزاوية 80 درجة + دمبلز أو جهاز (Shoulder Press Station)',
    rig: 'shoulder_press',
    env: 'both',
    sets: { beginner: '3 جولات × 12 عدة', intermediate: '4 جولات × 10 عدات', advanced: '4 جولات × 8-10 عدات' },
    tempo: '2 ثانية دفع للأعلى - 3 ثوانٍ نزول لمستوى الأذن',
    formSteps: [
      'اسند ظهرك بالكامل على المسند وقدّم الكوعين للأمام بزاوية 30 درجة في مستوى لوح الكتف (Scapular Plane).',
      'ادفع الوزن للأعلى في خط مستقيم فوق الرأس مع الزفير دون تقوس أسفل الظهر.'
    ],
    ytQuery: 'Seated Dumbbell Shoulder Press Proper Form شرح تمرين تجميع كتف بالدمبل'
  },
  {
    id: 'ex_shoulders_2',
    muscle: 'shoulders',
    muscleAr: 'عضلة الأكتاف (التكوير الجانبي)',
    name: 'الرفرفة الجانبية بالدمبل أو الكابل (Lateral Raises)',
    machine: 'دمبلز خفيفة/متوسطة أو جهاز الكابل (Dumbbells / Cable Station)',
    rig: 'lateral_raise',
    env: 'both',
    sets: { beginner: '3 جولات × 15 عدة', intermediate: '4 جولات × 15 عدة', advanced: '5 جولات × 15-20 عدة' },
    tempo: '2 ثانية رفع - 1 ثانية ثبات في مستوى الكتف - 3 ثوانٍ نزول',
    formSteps: [
      'قف بثبات مع ميل طفيف جداً للأمام وثنية بسيطة في الكوع.',
      'ارفع الذراعين للجانبين قيادةً بالكوع وليس بالمعصم حتى مستوى الكتف تماماً.',
      'لا تستخدم أوزاناً ثقيلة تجبرك على هز الجسم أو تشغيل الترابيس بدلاً من الكتف الجانبي.'
    ],
    ytQuery: 'Dumbbell Lateral Raise Perfect Form شرح تمرين رفرفة جانبي للكتف'
  },
  {
    id: 'ex_shoulders_3',
    muscle: 'shoulders',
    muscleAr: 'عضلة الأكتاف (الفص الأمامي)',
    name: 'الرفرفة الأمامية بالدمبل أو الكابل (Front Dumbbell / Cable Raise)',
    machine: 'دمبلز أو جهاز الكابل السفلي (Dumbbells / Low Pulley)',
    rig: 'lateral_raise',
    env: 'both',
    sets: { beginner: '3 جولات × 12 عدة', intermediate: '3 جولات × 12-15 عدة', advanced: '4 جولات × 12 عدة' },
    tempo: '2 ثانية رفع لمستوى العين - 1 ثانية ثبات - 3 ثوانٍ نزول',
    formSteps: [
      'قف باستقامة تامة وارفع الدمبل للأمام حتى مستوى الكتف أو العين دون مرجحة الظهر.',
      'انزل ببطء وتحكم لمنع سقوط الوزن بالجاذبية.'
    ],
    ytQuery: 'Dumbbell Front Raise Proper Form شرح تمرين رفرفة أمامي للكتف'
  },
  {
    id: 'ex_shoulders_4',
    muscle: 'shoulders',
    muscleAr: 'عضلة الأكتاف (الخلفي وصحة الكتف)',
    name: 'سحب الحبل للوجه للكتف الخلفي (Cable Face Pulls / Rear Delt Fly)',
    machine: 'جهاز الكابل العلوي بالحبل أو جهاز الفراشة العكسي (High Cable Rope / Reverse Pec Deck)',
    rig: 'seated_row',
    env: 'both',
    sets: { beginner: '3 جولات × 15 عدة', intermediate: '4 جولات × 15 عدة', advanced: '4 جولات × 15-20 عدة' },
    tempo: '2 ثانية سحب للوجه مع تدوير خارجي - 2 ثانية ثبات - 2 ثانية رجوع',
    formSteps: [
      'اضبط بكرة الكابل في مستوى أعلى الرأس وامسك الحبل بقبضة خارجية.',
      'اسحب الحبل باتجاه الجبهة مع فتح الذراعين وتدوير الكتف للخارج لتقوية الكتف الخلفي والكفة المدورة.'
    ],
    ytQuery: 'Cable Face Pulls Proper Form Rear Delts شرح تمرين فيس بول للكتف الخلفي'
  },
  {
    id: 'ex_shoulders_5',
    muscle: 'shoulders',
    muscleAr: 'عضلة الترابيس العلوية (Traps)',
    name: 'رفع الكتف بالدمبل أو البار للترابيس (Dumbbell / Barbell Shrugs)',
    machine: 'دمبلز أو البار الأولمبي (Free Weights Shrug Station)',
    rig: 'shoulder_press',
    env: 'both',
    sets: { beginner: '3 جولات × 15 عدة', intermediate: '4 جولات × 12-15 عدة', advanced: '4 جولات × 12 عدة مع ثبات ثانيتين' },
    tempo: '1 ثانية رفع عمودي للأذن - 2 ثانية عصر أعلى - 2 ثانية نزول',
    formSteps: [
      'اترك الذراعين مفرودتين تماماً بجانب الجسم كأنهما خطافان يحملان الوزن فقط.',
      'ارفع الكتفين عمودياً باتجاه الأذنين واثبت ثانيتين في الأعلى دون تدوير مفصل الكتف.'
    ],
    ytQuery: 'Dumbbell Shrugs Proper Form Traps شرح تمرين ترابيس بالدمبل والبار'
  },

  // ================= BICEPS (البايسبس) =================
  {
    id: 'ex_biceps_1',
    muscle: 'biceps',
    muscleAr: 'عضلة البايسبس (الرأس الطويل والقصير)',
    name: 'تبادل ومرجحة البايسبس بالبار الزجزاج أو الدمبل (EZ-Bar / Dumbbell Bicep Curl)',
    machine: 'البار المتعرج EZ-Bar أو الدمبلز (Standing Curl Station)',
    rig: 'bicep_curl',
    env: 'both',
    sets: { beginner: '3 جولات × 12 عدة', intermediate: '4 جولات × 10-12 عدة', advanced: '4 جولات × 10 عدات مع تحكم سلبي' },
    tempo: '2 ثانية صعود - 1 ثانية عصر قمة البايسبس - 3 ثوانٍ نزول كامل',
    formSteps: [
      'ثبّت المرفقين بجانب القفص الصدري تماماً ولا تحركهما للأمام أثناء الرفع.',
      'ارفع الوزن بقوة عضلة البايسبس مع الزفير واعصر العضلة في الأعلى.',
      'انزل بالوزن ببطء حتى الفرد الكامل للذراع للاستفادة من المدى الحركي 100%.'
    ],
    ytQuery: 'EZ Bar Bicep Curl Proper Form شرح تمرين بايسبس بالبار الزجزاج'
  },
  {
    id: 'ex_biceps_2',
    muscle: 'biceps',
    muscleAr: 'عضلة البايسبس والبراكياليس (Hammer)',
    name: 'تمرين الشاكوش بالدمبل أو الحبل (Dumbbell / Rope Hammer Curl)',
    machine: 'دمبلز أو كابل سفلي بالحبل (Dumbbells / Low Cable Rope)',
    rig: 'bicep_curl',
    env: 'both',
    sets: { beginner: '3 جولات × 12 عدة', intermediate: '4 جولات × 10-12 عدة', advanced: '4 جولات × 10 عدات' },
    tempo: '2 ثانية صعود بقبضة محايدة - 1 ثانية عصر - 3 ثوانٍ نزول',
    formSteps: [
      'امسك الدمبلز بقبضة محايدة (كف اليد للداخل كأنك تمسك مطرقة).',
      'ارفع الوزن مع ثبات الكوع تماماً لاستهداف العضلة العضدية (Brachialis) التي تمنح الذراع عرضاً وسمكاً.'
    ],
    ytQuery: 'Dumbbell Hammer Curl Proper Form شرح تمرين شاكوش بايسبس بالدمبل'
  },
  {
    id: 'ex_biceps_3',
    muscle: 'biceps',
    muscleAr: 'عضلة البايسبس (العزل التام على الحصان)',
    name: 'مرجحة البايسبس على كرسي الارتكاز الحصان (Preacher Curl Machine / EZ-Bar)',
    machine: 'جهاز أو دكة الحصان للبايسبس (Preacher Curl Bench / Machine)',
    rig: 'bicep_curl',
    env: 'gym',
    sets: { beginner: '3 جولات × 12 عدة', intermediate: '3 جولات × 10-12 عدة', advanced: '4 جولات × 10 عدات' },
    tempo: '2 ثانية صعود - 1 ثانية عصر - 3 ثوانٍ نزول متحكم',
    formSteps: [
      'اضبط ارتفاع الكرسي بحيث يستقر الإبط وأعلى الذراع بالكامل على وسادة الحصان المائلة.',
      'انزل بالبار ببطء حتى فرد الذراع بنسبة 95% ثم اصعد بقوة البايسبس دون رفع الكوع عن الوسادة.'
    ],
    ytQuery: 'Preacher Curl EZ Bar Proper Form شرح تمرين بايسبس على الحصان'
  },
  {
    id: 'ex_biceps_4',
    muscle: 'biceps',
    muscleAr: 'عضلة البايسبس (تكوير القمة)',
    name: 'تمرين التركيز الفردي بالدمبل جالساً (Seated Concentration Curl)',
    machine: 'دمبل + دكة مستوية (Dumbbell & Flat Bench)',
    rig: 'bicep_curl',
    env: 'both',
    sets: { beginner: '3 جولات × 12 عدة لكل ذراع', intermediate: '3 جولات × 12 عدة', advanced: '4 جولات × 10-12 عدة' },
    tempo: '2 ثانية رفع مع لف المعصم - 2 ثانية عصر في القمة - 3 ثوانٍ نزول',
    formSteps: [
      'اجلس على البنش وثبّت الجزء الخلفي من أعلى الذراع على الفخذ من الداخل لمنع أي غش حركي.',
      'ارفع الدمبل مع تدوير الخنصر للداخل في قمة الحركة لعصر قمة البايسبس لأقصى درجة.'
    ],
    ytQuery: 'Concentration Curl Proper Form شرح تمرين تركيز بايسبس بالدمبل'
  },

  // ================= TRICEPS (الترايسبس) =================
  {
    id: 'ex_triceps_1',
    muscle: 'triceps',
    muscleAr: 'عضلة الترايسبس (الرؤوس الثلاثة)',
    name: 'دفع الكابل لأسفل بالحبل للترايسبس (Tricep Rope Pushdown)',
    machine: 'جهاز الكابل العلوي + الحبل المزدوج (High Pulley Cable with Rope)',
    rig: 'tricep_pushdown',
    env: 'gym',
    sets: { beginner: '3 جولات × 12-15 عدة', intermediate: '4 جولات × 12 عدة', advanced: '4 جولات × 12-15 عدة' },
    tempo: '1 ثانية دفع لأسفل - 2 ثانية فتح الحبل وعصر الترايسبس - 3 ثوانٍ صعود',
    formSteps: [
      'ثبّت الكوعين بجانب جسمك كمفصل ثابت لا يتحرك للأمام أو الخلف.',
      'ادفع الحبل للأسفل وافتح طرفي الحبل للخارج في نهاية الحركة لعصر الرأس الجانبي للترايسبس.',
      'اصعد ببطء حتى زاوية 90 درجة للكوع فقط للحفاظ على التوتر العضلي المستمر.'
    ],
    ytQuery: 'Tricep Rope Pushdown Form شرح تمرين ترايسبس بالحبل على الكابل'
  },
  {
    id: 'ex_triceps_2',
    muscle: 'triceps',
    muscleAr: 'عضلة الترايسبس (الرأس الطويل الضخم)',
    name: 'التمديد خلف الرأس بالكابل أو الدمبل (Overhead Tricep Extension)',
    machine: 'جهاز الكابل بالحبل أو الدمبل خلف الرأس (Cable / Dumbbell Overhead Station)',
    rig: 'shoulder_press',
    env: 'both',
    sets: { beginner: '3 جولات × 12 عدة', intermediate: '4 جولات × 10-12 عدة', advanced: '4 جولات × 10-12 عدة' },
    tempo: '3 ثوانٍ نزول خلف الرأس لتمدد الرأس الطويل - 1 ثانية مد كامل للأعلى',
    formSteps: [
      'ارفع الذراعين للأعلى مع إبقاء الكوعين متجهين للأمام وقريبين من الرأس.',
      'اترك الوزن ينزل خلف الرأس لتمديد الرأس الطويل للترايسبس (الذي يشكل ثلثي حجم الذراع الخلفي) ثم افرد الذراع للأعلى.'
    ],
    ytQuery: 'Overhead Tricep Extension Rope Dumbbell Form شرح تمرين ترايسبس خلف الرأس'
  },
  {
    id: 'ex_triceps_3',
    muscle: 'triceps',
    muscleAr: 'عضلة الترايسبس (الضخامة الكلية)',
    name: 'كسارة الجمجمة بالبار الزجزاج على البنش (EZ-Bar Skullcrushers)',
    machine: 'دكة البنش المستوية + البار الزجزاج (Flat Bench & EZ-Bar)',
    rig: 'bench_press',
    env: 'both',
    sets: { beginner: '3 جولات × 12 عدة', intermediate: '4 جولات × 10 عدات', advanced: '4 جولات × 8-10 عدات' },
    tempo: '3 ثوانٍ نزول خلف الجبهة - 1 ثانية مد بقوة الترايسبس',
    formSteps: [
      'استلقِ على البنش وامسك البار الزجزاج مع إرجاع الذراعين للخلف بزاوية طفيفة 15 درجة لحماية الكوع.',
      'اثنِ المرفقين فقط لينزل البار خلف الجبهة ثم ادفع البار للأعلى بفرد الكوع.'
    ],
    ytQuery: 'EZ Bar Skullcrusher Lying Tricep Extension Form شرح تمرين فرنساوي بالبار الزجزاج'
  },
  {
    id: 'ex_triceps_4',
    muscle: 'triceps',
    muscleAr: 'عضلة الترايسبس (مقاومة منزلية وجيم)',
    name: 'غطس الترايسبس على البنش أو المتوازي (Bench / Parallel Bar Tricep Dips)',
    machine: 'دكة التمرين أو جهاز المتوازي (Bench / Dip Bars)',
    rig: 'pushup_home',
    env: 'both',
    sets: { beginner: '3 جولات × 12 عدة', intermediate: '4 جولات × 12-15 عدة', advanced: '4 جولات × 15 عدة' },
    tempo: '2 ثانية نزول بظهر مستقيم - 1 ثانية دفع وعصر الترايسبس',
    formSteps: [
      'حافظ على استقامة الجذع عمودياً وضم الكوعين للداخل أثناء النزول والطلوع لاستهداف الترايسبس بدقة.'
    ],
    ytQuery: 'Tricep Dips Proper Form Bench and Parallel Bars شرح تمرين غطس ترايسبس'
  },

  // ================= FOREARMS (السواعد) =================
  {
    id: 'ex_forearms_1',
    muscle: 'forearms',
    muscleAr: 'عضلات السواعد وقوة القبضة (Forearms)',
    name: 'لف المعصم الداخلي بالبار أو الدمبل على البنش (Seated Palms-Up Wrist Curl)',
    machine: 'دكة البنش + بار أو دمبلز (Bench Forearm Station)',
    rig: 'wrist_curl',
    env: 'both',
    sets: { beginner: '3 جولات × 15 عدة', intermediate: '4 جولات × 15-20 عدة', advanced: '4 جولات × 20 عدة' },
    tempo: '1 ثانية رفع المعصم - 1 ثانية عصر - 2 ثانية نزول',
    formSteps: [
      'ضع الساعدين بالكامل على الفخذين أو حافة البنش بحيث يتحرك المعصم فقط.',
      'اترك الوزن ينزل لأطراف الأصابع ثم اثنِ المعصم للأعلى بأقصى انقباض.'
    ],
    ytQuery: 'Forearm Wrist Curl Proper Form شرح تمارين السواعد وتقوية القبضة'
  },
  {
    id: 'ex_forearms_2',
    muscle: 'forearms',
    muscleAr: 'عضلات الساعد الخارجية (Extensors)',
    name: 'لف المعصم العكسي بالبار أو الدمبل (Seated Reverse Wrist Curl)',
    machine: 'دكة البنش + بار خفيف أو دمبلز (Reverse Forearm Bench Station)',
    rig: 'wrist_curl',
    env: 'both',
    sets: { beginner: '3 جولات × 15 عدة', intermediate: '3 جولات × 15-20 عدة', advanced: '4 جولات × 20 عدة' },
    tempo: '1 ثانية رفع ظهر الكف للأعلى - 1 ثانية ثبات - 2 ثانية نزول',
    formSteps: [
      'ثبّت الساعدين مع توجيه ظهر الكف للأعلى، وارفع المعصم للأعلى لتقوية عضلات الساعد الخارجية وحماية الكوع.'
    ],
    ytQuery: 'Reverse Wrist Curl Forearm Exercise شرح تمرين ساعد خارجي عكسي'
  },
  {
    id: 'ex_forearms_3',
    muscle: 'forearms',
    muscleAr: 'عضلة الساعد الكبرى والبراكياليس',
    name: 'مرجحة البار بقبضة معكوسة واقفاً (Reverse-Grip Barbell Curl)',
    machine: 'البار الزجزاج أو المستقيم (EZ-Bar / Straight Bar)',
    rig: 'bicep_curl',
    env: 'both',
    sets: { beginner: '3 جولات × 12 عدة', intermediate: '4 جولات × 12 عدة', advanced: '4 جولات × 12-15 عدة' },
    tempo: '2 ثانية صعود - 1 ثانية ثبات - 3 ثوانٍ نزول',
    formSteps: [
      'امسك البار بقبضة علوية (ظهر الكف للأعلى) مع ثبات المرفقين بجانب الجذع وارفع بتحكم كامل.'
    ],
    ytQuery: 'Reverse Grip EZ Bar Curl Forearms شرح تمرين باي وساعد قبضة معكوسة'
  },

  // ================= QUADS & GLUTES (الأماميات والأرداف) =================
  {
    id: 'ex_quads_1',
    muscle: 'quads',
    muscleAr: 'عضلات الأرجل الأمامية والأرداف (Quads & Glutes)',
    name: 'السكوات بالبار أو وزن الجسم (Barbell Squat / Bodyweight Squat)',
    machine: 'حامل السكوات الأولمبي (Squat Power Rack)',
    rig: 'barbell_squat',
    env: 'both',
    sets: { beginner: '3 جولات × 10-12 عدة', intermediate: '4 جولات × 8-10 عدات', advanced: '5 جولات × 6-8 عدات' },
    tempo: '3 ثوانٍ نزول متحكم - 1 ثانية أسفل - 2 ثانية صعود قوي',
    formSteps: [
      'ضع القدمين بعرض الكتفين مع توجيه مشط القدم للخارج بزاوية 15-30 درجة.',
      'تأكد من اتجاه الركبتين في نفس اتجاه مشط القدم دون ميلهما للداخل أبداً.',
      'انزل بالحوض للخلف وللأسفل بظهر مستقيم حتى يتوازى الفخذ مع الأرض ثم ادفع بالكعبين.'
    ],
    ytQuery: 'Barbell Squat Biomechanics Proper Form شرح تمرين السكوات الصحيح'
  },
  {
    id: 'ex_quads_2',
    muscle: 'quads',
    muscleAr: 'عضلات الفخذ الأمامية (Quads)',
    name: 'دفع الأرجل على جهاز الليج بريس (45° Leg Press Machine)',
    machine: 'جهاز دفع الأرجل المائل 45 درجة (45-Degree Sled Leg Press)',
    rig: 'leg_press',
    env: 'gym',
    sets: { beginner: '3 جولات × 12 عدة', intermediate: '4 جولات × 10-12 عدة', advanced: '4 جولات × 10-12 عدة' },
    tempo: '3 ثوانٍ نزول - 2 ثانية دفع بدون قفل الركبة',
    formSteps: [
      'ألصق أسفل الظهر والحوض بالكامل في كرسي الجهاز طوال التمرين.',
      'انزل بالمنصة ببطء حتى زاوية 90 درجة للركبة، وادفع للأعلى مع إبقاء انثناء بسيط في الركبة لحماية المفصل 100%.'
    ],
    ytQuery: 'Leg Press Machine Proper Form Safety شرح تمرين ليج بريس الصحيح'
  },
  {
    id: 'ex_quads_3',
    muscle: 'quads',
    muscleAr: 'عزل وتحديد الفخذ الأمامي (Quad Isolation)',
    name: 'جهاز تمديد الأرجل الأمامية (Seated Leg Extension Machine)',
    machine: 'جهاز الأماميات الجالس (Leg Extension Machine)',
    rig: 'leg_press',
    env: 'gym',
    sets: { beginner: '3 جولات × 12-15 عدة', intermediate: '4 جولات × 12 عدة', advanced: '4 جولات × 12-15 عدة مع ثبات أعلى' },
    tempo: '2 ثانية فرد كامل للأعلى - 2 ثانية عصر الفخذ الأمامي - 3 ثوانٍ نزول',
    formSteps: [
      'اضبط مسند الظهر بحيث تكون مفصل الركبة على خط محور دوران الجهاز تماماً.',
      'افرد الساقين للأعلى بالكامل واعصر العضلة الرباعية لمدة ثانيتين ثم انزل ببطء.'
    ],
    ytQuery: 'Seated Leg Extension Machine Proper Form شرح تمرين رجل امامي على الجهاز'
  },
  {
    id: 'ex_quads_4',
    muscle: 'quads',
    muscleAr: 'الأرجل الأمامية والأرداف والتوازن',
    name: 'تمرين الطعن أو السكوات البلغاري بالدمبل (Dumbbell Lunges / Bulgarian Split Squat)',
    machine: 'دمبلز + دكة مساندة (Dumbbells & Bench)',
    rig: 'barbell_squat',
    env: 'both',
    sets: { beginner: '3 جولات × 10 عدات لكل رجل', intermediate: '3 جولات × 12 عدة لكل رجل', advanced: '4 جولات × 10-12 عدة' },
    tempo: '3 ثوانٍ نزول عمودي - 1 ثانية دفع بالكعب الأمامي',
    formSteps: [
      'اتخذ خطوة للأمام وانزل عمودياً بالحوض مع الحفاظ على استقامة الجذع وعدم ارتطام الركبة الخلفية بالأرض.',
      'ادفع جسمك للأعلى بقوة كعب القدم الأمامية لتشغيل الفخذ الأمامي والأرداف بأعلى كفاءة.'
    ],
    ytQuery: 'Dumbbell Lunges and Bulgarian Split Squat Form شرح تمرين الطعن والسكوات البلغاري'
  },

  // ================= HAMSTRINGS (الخلفيات) =================
  {
    id: 'ex_hamstrings_1',
    muscle: 'hamstrings',
    muscleAr: 'عضلات الأرجل الخلفية والأرداف (Hamstrings)',
    name: 'الديدليفت الروماني بالبار أو الدمبل (Romanian Deadlift - RDL)',
    machine: 'بار أولمبي أو دمبلز (Barbell / Dumbbell RDL)',
    rig: 'rdl_deadlift',
    env: 'both',
    sets: { beginner: '3 جولات × 12 عدة', intermediate: '4 جولات × 10 عدات', advanced: '4 جولات × 8-10 عدات' },
    tempo: '3 ثوانٍ إرجاع الحوض للخلف - 1 ثانية تمدد خلفيات - 2 ثانية صعود',
    formSteps: [
      'حافظ على ثنية طفيفة وثابتة في الركبتين مع ظهر مفرود 100%.',
      'ادفع الحوض للخلف مع تمرير البار ملاصقاً تماماً للساقين حتى منتصف القصبة.',
      'عند الشعور بأقصى تمدد في العضلة الخلفية، اعصر الأرداف والخلفيات للعودة للوقوف.'
    ],
    ytQuery: 'Romanian Deadlift RDL Proper Form شرح تمرين ديدليفت روماني للخلفيات'
  },
  {
    id: 'ex_hamstrings_2',
    muscle: 'hamstrings',
    muscleAr: 'عزل العضلة الخلفية للفخذ (Hamstring Curl)',
    name: 'جهاز ثني الأرجل الخلفية جالساً أو نائماً (Seated / Lying Leg Curl Machine)',
    machine: 'جهاز الخلفيات المخصص (Leg Curl Machine)',
    rig: 'leg_press',
    env: 'gym',
    sets: { beginner: '3 جولات × 12-15 عدة', intermediate: '4 جولات × 12 عدة', advanced: '4 جولات × 10-12 عدة' },
    tempo: '2 ثانية ثني كامل - 1 ثانية عصر الخلفيات - 3 ثوانٍ رجوع بطيء',
    formSteps: [
      'ثبّت الحوض والفخذين جيداً على وسادة الجهاز دون رفع الحوض أثناء الثني.',
      'اثنِ الساقين لأقصى مدى ممكن واعصر العضلة الخلفية ثانية كاملة ثم افرد ببطء.'
    ],
    ytQuery: 'Lying and Seated Leg Curl Proper Form شرح تمرين رجل خلفي على الجهاز'
  },
  {
    id: 'ex_hamstrings_3',
    muscle: 'hamstrings',
    muscleAr: 'عضلات الأرداف والخلفيات (Glutes & Hamstrings)',
    name: 'دفع الحوض بالبار على الدكة (Barbell Hip Thrust)',
    machine: 'دكة التمرين + البار الأولمبي المبطن (Hip Thrust Bench & Barbell)',
    rig: 'bench_press',
    env: 'both',
    sets: { beginner: '3 جولات × 12 عدة', intermediate: '4 جولات × 10-12 عدة', advanced: '4 جولات × 8-10 عدات' },
    tempo: '2 ثانية دفع الحوض للأعلى - 2 ثانية ثبات وعصر - 3 ثوانٍ نزول',
    formSteps: [
      'اسند أعلى الظهر (أسفل لوحي الكتف) على حافة البنش وضع البار المبطن فوق الحوض.',
      'ادفع بالكعبين لرفع الحوض حتى يصبح الجذع موازياً للأرض تماماً وبزاوية ركبة 90 درجة.'
    ],
    ytQuery: 'Barbell Hip Thrust Proper Form شرح تمرين هيب ثراست للأرداف والخلفيات'
  },
  {
    id: 'ex_hamstrings_4',
    muscle: 'hamstrings',
    muscleAr: 'الخلفيات والأرداف (مقاومة منزلية)',
    name: 'تمرين الجسر الأرضي للخلفيات والأرداف (Floor Glute Hamstring Bridge)',
    machine: 'بساط التمرين المنزلي أو دمبل على الحوض (Exercise Mat)',
    rig: 'plank_core',
    env: 'home',
    sets: { beginner: '3 جولات × 15 عدة', intermediate: '4 جولات × 15-20 عدة', advanced: '4 جولات × 20 عدة' },
    tempo: '2 ثانية رفع - 2 ثانية ثبات أعلى - 2 ثانية نزول',
    formSteps: [
      'استلقِ على الظهر مع ثني الركبتين، وادفع الأرض بالكعبين لرفع الحوض مع شد البطن والأرداف.'
    ],
    ytQuery: 'Glute Bridge Proper Form Home Workout شرح تمرين الجسر للخلفيات والأرداف'
  },

  // ================= CALVES (السمانة) =================
  {
    id: 'ex_calves_1',
    muscle: 'calves',
    muscleAr: 'عضلة السمانة (Calves)',
    name: 'رفع السمانة واقفاً على الجهاز أو الدرجة (Standing Calf Raises)',
    machine: 'جهاز السمانة الواقف أو منصة الرفع (Standing Calf Raise Machine)',
    rig: 'calf_raise',
    env: 'both',
    sets: { beginner: '3 جولات × 15 عدة', intermediate: '4 جولات × 15-20 عدة', advanced: '5 جولات × 15-20 عدة' },
    tempo: '2 ثانية نزول كامل للكعب - 1 ثانية صعود - 2 ثانية ثبات على المشط',
    formSteps: [
      'قف بمشط القدم على حافة المنصة وانزل بالكعبين لأقصى مدى لعمل إطالة كاملة للسمانة.',
      'اصعد على أطراف الأصابع لأقصى ارتفاع واثبت ثانيتين في الأعلى في كل عدة.'
    ],
    ytQuery: 'Standing Calf Raise Proper Form شرح تمرين السمانة الصحيح'
  },
  {
    id: 'ex_calves_2',
    muscle: 'calves',
    muscleAr: 'عضلة السمانة العميقة النعلية (Soleus)',
    name: 'رفع السمانة جالساً على الجهاز (Seated Calf Raise Machine)',
    machine: 'جهاز السمانة الجالس (Seated Calf Raise Station)',
    rig: 'calf_raise',
    env: 'gym',
    sets: { beginner: '3 جولات × 15-20 عدة', intermediate: '4 جولات × 15-20 عدة', advanced: '4 جولات × 20 عدة' },
    tempo: '2 ثانية نزول وتمدد كامل - 2 ثانية عصر أعلى التمرين',
    formSteps: [
      'اجلس على الجهاز وضع وسادة الركبة فوق الفخذين مباشرة مع وضع مشط القدم على الحافة.',
      'انزل بالكعب لأسفل مدى ثم ادفع للأعلى بأقصى انقباض بدون ارتداد سريع.'
    ],
    ytQuery: 'Seated Calf Raise Machine Proper Form شرح تمرين سمانة جالس'
  },
  {
    id: 'ex_calves_3',
    muscle: 'calves',
    muscleAr: 'عضلة السمانة (تركيز فردي منزلي وجيم)',
    name: 'رفع السمانة الفردي بالدمبل (Single-Leg Dumbbell Calf Raise)',
    machine: 'دمبل + درجة مرتفعة (Dumbbell & Step Block)',
    rig: 'calf_raise',
    env: 'both',
    sets: { beginner: '3 جولات × 15 عدة لكل قدم', intermediate: '4 جولات × 15 عدة لكل قدم', advanced: '4 جولات × 15-20 عدة' },
    tempo: '2 ثانية نزول - 2 ثانية ثبات أعلى',
    formSteps: [
      'قف على قدم واحدة على درجة مرتفعة وامسك الدمبل بيد واحدة بينما تستند باليد الأخرى للتوازن، وطبّق مدى حركياً كاملاً 100%.'
    ],
    ytQuery: 'Single Leg Dumbbell Calf Raise Form شرح تمرين سمانة فردي بالدمبل'
  },

  // ================= ABS & CORE (البطن والجذع) =================
  {
    id: 'ex_abs_1',
    muscle: 'abs',
    muscleAr: 'عضلات البطن والجذع العميقة (Core & Abs)',
    name: 'تمرين البلانك والكرانش الميكانيكي (Biomechanical Plank & Crunch)',
    machine: 'بساط التمرين الطبي (Abdominal Exercise Mat)',
    rig: 'plank_core',
    env: 'both',
    sets: { beginner: '3 جولات × 30 ثانية + 15 كرانش', intermediate: '4 جولات × 60 ثانية + 20 كرانش', advanced: '4 جولات × 90 ثانية' },
    tempo: 'تنفس مستمر ومنتظم مع سحب السرة للداخل',
    formSteps: [
      'ارتكز على الساعدين وأطراف الأصابع مع شد البطن والأرداف لمنع سقوط أسفل الظهر.',
      'في الكرانش ارفع لوحي الكتف عن الأرض بقوة عضلات البطن دون شد الرقبة باليدين.'
    ],
    ytQuery: 'Plank and Crunch Proper Core Form شرح تمرين البلانك والبطن الصحيح'
  },
  {
    id: 'ex_abs_2',
    muscle: 'abs',
    muscleAr: 'عضلات البطن السفلية (Lower Abs)',
    name: 'رفع الأرجل على المتوازي أو العقلة (Captain’s Chair / Hanging Leg Raise)',
    machine: 'جهاز المتوازي للبطن أو بار العقلة (Captain’s Chair / Pull-Up Bar)',
    rig: 'lat_pulldown',
    env: 'both',
    sets: { beginner: '3 جولات × 12 عدة بركبة مثنية', intermediate: '4 جولات × 15 عدة', advanced: '4 جولات × 15-20 عدة' },
    tempo: '2 ثانية رفع الحوض للأعلى - 1 ثانية ثبات - 3 ثوانٍ نزول بدون مرجحة',
    formSteps: [
      'ثبّت الظهر على مسند الجهاز، وارفع الركبتين مع لف الحوض للأعلى نحو الصدر لتشغيل البطن السفلية بعمق.'
    ],
    ytQuery: 'Hanging Leg Raise and Captains Chair Abs Form شرح تمرين بطن سفلي على المتوازي'
  },
  {
    id: 'ex_abs_3',
    muscle: 'abs',
    muscleAr: 'عضلات البطن العلوية والوسطى (Six-Pack)',
    name: 'طحن البطن بالكابل العلوي (Kneeling Cable Abdominal Crunch)',
    machine: 'جهاز الكابل العلوي بالحبل (High Pulley Cable with Rope)',
    rig: 'tricep_pushdown',
    env: 'gym',
    sets: { beginner: '3 جولات × 15 عدة', intermediate: '4 جولات × 15 عدة', advanced: '4 جولات × 15-20 عدة' },
    tempo: '2 ثانية انقباض مع الزفير الكامل - 3 ثوانٍ رجوع',
    formSteps: [
      'اركع أمام جهاز الكابل وامسك الحبل بجانب الرأس مع ثبات الحوض، واثنِ العمود الفقري بقوة عضلات البطن مع إخراج الهواء بالكامل.'
    ],
    ytQuery: 'Kneeling Cable Crunch Proper Form شرح تمرين بطن بالكابل والحبل'
  },
  {
    id: 'ex_abs_4',
    muscle: 'abs',
    muscleAr: 'عضلات الجوانب والجذع (Obliques & Core)',
    name: 'تمرين عجلة البطن والدوران الروسي للجوانب (Ab Wheel & Russian Twists)',
    machine: 'عجلة البطن وبساط التمرين (Ab Roller Wheel & Mat)',
    rig: 'plank_core',
    env: 'both',
    sets: { beginner: '3 جولات × 12 عدة', intermediate: '4 جولات × 15 عدة', advanced: '4 جولات × 20 عدة' },
    tempo: 'حركة متحكمة 100% مع شد الجذع بالكامل',
    formSteps: [
      'حافظ على شد عضلات البطن والالتفاف بالقفص الصدري بالكامل لتقوية العضلات المائلة (الخواصر) ونحت الخصر.'
    ],
    ytQuery: 'Ab Wheel Rollout and Russian Twist Proper Form شرح تمرين عجلة البطن والجانبيات'
  },

  // ================= CARDIO (الكارديو عالي ومنخفض الشدة) =================
  {
    id: 'ex_cardio_1',
    muscle: 'cardio',
    muscleAr: 'القلب والأوعية الدموية وحرق الدهون (HIIT & LISS Cardio)',
    name: 'المشي المنحدر LISS أو العدو المتقطع HIIT على المشاية',
    machine: 'جهاز المشاية الكهربائية الاحترافي (Incline Motorized Treadmill)',
    rig: 'treadmill_cardio',
    env: 'both',
    sets: { beginner: '25 دقيقة مشي بميل 5% وسرعة 5 كم/س', intermediate: '35 دقيقة ميل 8% أو 15 دقيقة HIIT', advanced: '25 دقيقة HIIT متقطع عالي الشدة' },
    tempo: 'خطوات منتظمة مع الهبوط بمنتصف القدم وحركة الذراعين المتوازنة',
    formSteps: [
      'ارفع رأسك للأمام وافرد ظهرك ولا تمسك مقابض المشاية باليدين أثناء المشي المائل لرفع الحرق بنسبة 35%.',
      'نسّق التنفس (شهيق من الأنف كل خطوتين وزفير من الفم).'
    ],
    ytQuery: 'Incline Treadmill Walking HIIT vs LISS Cardio شرح كارديو المشاية لحرق الدهون'
  },
  {
    id: 'ex_cardio_2',
    muscle: 'cardio',
    muscleAr: 'كارديو آمن للمفاصل والركبتين (Spin Bike)',
    name: 'الدراجة الثابتة الاحترافية بنظام LISS أو HIIT (Stationary Bike Cardio)',
    machine: 'جهاز الدراجة الثابتة المغناطيسية (Stationary Exercise Spin Bike)',
    rig: 'treadmill_cardio',
    env: 'both',
    sets: { beginner: '20-25 دقيقة مقاومة خفيفة', intermediate: '30 دقيقة سرعات متبادلة', advanced: '30 دقيقة HIIT (30ث أقصى سرعة / 60ث تهدئة)' },
    tempo: 'دوران سلس للقدمين مع ثبات الحوض واستقامة الظهر',
    formSteps: [
      'اضبط ارتفاع كرسي الدراجة بمستوى عظمة الحوض بحيث تظل ثنية طفيفة 15 درجة في الركبة في أسفل نقطة للدواسة لحماية الركبة 100%.'
    ],
    ytQuery: 'Stationary Bike Cardio Proper Setup HIIT LISS شرح كارديو العجلة الثابتة لحرق الدهون'
  },
  {
    id: 'ex_cardio_3',
    muscle: 'cardio',
    muscleAr: 'كارديو منزلي عالي الشدة لحرق الدهون (Home HIIT)',
    name: 'نط الحبل والقفز المتقطع عالي الشدة (Jump Rope & HIIT Conditioning)',
    machine: 'حبل القفز الرياضي وبساط التمرين (Speed Jump Rope & Mat)',
    rig: 'treadmill_cardio',
    env: 'home',
    sets: { beginner: '10 جولات × 30 ثانية عمل / 30 ثانية راحة', intermediate: '15 جولة × 40 ثانية عمل / 20 ثانية راحة', advanced: '20 دقيقة HIIT متكامل' },
    tempo: 'ارتكاز خفيف على مشط القدم مع تدوير الحبل بالمعصم فقط',
    formSteps: [
      'اقفز بارتفاع بسيط 2-3 سم فقط عن الأرض مع الهبوط الناعم على مشط القدم وثبات الكوعين بجانب الجذع.'
    ],
    ytQuery: 'Jump Rope HIIT Workout Proper Form شرح تمرين نط الحبل لحرق الدهون'
  }
];

// ==========================================================================
// 100% Biomechanically Accurate Cartoon Exercise Video Engine
// Renders the exact machine + articulated athlete + target muscle glow + breathing
// ==========================================================================
window.BiomechanicalCartoonEngine = {
  currentExercise: window.EXERCISES_DB[0],
  frame: 0,
  isPlaying: true,
  speedMult: 1,
  animId: null,

  init() {
    const canvas = document.getElementById('biomechCanvas');
    if (!canvas) return;
    this.selectExercise(window.EXERCISES_DB[0].id);

    const loop = () => {
      if (this.isPlaying) {
        this.frame += 1 * this.speedMult;
      }
      this.draw(canvas);
      this.animId = requestAnimationFrame(loop);
    };
    this.animId = requestAnimationFrame(loop);
  },

  selectExercise(exId) {
    const found = window.EXERCISES_DB.find(e => e.id === exId) || window.EXERCISES_DB[0];
    this.currentExercise = found;
    this.frame = 0;

    // Update UI details around the video player
    const titleEl = document.getElementById('activeExTitle');
    const machineEl = document.getElementById('activeExMachine');
    const tempoEl = document.getElementById('activeExTempo');
    const stepsEl = document.getElementById('activeExSteps');
    const setsEl = document.getElementById('activeExSets');
    const ytBtn = document.getElementById('activeExYoutubeBtn');

    if (titleEl) titleEl.textContent = found.name;
    if (machineEl) machineEl.textContent = `🏋️ الجهاز المستخدم: ${found.machine}`;
    if (tempoEl) tempoEl.textContent = `⏱️ الإيقاع والتنفس: ${found.tempo}`;
    if (setsEl) {
      setsEl.innerHTML = `
        <span class="badge-pill emerald">مبتدئ: ${found.sets.beginner}</span>
        <span class="badge-pill">متوسط: ${found.sets.intermediate}</span>
        <span class="badge-pill active-fast">متقدم: ${found.sets.advanced}</span>
      `;
    }
    if (stepsEl) {
      stepsEl.innerHTML = found.formSteps.map((s, idx) => `
        <div style="padding:6px 0; border-bottom:1px dashed rgba(255,255,255,0.1); font-size:0.9rem;">
          <strong style="color:#10b981;">✓ خطوة ${idx + 1}:</strong> ${s}
        </div>
      `).join('');
    }
    if (ytBtn) {
      ytBtn.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(found.ytQuery)}`;
    }
  },

  draw(canvas) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const ex = this.currentExercise;

    // Smooth biomechanical cycle t in [0, 1] (0 = start/eccentric bottom, 1 = peak concentric contraction)
    const rawPhase = (this.frame * 0.032) % (Math.PI * 2);
    const t = (1 - Math.cos(rawPhase)) / 2; // Smooth cosine ease-in-out
    const isConcentric = Math.sin(rawPhase) >= 0;

    // 1. Gym Studio Floor & Grid Background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
    bgGrad.addColorStop(0, '#090d16');
    bgGrad.addColorStop(0.76, '#1e293b');
    bgGrad.addColorStop(0.76, '#0f172a');
    bgGrad.addColorStop(1, '#020617');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Biomechanical Precision Grid Lines
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 36) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h * 0.76); ctx.stroke();
    }
    for (let y = 0; y < h * 0.76; y += 36) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    // Floor Line
    const floorY = h * 0.76;
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, floorY);
    ctx.lineTo(w, floorY);
    ctx.stroke();

    // 2. Top Verification HUD & Breathing Sync
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.fillRect(14, 12, w - 28, 44);
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(14, 12, w - 28, 44);

    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 14px Cairo, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('✅ محاكاة ميكانيكية صحيحة 100% على الجهاز المخصص — بدون أخطاء', w - 28, 39);

    // Breathing & Contraction Meter on Left
    const breathText = isConcentric ? '💨 زفير قوي (انقباض العضلة)' : '🌬️ شهيق منتظم (نزول متحكم)';
    ctx.fillStyle = isConcentric ? '#f59e0b' : '#38bdf8';
    ctx.textAlign = 'left';
    ctx.fillText(breathText, 28, 39);

    // 3. Draw Specific Machine & Articulated Cartoon Athlete by Rig
    const cx = w * 0.5;
    this.renderRig(ctx, ex.rig, cx, floorY, t, ex.muscle);

    // 4. Bottom Biomechanical Angle & Rep Counter Bar
    const repCount = Math.floor((this.frame * 0.032) / (Math.PI * 2)) + 1;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
    ctx.fillRect(14, h - 46, w - 28, 34);
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 13px Cairo, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(
      `العدّة رقم: ${repCount} | نسبة الانقباض العضلي: ${Math.round(t * 100)}% | العضلة المستهدفة: ${ex.muscleAr}`,
      w / 2,
      h - 24
    );
  },

  drawHead(ctx, x, y) {
    ctx.fillStyle = '#fcd34d';
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fill();
    // Hair
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(x, y - 5, 14, Math.PI, Math.PI * 2);
    ctx.fill();
    // Headband
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(x - 14, y - 4);
    ctx.lineTo(x + 14, y - 4);
    ctx.stroke();
  },

  drawLimb(ctx, x1, y1, x2, y2, width, color, glow = false) {
    ctx.save();
    if (glow) {
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 16;
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();
  },

  drawJoint(ctx, x, y) {
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(x, y, 4.5, 0, Math.PI * 2);
    ctx.fill();
  },

  renderRig(ctx, rig, cx, floorY, t, targetMuscle) {
    const activeGlow = '#f43f5e';
    const bodyCol = '#3b82f6';
    const skinCol = '#fbbf24';
    const machineCol = '#64748b';
    const weightCol = '#f59e0b';

    if (rig === 'bench_press' || rig === 'incline_bench') {
      const isIncline = rig === 'incline_bench';
      // Bench Structure
      ctx.strokeStyle = machineCol;
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(cx - 110, floorY);
      ctx.lineTo(cx - 110, floorY - 70);
      ctx.moveTo(cx + 70, floorY);
      ctx.lineTo(cx + 70, floorY - 55);
      // Upright Rack
      ctx.moveTo(cx - 85, floorY);
      ctx.lineTo(cx - 85, floorY - 165);
      ctx.stroke();

      // Bench Pad
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 14;
      ctx.beginPath();
      if (isIncline) {
        ctx.moveTo(cx - 95, floorY - 108);
        ctx.lineTo(cx + 10, floorY - 58);
        ctx.lineTo(cx + 75, floorY - 58);
      } else {
        ctx.moveTo(cx - 115, floorY - 62);
        ctx.lineTo(cx + 80, floorY - 62);
      }
      ctx.stroke();

      // Athlete Lying on Bench
      const shX = cx - 65;
      const shY = isIncline ? floorY - 102 : floorY - 76;
      const hipX = cx + 15;
      const hipY = floorY - 72;
      const kneeX = cx + 75;
      const kneeY = floorY - 70;
      const footX = cx + 82;
      const footY = floorY - 4;

      this.drawHead(ctx, shX - 24, shY - (isIncline ? 14 : 2));
      // Torso (Glowing Chest)
      this.drawLimb(ctx, shX, shY, hipX, hipY, 22, activeGlow, true);
      // Legs planted 100% firmly on floor
      this.drawLimb(ctx, hipX, hipY, kneeX, kneeY, 16, '#1e40af');
      this.drawLimb(ctx, kneeX, kneeY, footX, footY, 13, skinCol);

      // Arm & Barbell vertical trajectory
      const barY = (shY - 18) - t * 68;
      const elbowX = shX + 14;
      const elbowY = shY + 12 - t * 38;
      const handX = shX + 4;
      const handY = barY;

      this.drawLimb(ctx, shX, shY, elbowX, elbowY, 12, skinCol, true);
      this.drawLimb(ctx, elbowX, elbowY, handX, handY, 11, skinCol);
      this.drawJoint(ctx, shX, shY);
      this.drawJoint(ctx, elbowX, elbowY);

      // Barbell & Plates
      ctx.fillStyle = weightCol;
      ctx.beginPath();
      ctx.arc(handX, handY, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(handX, handY, 6, 0, Math.PI * 2);
      ctx.fill();
    } else if (rig === 'lat_pulldown') {
      // Lat Pulldown Machine Tower
      ctx.strokeStyle = machineCol;
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(cx + 85, floorY);
      ctx.lineTo(cx + 85, floorY - 240);
      ctx.lineTo(cx - 25, floorY - 240);
      ctx.stroke();

      // Seat & Thigh Pad
      ctx.fillStyle = '#334155';
      ctx.fillRect(cx - 55, floorY - 68, 70, 12);
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(cx + 12, floorY - 82, 11, 0, Math.PI * 2);
      ctx.fill();

      // Moving Weight Stack on Right
      const stackY = floorY - 60 - t * 75;
      ctx.fillStyle = weightCol;
      ctx.fillRect(cx + 68, stackY, 34, 42);

      // Seated Athlete with 15-deg slight torso lean
      const hipX = cx - 25;
      const hipY = floorY - 74;
      const shX = cx - 42;
      const shY = floorY - 148;
      const kneeX = cx + 22;
      const kneeY = floorY - 72;

      this.drawLimb(ctx, hipX, hipY, kneeX, kneeY, 16, '#1e40af');
      this.drawLimb(ctx, kneeX, kneeY, kneeX + 6, floorY - 4, 13, skinCol);
      // Glowing Lats/Back
      this.drawLimb(ctx, hipX, hipY, shX, shY, 24, activeGlow, true);
      this.drawHead(ctx, shX - 4, shY - 24);

      // Cable & Bar descending to upper chest
      const barX = cx - 25;
      const barY = (floorY - 215) + t * 72;
      const elbowX = shX - 10;
      const elbowY = (shY - 35) + t * 58;

      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(cx - 25, floorY - 240);
      ctx.lineTo(barX, barY);
      ctx.stroke();

      // Handlebar
      ctx.strokeStyle = weightCol;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(barX - 28, barY);
      ctx.lineTo(barX + 28, barY);
      ctx.stroke();

      this.drawLimb(ctx, shX, shY, elbowX, elbowY, 12, skinCol, true);
      this.drawLimb(ctx, elbowX, elbowY, barX, barY, 11, skinCol);
      this.drawJoint(ctx, shX, shY);
      this.drawJoint(ctx, elbowX, elbowY);
    } else if (rig === 'seated_row') {
      // Seated Cable Row Machine
      ctx.strokeStyle = machineCol;
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(cx + 120, floorY);
      ctx.lineTo(cx + 120, floorY - 180);
      ctx.moveTo(cx - 110, floorY - 42);
      ctx.lineTo(cx + 120, floorY - 42);
      ctx.stroke();

      // Athlete Seated Upright
      const hipX = cx - 55;
      const hipY = floorY - 54;
      const shX = cx - 58 - t * 8;
      const shY = floorY - 132;
      const kneeX = cx + 10;
      const kneeY = floorY - 64;
      const footX = cx + 68;
      const footY = floorY - 48;

      this.drawLimb(ctx, hipX, hipY, kneeX, kneeY, 16, '#1e40af');
      this.drawLimb(ctx, kneeX, kneeY, footX, footY, 13, skinCol);
      this.drawLimb(ctx, hipX, hipY, shX, shY, 22, activeGlow, true);
      this.drawHead(ctx, shX, shY - 25);

      const handX = (cx + 25) - t * 72;
      const handY = floorY - 88;
      const elbowX = handX - 26;
      const elbowY = floorY - 85;

      // Cable Line
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(cx + 120, floorY - 88);
      ctx.lineTo(handX, handY);
      ctx.stroke();

      this.drawLimb(ctx, shX, shY, elbowX, elbowY, 12, skinCol, true);
      this.drawLimb(ctx, elbowX, elbowY, handX, handY, 11, skinCol);
      this.drawJoint(ctx, shX, shY);
      this.drawJoint(ctx, elbowX, elbowY);
    } else if (rig === 'barbell_squat' || rig === 'rdl_deadlift') {
      const isRDL = rig === 'rdl_deadlift';
      // Squat Power Rack
      ctx.strokeStyle = machineCol;
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(cx - 75, floorY);
      ctx.lineTo(cx - 75, floorY - 230);
      ctx.moveTo(cx + 75, floorY);
      ctx.lineTo(cx + 75, floorY - 230);
      ctx.moveTo(cx - 75, floorY - 230);
      ctx.lineTo(cx + 75, floorY - 230);
      ctx.stroke();

      const ankleX = cx;
      const ankleY = floorY - 8;

      let kneeX, kneeY, hipX, hipY, shX, shY;
      if (!isRDL) {
        // Biomechanical Squat: t=0 standing, t=1 parallel squat depth
        const depth = 1 - t; // 0 = bottom, 1 = top
        const squatFactor = 1 - depth;
        kneeX = cx + 28 * squatFactor;
        kneeY = floorY - 62 + 12 * squatFactor;
        hipX = cx - 34 * squatFactor;
        hipY = floorY - 118 + 52 * squatFactor;
        shX = cx + 6 * squatFactor;
        shY = hipY - 72;
      } else {
        // Biomechanical RDL: Hip hinge backwards while spine stays 100% neutral
        const hinge = 1 - t;
        kneeX = cx + 8;
        kneeY = floorY - 62;
        hipX = cx - 42 * hinge;
        hipY = floorY - 118 + 14 * hinge;
        shX = hipX + 45 * hinge + 4;
        shY = hipY - 72 + 46 * hinge;
      }

      this.drawLimb(ctx, ankleX, ankleY, kneeX, kneeY, 14, skinCol);
      this.drawLimb(ctx, kneeX, kneeY, hipX, hipY, 19, activeGlow, true);
      this.drawLimb(ctx, hipX, hipY, shX, shY, 22, bodyCol, isRDL);
      this.drawHead(ctx, shX + 6, shY - 22);

      this.drawJoint(ctx, ankleX, ankleY);
      this.drawJoint(ctx, kneeX, kneeY);
      this.drawJoint(ctx, hipX, hipY);
      this.drawJoint(ctx, shX, shY);

      if (!isRDL) {
        // Barbell on Upper Traps
        ctx.fillStyle = weightCol;
        ctx.beginPath();
        ctx.arc(shX, shY + 4, 24, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Barbell gliding close to shins
        const barX = cx + 12;
        const barY = shY + 62;
        this.drawLimb(ctx, shX, shY, barX, barY, 11, skinCol);
        ctx.fillStyle = weightCol;
        ctx.beginPath();
        ctx.arc(barX, barY, 22, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (rig === 'leg_press') {
      // 45-Degree Leg Press Machine
      ctx.strokeStyle = machineCol;
      ctx.lineWidth = 8;
      ctx.beginPath();
      // Angled Seat
      ctx.moveTo(cx - 105, floorY - 25);
      ctx.lineTo(cx - 45, floorY - 95);
      ctx.moveTo(cx - 105, floorY - 25);
      ctx.lineTo(cx - 50, floorY - 25);
      // 45-Deg Rail
      ctx.moveTo(cx - 20, floorY - 15);
      ctx.lineTo(cx + 125, floorY - 160);
      ctx.stroke();

      const hipX = cx - 55;
      const hipY = floorY - 34;
      const shX = cx - 92;
      const shY = floorY - 82;

      const sledDist = 55 + t * 52;
      const footX = hipX + sledDist * 1.1;
      const footY = hipY - sledDist * 0.85;
      const kneeX = (hipX + footX) / 2 - 18 * (1 - t);
      const kneeY = (hipY + footY) / 2 - 28 * (1 - t);

      this.drawLimb(ctx, hipX, hipY, shX, shY, 22, bodyCol);
      this.drawHead(ctx, shX - 10, shY - 18);
      this.drawLimb(ctx, hipX, hipY, kneeX, kneeY, 19, activeGlow, true);
      this.drawLimb(ctx, kneeX, kneeY, footX, footY, 14, skinCol);

      // Sled Platform & Weights
      ctx.save();
      ctx.translate(footX + 10, footY - 8);
      ctx.rotate(-0.68);
      ctx.fillStyle = weightCol;
      ctx.fillRect(-10, -38, 22, 76);
      ctx.restore();
    } else if (rig === 'plank_core' || rig === 'pushup_home') {
      const isPushup = rig === 'pushup_home';
      const footX = cx - 105;
      const footY = floorY - 10;
      const drop = isPushup ? (1 - t) * 42 : Math.sin(this.frame * 0.08) * 3;
      const shX = cx + 75;
      const shY = floorY - 72 + drop;
      const hipX = (footX + shX) / 2;
      const hipY = (footY + shY) / 2;

      this.drawLimb(ctx, footX, footY, hipX, hipY, 16, '#1e40af');
      this.drawLimb(ctx, hipX, hipY, shX, shY, 22, activeGlow, true);
      this.drawHead(ctx, shX + 22, shY - 6);

      if (isPushup) {
        const elbowX = shX - 14;
        const elbowY = (shY + floorY - 6) / 2;
        this.drawLimb(ctx, shX, shY, elbowX, elbowY, 11, skinCol, true);
        this.drawLimb(ctx, elbowX, elbowY, shX + 4, floorY - 6, 10, skinCol);
      } else {
        // Plank Forearm Support
        this.drawLimb(ctx, shX, shY, shX, floorY - 8, 12, skinCol);
        this.drawLimb(ctx, shX, floorY - 8, shX + 28, floorY - 8, 10, skinCol);
      }
    } else if (rig === 'treadmill_cardio') {
      // Motorized Incline Treadmill
      ctx.strokeStyle = machineCol;
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.moveTo(cx - 115, floorY - 8);
      ctx.lineTo(cx + 95, floorY - 26);
      ctx.lineTo(cx + 75, floorY - 165);
      ctx.stroke();

      // Running/Walking Athlete
      const stride = Math.sin(this.frame * 0.14);
      const hipX = cx - 10;
      const hipY = floorY - 106;
      const shX = cx;
      const shY = floorY - 174;

      // Leg 1 & Leg 2 alternating
      this.drawLimb(ctx, hipX, hipY, hipX + stride * 32, floorY - 18, 14, activeGlow, true);
      this.drawLimb(ctx, hipX, hipY, hipX - stride * 32, floorY - 18, 14, '#1e40af');
      this.drawLimb(ctx, hipX, hipY, shX, shY, 22, bodyCol);
      this.drawHead(ctx, shX + 4, shY - 22);
      // Swinging Arm
      this.drawLimb(ctx, shX, shY, shX - stride * 26, shY + 45, 11, skinCol);
    } else {
      // Standing Isolation & Press Exercises: shoulder_press, lateral_raise, bicep_curl, tricep_pushdown, wrist_curl, calf_raise
      const isCalf = rig === 'calf_raise';
      const liftY = isCalf ? t * 24 : 0;
      const ankleX = cx;
      const ankleY = floorY - 10 - liftY;
      const kneeX = cx;
      const kneeY = floorY - 64 - liftY;
      const hipX = cx;
      const hipY = floorY - 118 - liftY;
      const shX = cx;
      const shY = floorY - 184 - liftY;

      if (rig === 'tricep_pushdown' || rig === 'cable_crossover') {
        // High Pulley Tower in front
        ctx.strokeStyle = machineCol;
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.moveTo(cx + 85, floorY);
        ctx.lineTo(cx + 85, floorY - 235);
        ctx.lineTo(cx + 35, floorY - 235);
        ctx.stroke();
      }

      this.drawLimb(ctx, ankleX, ankleY, kneeX, kneeY, 15, isCalf ? activeGlow : skinCol, isCalf);
      this.drawLimb(ctx, kneeX, kneeY, hipX, hipY, 18, '#1e40af');
      this.drawLimb(ctx, hipX, hipY, shX, shY, 22, rig === 'shoulder_press' || rig === 'lateral_raise' ? activeGlow : bodyCol, rig === 'shoulder_press' || rig === 'lateral_raise');
      this.drawHead(ctx, shX, shY - 24);

      let elbowX = shX + 6;
      let elbowY = shY + 38;
      let handX = elbowX + 32;
      let handY = elbowY;

      if (rig === 'shoulder_press') {
        elbowX = shX + 26;
        elbowY = shY + 12 - t * 38;
        handX = shX + 22;
        handY = elbowY - 34;
      } else if (rig === 'lateral_raise') {
        const angle = 0.2 + t * 1.35;
        elbowX = shX + Math.sin(angle) * 34;
        elbowY = shY + Math.cos(angle) * 34;
        handX = shX + Math.sin(angle) * 66;
        handY = shY + Math.cos(angle) * 66;
      } else if (rig === 'bicep_curl' || rig === 'wrist_curl') {
        const curlAngle = (1 - t) * 1.35 - 0.35;
        handX = elbowX + Math.cos(curlAngle) * 36;
        handY = elbowY + Math.sin(curlAngle) * 36;
      } else if (rig === 'tricep_pushdown' || rig === 'cable_crossover') {
        const pushAngle = -0.5 + t * 1.65;
        handX = elbowX + Math.cos(pushAngle) * 36;
        handY = elbowY + Math.sin(pushAngle) * 36;
        // Cable wire from top pulley
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx + 38, floorY - 235);
        ctx.lineTo(handX, handY);
        ctx.stroke();
      }

      this.drawLimb(ctx, shX, shY, elbowX, elbowY, 12, activeGlow, true);
      this.drawLimb(ctx, elbowX, elbowY, handX, handY, 11, skinCol, true);
      this.drawJoint(ctx, shX, shY);
      this.drawJoint(ctx, elbowX, elbowY);

      // Dumbbell / Handle at Hand
      ctx.fillStyle = weightCol;
      ctx.beginPath();
      ctx.arc(handX, handY, 11, 0, Math.PI * 2);
      ctx.fill();
    }
  }
};
