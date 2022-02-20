/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  add, complete, cycle, save, suite, configure,
} from 'benny';
import {
  getRandomInt, createArrayWithIntegers, iterate,
} from './utils.js';

const { UintSet, IntSet, createUintSet } = await import('../dist/index.js');

const MAX_ARRAY_LENGTH = 32;
const maxItem = MAX_ARRAY_LENGTH / 10_000;

const cases = [100, 1_000, 10_000]
  .map((itemsCount) => {
    const items = createArrayWithIntegers(0, itemsCount, () => getRandomInt(0, maxItem));
    const LibrarySet = UintSet;
    // const LibrarySet = IntSet; // Uncomment to benchmark library's Set of signed integer values

    return [
      // add(`new Set (${itemsCount})`, () => {
      //   const set = new Set(items);
      // }),
      add(`new UintSet (${itemsCount})`, () => {
        const set = new LibrarySet(items);
      }),
      add(`FuncUS (${itemsCount})`, () => {
        const set = createUintSet(items);
      }),

      // add(`Set add/has/delete (${itemsCount})`, () => {
      //   const set = new Set(items);

      //   return () => {
      //     items.forEach((i) => {
      //       set.add(i);
      //       set.has(i);
      //       set.delete(i);
      //     });
      //   };
      // }),
      add(`UintSet add/has/delete (${itemsCount})`, () => {
        const set = new LibrarySet(items);

        return () => {
          items.forEach((i) => {
            set.add(i);
            set.has(i);
            set.delete(i);
          });
        };
      }),
      add(`FuncUS add/has/delete (${itemsCount})`, () => {
        const set = createUintSet(items);

        return () => {
          items.forEach((i) => {
            set.add(i);
            set.has(i);
            set.delete(i);
          });
        };
      }),
    ];
  })
  .flat(1);

suite(
  'Native Set vs UintSet in target usage',

  ...cases,

  // add('Set get size', () => {
  //   const set = new Set(items);

  //   return () => {
  //     const setSize = set.size;
  //   };
  // }),
  // add('UintSet size', () => {
  //   const set = new UintSet(items);

  //   return () => {
  //     const setSize = set.size;
  //   };
  // }),

  // add('Set forEach', () => {
  //   const set = new Set(items);

  //   return () => {
  //     const sortedItems = [];
  //     set.forEach((item) => {
  //       sortedItems.push(item);
  //     });
  //   };
  // }),
  // add('UintSet forEach', () => {
  //   const set = new UintSet(items);

  //   return () => {
  //     const sortedItems = [];
  //     set.forEach((item) => {
  //       sortedItems.push(item);
  //     });
  //   };
  // }),

  // add('Set values', () => {
  //   const set = new Set(items);

  //   return () => {
  //     const values = set.values();
  //   };
  // }),
  // add('UintSet values', () => {
  //   const set = new UintSet(items);

  //   return () => {
  //     const values = set.values();
  //   };
  // }),

  cycle(),
  complete(),
  save({ file: 'index', format: 'chart.html' }),
  configure({
    // cases: {},
    // minDisplayPrecision: 100,
  }),
);
