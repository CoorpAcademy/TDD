const ATTACK_POINT = 3;
const INITIAL_HIT_POINT = 200;

type Wall = {type: 'wall'};
type Goblin = {
    type: 'goblin',
    hitPoint: number,
    position: Coordinate
};
type Elf = {
    type: 'elf',
    hitPoint: number,
    position: Coordinate
};
type Cavern = {type: 'cavern'};
type Cell = Wall | Goblin | Elf | Cavern;
type Plan = Array<Array<Cell>>;

const charToCell = (char: string): Cell =>
    ({type: 'wall'});

type Coordinate = [number, number];
type Unit = Elf|Goblin;
type Round = {
    units : Array<Unit>
}

const findClosestEnemy = (plan: Plan, unit: Unit, enimies: Array<Unit>): Coordinate => 
    [0, 0]

const getAdjacentCell = (position: Coordinate): Array<Coordinate> => [];

const getFirstPosition = (positions: Array<Coordinate>): Coordinate => [0, 0];

const planToString = (plan: Plan): string => '';