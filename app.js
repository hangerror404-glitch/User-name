// خط اول رو تغییر بده به:
const RealAliExpressScraper = require('./real-scraper.js');

// و این خط رو اضافه کن:
const realScraper = new RealAliExpressScraper();

// تابع scanGlobalSuppliers رو آپدیت کن:
async function scanGlobalSuppliers() {
    const keyword = document.getElementById('searchInput').value || 'گجت الکترونیکی';
    
    showLoading(true);
    updateSystemStatus('در حال اتصال واقعی به علی‌اکسپرس...', '🔵');
    
    try {
        // استفاده از اسکرپر واقعی
        const realProducts = await realScraper.freeRealSearch(keyword);
        
        showLoading(false);
        
        if (realProducts && realProducts.length > 0) {
            importedProducts = realProducts;
            displayImportedProducts(realProducts);
            updateCounters();
            updateSystemStatus(`✅ ${realProducts.length} محصول واقعی از علی‌اکسپرس دریافت شد`, '🟢');
        } else {
            // اگر اسکرپر واقعی جواب نداد، از نمونه استفاده کن
            showSampleImports();
            updateSystemStatus('⚠️ از داده‌های نمونه استفاده شد', '🟡');
        }
    } catch (error) {
        showLoading(false);
        showSampleImports();
        updateSystemStatus('🔴 خطا در اسکن واقعی - نمایش نمونه', '🔴');
    }
}
