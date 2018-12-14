export type Node = string;
export type Edge = [Node, Node];

const fst = <T, S>([a, _]: [T, S]): T => a;
const snd = <T, S>([_, b]: [T, S]): S => b;

export type Nodes = Array<Node>;
export type Edges = Array<Edge>;

export const getChildren = (edges:Edges) => (node:Node): Nodes => {
  const filteredEdges: Edges = edges.filter(([a, _]) => a === node);
  return filteredEdges.map(snd);
}
export const getParents = (edges:Edges) => (node:Node): Nodes => {
  const filteredEdges: Edges = edges.filter(([_, b]) => b === node);
  return filteredEdges.map(fst);
};

const unique = <T>(arr: Array<T>): Array<T> => {
    const valuesSet = new Set(arr);
    return Array.from(valuesSet.values());
};
export const getRootNodes = (edges:Edges): Nodes => {
    const childNodes: Nodes = unique(edges.map(snd));
    const parentNodes: Nodes = unique(edges.map(fst));

    return parentNodes.filter((p: Node): boolean => !childNodes.includes(p));
};

type Input = string

export const inputToEdges = (input: Input): Edges => {
  return input.split('\n').map( (el: string): Edge => {
      const [, a, , , , , , b] = el.split(' ');
      return [a, b];
  });  
};

type State = {
    edges: Edges,
    completedNodes: Nodes,
    currentNode: Node,
    nodesToRun: Nodes
};

const loop = ({edges, completedNodes, currentNode, nodesToRun}: State): State => {
    if (!currentNode) 
    return {edges, completedNodes, currentNode, nodesToRun};

    const parents = getParents(edges)(currentNode);
    if (!parents.every(node => completedNodes.includes(node))) {
        const [nextNode, ...nextNodesToRun] = nodesToRun;
        return loop({
            edges,
            completedNodes,
            currentNode: nextNode,
            nodesToRun: nextNodesToRun
        })
    }
    const children = getChildren(edges)(currentNode);

    const nextCompletedNodes = [...completedNodes, currentNode];
    const [nextNode, ...nextNodesToRun] = [...nodesToRun, ...children].sort().filter(child => !nextCompletedNodes.includes(child));
    return loop({
        edges,
        completedNodes: nextCompletedNodes,
        currentNode: nextNode, 
        nodesToRun: nextNodesToRun
    });
};

export const getOrderCompletedSteps = (input: string): string => {
    const edges = inputToEdges(input);
    const [currentNode, ...nodesToRun] = getRootNodes(edges).sort();
    const initialState: State = {
        edges,
        completedNodes: [],
        currentNode,
        nodesToRun
    };
    const finalState: State = loop(initialState);
    return finalState.completedNodes.join('');
}