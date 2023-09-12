"use client";

import React, { FC, useState, useRef } from "react";

// Module: Game
function genEmptyBoard(): Board {
    let tiles: Tile[][] = [];
    for (let i = 0; i < 10; i++) {
        tiles[i] = [];
        for (let j = 0; j < 7; j++) {
            tiles[i][j] = {
                x: j,
                y: i,
                vagary: null,
            }
        }
    }

    return {
        tiles,
    }
} 

// Components
interface TileProps {
    tile: Tile;
}
const Tile: FC<TileProps> = ({tile}) => {
   return <button>
    {tile.vagary?.ownedVagary.baseVagary.name}
   </button> 
}

const Proto: FC = () => {
    const initBoard = genEmptyBoard();
    return (
        <div
        >
            {initBoard.tiles.map((row: Tile[], rowIndex: number) =>
                row.map((tile: Tile, colIndex: number) =>
                    renderVagary(tile, rowIndex, colIndex)
                )
            )}
        </div>
    );
};

export default Proto;
