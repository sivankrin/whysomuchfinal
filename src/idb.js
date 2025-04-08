export default class IndexedDBWrapper {
    constructor(dbName, version) {
        this.dbName = dbName;
        this.version = version;
        this.db = null;
    }

    // אתחול והגדרת מסד הנתונים
    init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);

            request.onerror = (e) => reject('Database error: ' + e.target.error);
            request.onsuccess = (e) => {
                this.db = e.target.result;
                resolve();
            };

            request.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains('costs')) {
                    db.createObjectStore('costs', { keyPath: 'id', autoIncrement: true });
                }
            };
        });
    }

    // הוספת פריט למסד הנתונים
    addItem(storeName, item) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject('Database not initialized');
                return;
            }

            const transaction = this.db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.add(item);

            request.onsuccess = () => resolve();
            request.onerror = (e) => reject('Add item error: ' + e.target.error);
        });
    }

    // קבלת כל הפריטים
    getAllItems(storeName) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject('Database not initialized');
                return;
            }

            const transaction = this.db.transaction(storeName, 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.getAll();

            request.onsuccess = (e) => resolve(e.target.result);
            request.onerror = (e) => reject('Get all items error: ' + e.target.error);
        });
    }
    async getCostsByMonthAndYear(month, year) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(["costs"], "readonly");
            const store = transaction.objectStore("costs");
            const request = store.getAll();

            request.onsuccess = (event) => {
                const allCosts = event.target.result;
                const filteredCosts = allCosts.filter(cost => {
                    const costDate = new Date(cost.date);
                    return costDate.getMonth() + 1 === month && costDate.getFullYear() === year;
                });
                resolve(filteredCosts);
            };

            request.onerror = (event) => reject(event.target.error);
        });
    }

}
