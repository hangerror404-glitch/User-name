const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send(`
        <html>
        <head>
            <title>چینی کالا</title>
            <style>
                body { 
                    font-family: Tahoma; 
                    direction: rtl; 
                    background: #00C2B3;
                    color: white;
                    text-align: center;
                    padding: 50px;
                }
            </style>
        </head>
        <body>
            <h1>🛍️ چینی کالا - سیستم واردات</h1>
            <p>سیستم با موفقیت راه‌اندازی شد ✅</p>
            <p>نسخه پایه - آماده برای توسعه</p>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log('✅ سیستم فعال شد: http://localhost:' + PORT);
});
