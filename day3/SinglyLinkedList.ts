type Node<T> = {
    value: T,
    next?: Node<T>,
}

export default class SinglyLinkedList<T> {
    public length: number;

    private head: Node<T> | undefined;  // newest
    private tail: Node<T> | undefined;  // oldest

    constructor() {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
    }

    prepend(item: T): void {
        // new newest
        /*
        const node = {value: item} as Node<T>;

        if (this.length == 0) {
            this.head = node;
            this.tail = node;
            this.length++;
            return;
        }

        if (this.head) {
            node.next = this.head;
            this.head = node;
            this.length++;
        }
        */
        this.insertAt(item, 0);
    }

    insertAt(item: T, idx: number): void {
        const node = {value: item} as Node<T>;
        if (this.length == 0) {
            this.head = node;
            this.tail = node;
            this.length++;
            return;
        }

        if (idx === 0) {
            node.next = this.head;
            this.head = node;
            this.length++;
            return;
        }

        if (idx === this.length && this.tail) {
            this.tail.next = node;
            this.tail = node;
            this.length++;
            return;
        }

        let curr = this.head;
        let prevCurr = curr;
        for (let i = 1; i <= idx && i <= this.length; i++) {
            if (i === idx) {
                if (prevCurr) {
                    prevCurr.next = node;
                    node.next = curr;
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
        // after oldest
        /*
        const node = {value: item} as Node<T>;
        if (this.length == 0) {
            this.head = node;
            this.tail = node;
            this.length++;
            return;
        }

        if (this.tail) {
            this.tail.next = node;
            this.tail = node;
            this.length++;
        }
        */
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

        let prevCurr = curr;
        for (let i = 0; i <= this.length; i++) {
            if (curr == undefined) return;
            if (curr?.value === item) {
                if (prevCurr) {
                    if (i == this.length) {
                        prevCurr.next = undefined;
                        this.tail = prevCurr;
                        this.length--;
                        return curr.value;
                    } else if (i === 0) {
                        this.head = this.head?.next;
                        this.length--;
                        return curr.value;
                    }
                    prevCurr.next = curr?.next;
                    this.length--;
                    return curr.value;
                }
            } else {
                prevCurr = curr;
                curr = curr?.next;
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
        /*
        if (this.length === 0) {
            return;
        }

        let curr = this.head;
        if (idx === 0) {
            if (this.length == 1) {
                this.head = this.tail = undefined;
                this.length = 0;
                return curr?.value;
            }
            this.head = this.head?.next;
            this.length--;
            return curr?.value;
        }

        let prevCurr = curr;
        curr = curr?.next;
        for (let i = 1; i <= idx && i <= this.length; i++) {
            if (i === idx && prevCurr) {
                prevCurr.next = curr?.next;
                let out = curr?.value;
                curr = undefined;
                this.length--;
                return out;
            } else if (curr) {
                prevCurr = curr;
                curr = curr.next;
            }
        }
        return;
        */
        const out = this.get(idx);
        if (out) {
            this.remove(out);
        }
        return out;
    }
}
