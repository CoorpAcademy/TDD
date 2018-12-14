import test from "ava";
import {
  Edges,
  inputToEdges,
  getChildren,
  getParents,
  getRootNodes,
  getOrderCompletedSteps
} from "../day_7";

const testInput = `Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.`;

const testEdges: Edges = [
  ["C", "A"],
  ["C", "F"],
  ["A", "B"],
  ["A", "D"],
  ["B", "E"],
  ["D", "E"],
  ["F", "E"]
];

test("inputToEdges", t => {
  const actual = inputToEdges(testInput);
  const expected = testEdges;
  t.deepEqual(actual, expected);
});
test("getChildren", t => {
  const actual = getChildren(testEdges)("A");
  const expected = ["B", "D"];
  t.deepEqual(actual, expected);
});
test("getParents", t => {
  const actual = getParents(testEdges)("E");
  const expected = ["B", "D", "F"];
  t.deepEqual(actual, expected);
});
test("getRootNodes", t => {
  const actual = getRootNodes(testEdges);
  const expected = ["C"];
  t.deepEqual(actual, expected);
});
test("getOrderCompletedSteps", t => {
  const actual = getOrderCompletedSteps(testInput);
  const expected = "CABDFE";
  t.deepEqual(actual, expected);
});
test("getOrderCompletedSteps#2", t => {
  const actual = getOrderCompletedSteps(`Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step A must be finished before step F can begin.
Step B must be finished before step C can begin.
Step B must be finished before step D can begin.
Step D must be finished before step C can begin.`);
  const expected = "ABDCF";
  t.deepEqual(actual, expected);
});
