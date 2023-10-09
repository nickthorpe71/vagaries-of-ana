export function getTileHemispheres(
    boardHeight: number,
    boardWidth: number,
    tile: Tile
): {
    hemisphereNS: "north" | "south";
    hemisphereEW: "east" | "west";
} {
    const { x, y } = tile;
    const hemisphereNS = y < boardHeight / 2 ? "north" : "south";
    const hemisphereEW = x < boardWidth / 2 ? "west" : "east";
    return { hemisphereNS, hemisphereEW };
}
