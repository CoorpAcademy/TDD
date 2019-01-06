# Introduction

## Automata theory

Study of abstract machines and automata and the computational problems that can ve solved using them.

**Mathmematics + computer science**

![](https://upload.wikimedia.org/wikipedia/commons/a/a2/Automata_theory.svg)

## Combinational logic

cf Boolean algebra

![](https://courses.cs.washington.edu/courses/cse599/99sp/admin/Slides/Week1/img022.gif)

[![XOR](https://sub.allaboutcircuits.com/images/04298.png)](https://www.allaboutcircuits.com/textbook/digital/chpt-7/the-exclusive-or-function-xor/)

## Example : addition

- Half adder

![Half adder](https://i.stack.imgur.com/9nz6a.png)

- Full adder

![Full adder](https://i.stack.imgur.com/K07rV.png)

- 8bit full adder

![8bit full adder](https://i.stack.imgur.com/Dj6XM.jpg)

# Finite-State machine

It is an abstract machine thant can be in **exactly one** of **a finite number of states** at any given time. The FSM can change from one state to another in response to some **external inputs**.

Simple examples

- elevators
- traffic lights
- [combination locks](https://en.wikipedia.org/wiki/Combination_lock#Single-dial_locks)

## Example: coin-operated turnstile

![](https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Turnstile_state_machine_colored.svg/660px-Turnstile_state_machine_colored.svg.png)

| Current State | Input | Next State | Output |
| --- | --- | --- | --- |
| Locked | coin | Unlocked | Unlocks the turnstile so that the customer can push through. |
| Locked | push | Locked | None |
| Unlocked | coin | Unlocked | None
| Unlocked | push | Locked | When the customer has pushed through, locks the turnstile. |

# Deterministic finite automaton

It is a FSM that **accepts or rejects sequences of input**.

## [Format definition](https://en.wikipedia.org/wiki/Deterministic_finite_automaton#Formal_definition)

## Example

The folowing example is a DFA, with a binary alphabet, which requires that the input containes an even number of 0s.

![](https://upload.wikimedia.org/wikipedia/commons/9/9d/DFAexample.svg)

- States = {S0, S1}
- Inputs = {0, 1}
- Initial state = S1
- Final state = {S1}
- Transition =
    |        |  0 |  1 |
    | ------ | -- | -- |
    | **S1** | S2 | S1 |
    | **S2** | S1 | S2 |

# Nondeterministic finite automaton

Unlike DFA, for some state and input symbol, the next state may be nothing or two or more possible states.

![](https://upload.wikimedia.org/wikipedia/commons/f/f9/NFASimpleExample.svg)

- States = {p, q}
- Inputs = {0, 1}
- Initial state = p
- Final state = {q}
- Transition =
    |       | 0 |    1 |
    | ----- | - | ---- |
    | **p** | p | p, q |
    | **q** | Ø |    Ø |

A **deterministic finite-state machine** can be constructed equivalent to any **non-deterministic one**.

The powerset construction algorithm can **transform any nondeterministic automaton** into a (usually more complex) **deterministic automaton** with identical functionality. However, if the NFA has n states, the resulting DFA may have up to **2n states**, an exponentially larger number, which sometimes makes the construction impractical for large NFAs.

# [DFA minimization](https://en.wikipedia.org/wiki/DFA_minimization)

- Hopcroft's algorithm
- Moore's algorithm
- Brzozowski's algorithm

DFA's procedures doesn't works for NFA (P=PSPACE)

## Acceptors

Also called **recognizers** and **sequence detectors**, produce binary output indicating whether or not the received input is accepted.

![](https://upload.wikimedia.org/wikipedia/commons/a/a8/Fsm_parsing_word_nice.svg)

## Classifiers

Similar to an acceptor, but has more than two terminal states.

## Transducers

Generate output based on a given input and/or a state using actions.

### Moore machine

Generate output depends only on the state.

![](https://upload.wikimedia.org/wikipedia/commons/c/c3/Moore_Machine.svg)

#### Exemple

Construct a Moore Machine that counts the occurences of the sequence `abb` in any input strings over {a, b}.

### Mealy machine

Generate output depends on the state and the input.

#### Example: addition

binary notation

```txt
22 => 10110
13 => 1101
```

inverse binary notation

```txt
22 => 01101
13 => 1011
```

pad with zero

```txt
22 => 011010
13 => 101100
```

Input is a sequence of pair of bits

```txt
(0,1) => (1,0) => (1,1) => (0,1) => (1,0) => (0,0)
```

![](https://i.stack.imgur.com/x2sFZ.gif)

```
  (0,1)∣1   (1,0)∣1   (1,1)∣0   (0,1)∣0   (1,0)∣0   (0,0)∣1
0−−−−---->0−−−--−-->0−---−−−->1−−−−---->1−−−−---->1−−−----−>0
```

## Shortest path problem

![](https://upload.wikimedia.org/wikipedia/commons/3/3b/Shortest_path_with_direct_weights.svg)

## Go further

[Finite State Machines - Exercises](http://www.cs.cmu.edu/~tom7/211/fsm1.html)
[Problem Solving: Finite state machines](https://en.wikibooks.org/wiki/A-level_Computing_2009/AQA/Problem_Solving,_Programming,_Data_Representation_and_Practical_Exercise/Problem_Solving/Finite_state_machines)