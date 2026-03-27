// Frontend-Backend Synchronization System - FINAL WORKING VERSION
// Real-time data sync between admin dashboard and frontend

class FrontendSync {
    constructor() {
        this.syncInterval = 3000; // Sync every 3 seconds for faster response
        this.isSyncing = false;
        this.init();
    }

    init() {
        console.log('Initializing frontend sync system...');
        
        // Start periodic sync
        this.startPeriodicSync();
        
        // Listen for storage events (cross-tab sync)
        this.setupStorageListener();
        
        // Listen for admin updates
        this.setupAdminListener();
        
        // Initial sync immediately
        setTimeout(() => {
            console.log('Performing immediate initial sync...');
            this.syncAllData();
        }, 1000);
        
        console.log('Frontend sync system initialized (FINAL VERSION)');
    }

    startPeriodicSync() {
        setInterval(() => {
            this.syncAllData();
        }, this.syncInterval);
    }

    setupStorageListener() {
        window.addEventListener('storage', (e) => {
            if (e.key && e.key.startsWith('bestasv_')) {
                console.log('Storage change detected, syncing...');
                this.syncAllData();
            }
        });
        
        // Listen for admin update events
        window.addEventListener('adminDataUpdated', (e) => {
            console.log('Admin data updated event received:', e.detail);
            this.handleAdminUpdate(e.detail);
        });
        
        // Listen for localStorage admin updates - CRITICAL FIX
        const checkStorage = setInterval(() => {
            const adminUpdate = localStorage.getItem('bestasv_admin_update');
            if (adminUpdate) {
                console.log('Admin update detected via localStorage');
                localStorage.removeItem('bestasv_admin_update');
                this.syncAllData();
            }
        }, 500);
    }

    setupAdminListener() {
        // Listen for custom events from admin dashboard
        window.addEventListener('adminDataUpdated', (e) => {
            console.log('Admin data updated:', e.detail);
            this.handleAdminUpdate(e.detail);
        });
    }

    async syncAllData() {
        if (this.isSyncing) return;
        
        this.isSyncing = true;
        
        try {
            console.log('Starting frontend sync...');
            
            // Sync settings - CRITICAL FIX
            await this.syncSettings();
            
            // Sync other data
            await this.syncNews();
            await this.syncServices();
            await this.syncProducts();
            
            console.log('Frontend sync completed successfully');
        } catch (error) {
            console.error('Sync error:', error);
        } finally {
            this.isSyncing = false;
        }
    }

    async syncSettings() {
        try {
            console.log('Syncing settings...');
            
            // Check if database is available
            if (!window.databaseManager) {
                console.log('Database manager not available, checking for admin database...');
                // Try to access admin database
                if (window.opener && window.opener.databaseManager) {
                    console.log('Using admin database from opener window...');
                    const settings = await window.opener.databaseManager.read('settings');
                    this.updateContactInfo(settings);
                    return;
                }
                
                // Try to create database manager
                if (typeof DatabaseManager !== 'undefined') {
                    console.log('Creating new database manager...');
                    window.databaseManager = new DatabaseManager();
                    await new Promise(resolve => setTimeout(resolve, 1000));
                } else {
                    console.log('Database manager not available, skipping settings sync');
                    return;
                }
            }
            
            const settings = await window.databaseManager.read('settings');
            console.log('Settings loaded:', settings);
            
            // Update contact information - CRITICAL FIX
            this.updateContactInfo(settings);
            
        } catch (error) {
            console.error('Settings sync error:', error);
        }
    }

