import express from 'express';

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>سیستم دراپ شیپینگ هوشمند</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
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
                    padding: 18px; 
                    border: none; 
                    border-radius: 12px; 
                    cursor: pointer; 
                    margin: 12px 0;
                    width: 100%;
                    font-size: 18px;
                    font-weight: bold;
                }
                .result {
                    background: rgba(0,0,0,0.3);
                    padding: 20px;
                    border-radius: 10px;
                    margin: 20px 0;
                    display: none;
                    border-right: 4px solid #51cf66;
                }
                .status {
                    background: rgba(255,255,255,0.2);
                    padding: 15px;
                    border-radius: 10px;
                    margin: 10px 0;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🚀 سیستم دراپ شیپینگ هوشمند</h1>
                <p>ساخته شده با GitHub + موبایل 📱</p>
                
                <button class="btn" onclick="startSystem()">فعال‌سازی سیستم</button>
                <button class="btn" onclick="scanSellers()">اسکن فروشندگان</button>
                <button class="btn" onclick="showResults()">نمایش نتایج</button>

                <div class="status">
                    <strong>وضعیت سیستم:</strong> <span id="status">غیرفعال</span>
                </div>

                <div id="result" class="result"></div>
            </div>

            <script>
                function startSystem() {
                    showMessage('🔄 در حال راه‌اندازی سیستم...');
                    setTimeout(() => {
                        document.getElementById('status').textContent = 'فعال 🟢';
                        showMessage('✅ سیستم فعال شد!\\\\n• ماژول AI راه‌اندازی شد\\\\n• سیستم اسکن آماده\\\\n• گزارش‌گیری فعال');
                    }, 2000);
                }

                function scanSellers() {
                    showMessage('🔍 در حال اسکن فروشندگان...');
                    setTimeout(() => {
                        showMessage('✅ اسکن کامل شد!\\\\n\\\\nفروشندگان معتبر:\\\\n🏪 فروشنده طلایی - ⭐ 4.8\\\\n🏪 الکترونیک برتر - ⭐ 4.9\\\\n🏪 گجت استور - ⭐ 4.7');
                    }, 3000);
                }

                function showResults() {
                    showMessage('📊 گزارش سیستم:\\\\n\\\\n🔹 سیستم: فعال\\\\n🔹 فروشندگان: ۵ مورد\\\\n🔹 وضعیت: عالی\\\\n🔹 نسخه: ۱.۰.۰\\\\n\\\\n🚀 آماده برای تجارت!');
                }

                function showMessage(text) {
                    const result = document.getElementById('result');
                    result.style.display = 'block';
                    result.innerHTML = text.replace(/\\\\n/g, '<br>');
                }
            </script>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log('🎉 سرور اجرا شد روی پورت: ' + PORT);
});
