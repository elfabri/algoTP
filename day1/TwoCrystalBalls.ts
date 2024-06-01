export default function two_crystal_balls(breaks: boolean[]): number {

    let len = breaks.length;
    let stp = Math.floor(Math.sqrt(len));
    let n = 0;

    while (!breaks[n]) {
        n += stp;
        if (n > len) {
            break;
        }
    }

    n -= stp;

    for (n; n < len; n++) {
        if (breaks[n]) {
            return n;
        }
    }

    return -1;
}
