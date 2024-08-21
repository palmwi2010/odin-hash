import LinkedList from "./list.mjs";

class HashMap {

    constructor() {
        this.capacity = 16;
        this.loadFactor = 0.75;
        this.numItems = 0;
        this.storage = new Array(this.capacity);
    }

    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
     
        return hashCode % this.capacity;
    }

    getIndex(key) {
        const index = this.hash(key);

        if (index < 0 || index >= this.capacity) {
            throw new Error("Trying to access index out of bound");
        }
        return index;
    }

    resetCapacity() {
        const items = this.entries();
        this.capacity = this.capacity * 2;
        this.clear();
        items.forEach(item => this.set(item[0], item[1])); 
    }

    set(key, value) {
        const index = this.getIndex(key);
        if (!this.storage[index]) {
            this.storage[index] = new LinkedList();
        }
        if (this.storage[index].contains(key)) {
            this.storage[index].update(key, value);
        } else {
            this.storage[index].append(key, value);
            this.numItems++;
            if (this.numItems > this.loadFactor * this.capacity) this.resetCapacity();
        }
    }

    get(key) {
        const index = this.getIndex(key);
        if (!this.storage[index]) return null;
        return this.storage[index].get(key);
    }

    has(key) {
        const index = this.getIndex(key);
        if (!this.storage[index]) return false;
        return this.storage[index].contains(key);
    }

    remove(key) {
        const index = this.getIndex(key);
        if (!this.storage[index]) return false;
        if (this.storage[index].remove(key)) {
            this.numItems--;
            return true;
        }
        return false
    }

    length() {
        return this.numItems;
    }

    clear() {
        for (let i = 0; i < this.capacity; i++) {
            this.storage[i] = null;
        }
        this.numItems = 0;
    }

    keys() {
        let keys = [];
        for (let i = 0; i < this.capacity; i++) {
            if (this.storage[i]) {
                keys = keys.concat(this.storage[i].keys());
            }
        }
        return keys
    }

    values() {
        let values = [];
        for (let i = 0; i < this.capacity; i++) {
            if (this.storage[i]) {
                values = values.concat(this.storage[i].values());
            }
        }
        return values
    }

    entries() {
        let entries = [];
        for (let i = 0; i < this.capacity; i++) {
            if (this.storage[i]) {
                entries = entries.concat(this.storage[i].items());
            }
        }
        return entries;
    }
}

export default HashMap;