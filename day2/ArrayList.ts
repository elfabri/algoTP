export default class ArrayList<T> {
    public length: number;

    private arr;

    constructor(len: number) {
        this.arr = new Array(len);
        this.length = 0;
    }

    prepend(item: T): void {
    // insert at 0

        if (this.length == 0) {
            this.arr[0] = item;

        } else {
            for (let i = this.arr.length; i >= 0; i--) {
                if (i == 0) {
                    let tmp = this.arr[i];
                    this.arr[i] = item;
                    this.arr[i+1] = tmp;

                } else {
                    this.arr[i+1] = this.arr[i];
                }
            }
        }

        this.length++;
    }

    insertAt(item: T, idx: number): void {

        if (this.length == 0) {
            this.arr[idx] = item;

        } else {
            for (let i = this.arr.length; i >= 0; i--) {
                if (idx == i) {
                    let tmp = this.arr[i];
                    this.arr[i] = item;
                    this.arr[i+1] = tmp;

                } else {
                    this.arr[i+1] = this.arr[i];
                }
            }
        }

        this.length++;
    }

    append(item: T): void {
        if (this.length > this.arr.length) {
            // error case to be handled
        }

        this.arr[this.length] = item;
        this.length++;
    }

    remove(item: T): T | undefined {
        if (this.arr.includes(item)) {
            this.length--;
            
            let idx = this.arr.indexOf(item);
            if (idx == this.length) {
                return this.arr.pop();
            }

            let out = this.arr[idx];

            for (let i = idx; i < this.arr.length - 1; i++) {
                this.arr[idx] = this.arr[idx + 1];
            }

            return out;
        }

        return undefined;

    }

    get(idx: number): T | undefined {
        return this.arr[idx];
    }

    removeAt(idx: number): T | undefined {
        if (this.arr[idx]) {
            this.length--;
            
            if (idx == this.length) {
                return this.arr.pop();
            }

            let out = this.arr[idx];

            for (let i = idx; i < this.arr.length - 1; i++) {
                this.arr[idx] = this.arr[idx + 1];
            }

            return out;
        }

        return undefined;

    }
}
