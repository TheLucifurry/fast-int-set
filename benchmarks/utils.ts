export function createArrayWithSteppedIntegers(from: number, to: number, itemsCount: number) {
  const step = Math.trunc((to - from) / itemsCount)
  const res: number[] = []
  for (let i = 0; i < itemsCount; i++)
    res.push(from + step * i)
  return res
}
