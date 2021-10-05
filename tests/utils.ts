export function sort(arr: number[]): number[] {
  return [...new Set(arr.sort((a, b) => a - b))];
}

export function createArrayOfUint(length: number, step = 1): number[] {
  const result: number[] = [];
  for (let i = 0; i < length; i += step) {
    result[i] = i;
  }
  return result;
}
export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function createArrayWithRandomInt(length: number, min: number, max: number): number[] {
  const iterateItems: number[] = [];
  for (let i = 0; i < length; i++) {
    iterateItems[i] = getRandomInt(min, max);
  }
  return iterateItems;
}
