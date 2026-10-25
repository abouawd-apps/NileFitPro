// NileFitPro - 5,460+ Healthy Meal Alternatives Engine with Exact Gram Scaling, Sinai Olive Oil / Baladi Ghee & Cartoon Preparation Video Player

(function () {
  // Base Protein & Core Dish Templates (39 diverse realistic cores — non-repetitive, not forcing 250g meat daily!)
  const MEAL_CORES = [
    // Breakfast / Dinner / Light & Economical Proteins
    {
      id: 'cottage_sinai',
      name: 'طبق جبنة قريش فلاحي بالخضروات الطازجة',
      category: 'فطور',
      proteinGroup: 'بيض وأجبان صحية',
      baseProteinItem: { name: 'جبنة قريش طبيعية قليلة الملح', grams: 160, p: 22, c: 5, f: 4 },
      oilType: 'زيت زيتون مزارع سيناء (بكر ممتاز 100%)',
      oilGrams: 12,
      photo: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80',
      prepMethod: 'تُهرس الجبنة القريش بالشوكة مع الطماطم والخيار والبقدونس ثم يُضاف زيت زيتون مزارع سيناء البكر على البارد للحفاظ على الفيتامينات.'
    },
    {
      id: 'foul_sinai',
      name: 'فول مدمس مصري بالليمون والكمون والطحينة',
      category: 'فطور',
      proteinGroup: 'بقوليات ونباتي',
      baseProteinItem: { name: 'فول مدمس مطهو بدون قشر ثقيل', grams: 180, p: 16, c: 32, f: 2 },
      oilType: 'زيت زيتون مزارع سيناء (بكر ممتاز 100%)',
      oilGrams: 10,
      photo: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=700&q=80',
      prepMethod: 'يُسخن الفول المدمس على نار هادئة مع الكمون وعصير الليمون ثم يُتبل بزيت زيتون مزارع سيناء الطبيعي.'
    },
    {
      id: 'shakshuka_baladi',
      name: 'شكشوكة البيض بالخضروات والفلفل الألوان',
      category: 'فطور',
      proteinGroup: 'بيض وأجبان صحية',
      baseProteinItem: { name: 'بيض بلدي طازج (3 بيضات)', grams: 150, p: 19, c: 2, f: 14 },
      oilType: 'السمنة البلدي الطبيعية',
      oilGrams: 8,
      photo: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=700&q=80',
      prepMethod: 'تُشوح الطماطم والبصل والفلفل في ملعقة محسوبة من السمنة البلدي الطبيعية ثم يُضاف البيض حتى ينضج.'
    },
    {
      id: 'boiled_eggs_avocado',
      name: 'بيض مسلوق مع شرائح الخضار والزعتر البري',
      category: 'فطور',
      proteinGroup: 'بيض وأجبان صحية',
      baseProteinItem: { name: 'بيض مسلوق كامل (3 بيضات)', grams: 155, p: 19, c: 1.5, f: 15 },
      oilType: 'زيت زيتون مزارع سيناء (بكر ممتاز 100%)',
      oilGrams: 10,
      photo: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=700&q=80',
      prepMethod: 'يُسلق البيض لمدة 9 دقائق ويُقدم مع شرائح الطماطم والخيار ورشة زعتر وزيت زيتون مزارع سيناء.'
    },
    {
      id: 'oats_yogurt_nuts',
      name: 'شوفان بالزبادي اليوناني والمكسرات والقرفة',
      category: 'فطور',
      proteinGroup: 'بيض وأجبان صحية',
      baseProteinItem: { name: 'زبادي يوناني عالي البروتين + حليب', grams: 200, p: 20, c: 10, f: 4 },
      oilType: 'زيت زيتون مزارع سيناء (قطرات صحية للسلطة الجانبية)',
      oilGrams: 5,
      photo: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=700&q=80',
      prepMethod: 'يُمزج الشوفان مع الزبادي اليوناني والقرفة والفواكه المقطعة بالميزان بالجرامات.'
    },
    {
      id: 'omelette_spinach',
      name: 'أومليت البيض بالسبانخ والمشروم الطازج',
      category: 'فطور',
      proteinGroup: 'بيض وأجبان صحية',
      baseProteinItem: { name: 'بيض + بياض بيض + سبانخ ومشروم', grams: 190, p: 24, c: 4, f: 12 },
      oilType: 'السمنة البلدي الطبيعية',
      oilGrams: 7,
      photo: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=700&q=80',
      prepMethod: 'يُشوح المشروم والسبانخ في السمنة البلدي الطبيعية ثم يُصب خليط البيض المخفوق.'
    },
    {
      id: 'hummus_eggs_sinai',
      name: 'حمص الشام المسلوق بالبيض وزيت الزيتون البكر',
      category: 'فطور',
      proteinGroup: 'بقوليات ونباتي',
      baseProteinItem: { name: 'حمص مسلوق + بيضتين مسلوقتين', grams: 210, p: 23, c: 28, f: 11 },
      oilType: 'زيت زيتون مزارع سيناء (بكر ممتاز 100%)',
      oilGrams: 10,
      photo: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=700&q=80',
      prepMethod: 'يُقدم الحمص الدافئ بالكمون مع البيض المسلوق ويُزين بزيت زيتون مزارع سيناء.'
    },

    // Lunch — Diverse, Moderate, Balanced (Fish, Legumes, Moderate Poultry, Moderate Meat, Vegetarian)
    {
      id: 'tilapia_grilled',
      name: 'سمك بلطي نيلي مشوي بالردة والتتبيلة الخضراء',
      category: 'غداء',
      proteinGroup: 'أسماك وبحريات',
      baseProteinItem: { name: 'سمك بلطي مشوي صافي', grams: 200, p: 40, c: 0, f: 5 },
      oilType: 'زيت زيتون مزارع سيناء (بكر ممتاز 100%)',
      oilGrams: 10,
      photo: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=700&q=80',
      prepMethod: 'يُتبل السمك بالثوم والكمون والكزبرة والليمون ويُشوى في الفرن ثم يُضاف زيت زيتون مزارع سيناء للسلطة.'
    },
    {
      id: 'tuna_salad_sinai',
      name: 'سلطة تونة مصفاة بالذرة الحلوة والفلفل الألوان',
      category: 'غداء',
      proteinGroup: 'أسماك وبحريات',
      baseProteinItem: { name: 'تونة قطعة واحدة مصفاة ومغسولة', grams: 140, p: 32, c: 0, f: 3 },
      oilType: 'زيت زيتون مزارع سيناء (بكر ممتاز 100%)',
      oilGrams: 12,
      photo: 'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?auto=format&fit=crop&w=700&q=80',
      prepMethod: 'تُصفى التونة تماماً وتُخلط مع الخضروات الورقية والليمون وزيت زيتون مزارع سيناء الصحي.'
    },
    {
      id: 'lentil_koshary_fit',
      name: 'كشري مصري صحي محسوب بالجرامات (غني بالعدس والحمص)',
      category: 'غداء',
      proteinGroup: 'بقوليات ونباتي',
      baseProteinItem: { name: 'عدس بجبة مسلوق + حمص الشام', grams: 190, p: 21, c: 38, f: 2 },
      oilType: 'زيت زيتون مزارع سيناء (لصلصة الطماطم الصحية)',
      oilGrams: 10,
      photo: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=700&q=80',
      prepMethod: 'يُسلق العدس والحمص وتُحضر الصلصة بزيت زيتون مزارع سيناء والثوم بدون قلي غزير.'
    },
    {
      id: 'chicken_breast_herbs',
      name: 'شرائح صدور دجاج مشوية بالأعشاب والليمون (كمية معتدلة)',
      category: 'غداء',
      proteinGroup: 'دواجن صحية معتدلة',
      baseProteinItem: { name: 'صدور دجاج مشوية متبلة (حصة معتدلة)', grams: 145, p: 36, c: 0, f: 4 },
      oilType: 'زيت زيتون مزارع سيناء (بكر ممتاز 100%)',
      oilGrams: 10,
      photo: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=700&q=80',
      prepMethod: 'تُتبل شرائح الدجاج بالروزماري والليمون وزيت زيتون مزارع سيناء وتُشوى على الجريل.'
    },
    {
      id: 'shish_tawook_fit',
      name: 'شيش طاووق مشوي بالزبادي والفلفل والبصل',
      category: 'غداء',
      proteinGroup: 'دواجن صحية معتدلة',
      baseProteinItem: { name: 'مكعبات دجاج متبلة بالزبادي', grams: 150, p: 34, c: 3, f: 6 },
      oilType: 'السمنة البلدي الطبيعية (مسحة خفيفة للشوي)',
      oilGrams: 8,
      photo: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=700&q=80',
      prepMethod: 'تُشك مكعبات الدجاج مع الفلفل والطماطم والبصل وتُشوى في الفرن مع مسحة سمنة بلدي طبيعية.'
    },
    {
      id: 'kofta_grilled_lean',
      name: 'كفتة مشوية على الفحم قليلة الدهن بالبقدونس (كمية معتدلة)',
      category: 'غداء',
      proteinGroup: 'لحوم صحية معتدلة',
      baseProteinItem: { name: 'لحم بقري مفروم أحمر مشوي', grams: 135, p: 32, c: 2, f: 11 },
      oilType: 'زيت زيتون مزارع سيناء (مع سلطة الطحينة والخضار)',
      oilGrams: 8,
      photo: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=700&q=80',
      prepMethod: 'يُفرم اللحم الأحمر مع البصل المصفى والبقدونس والبهارات ويُشوى في الفرن أو على الفحم.'
    },
    {
      id: 'mackerel_lemon',
      name: 'سمك ماكريل مشوي بالليمون والكرفس (غني بالأوميجا 3)',
      category: 'غداء',
      proteinGroup: 'أسماك وبحريات',
      baseProteinItem: { name: 'فيليه سمك ماكريل مشوي', grams: 160, p: 34, c: 0, f: 14 },
      oilType: 'زيت زيتون مزارع سيناء (بكر ممتاز 100%)',
      oilGrams: 8,
      photo: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=700&q=80',
      prepMethod: 'يُتبل الماكريل بالكرفس والجزر والليمون ويُخبز في الفرن 20 دقيقة.'
    },
    {
      id: 'shrimp_garlic_sinai',
      name: 'جمبري مشوي بالثوم والكزبرة والليمون',
      category: 'غداء',
      proteinGroup: 'أسماك وبحريات',
      baseProteinItem: { name: 'جمبري مقشر مشوي', grams: 170, p: 36, c: 1, f: 3 },
      oilType: 'زيت زيتون مزارع سيناء (بكر ممتاز 100%)',
      oilGrams: 11,
      photo: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=700&q=80',
      prepMethod: 'يُشوح الجمبري لمدة 5 دقائق فقط مع الثوم والكزبرة الخضراء وزيت زيتون مزارع سيناء.'
    },
    {
      id: 'white_beans_stew',
      name: 'فاصوليا بيضاء مطهوة بصلصة الطماطم الطبيعية والريحان',
      category: 'غداء',
      proteinGroup: 'بقوليات ونباتي',
      baseProteinItem: { name: 'فاصوليا بيضاء مسلوقة + بروتين نباتي', grams: 200, p: 19, c: 36, f: 1.5 },
      oilType: 'السمنة البلدي الطبيعية',
      oilGrams: 9,
      photo: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80',
      prepMethod: 'تُسلق الفاصوليا البيضاء وتُسبك مع عصير الطماطم الطبيعي وملعقة صغيرة سمنة بلدي.'
    },
    {
      id: 'yellow_lentil_soup',
      name: 'شوربة العدس الأصفر المصري بالجزر والكركم',
      category: 'غداء',
      proteinGroup: 'بقوليات ونباتي',
      baseProteinItem: { name: 'عدس أصفر مطهو بالخضروات + 2 بيضة مسلوقة', grams: 240, p: 26, c: 34, f: 8 },
      oilType: 'السمنة البلدي الطبيعية',
      oilGrams: 8,
      photo: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=700&q=80',
      prepMethod: 'يُطهى العدس الأصفر مع الجزر والطماطم والبصل ويُخفق ثم تُضاف ملعقة سمنة بلدي طبيعية.'
    },
    {
      id: 'salmon_herb_sinai',
      name: 'فيليه سلمون مشوي بالأعشاب العطرية والليمون',
      category: 'غداء',
      proteinGroup: 'أسماك وبحريات',
      baseProteinItem: { name: 'فيليه سلمون طازج مشوي', grams: 150, p: 33, c: 0, f: 13 },
      oilType: 'زيت زيتون مزارع سيناء (بكر ممتاز 100%)',
      oilGrams: 8,
      photo: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=700&q=80',
      prepMethod: 'يُدهن السلمون بزيت زيتون مزارع سيناء وعصير الليمون والشبت ويُشوى لمدة 12 دقيقة.'
    },
    {
      id: 'beef_steak_baladi',
      name: 'شرائح ستيك لحم بقري مشوي بالمشروم والفلفل الأسود',
      category: 'غداء',
      proteinGroup: 'لحوم صحية معتدلة',
      baseProteinItem: { name: 'شرائح لحم بقري صافي + مشروم', grams: 140, p: 35, c: 3, f: 9 },
      oilType: 'السمنة البلدي الطبيعية',
      oilGrams: 8,
      photo: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80',
      prepMethod: 'تُشوى شرائح اللحم مع المشروم الطازج في السمنة البلدي الطبيعية على نار عالية.'
    },
    {
      id: 'turkey_breast_roast',
      name: 'شرائح صدور ديك رومي مشوية بالخردل والأعشاب',
      category: 'غداء',
      proteinGroup: 'دواجن صحية معتدلة',
      baseProteinItem: { name: 'صدور ديك رومي مشوية', grams: 150, p: 37, c: 1, f: 3 },
      oilType: 'زيت زيتون مزارع سيناء (بكر ممتاز 100%)',
      oilGrams: 10,
      photo: 'https://images.unsplash.com/photo-1606728035253-49e8a23146de?auto=format&fit=crop&w=700&q=80',
      prepMethod: 'يُتبل الديك الرومي بالخردل وزيت زيتون مزارع سيناء ويُطهى في الفرن.'
    },
    {
      id: 'chickpea_quinoa_bowl',
      name: 'بول الكينوا والحمص والجبن الفيتا لايت والخضروات',
      category: 'غداء',
      proteinGroup: 'بقوليات ونباتي',
      baseProteinItem: { name: 'حمص مسلوق + جبن فيتا لايت + كينوا', grams: 210, p: 22, c: 34, f: 7 },
      oilType: 'زيت زيتون مزارع سيناء (بكر ممتاز 100%)',
      oilGrams: 10,
      photo: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=80',
      prepMethod: 'تُخلط الكينوا المسلوقة مع الحمص والخيار والطماطم والجبن وتُتبل بزيت زيتون مزارع سيناء.'
    },
    {
      id: 'sardine_baked_sinai',
      name: 'صينية سردين بلدي في الفرن بالليمون والكمون والكرفس',
      category: 'غداء',
      proteinGroup: 'أسماك وبحريات',
      baseProteinItem: { name: 'سردين بلدي طازج مشوي', grams: 165, p: 34, c: 0, f: 11 },
      oilType: 'زيت زيتون مزارع سيناء (بكر ممتاز 100%)',
      oilGrams: 9,
      photo: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=700&q=80',
      prepMethod: 'يُرص السردين مع شرائح الليمون والفلفل الأخضر وزيت زيتون مزارع سيناء في الفرن.'
    },
    {
      id: 'okra_chicken_tagine',
      name: 'طاجن بامية صحي بقطع الدجاج المعتدلة في الفرن',
      category: 'غداء',
      proteinGroup: 'دواجن صحية معتدلة',
      baseProteinItem: { name: 'بامية خضراء + قطع صدر دجاج (130 جم)', grams: 250, p: 33, c: 12, f: 4 },
      oilType: 'السمنة البلدي الطبيعية',
      oilGrams: 8,
      photo: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80',
      prepMethod: 'تُطهى البامية مع قطع الدجاج والطماطم الطازجة والثوم في طاجن فخار بلمسة سمنة بلدي.'
    },
    {
      id: 'molokhia_chicken_fit',
      name: 'ملوخية خضراء صحية مع ربع دجاجة مشوية منزوعة الجلد',
      category: 'غداء',
      proteinGroup: 'دواجن صحية معتدلة',
      baseProteinItem: { name: 'ملوخية خضراء + دجاج مشوي صافي', grams: 260, p: 35, c: 8, f: 5 },
      oilType: 'السمنة البلدي الطبيعية (طشة صحية خفيفة)',
      oilGrams: 7,
      photo: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=700&q=80',
      prepMethod: 'تُطبخ الملوخية في مرق منزوع الدسم وتُضاف طشة الثوم والكزبرة بـ 7 جرام فقط من السمنة البلدي.'
    },

    // Dinner & Snacks & Pre/Post Workout
    {
      id: 'dinner_greek_yogurt_flax',
      name: 'زبادي يوناني ببذور الشيا والكتان وشرائح التفاح',
      category: 'عشاء',
      proteinGroup: 'بيض وأجبان صحية',
      baseProteinItem: { name: 'زبادي يوناني + بذور شيا', grams: 190, p: 20, c: 12, f: 5 },
      oilType: 'زيت زيتون مزارع سيناء (مع طبق ورقيات جانبي)',
      oilGrams: 6,
      photo: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=700&q=80',
      prepMethod: 'يُقدم الزبادي اليوناني البارد مع بذور الشيا وشرائح التفاح الأخضر.'
    },
    {
      id: 'dinner_cottage_tuna_mix',
      name: 'سلطة الجبنة القريش والتونة الخفيفة بالخيار والشبت',
      category: 'عشاء',
      proteinGroup: 'أسماك وبحريات',
      baseProteinItem: { name: 'جبنة قريش (100 جم) + تونة مصفاة (80 جم)', grams: 180, p: 31, c: 4, f: 4 },
      oilType: 'زيت زيتون مزارع سيناء (بكر ممتاز 100%)',
      oilGrams: 10,
      photo: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80',
      prepMethod: 'تُمزج الجبنة القريش مع التونة المصفاة والشبت وعصير الليمون وزيت زيتون مزارع سيناء.'
    },
    {
      id: 'dinner_egg_whites_veggie',
      name: 'عجة بياض البيض والبيض الكامل بالبقدونس والكوسة المبشورة',
      category: 'عشاء',
      proteinGroup: 'بيض وأجبان صحية',
      baseProteinItem: { name: '2 بيضة كاملة + 3 بياض بيض + كوسة', grams: 200, p: 23, c: 5, f: 10 },
      oilType: 'السمنة البلدي الطبيعية',
      oilGrams: 7,
      photo: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=700&q=80',
      prepMethod: 'تُبشر الكوسة مع البقدونس وتُطهى مع البيض في مقلاة غير لاصقة بمسحة سمنة بلدي.'
    },
    {
      id: 'snack_lupini_chickpea',
      name: 'سناك الترمس الحلو والحمص بالليمون والكمون + سلطة خضراء',
      category: 'سناك صحي',
      proteinGroup: 'بقوليات ونباتي',
      baseProteinItem: { name: 'ترمس مسلوق + حمص مسلوق', grams: 150, p: 18, c: 22, f: 3 },
      oilType: 'زيت زيتون مزارع سيناء (بكر ممتاز 100%)',
      oilGrams: 6,
      photo: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=700&q=80',
      prepMethod: 'يُقدم الترمس والحمص بالليمون والكمون مع سلطة خضراء متبلة بزيت زيتون مزارع سيناء.'
    },
    {
      id: 'preworkout_sweetpotato_eggs',
      name: 'بطاطا حلوة مشوية بالقرفة مع البيض المسلوق (طاقة التمرين)',
      category: 'قبل/بعد التمرين',
      proteinGroup: 'بيض وأجبان صحية',
      baseProteinItem: { name: 'بيضتان مسلوقتان + جبن قريش', grams: 160, p: 22, c: 3, f: 10 },
      oilType: 'السمنة البلدي الطبيعية',
      oilGrams: 6,
      photo: 'https://images.unsplash.com/photo-1596097635121-14b63b7a0c19?auto=format&fit=crop&w=700&q=80',
      prepMethod: 'تُشوى البطاطا الحلوة في الفرن وتُقدم مع البيض المسلوق لتزويد العضلات بالجليكوجين والبروتين.'
    },
    {
      id: 'postworkout_chicken_rice',
      name: 'وجبة الاستشفاء العضلي: صدر دجاج مشوي مع الخضار السوتيه',
      category: 'قبل/بعد التمرين',
      proteinGroup: 'دواجن صحية معتدلة',
      baseProteinItem: { name: 'صدر دجاج مشوي صافي (140 جم)', grams: 140, p: 35, c: 0, f: 3.5 },
      oilType: 'زيت زيتون مزارع سيناء (بكر ممتاز 100%)',
      oilGrams: 8,
      photo: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=700&q=80',
      prepMethod: 'يُشوى صدر الدجاج ويُقدم مع الخضار السوتيه المتبل بزيت زيتون مزارع سيناء.'
    }
  ];

  // 14 Complex Carb Sides (Measured in Grams)
  const CARB_SIDES = [
    { name: 'خبز بلدي أسمر كامل الحبة', baseGrams: 75, c: 36, p: 6, f: 1 },
    { name: 'أرز بسمتي مسلوق بالبخار', baseGrams: 140, c: 39, p: 4, f: 0.5 },
    { name: 'برغل خشن مطهو بالخضروات', baseGrams: 145, c: 32, p: 5, f: 0.5 },
    { name: 'فريكة خضراء مطهوة صحياً', baseGrams: 140, c: 33, p: 7, f: 1 },
    { name: 'بطاطا حلوة مشوية في الفرن', baseGrams: 160, c: 32, p: 2.5, f: 0.2 },
    { name: 'بطاطس مسلوقة ومشوية بالأعشاب', baseGrams: 170, c: 30, p: 3.5, f: 0.2 },
    { name: 'شوفان كامل الحبة', baseGrams: 60, c: 40, p: 8, f: 4 },
    { name: 'مكرونة قمح كامل مسلوقة', baseGrams: 135, c: 37, p: 6, f: 1 },
    { name: 'كينوا مسلوقة عالية القيمة', baseGrams: 135, c: 29, p: 6, f: 2 },
    { name: 'توست شوفان وحبوب كاملة', baseGrams: 70, c: 31, p: 6, f: 1.5 },
    { name: 'ذرة صفراء حلوة مسلوقة', baseGrams: 150, c: 28, p: 5, f: 1.5 },
    { name: 'أرز بني كامل الحبة', baseGrams: 140, c: 34, p: 4, f: 1 },
    { name: 'شرائح خبز الشعير الصحي', baseGrams: 75, c: 33, p: 6, f: 1 },
    { name: 'حمص وبقوليات مركبة بطيئة الامتصاص', baseGrams: 130, c: 30, p: 9, f: 2 }
  ];

  // 13 Fresh Vegetable, Salad & Micronutrient Combos (30 * 14 * 13 = 5,460 Distinct Healthy Meals!)
  const VEGGIE_COMBOS = [
    { name: 'سلطة خضراء بلدي (طماطم، خيار، جرجير، جزر)', baseGrams: 180, c: 7, p: 2, fiber: 4.5 },
    { name: 'خضار سوتيه على البخار (بروكلي، كوسة، فاصوليا خضراء)', baseGrams: 190, c: 9, p: 3.5, fiber: 5.5 },
    { name: 'سلطة البنجر والجرجير الغنية بالحديد', baseGrams: 170, c: 11, p: 2.5, fiber: 4.2 },
    { name: 'سلطة الفلفل الألوان والخس والليمون', baseGrams: 175, c: 6, p: 1.8, fiber: 3.8 },
    { name: 'سبانخ طازجة مطهوة على البخار بالثوم والليمون', baseGrams: 165, c: 6, p: 4.5, fiber: 4.8 },
    { name: 'سلطة الكرنب الأحمر والجزر المبشور والكزبرة', baseGrams: 170, c: 8, p: 2.2, fiber: 4.6 },
    { name: 'باذنجان مشوي في الفرن مع البقدونس والثوم (بابا غنوج لايت)', baseGrams: 160, c: 9, p: 2.0, fiber: 5.0 },
    { name: 'كوسة وجزر مشويان بالزعتر والريحان', baseGrams: 185, c: 8, p: 2.4, fiber: 4.0 },
    { name: 'سلطة البقدونس والطماطم والنعناع والبرغل الخفيف (تبولة صحية)', baseGrams: 165, c: 10, p: 2.6, fiber: 4.4 },
    { name: 'قرنبيط وبروكلي مشويان بالكركم والكمون', baseGrams: 180, c: 8, p: 3.8, fiber: 5.2 },
    { name: 'سلطة الخيار بالزبادي والنعناع المجفف والثوم', baseGrams: 175, c: 7, p: 4.5, fiber: 2.5 },
    { name: 'مشروم طازج مشوي مع الفلفل الأخضر والبصل', baseGrams: 160, c: 6, p: 4.2, fiber: 3.5 },
    { name: 'سلطة الجرجير والرمان والطماطم الشيري', baseGrams: 170, c: 11, p: 2.0, fiber: 4.1 }
  ];

  // Total meals count: 30 * 14 * 13 = 5,460 distinct meals!
  const TOTAL_MEALS_COUNT = MEAL_CORES.length * CARB_SIDES.length * VEGGIE_COMBOS.length;

  let userTargetDailyCalories = 2100;
  let userGoalLabel = 'تنشيف صحي متوازن وبناء عضلي صافي';
  let currentFilterCategory = 'all';
  let currentFilterProtein = 'all';
  let currentSearchQuery = '';
  let currentPage = 1;
  const PAGE_SIZE = 12;

  // Generate meal by index (0 .. 5459) scaled to user's target calories
  function getMealByIndex(index, mealCalorieRatio = 0.28) {
    const coreIdx = index % MEAL_CORES.length;
    const temp = Math.floor(index / MEAL_CORES.length);
    const carbIdx = temp % CARB_SIDES.length;
    const vegIdx = Math.floor(temp / CARB_SIDES.length) % VEGGIE_COMBOS.length;

    const core = MEAL_CORES[coreIdx];
    const carb = CARB_SIDES[carbIdx];
    const veg = VEGGIE_COMBOS[vegIdx];

    // Base unscaled macros
    const oilFatGrams = core.oilGrams;
    const baseProtein = core.baseProteinItem.p + carb.p + veg.p;
    const baseCarbs = core.baseProteinItem.c + carb.c + veg.c;
    const baseFat = core.baseProteinItem.f + carb.f + oilFatGrams;
    const baseCals = baseProtein * 4 + baseCarbs * 4 + baseFat * 9;

    // Target calories for this meal based on user profile
    const targetMealCals = Math.round(userTargetDailyCalories * mealCalorieRatio);
    const scaleFactor = Math.max(0.6, Math.min(1.65, targetMealCals / baseCals));

    const proteinGramsFood = Math.round(core.baseProteinItem.grams * scaleFactor);
    const carbGramsFood = Math.round(carb.baseGrams * scaleFactor);
    const vegGramsFood = Math.round(veg.baseGrams * Math.max(0.85, Math.min(1.25, scaleFactor)));
    const oilGramsScaled = Math.max(5, Math.round(core.oilGrams * scaleFactor));

    const finalProtein = Math.round(baseProtein * scaleFactor);
    const finalCarbs = Math.round(baseCarbs * scaleFactor);
    const finalFat = Math.round((core.baseProteinItem.f + carb.f) * scaleFactor + oilGramsScaled);
    const finalFiber = +(veg.fiber * Math.max(0.85, scaleFactor)).toFixed(1);
    const finalCalories = Math.round(finalProtein * 4 + finalCarbs * 4 + finalFat * 9);

    return {
      mealNumber: index + 1,
      title: `${core.name} مع ${carb.name} و${veg.name}`,
      category: core.category,
      proteinGroup: core.proteinGroup,
      photo: core.photo,
      oilType: core.oilType,
      oilGrams: oilGramsScaled,
      calories: finalCalories,
      macros: {
        protein: finalProtein,
        carbs: finalCarbs,
        fats: finalFat,
        fiber: finalFiber
      },
      ingredientsInGrams: [
        { item: core.baseProteinItem.name, grams: `${proteinGramsFood} جرام` },
        { item: carb.name, grams: `${carbGramsFood} جرام` },
        { item: veg.name, grams: `${vegGramsFood} جرام` },
        { item: core.oilType, grams: `${oilGramsScaled} جرام (${Math.round(oilGramsScaled * 9)} سعرة)` }
      ],
      prepMethod: core.prepMethod
    };
  }

  function getFilteredMealIndices() {
    const matches = [];
    const q = currentSearchQuery.trim().toLowerCase();
    for (let i = 0; i < TOTAL_MEALS_COUNT; i++) {
      const coreIdx = i % MEAL_CORES.length;
      const temp = Math.floor(i / MEAL_CORES.length);
      const carbIdx = temp % CARB_SIDES.length;
      const vegIdx = Math.floor(temp / CARB_SIDES.length) % VEGGIE_COMBOS.length;

      const core = MEAL_CORES[coreIdx];
      if (currentFilterCategory !== 'all' && core.category !== currentFilterCategory) continue;
      if (currentFilterProtein !== 'all' && core.proteinGroup !== currentFilterProtein) continue;

      if (q) {
        const carb = CARB_SIDES[carbIdx];
        const veg = VEGGIE_COMBOS[vegIdx];
        const haystack = `${core.name} ${carb.name} ${veg.name} ${core.oilType} ${core.proteinGroup}`.toLowerCase();
        if (!haystack.includes(q)) continue;
      }
      matches.push(i);
    }
    return matches;
  }

  function renderMealsGrid() {
    const gridEl = document.getElementById('meals-grid-container');
    const countBadge = document.getElementById('meals-total-counter');
    const pageInfoEl = document.getElementById('meals-page-info');
    if (!gridEl) return;

    const filteredIndices = getFilteredMealIndices();
    if (countBadge) {
      countBadge.textContent = `إجمالي البدائل الصحية المتاحة: ${filteredIndices.length.toLocaleString('ar-EG')} وجبة (من أصل ${TOTAL_MEALS_COUNT.toLocaleString('ar-EG')} وجبة محسوبة بالجرامات)`;
    }

    const totalPages = Math.max(1, Math.ceil(filteredIndices.length / PAGE_SIZE));
    if (currentPage > totalPages) currentPage = 1;

    const start = (currentPage - 1) * PAGE_SIZE;
    const slice = filteredIndices.slice(start, start + PAGE_SIZE);

    if (pageInfoEl) {
      pageInfoEl.textContent = `صفحة ${currentPage} من ${totalPages} (عرض ${slice.length} وجبة)`;
    }

    gridEl.innerHTML = slice.map(idx => {
      const m = getMealByIndex(idx);
      const encodedMeal = encodeURIComponent(JSON.stringify(m));
      return `
        <div class="meal-card">
          <div class="meal-img-wrap">
            <img src="${m.photo}" alt="${m.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=700&q=80'" />
            <span class="meal-type-badge">🍽️ ${m.category} | #${m.mealNumber}</span>
            <span class="meal-cal-badge">🔥 ${m.calories} سعرة</span>
          </div>
          <div class="meal-body">
            <div>
              <div style="font-size:0.78rem; color:var(--accent-primary); font-weight:800; margin-bottom:4px;">
                🏷️ المصدر: ${m.proteinGroup}
              </div>
              <h4 style="font-size:1.02rem; font-weight:900; margin-bottom:8px;">${m.title}</h4>
              <div class="meal-macros-row">
                <span>🥩 بروتين: ${m.macros.protein}g</span>
                <span>🌾 كارب: ${m.macros.carbs}g</span>
                <span>🫒 دهون: ${m.macros.fats}g</span>
                <span>🌿 ألياف: ${m.macros.fiber}g</span>
              </div>
              <div class="oil-highlight">
                ✨ الدهون الصحية المضافة: ${m.oilType} (${m.oilGrams} جرام)
              </div>
              <ul class="grams-list">
                ${m.ingredientsInGrams.map(ing => `
                  <li>
                    <span>• ${ing.item}</span>
                    <strong style="color:var(--accent-primary);">${ing.grams}</strong>
                  </li>
                `).join('')}
              </ul>
            </div>
            <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:8px;">
              <button class="btn btn-primary btn-sm" style="flex:1;" onclick="window.openCartoonPrepModal('${encodedMeal}')">
                🎬 فيديو التحضير الكرتوني
              </button>
              <button class="btn btn-outline btn-sm" onclick="window.swapMealCardRandom(this)">
                🔄 بديل فوري
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Daily Personalized 4-Meal Plan Summary (Breakfast, Lunch, Snack, Dinner)
  function renderDailyRecommendedPlan() {
    const container = document.getElementById('daily-smart-plan-cards');
    if (!container) return;

    const slots = [
      { label: 'الإفطار المتوازن (25% من السعرات)', ratio: 0.25, idx: Math.floor(Math.random() * 7) },
      { label: 'الغداء المتنوع بدون ملل (35% من السعرات)', ratio: 0.35, idx: 7 + Math.floor(Math.random() * 17) },
      { label: 'سناك الطاقة / قبل التمرين (15% من السعرات)', ratio: 0.15, idx: 27 + Math.floor(Math.random() * 3) },
      { label: 'العشاء الصحي الخفيف (25% من السعرات)', ratio: 0.25, idx: 24 + Math.floor(Math.random() * 3) }
    ];

    container.innerHTML = slots.map((slot, sIdx) => {
      const randomComboOffset = Math.floor(Math.random() * 140) * MEAL_CORES.length;
      const m = getMealByIndex((slot.idx + randomComboOffset) % TOTAL_MEALS_COUNT, slot.ratio);
      const encodedMeal = encodeURIComponent(JSON.stringify(m));
      return `
        <div class="meal-card" style="border: 2px solid var(--accent-primary);">
          <div class="meal-img-wrap" style="height:165px;">
            <img src="${m.photo}" alt="${m.title}" loading="lazy" />
            <span class="meal-type-badge">${slot.label}</span>
            <span class="meal-cal-badge">🔥 ${m.calories} سعرة</span>
          </div>
          <div class="meal-body">
            <div>
              <h4 style="font-size:0.98rem; font-weight:900;">${m.title}</h4>
              <div class="meal-macros-row">
                <span>بروتين: ${m.macros.protein}g</span>
                <span>كارب: ${m.macros.carbs}g</span>
                <span>دهون: ${m.macros.fats}g</span>
              </div>
              <div class="oil-highlight">🫒 ${m.oilType} (${m.oilGrams} جرام)</div>
              <ul class="grams-list">
                ${m.ingredientsInGrams.map(ing => `<li><span>${ing.item}</span><strong>${ing.grams}</strong></li>`).join('')}
              </ul>
            </div>
            <div style="display:flex; gap:6px;">
              <button class="btn btn-primary btn-sm" style="flex:1;" onclick="window.openCartoonPrepModal('${encodedMeal}')">
                🎬 فيديو التحضير الكرتوني
              </button>
              <button class="btn btn-gold btn-sm" onclick="window.regenerateDailyPlan()">
                🔄 تغيير الوجبة
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // --- CARTOON MEAL PREPARATION VIDEO MODAL (60FPS HTML5 CANVAS) ---
  let prepAnimFrame = null;
  let activePrepMeal = null;
  let prepStartTime = 0;

  window.openCartoonPrepModal = function (encodedMeal) {
    if (window.playUiSound) window.playUiSound('click');
    try {
      activePrepMeal = JSON.parse(decodeURIComponent(encodedMeal));
    } catch (e) {
      return;
    }

    const modal = document.getElementById('cartoon-prep-modal');
    const titleEl = document.getElementById('prep-modal-title');
    const detailsEl = document.getElementById('prep-modal-details');
    if (!modal) return;

    if (titleEl) titleEl.textContent = `👨‍🍳 فيديو التحضير الكرتوني المبسط: ${activePrepMeal.title}`;
    if (detailsEl) {
      detailsEl.innerHTML = `
        <div style="margin-bottom:10px; font-weight:800; color:var(--accent-primary);">
          ⚖️ المقادير المحسوبة بالجرامات لهدفك (${activePrepMeal.calories} سعرة حرارية):
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px,1fr)); gap:8px; margin-bottom:12px;">
          ${activePrepMeal.ingredientsInGrams.map(i => `
            <div style="background:var(--bg-secondary); padding:8px 12px; border-radius:8px; border:1px solid var(--border-color);">
              <strong>${i.item}:</strong> <span style="color:var(--accent-gold);">${i.grams}</span>
            </div>
          `).join('')}
        </div>
        <div style="background:var(--accent-gold-light); padding:10px 14px; border-radius:10px; font-weight:700;">
          📝 <strong>طريقة التحضير الصحية:</strong> ${activePrepMeal.prepMethod}
        </div>
      `;
    }

    modal.classList.add('open');
    prepStartTime = performance.now();
    if (prepAnimFrame) cancelAnimationFrame(prepAnimFrame);
    animateCartoonChef();
  };

  window.closeCartoonPrepModal = function () {
    const modal = document.getElementById('cartoon-prep-modal');
    if (modal) modal.classList.remove('open');
    if (prepAnimFrame) cancelAnimationFrame(prepAnimFrame);
  };

  function animateCartoonChef() {
    const canvas = document.getElementById('cartoon-prep-canvas');
    if (!canvas || !activePrepMeal) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const elapsed = (performance.now() - prepStartTime) / 1000;
    const step = Math.floor(elapsed / 3.5) % 4; // 4 steps, 3.5s each

    ctx.clearRect(0, 0, w, h);

    // Kitchen background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
    bgGrad.addColorStop(0, '#0f172a');
    bgGrad.addColorStop(0.7, '#1e293b');
    bgGrad.addColorStop(1, '#334155');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Kitchen tiles
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.12)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 60) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h * 0.68); ctx.stroke();
    }
    for (let y = 0; y < h * 0.68; y += 45) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    // Cartoon Chef Character (center-left)
    const chefX = 210;
    const chefY = 185 + Math.sin(elapsed * 4) * 4;

    // Chef Hat
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(chefX, chefY - 78, 30, 0, Math.PI * 2);
    ctx.arc(chefX - 22, chefY - 70, 22, 0, Math.PI * 2);
    ctx.arc(chefX + 22, chefY - 70, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(chefX - 28, chefY - 58, 56, 18);

    // Chef Head
    ctx.fillStyle = '#fde68a';
    ctx.beginPath();
    ctx.arc(chefX, chefY - 22, 28, 0, Math.PI * 2);
    ctx.fill();

    // Eyes & Smile
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(chefX - 10, chefY - 26, 3.5, 0, Math.PI * 2);
    ctx.arc(chefX + 10, chefY - 26, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(chefX, chefY - 17, 10, 0.15 * Math.PI, 0.85 * Math.PI);
    ctx.stroke();

    // Chef Coat
    ctx.fillStyle = '#14b8a6';
    ctx.beginPath();
    ctx.roundRect(chefX - 38, chefY + 6, 76, 85, 14);
    ctx.fill();

    // Animated Chef Arm stirring/pouring
    const armAngle = Math.sin(elapsed * 5) * 0.35;
    ctx.save();
    ctx.translate(chefX + 34, chefY + 25);
    ctx.rotate(armAngle);
    ctx.strokeStyle = '#14b8a6';
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(75, 12);
    ctx.stroke();
    ctx.restore();

    // Kitchen Counter
    ctx.fillStyle = '#475569';
    ctx.fillRect(0, h * 0.68, w, h * 0.32);
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(0, h * 0.68, w, 10);

    // Digital Gram Scale on Left Counter
    ctx.fillStyle = '#e2e8f0';
    ctx.beginPath();
    ctx.roundRect(65, h * 0.68 - 32, 110, 32, 6);
    ctx.fill();
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(85, h * 0.68 - 24, 70, 16);
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 12px monospace';
    ctx.textAlign = 'center';
    const currentIng = activePrepMeal.ingredientsInGrams[step % activePrepMeal.ingredientsInGrams.length];
    ctx.fillText(currentIng ? currentIng.grams : '150g', 120, h * 0.68 - 12);

    // Stove & Pan on Center-Right
    const panX = 390;
    const panY = h * 0.68 - 18;
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(panX - 65, panY, 130, 18);

    // Flame glow
    ctx.fillStyle = '#f59e0b';
    for (let f = -45; f <= 45; f += 18) {
      ctx.beginPath();
      ctx.arc(panX + f, panY + 2, 5 + Math.sin(elapsed * 12 + f) * 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Skillet / Pot
    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.roundRect(panX - 60, panY - 38, 120, 36, 10);
    ctx.fill();

    // Steam particles rising
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 2.5;
    for (let s = -30; s <= 30; s += 30) {
      const sy = panY - 48 - ((elapsed * 30 + s) % 45);
      ctx.beginPath();
      ctx.arc(panX + s + Math.sin(elapsed * 4 + s) * 6, sy, 8, 0, Math.PI);
      ctx.stroke();
    }

    // Sinai Olive Oil / Baladi Ghee Golden Bottle on Right
    const bottleX = 585;
    const bottleY = h * 0.68 - 88;
    ctx.fillStyle = '#065f46';
    ctx.beginPath();
    ctx.roundRect(bottleX, bottleY, 48, 88, 10);
    ctx.fill();
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(bottleX + 6, bottleY + 24, 36, 36);
    ctx.fillStyle = '#064e3b';
    ctx.font = 'bold 9px Cairo, sans-serif';
    ctx.fillText('مزارع سيناء', bottleX + 24, bottleY + 42);
    ctx.fillText('100% بكر', bottleX + 24, bottleY + 54);

    // Step Banner Overlay at Top
    const stepTitles = [
      `الخطوة 1/4: وزن المكونات بدقة على الميزان (${currentIng ? currentIng.item + ' ' + currentIng.grams : ''})`,
      `الخطوة 2/4: تجهيز الخضروات الطازجة والبروتين الصحي بدون دهون مهدرجة`,
      `الخطوة 3/4: إضافة ${activePrepMeal.oilType} (${activePrepMeal.oilGrams} جرام محسوب السعرات)`,
      `الخطوة 4/4: التقديم النهائي (${activePrepMeal.calories} سعرة | بروتين ${activePrepMeal.macros.protein}g)`
    ];

    ctx.fillStyle = 'rgba(6, 78, 59, 0.92)';
    ctx.beginPath();
    ctx.roundRect(24, 16, w - 48, 48, 12);
    ctx.fill();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#fef3c7';
    ctx.font = 'bold 16px Cairo, Tajawal, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(stepTitles[step], w / 2, 46);

    // Progress dots at bottom
    for (let i = 0; i < 4; i++) {
      ctx.fillStyle = i === step ? '#f59e0b' : 'rgba(255,255,255,0.3)';
      ctx.beginPath();
      ctx.arc(w / 2 - 45 + i * 30, h - 22, i === step ? 8 : 5, 0, Math.PI * 2);
      ctx.fill();
    }

    prepAnimFrame = requestAnimationFrame(animateCartoonChef);
  }

  // Public helpers for filters & pagination
  window.filterMealsByCategory = function (cat) {
    currentFilterCategory = cat;
    currentPage = 1;
    renderMealsGrid();
  };

  window.filterMealsByProtein = function (prot) {
    currentFilterProtein = prot;
    currentPage = 1;
    renderMealsGrid();
  };

  window.searchMealsInput = function (val) {
    currentSearchQuery = val;
    currentPage = 1;
    renderMealsGrid();
  };

  window.changeMealsPage = function (delta) {
    const total = Math.max(1, Math.ceil(getFilteredMealIndices().length / PAGE_SIZE));
    currentPage = Math.max(1, Math.min(total, currentPage + delta));
    renderMealsGrid();
    if (window.playUiSound) window.playUiSound('click');
  };

  window.swapMealCardRandom = function () {
    const total = Math.max(1, Math.ceil(getFilteredMealIndices().length / PAGE_SIZE));
    currentPage = 1 + Math.floor(Math.random() * total);
    renderMealsGrid();
    if (window.playUiSound) window.playUiSound('click');
  };

  window.regenerateDailyPlan = function () {
    renderDailyRecommendedPlan();
    if (window.playUiSound) window.playUiSound('click');
  };

  window.updateMealsForUserCalories = function (targetCalories, goalText) {
    userTargetDailyCalories = targetCalories || 2100;
    if (goalText) userGoalLabel = goalText;
    renderDailyRecommendedPlan();
    renderMealsGrid();
  };

  window.addEventListener('DOMContentLoaded', () => {
    renderDailyRecommendedPlan();
    renderMealsGrid();
  });
})();
