import test from "ava";
import {
  stringToPlan,
  planToString,
  Plan,
  Wall,
  Cavern,
  Goblin,
  Elf
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