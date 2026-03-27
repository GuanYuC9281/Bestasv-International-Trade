// Enhanced Admin Dashboard with Real Database Integration - FIXED VERSION
// Bestasv International Trade Admin System - Complete Sync Implementation

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
        logoutBtn.addEventListener('click', function() {
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
        }
    } catch (error) {
        console.error(`Failed to load ${page} data:`, error);
    }
}

// Load news data
async function loadNewsData() {
    const news = await window.databaseManager.read('news');
    displayNewsTable(news);
}

function displayNewsTable(news) {
    const tbody = document.querySelector('#news-page tbody');
    if (!tbody) return;

    tbody.innerHTML = '';
    
    news.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.title}</td>
            <td><span class="category-badge ${item.category}">${getCategoryName(item.category)}</span></td>
            <td>${formatDate(item.date)}</td>
            <td><span class="status-badge ${item.status}">${getStatusName(item.status)}</span></td>
            <td>
                <button class="btn btn-sm btn-outline" onclick="editNews(${item.id})">編輯</button>
                <button class="btn btn-sm btn-danger" onclick="deleteNews(${item.id})">刪除</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Load contacts data
async function loadContactsData() {
    const contacts = await window.databaseManager.read('contacts');
    displayContactsTable(contacts);
}

function displayContactsTable(contacts) {
    const tbody = document.querySelector('#contacts-page tbody');
    if (!tbody) return;

    tbody.innerHTML = '';
    
    contacts.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.company}</td>
            <td>${item.email}</td>
            <td>${item.phone}</td>
            <td>${item.service}</td>
            <td>${formatDate(item.date)}</td>
            <td><span class="status-badge ${item.status}">${getStatusName(item.status)}</span></td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="viewContact(${item.id})">查看</button>
                <button class="btn btn-sm btn-outline" onclick="replyContact(${item.id})">回覆</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Load products data
async function loadProductsData() {
    const products = await window.databaseManager.read('products');
    displayProductsGrid(products);
}

