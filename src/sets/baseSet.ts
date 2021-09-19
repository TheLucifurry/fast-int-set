import { MAX_ARRAY_LENGTH, MAX_BITS } from '../consts';

export default abstract class BaseSet {
  static MAX_UINT = MAX_ARRAY_LENGTH * MAX_BITS;

  abstract forEach(callback: (item: number) => void): void

  values(): number[] {
    const res: number[] = [];
    let ix = 0;
    this.forEach(item => res[ix++] = item);
    return res;
  }
}
