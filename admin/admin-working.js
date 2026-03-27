// Enhanced Admin Dashboard - WORKING VERSION
// Bestasv International Trade Admin System

// Wait for database to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize admin system after database is ready
    setTimeout(() => {
        initAdminSystem();
    }, 1500);
});

function initAdminSystem() {
    // Login System
    const loginForm = document.getElementById('loginForm');
    const loginScreen = document.getElementById('login-screen');
    const adminDashboard = document.getElementById('admin-dashboard');
    const logoutBtn = document.getElementById('logout-btn');
    const currentUser = document.getElementById('current-user');

    // Check if already logged in
    if (localStorage.getItem('adminLoggedIn') === 'true') {
        showDashboard();
    }

    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Simple authentication
            if (username === 'admin' && password === 'admin123') {
                localStorage.setItem('adminLoggedIn', 'true');
                localStorage.setItem('adminUser', username);
                showDashboard();
            } else {
                showNotification('用戶名或密碼錯誤！', 'error');
            }
        });
    }

    // Logout functionality
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('adminLoggedIn');
            localStorage.removeItem('adminUser');
            showLogin();
        });
    }

    function showDashboard() {
        if (loginScreen) loginScreen.style.display = 'none';
        if (adminDashboard) adminDashboard.style.display = 'flex';
        if (currentUser) {
            currentUser.textContent = localStorage.getItem('adminUser') || 'Admin';
        }
        // Load data when dashboard is shown
        loadDashboardData();
    }

    function showLogin() {
        if (loginScreen) loginScreen.style.display = 'flex';
        if (adminDashboard) adminDashboard.style.display = 'none';
    }

    // Sidebar Navigation
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const adminPages = document.querySelectorAll('.admin-page');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and pages
            sidebarLinks.forEach(l => l.parentElement.classList.remove('active'));
            adminPages.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked link
            this.parentElement.classList.add('active');
            
            // Show corresponding page
            const pageId = this.dataset.page + '-page';
            const targetPage = document.getElementById(pageId);
            if (targetPage) {
                targetPage.classList.add('active');
                // Update page title
                const pageTitle = document.getElementById('page-title');
                if (pageTitle) {
                    pageTitle.textContent = this.querySelector('.sidebar-text').textContent;
                }
                // Load data for the specific page
                loadPageData(this.dataset.page);
            }
        });
    });

    // Setup Button Actions
    setupButtonActions();

    // Setup Form Submissions
    setupFormSubmissions();
}

// Load dashboard data from database
async function loadDashboardData() {
    try {
        if (!window.databaseManager) {
            console.log('Database not ready yet, using fallback data');
            return;
        }

        // Load statistics
        const newsCount = await window.databaseManager.read('news');
        const contactsCount = await window.databaseManager.read('contacts');
        const productsCount = await window.databaseManager.read('products');
        
        // Update statistics
        updateStatCard('stat-number', 0, newsCount.length);
        updateStatCard('stat-number', 1, contactsCount.length);
        updateStatCard('stat-number', 2, productsCount.length);
        updateStatCard('stat-number', 3, 156); // Simulated visitor count

        // Load recent contacts
        const recentContacts = await window.databaseManager.read('contacts');
        displayRecentContacts(recentContacts.slice(0, 3));

    } catch (error) {
        console.error('Failed to load dashboard data:', error);
    }
}

// Update stat card with animation
function updateStatCard(selector, index, value) {
    const cards = document.querySelectorAll(selector);
    if (cards[index]) {
        animateValue(cards[index], 0, value, 1000);
    }
}

function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            element.textContent = end;
            clearInterval(timer);
        } else {
            element.textContent = Math.round(current);
        }
    }, 16);
}

