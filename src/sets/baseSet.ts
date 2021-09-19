import { MAX_ARRAY_LENGTH, MAX_BITS } from '../consts';

export default abstract class BaseSet implements IStore {
  static MAX_INTEGER = MAX_ARRAY_LENGTH * MAX_BITS;
  D: [DataField, DataField] = [[], []]

  abstract forEach(callback: (item: number) => void): void

  clear(): void {
    this.D = [[], []];
  }

  values(): number[] {
    const res: number[] = [];
    let ix = 0;
    this.forEach(item => res[ix++] = item);
    return res;
  }
}
