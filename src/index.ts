import { MAX_BITS } from './consts';

type FSData = Int32Array | Array<number>;

interface IFastSet extends Set<number> {
  _data: FSData
  toString: (separator: string) => string
}

export default class FastSet implements IFastSet {
  _data: FSData
  size: number = 0

  constructor(items: number[] = []) {
    this._data = [];
    items.forEach(this.add.bind(this));
  }

  add(uint: number): this {
    const byte = 1 << ( uint % MAX_BITS );
    const index = Math.trunc(uint / MAX_BITS);
    if(this._data[index] === undefined){
      this._data[index] = 0;
    }
    this._data[index] |= byte;
    this.size++;
    return this;
  }

  has(uint: number): boolean {
    const byte = 1 << ( uint % MAX_BITS );
    const index = Math.trunc(uint / MAX_BITS);
    return (this._data[index] & byte) !== 0;
  }

  delete(uint: number): boolean {
    if(!this.has(uint)) return false;
    const byte = 1 << ( uint % MAX_BITS );
    const index = Math.trunc(uint / MAX_BITS);
    this._data[index] ^= byte;
    this.size--;
    return true;
  }

  clear(): void {
    this._data = [];
    this.size = 0;
  }

  forEach(callback: (uint: number, value2: number, set: this) => void, thisArg?: any): void {
    let flag = 0;
    for (let cellIndex = 0; cellIndex < this._data.length; cellIndex++) {
      const bits = this._data[cellIndex];
      for (let i = 0; i < MAX_BITS; i++, flag++) {
        bits & (1 << i)
          && callback.call(thisArg, flag, flag, this);
      }
    }
  }

  entries(): IterableIterator<[number, number]> {
    throw new Error('Method not implemented.');
  }

  keys(): IterableIterator<number> {
    throw new Error('Method not implemented.');
  }

  values(): IterableIterator<number> {
    throw new Error('Method not implemented.');
  }

  toString(separator: string = ''): string {
    const res = [];
    for (let ix = 0; ix < this._data.length; ix++) {
      const bits = this._data[ix] || 0;
      this._data[ix] = bits;
      res.push(bits);
    }
    return res
      .map(bits => bits
        .toString(2)
        .padStart(MAX_BITS, '0')
      )
      .reverse()
      .join(separator);
  }

  [Symbol.toStringTag] = 'FastSet';

  [Symbol.iterator](): IterableIterator<number> {
    throw new Error('Method not implemented.');
  }
}
