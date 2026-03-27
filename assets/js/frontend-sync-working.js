// Frontend-Backend Synchronization System - WORKING VERSION
// Real-time data sync between admin dashboard and frontend

class FrontendSync {
    constructor() {
        this.syncInterval = 3000; // Sync every 3 seconds
        this.isSyncing = false;
        this.init();
    }

    init() {
        console.log('Initializing frontend sync system...');
        
        // Start periodic sync
        this.startPeriodicSync();
        
        // Listen for storage events
        this.setupStorageListener();
        
        // Listen for admin updates
        this.setupAdminListener();
        
        // Initial sync immediately
        setTimeout(() => {
            console.log('Performing immediate initial sync...');
            this.syncAllData();
        }, 1000);
        
        console.log('Frontend sync system initialized');
    }

    startPeriodicSync() {
        setInterval(() => {
            this.syncAllData();
        }, this.syncInterval);
    }

    setupStorageListener() {
        // Listen for localStorage changes
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
            
            // Try to get settings from admin window first
            let settings = null;
            
            // Check if admin window is available
            if (window.opener && window.opener.databaseManager) {
                console.log('Using admin database from opener window...');
                settings = await window.opener.databaseManager.read('settings');
            } else if (window.parent && window.parent.databaseManager) {
                console.log('Using admin database from parent window...');
                settings = await window.parent.databaseManager.read('settings');
            } else {
                // Try to create database manager
                console.log('Creating new database manager...');
                try {
                    // Load database script if not loaded
                    if (!window.DatabaseManager) {
                        await this.loadDatabaseScript();
                    }
                    
                    if (window.DatabaseManager) {
                        window.databaseManager = new DatabaseManager();
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        settings = await window.databaseManager.read('settings');
                    }
                } catch (error) {
                    console.error('Failed to create database manager:', error);
                }
            }
            
            if (!settings) {
                console.log('No settings available, using fallback data');
                settings = this.getFallbackSettings();
            }
            
            console.log('Settings loaded:', settings);
            
            // Update contact information - CRITICAL FIX
            this.updateContactInfo(settings);
            
        } catch (error) {
            console.error('Settings sync error:', error);
        }
    }

    async loadDatabaseScript() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'admin/database.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    getFallbackSettings() {
        return [
            { key: 'company_phone', value: '+886-2-1234-5678' },
            { key: 'company_email', value: 'info@bestasv.com' },
            { key: 'company_address', value: '台灣台北市信義區信義路五段7號' },
            { key: 'business_hours', value: '週一至週五 9:00-18:00' }
        ];
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

    handleAdminUpdate(data) {
        // Handle specific admin updates
        switch (data.type) {
            case 'settings':
                this.syncSettings();
                break;
            default:
                this.syncAllData();
        }
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
    
    console.log('Frontend sync system ready');
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FrontendSync;
}
