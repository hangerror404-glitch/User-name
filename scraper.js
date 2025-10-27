// scraper.js - نسخه ساده‌تر
const axios = require('axios');
const cheerio = require('cheerio');

class AliExpressScraper {
    constructor() {
        this.baseURL = 'https://www.aliexpress.com';
    }

    async searchProducts(keyword) {
        console.log(`🔍 جستجوی: ${keyword}`);
        
        // داده‌های نمونه برای تست
        const sampleProducts = [
            {
                title: `${keyword} - مدل A`,
                price: "US $12.99",
                store: "Global Store",
                rating: "4.7",
                orders: "850+",
                finalPrice: "$16.89 (سود: 30%)"
            },
            {
                title: `${keyword} - مدل B`,
                price: "US $8.50",
                store: "Tech World", 
                rating: "4.5",
                orders: "1200+",
                finalPrice: "$11.05 (سود: 30%)"
            }
        ];

        return sampleProducts;
    }
}

module.exports = AliExpressScraper;
