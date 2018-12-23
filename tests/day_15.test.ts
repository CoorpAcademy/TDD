import test from "ava";
import {
  Cavern,
  Elf,
  getNextPlan,
  Coordinate,
  getOrderedUnitPositions,
  getResult,
  Goblin,
  INITIAL_HIT_POINT,
  isFinish,
  Plan,
  planToString,
  stringToPlan,
  Wall,
  getAdjacentCells,
  getFirstPosition,
  getTargetedEnemy,
  ATTACK_POINT,
  attack,
  move,
  resolvePart1,
  resolvePart2
} from "../day_15";

const W: Wall = { type: "wall" };
const C: Cavern = { type: "cavern" };
const E = (hitPoint: number = INITIAL_HIT_POINT): Elf => ({
  type: "elf",
  hitPoint
});
const G = (hitPoint: number = INITIAL_HIT_POINT): Goblin => ({
  type: "goblin",
  hitPoint
});

test("stringToPlan", t => {
  const actual = stringToPlan(`
#######
#.G.E.#
#E.G.E#
#.G.E.#
#######
  `.trim());
  const expected: Plan = [
    [W, W, W, W, W, W, W],
    [W, C, G(), C, E(), C, W],
    [W, E(), C, G(), C, E(), W],
    [W, C, G(), C, E(), C, W],
    [W, W, W, W, W, W, W]
  ];
  t.deepEqual(actual, expected);
});

test("planToString", t => {
  const plan: Plan = [
    [W, W, W, W, W, W, W],
    [W, C, G(), C, E(), C, W],
    [W, E(), C, G(), C, E(), W],
    [W, C, G(), C, E(), C, W],
    [W, W, W, W, W, W, W]
  ];
  const actual = planToString(plan);
  const expected = `
#######
#.G.E.#
#E.G.E#
#.G.E.#
#######
  `.trim();
  t.deepEqual(actual, expected);
});

test("isFinish", t => {
  t.is(
    isFinish(
      stringToPlan(`
        #######
        #E..EG#
        #.#G.E#
        #E.##E#
        #G..#.#
        #..E#.#
        #######
      `)
    ),
    false
  );
  t.is(
    isFinish(
      stringToPlan(`
        #######
        #.E.E.#
        #.#E..#
        #E.##.#
        #.E.#.#
        #...#.#
        #######
      `)
    ),
    true
  );
});

test("getResult", t => {
  t.is(
    getResult(
      [
        [W, W, W, W, W, W, W],
        [W, C, E(164), C, E(197), W, W],
        [W, C, W, E(200), C, C, W],
        [W, E(98), C, W, W, C, W],
        [W, C, E(200), C, W, C, W],
        [W, C, C, C, W, C, W],
        [W, W, W, W, W, W, W]
      ],
      46
    ),
    39514
  );
});

test("getOrderedUnitPositions", t => {
  t.deepEqual(
    getOrderedUnitPositions(
      stringToPlan(`
        #######
        #.G.E.#
        #E.G.E#
        #.G.E.#
        #######
      `)
    ),
    [[1, 2], [1, 4], [2, 1], [2, 3], [2, 5], [3, 2], [3, 4]]
  );
});

test("getAdjacentCells ", t => {
  const currentPosition: Coordinate = [2, 2];
  const expectedPositions: Array<Coordinate> = [[1, 2], [2, 1], [2, 3], [3, 2]];
  const result = getAdjacentCells(currentPosition);
  t.deepEqual(result, expectedPositions);
});

test("getFirstPosition - nominal case ", t => {
  const expectedResult: Coordinate = [1, 1];
  const coordinates: Array<Coordinate> = [expectedResult, [1, 2]];

  const result = getFirstPosition(coordinates);
  t.deepEqual(result, expectedResult);
});

test("getFirstPosition - nominal case #2 ", t => {
  const expectedResult: Coordinate = [1, 1];
  const coordinates: Array<Coordinate> = [expectedResult, [3, 3]];

  const result = getFirstPosition(coordinates);
  t.deepEqual(result, expectedResult);
});

