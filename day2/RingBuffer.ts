export default class RingBuffer<T> {
    public length: number;
    private arr;
    private idx: number;
    private tail: number;  // index of oldest element

    constructor() {
        this.arr = new Array(10);
        this.idx = 0;
        this.length = this.arr.length;
        this.tail = 0;
    }

    push(item: T): void {

        // check overriding elements
        if (this.arr[this.idx]) {
            this.tail == this.length - 1 ? this.tail = 0 : this.tail++;
            this.arr[this.idx] = item;

        } else {
            this.arr[this.idx] = item;
        }

        this.idx == this.length - 1 ? this.idx = 0 : this.idx++;
    }

    get(idx: number): T | undefined {
        return this.arr[idx];
    }

    pop(): T | undefined {
        // check empty
        if (!this.arr[this.tail]) {
            this.idx = 0;
            this.tail = 0;
            return undefined
        }

        const out = this.arr[this.tail];
        this.arr[this.tail] = undefined;
        this.tail == this.length - 1 ? this.tail = 0 : this.tail++;
        return out;
    }
}