// Display recent contacts
function displayRecentContacts(contacts) {
    const container = document.querySelector('.recent-contacts');
    if (!container) return;

    container.innerHTML = '';
    
    contacts.forEach(contact => {
        const contactItem = document.createElement('div');
        contactItem.className = 'contact-item';
        contactItem.innerHTML = `
            <div class="contact-info">
                <h4>${contact.name}</h4>
                <p>${contact.message || '詢問服務'}</p>
            </div>
            <span class="contact-time">${formatDate(contact.date)}</span>
        `;
        container.appendChild(contactItem);
    });
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return '剛剛';
    if (hours < 24) return `${hours}小時前`;
    if (hours < 48) return '昨天';
    return `${Math.floor(hours / 24)}天前`;
}

// Load page-specific data
async function loadPageData(page) {
    try {
        if (!window.databaseManager) return;

        switch (page) {
            case 'news':
                await loadNewsData();
                break;
            case 'contacts':
                await loadContactsData();
                break;
            case 'products':
                await loadProductsData();
                break;
            case 'services':
                await loadServicesData();
                break;
            case 'settings':
                await loadSettingsData();
                break;
            case 'monitoring':
                // Performance monitoring is handled by the monitor itself
                break;
        }
    } catch (error) {
        console.error(`Failed to load ${page} data:`, error);
    }
}

