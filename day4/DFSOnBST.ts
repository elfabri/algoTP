export default function dfs(head: BinaryNode<number>, needle: number): boolean {

    if (!head) {
        return false;
    }

    if (head.value === needle) {
        return true;

    } else if (head.value > needle && head.left) {
        return dfs(head.left, needle);

    } else if (head.right) {
        return dfs(head.right, needle);
    }

    return false;
}