    updateContactInfo(settings) {
        console.log('Updating contact info with settings:', settings);
        
        // Update company phone - CRITICAL FIX
        const phoneSetting = settings.find(s => s.key === 'company_phone');
        if (phoneSetting) {
            console.log('Updating phone to:', phoneSetting.value);
            // Update all phone elements with data-contact-phone attribute
            const phoneElements = document.querySelectorAll('[data-contact-phone]');
            phoneElements.forEach(el => {
                // Check if it's CTA phone (has prefix)
                if (el.classList.contains('cta-phone')) {
                    el.textContent = `電話: ${phoneSetting.value}`;
                } else {
                    el.textContent = phoneSetting.value;
                }
                console.log('Updated phone element:', el.textContent);
            });
        }

        // Update company email - CRITICAL FIX
        const emailSetting = settings.find(s => s.key === 'company_email');
        if (emailSetting) {
            console.log('Updating email to:', emailSetting.value);
            // Update all email elements with data-contact-email attribute
            const emailElements = document.querySelectorAll('[data-contact-email]');
            emailElements.forEach(el => {
                // Check if it's CTA email (has prefix)
                if (el.classList.contains('cta-email')) {
                    el.textContent = `Email: ${emailSetting.value}`;
                } else {
                    el.textContent = emailSetting.value;
                }
                console.log('Updated email element:', el.textContent);
            });
        }

        // Update company address - CRITICAL FIX
        const addressSetting = settings.find(s => s.key === 'company_address');
        if (addressSetting) {
            console.log('Updating address to:', addressSetting.value);
            // Update all address elements with data-contact-address attribute
            const addressElements = document.querySelectorAll('[data-contact-address]');
            addressElements.forEach(el => {
                el.textContent = addressSetting.value;
                console.log('Updated address element:', el.textContent);
            });
        }

        // Update business hours - CRITICAL FIX
        const hoursSetting = settings.find(s => s.key === 'business_hours');
        if (hoursSetting) {
            console.log('Updating hours to:', hoursSetting.value);
            // Update all hours elements with data-contact-hours attribute
            const hoursElements = document.querySelectorAll('[data-contact-hours]');
            hoursElements.forEach(el => {
                el.textContent = hoursSetting.value;
                console.log('Updated hours element:', el.textContent);
            });
        }

        console.log('Contact info update completed');
    }

    async syncNews() {
        try {
            if (!window.databaseManager) return;
            
            const news = await window.databaseManager.read('news');
            const publishedNews = news.filter(item => item.status === 'published');
            
            // Update news preview section
            this.updateNewsPreview(publishedNews);
            
        } catch (error) {
            console.error('News sync error:', error);
        }
    }

    async syncServices() {
        try {
            if (!window.databaseManager) return;
            
            const services = await window.databaseManager.read('services');
            
            // Update services section
            this.updateServicesSection(services);
            
        } catch (error) {
            console.error('Services sync error:', error);
        }
    }

    async syncProducts() {
        try {
            if (!window.databaseManager) return;
            
            const products = await window.databaseManager.read('products');
            const activeProducts = products.filter(item => item.status === 'active');
            
            // Update categories section
            this.updateCategoriesSection(activeProducts);
            
        } catch (error) {
            console.error('Products sync error:', error);
        }
    }

