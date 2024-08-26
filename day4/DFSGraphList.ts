function walk(graph: WeightedAdjacencyList,
             source: number,
             needle: number,
             seen: boolean[],
             path: number[]): boolean {
    if (seen[source]) {
        return false;
    }
    seen[source] = true;

    // pre recursion operation
    path.push(source);
    if (source === needle) {
        return true;
    }

    // recursion
    const edges = graph[source];
    for (let i = 0; i < edges.length; i++) {
        const edge = edges[i];

        if (walk(graph, edge.to, needle, seen, path)) {
            return true;
        }
    }

    // post recursion operation
    path.pop();
    return false;
}

export default function dfs(graph: WeightedAdjacencyList,
                            source: number,
                            needle: number): number[] | null {
    //
    let path: number[] = [];
    let seen: boolean[] = new Array(graph.length).fill(false);
    walk(graph, source, needle, seen, path);
    if (path.length) {
        return path;
    }
    return null;
}
