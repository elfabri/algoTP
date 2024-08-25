export default function prims(list: WeightedAdjacencyList): WeightedAdjacencyList | null {
    // returns the Minimum Spanning Tree

    if (list.length === 0) {
        return null;
    }

    let seen = new Array(list.length).fill(false);
    let out: WeightedAdjacencyList = new Array(list.length).fill(null).map(() => []);

    // select starting node
    seen[0] = true;
    let curr = 0;

    let edges: [number, GraphEdge][] = [];

    do {
        // add edges to list
        for (const edge of list[curr]) {
            edges.push([curr, edge]);
        }

        // select edge that is the lowest value and to a node we haven't seen yet
        let lowest = Infinity;
        let lowestEdge: [number, GraphEdge | null] = [-1, null];
        for (const edge of edges) {
            if (!seen[edge[1].to] && edge[1].weight < lowest) {
                lowest = edge[1].weight;
                lowestEdge = edge;
            }
        }

        // insert the edge from current to new into our out graph
        if (lowestEdge[1] != null) {
            out[lowestEdge[0]].push(lowestEdge[1]);
            out[lowestEdge[1].to].push({to: lowestEdge[0], weight: lowestEdge[1].weight});
            // set visited
            seen[lowestEdge[1].to] = true;
            // remove the potential edge, leaving a 1 at that index
            edges.splice(edges.indexOf(lowestEdge as [number, GraphEdge]), 1);
        }

        // update curr to selected edge
        curr = lowestEdge[1]?.to || -1;
    } while (seen.includes(false) && curr >= 0);
    return out;
}
