import { createArrayOfUint, createArrayWithRandomInt, sort } from './utils';

import { MAX_BITS } from '../src/consts';
import { UintSet } from '../src';

describe.each`
  case | constructor
  ${'Stable'} | ${UintSet}
`('FastIntSet: $case', ({ constructor: FIS }: { constructor: typeof UintSet })=>{
  // ${'Experimental'} | ${FastIntSet.ExpUintSet}
  it('Accept items in constructor and restores all items by method', ()=>{
    const fs = new FIS([0, 2, 5, 12, 13, 30]);

    expect(fs.values()).toStrictEqual([0, 2, 5, 12, 13, 30]);
  })

  it('Support many different integer values', ()=>{
    const items = [
      ...createArrayOfUint(MAX_BITS * 10),
      ...createArrayWithRandomInt(10, 1_000_000, FIS.MAX_INTEGER),
      FIS.MAX_INTEGER
    ];
    const itemsSorted = sort(items);
    const fs = new FIS(items);

    items.forEach(item => {
      expect(fs.has(item)).toBe(true);
    });

    fs.delete(FIS.MAX_INTEGER)
    expect(fs.has(FIS.MAX_INTEGER)).toBe(false);
  })

  it('Delete items', ()=>{
    const fs = new FIS([0, 1, 7, 11, 31, 42, 128]);
    fs.delete(7);
    fs.delete(666);
    fs.delete(31);
    expect(fs.values()).toStrictEqual([0, 1, 11, 42, 128]);
  })

  it('Counting items', ()=>{
    const fs = new FIS([0, 2, 15, 73, 143, 352, 1452, 31_412]);

    expect(fs.size).toBe(8);

    fs.add(1);
    fs.add(1);
    fs.add(1);
    expect(fs.size).toBe(9);

    fs.delete(1);
    fs.delete(352);
    fs.delete(2);
    fs.delete(2);
    expect(fs.size).toBe(6);
  })

  it('Check own item and deleting result', ()=>{
    const fs = new FIS([0, 2, 5]);
    expect(fs.has(2)).toBe(true);
    expect(fs.has(1)).toBe(false);
  })

  it('Support big items', ()=>{
    const fs = new FIS([30, 5125, 31, 99, 64, 846, 1032, 74_124, 14_412_124]);

    expect(fs.values()).toStrictEqual([30, 31, 64, 99, 846, 1032, 5125, 74_124, 14_412_124]);
  })

  it('Iterate every item', ()=>{
    const items = [0, 1, 2, 15, 16, 30, 5125, 31, 99, 64, 846, 1032, 74_124, 14_412_124];
    const itemsSorted = sort(items);
    const fs = new FIS(items);

    const outputItems: number[] = [];
    const cb = jest.fn((item) => {
      outputItems.push(item)
    });
    fs.forEach(cb);

    expect(cb).toHaveBeenCalledTimes(items.length)
    expect(outputItems).toStrictEqual(itemsSorted);
  })

  it('Method: intersection => new set with items present in both sets at the same time', ()=>{
    const fs1 = new FIS([0, 30, 25, 31, 99, 64, 8, 1_234, 1_235, 10_555]);
    const fs2 = new FIS([0, 1, 25, 3, 99, 63, 8, 1_234, 10_555, 10_558]);

    const result = fs1.intersection(fs2).values();

    expect(result).toStrictEqual([0, 8, 25, 99, 1_234, 10_555]);
  })

  it('Method: union => new set with all the items present in both sets', ()=>{
    const fs1 = new FIS([0, 30, 25, 31, 99, 64, 8, 1_234, 1_235, 10_555]);
    const fs2 = new FIS([1, 25, 3, 99, 63, 8, 1_234, 10_555, 12_558]);

    const result = fs1.union(fs2).values();

    expect(result).toStrictEqual([0, 1, 3, 8, 25, 30, 31, 63, 64, 99, 1_234, 1_235, 10_555, 12_558]);
  })

  it('Method: difference => new set without items present in received set', ()=>{
    const fs1 = new FIS([30, 25, 31, 99, 64, 8, 1_234, 1_235, 10_555, 32_964]);
    const fs2 = new FIS([0, 1, 25, 3, 99, 63, 8, 1_234, 10_555, 10_558, 32_964]);

    const result = fs1.difference(fs2).values();

    expect(result).toStrictEqual([30, 31, 64, 1_235]);
  })

  it('Method: symmetricDifference => new set of items found only in either this or in received set.', ()=>{
    const fs1 = new FIS([30, 25, 31, 99, 64, 8, 1_234, 1_235, 10_555]);
    const fs2 = new FIS([0, 1, 25, 3, 99, 63, 8, 1_234, 10_555, 12_558]);

    const result = fs1.symmetricDifference(fs2).values();

    expect(result).toStrictEqual([0, 1, 3, 30, 31, 63, 64, 1_235, 12_558]);
  })
})