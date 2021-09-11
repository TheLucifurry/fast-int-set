import { add } from 'benny'

type AddReturnType = ReturnType<typeof add>;

export function arrayOfUint(length: number, step = 1) {
  const result: number[] = [];
  for (let i = 0; i < length; i+=step) {
    result[i] = i;
  }
  return result;
}

export function addMany<T>(items: T[], callback: (size: T) => AddReturnType | AddReturnType[]) {
  const addList = [];
  items.forEach((size) => {
    const result = callback(size);
    addList.push(...(Array.isArray(result) ? result : [result]));
  });
  return addList;
};
