const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

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
                    text-align: center;
                }
                .header {
                    background: #009688;
                    padding: 25px;
                    box-shadow: 0 2px 15px rgba(0,0,0,0.2);
                }
                .logo {
                    font-size: 32px;
                    font-weight: bold;
                }
                .container {
                    max-width: 1000px;
                    margin: 0 auto;
                    padding: 40px 20px;
                }
                .btn {
                    background: white;
                    color: #00C2B3;
                    border: none;
                    padding: 18px 35px;
                    border-radius: 30px;
                    font-size: 20px;
                    font-weight: bold;
                    margin: 15px;
                    cursor: pointer;
                    box-shadow: 0 5px 20px rgba(0,0,0,0.2);
                    transition: all 0.3s;
                }
                .btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(0,0,0,0.3);
                }
                .features {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 25px;
                    margin: 50px 0;
                }
                .feature {
                    background: white;
                    color: #333;
                    padding: 30px;
                    border-radius: 20px;
                    box-shadow: 0 8px 25px rgba(0,0,0,0.1);
                    transition: transform 0.3s;
                }
                .feature:hover {
                    transform: translateY(-5px);
                }
                .feature-icon {
                    font-size: 50px;
                    margin-bottom: 20px;
                }
                .products {
                    background: white;
                    color: #333;
                    padding: 30px;
                    border-radius: 20px;
                    margin: 30px 0;
                    box-shadow: 0 8px 25px rgba(0,0,0,0.1);
                }
                .product-item {
                    padding: 15px;
                    margin: 10px 0;
                    background: #f8f9fa;
                    border-radius: 10px;
                    border-right: 4px solid #00C2B3;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="logo">🛍️ چینی کالا - واردات مستقیم از چین</div>
            </div>
            
            <div class="container">
                <h1 style="font-size: 2.5em; margin-bottom: 10px;">🚀 سیستم واردات فعال شد!</h1>
                <p style="font-size: 1.2em; opacity: 0.9;">نسخه پایه - آماده برای توسعه پیشرفته</p>
                
                <div style="margin: 40px 0;">
                    <button class="btn" onclick="showProducts()">📦 نمایش محصولات نمونه</button>
                    <button class="btn" onclick="scanAliExpress()">🔍 جستجوی تامین‌کننده</button>
                    <button class="btn" onclick="showStats()">📊 وضعیت سیستم</button>
                </div>
                
                <div class="features">
                    <div class="feature">
                        <div class="feature-icon">🏢</div>
                        <h3>واردکننده مستقیم</h3>
                        <p>بدون واسطه از کارخانه‌های چینی</p>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">📦</div>
                        <h3>انبار تهران</h3>
                        <p>ارسال سریع 2-3 روز کاری به تمام ایران</p>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">✅</div>
                        <h3>گارانتی 12 ماهه</h3>
                        <p>ضمانت بازگشت وجه تا 7 روز</p>
                    </div>
                </div>
                
                <div id="products" class="products" style="display: none;">
                    <h2>📦 محصولات وارداتی نمونه</h2>
                    <div class="product-item">
                        <strong>📱 گوشی هوشمند اندروید</strong>
                        <br>💰 قیمت: ۲,۵۰۰,۰۰۰ تومان
                        <br>🏭 تامین‌کننده: کارخانه شنژن
                    </div>
                    <div class="product-item">
                        <strong>🎧 هدفون بی‌سیم</strong>
                        <br>💰 قیمت: ۸۰۰,۰۰۰ تومان  
                        <br>🏭 تامین‌کننده: مجتمع گوانگژو
                    </div>
                    <div class="product-item">
                        <strong>⌚ ساعت هوشمند</strong>
                        <br>💰 قیمت: ۱,۲۰۰,۰۰۰ تومان
                        <br>🏭 تامین‌کننده: کارخانه دنگلونگ
                    </div>
                </div>
                
                <div id="status" style="display: none; background: white; color: #333; padding: 25px; border-radius: 15px; margin: 30px 0;">
                    <h2>📊 وضعیت سیستم</h2>
                    <p>✅ سیستم: فعال و پایدار</p>
                    <p>🔗 پایگاه داده: متصل</p>
                    <p>🌐 سرور: آنلاین</p>
                    <p>🚀 نسخه: ۱.۰.۰</p>
                </div>
                
                <div style="margin-top: 60px; padding: 30px; background: rgba(255,255,255,0.1); border-radius: 15px;">
                    <h3>📞 اطلاعات تماس</h3>
                    <p>شماره پشتیبانی: ۰۲۱-۱۲۳۴۵۶۷۸</p>
                    <p>آدرس: تهران، خیابان ولیعصر، پلاک ۱۲۳</p>
                    <p>ایمیل: info@chini-kala.com</p>
                </div>
            </div>

            <script>
                function showProducts() {
                    document.getElementById('products').style.display = 'block';
                    document.getElementById('status').style.display = 'none';
                }
                
                function scanAliExpress() {
                    alert('🔍 سیستم جستجوی پیشرفته در حال توسعه...\\n\\nاین قابلیت به زودی فعال می‌شود!');
                }
                
                function showStats() {
                    document.getElementById('status').style.display = 'block';
                    document.getElementById('products').style.display = 'none';
                }
                
                // نمایش خودکار محصولات بعد از 2 ثانیه
                setTimeout(showProducts, 2000);
            </script>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log('🎉 چینی کالا - سیستم تمیز اجرا شد');
    console.log('🌐 آدرس: http://localhost:' + PORT);
});
