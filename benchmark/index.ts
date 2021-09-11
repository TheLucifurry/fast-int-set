import { suite, save, add, complete, cycle } from 'benny';
import { MAX_ARRAY_LENGTH } from '../src/consts';
import FastSet from '../src/index';
import { addMany, arrayOfUint } from './utils';
// import IFastSet from '../index';
// const FastSet = await import('./index.js') as typeof IFastSet

const maxItem = MAX_ARRAY_LENGTH / 10_000;
const items = arrayOfUint(maxItem, 10);

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

  // add('===', () => {
  //   let variable;

  //   return ()=>{
  //     return variable ? 1 : 0;
  //   };
  // }),

  // add('typeof', () => {
  //   let variable;

  //   return ()=>{
  //     if (variable) {
  //       return 1;
  //     } else {
  //       return 0;
  //     }
  //   }
  // }),

  // add('Set', () => {
  //   new Set(items);
  // }),

  // add('UintSet init', () => {
  //   new FastSet.UintSet(items);
  // }),

  // add('ExpUintSet init', () => {
  //   new FastSet.ExpUintSet(items);
  // }),


  // ...addMany([10_000, 1_000_000], (size) => [
  //   add(`Set create (${size} items)`, () => {
  //     const items = arrayOfUint(size);

  //     return () => {
  //       new Set(items);
  //     };
  //   }),
  //   add(`UintSet create (${size} items)`, () => {
  //     const items = arrayOfUint(size);

  //     return () => {
  //       new FastSet.UintSet(items);
  //     };
  //   }),
  // ]),

  // add('Set forEach', () => {
  //   const set = new Set(items);

  //   return () => {
  //     let res = 0;
  //     set.forEach(num=>{
  //       res += num;
  //     })
  //   };
  // }),

  // add('UintSet forEach', () => {
  //   const uintSet = new FastSet.UintSet(items);

  //   return () => {
  //     let res = 0;
  //     uintSet.forEach(num=>{
  //       res += num;
  //     })
  //   };
  // }),

  // add('ExpUintSet forEach', () => {
  //   const uintSet = new FastSet.ExpUintSet(items);

  //   return () => {
  //     let res = 0;
  //     uintSet.forEach(num=>{
  //       res += num;
  //     })
  //   };
  // }),

  add('UintSet add/delete', () => {
    const items = arrayOfUint(10_000);
    const uintSet = new FastSet.UintSet(items);

    return () => {
      items.forEach(i=>{
        uintSet.add(i);
        uintSet.delete(i);
      })
    };
  }),

  add('ExpUintSet add/delete', () => {
    const items = arrayOfUint(10_000);
    const uintSet = new FastSet.ExpUintSet(items);

    return () => {
      items.forEach(i=>{
        uintSet.add(i);
        uintSet.delete(i);
      })
    };
  }),

  // add('Set values', () => {
  //   const set = new Set(items);

  //   return () => set.values();;
  // }),

  // add('UintSet values', () => {
  //   const uintSet = new FastSet.UintSet(items);

  //   return () => uintSet.values();;
  // }),

  cycle(),
  complete(),
  save({ file: 'index' }),
  save({ file: 'index', format: 'chart.html' }),
  save({ file: 'index', format: 'table.html' }),
);
