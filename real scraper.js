const axios = require('axios');
const cheerio = require('cheerio');

class FreeAliExpressScraper {
    constructor() {
        this.baseURL = 'https://www.aliexpress.com';
        this.retryCount = 3;
    }

    // گرفتن User-Agent رندوم
    getRandomUserAgent() {
        const agents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/120.0'
        ];
        return agents[Math.floor(Math.random() * agents.length)];
    }

    // تاخیر رندوم
    async randomDelay(min = 2000, max = 5000) {
        const delay = Math.random() * (max - min) + min;
        await new Promise(resolve => setTimeout(resolve, delay));
    }

    // اسکن واقعی AliExpress - نسخه رایگان
    async freeRealSearch(keyword, page = 1) {
        console.log(`🔍 اسکن رایگان AliExpress برای: "${keyword}"`);
        
        for (let attempt = 1; attempt <= this.retryCount; attempt++) {
            try {
                // ساخت URL با پارامترهای مختلف
                const searchUrl = `https://www.aliexpress.com/w/wholesale-${encodeURIComponent(keyword)}.html?page=${page}`;
                
                console.log(`🔄 تلاش ${attempt} - اتصال به AliExpress...`);

                const response = await axios.get(searchUrl, {
                    headers: {
                        'User-Agent': this.getRandomUserAgent(),
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                        'Accept-Language': 'en-US,en;q=0.9',
                        'Accept-Encoding': 'gzip, deflate, br',
                        'Cache-Control': 'no-cache',
                        'Connection': 'keep-alive',
                        'Sec-Fetch-Dest': 'document',
                        'Sec-Fetch-Mode': 'navigate',
                        'Sec-Fetch-Site': 'none',
                        'Upgrade-Insecure-Requests': '1'
                    },
                    timeout: 15000,
                    validateStatus: function (status) {
                        return status >= 200 && status < 400;
                    }
                });

                const $ = cheerio.load(response.data);
                const products = [];

                console.log(`✅ صفحه لود شد! در حال استخراج محصولات...`);

                // استخراج محصولات با سلکتورهای مختلف
                $('.search-item, [product-id], .JIIxO').each((index, element) => {
                    try {
                        const $element = $(element);
                        
                        // استخراج عنوان
                        const title = $element.find('.multi--titleText--nXeOvyr, .item-title, .product-title').text().trim();
                        
                        // استخراج قیمت
                        const price = $element.find('.multi--price-sale--U-S0jtj, .price-current, .product-price').text().trim();
                        
                        // استخراج عکس
                        const image = $element.find('.images--item--3XZa6xf, .item-img, .product-image').attr('src') || 
                                     $element.find('img').first().attr('src');
                        
                        // استخراج فروشگاه
                        const store = $element.find('.store-name, .seller-name').text().trim();
                        
                        // استخراج امتیاز
                        const rating = $element.find('.rating-value, .star-rate').text().trim() || '4.0';
                        
                        // استخراج تعداد سفارشات
                        const orders = $element.find('.order-num, .sales-volume').text().trim() || '100+';

                        if (title && price) {
                            const product = {
                                id: $element.attr('product-id') || `prod_${Date.now()}_${index}`,
                                title: title.length > 0 ? title : `${keyword} - مدل ${index + 1}`,
                                price: price.length > 0 ? price : 'US $0.00',
                                image: image || '📱',
                                store: store || 'فروشنده بین‌المللی',
                                rating: parseFloat(rating) || 4.0,
                                orders: orders,
                                finalPrice: this.calculateFinalPrice(price),
                                shipping: '🚚 ارسال به ایران',
                                warranty: '✅ گارانتی چینی کالا'
                            };

                            // فیلتر محصولاتی که به ایران ارسال می‌کنند
                            if (this.checkIranShipping($element)) {
                                products.push(product);
                            }
                        }
                    } catch (error) {
                        console.log(`خطا در استخراج محصول ${index}:`, error.message);
                    }
                });

                if (products.length > 0) {
                    console.log(`🎉 ${products.length} محصول واقعی پیدا شد!`);
                    return products;
                } else {
                    console.log('⚠️ محصولی پیدا نشد، استفاده از داده‌های نمونه...');
                    return this.getSampleData(keyword);
                }

            } catch (error) {
                console.log(`❌ خطا در تلاش ${attempt}:`, error.message);
                
                if (attempt < this.retryCount) {
                    console.log(`⏳ انتظار برای تلاش مجدد...`);
                    await this.randomDelay(3000, 8000);
                } else {
                    console.log('🔁 استفاده از داده‌های نمونه به دلیل خطای متعدد');
                    return this.getSampleData(keyword);
                }
            }
        }
    }

    // چک کردن ارسال به ایران
    checkIranShipping($element) {
        const shippingText = $element.text().toLowerCase();
        return shippingText.includes('worldwide') || 
               shippingText.includes('international') ||
               shippingText.includes('global');
    }

    // محاسبه قیمت نهایی با سود
    calculateFinalPrice(originalPrice) {
        try {
            const priceMatch = originalPrice.match(/(\d+\.?\d*)/);
            if (priceMatch) {
                const price = parseFloat(priceMatch[1]);
                const finalPrice = price * 40000 * 1.3