function displayProductsGrid(products) {
    const grid = document.querySelector('.products-grid');
    if (!grid) return;

    grid.innerHTML = '';
    
    products.forEach(item => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">
                <img src="${item.image || '../assets/images/default-product.jpg'}" alt="${item.name}">
            </div>
            <div class="product-info">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="product-actions">
                    <button class="btn btn-sm btn-outline" onclick="editProduct(${item.id})">編輯</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteProduct(${item.id})">刪除</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Load services data
async function loadServicesData() {
    const services = await window.databaseManager.read('services');
    displayServicesList(services);
}

function displayServicesList(services) {
    const list = document.querySelector('.services-list');
    if (!list) return;

    list.innerHTML = '';
    
    services.forEach(item => {
        const serviceItem = document.createElement('div');
        serviceItem.className = 'service-item';
        serviceItem.innerHTML = `
            <div class="service-content">
                <h3>${item.icon} ${item.name}</h3>
                <p>${item.description}</p>
            </div>
            <div class="service-actions">
                <button class="btn btn-sm btn-outline" onclick="editService(${item.id})">編輯</button>
                <button class="btn btn-sm btn-danger" onclick="deleteService(${item.id})">刪除</button>
            </div>
        `;
        list.appendChild(serviceItem);
    });
}

// Load settings data - FIXED VERSION
async function loadSettingsData() {
    try {
        const settings = await window.databaseManager.read('settings');
        
        // Load company settings
        const companyForm = document.getElementById('company-settings-form');
        if (companyForm) {
            settings.forEach(setting => {
                const input = companyForm.querySelector(`[name="${setting.key}"]`);
                if (input) {
                    input.value = setting.value || '';
                }
            });
        }

        // Load contact settings
        const contactForm = document.getElementById('contact-settings-form');
        if (contactForm) {
            settings.forEach(setting => {
                const input = contactForm.querySelector(`[name="${setting.key}"]`);
                if (input) {
                    input.value = setting.value || '';
                }
            });
        }

        // Load SEO settings
        const seoForm = document.getElementById('seo-settings-form');
        if (seoForm) {
            settings.forEach(setting => {
                const input = seoForm.querySelector(`[name="${setting.key}"]`);
                if (input) {
                    input.value = setting.value || '';
                }
            });
        }

    } catch (error) {
        console.error('Failed to load settings data:', error);
    }
}

// Helper functions
function getCategoryName(category) {
    const names = {
        'company': '公司消息',
        'industry': '產業資訊',
        'market': '市場趨勢',
        'case': '案例分享'
    };
    return names[category] || category;
}

function getStatusName(status) {
    const names = {
        'published': '已發布',
        'draft': '草稿',
        'new': '新',
        'processing': '處理中'
    };
    return names[status] || status;
}

// CRUD Operations
window.editNews = async function(id) {
    const news = await window.databaseManager.read('news', id);
    showEditNewsModal(news);
};

window.deleteNews = async function(id) {
    if (confirm('確定要刪除這個消息嗎？')) {
        try {
            await window.databaseManager.delete('news', id);
            showNotification('消息已刪除', 'success');
            loadNewsData();
            triggerFrontendSync();
        } catch (error) {
            showNotification('刪除失敗', 'error');
        }
    }
};

window.editProduct = async function(id) {
    const product = await window.databaseManager.read('products', id);
    showEditProductModal(product);
};

window.deleteProduct = async function(id) {
    if (confirm('確定要刪除這個產品嗎？')) {
        try {
            await window.databaseManager.delete('products', id);
            showNotification('產品已刪除', 'success');
            loadProductsData();
            triggerFrontendSync();
        } catch (error) {
            showNotification('刪除失敗', 'error');
        }
    }
};

window.editService = async function(id) {
    const service = await window.databaseManager.read('services', id);
    showEditServiceModal(service);
};

window.deleteService = async function(id) {
    if (confirm('確定要刪除這個服務嗎？')) {
        try {
            await window.databaseManager.delete('services', id);
            showNotification('服務已刪除', 'success');
            loadServicesData();
            triggerFrontendSync();
        } catch (error) {
            showNotification('刪除失敗', 'error');
        }
    }
};

window.viewContact = async function(id) {
    const contact = await window.databaseManager.read('contacts', id);
    showViewContactModal(contact);
};

window.replyContact = async function(id) {
    const contact = await window.databaseManager.read('contacts', id);
    showReplyContactModal(contact);
};

// Modal functions
function showEditNewsModal(news) {
    const modal = createModal('編輯最新消息', `
        <form id="editNewsForm">
            <input type="hidden" name="id" value="${news.id}">
            <div class="form-group">
                <label>標題 *</label>
                <input type="text" name="title" class="form-control" value="${news.title}" required>
            </div>
            <div class="form-group">
                <label>分類 *</label>
                <select name="category" class="form-control" required>
                    <option value="company" ${news.category === 'company' ? 'selected' : ''}>公司消息</option>
                    <option value="industry" ${news.category === 'industry' ? 'selected' : ''}>產業資訊</option>
                    <option value="market" ${news.category === 'market' ? 'selected' : ''}>市場趨勢</option>
                    <option value="case" ${news.category === 'case' ? 'selected' : ''}>案例分享</option>
                </select>
            </div>
            <div class="form-group">
                <label>內容 *</label>
                <textarea name="content" class="form-control" rows="6" required>${news.content}</textarea>
            </div>
            <div class="form-group">
                <label>狀態</label>
                <select name="status" class="form-control">
                    <option value="draft" ${news.status === 'draft' ? 'selected' : ''}>草稿</option>
                    <option value="published" ${news.status === 'published' ? 'selected' : ''}>已發布</option>
                </select>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">更新</button>
                <button type="button" class="btn btn-outline" onclick="closeModal()">取消</button>
            </div>
        </form>
    `);

    document.body.appendChild(modal);

    // Handle form submission
    document.getElementById('editNewsForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        try {
            await window.databaseManager.update('news', data);
            showNotification('消息已更新！', 'success');
            closeModal();
            loadNewsData();
            triggerFrontendSync();
        } catch (error) {
            showNotification('更新失敗', 'error');
        }
    });
}

