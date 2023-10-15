export function range(start: number, end?: number) {
    if (end === undefined) {
        end = start;
        start = 0;
    }

    const step = start <= end ? 1 : -1; // Determine the step direction

    const rangeArray = [];
    for (let i = start; i !== end + step; i += step) {
        rangeArray.push(i);
    }

    return rangeArray;
}
