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

// export const displayPlan = (plan: Plan): void => {
//       plan.forEach((cells: Array<Cell> => {
        
//       });        
// }

export const planToString = (plan: Plan): string =>
    plan.map(row => row.map(cellToChar).join('')).join('\n');
export const stringToPlan = (input: string): Plan => 
    input.split('\n').map(row => row.split('').map(charToCell));

// const getNextPlan = (plan: Plan): Plan => {
//     const positions: Array<Position> = getOrderPosition(plan);

//     return positions.reduce((plan, position) => {
//         const unit: Unit = getCell(plan, position);
//         const [planAfterMove, position] = move(plan, position, unit);

//         const planAfterAttack = attack(plan, position, unit);

//         return planAfterAttack;
//     }, plan);
// };

export const isFinish = (plan: Plan): boolean => {
    const hasSomeElfAlive: boolean = plan.some(row => row.some(cell => cell.type === 'elf'));
    const hasSomeGoblinAlive: boolean = plan.some(row => row.some(cell => cell.type === 'goblin'));

    return !(hasSomeElfAlive && hasSomeGoblinAlive);
};
export const getResult = (plan: Plan, round: number): number => {
    const units: Array<Unit> = plan.map((row: Array<Cell>): Array<Unit> => {
        const units: Array<Unit> = row.reduce((units: Array<Unit>, cell: Cell): Array<Unit> => {
            if (cell.type === 'elf' || cell.type === 'goblin')
                return [...units, cell];
            return units;
        }, [])
        return units;
    }).reduce((a, b) => a.concat(b), []);

    const totalHitPointLeft = units.map(unit => unit.hitPoint).reduce((a, b) => a + b, 0);

    return totalHitPointLeft * round
};

// const resolvePlan = (plan: Plan):number => {
//     let round = 0;
//     while(isFinish(plan)) {
//         plan = getNextPlan(plan);
//         round = round + 1;

//         displayPlan(plan);
//     };

//     const result = getResult(plan);

//     return result;
// }