import test from 'ava';
import toNumbers from '../app';

test('foo', t => {
  t.pass();
});

const macro = (t, input, expected) => {
  const current = toNumbers(input);
  t.is(current, expected);
};

macro.title = (t, input, expected) => `#toNumber(${input}) === ${expected}`;

test(macro, 'MM', 2000);
test(macro, 'MMI', 2001);
test(macro, 'MCMXLIV', 1944);
test(macro, 'MMCMXLIV', 2944);
test(macro, 'CM', 900);
test(macro, '', 0);