function showEditProductModal(product) {
    const modal = createModal('編輯產品', `
        <form id="editProductForm">
            <input type="hidden" name="id" value="${product.id}">
            <div class="form-group">
                <label>產品名稱 *</label>
                <input type="text" name="name" class="form-control" value="${product.name}" required>
            </div>
            <div class="form-group">
                <label>產品描述 *</label>
                <textarea name="description" class="form-control" rows="4" required>${product.description}</textarea>
            </div>
            <div class="form-group">
                <label>產品圖片</label>
                <input type="text" name="image" class="form-control" value="${product.image || ''}" placeholder="圖片路徑">
            </div>
            <div class="form-group">
                <label>分類 *</label>
                <select name="category" class="form-control" required>
                    <option value="industrial" ${product.category === 'industrial' ? 'selected' : ''}>工業五金</option>
                    <option value="machinery" ${product.category === 'machinery' ? 'selected' : ''}>機械零件</option>
                    <option value="construction" ${product.category === 'construction' ? 'selected' : ''}>建材工程</option>
                    <option value="custom" ${product.category === 'custom' ? 'selected' : ''}>客製採購品</option>
                </select>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">更新</button>
                <button type="button" class="btn btn-outline" onclick="closeModal()">取消</button>
            </div>
        </form>
    `);

    document.body.appendChild(modal);

    // Handle form submission
    document.getElementById('editProductForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        try {
            await window.databaseManager.update('products', data);
            showNotification('產品已更新！', 'success');
            closeModal();
            loadProductsData();
            triggerFrontendSync();
        } catch (error) {
            showNotification('更新失敗', 'error');
        }
    });
}

function showEditServiceModal(service) {
    const modal = createModal('編輯服務', `
        <form id="editServiceForm">
            <input type="hidden" name="id" value="${service.id}">
            <div class="form-group">
                <label>服務名稱 *</label>
                <input type="text" name="name" class="form-control" value="${service.name}" required>
            </div>
            <div class="form-group">
                <label>服務描述 *</label>
                <textarea name="description" class="form-control" rows="4" required>${service.description}</textarea>
            </div>
            <div class="form-group">
                <label>服務圖標</label>
                <input type="text" name="icon" class="form-control" value="${service.icon || ''}" placeholder="例如: 🛠️">
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">更新</button>
                <button type="button" class="btn btn-outline" onclick="closeModal()">取消</button>
            </div>
        </form>
    `);

    document.body.appendChild(modal);

    // Handle form submission
    document.getElementById('editServiceForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        try {
            await window.databaseManager.update('services', data);
            showNotification('服務已更新！', 'success');
            closeModal();
            loadServicesData();
            triggerFrontendSync();
        } catch (error) {
            showNotification('更新失敗', 'error');
        }
    });
}

function showViewContactModal(contact) {
    const modal = createModal('聯絡詳情', `
        <div class="contact-detail">
            <div class="detail-row">
                <label>姓名:</label>
                <span>${contact.name}</span>
            </div>
            <div class="detail-row">
                <label>公司:</label>
                <span>${contact.company}</span>
            </div>
            <div class="detail-row">
                <label>郵件:</label>
                <span>${contact.email}</span>
            </div>
            <div class="detail-row">
                <label>電話:</label>
                <span>${contact.phone}</span>
            </div>
            <div class="detail-row">
                <label>服務:</label>
                <span>${contact.service}</span>
            </div>
            <div class="detail-row">
                <label>訊息:</label>
                <span>${contact.message}</span>
            </div>
            <div class="detail-row">
                <label>時間:</label>
                <span>${new Date(contact.date).toLocaleString()}</span>
            </div>
            <div class="detail-row">
                <label>狀態:</label>
                <span class="status-badge ${contact.status}">${getStatusName(contact.status)}</span>
            </div>
        </div>
        <div class="form-actions">
            <button type="button" class="btn btn-outline" onclick="closeModal()">關閉</button>
        </div>
    `);

    document.body.appendChild(modal);
}

