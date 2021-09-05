import { suite, save, add, complete, cycle } from 'benny';
import { MAX_ARRAY_LENGTH } from '../src/consts';
import FastSet from '../src/index';
// import IFastSet from '../index';
// const FastSet = await import('./index.js') as typeof IFastSet

const maxItem = MAX_ARRAY_LENGTH / 10_000;
let items: number[] = [];
let step = 10;
for (let i = 0; i < maxItem; i+=step) { items[i] = i; }

const iterateItems: number[] = [];
for (let i = 0; i < 500_000; i++) { iterateItems[i] = getRandomInt(0, maxItem); }

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function iterate(array: number[], cb: (item: number) => void) {
  for (let i = 0; i < array.length; i++) cb(array[i]);
}

suite(
  'Fast integer set',

  // add('Set', () => {
  //   new Set(items);
  // }),

  // add('UintSet init', () => {
  //   new FastSet.UintSet(items);
  // }),

  add('Set forEach', () => {
    const set = new Set(items);

    return () => {
      let res = 0;
      set.forEach(num=>{
        res += num;
      })
    };
  }),

  add('UintSet forEach', () => {
    const uintSet = new FastSet.UintSet(items);

    return () => {
      let res = 0;
      uintSet.forEach(num=>{
        res += num;
      })
    };
  }),

  cycle(),
  complete(),
  save({ file: 'index', version: '1.0.0' }),
  save({ file: 'index', format: 'chart.html' }),
);
