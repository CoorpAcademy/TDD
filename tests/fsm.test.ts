import test from "ava";
import { DFA, NFA, MooreMachine, MealyMachine } from "../fsm";

test("DFA#isOdd", t => {
  /*
    |    |  0 |  1 |
    | -- | -- | -- |
    | S1 | S2 | S1 |
    | S2 | S1 | S2 |
*/

  type State = "Even" | "Odd";
  type Input = "0" | "1";
  const INITIAL_STATE: State = "Even";
  const FINAL_STATES: Array<State> = ["Odd"];

  const transition = (state: State, input: Input): State => {
    if (state === "Even")
      if (input === "0") return "Even";
      // input === "1"
      else return "Odd";
    // state === "Odd"
    else if (input === "0") return "Odd";
    // input === "1"
    else return "Even";
  };

  const isOddDFA = DFA<State, Input>(INITIAL_STATE, FINAL_STATES, transition);

  t.false(isOddDFA(["0", "0"]));
  t.true(isOddDFA(["0", "1"]));
  t.false(isOddDFA(["1", "1"]));
  t.true(isOddDFA(["1", "0"]));
});

test("DFA#containsFOO", t => {
  type State = "None" | "ContainsF" | "ContainsFO" | "ContainsFOO";
  type Input =
    | "A"
    | "B"
    | "C"
    | "D"
    | "E"
    | "F"
    | "G"
    | "H"
    | "I"
    | "J"
    | "K"
    | "L"
    | "M"
    | "N"
    | "O"
    | "P"
    | "Q"
    | "R"
    | "S"
    | "T"
    | "U"
    | "V"
    | "W"
    | "X"
    | "Y"
    | "Z";
  const INITIAL_STATE: State = "None";
  const FINAL_STATES: Array<State> = ["ContainsFOO"];

  const transition = (state: State, input: Input): State => {
    if (state === "ContainsFOO") return state;
    if (state === "ContainsFO")
      if (input === "O") return "ContainsFOO";
      else if (input === "F") return "ContainsF";
      else return "None";
    if (state === "ContainsF")
      if (input === "O") return "ContainsFO";
      else if (input === "F") return "ContainsF";
      else return "None";
    // state === "None"
    else if (input === "F") return "ContainsF";
    else return "None";
  };

  const containsFOO = DFA<State, Input>(INITIAL_STATE, FINAL_STATES, transition);

  t.true(containsFOO(["F", "O", "O"]));
  t.true(containsFOO(["F", "O", "O", "A"]));
  t.true(containsFOO(["A", "F", "O", "O"]));
  t.true(containsFOO(["F", "F", "O", "O"]));
  t.true(containsFOO(["F", "O", "F", "O", "O"]));

  t.false(containsFOO(["A", "B", "C"]));
  t.false(containsFOO(["F", "O"]));
  t.false(containsFOO(["F"]));
  t.false(containsFOO([]));
});

test("NFA#(0|1)*1", t => {
  /*
    |    |  0 |      1 |
    | -- | -- | ------ |
    | S1 | S1 | S1, S2 |
    | S2 |    |        |
*/

  type State = "p" | "q";
  type Input = "0" | "1";
  const INITIAL_STATE: State = "p";
  const FINAL_STATES: Array<State> = ["q"];

  const transition = (state: State, input: Input): Array<State> => {
    if (state === "p")
      if (input === "0") return ["p"];
      // input === "1"
      else return ["p", "q"];
    // state === "Odd"
    else if (input === "0") return [];
    // input === "1"
    else return [];
  };

  const regexpNFA = NFA<State, Input>(INITIAL_STATE, FINAL_STATES, transition);

  t.true(regexpNFA(["1", "0", "1", "1"]));
  t.true(regexpNFA(["0", "1"]));
  t.false(regexpNFA(["0", "0"]));
  t.false(regexpNFA(["0", "0", "0"]));
});

test("MooreMachine#abb", t => {
  type State = "A" | "B" | "C" | "D";
  type Input = "a" | "b";
  type Output = 0 | 1;
  const INITIAL_STATE: State = "A";
  const transition = (state: State, input: Input): State => {
    if (state === "A")
      if (input === "a") return "B";
      // input === "b"
      else return "A";
    else if (state === "B")
      if (input === "a") return "B";
      // input === "b"
      else return "C";
    else if (state === "C")
      if (input === "a") return "B";
      // input === "b"
      else return "D";
    // state === "D"
    else if (input === "a") return "B";
    // input === "b"
    else return "A";
  };
  const toOutput = (state: State): Output => {
    if (state === "A") return 0;
    else if (state === "B") return 0;
    else if (state === "C") return 0;
    // state === "D"
    else return 1;
  };

  const abbMM = MooreMachine<State, Input, Output>(INITIAL_STATE, transition, toOutput);

  t.deepEqual(abbMM(["a", "b", "b"]), [0, 0, 1]);
  t.deepEqual(abbMM(["a", "b", "b", "a", "b", "b"]), [0, 0, 1, 0, 0, 1]);
  t.deepEqual(abbMM(["b", "a", "b", "b"]), [0, 0, 0, 1]);
});

test("MealyMachine#add", t => {
  type State = "None" | "Carry";
  type Input = [0 | 1, 0|1];
  type Output = 0 | 1;
  const INITIAL_STATE: State = "None";
  const transition = (state: State, [a, b]: Input): [State, Output] => {
    if (state === "None")
      if (a === 0 && b === 0) return ["None", 0];
      else if ((a === 0 && b === 1) || (a === 1 && b === 0)) return ["None", 1];
      else // a === 1 && b === 1
        return ["Carry", 0];
    else (state === "Carry")
      if (a === 0 && b === 0) return ["None", 1];
      else if ((a === 0 && b === 1) || (a === 1 && b === 0)) return ["Carry", 0];
      else // a === 1 && b === 1
        return ["Carry", 1];
  };

  const addMM = MealyMachine<State, Input, Output>(INITIAL_STATE, transition);

  t.deepEqual(addMM([
    [0, 1],
    [1, 0],
    [1, 1],
    [0, 1],
    [1, 0],
    [0, 0]
  ]), [1, 1, 0, 0, 0, 1]);
});
