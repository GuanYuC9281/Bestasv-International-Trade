// Frontend-Backend Synchronization System
// Real-time data sync between admin dashboard and frontend

class FrontendSync {
    constructor() {
        this.syncInterval = 5000; // Sync every 5 seconds
        this.isSyncing = false;
        this.init();
    }

    init() {
        // Start periodic sync
        this.startPeriodicSync();
        
        // Listen for storage events (cross-tab sync)
        this.setupStorageListener();
        
        // Listen for admin updates
        this.setupAdminListener();
        
        console.log('Frontend sync system initialized');
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
            // Sync news
            await this.syncNews();
            
            // Sync services
            await this.syncServices();
            
            // Sync products
            await this.syncProducts();
            
            // Sync settings
            await this.syncSettings();
            
            console.log('Frontend sync completed');
        } catch (error) {
            console.error('Sync error:', error);
        } finally {
            this.isSyncing = false;
        }
    }

    async syncNews() {
        try {
            if (!window.databaseManager) return;
            
            const news = await window.databaseManager.read('news');
            const publishedNews = news.filter(item => item.status === 'published');
            
            // Update news preview section
            this.updateNewsPreview(publishedNews);
            
            // Update full news page if it exists
            this.updateNewsPage(publishedNews);
            
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
            
            // Update services page if it exists
            this.updateServicesPage(services);
            
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
            
            // Update products page if it exists
            this.updateProductsPage(activeProducts);
            
        } catch (error) {
            console.error('Products sync error:', error);
        }
    }

    async syncSettings() {
        try {
            if (!window.databaseManager) return;
            
            const settings = await window.databaseManager.read('settings');
            
            // Update company information
            this.updateCompanyInfo(settings);
            
            // Update contact information
            this.updateContactInfo(settings);
            
        } catch (error) {
            console.error('Settings sync error:', error);
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

    updateCompanyInfo(settings) {
        // Update brand name
        const brandName = document.querySelector('.brand-name');
        if (brandName) {
            const companySetting = settings.find(s => s.key === 'company_name');
            if (companySetting) {
                brandName.textContent = companySetting.value;
            }
        }

        // Update footer brand name
        const footerBrandName = document.querySelector('.footer-brand-name');
        if (footerBrandName) {
            const companySetting = settings.find(s => s.key === 'company_name');
            if (companySetting) {
                footerBrandName.textContent = companySetting.value;
            }
        }

        // Update footer description
        const footerDesc = document.querySelector('.footer-desc');
        if (footerDesc) {
            const descSetting = settings.find(s => s.key === 'company_description');
            if (descSetting) {
                footerDesc.textContent = descSetting.value;
            }
        }
    }

    updateContactInfo(settings) {
        // Update phone
        const phoneElements = document.querySelectorAll('[data-contact-phone]');
        const phoneSetting = settings.find(s => s.key === 'company_phone');
        if (phoneSetting) {
            phoneElements.forEach(el => {
                el.textContent = phoneSetting.value;
            });
        }

        // Update email
        const emailElements = document.querySelectorAll('[data-contact-email]');
        const emailSetting = settings.find(s => s.key === 'company_email');
        if (emailSetting) {
            emailElements.forEach(el => {
                el.textContent = emailSetting.value;
            });
        }

        // Update address
        const addressElements = document.querySelectorAll('[data-contact-address]');
        const addressSetting = settings.find(s => s.key === 'company_address');
        if (addressSetting) {
            addressElements.forEach(el => {
                el.textContent = addressSetting.value;
            });
        }

        // Update business hours
        const hoursElements = document.querySelectorAll('[data-contact-hours]');
        const hoursSetting = settings.find(s => s.key === 'business_hours');
        if (hoursSetting) {
            hoursElements.forEach(el => {
                el.textContent = hoursSetting.value;
            });
        }
    }

    updateNewsPage(newsItems) {
        // This would update the full news page if it exists
        // Implementation depends on the news page structure
        console.log('News page updated with', newsItems.length, 'items');
    }

    updateServicesPage(services) {
        // This would update the full services page if it exists
        // Implementation depends on the services page structure
        console.log('Services page updated with', services.length, 'items');
    }

    updateProductsPage(products) {
        // This would update the full products page if it exists
        // Implementation depends on the products page structure
        console.log('Products page updated with', products.length, 'items');
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
    // Wait for database to be ready
    setTimeout(() => {
        window.frontendSync = new FrontendSync();
        
        // Add manual sync trigger for testing
        window.triggerFrontendSync = () => {
            window.frontendSync.triggerSync();
        };
        
        console.log('Frontend sync system ready');
    }, 2000);
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FrontendSync;
}
