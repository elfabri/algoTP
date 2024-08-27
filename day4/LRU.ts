type Node<String, V> = {
    key: String,
    value: V,
}

export default class LRU<String, V> {
    private length: number;
    private arr: Node<String, V>[];

    constructor(private capacity: number = 10) {
        this.length = 0;
        this.arr = [];
    }

    update(key: String, value: V): void {
        if (this.get(key) !== undefined) {
            this.arr[0].value = value;
        } else if (this.length === this.capacity) {
            this.arr.unshift({key: key, value: value});
            this.arr.pop();
        } else {
            this.arr.unshift({key: key, value: value});
            this.length++;
        }
    }

    get(key: String): V | undefined {
        if (this.length === 0) {
            return undefined;
        }
        for (let i = 0; i < this.length; i++) {
            if (this.arr[i].key === key) {
                // reposition
                this.reposition(i);
                return this.arr[0].value;
            }
        }
        return undefined;
    }

    private reposition(idx: number): void {
        // set element at "idx" to 0 and move the rest
        if (idx === 0) {
            return;
        }

        for (let i = idx; i > 0; i--) {
            let tmp = this.arr[i];
            this.arr[i] = this.arr[i-1];
            this.arr[i-1] = tmp;
        }
    }
}