test("getFirstPosition - nominal case #3 ", t => {
  const expectedResult: Coordinate = [1, 1];
  const coordinates: Array<Coordinate> = [expectedResult, [2, 1]];
  const result = getFirstPosition(coordinates);
  t.deepEqual(result, expectedResult);
});

test("getFirstPosition - nominal case #4 ", t => {
  const expectedResult: Coordinate = [1, 1];
  const coordinates: Array<Coordinate> = [[2, 1], expectedResult];
  const result = getFirstPosition(coordinates);
  t.deepEqual(result, expectedResult);
});

test("getFirstPosition - nominal case #5", t => {
  const expectedResult: Coordinate = [1, 1];
  const coordinates: Array<Coordinate> = [[2, 1], expectedResult, [5, 999]];
  const result = getFirstPosition(coordinates);
  t.deepEqual(result, expectedResult);
});

test("getTargetedEnemy", t => {
  t.deepEqual(
    getTargetedEnemy([[W, G(), W], [G(), E(), G()], [W, G(), W]], [1, 1]),
    [[0, 1], G(200)]
  );
  t.deepEqual(
    getTargetedEnemy([[W, E(), W], [E(), E(), G()], [W, E(), W]], [1, 1]),
    [[1, 2], G(200)]
  );
});

test("attach", t => {
  t.deepEqual(attack(ATTACK_POINT)([[W, W, W, W], [W, E(), G(4), W], [W, W, W, W]], [1, 1]), [
    [[W, W, W, W], [W, E(), G(1), W], [W, W, W, W]],
    null
  ]);
  t.deepEqual(attack(ATTACK_POINT)([[W, W, W, W], [W, E(), G(3), W], [W, W, W, W]], [1, 1]), [
    [[W, W, W, W], [W, E(), C, W], [W, W, W, W]],
    [1, 2]
  ]);
  t.deepEqual(attack(ATTACK_POINT)([[W, W, W, W], [W, E(), C, W], [W, W, W, W]], [1, 1]), [
    [[W, W, W, W], [W, E(), C, W], [W, W, W, W]],
    null
  ]);
});

test("move", t => {
  t.deepEqual(
    move([[W, W, W, W, W], [W, E(), C, G(), W], [W, W, W, W, W]], [1, 1]),
    [[[W, W, W, W, W], [W, C, E(), G(), W], [W, W, W, W, W]], [1, 2]]
  );
  t.deepEqual(
    move([[W, W, W, W, W], [W, E(), C, E(), W], [W, W, W, W, W]], [1, 1]),
    [[[W, W, W, W, W], [W, E(), C, E(), W], [W, W, W, W, W]], [1, 1]]
  );
  t.deepEqual(
    move(
      [[W, W, W, W, W, W], [W, E(), C, C, G(), W], [W, W, W, W, W, W]],
      [1, 1]
    ),
    [[[W, W, W, W, W, W], [W, C, E(), C, G(), W], [W, W, W, W, W, W]], [1, 2]]
  );
  t.deepEqual(
    move(
      [
        [W, W, W, W, W],
        [W, E(), C, C, W],
        [W, C, W, C, W],
        [W, C, C, G(), W],
        [W, W, W, W, W]
      ],
      [1, 1]
    ),
    [
      [
        [W, W, W, W, W],
        [W, C, E(), C, W],
        [W, C, W, C, W],
        [W, C, C, G(), W],
        [W, W, W, W, W]
      ],
      [1, 2]
    ]
  );
});

