type Node<T> = {
    value: T,
    next?: Node<T>,
    prev?: Node<T>,
}

export default class DoublyLinkedList<T> {
    public length: number;

    private head: Node<T> | undefined;
    private tail: Node<T> | undefined;

    constructor() {
        this.length = 0;
        this.head = this.tail = undefined;
    }

    prepend(item: T): void {
        this.insertAt(item, 0);
    }

    insertAt(item: T, idx: number): void {
        const node = {value: item} as Node<T>;
        if (this.length == 0) {
            this.head = node;
            this.tail = node;
            this.head.next = this.head.prev = undefined;
            this.length++;
            return;
        }

        if (idx === 0 && this.head) {
            node.next = this.head;
            this.head.prev = node;
            this.head = node;
            this.length++;
            return;
        }

        if (idx === this.length && this.tail) {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
            this.length++;
            return;
        }

        let curr = this.head;
        let prevCurr = curr?.prev;
        for (let i = 1; i <= idx && i <= this.length; i++) {
            if (i === idx) {
                if (prevCurr && curr) {
                    node.next = curr;
                    node.prev = curr?.prev;
                    curr.prev = node;
                    prevCurr.next = node;
                }
                this.length++;
                return;
            } else {
                if (curr) {
                    prevCurr = curr;
                    curr = curr.next;
                }
            }
        }
        return;
    }

    append(item: T): void {
        this.insertAt(item, this.length);
    }

    remove(item: T): T | undefined {
        if (this.length == 0) {
            return;
        }

        let curr = this.head;
        if (this.length == 1) {
            if (curr?.value == item) {
                this.head = this.tail = undefined;
                this.length = 0;
                return curr?.value;
            } else {
                return;
            }
        }

        let prevCurr = curr?.prev;
        let nextCurr = curr?.next;
        for (let i = 0; i <= this.length; i++) {
            if (curr == undefined) return;
            if (curr?.value === item) {
                    if (i === 0 && nextCurr) {
                        nextCurr.prev = undefined;
                        this.head = nextCurr;
                        this.length--;
                        return curr.value;
                    } else if (i == this.length && prevCurr) {
                        prevCurr.next = undefined;
                        this.tail = prevCurr;
                        this.length--;
                        return curr.value;
                    } else if (prevCurr && nextCurr) {
                        prevCurr.next = curr?.next;
                        nextCurr.prev = curr?.prev;
                        this.length--;
                        return curr.value;
                    }
            } else {
                prevCurr = curr;
                curr = curr?.next;
                nextCurr = curr?.next;
            }
        }
        return;
    }

    get(idx: number): T | undefined {
        if (this.length === 0) {
            return;
        }

        let curr = this.head;
        for (let i = 0; i <= idx && i <= this.length; i++) {
            if (i === idx) {
                return curr?.value;
            } else {
                if (curr) {
                    curr = curr.next;
                }
            }
        }
        return;
    }

    removeAt(idx: number): T | undefined {
        const out = this.get(idx);
        if (out) {
            this.remove(out);
        }
        return out;
    }
}
