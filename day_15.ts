const ATTACK_POINT = 3;
const INITIAL_HIT_POINT = 200;

export type Wall = {type: 'wall'};
export type Goblin = {
    type: 'goblin',
    hitPoint: number
};
export type Elf = {
    type: 'elf',
    hitPoint: number
};
export type Cavern = {type: 'cavern'};
export type Cell = Wall | Goblin | Elf | Cavern;
export type Plan = Array<Array<Cell>>;

type Coordinate = [number, number];
type Unit = Elf|Goblin;
type Round = {
    plan : Plan
}

const findClosestEnemy = (plan: Plan, unit: Unit, enimies: Array<Unit>): Coordinate => 
    [0, 0]

const getAdjacentCell = (position: Coordinate): Array<Coordinate> => [];

const getFirstPosition = (positions: Array<Coordinate>): Coordinate => [0, 0];

const charToCell = (char: string): Cell => {
    switch (char) {
        case '#': {
            const wall: Wall = {
                type: 'wall',
            };
            return wall;
        }
        case 'G': {
            const goblin: Goblin = {
                type: 'goblin',
                hitPoint: INITIAL_HIT_POINT,
            };
            return goblin;
        }
        case 'E': {
            const elf: Elf = {
                type: 'elf',
                hitPoint: INITIAL_HIT_POINT,
            };
            return elf;
        }
        default: {
            const cavern: Cavern = {type : 'cavern'};
            return cavern;
        }
    }
}
const cellToChar = (cell: Cell): string => {
    switch(cell.type) {
        case 'wall': return '#';
        case 'goblin': return 'G';
        case 'elf': return 'E';
        default: return '.'
    }
};

export const planToString = (plan: Plan): string =>
    plan.map(row => row.map(cellToChar).join('')).join('\n');
export const stringToPlan = (input: string): Plan => 
    input.split('\n').map(row => row.split('').map(charToCell));
