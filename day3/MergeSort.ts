export default function merge_sort(arr: number[]): void {
    if (arr.length > 1) {
        const mid = Math.round((arr.length - 1) / 2);

        const left = arr.slice(0, mid);
        const right = arr.slice(mid);

        merge_sort(left);
        merge_sort(right);

        let [i, j, k] = [0, 0, 0];

        while (i < left.length && j < right.length) {
            if (left[i] < right[j]) {
                arr[k] = left[i];
                i++;

            } else {
                arr[k] = right[j];
                j++;
            }

            k++;
        }

        // checking for left values
        while (i < left.length) {
            arr[k] = left[i];
            i++;
            k++;
        }

        while (j < right.length) {
            arr[k] = right[j];
            j++;
            k++;
        }
    }
}
