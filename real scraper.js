// real-scraper.js - نسخه ساده بدون Puppeteer
const axios = require('axios');
const cheerio = require('cheerio');

class SimpleAliExpressScraper {
    constructor() {
        this.baseURL = 'https://www.aliexpress.com';
    }

    // اسکن ساده با axios + cheerio
    async simpleSearch(keyword) {
        console.log(`🔍 اسکن ساده برای: "${keyword}"`);
        
        try {
            const searchUrl = `https://www.aliexpress.com/w/wholesale-${encodeURIComponent(keyword)}.html`;
            
            const response = await axios.get(searchUrl, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.5',
                    'Accept-Encoding': 'gzip, deflate, br',
                },
                timeout: 10000
            });

            const $ = cheerio.load(response.data);
            const products = [];

            // استخراج ساده محصولات
            $('.search-item, [product-id]').each((index, element) => {
                const $element = $(element);
                
                const title = $element.find('.item-title, .product-title').text().trim();
                const price = $element.find('.price-current, .product-price').text().trim();
                
                if (title && price) {
                    products.push({
                        id: `real_${Date.now()}_${index}`,
                        title: title || `${keyword} - مدل ${index + 1}`,
                        price: price || 'US $0.00',
                        image: '📱',
                        store: 'فروشنده بین‌المللی',
                        rating: 4.0 + (Math.random() * 0.5), // 4.0 - 4.5
                        orders: '100+',
                        finalPrice: this.calculateFinalPrice(price),
                        shipping: '🚚 ارسال به ایران',
                        warranty: '✅ گارانتی چینی کالا',
                        isReal: true // علامت که داده واقعی هست
                    });
                }
            });

            console.log(`✅ ${products.length} محصول واقعی پیدا شد`);
            return products.length > 0 ? products : this.getSampleData(keyword);

        } catch (error) {
            console.log('❌ خطا در اسکن واقعی:', error.message);
            return this.getSampleData(keyword);
        }
    }

    calculateFinalPrice(originalPrice) {
        const priceMatch = originalPrice.match(/(\d+\.?\d*)/);
        if (priceMatch) {
            const price = parseFloat(priceMatch[1]);
            const finalPrice = price * 50000 * 1.3; // نرخ ارز + 30% سود
            return finalPrice.toLocaleString('fa-IR') + ' تومان';
        }
        return 'قیمت نامعلوم';
    }

    getSampleData(keyword) {
        // داده‌های نمونه وقتی اسکن واقعی کار نکنه
        return [
            {
                id: 'sample_1',
                title: `${keyword} - مدل حرفه‌ای`,
                price: 'US $29.99',
                image: '📱',
                store: 'فروشنده طلایی چین',
                rating: 4.7,
                orders: '۲,۵۰۰+',
                finalPrice: '۱,۹۵۰,۰۰۰ تومان',
                shipping: '🚚 ارسال از انبار تهران',
                warranty: '✅ گارانتی 12 ماهه',
                isReal: false
            },
            {
                id: 'sample_2',
                title: `${keyword} - مدل اقتصادی`,
                price: 'US $15.50',
                image: '📦',
                store: 'کارخانه مستقیم',
                rating: 4.3,
                orders: '۵,۸۰۰+',
                finalPrice: '۱,۰۱۰,۰۰۰ تومان',
                shipping: '🚚 ارسال از انبار تهران', 
                warranty: '✅ گارانتی 12 ماهه',
                isReal: false
            }
        ];
    }
}

module.exports = SimpleAliExpressScraper;
