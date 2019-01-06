export const DFA = <State, Input>(
  initialState: State,
  finalStates: Array<State>,
  transition: (state: State, input: Input) => State
) => (inputs: Array<Input>): boolean => {
  const resultState = inputs.reduce(
    (state, input) => transition(state, input),
    initialState
  );
  return finalStates.includes(resultState);
};

const flatten = <T>(a: Array<Array<T>>): Array<T> =>
  a.reduce((a, b) => a.concat(b), []);
export const NFA = <State, Input>(
  initialState: State,
  finalStates: Array<State>,
  transition: (state: State, input: Input) => Array<State>
) => (inputs: Array<Input>): boolean => {
  const resultStates = inputs.reduce(
    (states, input) => flatten(states.map(state => transition(state, input))),
    [initialState]
  );

  return resultStates.some(resultState =>
    finalStates.includes(resultState)
  );
};

export const MooreMachine = <State, Input, Output>(
  initialState: State,
  transition: (state: State, input: Input) => State,
  toOutput: (state: State) => Output
) => (inputs: Array<Input>): Array<Output> => {
  return inputs.reduce(
    (
      [state, outputs]: [State, Array<Output>],
      input
    ): [State, Array<Output>] => {
      const nextState = transition(state, input);
      const output = toOutput(nextState);
      return [nextState, [...outputs, output]];
    },
    [initialState, []]
  )[1];
};

export const MealyMachine = <State, Input, Output>(
  initialState: State,
  transition: (state: State, input: Input) => [State, Output]
) => (inputs: Array<Input>): Array<Output> => {
  return inputs.reduce(
    (
      [state, outputs]: [State, Array<Output>],
      input
    ): [State, Array<Output>] => {
      const [nextState, output] = transition(state, input);
      return [nextState, [...outputs, output]];
    },
    [initialState, []]
  )[1];
};