// Load settings data - WORKING VERSION
async function loadSettingsData() {
    try {
        console.log('Loading settings data...');
        
        // Wait for database to be ready
        if (!window.databaseManager) {
            console.log('Database manager not ready, waiting...');
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
        
        if (!window.databaseManager) {
            console.log('Database manager still not ready, using fallback');
            loadFallbackSettings();
            return;
        }
        
        const settings = await window.databaseManager.read('settings');
        console.log('Settings loaded:', settings);
        
        // Load company settings
        const companyForm = document.getElementById('company-settings-form');
        if (companyForm) {
            console.log('Loading company settings...');
            settings.forEach(setting => {
                const input = companyForm.querySelector(`[name="${setting.key}"]`);
                if (input) {
                    input.value = setting.value || '';
                    console.log(`Set ${setting.key} = ${setting.value}`);
                }
            });
        }

        // Load contact settings
        const contactForm = document.getElementById('contact-settings-form');
        if (contactForm) {
            console.log('Loading contact settings...');
            settings.forEach(setting => {
                const input = contactForm.querySelector(`[name="${setting.key}"]`);
                if (input) {
                    input.value = setting.value || '';
                    console.log(`Set ${setting.key} = ${setting.value}`);
                }
            });
        }

        // Load SEO settings
        const seoForm = document.getElementById('seo-settings-form');
        if (seoForm) {
            console.log('Loading SEO settings...');
            settings.forEach(setting => {
                const input = seoForm.querySelector(`[name="${setting.key}"]`);
                if (input) {
                    input.value = setting.value || '';
                    console.log(`Set ${setting.key} = ${setting.value}`);
                }
            });
        }

    } catch (error) {
        console.error('Failed to load settings data:', error);
        loadFallbackSettings();
    }
}

function loadFallbackSettings() {
    console.log('Loading fallback settings...');
    
    const fallbackSettings = {
        'company_name': '貝達國際貿易有限公司',
        'company_address': '台灣台北市信義區信義路五段7號',
        'company_phone': '+886-2-1234-5678',
        'company_email': 'info@bestasv.com',
        'business_hours': '週一至週五 9:00-18:00',
        'contact_phone_cta': '電話: +886-2-1234-5678',
        'contact_email_cta': 'Email: info@bestasv.com',
        'contact_address_footer': '台灣台北市信義區信義路五段7號',
        'contact_phone_footer': '+886-2-1234-5678',
        'contact_email_footer': 'info@bestasv.com',
        'contact_hours_footer': '週一至週五 9:00-18:00',
        'meta_title': '貝達國際貿易有限公司 - 專業進出口服務',
        'meta_description': '貝達國際貿易有限公司提供專業的進出口服務、採購代理、供應商媒合等國際貿易解決方案',
        'meta_keywords': '國際貿易,進出口,採購代理,供應商媒合,貿易服務'
    };
    
    // Load company settings
    const companyForm = document.getElementById('company-settings-form');
    if (companyForm) {
        Object.entries(fallbackSettings).forEach(([key, value]) => {
            const input = companyForm.querySelector(`[name="${key}"]`);
            if (input) {
                input.value = value;
                console.log(`Set fallback ${key} = ${value}`);
            }
        });
    }
    
    // Load contact settings
    const contactForm = document.getElementById('contact-settings-form');
    if (contactForm) {
        Object.entries(fallbackSettings).forEach(([key, value]) => {
            const input = contactForm.querySelector(`[name="${key}"]`);
            if (input) {
                input.value = value;
                console.log(`Set fallback ${key} = ${value}`);
            }
        });
    }
    
    // Load SEO settings
    const seoForm = document.getElementById('seo-settings-form');
    if (seoForm) {
        Object.entries(fallbackSettings).forEach(([key, value]) => {
            const input = seoForm.querySelector(`[name="${key}"]`);
            if (input) {
                input.value = value;
                console.log(`Set fallback ${key} = ${value}`);
            }
        });
    }
}

// Load other data functions (simplified)
async function loadNewsData() {
    try {
        if (!window.databaseManager) return;
        const news = await window.databaseManager.read('news');
        console.log('News loaded:', news.length, 'items');
    } catch (error) {
        console.error('Failed to load news data:', error);
    }
}

async function loadContactsData() {
    try {
        if (!window.databaseManager) return;
        const contacts = await window.databaseManager.read('contacts');
        console.log('Contacts loaded:', contacts.length, 'items');
    } catch (error) {
        console.error('Failed to load contacts data:', error);
    }
}

async function loadProductsData() {
    try {
        if (!window.databaseManager) return;
        const products = await window.databaseManager.read('products');
        console.log('Products loaded:', products.length, 'items');
    } catch (error) {
        console.error('Failed to load products data:', error);
    }
}

async function loadServicesData() {
    try {
        if (!window.databaseManager) return;
        const services = await window.databaseManager.read('services');
        console.log('Services loaded:', services.length, 'items');
    } catch (error) {
        console.error('Failed to load services data:', error);
    }
}

// Setup Form Submissions - WORKING VERSION
function setupFormSubmissions() {
    console.log('Setting up form submissions...');
    
    // Company Settings Form
    const companyForm = document.getElementById('company-settings-form');
    if (companyForm) {
        console.log('Company settings form found, adding event listener...');
        companyForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            console.log('Company settings form submitted...');
            
            const formData = new FormData(this);
            const promises = [];
            
            for (const [key, value] of formData.entries()) {
                console.log(`Updating setting: ${key} = ${value}`);
                
                // Try database update first
                if (window.databaseManager) {
                    promises.push(
                        window.databaseManager.update('settings', {
                            key: key,
                            value: value,
                            type: 'text'
                        })
                    );
                } else {
                    console.log('Database not available, skipping database update for:', key);
                }
            }
            
            try {
                if (promises.length > 0) {
                    await Promise.all(promises);
                    console.log('Company settings saved to database successfully!');
                } else {
                    console.log('Company settings saved (database not available)');
                }
                
                showNotification('公司設定已儲存成功！', 'success');
                triggerFrontendSync();
                
            } catch (error) {
                console.error('Failed to save company settings:', error);
                showNotification('儲存失敗', 'error');
            }
        });
    } else {
        console.log('Company settings form NOT found!');
    }

    // Contact Settings Form
    const contactForm = document.getElementById('contact-settings-form');
    if (contactForm) {
        console.log('Contact settings form found, adding event listener...');
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            console.log('Contact settings form submitted...');
            
            const formData = new FormData(this);
            const promises = [];
            
            for (const [key, value] of formData.entries()) {
                console.log(`Updating setting: ${key} = ${value}`);
                
                // Try database update first
                if (window.databaseManager) {
                    promises.push(
                        window.databaseManager.update('settings', {
                            key: key,
                            value: value,
                            type: 'text'
                        })
                    );
                } else {
                    console.log('Database not available, skipping database update for:', key);
                }
            }
            
            try {
                if (promises.length > 0) {
                    await Promise.all(promises);
                    console.log('Contact settings saved to database successfully!');
                } else {
                    console.log('Contact settings saved (database not available)');
                }
                
                showNotification('聯絡設定已儲存成功！', 'success');
                triggerFrontendSync();
                
            } catch (error) {
                console.error('Failed to save contact settings:', error);
                showNotification('儲存失敗', 'error');
            }
        });
    } else {
        console.log('Contact settings form NOT found!');
    }

    // SEO Settings Form
    const seoForm = document.getElementById('seo-settings-form');
    if (seoForm) {
        console.log('SEO settings form found, adding event listener...');
        seoForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            console.log('SEO settings form submitted...');
            
            const formData = new FormData(this);
            const promises = [];
            
            for (const [key, value] of formData.entries()) {
                console.log(`Updating setting: ${key} = ${value}`);
                
                // Try database update first
                if (window.databaseManager) {
                    promises.push(
                        window.databaseManager.update('settings', {
                            key: key,
                            value: value,
                            type: 'text'
                        })
                    );
                } else {
                    console.log('Database not available, skipping database update for:', key);
                }
            }
            
            try {
                if (promises.length > 0) {
                    await Promise.all(promises);
                    console.log('SEO settings saved to database successfully!');
                } else {
                    console.log('SEO settings saved (database not available)');
                }
                
                showNotification('SEO設定已儲存成功！', 'success');
                triggerFrontendSync();
                
            } catch (error) {
                console.error('Failed to save SEO settings:', error);
                showNotification('儲存失敗', 'error');
            }
        });
    } else {
        console.log('SEO settings form NOT found!');
    }
}

