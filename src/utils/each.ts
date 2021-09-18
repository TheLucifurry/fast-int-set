/**
 * @description based on baseEach function from lodash.js
 * @see https://github.com/lodash/lodash/blob/master/.internal/baseEach.js
 */
export default function each<T extends any[] | Uint32Array>(array: T, iteratee: (item: T[number]) => void) {
  const length = array.length
  let index = -1
  while (++index < length)
    iteratee(array[index])
}