function showReplyContactModal(contact) {
    const modal = createModal('回覆聯絡', `
        <form id="replyContactForm">
            <input type="hidden" name="contactId" value="${contact.id}">
            <div class="form-group">
                <label>收件人</label>
                <input type="email" class="form-control" value="${contact.email}" readonly>
            </div>
            <div class="form-group">
                <label>主旨</label>
                <input type="text" class="form-control" value="回覆: ${contact.service} 詢問" readonly>
            </div>
            <div class="form-group">
                <label>回覆內容 *</label>
                <textarea name="reply" class="form-control" rows="6" required placeholder="請輸入回覆內容..."></textarea>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">發送回覆</button>
                <button type="button" class="btn btn-outline" onclick="closeModal()">取消</button>
            </div>
        </form>
    `);

    document.body.appendChild(modal);

    // Handle form submission
    document.getElementById('replyContactForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const reply = formData.get('reply');
        
        try {
            // Update contact status to processing
            await window.databaseManager.update('contacts', {
                id: contact.id,
                status: 'processing'
            });
            
            showNotification('回覆已發送！', 'success');
            closeModal();
            loadContactsData();
            triggerFrontendSync();
        } catch (error) {
            showNotification('發送失敗', 'error');
        }
    });
}

// Setup Button Actions
function setupButtonActions() {
    // Add News Button
    const addNewsBtn = document.getElementById('add-news-btn');
    if (addNewsBtn) {
        addNewsBtn.addEventListener('click', function() {
            showAddNewsModal();
        });
    }

    // Add Product Button
    const addProductBtn = document.getElementById('add-product-btn');
    if (addProductBtn) {
        addProductBtn.addEventListener('click', function() {
            showAddProductModal();
        });
    }

    // Add Service Button
    const addServiceBtn = document.getElementById('add-service-btn');
    if (addServiceBtn) {
        addServiceBtn.addEventListener('click', function() {
            showAddServiceModal();
        });
    }
}

// Show Add Modals
function showAddNewsModal() {
    const modal = createModal('新增最新消息', `
        <form id="addNewsForm">
            <div class="form-group">
                <label>標題 *</label>
                <input type="text" name="title" class="form-control" required>
            </div>
            <div class="form-group">
                <label>分類 *</label>
                <select name="category" class="form-control" required>
                    <option value="">請選擇分類</option>
                    <option value="company">公司消息</option>
                    <option value="industry">產業資訊</option>
                    <option value="market">市場趨勢</option>
                    <option value="case">案例分享</option>
                </select>
            </div>
            <div class="form-group">
                <label>內容 *</label>
                <textarea name="content" class="form-control" rows="6" required></textarea>
            </div>
            <div class="form-group">
                <label>狀態</label>
                <select name="status" class="form-control">
                    <option value="draft">草稿</option>
                    <option value="published">已發布</option>
                </select>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">儲存</button>
                <button type="button" class="btn btn-outline" onclick="closeModal()">取消</button>
            </div>
        </form>
    `);

    document.body.appendChild(modal);

    // Handle form submission
    document.getElementById('addNewsForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        data.date = new Date().toISOString();
        data.author = 'Admin';
        
        try {
            await window.databaseManager.create('news', data);
            showNotification('最新消息已新增！', 'success');
            closeModal();
            loadNewsData();
            triggerFrontendSync();
        } catch (error) {
            showNotification('新增失敗', 'error');
        }
    });
}

function showAddProductModal() {
    const modal = createModal('新增產品', `
        <form id="addProductForm">
            <div class="form-group">
                <label>產品名稱 *</label>
                <input type="text" name="name" class="form-control" required>
            </div>
            <div class="form-group">
                <label>產品描述 *</label>
                <textarea name="description" class="form-control" rows="4" required></textarea>
            </div>
            <div class="form-group">
                <label>產品圖片</label>
                <input type="text" name="image" class="form-control" placeholder="圖片路徑">
            </div>
            <div class="form-group">
                <label>分類 *</label>
                <select name="category" class="form-control" required>
                    <option value="">請選擇分類</option>
                    <option value="industrial">工業五金</option>
                    <option value="machinery">機械零件</option>
                    <option value="construction">建材工程</option>
                    <option value="custom">客製採購品</option>
                </select>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">儲存</button>
                <button type="button" class="btn btn-outline" onclick="closeModal()">取消</button>
            </div>
        </form>
    `);

    document.body.appendChild(modal);

    // Handle form submission
    document.getElementById('addProductForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        data.status = 'active';
        
        try {
            await window.databaseManager.create('products', data);
            showNotification('產品已新增！', 'success');
            closeModal();
            loadProductsData();
            triggerFrontendSync();
        } catch (error) {
            showNotification('新增失敗', 'error');
        }
    });
}

