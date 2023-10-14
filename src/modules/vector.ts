export function addVectors(a: number[], b: number[]) {
    if (a.length !== a.length)
        throw new Error("Vectors must have the same dimension for addition.");

    return a.map((v, i) => v + b[i]);
}
