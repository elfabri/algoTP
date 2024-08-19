function walk(curr: BinaryNode<number>, array: number[]) {
    if (curr.value === null) {
        return;
    }

    if (curr.left) {
        walk(curr.left, array);
    }

    array.push(curr.value);


    if (curr.right) {
        walk(curr.right, array);
    }
}

export default function in_order_search(head: BinaryNode<number>): number[] {
    // Binary tree traversing the pre order way

    let arr: number[] = [];
    walk(head, arr);

    return arr;
}
