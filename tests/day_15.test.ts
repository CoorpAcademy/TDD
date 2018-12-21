import test from "ava";
import {
  stringToPlan,
  planToString,
  Plan,
  Wall,
  Cavern,
  Goblin,
  Elf,
  isFinish,
  getResult
} from "../day_15";

test("stringToPlan", t => {
  const actual = stringToPlan(`#######
#.G.E.#
#E.G.E#
#.G.E.#
#######`);
  const WALL: Wall = { type: "wall" };
  const CAVERN: Cavern = { type: "cavern" };
  const GOBLIN: Goblin = { type: 'goblin', hitPoint: 200};
  const ELF: Elf = { type: 'elf', hitPoint: 200};
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
  const WALL: Wall = { type: "wall" };
  const CAVERN: Cavern = { type: "cavern" };
  const GOBLIN: Goblin = { type: 'goblin', hitPoint: 200};
  const ELF: Elf = { type: 'elf', hitPoint: 200};
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
#######`
  t.deepEqual(actual, expected);
});

test('isFinish', t => {
  t.is(isFinish(stringToPlan(`#######
#E..EG#
#.#G.E#
#E.##E#
#G..#.#
#..E#.#
#######`)), false)
  t.is(isFinish(stringToPlan(`#######
#.E.E.#
#.#E..#
#E.##.#
#.E.#.#
#...#.#
#######`)), true)
});

test('getResult', t => {
  const WALL: Wall = { type: "wall" };
  const CAVERN: Cavern = { type: "cavern" };
  const ELF = (hitPoint: number): Elf => ({ type: 'elf', hitPoint});
  t.is(getResult([
    [WALL, WALL, WALL, WALL, WALL, WALL, WALL],
    [WALL, CAVERN, ELF(164), CAVERN, ELF(197), WALL, WALL],
    [WALL, CAVERN, WALL, ELF(200), CAVERN, CAVERN, WALL],
    [WALL, ELF(98), CAVERN, WALL, WALL, CAVERN, WALL],
    [WALL, CAVERN, ELF(200), CAVERN, WALL, CAVERN, WALL],
    [WALL, CAVERN, CAVERN, CAVERN, WALL, CAVERN, WALL],
    [WALL, WALL, WALL, WALL, WALL, WALL, WALL]
  ], 46), 39514)
});
