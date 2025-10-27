const axios = require('axios');
const cheerio = require('cheerio');

class RealAliExpressScraper {
    constructor() {
        this.baseURL = 'https://www.aliexpress.com';
    }

    // اسکن واقعی AliExpress
    async realSearch(keyword) {
        console.log(`🔍 در حال اسکن واقعی AliExpress برای: "${keyword}"`);
        
        try {
            // ساخت URL جستجو
            const searchUrl = `https://www.aliexpress.com/w/wholesale-${encodeURIComponent(keyword)}.html`;
            
            console.log(`🌐 اتصال به: ${searchUrl}`);
            
            const response = await axios.get(searchUrl, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.5',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Connection': 'keep-alive'
                },
                timeout: 15000
            });

            const $ = cheerio.load(response.data);
            const products = [];

            console.log('✅ صفحه با موفقیت لود شد');

            // استخراج محصولات از صفحه
            $('.search-item').each((index, element) => {
                try {
                    const $element = $(element);
                    
                    // استخراج اطلاعات محصول
                    const title = $element.find('.item-title').text().trim();
                    const price = $element.find('.price-current').text().trim();
                    const image = $element.find('.item-img').attr('src') || '';
                    const store = $element.find('.store-name').text().trim();
                    const rating = $element.find('.rating-value').text().trim() || '4.0';
                    const orders = $element.find('.order-num').text().trim() || '100+';

                    if (title && price) {
                        const product = {
                            id: `real_${Date.now()}_${index}`,
                            title: title,
                            price: price,
                            image: image || '📱',
                            store: store || 'فروشنده بین‌المللی',
                            rating: parseFloat(rating) || 4.0,
                            orders: orders,
                            finalPrice: this.calculateFinalPrice(price),
                            shipping: '🚚 ارسال به ایران',
                            warranty: '✅ گارانتی چینی کالا',
                            badge: 'واقعی از AliExpress',
                            isReal: true
                        };

                        products.push(product);
                    }
                } catch (error) {
                    console.log(`خطا در استخراج محصول ${index}:`, error.message);
                }
            });

            if (products.length > 0) {
                console.log(`🎉 ${products.length} محصول واقعی از AliExpress دریافت شد`);
                return products;
            } else {
                console.log('⚠️ محصول واقعی پیدا نشد، استفاده از داده‌های نمونه');
                return this.getSampleData(keyword);
            }

        } catch (error) {
            console.log('❌ خطا در اسکن واقعی:', error.message);
            return this.getSampleData(keyword);
        }
    }

    // محاسبه قیمت نهایی با سود
    calculateFinalPrice(originalPrice) {
        try {
            const priceMatch = originalPrice.match(/(\d+\.?\d*)/);
            if (priceMatch) {
                const price = parseFloat(priceMatch[1]);
                const finalPrice = price * 50000 * 1.3; // نرخ ارز + 30% سود
                return finalPrice.toLocaleString('fa-IR') + ' تومان';
            }
            return 'در حال محاسبه...';
        } catch (error) {
            return 'قیمت نامعلوم';
        }
    }

    // داده‌های نمونه برای وقتی که اسکن واقعی کار نمی‌کند
    getSampleData(keyword) {
        console.log('📋 استفاده از داده‌های نمونه');
        
        return [
            {
                id: 'sample_1',
                title: `${keyword} - مدل حرفه‌ای`,
                price: 'US $29.99',
                image: '📱',
                store: 'کارخانه الکترونیک شنژن',
                rating: 4.7,
                orders: '۲,۵۰۰+',
                finalPrice: '۱,۹۵۰,۰۰۰ تومان',
                shipping: '🚚 ارسال از انبار تهران (2-3 روز کاری)',
                warranty: '✅ گارانتی 12 ماهه چینی کالا',
                badge: 'پرفروش',
                isReal: false
            },
            {
                id: 'sample_2', 
                title: `${keyword} - مدل اقتصادی`,
                price: 'US $15.50',
                image: '📦',
                store: 'مجتمع صنعتی گوانگژو',
                rating: 4.3,
                orders: '۵,۸۰۰+',
                finalPrice: '۱,۰۱۰,۰۰۰ تومان',
                shipping: '🚚 ارسال از انبار تهران (2-3 روز کاری)',
                warranty: '✅ گارانتی 12 ماهه چینی کالا',
                badge: 'اقتصادی',
                isReal: false
            },
            {
                id: 'sample_3',
                title: `${keyword} - مدل لوکس`,
                price: 'US $49.99',
                image: '💎',
                store: 'کارخانه طلایی شنژن',
                rating: 4.8,
                orders: '۱,۲۰۰+',
                finalPrice: '۳,۲۵۰,۰۰۰ تومان',
                shipping: '🚚 ارسال از انبار تهران (2-3 روز کاری)',
                warranty: '✅ گارانتی 12 ماهه چینی کالا',
                badge: 'لوکس',
                isReal: false
            }
        ];
    }

    // بررسی اینکه آیا فروشنده به ایران ارسال می‌کند
    checkIranShipping(productElement) {
        try {
            const shippingText = productElement.text().toLowerCase();
            return shippingText.includes('worldwide') || 
                   shippingText.includes('international') ||
                   shippingText.includes('global');
        } catch (error) {
            return true; // اگر خطا داد، فرض کن ارسال می‌کند
        }
    }
}

module.exports = RealAliExpressScraper;
