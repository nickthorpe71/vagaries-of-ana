export function getTileHemispheres(
    board: Board,
    tile: Tile
): {
    hemisphereNS: "north" | "south";
    hemisphereEW: "east" | "west";
} {
    const { width, height } = board;
    const { x, y } = tile;
    const hemisphereNS = y < height / 2 ? "north" : "south";
    const hemisphereEW = x < width / 2 ? "west" : "east";
    return { hemisphereNS, hemisphereEW };
}
