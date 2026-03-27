// Database Management System for Bestasv Admin Dashboard
// Real data persistence and management

class DatabaseManager {
    constructor() {
        this.dbName = 'bestasv_admin_db';
        this.version = 1;
        this.db = null;
        this.init();
    }

    async init() {
        try {
            // Use IndexedDB for client-side storage
            this.db = await this.openDatabase();
            console.log('Database initialized successfully');
        } catch (error) {
            console.error('Database initialization failed:', error);
            // Fallback to localStorage
            this.useLocalStorageFallback();
        }
    }

    openDatabase() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;

                // Create object stores
                if (!db.objectStoreNames.contains('news')) {
                    const newsStore = db.createObjectStore('news', { keyPath: 'id', autoIncrement: true });
                    newsStore.createIndex('category', 'category', { unique: false });
                    newsStore.createIndex('status', 'status', { unique: false });
                    newsStore.createIndex('date', 'date', { unique: false });
                }

                if (!db.objectStoreNames.contains('contacts')) {
                    const contactsStore = db.createObjectStore('contacts', { keyPath: 'id', autoIncrement: true });
                    contactsStore.createIndex('status', 'status', { unique: false });
                    contactsStore.createIndex('date', 'date', { unique: false });
                }

                if (!db.objectStoreNames.contains('products')) {
                    const productsStore = db.createObjectStore('products', { keyPath: 'id', autoIncrement: true });
                    productsStore.createIndex('category', 'category', { unique: false });
                }

                if (!db.objectStoreNames.contains('services')) {
                    const servicesStore = db.createObjectStore('services', { keyPath: 'id', autoIncrement: true });
                }

                if (!db.objectStoreNames.contains('settings')) {
                    const settingsStore = db.createObjectStore('settings', { keyPath: 'key' });
                }

