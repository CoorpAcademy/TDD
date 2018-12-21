const ATTACK_POINT = 3;
const INITIAL_HIT_POINT = 200;

type BaseCell = {
  type: Type;
};
export type Wall = BaseCell & { type: 'wall' };
type Type = 'goblin' | 'elf' | 'wall' | 'cavern';

export type Goblin = BaseCell & {
  type: 'goblin';
  hitPoint: number;
};

export type Elf = BaseCell & {
  type: 'elf';
  hitPoint: number;
};

export type Cavern = BaseCell & { type: 'cavern' };

export type Cell = Wall | Goblin | Elf | Cavern;
export type Plan = Array<Array<Cell>>;

export type Coordinate = [number, number];
type Unit = Elf | Goblin;
type Round = {
  plan: Plan;
};

const findClosestEnemy = (plan: Plan, unit: Unit, enimies: Array<Unit>): Coordinate => [0, 0];

export const getAdjacentCell = (position: Coordinate): Array<Coordinate> => {
  return [
    [position[0], position[1] - 1], // 2,1
    [position[0] - 1, position[1]], // 1,2
    [position[0] + 1, position[1]], // 3,2
    [position[0], position[1] + 1] //
  ];
};

export const getFirstPosition = (positions: Array<Coordinate>): Coordinate => {
  let firstPosition: Coordinate = positions[0];

  positions.forEach(([x, y]) => {
    if (y < firstPosition[1] || (y === firstPosition[1] && x < firstPosition[0])) {
      firstPosition = [x, y];
    }
  });

  return firstPosition;
};

const charToCell = (char: string): Cell => {
  switch (char) {
    case '#': {
      const wall: Wall = {
        type: 'wall'
      };
      return wall;
    }
    case 'G': {
      const goblin: Goblin = {
        type: 'goblin',
        hitPoint: INITIAL_HIT_POINT
      };
      return goblin;
    }
    case 'E': {
      const elf: Elf = {
        type: 'elf',
        hitPoint: INITIAL_HIT_POINT
      };
      return elf;
    }
    default: {
      const cavern: Cavern = { type: 'cavern' };
      return cavern;
    }
  }
};
const cellToChar = (cell: Cell): string => {
  switch (cell.type) {
    case 'wall':
      return '#';
    case 'goblin':
      return 'G';
    case 'elf':
      return 'E';
    default:
      return '.';
  }
};

export const displayPlan = (plan: Plan): void => {
  console.log(planToString(plan));
};

export const planToString = (plan: Plan): string => plan.map(row => row.map(cellToChar).join('')).join('\n');
export const stringToPlan = (input: string): Plan => input.split('\n').map(row => row.split('').map(charToCell));

const getUnits = (row: Array<Cell>): Array<Unit> =>
  row.reduce((units: Array<Unit>, cell: Cell): Array<Unit> => {
    if (cell.type === 'elf' || cell.type === 'goblin') return [...units, cell];
    return units;
  }, []);

const flatten = <T>(input: Array<Array<T>>): Array<T> => input.reduce((a, b) => a.concat(b), []);
const sum = (input: Array<number>): number => input.reduce((a, b) => a + b, 0);

export const getOrderedUnitPositions = (plan: Plan): Array<Coordinate> => {
  return plan.reduce((positions: Array<Coordinate>, row: Array<Cell>, x: number): Array<Coordinate> => {
    return row.reduce((positions: Array<Coordinate>, cell: Cell, y: number): Array<Coordinate> => {
      if (cell.type === 'elf' || cell.type === 'goblin') return [...positions, [x, y]];
      return positions;
    }, positions);
  }, []);
};

// const getNextPlan = (plan: Plan): Plan => {
//     const positions: Array<Position> = getOrderPosition(plan);

//     return positions.reduce((plan, position) => {
//         // const unit: Unit = getCell(plan, position);
//         // const [planAfterMove, position] = move(plan, position, unit);

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
  const units: Array<Unit> = flatten(plan.map(getUnits));
  const totalHitPointLeft = sum(units.map(unit => unit.hitPoint));
  return totalHitPointLeft * round;
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
