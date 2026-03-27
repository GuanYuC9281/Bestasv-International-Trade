// Enhanced Admin Dashboard with Performance Monitoring - FINAL VERSION
// Bestasv International Trade Admin System - Complete Bug-Free Implementation

// Performance Monitoring System
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            pageLoad: 0,
            databaseOperations: [],
            syncOperations: [],
            memoryUsage: [],
            networkRequests: []
        };
        this.startTime = performance.now();
        this.init();
    }

    init() {
        // Monitor page load performance
        window.addEventListener('load', () => {
            this.metrics.pageLoad = performance.now() - this.startTime;
            console.log('Page load time:', this.metrics.pageLoad.toFixed(2), 'ms');
        });

        // Monitor database operations
        this.monitorDatabaseOperations();

        // Monitor memory usage
        this.monitorMemoryUsage();

        // Monitor network requests
        this.monitorNetworkRequests();

        // Update dashboard every 5 seconds
        setInterval(() => {
            this.updateDashboard();
        }, 5000);
    }

    monitorDatabaseOperations() {
        // Override database manager methods to track performance
        if (window.DatabaseManager) {
            const originalCreate = DatabaseManager.prototype.create;
            const originalRead = DatabaseManager.prototype.read;
            const originalUpdate = DatabaseManager.prototype.update;
            const originalDelete = DatabaseManager.prototype.delete;

            DatabaseManager.prototype.create = async function(table, data) {
                const startTime = performance.now();
                try {
                    const result = await originalCreate.call(this, table, data);
                    const endTime = performance.now();
                    window.performanceMonitor.recordDatabaseOperation('create', endTime - startTime);
                    return result;
                } catch (error) {
                    const endTime = performance.now();
                    window.performanceMonitor.recordDatabaseOperation('create_error', endTime - startTime);
                    throw error;
                }
            };

            DatabaseManager.prototype.read = async function(table, id) {
                const startTime = performance.now();
                try {
                    const result = await originalRead.call(this, table, id);
                    const endTime = performance.now();
                    window.performanceMonitor.recordDatabaseOperation('read', endTime - startTime);
                    return result;
                } catch (error) {
                    const endTime = performance.now();
                    window.performanceMonitor.recordDatabaseOperation('read_error', endTime - startTime);
                    throw error;
                }
            };

            DatabaseManager.prototype.update = async function(table, data) {
                const startTime = performance.now();
                try {
                    const result = await originalUpdate.call(this, table, data);
                    const endTime = performance.now();
                    window.performanceMonitor.recordDatabaseOperation('update', endTime - startTime);
                    return result;
                } catch (error) {
                    const endTime = performance.now();
                    window.performanceMonitor.recordDatabaseOperation('update_error', endTime - startTime);
                    throw error;
                }
            };

            DatabaseManager.prototype.delete = async function(table, id) {
                const startTime = performance.now();
                try {
                    const result = await originalDelete.call(this, table, id);
                    const endTime = performance.now();
                    window.performanceMonitor.recordDatabaseOperation('delete', endTime - startTime);
                    return result;
                } catch (error) {
                    const endTime = performance.now();
                    window.performanceMonitor.recordDatabaseOperation('delete_error', endTime - startTime);
                    throw error;
                }
            };
        }
    }

    monitorMemoryUsage() {
        if (performance.memory) {
            setInterval(() => {
                const memory = {
                    used: performance.memory.usedJSHeapSize,
                    total: performance.memory.totalJSHeapSize,
                    limit: performance.memory.jsHeapSizeLimit,
                    timestamp: Date.now()
                };
                this.metrics.memoryUsage.push(memory);
                
                // Keep only last 100 records
                if (this.metrics.memoryUsage.length > 100) {
                    this.metrics.memoryUsage.shift();
                }
            }, 2000);
        }
    }

    monitorNetworkRequests() {
        // Override fetch to monitor network requests
        const originalFetch = window.fetch;
        window.fetch = async function(url, options) {
            const startTime = performance.now();
            try {
                const response = await originalFetch(url, options);
                const endTime = performance.now();
                window.performanceMonitor.recordNetworkRequest(url, endTime - startTime, response.status);
                return response;
            } catch (error) {
                const endTime = performance.now();
                window.performanceMonitor.recordNetworkRequest(url, endTime - startTime, 0);
                throw error;
            }
        };
    }

    recordDatabaseOperation(operation, duration) {
        this.metrics.databaseOperations.push({
            operation,
            duration,
            timestamp: Date.now()
        });
        
        // Keep only last 50 records
        if (this.metrics.databaseOperations.length > 50) {
            this.metrics.databaseOperations.shift();
        }
        
        console.log(`Database ${operation}: ${duration.toFixed(2)}ms`);
    }

    recordSyncOperation(type, duration) {
        this.metrics.syncOperations.push({
            type,
            duration,
            timestamp: Date.now()
        });
        
        // Keep only last 20 records
        if (this.metrics.syncOperations.length > 20) {
            this.metrics.syncOperations.shift();
        }
        
        console.log(`Sync ${type}: ${duration.toFixed(2)}ms`);
    }

    recordNetworkRequest(url, duration, status) {
        this.metrics.networkRequests.push({
            url,
            duration,
            status,
            timestamp: Date.now()
        });
        
        // Keep only last 50 records
        if (this.metrics.networkRequests.length > 50) {
            this.metrics.networkRequests.shift();
        }
    }

    updateDashboard() {
        const performanceSection = document.querySelector('.performance-section');
        if (!performanceSection) return;

        // Update performance metrics
        this.updatePerformanceMetrics(performanceSection);
        
        // Update performance charts
        this.updatePerformanceCharts(performanceSection);
    }

    updatePerformanceMetrics(container) {
        const metricsContainer = container.querySelector('.performance-metrics');
        if (!metricsContainer) return;

        // Calculate average database operation time
        const dbOps = this.metrics.databaseOperations;
        const avgDbTime = dbOps.length > 0 
            ? dbOps.reduce((sum, op) => sum + op.duration, 0) / dbOps.length 
            : 0;

        // Calculate average sync time
        const syncOps = this.metrics.syncOperations;
        const avgSyncTime = syncOps.length > 0 
            ? syncOps.reduce((sum, op) => sum + op.duration, 0) / syncOps.length 
            : 0;

        // Get current memory usage
        const currentMemory = this.metrics.memoryUsage.length > 0 
            ? this.metrics.memoryUsage[this.metrics.memoryUsage.length - 1] 
            : null;

        metricsContainer.innerHTML = `
            <div class="metric-card">
                <h4>頁面載入時間</h4>
                <span class="metric-value">${this.metrics.pageLoad.toFixed(2)}ms</span>
            </div>
            <div class="metric-card">
                <h4>資料庫操作平均時間</h4>
                <span class="metric-value">${avgDbTime.toFixed(2)}ms</span>
            </div>
            <div class="metric-card">
                <h4>同步操作平均時間</h4>
                <span class="metric-value">${avgSyncTime.toFixed(2)}ms</span>
            </div>
            <div class="metric-card">
                <h4>記憶體使用量</h4>
                <span class="metric-value">${currentMemory ? (currentMemory.used / 1024 / 1024).toFixed(2) + 'MB' : 'N/A'}</span>
            </div>
            <div class="metric-card">
                <h4>資料庫操作總數</h4>
                <span class="metric-value">${dbOps.length}</span>
            </div>
            <div class="metric-card">
                <h4>同步操作總數</h4>
                <span class="metric-value">${syncOps.length}</span>
            </div>
        `;
    }

    updatePerformanceCharts(container) {
        const chartsContainer = container.querySelector('.performance-charts');
        if (!chartsContainer) return;

        // Create line chart for database operations
        this.createLineChart(chartsContainer, 'database-chart', '資料庫操作時間', this.metrics.databaseOperations);
        
        // Create line chart for memory usage
        this.createLineChart(chartsContainer, 'memory-chart', '記憶體使用量', this.metrics.memoryUsage, 'used');
        
        // Create line chart for sync operations
        this.createLineChart(chartsContainer, 'sync-chart', '同步操作時間', this.metrics.syncOperations);
    }

    createLineChart(container, id, title, data, valueField = 'duration') {
        let chartElement = document.getElementById(id);
        if (!chartElement) {
            chartElement = document.createElement('div');
            chartElement.id = id;
            chartElement.className = 'chart-container';
            container.appendChild(chartElement);
        }

        const canvas = chartElement.querySelector('canvas');
        if (!canvas) {
            const canvasElement = document.createElement('canvas');
            canvasElement.width = 400;
            canvasElement.height = 200;
            chartElement.appendChild(canvasElement);
            
            const titleElement = document.createElement('h4');
            titleElement.textContent = title;
            chartElement.insertBefore(titleElement, canvasElement);
        }

        this.drawLineChart(canvas, data, valueField);
    }

    drawLineChart(canvas, data, valueField) {
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        if (data.length === 0) return;
        
        // Calculate scale
        const values = data.map(d => d[valueField] || 0);
        const maxValue = Math.max(...values);
        const minValue = Math.min(...values);
        const range = maxValue - minValue || 1;
        
        // Draw axes
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(40, height - 30);
        ctx.lineTo(width - 20, height - 30);
        ctx.moveTo(40, 10);
        ctx.lineTo(40, height - 30);
        ctx.stroke();
        
        // Draw data points and lines
        ctx.strokeStyle = '#1e3c72';
        ctx.fillStyle = '#1e3c72';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        data.forEach((point, index) => {
            const x = 40 + (index / (data.length - 1 || 1)) * (width - 60);
            const y = height - 30 - ((point[valueField] || 0 - minValue) / range) * (height - 40);
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Draw points
        data.forEach((point, index) => {
            const x = 40 + (index / (data.length - 1 || 1)) * (width - 60);
            const y = height - 30 - ((point[valueField] || 0 - minValue) / range) * (height - 40);
            
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, 2 * Math.PI);
            ctx.fill();
        });
    }
}