                console.log('Database schema created');
            };
        });
    }

    useLocalStorageFallback() {
        console.log('Using localStorage fallback');
        this.storage = localStorage;
        this.isLocalStorage = true;
    }

    // Generic CRUD operations
    async create(storeName, data) {
        if (this.isLocalStorage) {
            return this.createLocalStorage(storeName, data);
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.add(data);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async read(storeName, id = null) {
        if (this.isLocalStorage) {
            return this.readLocalStorage(storeName, id);
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);

            if (id) {
                const request = store.get(id);
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            } else {
                const request = store.getAll();
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            }
        });
    }

    async update(storeName, data) {
        if (this.isLocalStorage) {
            return this.updateLocalStorage(storeName, data);
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.put(data);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async delete(storeName, id) {
        if (this.isLocalStorage) {
            return this.deleteLocalStorage(storeName, id);
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.delete(id);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    // Query operations
    async query(storeName, indexName, value) {
        if (this.isLocalStorage) {
            return this.queryLocalStorage(storeName, indexName, value);
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const index = store.index(indexName);
            const request = index.getAll(value);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    // LocalStorage fallback methods
    createLocalStorage(storeName, data) {
        const key = `bestasv_${storeName}`;
        let items = JSON.parse(this.storage.getItem(key) || '[]');
        data.id = Date.now(); // Simple ID generation
        items.push(data);
        this.storage.setItem(key, JSON.stringify(items));
        return Promise.resolve(data.id);
    }

    readLocalStorage(storeName, id = null) {
        const key = `bestasv_${storeName}`;
        let items = JSON.parse(this.storage.getItem(key) || '[]');
        
        if (id) {
            return Promise.resolve(items.find(item => item.id == id) || null);
        }
        
        return Promise.resolve(items);
    }

    updateLocalStorage(storeName, data) {
        const key = `bestasv_${storeName}`;
        let items = JSON.parse(this.storage.getItem(key) || '[]');
        const index = items.findIndex(item => item.id == data.id);
        
        if (index !== -1) {
            items[index] = data;
            this.storage.setItem(key, JSON.stringify(items));
            return Promise.resolve(data.id);
        }
        
        return Promise.reject(new Error('Item not found'));
    }

    deleteLocalStorage(storeName, id) {
        const key = `bestasv_${storeName}`;
        let items = JSON.parse(this.storage.getItem(key) || '[]');
        items = items.filter(item => item.id != id);
        this.storage.setItem(key, JSON.stringify(items));
        return Promise.resolve(id);
    }

    queryLocalStorage(storeName, indexName, value) {
        const key = `bestasv_${storeName}`;
        let items = JSON.parse(this.storage.getItem(key) || '[]');
        let results = items.filter(item => item[indexName] === value);
        return Promise.resolve(results);
    }

    // Initialize sample data
    async initializeSampleData() {
        try {
            // Check if data already exists
            const existingNews = await this.read('news');
            if (existingNews.length === 0) {
                await this.createSampleNews();
            }

            const existingContacts = await this.read('contacts');
            if (existingContacts.length === 0) {
                await this.createSampleContacts();
            }

            const existingProducts = await this.read('products');
            if (existingProducts.length === 0) {
                await this.createSampleProducts();
            }

            const existingServices = await this.read('services');
            if (existingServices.length === 0) {
                await this.createSampleServices();
            }

            const existingSettings = await this.read('settings');
            if (existingSettings.length === 0) {
                await this.createSampleSettings();
            }

            console.log('Sample data initialized');
        } catch (error) {
            console.error('Failed to initialize sample data:', error);
        }
    }

    async createSampleNews() {
        const sampleNews = [
            {
                title: '貝達國際貿易正式成立',
                category: 'company',
                content: '我們很高興宣布貝達國際貿易有限公司正式成立，致力於提供專業的進出口服務...',
                status: 'published',
                date: new Date('2024-03-15').toISOString(),
                author: 'Admin'
            },
            {
                title: '2024年全球貿易趨勢分析',
                category: 'industry',
                content: '探討當前全球貿易環境的變化與未來發展機遇...',
                status: 'published',
                date: new Date('2024-03-10').toISOString(),
                author: 'Admin'
            },
            {
                title: '亞洲供應鏈轉型新機遇',
                category: 'market',
                content: '分析亞洲地區供應鏈重組帶來的商機與挑戰...',
                status: 'draft',
                date: new Date('2024-03-05').toISOString(),
                author: 'Admin'
            }
        ];

        for (const news of sampleNews) {
            await this.create('news', news);
        }
    }

    async createSampleContacts() {
        const sampleContacts = [
            {
                name: '張先生',
                company: '精密工業有限公司',
                email: 'zhang@precision.com',
                phone: '0912-345-678',
                service: '採購代理',
                message: '需要尋找高精度零件供應商',
                status: 'new',
                date: new Date('2024-03-20T14:30:00').toISOString()
            },
            {
                name: '李經理',
                company: '國際貿易公司',
                email: 'li@tradeco.com',
                phone: '0987-654-321',
                service: '供應商媒合',
                message: '尋找可靠的長期合作夥伴',
                status: 'processing',
                date: new Date('2024-03-20T10:15:00').toISOString()
            }
        ];

        for (const contact of sampleContacts) {
            await this.create('contacts', contact);
        }
    }

    async createSampleProducts() {
        const sampleProducts = [
            {
                name: '工業五金',
                description: '各類工業用五金零件、工具及配件',
                category: 'industrial',
                image: 'assets/images/industrial-parts.jpg',
                status: 'active'
            },
            {
                name: '機械零件',
                description: '精密機械零件、軸承、齒輪等',
                category: 'machinery',
                image: 'assets/images/machinery-parts.jpg',
                status: 'active'
            }
        ];

        for (const product of sampleProducts) {
            await this.create('products', product);
        }
    }

    async createSampleServices() {
        const sampleServices = [
            {
                name: '採購代理',
                description: '專業採購團隊為您尋找最優質的供應商和產品',
                icon: '🛠️'
            },
            {
                name: '進出口服務',
                description: '完整的進出口流程管理，確保貨物順利通關',
                icon: '📦'
            },
            {
                name: '供應商媒合',
                description: '精準匹配供應商需求，建立長期合作關係',
                icon: '🤝'
            },
            {
                name: '物流協調',
                description: '從報價到出貨的全程物流追蹤與協調',
                icon: '🚚'
            }
        ];

        for (const service of sampleServices) {
            await this.create('services', service);
        }
    }

    async createSampleSettings() {
        const sampleSettings = [
            {
                key: 'company_name',
                value: '貝達國際貿易有限公司',
                type: 'text'
            },
            {
                key: 'company_address',
                value: '台灣台北市信義區信義路五段7號',
                type: 'text'
            },
            {
                key: 'company_phone',
                value: '+886-2-1234-5678',
                type: 'text'
            },
            {
                key: 'company_email',
                value: 'info@bestasv.com',
                type: 'email'
            },
            {
                key: 'business_hours',
                value: '週一至週五 9:00-18:00',
                type: 'text'
            }
        ];

        for (const setting of sampleSettings) {
            await this.create('settings', setting);
        }
    }
}

// Initialize database
window.databaseManager = new DatabaseManager();

// Initialize sample data after database is ready
document.addEventListener('DOMContentLoaded', async () => {
    // Wait a bit for database to initialize
    setTimeout(async () => {
        await window.databaseManager.initializeSampleData();
    }, 1000);
});
