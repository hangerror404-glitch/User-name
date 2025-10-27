const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

// صفحه اصلی با تم آبی فیروزه‌ای
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>چینی کالا - واردات مستقیم از چین</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                * { 
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }
                body { 
                    font-family: 'Yekan', 'Tahoma', sans-serif; 
                    direction: rtl; 
                    background: #f8f9fa;
                    color: #333;
                    line-height: 1.6;
                }
                
                /* هدر - آبی فیروزه‌ای */
                .header {
                    background: #00C2B3;
                    color: white;
                    padding: 15px 0;
                    box-shadow: 0 2px 15px rgba(0,194,179,0.3);
                }
                .header-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 15px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .logo {
                    font-size: 24px;
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                }
                .logo-icon {
                    margin-left: 10px;
                    font-size: 28px;
                }
                .search-box {
                    flex: 1;
                    max-width: 600px;
                    margin: 0 20px;
                    position: relative;
                }
                .search-box input {
                    width: 100%;
                    padding: 12px 45px 12px 20px;
                    border: none;
                    border-radius: 25px;
                    font-size: 14px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }
                .search-btn {
                    position: absolute;
                    left: 15px;
                    top: 50%;
                    transform: translateY(-50%);
                    background: none;
                    border: none;
                    color: #00C2B3;
                    cursor: pointer;
                    font-size: 16px;
                }
                
                /* بنر معرفی */
                .intro-banner {
                    background: linear-gradient(135deg, #00C2B3, #009688);
                    color: white;
                    padding: 40px 0;
                    text-align: center;
                    margin-bottom: 30px;
                }
                .intro-banner h1 {
                    font-size: 28px;
                    margin-bottom: 10px;
                }
                .intro-banner p {
                    font-size: 16px;
                    opacity: 0.9;
                }
                
                /* ویژگی‌های شرکت */
                .company-features {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 20px;
                    margin: 30px 0;
                }
                .feature-card {
                    background: white;
                    padding: 25px;
                    border-radius: 12px;
                    text-align: center;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                    border-top: 4px solid #00C2B3;
                }
                .feature-icon {
                    font-size: 40px;
                    margin-bottom: 15px;
                    color: #00C2B3;
                }
                
                /* محتوای اصلی */
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 15px;
                }
                
                /* کارت محصول */
                .product-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 25px;
                    margin: 30px 0;
                }
                .product-card {
                    background: white;
                    border-radius: 12px;
                    padding: 20px;
                    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
                    transition: all 0.3s ease;
                    border: 1px solid #e8f6f3;
                }
                .product-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 10px 30px rgba(0,194,179,0.2);
                }
                .product-badge {
                    background: #00C2B3;
                    color: white;
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 12px;
                    display: inline-block;
                    margin-bottom: 10px;
                }
                .product-image {
                    width: 100%;
                    height: 200px;
                    background: linear-gradient(135deg, #e8f6f3, #d1f2eb);
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 15px;
                    color: #00C2B3;
                    font-size: 48px;
                }
                .product-title {
                    font-size: 15px;
                    margin-bottom: 12px;
                    height: 45px;
                    overflow: hidden;
                    font-weight: 500;
                }
                .product-price {
                    color: #00C2B3;
                    font-weight: bold;
                    font-size: 18px;
                    margin-bottom: 8px;
                }
                .product-shipping {
                    color: #27ae60;
                    font-size: 13px;
                    margin: 8px 0;
                    display: flex;
                    align-items: center;
                }
                .product-warranty {
                    color: #e74c3c;
                    font-size: 13px;
                    margin: 8px 0;
                    display: flex;
                    align-items: center;
                }
                .product-supplier {
                    background: #f8f9fa;
                    padding: 10px;
                    border-radius: 8px;
                    margin: 10px 0;
                    border-right: 3px solid #00C2B3;
                }
                .supplier-title {
                    font-weight: bold;
                    color: #00C2B3;
                    font-size: 13px;
                }
                .supplier-info {
                    font-size: 12px;
                    color: #666;
                    margin-top: 5px;
                }
                .add-to-cart {
                    background: #00C2B3;
                    color: white;
                    border: none;
                    padding: 12px;
                    border-radius: 8px;
                    width: 100%;
                    cursor: pointer;
                    font-size: 15px;
                    font-weight: bold;
                    margin-top: 10px;
                    transition: background 0.3s;
                }
                .add-to-cart:hover {
                    background: #009688;
                }
                
                /* دکمه‌های سیستم */
                .system-panel {
                    background: white;
                    padding: 25px;
                    border-radius: 12px;
                    margin: 30px 0;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                }
                .system-buttons {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 15px;
                    margin: 20px 0;
                }
                .btn {
                    padding: 15px 25px;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 16px;
                    font-weight: bold;
                    transition: all 0.3s;
                }
                .btn-primary {
                    background: #00C2B3;
                    color: white;
                }
                .btn-primary:hover {
                    background: #009688;
                    transform: translateY(-2px);
                }
                .btn-secondary {
                    background: #34495e;
                    color: white;
                }
                .btn-secondary:hover {
                    background: #2c3e50;
                    transform: translateY(-2px);
                }
                
                /* وضعیت سیستم */
                .status-panel {
                    background: white;
                    padding: 25px;
                    border-radius: 12px;
                    margin: 25px 0;
                    border-right: 4px solid #00C2B3;
                }
                .status-item {
                    display: flex;
                    justify-content: space-between;
                    margin: 12px 0;
                    padding: 12px;
                    background: #f8f9fa;
                    border-radius: 8px;
                    border-right: 3px solid #00C2B3;
                }
                
                /* فوتر */
                .footer {
                    background: #2c3e50;
                    color: white;
                    padding: 30px 0;
                    margin-top: 50px;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <!-- هدر -->
            <div class="header">
                <div class="header-container">
                    <div class="logo">
                        <span class="logo-icon">🛍️</span>
                        چینی کالا
                    </div>
                    <div class="search-box">
                        <input type="text" id="searchInput" placeholder="جستجوی کالاهای وارداتی...">
                        <button class="search-btn">🔍</button>
                    </div>
                    <div class="user-menu">
                        <span>👤 پنل مدیریت واردات</span>
                    </div>
                </div>
            </div>
            
            <!-- بنر معرفی -->
            <div class="intro-banner">
                <div class="container">
                    <h1>واردات مستقیم از چین 🚢</h1>
                    <p>با گارانتی 12 ماهه و ارسال سریع از انبار تهران</p>
                </div>
            </div>
            
            <!-- ویژگی‌های شرکت -->
            <div class="container">
                <div class="company-features">
                    <div class="feature-card">
                        <div class="feature-icon">🏢</div>
                        <h3>واردکننده مستقیم</h3>
                        <p>بدون واسطه از تولیدکننده چینی</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">📦</div>
                        <h3>انبار تهران</h3>
                        <p>ارسال سریع 2-3 روز کاری</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">✅</div>
                        <h3>گارانتی 12 ماهه</h3>
                        <p>ضمانت بازگشت وجه</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">🚚</div>
                        <h3>ارسال به تمام ایران</h3>
                        <p>پست پیشتاز و تیپاکس</p>
                    </div>
                </div>
            </div>

            <!-- محتوای اصلی -->
            <div class="container">
                <div class="system-panel">
                    <h3>🔧 پنل مدیریت واردات</h3>
                    <div class="system-buttons">
                        <button class="btn btn-primary" onclick="scanGlobalSuppliers()">🌍 جستجوی تامین‌کننده جهانی</button>
                        <button class="btn btn-secondary" onclick="showSampleImports()">📦 محصولات وارداتی نمونه</button>
                    </div>
                </div>
                
                <div class="status-panel">
                    <h3>📊 وضعیت سیستم واردات</h3>
                    <div class="status-item">
                        <span>وضعیت سیستم:</span>
                        <span id="systemStatus">فعال 🟢</span>
                    </div>
                    <div class="status-item">
                        <span>محصولات وارداتی:</span>
                        <span id="productsCount">0 مورد</span>
                    </div>
                    <div class="status-item">
                        <span>تامین‌کنندگان معتبر:</span>
                        <span id="suppliersCount">0 مورد</span>
                    </div>
                </div>
                
                <div id="loading" style="display: none; text-align: center; padding: 30px;">
                    <div style="color: #00C2B3; font-size: 20px; margin-bottom: 10px;">🔄 در حال جستجو در بین تامین‌کنندگان جهانی...</div>
                    <div style="color: #666;">این فرآیند ممکن است چند دقیقه طول بکشد</div>
                </div>
                
                <div id="productsContainer" class="product-grid">
                    <!-- محصولات وارداتی اینجا نمایش داده می‌شوند -->
                </div>
            </div>

            <!-- فوتر -->
            <div class="footer">
                <div class="container">
                    <h3>چینی کالا - واردات مستقیم از چین</h3>
                    <p>📞 پشتیبانی: 021-12345678 | 🏢 آدرس: تهران، خیابان ولیعصر</p>
                    <p>© 2024 کلیه حقوق برای چینی کالا محفوظ است</p>
                </div>
            </div>

            <script>
                let importedProducts = [];
                let trustedSuppliers = [];

                async function scanGlobalSuppliers() {
                    const keyword = document.getElementById('searchInput').value || 'گجت الکترونیکی';
                    
                    if (!keyword.trim()) {
                        alert('لطفا نام کالای مورد نظر را وارد کنید');
                        return;
                    }
                    
                    showLoading(true);
                    updateSystemStatus('در حال جستجو در بین تامین‌کنندگان چینی...', '🔵');
                    
                    try {
                        // شبیه‌سازی جستجوی واقعی
                        await new Promise(resolve => setTimeout(resolve, 3000));
                        
                        const searchResults = await simulateGlobalSearch(keyword);
                        importedProducts = searchResults.products;
                        trustedSuppliers = searchResults.suppliers;
                        
                        showLoading(false);
                        displayImportedProducts(importedProducts);
                        updateCounters();
                        updateSystemStatus('جستجو با موفقیت انجام شد', '🟢');
                        
                    } catch (error) {
                        showLoading(false);
                        updateSystemStatus('خطا در ارتباط با تامین‌کنندگان: ' + error.message, '🔴');
                    }
                }

                function simulateGlobalSearch(keyword) {
                    // شبیه‌سازی داده‌های واقعی
                    const suppliers = [
                        {
                            id: '1',
                            name: 'کارخانه الکترونیک شنژن',
                            rating: '4.8/5',
                            products: '۵۰۰+',
                            location: 'شنژن، چین'
                        },
                        {
                            id: '2',
                            name: 'مجتمع صنعتی گوانگژو',
                            rating: '4.6/5', 
                            products: '۱۲۰۰+',
                            location: 'گوانگژو، چین'
                        }
                    ];

                    const products = [
                        {
                            id: '1001',
                            title: 'گوشی هوشمند اندروید 5G',
                            image: '📱',
                            originalPrice: 'US $249.99',
                            finalPrice: '۳,۲۵۰,۰۰۰ تومان',
                            rating: 4.7,
                            supplier: suppliers[0],
                            shipping: '🚚 ارسال از انبار تهران (2-3 روز کاری)',
                            warranty: '✅ گارانتی 12 ماهه چینی کالا',
                            badge: 'پرفروش'
                        },
                        {
                            id: '1002',
                            title: 'هدفون بی‌سیم نویزکنسلینگ',
                            image: '🎧',
                            originalPrice: 'US $89.99',
                            finalPrice: '۱,۱۷۰,۰۰۰ تومان',
                            rating: 4.5,
                            supplier: suppliers[1],
                            shipping: '🚚 ارسال از انبار تهران (2-3 روز کاری)',
                            warranty: '✅ گارانتی 12 ماهه چینی کالا',
                            badge: 'جدید'
                        },
                        {
                            id: '1003',
                            title: 'ساعت هوشمند ورزشی',
                            image: '⌚',
                            originalPrice: 'US $45.99',
                            finalPrice: '۶۰۰,۰۰۰ تومان',
                            rating: 4.3,
                            supplier: suppliers[0],
                            shipping: '🚚 ارسال از انبار تهران (2-3 روز کاری)',
                            warranty: '✅ گارانتی 12 ماهه چینی کالا', 
                            badge: 'اقتصادی'
                        }
                    ];

                    return {
                        products: products,
                        suppliers: suppliers
                    };
                }

                function displayImportedProducts(products) {
                    const container = document.getElementById('productsContainer');
                    container.innerHTML = '';
                    
                    if (products.length === 0) {
                        container.innerHTML = '<div style="text-align: center; padding: 40px; color: #666; grid-column: 1/-1;">کالایی یافت نشد</div>';
                        return;
                    }
                    
                    products.forEach(product => {
                        const productCard = document.createElement('div');
                        productCard.className = 'product-card';
                        productCard.innerHTML = \`
                            <div class="product-badge">\${product.badge}</div>
                            <div class="product-image">\${product.image}</div>
                            <div class="product-title">\${product.title}</div>
                            <div class="product-price">\${product.finalPrice}</div>
                            <div style="color: #999; font-size: 12px; margin-bottom: 10px;">قیمت کارخانه: \${product.originalPrice}</div>
                            <div class="product-supplier">
                                <div class="supplier-title">🏭 تامین‌کننده:</div>
                                <div class="supplier-info">\${product.supplier.name}</div>
                                <div class="supplier-info">⭐ \${product.supplier.rating} | 📍 \${product.supplier.location}</div>
                            </div>
                            <div class="product-shipping">\${product.shipping}</div>
                            <div class="product-warranty">\${product.warranty}</div>
                            <button class="add-to-cart" onclick="addToStore('\${product.id}')">➕ افزودن به فروشگاه</button>
                        \`;
                        container.appendChild(productCard);
                    });
                }

                function showSampleImports() {
                    const sampleProducts = [
                        {
                            id: '2001',
                            title: 'پاوربانک 20000 میلی‌آمپر',
                            image: '🔋',
                            originalPrice: 'US $25.99',
                            finalPrice: '۳۳۸,۰۰۰ تومان',
                            rating: 4.6,
                            supplier: {
                                name: 'کارخانه باتری شنژن',
                                rating: '4.7/5',
                                location: 'شنژن، چین'
                            },
                            shipping: '🚚 ارسال از انبار تهران (2-3 روز کاری)',
                            warranty: '✅ گارانتی 12 ماهه چینی کالا',
                            badge: 'پرفروش'
                        },
                        {
                            id: '2002',
                            title: 'وبکم فول اچ دی',
                            image: '📹',
                            originalPrice: 'US $35.50',
                            finalPrice: '۴۶۲,۰۰۰ تومان',
                            rating: 4.4,
                            supplier: {
                                name: 'مجتمع الکترونیک دنگلونگ',
                                rating: '4.5/5', 
                                location: 'دنگلونگ، چین'
                            },
                            shipping: '🚚 ارسال از انبار تهران (2-3 روز کاری)',
                            warranty: '✅ گارانتی 12 ماهه چینی کالا',
                            badge: 'جدید'
                        }
                    ];
                    
                    importedProducts = sampleProducts;
                    displayImportedProducts(sampleProducts);
                    updateCounters();
                    updateSystemStatus('نمونه کالاهای وارداتی نمایش داده شدند', '🟢');
                }

                function addToStore(productId) {
                    alert('کالا با موفقیت به فروشگاه اضافه شد! 🎉\\n\\nاین کالا از طریق سیستم واردات چینی کالا تامین می‌شود.');
                }

                function showLoading(show) {
                    document.getElementById('loading').style.display = show ? 'block' : 'none';
                }

                function updateSystemStatus(message, icon) {
                    document.getElementById('systemStatus').textContent = message + ' ' + icon;
                }

                function updateCounters() {
                    document.getElementById('productsCount').textContent = importedProducts.length + ' مورد';
                    document.getElementById('suppliersCount').textContent = trustedSuppliers.length + ' مورد';
                }

                // اولیه‌سازی
                updateCounters();
                
                // جستجو با Enter
                document.getElementById('searchInput').addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        scanGlobalSuppliers();
                    }
                });

                // نمایش نمونه در ابتدا
                showSampleImports();
            </script>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log('🛍️ چینی کالا - سیستم واردات راه‌اندازی شد');
    console.log('🌐 آدرس: https://user-name-1.onrender.com');
});
