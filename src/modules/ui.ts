// constants
import { BOARD_DIM, TILE_DIM } from "@/lib/const";

// modules
import { getTileHemispheres } from "@/modules/board";

export function calcPosFromHemispheres(
    tile: Tile,
    screenSize: ScreenSize
): {
    top: string | number;
    bottom: string | number;
    right: string | number;
    left: string | number;
} {
    const { hemisphereNS, hemisphereEW } = getTileHemispheres(
        BOARD_DIM.height,
        BOARD_DIM.width,
        tile
    );

    const top = adjustPosForMobile(
        hemisphereNS === "south" ? "auto" : tile.y * TILE_DIM.height,
        screenSize
    );
    const bottom = adjustPosForMobile(
        hemisphereNS === "north"
            ? "auto"
            : Math.abs(tile.y + 1 - BOARD_DIM.height) * TILE_DIM.height,
        screenSize
    );
    const right = adjustPosForMobile(
        hemisphereEW === "west"
            ? "auto"
            : Math.abs(tile.x - BOARD_DIM.width) * TILE_DIM.width,
        screenSize
    );
    const left = adjustPosForMobile(
        hemisphereEW === "east" ? "auto" : (tile.x + 1) * TILE_DIM.width,
        screenSize
    );

    return {
        top,
        bottom,
        right,
        left,
    };
}

function adjustPosForMobile(
    pos: number | string,
    screenSize: ScreenSize
): number | string {
    if (pos === "auto" || typeof pos !== "number") return pos;
    const mobileSizes = ["xs", "sm"];
    return mobileSizes.includes(screenSize) ? Math.round(pos / 2) : pos;
}