test("getNextPlan", t => {
  const round0 = [
    [W, W, W, W, W, W, W],
    [W, C, G(), C, C, C, W],
    [W, C, C, C, E(), G(), W],
    [W, C, W, C, W, G(), W],
    [W, C, C, G(), W, E(), W],
    [W, C, C, C, C, C, W],
    [W, W, W, W, W, W, W]
  ];
  const round1 = [
    [W, W, W, W, W, W, W],
    [W, C, C, G(), C, C, W],
    [W, C, C, C, E(197), G(197), W],
    [W, C, W, G(), W, G(197), W],
    [W, C, C, C, W, E(197), W],
    [W, C, C, C, C, C, W],
    [W, W, W, W, W, W, W]
  ];
  const round2 = [
    [W, W, W, W, W, W, W],
    [W, C, C, C, G(), C, W],
    [W, C, C, G(), E(188), G(194), W],
    [W, C, W, C, W, G(194), W],
    [W, C, C, C, W, E(194), W],
    [W, C, C, C, C, C, W],
    [W, W, W, W, W, W, W]
  ];
  const round23 = [
    [W, W, W, W, W, W, W],
    [W, C, C, C, G(), C, W],
    [W, C, C, G(), C, G(131), W],
    [W, C, W, C, W, G(131), W],
    [W, C, C, C, W, E(131), W],
    [W, C, C, C, C, C, W],
    [W, W, W, W, W, W, W]
  ];
  const round24 = [
    [W, W, W, W, W, W, W],
    [W, C, C, G(), C, C, W],
    [W, C, C, C, G(131), C, W],
    [W, C, W, G(), W, G(128), W],
    [W, C, C, C, W, E(128), W],
    [W, C, C, C, C, C, W],
    [W, W, W, W, W, W, W]
  ];
  const round25 = [
    [W, W, W, W, W, W, W],
    [W, C, G(), C, C, C, W],
    [W, C, C, G(131), C, C, W],
    [W, C, W, C, W, G(125), W],
    [W, C, C, G(), W, E(125), W],
    [W, C, C, C, C, C, W],
    [W, W, W, W, W, W, W]
  ];
  const round26 = [
    [W, W, W, W, W, W, W],
    [W, G(), C, C, C, C, W],
    [W, C, G(131), C, C, C, W],
    [W, C, W, C, W, G(122), W],
    [W, C, C, C, W, E(122), W],
    [W, C, C, G(), C, C, W],
    [W, W, W, W, W, W, W]
  ];
  const round27 = [
    [W, W, W, W, W, W, W],
    [W, G(), C, C, C, C, W],
    [W, C, G(131), C, C, C, W],
    [W, C, W, C, W, G(119), W],
    [W, C, C, C, W, E(119), W],
    [W, C, C, C, G(), C, W],
    [W, W, W, W, W, W, W]
  ];
  const round28 = [
    [W, W, W, W, W, W, W],
    [W, G(), C, C, C, C, W],
    [W, C, G(131), C, C, C, W],
    [W, C, W, C, W, G(116), W],
    [W, C, C, C, W, E(113), W],
    [W, C, C, C, C, G(), W],
    [W, W, W, W, W, W, W]
  ];
  const round47 = [
    [W, W, W, W, W, W, W],
    [W, G(), C, C, C, C, W],
    [W, C, G(131), C, C, C, W],
    [W, C, W, C, W, G(59), W],
    [W, C, C, C, W, C, W],
    [W, C, C, C, C, G(), W],
    [W, W, W, W, W, W, W]
  ];
  t.deepEqual(getNextPlan(ATTACK_POINT)(round1), round2);
  t.deepEqual(new Array(21).fill(0).reduce(getNextPlan(ATTACK_POINT), round2), round23);
  t.deepEqual(getNextPlan(ATTACK_POINT)(round23), round24);
  t.deepEqual(getNextPlan(ATTACK_POINT)(round24), round25);
  t.deepEqual(getNextPlan(ATTACK_POINT)(round25), round26);
  t.deepEqual(getNextPlan(ATTACK_POINT)(round26), round27);
  t.deepEqual(new Array(19).fill(0).reduce(getNextPlan(ATTACK_POINT), round28), round47);
  t.deepEqual(getNextPlan(ATTACK_POINT)(round47), round47);
});

