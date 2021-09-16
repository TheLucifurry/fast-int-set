import { sort, createArrayOfUint, createArrayWithRandomInt } from './utils';
import { MAX_BITS } from '../src/consts';
import FastIntSet from '../src/index';

describe.each`
  case | constructor
  ${'Stable'} | ${FastIntSet.UintSet}
  ${'Experimental'} | ${FastIntSet.ExpUintSet}
`('FastIntSet: $case', ({ constructor: FIS })=>{
  it('Accept items in constructor and restores all items by method', ()=>{
    const fs = new FIS([0, 2, 5, 12, 13, 30]);

    expect(fs.values()).toStrictEqual([0, 2, 5, 12, 13, 30]);
  })

  it('Support many different integer values', ()=>{
    const items = [
      ...createArrayOfUint(MAX_BITS * 10),
      ...createArrayWithRandomInt(10, 1_000_000, FIS.MAX_UINT),
      FIS.MAX_UINT
    ];
    const itemsSorted = sort(items);
    const fs = new FIS(items);

    items.forEach(item => {
      expect(fs.has(item)).toBe(true);
    });

    fs.delete(FIS.MAX_UINT)
    expect(fs.has(FIS.MAX_UINT)).toBe(false);
  })

  it('Delete items', ()=>{
    const fs = new FIS([0, 1, 7, 11, 31, 42, 128]);
    fs.delete(7);
    fs.delete(666);
    fs.delete(31);
    expect(fs.values()).toStrictEqual([0, 1, 11, 42, 128]);
  })

  it('Counting items', ()=>{
    const fs = new FIS([0, 2, 15, 73, 143, 352]);

    expect(fs.size).toBe(6);

    fs.add(1);
    fs.add(1);
    fs.add(1);
    expect(fs.size).toBe(7);

    fs.delete(1);
    fs.delete(352);
    fs.delete(2);
    fs.delete(2);
    expect(fs.size).toBe(4);
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
})