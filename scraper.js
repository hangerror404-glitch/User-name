import axios from 'axios';
import * as cheerio from 'cheerio';

class AliExpressScraper {
    constructor() {
        this.baseURL = 'https://www.aliexpress.com';
    }

    // اسکن محصولات از AliExpress
    async searchProducts(keyword, maxPages = 3) {
        console.log(`🔍 در حال جستجوی "${keyword}" در AliExpress...`);
        
        const products = [];
        
        for (let page = 1; page <= maxPages; page++) {
            try {
                const searchUrl = `${this.baseURL}/w/wholesale-${encodeURIComponent(keyword)}.html?page=${page}`;
                console.log(`📄 در حال اسکن صفحه ${page}: ${searchUrl}`);
                
                const response = await axios.get(searchUrl, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                    },
                    timeout: 10000
                });

                const $ = cheerio.load(response.data);
                
                // استخراج محصولات از صفحه
                $('[product-id]').each((index, element) => {
                    const product = {
                        id: $(element).attr('product-id'),
                        title: $(element).find('.item-title').text()?.trim() || 'عنوان نامعلوم',
                        price: $(element).find('.price-current').text()?.trim() || '0',
                        image: $(element).find('.item-img').attr('src') || '',
                        store: $(element).find('.store-name').text()?.trim() || 'فروشنده نامعلوم',
                        rating: $(element).find('.rating-value').text()?.trim() || '0',
                        orders: $(element).find('.order-num').text()?.trim() || '0'
                    };

                    if (product.title !== 'عنوان نامعلوم') {
                        products.push(product);
                    }
                });

                // تاخیر برای جلوگیری از بلاک
                await this.delay(2000);
                
            } catch (error) {
                console.log(`❌ خطا در صفحه ${page}:`, error.message);
            }
        }

        console.log(`✅ ${products.length} محصول پیدا شد`);
        return products;
    }

    // تابع کمکی برای تاخیر
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // محاسبه قیمت نهایی با سود
    calculateFinalPrice(originalPrice, profitMargin = 0.3) {
        const price = parseFloat(originalPrice.replace('US $', '')) || 0;
        const finalPrice = price * (1 + profitMargin);
        return `$${finalPrice.toFixed(2)} (سود: ${(profitMargin * 100)}%)`;
    }
}

export default AliExpressScraper;
