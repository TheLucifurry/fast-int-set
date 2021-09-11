import { MAX_BITS } from '../src/consts';
import FastSet from '../src/index';

function sort(arr: number[]): number[] {
  return arr.sort((a, b) => a - b);;
}

describe('FastSet', ()=>{
  // it('Accept items in constructor', ()=>{
  //   const fs = new FastSet.ExpUintSet([0, 2, 5, 12, 13, 30]);
  //   expect(fs.toString()).toBe('1000000000000000011000000100101');
  // })

  it('Count size of items', ()=>{
    let fs = new FastSet.ExpUintSet();
    fs.add(1);
    expect(fs.size).toBe(1);
    fs.delete(1);
    expect(fs.size).toBe(0);

    fs = new FastSet.ExpUintSet([0, 1, 2, 2, 15, 24, 73, 143, 352]);
    expect(fs.size).toBe(8);
  })

  it('Support all numbers of max bits count', ()=>{
    const items = [];
    for (let i = 0; i < MAX_BITS * 10; i++) {
      items.push(i)
    }
    const itemsSorted = sort(items);

    const fs = new FastSet.ExpUintSet(items);

    expect(fs.values()).toEqual(itemsSorted);
  })

  it('Store items in internal data', ()=>{
    const fs = new FastSet.ExpUintSet([0, 2, 5]);
    expect(fs.values()).toEqual([0, 2, 5]);
  })

  it('Delete items', ()=>{
    const fs = new FastSet.ExpUintSet([0, 1, 7, 11, 31, 42, 128]);
    fs.delete(7);
    fs.delete(666);
    fs.delete(31);
    expect(fs.values()).toEqual([0, 1, 11, 42, 128]);
  })

  // it('Return deletion flag', ()=>{
  //   const fs = new FastSet.ExpUintSet();
  //   fs.add(1);
  //   expect(fs.delete(0)).toBe(false);
  //   expect(fs.delete(1)).toBe(true);
  // })

  it('Check own item and deleting result', ()=>{
    const fs = new FastSet.ExpUintSet([0, 2, 5]);
    expect(fs.has(2)).toBe(true);
    expect(fs.has(1)).toBe(false);
    // expect(fs.delete(5)).toBe(true);
    // expect(fs.delete(5)).toBe(false);
    // expect(fs.delete(4)).toBe(false);
  })

  it('Support big items', ()=>{
    const fs = new FastSet.ExpUintSet([30, 5125, 31, 99, 64, 846, 1032, 74_124, 14_412_124]);

    expect(fs.values()).toEqual([30, 31, 64, 99, 846, 1032, 5125, 74_124, 14_412_124]);
  })

  it('Iterate every item', ()=>{
    const items = [30, 5125, 31, 99, 64, 846, 1032, 74_124, 14_412_124];
    const itemsSorted = sort(items);
    const fs = new FastSet.ExpUintSet(items);
    let ix = 0;

    fs.forEach(function(item){
      expect(item).toBe(itemsSorted[ix++]);
    });
  })
})