export const INITIAL_HIT_POINT = 200;

type AttackPoint = {elf: number, goblin: number};

export const ATTACK_POINT = {elf: 3, goblin: 3};

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

export const getAdjacentCells = ([x, y]: Coordinate): Array<Coordinate> => {
  return [
      [x - 1, y],
      [x, y - 1],
      [x, y + 1],
      [x + 1, y]
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

export const planToString = (plan: Plan): string => plan.map(row => row.map(cellToChar).join('')).join('\n');
export const stringToPlan = (input: string): Plan => input.trim().split('\n').map(row => row.trim().split('').map(charToCell));

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

const getCell = (plan: Plan, [x, y]: Coordinate): Cell => plan[x][y];
const setCell = (plan: Plan, [x, y]: Coordinate, cell: Cell): Plan => {
    plan[x][y] = cell;
    return plan;
};

export const getTargetedEnemy = (plan: Plan, position: Coordinate): [Coordinate, Unit] | null => {
    const cell: Cell = getCell(plan, position);     

    if (cell.type !== 'elf' && cell.type !== 'goblin') return null;

    return getAdjacentCells(position).map((position: Coordinate): [Coordinate, Cell] => 
        [position, getCell(plan, position)]
    ).filter(([, c]) => {
        return c.type === ((cell.type === 'elf') ? 'goblin' : 'elf');
    }).reduce((enemy: [Coordinate, Unit] | null, [currentPosition, currentCell]: [Coordinate, Cell]): [Coordinate, Unit] | null => {
        if (currentCell.type !== 'elf' && currentCell.type !== 'goblin') return enemy;
        if (!enemy) return [currentPosition, currentCell];

        const [, enemyCell] = enemy;
        if (currentCell.hitPoint < enemyCell.hitPoint) return [currentPosition, currentCell];
        return enemy;
    }, null);
};

const getDamage = (unit: Unit, {elf, goblin}: AttackPoint) => {
  switch (unit.type) {
    case 'elf': return elf;
    case 'goblin': return goblin;
  }
};

export const attack = (attackPoint: AttackPoint) => (plan: Plan, position: Coordinate): [Plan, Coordinate | null] => {
    const cell: Cell = getCell(plan, position);
    if (cell.type !== 'elf' && cell.type !== 'goblin') return [plan, null];

    const targetedEnemy: [Coordinate, Cell] | null = getTargetedEnemy(plan, position);
    if (!targetedEnemy) return [plan, null];

    const [enemyPosition] = targetedEnemy;
    const enemyCell = getCell(plan, enemyPosition);
    if (enemyCell.type !== 'elf' && enemyCell.type !== 'goblin') return [plan, null];
    const nextEnemyCell = {
        ...enemyCell,
        hitPoint: enemyCell.hitPoint - getDamage(cell, attackPoint)
    };
    return [
      setCell(
          plan,
          enemyPosition,
          nextEnemyCell.hitPoint > 0 ? nextEnemyCell : {type: 'cavern'}
      ),
      nextEnemyCell.hitPoint > 0 ? null : enemyPosition
    ];
};

export const move = (plan: Plan, position: Coordinate): [Plan, Coordinate] => {
  const cell: Cell = getCell(plan, position);
  if (cell.type !== 'elf' && cell.type !== 'goblin') return [plan, position];
  const unit: Unit = cell;

  const adjacentCells: Array<Coordinate> = getAdjacentCells(position);

  const hasEnemyInRange = adjacentCells.some((p: Coordinate): boolean => 
    getCell(plan, p).type === (unit.type === 'elf' ? 'goblin' : 'elf')
  );

  if (hasEnemyInRange) return [plan, position];

  const targetedCells: Array<Coordinate>  = flatten(plan.map((row, x): Array<Coordinate> => 
    flatten(row.map((c: Cell, y: number): Array<Coordinate> => {
      if (c.type === ((cell.type === 'elf') ? 'goblin' : 'elf'))
        return getAdjacentCells([x, y]);
      return [];
    }))
  )).filter((position: Coordinate): boolean => getCell(plan, position).type === 'cavern');

  const nextPosition = spreadWave(plan, [targetedCells, []], getAdjacentCells(position).filter((position: Coordinate): boolean => getCell(plan, position).type === 'cavern'));

  if (!nextPosition) return [plan, position];
  
  return [setCell(
    setCell(
      plan,
      position,
      {type: 'cavern'}
    ),
    nextPosition,
    unit
  ), nextPosition];
};

type Wave = [Array<Coordinate>, Array<Coordinate>];

const positionIsEqual = ([x1, y1]: Coordinate, [x2, y2]: Coordinate): boolean => x1 === x2 && y1 === y2;
const uniquePosition = (positions: Array<Coordinate>): Array<Coordinate> => 
  positions.reduce(((acc: Array<Coordinate>, position: Coordinate): Array<Coordinate> => {
    if (acc.find(p => positionIsEqual(p, position)) === undefined)
      acc.push(position);
    return acc;
  }), []);
const spreadWave = (plan: Plan, wave: Wave, ends: Array<Coordinate>) : Coordinate | null => {
  const [frontWave, backWave] = wave;

  if (frontWave.length === 0) return null;
  const end = ends.find((position: Coordinate): boolean => 
    frontWave.find((p: Coordinate): boolean => 
      positionIsEqual(p, position)
    ) !== undefined
  );
  if (end) return end;

  return spreadWave(plan, [
    uniquePosition(flatten(frontWave.map(getAdjacentCells)).filter((position: Coordinate): boolean => 
      frontWave.find((p) => positionIsEqual(p, position)) === undefined && backWave.find((p) => positionIsEqual(p, position)) === undefined
    ).filter((position: Coordinate): boolean => getCell(plan, position).type === 'cavern')),
    frontWave
  ], ends);
};

export const getNextPlan = (attackPoint: AttackPoint) => (plan: Plan): Plan => {
    let positions: Array<Coordinate> = getOrderedUnitPositions(plan);
    let position: Coordinate | void = undefined;
    while(position = positions.shift()) {
      const cell: Cell = getCell(plan, position);

      if (cell.type !== 'elf' && cell.type !== 'goblin') return plan;

      const [planAfterMove, positionAfterMove]: [Plan, Coordinate] = move(plan, position);
      const [planAfterAttack, diedEnemy] = attack(attackPoint)(planAfterMove,positionAfterMove);

      if (diedEnemy) {
        positions = positions.filter(p => !positionIsEqual(p, diedEnemy))
      }

      plan = planAfterAttack;
    }

    return plan;
};

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

export const resolvePart1 = (input: string): number => {
  let plan: Plan = stringToPlan(input);
  let round = -1;
  while(!isFinish(plan)) {
      plan = getNextPlan(ATTACK_POINT)(plan);
      round = round + 1;
  }; 

  const result = getResult(plan, round);
  return result;
}

const map2 = <T, S>(arr: Array<Array<T>>, mapper: (item: T) => S) => arr.map(r => r.map(mapper));
const reduce2 = <T>(arr: Array<Array<T>>, reducer: (acc: T, item: T) => T, inital: T) => arr.reduce((acc, r) => r.reduce(reducer, acc), inital);

const countElf = (plan: Plan): number => 
  reduce2(
    map2(plan, (cell: Cell) => cell.type === 'elf' ? 1 : 0), 
    (acc: number, next: number): number => acc + next, 
    0
  );

export const resolvePart2 = (input: string): number => {
  const initialElfCount: number = countElf(stringToPlan(input));
  
  let currentElfCount: number = 0;
  let plan = stringToPlan(input);
  let round = -1;
  let attackPoint: AttackPoint = ATTACK_POINT;
  while(currentElfCount < initialElfCount) {
    plan = stringToPlan(input);
    round = -1;
    while(!isFinish(plan)) {
        plan = getNextPlan(attackPoint)(plan);
        round = round + 1;
    };

    currentElfCount =  countElf(plan);
    attackPoint = {
      ...attackPoint,
      elf: attackPoint.elf + 1
    };
  }

  return getResult(plan, round);
}
