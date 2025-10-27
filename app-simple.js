// app-simple.js - نسخه فوق ساده بدون خطا
const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

// صفحه اصلی ساده و زیبا
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>چینی کالا - واردات مستقیم از چین</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body { 
                    font-family: Tahoma; 
                    direction: rtl; 
                    background: #00C2B3;
                    color: white;
                    margin: 0;
                    padding: 0;
                }
                .header {
                    background: #009688;
                    padding: 20px;
                    text-align: center;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
                }
                .logo {
                    font-size: 28px;
                    font-weight: bold;
                }
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 40px 20px;
                    text-align: center;
                }
                .btn {
                    background: white;
                    color: #00C2B3;
                    border: none;
                    padding: 15px 30px;
                    border-radius: 25px;
                    font-size: 18px;
                    font-weight: bold;
                    margin: 10px;
                    cursor: pointer;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                }
                .features {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 20px;
                    margin: 40px 0;
                }
                .feature {
                    background: white;
                    color: #333;
                    padding: 25px;
                    border-radius: 15px;
                    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
                }
                .feature-icon {
                    font-size: 40px;
                    margin-bottom: 15px;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="logo">🛍️ چینی کالا - واردات مستقیم</div>
            </div>
            
            <div class="container">
                <h1>🚀 سیستم واردات راه‌اندازی شد!</h1>
                <p>نسخه پایه - آماده برای توسعه</p>
                
                <div style="margin: 30px 0;">
                    <button class="btn" onclick="showProducts()">📦 نمایش محصولات</button>
                    <button class="btn" onclick="scanSuppliers()">🔍 جستجوی تامین‌کننده</button>
                </div>
                
                <div class="features">
                    <div class="feature">
                        <div class="feature-icon">🏢</div>
                        <h3>واردکننده مستقیم</h3>
                        <p>بدون واسطه از چین</p>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">📦</div>
                        <h3>انبار تهران</h3>
                        <p>ارسال سریع 2-3 روزه</p>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">✅</div>
                        <h3>گارانتی 12 ماهه</h3>
                        <p>ضمانت بازگشت وجه</p>
                    </div>
                </div>
                
                <div id="products" style="display: none; margin-top: 40px;">
                    <h2>📦 محصولات نمونه</h2>
                    <div style="background: white; color: #333; padding: 20px; border-radius: 10px; margin: 20px 0;">
                        <p>📱 گوشی هوشمند - ۲,۵۰۰,۰۰۰ تومان</p>
                        <p>🎧 هدفون بی‌سیم - ۸۰۰,۰۰۰ تومان</p>
                        <p>⌚ ساعت هوشمند - ۱,۲۰۰,۰۰۰ تومان</p>
                    </div>
                </div>
                
                <div style="margin-top: 50px; padding: 20px; background: rgba(255,255,255,0.1); border-radius: 10px;">
                    <p>📞 پشتیبانی: 021-12345678</p>
                    <p>🏢 آدرس: تهران، خیابان ولیعصر</p>
                </div>
            </div>

            <script>
                function showProducts() {
                    document.getElementById('products').style.display = 'block';
                }
                
                function scanSuppliers() {
                    alert('🔍 سیستم جستجو در حال توسعه...\\nبه زودی فعال می‌شود!');
                }
                
                // نمایش خودکار محصولات بعد از 3 ثانیه
                setTimeout(showProducts, 3000);
            </script>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log('✅ چینی کالا - سیستم ساده اجرا شد');
    console.log('🌐 آدرس: http://localhost:' + PORT);
});
