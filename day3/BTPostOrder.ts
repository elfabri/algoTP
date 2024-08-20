function walk(curr: BinaryNode<number>, array: number[]) {
    if (curr.value === null) {
        return;
    }

    if (curr.left) {
        walk(curr.left, array);
    }

    if (curr.right) {
        walk(curr.right, array);
    }

    array.push(curr.value);
}

export default function post_order_search(head: BinaryNode<number>): number[] {
    // Binary tree traversing the post order way

    let arr: number[] = [];
    walk(head, arr);
    return arr;
}
