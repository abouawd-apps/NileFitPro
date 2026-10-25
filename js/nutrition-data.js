/* ==========================================================================
   NileFitPro - Smart Nutrition, Ideal Weight Calculator & 60,000+ Meals Engine
   Features:
   - Ideal / Healthy Weight for Height & Age + BMI, BMR, TDEE & Grams
   - 66,880 Smart Balanced Meal Combinations (44 Proteins × 38 Carbs × 40 Veggies)
   - Realistic variety (Eggs, Cottage Cheese, Foul, Lentils, Fish, Legumes, Moderate Poultry/Meat)
   - Mandatory Sinai Farms 100% Natural Virgin Olive Oil or Natural Baladi Ghee in every oil-based meal
   - Realistic Food Photo + Illustrative Visual Plate Diagram (SVG) for Every Meal
   - Interactive Simplified Cartoon Recipe Preparation Video Player
   ========================================================================== */

window.PROTEIN_SOURCES = [
  { id: 'p1', name: 'جبنة قريش طازجة بالخضار', en: 'Fresh Cottage Cheese', cat: 'breakfast', baseGrams: 150, calPer100: 98, pPer100: 11.5, cPer100: 3.4, fPer100: 4.3, oilType: 'sinai_olive', img: 'https://images.unsplash.com/photo-1559561853-08451507cbe7?auto=format&fit=crop&w=600&q=80' },
  { id: 'p2', name: 'بيض بلدي مسلوق أو أومليت صحي', en: 'Organic Eggs (Boiled/Omelet)', cat: 'breakfast', baseGrams: 130, calPer100: 155, pPer100: 13.0, cPer100: 1.1, fPer100: 11.0, oilType: 'baladi_ghee', img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80' },
  { id: 'p3', name: 'فول مدمس بالليمون والكمون', en: 'Egyptian Foul Medames', cat: 'breakfast', baseGrams: 180, calPer100: 110, pPer100: 7.6, cPer100: 19.0, fPer100: 0.5, oilType: 'sinai_olive', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80' },
  { id: 'p4', name: 'زبادي يوناني طبيعي عالي البروتين', en: 'High-Protein Greek Yogurt', cat: 'dinner', baseGrams: 170, calPer100: 97, pPer100: 10.0, cPer100: 3.8, fPer100: 4.5, oilType: 'sinai_olive', img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80' },
  { id: 'p5', name: 'عدس أصفر أو بجبة مطبوخ صحي', en: 'Golden Lentil Stew', cat: 'lunch', baseGrams: 200, calPer100: 116, pPer100: 9.0, cPer100: 20.0, fPer100: 0.4, oilType: 'baladi_ghee', img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80' },
  { id: 'p6', name: 'حمص الشام المسلوق المتبل', en: 'Spiced Boiled Chickpeas', cat: 'snack', baseGrams: 150, calPer100: 164, pPer100: 8.9, cPer100: 27.4, fPer100: 2.6, oilType: 'sinai_olive', img: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=600&q=80' },
  { id: 'p7', name: 'صدور دجاج مشوية بالأعشاب (حصة معتدلة)', en: 'Herb Grilled Chicken Breast', cat: 'lunch', baseGrams: 140, calPer100: 165, pPer100: 31.0, cPer100: 0.0, fPer100: 3.6, oilType: 'sinai_olive', img: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=600&q=80' },
  { id: 'p8', name: 'سمك بلطي مشوي بالردة والليمون', en: 'Grilled Nile Tilapia Fish', cat: 'lunch', baseGrams: 160, calPer100: 128, pPer100: 26.0, cPer100: 0.0, fPer100: 2.7, oilType: 'sinai_olive', img: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80' },
  { id: 'p9', name: 'تونة قطع مصفاة بالليمون والفلفل', en: 'Drained Chunk Light Tuna', cat: 'dinner', baseGrams: 130, calPer100: 116, pPer100: 25.5, cPer100: 0.0, fPer100: 1.0, oilType: 'sinai_olive', img: 'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?auto=format&fit=crop&w=600&q=80' },
  { id: 'p10', name: 'شيش طاووق مشوي بالخضار', en: 'Grilled Shish Tawook Skewers', cat: 'lunch', baseGrams: 145, calPer100: 158, pPer100: 27.5, cPer100: 2.0, fPer100: 4.2, oilType: 'sinai_olive', img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80' },
  { id: 'p11', name: 'فاصوليا بيضاء مطبوخة بصلصة طماطم طازجة', en: 'White Beans in Fresh Tomato', cat: 'lunch', baseGrams: 180, calPer100: 139, pPer100: 9.7, cPer100: 25.0, fPer100: 0.5, oilType: 'baladi_ghee', img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80' },
  { id: 'p12', name: 'سمك ماكريل أو سردين مشوي غني بأوميجا 3', en: 'Omega-3 Grilled Mackerel/Sardines', cat: 'lunch', baseGrams: 140, calPer100: 205, pPer100: 24.0, cPer100: 0.0, fPer100: 11.8, oilType: 'sinai_olive', img: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80' },
  { id: 'p13', name: 'شرائح لحم بقري صافي مشوي (حصة معتدلة)', en: 'Lean Grilled Beef Tenderloin', cat: 'lunch', baseGrams: 125, calPer100: 202, pPer100: 28.0, cPer100: 0.0, fPer100: 9.2, oilType: 'baladi_ghee', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80' },
  { id: 'p14', name: 'بيض عيون بالمشروم الطازج والسبانخ', en: 'Eggs with Fresh Mushrooms & Spinach', cat: 'breakfast', baseGrams: 160, calPer100: 132, pPer100: 11.2, cPer100: 2.8, fPer100: 8.5, oilType: 'baladi_ghee', img: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=600&q=80' },
  { id: 'p15', name: 'كبدة بلدي مشوية بالثوم والكزبرة والليمون', en: 'Grilled Baladi Beef Liver', cat: 'lunch', baseGrams: 135, calPer100: 175, pPer100: 26.5, cPer100: 3.8, fPer100: 5.2, oilType: 'baladi_ghee', img: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80' },
  { id: 'p16', name: 'شرائح صدور رومي مدخنة أو مشوية', en: 'Roasted Turkey Breast Slices', cat: 'dinner', baseGrams: 130, calPer100: 135, pPer100: 29.0, cPer100: 1.0, fPer100: 1.5, oilType: 'sinai_olive', img: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=600&q=80' },
  { id: 'p17', name: 'فيليه سلمون مشوي بالليمون والشبت', en: 'Lemon Dill Grilled Salmon', cat: 'lunch', baseGrams: 135, calPer100: 208, pPer100: 22.5, cPer100: 0.0, fPer100: 12.4, oilType: 'sinai_olive', img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80' },
  { id: 'p18', name: 'جمبري مشوي بالثوم والكمون', en: 'Garlic Cumin Grilled Shrimp', cat: 'lunch', baseGrams: 150, calPer100: 99, pPer100: 24.0, cPer100: 0.2, fPer100: 0.3, oilType: 'sinai_olive', img: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=600&q=80' },
  { id: 'p19', name: 'طاجن لوبيا باللحم المفروم الصافي', en: 'Black-Eyed Peas with Lean Minced Beef', cat: 'lunch', baseGrams: 170, calPer100: 145, pPer100: 14.5, cPer100: 15.0, fPer100: 3.5, oilType: 'baladi_ghee', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80' },
  { id: 'p20', name: 'فلافل مصرية مشوية بالفرن مع بيضة مسلوقة', en: 'Oven-Baked Egyptian Falafel & Egg', cat: 'breakfast', baseGrams: 150, calPer100: 168, pPer100: 11.4, cPer100: 18.5, fPer100: 5.2, oilType: 'sinai_olive', img: 'https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?auto=format&fit=crop&w=600&q=80' },
  { id: 'p21', name: 'سلطة حمص بالطحينة والزبادي وبذور الشيا', en: 'Hummus Tahini Yogurt Bowl', cat: 'dinner', baseGrams: 160, calPer100: 152, pPer100: 9.2, cPer100: 16.4, fPer100: 5.8, oilType: 'sinai_olive', img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80' },
  { id: 'p22', name: 'كفتة مشوية صافية على الفحم بالبقدونس', en: 'Lean Charcoal Grilled Kofta', cat: 'lunch', baseGrams: 130, calPer100: 195, pPer100: 25.0, cPer100: 2.0, fPer100: 9.5, oilType: 'baladi_ghee', img: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=600&q=80' },
  { id: 'p23', name: 'جبنة فيتا لايت مع بيض مسلوق وزيتون', en: 'Light Feta Cheese & Boiled Eggs', cat: 'breakfast', baseGrams: 145, calPer100: 148, pPer100: 13.5, cPer100: 2.2, fPer100: 9.4, oilType: 'sinai_olive', img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80' },
  { id: 'p24', name: 'بصارة مصرية صحية بالفول المدشوش والخضرة', en: 'Traditional Healthy Egyptian Bissara', cat: 'lunch', baseGrams: 190, calPer100: 108, pPer100: 8.4, cPer100: 17.5, fPer100: 0.8, oilType: 'sinai_olive', img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80' },
  { id: 'p25', name: 'ترمس حلو مسلوق مع جبنة قريش بالكمون', en: 'Lupini Beans & Spiced Cottage Cheese', cat: 'snack', baseGrams: 160, calPer100: 112, pPer100: 13.8, cPer100: 8.5, fPer100: 2.4, oilType: 'sinai_olive', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80' },
  { id: 'p26', name: 'شوفان بالحليب الدافئ والمكسرات النيئة وبذور الكتان', en: 'Warm Protein Oatmeal with Raw Nuts', cat: 'breakfast', baseGrams: 180, calPer100: 138, pPer100: 8.6, cPer100: 19.2, fPer100: 3.4, oilType: 'baladi_ghee', img: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=600&q=80' },
  { id: 'p27', name: 'كشري مصري صحي (عدس وحمص أكثر وأرز أقل)', en: 'High-Protein Healthy Egyptian Koshary', cat: 'lunch', baseGrams: 210, calPer100: 142, pPer100: 8.8, cPer100: 24.5, fPer100: 1.2, oilType: 'sinai_olive', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80' },
  { id: 'p28', name: 'شكشوكة بيض بالطماطم والفلفل الألوان', en: 'Egyptian Egg Shakshuka', cat: 'breakfast', baseGrams: 175, calPer100: 124, pPer100: 10.4, cPer100: 4.8, fPer100: 7.2, oilType: 'baladi_ghee', img: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=600&q=80' },
  { id: 'p29', name: 'سمك بوري أو قاروص مشوي بالفرن مع الكرفس', en: 'Oven-Grilled Sea Bass with Celery', cat: 'lunch', baseGrams: 155, calPer100: 134, pPer100: 24.2, cPer100: 0.5, fPer100: 3.8, oilType: 'sinai_olive', img: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80' },
  { id: 'p30', name: 'أوراك دجاج مخبوزة بالروزماري والليمون', en: 'Rosemary Lemon Baked Chicken Thighs', cat: 'lunch', baseGrams: 140, calPer100: 176, pPer100: 25.0, cPer100: 0.0, fPer100: 8.1, oilType: 'sinai_olive', img: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80' },
  { id: 'p31', name: 'مجدرة العدس الأسمر والبرغل الصحي', en: 'Healthy Brown Lentil Mujaddara', cat: 'lunch', baseGrams: 195, calPer100: 128, pPer100: 8.9, cPer100: 22.0, fPer100: 1.1, oilType: 'sinai_olive', img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80' },
  { id: 'p32', name: 'جبنة قريش ببذور الكتان وعين الجمل والزعتر', en: 'Cottage Cheese with Flaxseed & Zaatar', cat: 'dinner', baseGrams: 155, calPer100: 115, pPer100: 12.2, cPer100: 3.6, fPer100: 5.4, oilType: 'sinai_olive', img: 'https://images.unsplash.com/photo-1559561853-08451507cbe7?auto=format&fit=crop&w=600&q=80' },
  { id: 'p33', name: 'طاجن فول بالبيض البلدي في الفرن', en: 'Oven Baked Fava Beans with Eggs', cat: 'breakfast', baseGrams: 185, calPer100: 132, pPer100: 10.2, cPer100: 14.5, fPer100: 4.1, oilType: 'baladi_ghee', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80' },
  { id: 'p34', name: 'سبيط وكاليماري مشوي بالليمون والكمون', en: 'Grilled Lemon Cumin Calamari', cat: 'lunch', baseGrams: 155, calPer100: 104, pPer100: 18.8, cPer100: 3.1, fPer100: 1.6, oilType: 'sinai_olive', img: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=600&q=80' },
  { id: 'p35', name: 'فاصوليا حمراء مطبوخة بالكزبرة والكمون', en: 'Spiced Red Kidney Beans Bowl', cat: 'lunch', baseGrams: 175, calPer100: 127, pPer100: 8.7, cPer100: 22.8, fPer100: 0.5, oilType: 'sinai_olive', img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80' },
  { id: 'p36', name: 'بيض بوشيه مع شرائح الأفوكادو والزعتر البري', en: 'Poached Eggs with Avocado & Oregano', cat: 'breakfast', baseGrams: 150, calPer100: 158, pPer100: 11.8, cPer100: 3.5, fPer100: 11.4, oilType: 'sinai_olive', img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80' },
  { id: 'p37', name: 'شرائح فاهيتا دجاج مشوية بالفلفل الألوان والبصل', en: 'Grilled Chicken Fajita Strips', cat: 'lunch', baseGrams: 155, calPer100: 148, pPer100: 26.4, cPer100: 3.5, fPer100: 3.2, oilType: 'sinai_olive', img: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=600&q=80' },
  { id: 'p38', name: 'جبنة ريكوتا لايت مع بذور الشيا والقرفة', en: 'Light Ricotta & Chia Protein Bowl', cat: 'snack', baseGrams: 150, calPer100: 136, pPer100: 11.4, cPer100: 5.1, fPer100: 7.8, oilType: 'sinai_olive', img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80' },
  { id: 'p39', name: 'كباب حلة بلدي صافي بالبصل المكرمل صحياً', en: 'Lean Egyptian Beef Kabab Halla', cat: 'lunch', baseGrams: 135, calPer100: 188, pPer100: 26.8, cPer100: 3.4, fPer100: 7.5, oilType: 'baladi_ghee', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80' },
  { id: 'p40', name: 'فيليه سمك قشر بياض مشوي بالأعشاب والليمون', en: 'Grilled Nile Perch Fillet with Herbs', cat: 'dinner', baseGrams: 160, calPer100: 118, pPer100: 24.8, cPer100: 0.0, fPer100: 1.9, oilType: 'sinai_olive', img: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80' },
  { id: 'p41', name: 'عجة بيض مصرية بالخضرة المشكلة في الفرن', en: 'Baked Egyptian Herb Egg Ejjah', cat: 'breakfast', baseGrams: 165, calPer100: 134, pPer100: 11.6, cPer100: 5.2, fPer100: 7.4, oilType: 'baladi_ghee', img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80' },
  { id: 'p42', name: 'جبنة حلوم لايت مشوية على الجريل بالزعتر البري', en: 'Grilled Light Halloumi with Wild Thyme', cat: 'dinner', baseGrams: 130, calPer100: 178, pPer100: 16.5, cPer100: 2.2, fPer100: 11.5, oilType: 'sinai_olive', img: 'https://images.unsplash.com/photo-1559561853-08451507cbe7?auto=format&fit=crop&w=600&q=80' },
  { id: 'p43', name: 'طاجن فريك بصدر الدجاج المشوي والمشروم', en: 'Freekeh Tajine with Grilled Chicken & Mushrooms', cat: 'lunch', baseGrams: 160, calPer100: 149, pPer100: 22.4, cPer100: 7.5, fPer100: 3.1, oilType: 'baladi_ghee', img: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=600&q=80' },
  { id: 'p44', name: 'سلطة تونة بالذرة الحلوة والفاصوليا الحمراء والليمون', en: 'Tuna Salad with Sweet Corn & Red Beans', cat: 'dinner', baseGrams: 165, calPer100: 126, pPer100: 21.0, cPer100: 6.8, fPer100: 1.5, oilType: 'sinai_olive', img: 'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?auto=format&fit=crop&w=600&q=80' }
];

window.CARB_SOURCES = [
  { id: 'c1', name: 'خبز بلدي أسمر كامل الحبة', baseGrams: 75, calPer100: 247, pPer100: 9.0, cPer100: 48.0, fPer100: 1.5 },
  { id: 'c2', name: 'أرز بسمتي مسلوق على البخار', baseGrams: 130, calPer100: 121, pPer100: 3.5, cPer100: 25.2, fPer100: 0.4 },
  { id: 'c3', name: 'أرز بني كامل الحبة', baseGrams: 130, calPer100: 112, pPer100: 2.6, cPer100: 23.5, fPer100: 0.9 },
  { id: 'c4', name: 'بطاطا حلوة مشوية بالفرن', baseGrams: 150, calPer100: 86, pPer100: 1.6, cPer100: 20.1, fPer100: 0.1 },
  { id: 'c5', name: 'بطاطس مسلوقة أو مشوية بالأعشاب', baseGrams: 150, calPer100: 87, pPer100: 1.9, cPer100: 20.0, fPer100: 0.1 },
  { id: 'c6', name: 'فريك بلدي مطبوخ بالشوربة الصافية', baseGrams: 120, calPer100: 130, pPer100: 4.5, cPer100: 26.0, fPer100: 0.8 },
  { id: 'c7', name: 'برغل أسمر متبل بالبقدونس', baseGrams: 125, calPer100: 83, pPer100: 3.1, cPer100: 18.6, fPer100: 0.2 },
  { id: 'c8', name: 'كينوا مطبوخة بالليمون والنعناع', baseGrams: 120, calPer100: 120, pPer100: 4.4, cPer100: 21.3, fPer100: 1.9 },
  { id: 'c9', name: 'خبز شوفان محمص غني بالألياف', baseGrams: 70, calPer100: 260, pPer100: 10.5, cPer100: 46.0, fPer100: 3.2 },
  { id: 'c10', name: 'مكرونة قمح كامل بالريحان', baseGrams: 120, calPer100: 124, pPer100: 5.3, cPer100: 26.5, fPer100: 0.5 },
  { id: 'c11', name: 'توست أسمر بالحبوب الكاملة', baseGrams: 65, calPer100: 252, pPer100: 11.0, cPer100: 43.0, fPer100: 3.5 },
  { id: 'c12', name: 'ذرة حلوة مشوية أو مسلوقة', baseGrams: 120, calPer100: 96, pPer100: 3.4, cPer100: 21.0, fPer100: 1.5 },
  { id: 'c13', name: 'رقائق شوفان كاملة بالحليب اللوزي', baseGrams: 65, calPer100: 379, pPer100: 13.2, cPer100: 67.7, fPer100: 6.5 },
  { id: 'c14', name: 'خبز شعير صحي منخفض المؤشر السكري', baseGrams: 75, calPer100: 230, pPer100: 8.8, cPer100: 44.0, fPer100: 1.8 },
  { id: 'c15', name: 'أرز مصري مطبوخ على البخار بكمية محسوبة', baseGrams: 115, calPer100: 130, pPer100: 2.7, cPer100: 28.0, fPer100: 0.3 },
  { id: 'c16', name: 'طاجن خضار مشكل بالبازلاء والجزر', baseGrams: 160, calPer100: 72, pPer100: 3.8, cPer100: 13.5, fPer100: 0.3 },
  { id: 'c17', name: 'قرع عسلي مشوي بالقرفة', baseGrams: 165, calPer100: 45, pPer100: 1.1, cPer100: 11.7, fPer100: 0.1 },
  { id: 'c18', name: 'قلقاس مسلوق بالكزبرة الخضراء والثوم', baseGrams: 130, calPer100: 112, pPer100: 1.5, cPer100: 26.5, fPer100: 0.2 },
  { id: 'c19', name: 'تورتيلا شوفان وحبوب الشيا', baseGrams: 65, calPer100: 245, pPer100: 8.5, cPer100: 42.0, fPer100: 4.0 },
  { id: 'c20', name: 'حمص مسلوق مع مكعبات بطاطس مشوية', baseGrams: 135, calPer100: 118, pPer100: 5.2, cPer100: 22.8, fPer100: 1.1 },
  { id: 'c21', name: 'لسان عصفور محمص بدون دهون بالشوربة', baseGrams: 115, calPer100: 122, pPer100: 4.2, cPer100: 25.0, fPer100: 0.6 },
  { id: 'c22', name: 'فواكه طازجة (تفاح أخضر وتمر محسوب)', baseGrams: 140, calPer100: 82, pPer100: 0.9, cPer100: 20.5, fPer100: 0.2 },
  { id: 'c23', name: 'حنطة سوداء (باكويت) مسلوقة بالأعشاب', baseGrams: 120, calPer100: 92, pPer100: 3.4, cPer100: 19.9, fPer100: 0.6 },
  { id: 'c24', name: 'ودجز بطاطس مشوية بالفرن بالزعتر والبابريكا', baseGrams: 145, calPer100: 93, pPer100: 2.1, cPer100: 21.0, fPer100: 0.2 },
  { id: 'c25', name: 'كسكسي قمح كامل بالخضروات المبوخة', baseGrams: 125, calPer100: 112, pPer100: 3.8, cPer100: 23.2, fPer100: 0.2 },
  { id: 'c26', name: 'رقائق الأرز البني المحمصة بالسمسم', baseGrams: 50, calPer100: 387, pPer100: 8.2, cPer100: 81.5, fPer100: 2.8 },
  { id: 'c27', name: 'شعير نبوي مطبوخ (تلبينة صحية خفيفة)', baseGrams: 135, calPer100: 123, pPer100: 3.5, cPer100: 28.2, fPer100: 0.4 },
  { id: 'c28', name: 'مكعبات بنجر وبطاطا حلوة مشوية بالفرن', baseGrams: 155, calPer100: 68, pPer100: 1.7, cPer100: 15.4, fPer100: 0.2 },
  { id: 'c29', name: 'خبز بيتا أسمر بالردة والسن', baseGrams: 70, calPer100: 250, pPer100: 9.8, cPer100: 50.0, fPer100: 1.7 },
  { id: 'c30', name: 'مكرونة عدس أحمر عالية البروتين والألياف', baseGrams: 110, calPer100: 148, pPer100: 12.0, cPer100: 24.0, fPer100: 1.1 },
  { id: 'c31', name: 'بطاطس صغيرة مسلوقة بالقشر مع البقدونس', baseGrams: 150, calPer100: 85, pPer100: 2.0, cPer100: 19.5, fPer100: 0.1 },
  { id: 'c32', name: 'حبوب الدخن المطبوخة على البخار', baseGrams: 125, calPer100: 119, pPer100: 3.5, cPer100: 23.7, fPer100: 1.0 },
  { id: 'c33', name: 'أرز بسمتي بالكركم والقرنفل والقرفة', baseGrams: 125, calPer100: 122, pPer100: 3.4, cPer100: 25.5, fPer100: 0.5 },
  { id: 'c34', name: 'شرائح خبز مشبعة ببذور الكتان وعباد الشمس', baseGrams: 60, calPer100: 268, pPer100: 12.5, cPer100: 38.0, fPer100: 6.5 },
  { id: 'c35', name: 'مزيج الأرز البري والبني المسلوق', baseGrams: 125, calPer100: 108, pPer100: 4.0, cPer100: 21.8, fPer100: 0.5 },
  { id: 'c36', name: 'فطائر نخالة الشوفان الصحية بدون سكر', baseGrams: 85, calPer100: 195, pPer100: 8.5, cPer100: 34.0, fPer100: 2.8 },
  { id: 'c37', name: 'خبز صاج أسمر خفيف بالحبوب الكاملة', baseGrams: 70, calPer100: 242, pPer100: 9.2, cPer100: 47.0, fPer100: 1.6 },
  { id: 'c38', name: 'أرز بسمتي بالزعفران والبازلاء الخضراء', baseGrams: 130, calPer100: 118, pPer100: 3.8, cPer100: 24.4, fPer100: 0.5 }
];

window.VEGGIE_SIDES = [
  { id: 'v1', name: 'سلطة خضراء بلدي (طماطم، خيار، جرجير، بقدونس)', baseGrams: 180, calPer100: 22, pPer100: 1.2, cPer100: 4.2, fPer100: 0.2 },
  { id: 'v2', name: 'خضار سوتيه على البخار (بروكلي، كوسة، فاصوليا خضراء)', baseGrams: 170, calPer100: 34, pPer100: 2.4, cPer100: 6.5, fPer100: 0.3 },
  { id: 'v3', name: 'سلطة جرجير بالبنجر والرمان وعصير الليمون', baseGrams: 160, calPer100: 38, pPer100: 1.8, cPer100: 7.8, fPer100: 0.3 },
  { id: 'v4', name: 'بابا غنوج مشوي بدون قلي بالبقدونس والليمون', baseGrams: 140, calPer100: 65, pPer100: 2.1, cPer100: 8.4, fPer100: 2.8 },
  { id: 'v5', name: 'طاجن بامية صحية بالفرن', baseGrams: 165, calPer100: 36, pPer100: 2.0, cPer100: 7.2, fPer100: 0.2 },
  { id: 'v6', name: 'سبانخ مطبوخة طازجة بالثوم والليمون', baseGrams: 175, calPer100: 28, pPer100: 2.9, cPer100: 3.8, fPer100: 0.4 },
  { id: 'v7', name: 'ملوخية خضراء طازجة بطريقة صحية', baseGrams: 180, calPer100: 39, pPer100: 3.4, cPer100: 5.8, fPer100: 0.4 },
  { id: 'v8', name: 'سلطة تبولة شامية بالبقدونس والليمون', baseGrams: 150, calPer100: 48, pPer100: 2.2, cPer100: 8.5, fPer100: 0.7 },
  { id: 'v9', name: 'طاجن كوسة بالفرن مع الطماطم والريحان', baseGrams: 180, calPer100: 26, pPer100: 1.5, cPer100: 4.8, fPer100: 0.2 },
  { id: 'v10', name: 'سلطة ملفوف أحمر وأخضر بالجزر المبشور', baseGrams: 160, calPer100: 31, pPer100: 1.4, cPer100: 6.8, fPer100: 0.2 },
  { id: 'v11', name: 'فاصوليا خضراء مطبوخة بالطماطم الطازجة', baseGrams: 170, calPer100: 35, pPer100: 1.9, cPer100: 7.1, fPer100: 0.2 },
  { id: 'v12', name: 'باذنجان وفلفل رومي مشوي بالخل والثوم', baseGrams: 155, calPer100: 32, pPer100: 1.2, cPer100: 6.4, fPer100: 0.3 },
  { id: 'v13', name: 'سلطة خيار بالزبادي والنعناع المجفف', baseGrams: 150, calPer100: 44, pPer100: 3.1, cPer100: 4.9, fPer100: 1.2 },
  { id: 'v14', name: 'بروكلي وقرنبيط مشوي بالفرن بالكركم', baseGrams: 165, calPer100: 33, pPer100: 2.6, cPer100: 5.9, fPer100: 0.3 },
  { id: 'v15', name: 'سلطة أفوكادو وخس وطماطم شيري', baseGrams: 145, calPer100: 78, pPer100: 1.6, cPer100: 5.5, fPer100: 5.8 },
  { id: 'v16', name: 'طاجن تورلي خضروات مشكلة بالفرن', baseGrams: 180, calPer100: 41, pPer100: 2.1, cPer100: 7.9, fPer100: 0.3 },
  { id: 'v17', name: 'خرشوف مسلوق بالليمون والبقدونس', baseGrams: 150, calPer100: 47, pPer100: 3.3, cPer100: 10.5, fPer100: 0.2 },
  { id: 'v18', name: 'سلطة كابوتشا وجرجير وخيار بالليمون', baseGrams: 175, calPer100: 19, pPer100: 1.3, cPer100: 3.5, fPer100: 0.2 },
  { id: 'v19', name: 'هليون (أسبراجوس) مشوي بالليمون والثوم', baseGrams: 150, calPer100: 24, pPer100: 2.2, cPer100: 3.9, fPer100: 0.2 },
  { id: 'v20', name: 'كرنب بروكسل مشوي بالفرن مع الأعشاب', baseGrams: 155, calPer100: 43, pPer100: 3.4, cPer100: 8.9, fPer100: 0.3 },
  { id: 'v21', name: 'سلطة يونانية بالخيار والطماطم والزيتون والزعتر', baseGrams: 165, calPer100: 45, pPer100: 1.6, cPer100: 5.2, fPer100: 2.1 },
  { id: 'v22', name: 'سلطة شمر طازج بشرائح البرتقال والجرجير', baseGrams: 160, calPer100: 34, pPer100: 1.3, cPer100: 7.4, fPer100: 0.2 },
  { id: 'v23', name: 'شوربة طماطم وفلفل أحمر مشوي بالريحان', baseGrams: 185, calPer100: 36, pPer100: 1.5, cPer100: 7.1, fPer100: 0.4 },
  { id: 'v24', name: 'مشروم طازج سوتيه مع الكرات والبقدونس', baseGrams: 150, calPer100: 29, pPer100: 3.1, cPer100: 4.1, fPer100: 0.4 },
  { id: 'v25', name: 'أوراق الكيل (Kale) المطهوة على البخار بالليمون', baseGrams: 155, calPer100: 35, pPer100: 2.9, cPer100: 4.4, fPer100: 0.6 },
  { id: 'v26', name: 'سلطة كرفس وتفاح أخضر وخيار مقرمش', baseGrams: 160, calPer100: 28, pPer100: 0.9, cPer100: 6.2, fPer100: 0.2 },
  { id: 'v27', name: 'شرائح كوسة مشوية على الجريل بالنعناع', baseGrams: 175, calPer100: 21, pPer100: 1.4, cPer100: 3.6, fPer100: 0.3 },
  { id: 'v28', name: 'سلطة طماطم بالثوم والكمون والكسبرة الخضراء', baseGrams: 170, calPer100: 23, pPer100: 1.1, cPer100: 4.6, fPer100: 0.2 },
  { id: 'v29', name: 'جزر وبسلة خضراء مطهوة على البخار', baseGrams: 155, calPer100: 52, pPer100: 2.8, cPer100: 10.2, fPer100: 0.3 },
  { id: 'v30', name: 'سلطة فجل أحمر وجرجير وبصل أخضر بالليمون', baseGrams: 165, calPer100: 20, pPer100: 1.2, cPer100: 3.9, fPer100: 0.1 },
  { id: 'v31', name: 'مكعبات كوسة وباذنجان مشوية بالأوريجانو', baseGrams: 170, calPer100: 29, pPer100: 1.3, cPer100: 5.8, fPer100: 0.3 },
  { id: 'v32', name: 'سلطة بنجر مسلوق بالكمون والبقدونس', baseGrams: 160, calPer100: 43, pPer100: 1.6, cPer100: 9.6, fPer100: 0.2 },
  { id: 'v33', name: 'سلق أخضر مطبوخ بالثوم والليمون والكزبرة', baseGrams: 175, calPer100: 25, pPer100: 2.2, cPer100: 4.1, fPer100: 0.2 },
  { id: 'v34', name: 'شوربة كوسة وبروكلي وكرفس حارقة ومشبعة', baseGrams: 190, calPer100: 27, pPer100: 1.9, cPer100: 4.8, fPer100: 0.2 },
  { id: 'v35', name: 'فلفل ألوان محشي خضروات وأعشاب بالفرن', baseGrams: 165, calPer100: 33, pPer100: 1.4, cPer100: 6.7, fPer100: 0.3 },
  { id: 'v36', name: 'سلطة خيار وشبت وفلفل أخضر بخل التفاح', baseGrams: 175, calPer100: 18, pPer100: 0.9, cPer100: 3.6, fPer100: 0.1 },
  { id: 'v37', name: 'أرز قرنبيط مبشور مطهو على البخار بالكمون', baseGrams: 165, calPer100: 25, pPer100: 1.9, cPer100: 5.0, fPer100: 0.3 },
  { id: 'v38', name: 'سلطة بقدونسية بالسماق والطماطم والليمون', baseGrams: 155, calPer100: 32, pPer100: 2.4, cPer100: 5.8, fPer100: 0.4 },
  { id: 'v39', name: 'ورق عنب صحي محشي خضار وأرز بني قليل بزيت سيناء', baseGrams: 150, calPer100: 68, pPer100: 2.3, cPer100: 12.8, fPer100: 0.8 },
  { id: 'v40', name: 'سلطة جرجير وفجل وخس مع بذور الكتان والليمون', baseGrams: 170, calPer100: 26, pPer100: 1.7, cPer100: 4.1, fPer100: 0.5 }
];

// Total combinations: 44 * 38 * 40 = 66,880 healthy meals (over 60,000 meals!)
window.TOTAL_MEAL_COMBINATIONS = window.PROTEIN_SOURCES.length * window.CARB_SOURCES.length * window.VEGGIE_SIDES.length;

// Generate an illustrative SVG plate diagram for any meal showing exact gram proportions
window.buildMealIllustrativeDiagramSVG = function(meal) {
  const totalGrams = meal.proteinItem.grams + meal.carbItem.grams + meal.veggieItem.grams + meal.fatItem.grams;
  const pPct = Math.round((meal.proteinItem.grams / totalGrams) * 100);
  const cPct = Math.round((meal.carbItem.grams / totalGrams) * 100);
  const vPct = Math.round((meal.veggieItem.grams / totalGrams) * 100);
  const fPct = Math.max(3, 100 - pPct - cPct - vPct);

  return `
    <svg viewBox="0 0 280 68" width="100%" height="68" style="background:rgba(15,23,42,0.75); border-radius:10px; border:1px solid rgba(16,185,129,0.28); margin-top:6px; display:block;">
      <!-- Illustrative Plate Circle on Right -->
      <circle cx="242" cy="34" r="24" fill="#1e293b" stroke="#fbbf24" stroke-width="2"/>
      <path d="M242,34 L242,10 A24,24 0 0,1 266,34 Z" fill="#10b981"/>
      <path d="M242,34 L266,34 A24,24 0 0,1 242,58 Z" fill="#38bdf8"/>
      <path d="M242,34 L242,58 A24,24 0 0,1 218,34 Z" fill="#22c55e"/>
      <path d="M242,34 L218,34 A24,24 0 0,1 242,10 Z" fill="#f59e0b"/>
      <circle cx="242" cy="34" r="8" fill="#0f172a"/>
      <text x="242" y="37" fill="#fde68a" font-size="7" font-weight="bold" text-anchor="middle">${totalGrams}g</text>

      <!-- Bar Breakdown & Labels -->
      <text x="206" y="18" fill="#cbd5e1" font-size="9.5" font-weight="bold" text-anchor="end">📐 رسم توضيحي لتوزيع طبق الوجبة بالجرام:</text>
      <rect x="12" y="25" width="${Math.max(18, pPct * 1.9)}" height="10" rx="3" fill="#10b981"/>
      <rect x="${14 + Math.max(18, pPct * 1.9)}" y="25" width="${Math.max(18, cPct * 1.9)}" height="10" rx="3" fill="#38bdf8"/>
      <rect x="${16 + Math.max(18, pPct * 1.9) + Math.max(18, cPct * 1.9)}" y="25" width="${Math.max(18, vPct * 1.6)}" height="10" rx="3" fill="#22c55e"/>
      <rect x="${18 + Math.max(18, pPct * 1.9) + Math.max(18, cPct * 1.9) + Math.max(18, vPct * 1.6)}" y="25" width="16" height="10" rx="3" fill="#f59e0b"/>

      <text x="206" y="52" fill="#a7f3d0" font-size="8.5" text-anchor="end">
        بروتين ${meal.proteinItem.grams}g (${pPct}%) | كارب ${meal.carbItem.grams}g (${cPct}%) | خضار ${meal.veggieItem.grams}g | زيت/سمنة ${meal.fatItem.grams}g
      </text>
    </svg>
  `;
};

// Generate any meal by index (0 to 56,159) scaled to target Meal Calories
window.generateMealByIndex = function(index, targetMealCalories = 550, preferredFat = 'both') {
  const pLen = window.PROTEIN_SOURCES.length;
  const cLen = window.CARB_SOURCES.length;
  const vLen = window.VEGGIE_SIDES.length;

  const safeIdx = ((index % window.TOTAL_MEAL_COMBINATIONS) + window.TOTAL_MEAL_COMBINATIONS) % window.TOTAL_MEAL_COMBINATIONS;
  const pIdx = safeIdx % pLen;
  const cIdx = Math.floor(safeIdx / pLen) % cLen;
  const vIdx = Math.floor(safeIdx / (pLen * cLen)) % vLen;

  const p = window.PROTEIN_SOURCES[pIdx];
  const c = window.CARB_SOURCES[cIdx];
  const v = window.VEGGIE_SIDES[vIdx];

  // Decide Healthy Fat: Sinai Farms 100% Natural Virgin Olive Oil OR Natural Baladi Ghee
  let fatChoice = p.oilType;
  if (preferredFat === 'sinai_olive') fatChoice = 'sinai_olive';
  if (preferredFat === 'baladi_ghee') fatChoice = 'baladi_ghee';

  const fatName = fatChoice === 'sinai_olive'
    ? 'زيت زيتون مزارع سيناء — طبيعي بكر 100%'
    : 'السمنة البلدي الطبيعية (أو زيت زيتون مزارع سيناء بكر)';

  // Calculate base calories before scaling
  const baseOilGrams = 10; // 10g healthy fat (~90 kcal)
  const basePCal = (p.baseGrams / 100) * p.calPer100;
  const baseCCal = (c.baseGrams / 100) * c.calPer100;
  const baseVCal = (v.baseGrams / 100) * v.calPer100;
  const baseOCal = baseOilGrams * 8.84;
  const rawTotalCal = basePCal + baseCCal + baseVCal + baseOCal;

  // Scale factor to match targetMealCalories accurately
  const scale = Math.max(0.55, Math.min(1.85, targetMealCalories / rawTotalCal));

  const pGrams = Math.round(p.baseGrams * scale);
  const cGrams = Math.round(c.baseGrams * scale);
  const vGrams = Math.round(v.baseGrams * Math.min(1.3, Math.max(0.85, scale)));
  const oilGrams = Math.max(5, Math.round(baseOilGrams * scale));

  const totalCal = Math.round(
    (pGrams / 100) * p.calPer100 +
    (cGrams / 100) * c.calPer100 +
    (vGrams / 100) * v.calPer100 +
    oilGrams * 8.84
  );

  const totalProtein = Math.round(
    (pGrams / 100) * p.pPer100 +
    (cGrams / 100) * c.pPer100 +
    (vGrams / 100) * v.pPer100
  );

  const totalCarbs = Math.round(
    (pGrams / 100) * p.cPer100 +
    (cGrams / 100) * c.cPer100 +
    (vGrams / 100) * v.cPer100
  );

  const totalFats = Math.round(
    (pGrams / 100) * p.fPer100 +
    (cGrams / 100) * c.fPer100 +
    (vGrams / 100) * v.fPer100 +
    oilGrams
  );

  return {
    mealNumber: safeIdx + 1,
    title: `${p.name} + ${c.name}`,
    subtitle: `مع ${v.name}`,
    category: p.cat,
    img: p.img,
    proteinItem: { name: p.name, grams: pGrams },
    carbItem: { name: c.name, grams: cGrams },
    veggieItem: { name: v.name, grams: vGrams },
    fatItem: { name: fatName, grams: oilGrams, type: fatChoice },
    calories: totalCal,
    protein: totalProtein,
    carbs: totalCarbs,
    fats: totalFats,
    fiber: Math.round(4 + (vGrams / 45) + (cGrams / 35))
  };
};

// Ideal Weight, BMR, TDEE & Daily Plan Calculator
window.calculateUserBodyMetrics = function(params) {
  const gender = params.gender || 'male';
  const age = parseFloat(params.age) || 26;
  const heightCm = parseFloat(params.height) || 175;
  const weightKg = parseFloat(params.weight) || 82;
  const activity = parseFloat(params.activity) || 1.55;
  const goal = params.goal || 'cut'; // 'cut' | 'maintain' | 'bulk' | 'recomp'
  const level = params.level || 'intermediate';

  const heightM = heightCm / 100;
  const bmi = +(weightKg / (heightM * heightM)).toFixed(1);

  // Healthy BMI range (18.5 to 24.9) + Devine/Robinson Ideal Weight adjusted for age
  const minHealthyWeight = Math.round(18.8 * heightM * heightM);
  const maxHealthyWeight = Math.round(24.8 * heightM * heightM);
  const inchesOver5Ft = Math.max(0, (heightCm - 152.4) / 2.54);
  let idealCenter = gender === 'male'
    ? 50 + 2.3 * inchesOver5Ft
    : 45.5 + 2.3 * inchesOver5Ft;

  // Age adjustment (slight natural lean mass allowance for 30+)
  if (age > 35) idealCenter += Math.min(4, (age - 35) * 0.12);
  const idealWeight = Math.round((idealCenter + ((minHealthyWeight + maxHealthyWeight) / 2)) / 2);

  // Mifflin-St Jeor BMR
  let bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + (gender === 'male' ? 5 : -161);
  bmr = Math.round(bmr);
  const tdee = Math.round(bmr * activity);

  let targetCalories = tdee;
  let goalLabel = 'ثبات الوزن والحفاظ على اللياقة';
  if (goal === 'cut') {
    targetCalories = Math.max(1250, tdee - 500);
    goalLabel = 'تنشيف وخسارة الدهون الصحية (-500 سعرة)';
  } else if (goal === 'bulk') {
    targetCalories = tdee + 350;
    goalLabel = 'تضخيم عضلي صافي (+350 سعرة)';
  } else if (goal === 'recomp') {
    targetCalories = tdee - 150;
    goalLabel = 'إعادة تشكيل الجسم (حرق دهون وبناء عضل معاً)';
  }

  // Exact Macro Grams based on level and goal
  const proteinPerKg = goal === 'cut' ? 2.0 : (goal === 'bulk' ? 1.8 : 1.7);
  const referenceWeight = bmi > 30 ? idealWeight + (weightKg - idealWeight) * 0.4 : weightKg;
  const proteinGrams = Math.round(referenceWeight * proteinPerKg);
  const fatGrams = Math.round((targetCalories * 0.27) / 9);
  const remainingCal = Math.max(400, targetCalories - (proteinGrams * 4) - (fatGrams * 9));
  const carbGrams = Math.round(remainingCal / 4);
  const waterLiters = +(weightKg * 0.038).toFixed(1);
  const fiberGrams = Math.round((targetCalories / 1000) * 14);

  return {
    gender,
    age,
    heightCm,
    weightKg,
    bmi,
    bmr,
    tdee,
    targetCalories,
    idealWeight,
    minHealthyWeight,
    maxHealthyWeight,
    proteinGrams,
    carbGrams,
    fatGrams,
    waterLiters,
    fiberGrams,
    goal,
    goalLabel,
    level
  };
};

// Interactive Cartoon Recipe Preparation Video Modal Player
window.CartoonRecipePlayer = {
  animId: null,
  meal: null,
  frame: 0,

  open(mealIndex) {
    const metrics = window.currentBodyMetrics || window.calculateUserBodyMetrics({});
    const meal = window.generateMealByIndex(mealIndex, Math.round(metrics.targetCalories * 0.3));
    this.meal = meal;
    this.frame = 0;

    const modal = document.getElementById('recipeVideoModal');
    const titleEl = document.getElementById('recipeModalTitle');
    const detailsEl = document.getElementById('recipeModalDetails');
    if (!modal) return;

    titleEl.textContent = `🎬 فيديو التحضير الكرتوني المبسط (وجبة #${meal.mealNumber}): ${meal.title}`;
    detailsEl.innerHTML = `
      <div class="grid-4" style="margin-top:12px;">
        <div class="stat-box">
          <div class="stat-label">البروتين الأساسي</div>
          <div class="stat-value" style="font-size:1.1rem;">${meal.proteinItem.grams} جم</div>
          <div class="stat-sub">${meal.proteinItem.name}</div>
        </div>
        <div class="stat-box gold">
          <div class="stat-label">الكربوهيدرات المعقدة</div>
          <div class="stat-value" style="font-size:1.1rem;">${meal.carbItem.grams} جم</div>
          <div class="stat-sub">${meal.carbItem.name}</div>
        </div>
        <div class="stat-box cyan">
          <div class="stat-label">الخضروات والألياف</div>
          <div class="stat-value" style="font-size:1.1rem;">${meal.veggieItem.grams} جم</div>
          <div class="stat-sub">${meal.veggieItem.name}</div>
        </div>
        <div class="stat-box rose">
          <div class="stat-label">الدهون الصحية النقية</div>
          <div class="stat-value" style="font-size:1.1rem;">${meal.fatItem.grams} جم</div>
          <div class="stat-sub">${meal.fatItem.name}</div>
        </div>
      </div>
    `;

    modal.classList.add('open');
    if (window.nileSkyAudio) window.nileSkyAudio.playSFX('success');
    this.startLoop();
  },

  close() {
    const modal = document.getElementById('recipeVideoModal');
    if (modal) modal.classList.remove('open');
    if (this.animId) cancelAnimationFrame(this.animId);
    this.animId = null;
  },

  startLoop() {
    if (this.animId) cancelAnimationFrame(this.animId);
    const canvas = document.getElementById('recipeCartoonCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const loop = () => {
      this.frame++;
      this.drawFrame(ctx, canvas.width, canvas.height);
      this.animId = requestAnimationFrame(loop);
    };
    this.animId = requestAnimationFrame(loop);
  },

  drawFrame(ctx, w, h) {
    const meal = this.meal;
    if (!meal) return;

    // 4 stages, each 150 frames (~2.5 seconds per stage)
    const stage = Math.floor((this.frame % 600) / 150);
    const progress = (this.frame % 150) / 150;

    // Kitchen Background
    const bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, '#0f172a');
    bg.addColorStop(0.68, '#1e293b');
    bg.addColorStop(0.68, '#334155');
    bg.addColorStop(1, '#0f172a');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // Kitchen Countertop
    ctx.fillStyle = '#475569';
    ctx.fillRect(0, h * 0.68, w, 14);

    // Cartoon Chef Character on Left
    const chefX = 135;
    const chefY = h * 0.52 + Math.sin(this.frame * 0.08) * 4;

    // Chef Hat
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(chefX, chefY - 72, 26, 0, Math.PI * 2);
    ctx.arc(chefX - 18, chefY - 64, 18, 0, Math.PI * 2);
    ctx.arc(chefX + 18, chefY - 64, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(chefX - 24, chefY - 56, 48, 16);

    // Chef Head
    ctx.fillStyle = '#fcd34d';
    ctx.beginPath();
    ctx.arc(chefX, chefY - 26, 22, 0, Math.PI * 2);
    ctx.fill();

    // Eyes & Smile
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.arc(chefX - 7, chefY - 30, 3, 0, Math.PI * 2);
    ctx.arc(chefX + 7, chefY - 30, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(chefX, chefY - 22, 8, 0.1 * Math.PI, 0.9 * Math.PI);
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Chef Coat
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(chefX - 28, chefY - 2, 56, 65);
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.strokeRect(chefX - 28, chefY - 2, 56, 65);

    // Animated Chef Arm
    const armAngle = Math.sin(this.frame * 0.15) * 0.35;
    ctx.save();
    ctx.translate(chefX + 26, chefY + 12);
    ctx.rotate(armAngle);
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, -6, 52, 12);
    ctx.fillStyle = '#fcd34d';
    ctx.beginPath();
    ctx.arc(54, 0, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Cooking Station / Scale / Pan on Right-Center
    const stationX = w * 0.56;
    const stationY = h * 0.68;

    // Stage Text Banner
    const stagesText = [
      `الخطوة 1/4: وزن المكونات بدقة بالجرام على الميزان الرقمي (${meal.proteinItem.grams} جم بروتين + ${meal.carbItem.grams} جم كارب)`,
      `الخطوة 2/4: إضافة ${meal.fatItem.grams} جرام من ${meal.fatItem.name}`,
      `الخطوة 3/4: الطهي الصحي الهادئ للحفاظ على القيم الغذائية والفيتامينات`,
      `الخطوة 4/4: التقديم مع ${meal.veggieItem.grams} جم ${meal.veggieItem.name} — إجمالي ${meal.calories} سعرة!`
    ];

    ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
    ctx.fillRect(20, 14, w - 40, 48);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(20, 14, w - 40, 48);

    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 15px Cairo, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(stagesText[stage], w / 2, 44);

    if (stage === 0) {
      // Digital Kitchen Scale
      ctx.fillStyle = '#10b981';
      ctx.fillRect(stationX - 65, stationY - 22, 130, 22);
      ctx.fillStyle = '#022c22';
      ctx.fillRect(stationX - 35, stationY - 18, 70, 14);
      ctx.fillStyle = '#34d399';
      ctx.font = 'bold 11px monospace';
      ctx.fillText(`${meal.proteinItem.grams + meal.carbItem.grams} g`, stationX, stationY - 7);

      // Bowl with ingredients dropping in
      const dropY = stationY - 38 - (1 - Math.min(1, progress * 1.6)) * 60;
      ctx.fillStyle = '#e2e8f0';
      ctx.beginPath();
      ctx.arc(stationX, stationY - 36, 36, 0, Math.PI);
      ctx.fill();

      ctx.fillStyle = '#f87171';
      ctx.beginPath();
      ctx.arc(stationX - 12, dropY, 13, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(stationX + 12, dropY + 4, 12, 0, Math.PI * 2);
      ctx.fill();
    } else if (stage === 1) {
      // Pan & Golden Sinai Olive Oil / Baladi Ghee Pouring
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(stationX - 75, stationY - 20, 150, 18);

      // Bottle of Sinai Olive Oil tilting
      const bottleX = stationX + 35;
      const bottleY = stationY - 95;
      ctx.fillStyle = '#065f46';
      ctx.fillRect(bottleX - 16, bottleY - 25, 32, 55);
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(bottleX - 14, bottleY - 8, 28, 22);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 8px Cairo, sans-serif';
      ctx.fillText('زيت سيناء', bottleX, bottleY + 6);

      // Golden drops falling
      for (let d = 0; d < 4; d++) {
        const dy = ((this.frame * 3 + d * 18) % 60);
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(stationX, bottleY + 30 + dy, 5, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (stage === 2) {
      // Healthy Steam & Sizzling Pan
      ctx.fillStyle = '#ef4444';
      for (let f = -50; f <= 50; f += 20) {
        ctx.beginPath();
        ctx.arc(stationX + f, stationY - 4, 6 + Math.sin(this.frame * 0.3 + f) * 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(stationX - 75, stationY - 22, 150, 18);

      // Rising Steam Waves
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.lineWidth = 3;
      for (let s = -40; s <= 40; s += 40) {
        const sy = stationY - 35 - ((this.frame * 1.5 + s) % 65);
        ctx.beginPath();
        ctx.arc(stationX + s, sy, 10, 0, Math.PI);
        ctx.stroke();
      }
    } else {
      // Final Plated Healthy Meal with Glowing Checkmark
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(stationX, stationY - 12, 85, 20, 0, 0, Math.PI * 2);
      ctx.fill();

      // Protein, Carb, Veggie sections on plate
      ctx.fillStyle = '#d97706';
      ctx.beginPath();
      ctx.arc(stationX - 30, stationY - 18, 20, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#fde68a';
      ctx.beginPath();
      ctx.arc(stationX + 5, stationY - 20, 18, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(stationX + 36, stationY - 16, 19, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#34d399';
      ctx.font = 'bold 16px Cairo, sans-serif';
      ctx.fillText(`✅ وجبة صحية جاهزة 100% (${meal.calories} سعرة حرارية)`, stationX, stationY - 68);
    }

    // Progress Bar at bottom
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.fillRect(20, h - 18, w - 40, 8);
    ctx.fillStyle = '#10b981';
    ctx.fillRect(20, h - 18, ((this.frame % 600) / 600) * (w - 40), 8);
  }
};
