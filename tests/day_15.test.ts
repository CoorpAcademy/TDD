import test from 'ava';
import {
  stringToPlan,
  planToString,
  Plan,
  Wall,
  Cavern,
  Goblin,
  Elf,
  isFinish,
  getResult,
  getOrderedUnitPositions
} from '../day_15';

test('stringToPlan', t => {
  const actual = stringToPlan(`#######
#.G.E.#
#E.G.E#
#.G.E.#
#######`);
  const WALL: Wall = { type: 'wall' };
  const CAVERN: Cavern = { type: 'cavern' };
  const GOBLIN: Goblin = { type: 'goblin', hitPoint: 200 };
  const ELF: Elf = { type: 'elf', hitPoint: 200 };
  const expected: Plan = [
    [WALL, WALL, WALL, WALL, WALL, WALL, WALL],
    [WALL, CAVERN, GOBLIN, CAVERN, ELF, CAVERN, WALL],
    [WALL, ELF, CAVERN, GOBLIN, CAVERN, ELF, WALL],
    [WALL, CAVERN, GOBLIN, CAVERN, ELF, CAVERN, WALL],
    [WALL, WALL, WALL, WALL, WALL, WALL, WALL]
  ];
  t.deepEqual(actual, expected);
});

test('planToString', t => {
  const WALL: Wall = { type: 'wall' };
  const CAVERN: Cavern = { type: 'cavern' };
  const GOBLIN: Goblin = { type: 'goblin', hitPoint: 200 };
  const ELF: Elf = { type: 'elf', hitPoint: 200 };
  const plan: Plan = [
    [WALL, WALL, WALL, WALL, WALL, WALL, WALL],
    [WALL, CAVERN, GOBLIN, CAVERN, ELF, CAVERN, WALL],
    [WALL, ELF, CAVERN, GOBLIN, CAVERN, ELF, WALL],
    [WALL, CAVERN, GOBLIN, CAVERN, ELF, CAVERN, WALL],
    [WALL, WALL, WALL, WALL, WALL, WALL, WALL]
  ];
  const actual = planToString(plan);
  const expected = `#######
#.G.E.#
#E.G.E#
#.G.E.#
#######`;
  t.deepEqual(actual, expected);
});

test('isFinish', t => {
  t.is(
    isFinish(
      stringToPlan(`#######
#E..EG#
#.#G.E#
#E.##E#
#G..#.#
#..E#.#
#######`)
    ),
    false
  );
  t.is(
    isFinish(
      stringToPlan(`#######
#.E.E.#
#.#E..#
#E.##.#
#.E.#.#
#...#.#
#######`)
    ),
    true
  );
});

test('getResult', t => {
  const WALL: Wall = { type: 'wall' };
  const CAVERN: Cavern = { type: 'cavern' };
  const ELF = (hitPoint: number): Elf => ({ type: 'elf', hitPoint });
  t.is(
    getResult(
      [
        [WALL, WALL, WALL, WALL, WALL, WALL, WALL],
        [WALL, CAVERN, ELF(164), CAVERN, ELF(197), WALL, WALL],
        [WALL, CAVERN, WALL, ELF(200), CAVERN, CAVERN, WALL],
        [WALL, ELF(98), CAVERN, WALL, WALL, CAVERN, WALL],
        [WALL, CAVERN, ELF(200), CAVERN, WALL, CAVERN, WALL],
        [WALL, CAVERN, CAVERN, CAVERN, WALL, CAVERN, WALL],
        [WALL, WALL, WALL, WALL, WALL, WALL, WALL]
      ],
      46
    ),
    39514
  );
});

test('getOrderedUnitPositions', t => {
  t.deepEqual(
    getOrderedUnitPositions(
      stringToPlan(`#######
#.G.E.#
#E.G.E#
#.G.E.#
#######`)
    ),
    [[1, 2], [1, 4], [2, 1], [2, 3], [2, 5], [3, 2], [3, 4]]
  );
});
import { Plan, Cell, Coordinate, getAdjacentCell, getFirstPosition } from '../day_15';

test('getAdjacentCell ', t => {
  const currentPosition: Coordinate = [2, 2];
  const expectedPositions: Array<Coordinate> = [[2, 1], [1, 2], [3, 2], [2, 3]];
  const result = getAdjacentCell(currentPosition);
  t.deepEqual(result, expectedPositions);
});

test('getFirstPosition - nominal case ', t => {
  const expectedResult: Coordinate = [1, 1];
  const coordinates: Array<Coordinate> = [expectedResult, [1, 2]];

  const result = getFirstPosition(coordinates);
  t.deepEqual(result, expectedResult);
});

test('getFirstPosition - nominal case #2 ', t => {
  const expectedResult: Coordinate = [1, 1];
  const coordinates: Array<Coordinate> = [expectedResult, [3, 3]];

  const result = getFirstPosition(coordinates);
  t.deepEqual(result, expectedResult);
});

test('getFirstPosition - nominal case #3 ', t => {
  const expectedResult: Coordinate = [1, 1];
  const coordinates: Array<Coordinate> = [expectedResult, [2, 1]];
  const result = getFirstPosition(coordinates);
  t.deepEqual(result, expectedResult);
});

test('getFirstPosition - nominal case #4 ', t => {
  const expectedResult: Coordinate = [1, 1];
  const coordinates: Array<Coordinate> = [[2, 1], expectedResult];
  const result = getFirstPosition(coordinates);
  t.deepEqual(result, expectedResult);
});

test('getFirstPosition - nominal case #5', t => {
  const expectedResult: Coordinate = [1, 1];
  const coordinates: Array<Coordinate> = [[2, 1], expectedResult, [5, 999]];
  const result = getFirstPosition(coordinates);
  t.deepEqual(result, expectedResult);
});