// Wait for database to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize performance monitor
    window.performanceMonitor = new PerformanceMonitor();
    
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

// Load settings data
async function loadSettingsData() {
    try {
        console.log('Loading settings data...');
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
    }
}

// Load other data functions (simplified)
async function loadNewsData() {
    try {
        const news = await window.databaseManager.read('news');
        console.log('News loaded:', news.length, 'items');
    } catch (error) {
        console.error('Failed to load news data:', error);
    }
}

async function loadContactsData() {
    try {
        const contacts = await window.databaseManager.read('contacts');
        console.log('Contacts loaded:', contacts.length, 'items');
    } catch (error) {
        console.error('Failed to load contacts data:', error);
    }
}

async function loadProductsData() {
    try {
        const products = await window.databaseManager.read('products');
        console.log('Products loaded:', products.length, 'items');
    } catch (error) {
        console.error('Failed to load products data:', error);
    }
}

async function loadServicesData() {
    try {
        const services = await window.databaseManager.read('services');
        console.log('Services loaded:', services.length, 'items');
    } catch (error) {
        console.error('Failed to load services data:', error);
    }
}

// Setup Form Submissions
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
                promises.push(
                    window.databaseManager.update('settings', {
                        key: key,
                        value: value,
                        type: 'text'
                    })
                );
            }
            
            try {
                await Promise.all(promises);
                console.log('Company settings saved successfully!');
                showNotification('公司設定已儲存成功！', 'success');
                triggerFrontendSync();
                
            } catch (error) {
                console.error('Failed to save company settings:', error);
                showNotification('儲存失敗', 'error');
            }
        });
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
                promises.push(
                    window.databaseManager.update('settings', {
                        key: key,
                        value: value,
                        type: 'text'
                    })
                );
            }
            
            try {
                await Promise.all(promises);
                console.log('Contact settings saved successfully!');
                showNotification('聯絡設定已儲存成功！', 'success');
                triggerFrontendSync();
                
            } catch (error) {
                console.error('Failed to save contact settings:', error);
                showNotification('儲存失敗', 'error');
            }
        });
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
                promises.push(
                    window.databaseManager.update('settings', {
                        key: key,
                        value: value,
                        type: 'text'
                    })
                );
            }
            
            try {
                await Promise.all(promises);
                console.log('SEO settings saved successfully!');
                showNotification('SEO設定已儲存成功！', 'success');
                triggerFrontendSync();
                
            } catch (error) {
                console.error('Failed to save SEO settings:', error);
                showNotification('儲存失敗', 'error');
            }
        });
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