    updateNewsPreview(newsItems) {
        const newsGrid = document.querySelector('.news-grid');
        if (!newsGrid) return;

        // Clear existing content
        newsGrid.innerHTML = '';

        // Add latest 3 news items
        newsItems.slice(0, 3).forEach(news => {
            const newsCard = this.createNewsCard(news);
            newsGrid.appendChild(newsCard);
        });

        // Add fade-in animation
        newsGrid.querySelectorAll('.news-card').forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('fade-in', 'visible');
            }, index * 100);
        });
    }

    createNewsCard(news) {
        const card = document.createElement('div');
        card.className = 'news-card';
        
        const categoryNames = {
            'company': '公司消息',
            'industry': '產業資訊',
            'market': '市場趨勢',
            'case': '案例分享'
        };

        card.innerHTML = `
            <div class="news-image">
                <img src="${news.image || 'assets/images/default-news.jpg'}" alt="${news.title}">
            </div>
            <div class="news-content">
                <div class="news-meta">
                    <span class="news-category">${categoryNames[news.category] || news.category}</span>
                    <span class="news-date">${this.formatDate(news.date)}</span>
                </div>
                <h3 class="news-title">${news.title}</h3>
                <p class="news-excerpt">${this.truncateText(news.content, 100)}</p>
                <a href="pages/news.html" class="news-link">閱讀更多</a>
            </div>
        `;
        
        return card;
    }

    updateServicesSection(services) {
        const servicesGrid = document.querySelector('.services-grid');
        if (!servicesGrid) return;

        // Clear existing content
        servicesGrid.innerHTML = '';

        // Add all services
        services.forEach((service, index) => {
            const serviceCard = this.createServiceCard(service, index);
            servicesGrid.appendChild(serviceCard);
        });
    }

    createServiceCard(service, index) {
        const card = document.createElement('div');
        card.className = 'service-card';
        
        card.innerHTML = `
            <div class="service-icon">
                ${service.icon || '🛠️'}
            </div>
            <h3 class="service-title">${service.name}</h3>
            <p class="service-desc">${service.description}</p>
        `;
        
        // Add fade-in animation
        setTimeout(() => {
            card.classList.add('fade-in', 'visible');
        }, index * 100);
        
        return card;
    }

    updateCategoriesSection(products) {
        const categoriesGrid = document.querySelector('.categories-grid');
        if (!categoriesGrid) return;

        // Group products by category
        const categories = this.groupProductsByCategory(products);
        
        // Clear existing content
        categoriesGrid.innerHTML = '';

        // Add category cards
        Object.entries(categories).forEach(([category, items], index) => {
            const categoryCard = this.createCategoryCard(category, items);
            categoriesGrid.appendChild(categoryCard);
        });
    }

    groupProductsByCategory(products) {
        const categories = {
            'industrial': { name: '工業五金', desc: '各類工業用五金零件、工具及配件', items: [] },
            'machinery': { name: '機械零件', desc: '精密機械零件、軸承、齒輪等', items: [] },
            'construction': { name: '建材工程', desc: '建築材料、工程配件、裝潢用品', items: [] },
            'custom': { name: '客製採購品', desc: '根據客戶需求定制專屬產品', items: [] }
        };

        products.forEach(product => {
            if (categories[product.category]) {
                categories[product.category].items.push(product);
            }
        });

        return categories;
    }

    createCategoryCard(categoryKey, categoryData) {
        const card = document.createElement('div');
        card.className = 'category-card';
        
        // Use first product image or default
        const imageSrc = categoryData.items.length > 0 
            ? (categoryData.items[0].image || 'assets/images/default-category.jpg')
            : 'assets/images/default-category.jpg';
        
        card.innerHTML = `
            <div class="category-image">
                <img src="${imageSrc}" alt="${categoryData.name}">
            </div>
            <div class="category-content">
                <h3 class="category-title">${categoryData.name}</h3>
                <p class="category-desc">${categoryData.desc}</p>
                <a href="pages/services.html" class="category-link">了解更多 →</a>
            </div>
        `;
        
        return card;
    }

    handleAdminUpdate(data) {
        // Handle specific admin updates
        switch (data.type) {
            case 'news':
                this.syncNews();
                break;
            case 'services':
                this.syncServices();
                break;
            case 'products':
                this.syncProducts();
                break;
            case 'settings':
                this.syncSettings();
                break;
            default:
                this.syncAllData();
        }
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('zh-TW', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }

    // Manual sync trigger
    triggerSync() {
        console.log('Manual sync triggered');
        this.syncAllData();
    }

    // Destroy sync system
    destroy() {
        if (this.syncInterval) {
            clearInterval(this.syncInterval);
        }
    }
}

// Initialize frontend sync when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM ready, initializing frontend sync...');
    
    // Initialize immediately
    window.frontendSync = new FrontendSync();
    
    // Add manual sync trigger for testing
    window.triggerFrontendSync = () => {
        console.log('Manual frontend sync triggered');
        window.frontendSync.triggerSync();
    };
    
    console.log('Frontend sync system ready (FINAL VERSION)');
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FrontendSync;
}
