"use client";

import React, { FC, useState } from "react";
import { cloneDeep } from "lodash";

// enums
import { TileState } from "@/enums/game";

// modules
import { applyTileState } from "@/modules/board";

// components
import Tile from "@/components/game/Tile";
import VagarySelectMenu from "./VagarySelectMenu";

interface BoardProps {
    initialTiles: Tile[][];
}

const Board: FC<BoardProps> = ({ initialTiles }) => {
    const [tiles, setTiles] = useState<Tile[][]>(initialTiles);
    const [selectedTile, setSelectedTile] = useState<Tile | null>(null);
    const [showMenu, setShowMenu] = useState<boolean>(false);

    function onClickTile(tile: Tile) {
        const clickedTile = cloneDeep(tile);
        if (selectedTile) {
            // check if currently selected tile is clicked again
            if (
                selectedTile.x === clickedTile.x &&
                selectedTile.y === clickedTile.y
            ) {
                clickedTile.state = applyTileState(
                    selectedTile.state,
                    TileState.DEFAULT
                );

                // clean up movement and ability target tile states
                setSelectedTile(null);
                return;
            }

            // TODO:
            // if selectedTile is in movement state move to that tile
            // if selectedTile is in Ability_target state then attack that tile

            // Move tile
            const newTiles = [...tiles];
            newTiles[clickedTile.y][clickedTile.x].vagary = selectedTile.vagary;
            newTiles[selectedTile.y][selectedTile.x].vagary =
                clickedTile.vagary;
            setTiles(newTiles);
            setSelectedTile(null);
            return;
        } else if (clickedTile.vagary) {
            setSelectedTile(clickedTile);
            setShowMenu(true);
            // [x] show menu
            //     [ ] if click move show movement pattern
            //     [ ] if click Abilities show Abilities pattern
            //     [ ] if click stats show stats
            //     [x] if click cancel close menu
        }

        // console.log(tile);
    }

    function handleMenuMoveClick() {
        console.log("move");
        console.log(selectedTile?.vagary?.ownedVagary.baseVagary.moveMap);
        setShowMenu(false);
    }

    function handleMenuAbilitiesClick() {
        console.log("Abilities");
        setShowMenu(false);
    }

    function handleMenuStatsClick() {
        console.log("stats");
        setShowMenu(false);
    }

    function handleMenuCancelClick() {
        setSelectedTile(null);
        setShowMenu(false);
    }

    return (
        <div className={`flex flex-wrap relative w-board h-board`}>
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
            {showMenu && selectedTile && selectedTile.vagary ? (
                <VagarySelectMenu
                    selectedTile={selectedTile}
                    onMoveClick={handleMenuMoveClick}
                    onAbilitiesClick={handleMenuAbilitiesClick}
                    onStatsClick={handleMenuStatsClick}
                    onCancelClick={handleMenuCancelClick}
                />
            ) : null}
        </div>
    );
};

export default Board;
