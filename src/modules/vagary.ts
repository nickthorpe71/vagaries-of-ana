export function calculateCurrentLevel(exp: number): number {
    return Math.floor(Math.cbrt(exp));
}

export function calcExpToNextLevel(exp: number): number {
    const currentLevel = calculateCurrentLevel(exp);
    return Math.pow(currentLevel + 1, 3) - exp;
}
