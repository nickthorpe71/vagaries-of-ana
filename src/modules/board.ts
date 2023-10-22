import { TileState } from "../enums/game";
import { cloneDeep } from "lodash";

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

export function applyTileState(
    initialTile: Tile,
    targetState: TileState
): Tile {
    const tile = cloneDeep(initialTile);
    const currentState = tile.state;

    if (currentState === targetState) {
        return tile;
    }

    let state: TileState;

    switch (targetState) {
        case TileState.DEFAULT:
            state = TileState.DEFAULT;
            break;
        case TileState.MOVEMENT:
            if (!tile.vagary) {
                state = TileState.MOVEMENT;
            } else {
                state = currentState;
            }
            break;
        case TileState.ABILITY_TARGET:
            state = TileState.ABILITY_TARGET;
            break;
        default:
            state = currentState;
            break;
    }

    return {
        ...tile,
        state,
    };
}

export function isWithinBoard(
    boardHeight: number,
    boardWidth: number,
    position: number[]
): boolean {
    const [x, y] = position;
    return x >= 0 && x < boardWidth && y >= 0 && y < boardHeight;
}
