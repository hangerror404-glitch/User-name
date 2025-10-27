// app.js - نسخه ساده‌تر
const express = require('express');
const AliExpressScraper = require('./scraper.js');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
const scraper = new AliExpressScraper();

// صفحه اصلی
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>سیستم دراپ شیپینگ هوشمند</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                * { box-sizing: border-box; }
                body { 
                    font-family: Tahoma; 
                    direction: rtl; 
                    padding: 20px; 
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                    margin: 0;
                    min-height: 100vh;
                }
                .container { 
                    max-width: 100%; 
                    background: rgba(255,255,255,0.1);
                    padding: 25px;
                    border-radius: 15px;
                    backdrop-filter: blur(10px);
                    margin: 20px 0;
                }
                .btn { 
                    background: #ff6b6b; 
                    color: white; 
                    padding: 15px; 
                    border: none; 
                    border-radius: 10px; 
                    cursor: pointer; 
                    margin: 8px 0;
                    width: 100%;
                    font-size: 16px;
                    font-weight: bold;
                }
                .btn-success { background: #51cf66; }
                .btn-info { background: #339af0; }
                .result {
                    background: rgba(0,0,0,0.3);
                    padding: 15px;
                    border-radius: 10px;
                    margin: 15px 0;
                    display: none;
                }
                .search-box {
                    width: 100%;
                    padding: 12px;
                    border: none;
                    border-radius: 8px;
                    margin: 10px 0;
                    font-size: 16px;
                    color: #333;
                    background: white;
                }
                .product-card {
                    background: rgba(255,255,255,0.15);
                    padding: 15px;
                    border-radius: 10px;
                    margin: 10px 0;
                    border-right: 4px solid #ff6b6b;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🚀 سیستم دراپ شیپینگ هوشمند</h1>
                <p>نسخه حرفه‌ای - اتصال به AliExpress</p>
                
                <input type="text" id="searchInput" class="search-box" placeholder="🔍 نام محصول را وارد کنید (مثال: phone case)">
                
                <button class="btn btn-success" onclick="realScan()">اسکن واقعی از AliExpress</button>
                <button class="btn" onclick="showDemoProducts()">نمایش محصولات نمونه</button>

                <div id="loading" style="display: none;">🔄 در حال اسکن...</div>
                <div id="result" class="result"></div>
                <div id="productsContainer"></div>
            </div>

            <script>
                async function realScan() {
                    const keyword = document.getElementById('searchInput').value || 'phone';
                    showLoading(true);
                    showResult('🔍 در حال جستجو...');

                    try {
                        const response = await fetch('/api/search?keyword=' + keyword);
                        const data = await response.json();
                        showLoading(false);
                        
                        if (data.success) {
                            displayProducts(data.products);
                            showResult('✅ ' + data.products.length + ' محصول پیدا شد');
                        }
                    } catch (error) {
                        showLoading(false);
                        showResult('❌ خطا: ' + error.message);
                    }
                }

                function displayProducts(products) {
                    const container = document.getElementById('productsContainer');
                    container.innerHTML = '<h3>🛍️ محصولات:</h3>';
                    
                    products.forEach((product, index) => {
                        const productCard = document.createElement('div');
                        productCard.className = 'product-card';
                        productCard.innerHTML = \`
                            <strong>\${product.title}</strong>
                            <br>💰 قیمت: \${product.price}
                            <br>🏪 فروشگاه: \${product.store}
                            <br>⭐ امتیاز: \${product.rating}
                            <br>💵 قیمت نهایی: \${product.finalPrice}
                        \`;
                        container.appendChild(productCard);
                    });
                }

                function showDemoProducts() {
                    const demoProducts = [
                        {
                            title: "کاور آیفون 13",
                            price: "US $2.99",
                            store: "Mobile Store",
                            rating: "4.8",
                            finalPrice: "$3.89 (سود: 30%)"
                        }
                    ];
                    displayProducts(demoProducts);
                    showResult('📱 محصولات نمونه نمایش داده شدند');
                }

                function showLoading(show) {
                    document.getElementById('loading').style.display = show ? 'block' : 'none';
                }

                function showResult(message) {
                    const result = document.getElementById('result');
                    result.style.display = 'block';
                    result.innerHTML = message;
                }
            </script>
        </body>
        </html>
    `);
});

// API جستجو
app.get('/api/search', async (req, res) => {
    try {
        const { keyword } = req.query;
        const products = await scraper.searchProducts(keyword);
        
        res.json({
            success: true,
            products: products,
            keyword: keyword
        });

    } catch (error) {
        res.json({
            success: false,
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log('🚀 سیستم اجرا شد روی پورت: ' + PORT);
});
