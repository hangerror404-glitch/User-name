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
                    font-family: 'Tahoma', 'Arial', sans-serif; 
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
                .add
