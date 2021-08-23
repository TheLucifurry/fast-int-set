import { MAX_BITS } from '../src/consts';
import FastSet from '../src/index';

describe('FastSet', ()=>{
  it('Accept items in constructor', ()=>{
    const fs = new FastSet([0, 2, 5, 12, 13, 30]);
    expect(fs.toString()).toBe('1000000000000000011000000100101');
  })

  it('Count size of items', ()=>{
    const fs = new FastSet();
    fs.add(1);
    expect(fs.size).toBe(1);
    fs.delete(1);
    expect(fs.size).toBe(0);
  })

  it('Support all numbers of max bits count', ()=>{
    const items = [];
    for (let i = 0; i < MAX_BITS*2; i++) {
      items.push(i)
    }
    const fs = new FastSet(items);
    expect(fs.toString()).toBe('1'.repeat(MAX_BITS*2));
  })

  it('Return deletion flag', ()=>{
    const fs = new FastSet();
    fs.add(1);
    expect(fs.delete(0)).toBe(false);
    expect(fs.delete(1)).toBe(true);
  })

  it('Check own item and deleting result', ()=>{
    const fs = new FastSet([0, 2, 5]);
    expect(fs.has(2)).toBe(true);
    expect(fs.has(1)).toBe(false);
    expect(fs.delete(5)).toBe(true);
    expect(fs.delete(5)).toBe(false);
    expect(fs.delete(4)).toBe(false);
  })

  it('Store items in internal data', ()=>{
    const fs = new FastSet([0, 2, 5]);
    expect(fs.toString()).toBe('0000000000000000000000000100101');
    fs.delete(2);
    expect(fs.toString()).toBe('0000000000000000000000000100001');
  })

  it('Support big items', ()=>{
    const fs = new FastSet([30, 31, 99, 60, 63, 64, 95, 97]);

    expect(fs.toString('\n')).toBe([
      '0000000000000000000000001010100',
      '0000000000000000000000000000110',
      '0100000000000000000000000000001',
      '1000000000000000000000000000000',
    ].join('\n'));
  })

  it('Iterate every item', ()=>{
    const items = [0, 2, 5];
    const fs = new FastSet(items);
    let ix = 0;

    fs.forEach(function(item, itemCopy, set){
      expect(item).toBe(items[ix++]);
      expect(item).toBe(itemCopy);
      expect(set).toBe(fs);
    });
  })
})