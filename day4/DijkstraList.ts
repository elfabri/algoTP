function hasUnseen(seen: boolean[], dists: number[]): boolean {
    return seen.some((s, i) => !s && dists[i] < Infinity);
}

function getLowestDistance(seen: boolean[], dists: number[]): number {
    // returns the index of the closest next node
    let idx = -1;
    let lowestDist = Infinity;

    for (let i = 0; i < dists.length; i++) {
        if (seen[i]) {
            continue;
        }

        if (dists[i] < lowestDist) {
            lowestDist = dists[i];
            idx = i;
        }
    }

    return idx;
}

export default function dijkstra_list(source: number,
                                      sink: number,
                                      arr: WeightedAdjacencyList): number[] {
    // bfs implementation

    const seen: boolean[] = new Array(arr.length).fill(false);
    const prev: number[] = new Array(arr.length).fill(-1);
    const dists: number[] = new Array(arr.length).fill(Infinity);

    dists[source] = 0;
    while (hasUnseen(seen, dists)) {
        const curr = getLowestDistance(seen, dists);
        seen[curr] = true;

        let adjs = arr[curr];
        for (let i = 0; i < adjs.length; i++) {
            const edge = adjs[i];
            if (seen[edge.to]) {
                continue;
            }

            let dist = dists[curr] + edge.weight;
            if (dist < dists[edge.to]) {
                prev[edge.to] = curr;
                dists[edge.to] = dist;
            }
        }
    }

    let out: number[] = [];
    let curr = sink;

    while (prev[curr] !== -1) {
        out.push(curr);
        curr = prev[curr];
    }

    out.push(source);
    return out.reverse();
}