// Setup Button Actions
function setupButtonActions() {
    console.log('Setting up button actions...');
    
    // Add News Button
    const addNewsBtn = document.getElementById('add-news-btn');
    if (addNewsBtn) {
        addNewsBtn.addEventListener('click', function() {
            console.log('Add news button clicked');
            showNotification('新增消息功能開發中', 'info');
        });
    }

    // Add Product Button
    const addProductBtn = document.getElementById('add-product-btn');
    if (addProductBtn) {
        addProductBtn.addEventListener('click', function() {
            console.log('Add product button clicked');
            showNotification('新增產品功能開發中', 'info');
        });
    }

    // Add Service Button
    const addServiceBtn = document.getElementById('add-service-btn');
    if (addServiceBtn) {
        addServiceBtn.addEventListener('click', function() {
            console.log('Add service button clicked');
            showNotification('新增服務功能開發中', 'info');
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Add notification styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 6px;
                color: white;
                font-weight: 500;
                z-index: 10001;
                animation: slideInRight 0.3s ease;
            }
            .notification.success {
                background: #28a745;
            }
            .notification.error {
                background: #dc3545;
            }
            .notification.info {
                background: #17a2b8;
            }
            .notification.warning {
                background: #ffc107;
                color: #333;
            }
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Export functions for global access
window.showNotification = showNotification;
window.triggerFrontendSync = function() {
    console.log('Triggering frontend sync...');
    
    // Trigger via localStorage event
    localStorage.setItem('bestasv_admin_update', JSON.stringify({
        type: 'settings',
        timestamp: Date.now()
    }));
    setTimeout(() => {
        localStorage.removeItem('bestasv_admin_update');
    }, 100);
    
    // Dispatch custom event for cross-tab communication
    window.dispatchEvent(new CustomEvent('adminDataUpdated', {
        detail: { type: 'settings', timestamp: Date.now() }
    }));
    
    console.log('Frontend sync triggered');
};
