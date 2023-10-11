export function randInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function range(start: number, end?: number) {
    if (end === undefined) {
        end = start;
        start = 0;
    }
    return Array(end - start + 1)
        .fill(0)
        .map((_, idx) => start + idx);
}
