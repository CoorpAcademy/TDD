const VARS = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000
};

const subtractNumbers = numbers => numbers.reduce((acc, next) => {
    return acc - next;
});

const addNumbers = numbers => numbers.reduce((acc, next) => acc + next, 0);

const groupNumbersByWeight = numbers => {
    return numbers.reduce(([headGroup, ...tailGroup], nextNumber) => {
        if (!headGroup) return [[nextNumber]];

        const [headNumber, ...tailNumber] = headGroup;

        if (headNumber < nextNumber)
            return [[nextNumber, headNumber, ...tailNumber], ...tailGroup];

        return [[nextNumber], headGroup, ...tailGroup];
    }, []);
};

const map = fun => arr => arr.map(fun);

export const toNumbers = input => {
    const chars = input.split('');
    const charsToValues = chars |> map(c => VARS[c]);

    return charsToValues
        |> groupNumbersByWeight 
        |> map(subtractNumbers) 
        |> addNumbers;
};
