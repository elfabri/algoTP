function walk(curr: BinaryNode<number>, array: number[]) {
    if (curr.value === null) {
        return;
    }

    array.push(curr.value);

    if (curr.left) {
        walk(curr.left, array);
    }

    if (curr.right) {
        walk(curr.right, array);
    }
}

export default function pre_order_search(head: BinaryNode<number>): number[] {
    // Binary tree traversing the pre order way

    let arr: number[] = [];
    walk(head, arr);

    return arr;
}