test("resolvePart1", t => {
  t.deepEqual(
    resolvePart1(`
      #######
      #G..#E#
      #E#E.E#
      #G.##.#
      #...#E#
      #...E.#
      #######
    `),
    36334
  );
  t.deepEqual(
    resolvePart1(`
      #######
      #E..EG#
      #.#G.E#
      #E.##E#
      #G..#.#
      #..E#.#
      #######
    `),
    39514
  );
  t.deepEqual(
    resolvePart1(`
      #######
      #E.G#.#
      #.#G..#
      #G.#.G#
      #G..#.#
      #...E.#
      #######
    `),
    27755
  );
  t.deepEqual(
    resolvePart1(`
      #######
      #.E...#
      #.#..G#
      #.###.#
      #E#G#G#
      #...#G#
      #######
    `),
    28944
  );
  t.deepEqual(
    resolvePart1(`
      #########
      #G......#
      #.E.#...#
      #..##..G#
      #...##..#
      #...#...#
      #.G...G.#
      #.....G.#
      #########
    `),
    18740
  );

  t.deepEqual(
    resolvePart1(`
      ################################
      #######..##########.##.G.##.####
      #######...#######........#..####
      #######..G.######..#...##G..####
      ########..G###........G##...####
      ######....G###....G....###.#####
      ######....####..........##..####
      #######...###...........##..E..#
      #######.G..##...........#.#...##
      ######....#.#.....#..GG......###
      #####..#..G...G........G.#....##
      ##########.G.......G........####
      #########.G.G.#####EE..E...#####
      #########....#######.......#####
      #########...#########.......####
      ########....#########...G...####
      #########...#########.#....#####
      ##########..#########.#E...E####
      ######....#.#########........#.#
      ######..G.#..#######...........#
      #####.........#####.E......#####
      ####........................####
      ####.........G...####.....######
      ##................##......######
      ##..........##.##.........######
      #............########....E######
      ####..........#######.E...######
      ####........#..######...########
      ########....#.E#######....######
      #########...####################
      ########....####################
      ################################
    `),
    214731
  );
});

test.only('resolvePart2', t => {
  t.deepEqual(
    resolvePart2(`
      #######
      #.G...#
      #...EG#
      #.#.#G#
      #..G#E#
      #.....#
      #######
    `),
    4988
  );
  t.deepEqual(
    resolvePart2(`
      #######
      #E..EG#
      #.#G.E#
      #E.##E#
      #G..#.#
      #..E#.#
      #######
    `),
    31284
  );
  t.deepEqual(
    resolvePart2(`
      #######
      #E.G#.#
      #.#G..#
      #G.#.G#
      #G..#.#
      #...E.#
      #######
    `),
    3384
  );
  t.deepEqual(
    resolvePart2(`
      #######
      #.E...#
      #.#..G#
      #.###.#
      #E#G#G#
      #...#G#
      #######
    `),
    6308
  );
  t.deepEqual(
    resolvePart2(`
      #########
      #G......#
      #.E.#...#
      #..##..G#
      #...##..#
      #...#...#
      #.G...G.#
      #.....G.#
      #########
    `),
    1102
  );

  t.deepEqual(
    resolvePart2(`
      ################################
      #######..##########.##.G.##.####
      #######...#######........#..####
      #######..G.######..#...##G..####
      ########..G###........G##...####
      ######....G###....G....###.#####
      ######....####..........##..####
      #######...###...........##..E..#
      #######.G..##...........#.#...##
      ######....#.#.....#..GG......###
      #####..#..G...G........G.#....##
      ##########.G.......G........####
      #########.G.G.#####EE..E...#####
      #########....#######.......#####
      #########...#########.......####
      ########....#########...G...####
      #########...#########.#....#####
      ##########..#########.#E...E####
      ######....#.#########........#.#
      ######..G.#..#######...........#
      #####.........#####.E......#####
      ####........................####
      ####.........G...####.....######
      ##................##......######
      ##..........##.##.........######
      #............########....E######
      ####..........#######.E...######
      ####........#..######...########
      ########....#.E#######....######
      #########...####################
      ########....####################
      ################################
    `),
    53222
  );
});

/*
#########       #########   
#G......#       #.......#   
#.E.#...#       #.E.#...#   E(38)
#..##..G#       #..##...#   
#...##..#  -->  #...##..#   
#...#...#       #...#...#   
#.G...G.#       #.......#   
#.....G.#       #.......#   
#########       #########   

Combat ends after 30 full rounds
Elves win with 38 total hit points left
Outcome: 30 * 38 = 1140
*/