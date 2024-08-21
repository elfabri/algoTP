    /*
    * WeightedAdjacencyMatrix is a graph structure formed by an array
    * of array, where the value is the weight of the edge (connection
    * btw nodes or vertexes) or zero if there is no connection.
    *
    * A ---- w ---> B  nodes: A, B, C, D
    * ^\            ^  weights: q, w, x, y, z
    * | ----        |
    * z      \q     x
    * |       ----  |
    * |           * |   // *A connects with C but C does not
    * D <--- y ---- C
    *
    *  A, B, C, D
    * [
    * [0, w, q, 0], // node A
    * [0, 0, 0, 0], // node B
    * [0, x, 0, y], // node C
    * [z, 0, 0, 0], // node D
    * ]
    * */

export default function bfs(
    graph: WeightedAdjacencyMatrix,  // : number[][]
    source: number,
    needle: number): number[] | null {

    // Start from source, go to needle
    // Return the path that we took
    // or null if no path found

    // For checking seen values
    let seen = new Array(graph.length).fill(false);

    // For checking the parent of the current value
    let prev = new Array(graph.length).fill(-1);

    // Using an array as a queue
    let q: number[] = [source];

    seen[source] = true;

    do {
        const curr = q.shift() as number;
        if (curr === needle) {
            break;
        }

        // adjacency
        const adjs = graph[curr];
        for (let i = 0; i < adjs.length; i++) {
            if (adjs[i] === 0) {  // no edge at this point
                continue;
            }

            if (seen[i]) {
                continue;
            }

            seen[i] = true;
            prev[i] = curr;
            q.push(i);
        }

    } while (q.length);

    if (prev[needle] === -1) {
        return null;
    }

    // build it backwards
    let curr = needle;
    let out: number[] = [];

    while (prev[curr] != -1) {
        out.push(curr);
        curr = prev[curr];
    }

    // reverse and add source at start position
    return [source].concat(out.reverse());
}
