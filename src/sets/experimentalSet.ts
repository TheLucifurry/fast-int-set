import each from '../utils/each';
import { MAX_ARRAY_LENGTH, MAX_BITS } from '../consts';
import countBits from '../utils/countBits';

export default class UintSet implements IFastSetUint {
  static MAX_UINT = MAX_ARRAY_LENGTH * MAX_BITS;
  static TAG = 'UintSet';

  P: number[];

  constructor(items: number[] = []) {
    this.P = [];
    each(items, this.add.bind(this))
  }

  get size(): number{
    let res = 0;
    each(this.P, (bits) => res += countBits(bits))
    return res
  }

  add(uint: number): void {
    const byte = 1 << ( uint % MAX_BITS );
    const index = Math.trunc(uint / MAX_BITS);
    this.P[index] |= byte;
  }

  has(uint: number): boolean {
    const byte = 1 << ( uint % MAX_BITS );
    const index = Math.trunc(uint / MAX_BITS);
    return (this.P[index] & byte) !== 0;
  }

  delete(uint: number): void {
    const byte = 1 << ( uint % MAX_BITS );
    const index = Math.trunc(uint / MAX_BITS);
    this.P[index] &= 0xffff ^ byte;
  }

  clear(): void {
    this.P = [];
  }

  forEach(callback: (item: number) => void): void {
    const data = this.P, len = data.length;
    for (let cellIndex = 0, item = 0; cellIndex < len; cellIndex++) {
      if(!data[cellIndex]) {
        item += MAX_BITS;
        continue;
      }
      for (let i = 0; i < MAX_BITS; i++, item++) {
        if(data[cellIndex] & (1 << i)) {
          callback(item);
        }
      }
    }
  }

  values(): number[] {
    const res: number[] = [];
    // const res: number[] = new Array(this.P.length);
    let ix = 0;
    this.forEach(item => res[ix++] = item);
    return res;
  }
}
