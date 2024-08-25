export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    let q = [];
    q.push(head);

    while (q.length) {
        const curr = q.shift() as BinaryNode<number>;
        if (!curr) {
            continue;
        }
        if (curr.value === needle) {
            return true;
        }
        q.push(curr.left);
        q.push(curr.right);
    }
    return false;
}
