import crypto from 'crypto';
declare type Table<T,V> = { key: T; value: V };
declare type MyTable<T,V> = Table<T,V>[];

export default class MyMap<T extends (string | number), V> {

    private len: number;
    private cap: number;
    private tab: MyTable<T,V>;

    constructor() {
        this.cap = 5;
        this.len = 0;
        this.tab = [];
    }

    get(key: T): V | undefined {
        if (this.len === 0) {
            return undefined;
        }
        const actualKey = this.keyGen(key);
        for (let i = 0; i < this.len; i++) {
            if (this.tab[i].key == actualKey) {
                return this.tab[i].value;
            }
        }
        return undefined;  // key not found
    }

    set(key: T, value: V): void {
        const actualKey = this.keyGen(key);
        if (this.len > 0) {
            for (let i = 0; i < this.len; i++) {
                if (this.tab[i].key == actualKey) {
                    // update value when collision
                    this.tab[i].value = value;
                    return;
                }
            }
        }
        if (this.len < this.cap) {
            this.tab.push({
                key: actualKey as T,
                value: value,
            })
            this.len++;
        } else {
            console.log("no space for new entries");
        }
    }

    delete(key: T): V | undefined {
        if (this.len === 0) {
            return undefined;
        }
        let out = this.get(key);
        if (out) {
            const actualKey = this.keyGen(key);
            let idx = 0;
            for (let i = 0; i < this.len; i++) {
                // find index
                if (this.tab[i].key == actualKey) {
                    idx = i;
                    break;
                }
            }
            this.moveThings(idx);
            this.len--;
        }
        return out;

    }

    moveThings(idx: number): void {
        if (idx >= 0 && idx < this.len - 1) {
            // general case
            for (let i = idx + 1; i < this.len; i++) {
                let tmp = this.tab[i];
                this.tab[i-1] = tmp;
            }
            this.tab.pop();
        } else if ((idx === 0 && this.len === 1) ||  // last remaining element
                  idx === this.len - 1) {  // last element on list
            this.tab.pop();
        }
    }

    size(): number {
        return this.len;
    }

    keyGen(k: T): string {
        return crypto.createHash('sha256').update(k.toString()).digest('base64');
    }
}
