type Vagary = {
    id: number;
    name: string;
    types: string[];
    race: string;
    timelineBranchesFrom: number[];
    loreText: string;
    timelineBecomesAvailableAtLevel: number[];
    timelineBranchesTo: number[];
    stamina: number;
    baseHP: number;
    basePower: number;
    baseDefense: number;
    baseSpeed: number;
    moveMap: {
        [key: string]: number;
    };
    imgName: string;
};

type Ability = {
    id: number;
    name: string;
    color: string;
    castPositions: [number, number][];
    aoe: [number, number][];
    hitAllInPath: boolean;
    staminaCost: number;
    health: [number, number] | null;
    power: [number, number] | null;
    defense: [number, number] | null;
    speed: [number, number] | null;
    stamina: [number, number] | null;
    tooltip: string;
    flavorText: string;
};
