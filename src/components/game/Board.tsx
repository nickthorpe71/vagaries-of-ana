"use client";

import React, { FC, useState, useRef, useEffect } from "react";
import { cloneDeep } from "lodash";

// utils
import { cn } from "@/lib/utils";

// components
import Tile from "@/components/game/Tile";

interface BoardProps {
    initialTiles: Tile[][];
}

const Board: FC<BoardProps> = ({ initialTiles }) => {
    const [tiles, setTiles] = useState<Tile[][]>(initialTiles);
    const [selectedTile, setSelectedTile] = useState<Tile | null>(null);

    useEffect(() => {
        console.log(selectedTile?.vagary?.ownedVagary.baseVagary.name);
    }, [selectedTile]);

    function onClickTile(tile: Tile) {
        const clickedTile = cloneDeep(tile);
        if (selectedTile) {
            // check if currently selected tile is clicked again
            if (
                selectedTile.x === clickedTile.x &&
                selectedTile.y === clickedTile.y
            ) {
                setSelectedTile(null);
                return;
            }

            // TODO:
            // if selectedTile is in movement state make sure the clicked tile is in the movement pattern
            //      prevent tile from moving onto tiles that are occupied by other vagaries
            // if selectedTile is in attack state make sure the clicked tile is in the attack pattern
            //      if clicked tile is in attack pattern, attack it

            const newTiles = [...tiles];
            newTiles[clickedTile.y][clickedTile.x].vagary = selectedTile.vagary;
            newTiles[selectedTile.y][selectedTile.x].vagary =
                clickedTile.vagary;
            setTiles(newTiles);
            setSelectedTile(null);
            return;
        } else if (clickedTile.vagary) {
            setSelectedTile(clickedTile);
            // show menu
            //      if click move show movement pattern
            //      if click attack show attack pattern
            //      if click stats show stats
            //      if click cancel close menu
        }

        // console.log(tile);
    }

    return (
        <div className='flex flex-wrap w-full '>
            {tiles.map((row: Tile[], rowIndex: number) => (
                <div
                    key={`board-row--${rowIndex}`}
                    className='flex w-full justify-center'
                >
                    {row.map((tile: Tile) => (
                        <Tile
                            key={`tile--${tile.x}-${tile.y}`}
                            tile={tile}
                            isSelected={
                                !!(
                                    selectedTile &&
                                    selectedTile.x === tile.x &&
                                    selectedTile.y === tile.y
                                )
                            }
                            onClick={onClickTile}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Board;
