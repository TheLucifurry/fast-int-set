/**
 * @description based on baseEach function from `lodash`
 * @see https://github.com/lodash/lodash/blob/master/.internal/baseEach.js
 */
export function each<T extends any[] | Uint32Array>(array: T, iteratee: (item: T[number]) => void): void {
  const { length } = array
  let index = -1
  while (++index < length) iteratee(array[index])
}