function showAddServiceModal() {
    const modal = createModal('新增服務', `
        <form id="addServiceForm">
            <div class="form-group">
                <label>服務名稱 *</label>
                <input type="text" name="name" class="form-control" required>
            </div>
            <div class="form-group">
                <label>服務描述 *</label>
                <textarea name="description" class="form-control" rows="4" required></textarea>
            </div>
            <div class="form-group">
                <label>服務圖標</label>
                <input type="text" name="icon" class="form-control" placeholder="例如: 🛠️">
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">儲存</button>
                <button type="button" class="btn btn-outline" onclick="closeModal()">取消</button>
            </div>
        </form>
    `);

    document.body.appendChild(modal);

    // Handle form submission
    document.getElementById('addServiceForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        try {
            await window.databaseManager.create('services', data);
            showNotification('服務已新增！', 'success');
            closeModal();
            loadServicesData();
            triggerFrontendSync();
        } catch (error) {
            showNotification('新增失敗', 'error');
        }
    });
}

// Setup Form Submissions - FIXED VERSION
function setupFormSubmissions() {
    // Company Settings Form
    const companyForm = document.getElementById('company-settings-form');
    if (companyForm) {
        companyForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const promises = [];
            
            for (const [key, value] of formData.entries()) {
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
                showNotification('公司設定已儲存成功！', 'success');
                triggerFrontendSync();
            } catch (error) {
                showNotification('儲存失敗', 'error');
            }
        });
    }

    // Contact Settings Form
    const contactForm = document.getElementById('contact-settings-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const promises = [];
            
            for (const [key, value] of formData.entries()) {
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
                showNotification('聯絡設定已儲存成功！', 'success');
                triggerFrontendSync();
            } catch (error) {
                showNotification('儲存失敗', 'error');
            }
        });
    }

    // SEO Settings Form
    const seoForm = document.getElementById('seo-settings-form');
    if (seoForm) {
        seoForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const promises = [];
            
            for (const [key, value] of formData.entries()) {
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
                showNotification('SEO設定已儲存成功！', 'success');
                triggerFrontendSync();
            } catch (error) {
                showNotification('儲存失敗', 'error');
            }
        });
    }
}

// Modal utilities
function createModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-container">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close" onclick="closeModal()">×</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;

    // Add modal styles if not already added
    if (!document.querySelector('#modal-styles')) {
        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
            }
            .modal-container {
                background: white;
                border-radius: 8px;
                width: 90%;
                max-width: 600px;
                max-height: 90vh;
                overflow-y: auto;
            }
            .modal-header {
                padding: 20px;
                border-bottom: 1px solid #eee;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .modal-header h3 {
                margin: 0;
                color: #1e3c72;
            }
            .modal-close {
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #999;
            }
            .modal-body {
                padding: 20px;
            }
            .form-group {
                margin-bottom: 20px;
            }
            .form-group label {
                display: block;
                margin-bottom: 5px;
                font-weight: 600;
                color: #333;
            }
            .form-group .form-control {
                width: 100%;
                padding: 10px;
                border: 2px solid #e1e5e9;
                border-radius: 6px;
                font-size: 14px;
            }
            .form-actions {
                display: flex;
                gap: 10px;
                justify-content: flex-end;
                margin-top: 20px;
            }
            .contact-detail {
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
            .detail-row {
                display: flex;
                gap: 10px;
            }
            .detail-row label {
                font-weight: 600;
                color: #333;
                min-width: 80px;
            }
            .detail-row span {
                color: #666;
            }
        `;
        document.head.appendChild(style);
    }

    return modal;
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
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
window.closeModal = closeModal;
window.showNotification = showNotification;
window.triggerFrontendSync = function() {
    // Trigger frontend sync
    if (window.frontendSync) {
        window.frontendSync.triggerSync();
    }
    
    // Dispatch custom event for cross-tab communication
    window.dispatchEvent(new CustomEvent('adminDataUpdated', {
        detail: { type: 'all', timestamp: Date.now() }
    }));
};
