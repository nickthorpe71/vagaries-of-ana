"use client";

import React, { FC, useState } from "react";
import { cloneDeep } from "lodash";

// lib
import { BOARD_DIM } from "@/lib/const";

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
                setSelectedTile(null);
                resetTileStates();
                return;
            }

            if (clickedTile.vagary) {
                setSelectedTile(clickedTile);
                resetTileStates();
                return;
            }

            if (clickedTile.state === TileState.MOVEMENT) {
                moveVagary(selectedTile, clickedTile);
            }

            // TODO:
            // if selectedTile is in Ability_target state then attack that tile
        } else if (clickedTile.vagary) {
            setSelectedTile(clickedTile);
            setShowMenu(true);
            // [x] show menu
            //     [ ] if click move show movement pattern
            //     [ ] if click Abilities show Abilities pattern
            //     [ ] if click stats show stats
            //     [x] if click cancel close menu
        }

        resetTileStates();
    }

    function moveVagary(currentTile: Tile, destination: Tile) {
        const newTiles = [...tiles];

        // calculate the amount of stamina used
        const distance = Math.abs(
            currentTile.x - destination.x + currentTile.y - destination.y
        );

        // subtract stamina from current tile
        const currentVagary = newTiles[currentTile.y][currentTile.x].vagary;
        if (currentVagary) {
            currentVagary.currentStamina -= distance;
        }

        // move vagary to destination
        newTiles[destination.y][destination.x].vagary = currentVagary;
        newTiles[currentTile.y][currentTile.x].vagary = null;

        setTiles(newTiles);
        setSelectedTile(null);
    }

    function handleMenuMoveClick() {
        if (!selectedTile || !selectedTile.vagary) return;
        const stamina: number = selectedTile.vagary.currentStamina;
        const { x, y } = selectedTile;
        const newTiles: Tile[][] = [...tiles];

        const directions = [
            { x: 0, y: -1, proceed: y > 0 },
            { x: 0, y: 1, proceed: y < BOARD_DIM.height - 1 },
            { x: -1, y: 0, proceed: x > 0 },
            { x: 1, y: 0, proceed: x < BOARD_DIM.width - 1 },
        ];

        for (let step = 1; step <= stamina; step++) {
            directions.forEach((direction) => {
                const newX = x + direction.x * step;
                const newY = y + direction.y * step;

                if (
                    direction.proceed &&
                    newX >= 0 &&
                    newX < BOARD_DIM.width &&
                    newY >= 0 &&
                    newY < BOARD_DIM.height &&
                    newTiles[newY][newX] &&
                    !newTiles[newY][newX].vagary
                ) {
                    newTiles[newY][newX].state = TileState.MOVEMENT;
                } else {
                    direction.proceed = false;
                }
            });
        }

        setTiles(newTiles);
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

    const resetTileStates = () => {
        const newTiles = [...tiles];
        newTiles.forEach((row) => {
            row.forEach((tile) => {
                tile.state = applyTileState(tile.state, TileState.DEFAULT);
            });
        });
        setTiles(newTiles);
    };

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
