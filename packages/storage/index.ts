interface ProxyStorage {
    getItem: (key: string) => any;
    setItem: (Key: string, value: string) => void;
    removeItem: (key: string) => void;
    clear: () => void;
}

// sessionStorage operate
class SessionStorageProxy implements ProxyStorage {
    protected storage: ProxyStorage;

    constructor(storageModel: ProxyStorage) {
        this.storage = storageModel;
    }

    // 存
    public setItem(key: string, value: any): void {
        this.storage.setItem(key, JSON.stringify(value));
    }

    // 取
    public getItem(key: string): any {
        return JSON.parse(this.storage.getItem(key));
    }

    // 删
    public removeItem(key: string): void {
        this.storage.removeItem(key);
    }

    // 清空
    public clear(): void {
        this.storage.clear();
    }
}

// localStorage operate
class LocalStorageProxy extends SessionStorageProxy implements ProxyStorage {}

export const storageSession = new SessionStorageProxy(sessionStorage);

export const storageLocal = new LocalStorageProxy(localStorage);
