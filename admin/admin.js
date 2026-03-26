// Admin Dashboard JavaScript

// Login System
document.addEventListener('DOMContentLoaded', function() {
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
            
            // Simple authentication (in production, use proper authentication)
            if (username === 'admin' && password === 'admin123') {
                localStorage.setItem('adminLoggedIn', 'true');
                localStorage.setItem('adminUser', username);
                showDashboard();
            } else {
                alert('用戶名或密碼錯誤！');
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
            }
        });
    });

    // Button Actions
    setupButtonActions();

    // Form Submissions
    setupFormSubmissions();

    // Initialize Charts (if needed)
    initializeCharts();

    // Auto-refresh data
    startAutoRefresh();
});

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

    // Edit and Delete buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-outline') && e.target.textContent === '編輯') {
            handleEdit(e.target);
        } else if (e.target.classList.contains('btn-danger') && e.target.textContent === '刪除') {
            handleDelete(e.target);
        } else if (e.target.classList.contains('btn-primary') && e.target.textContent === '查看') {
            handleView(e.target);
        } else if (e.target.classList.contains('btn-outline') && e.target.textContent === '回覆') {
            handleReply(e.target);
        }
    });
}

// Setup Form Submissions
function setupFormSubmissions() {
    const settingsForms = document.querySelectorAll('.settings-form');
    
    settingsForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            showNotification('設定已儲存成功！', 'success');
            
            // In production, this would save to database
            console.log('Settings saved:', new FormData(this));
        });
    });
}

// Show Add News Modal
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
    document.getElementById('addNewsForm').addEventListener('submit', function(e) {
        e.preventDefault();
        showNotification('最新消息已新增！', 'success');
        closeModal();
    });
}

// Show Add Product Modal
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
                <input type="file" name="image" class="form-control" accept="image/*">
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
    document.getElementById('addProductForm').addEventListener('submit', function(e) {
        e.preventDefault();
        showNotification('產品已新增！', 'success');
        closeModal();
    });
}

// Show Add Service Modal
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
    document.getElementById('addServiceForm').addEventListener('submit', function(e) {
        e.preventDefault();
        showNotification('服務已新增！', 'success');
        closeModal();
    });
}

// Create Modal
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
        `;
        document.head.appendChild(style);
    }

    return modal;
}

// Close Modal
function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
}

// Handle Edit Actions
function handleEdit(button) {
    const row = button.closest('tr') || button.closest('.product-card') || button.closest('.service-item');
    if (row) {
        showNotification('編輯功能開發中...', 'info');
    }
}

// Handle Delete Actions
function handleDelete(button) {
    if (confirm('確定要刪除這個項目嗎？')) {
        const row = button.closest('tr') || button.closest('.product-card') || button.closest('.service-item');
        if (row) {
            row.style.transition = 'opacity 0.3s ease';
            row.style.opacity = '0';
            setTimeout(() => {
                row.remove();
                showNotification('項目已刪除', 'success');
            }, 300);
        }
    }
}

// Handle View Actions
function handleView(button) {
    const row = button.closest('tr');
    if (row) {
        showNotification('查看詳細資訊功能開發中...', 'info');
    }
}

// Handle Reply Actions
function handleReply(button) {
    const row = button.closest('tr');
    if (row) {
        showNotification('回覆功能開發中...', 'info');
    }
}

// Show Notification
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

// Initialize Charts (placeholder for future chart implementation)
function initializeCharts() {
    // This would initialize charts using a library like Chart.js
    console.log('Charts initialized');
}

// Auto-refresh data
function startAutoRefresh() {
    // Refresh dashboard data every 30 seconds
    setInterval(() => {
        updateDashboardData();
    }, 30000);
}

// Update Dashboard Data
function updateDashboardData() {
    // This would fetch fresh data from the server
    console.log('Dashboard data updated');
}

// Export functions for global access
window.showAddNewsModal = showAddNewsModal;
window.showAddProductModal = showAddProductModal;
window.showAddServiceModal = showAddServiceModal;
window.closeModal = closeModal;
