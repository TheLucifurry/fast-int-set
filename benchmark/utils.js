export function addMany(items, callback) {
  const addList = [];
  items.forEach((size) => {
    const result = callback(size);
    addList.push(...(Array.isArray(result) ? result : [result]));
  });
  return addList;
}

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function createArrayWithIntegers(fromInt, toInt, numberGeneratorCallback, step = 1) {
  const res = [];
  for (let i = fromInt; i < toInt; i += step) {
    res.push(numberGeneratorCallback ? numberGeneratorCallback() : i);
  }
  return res;
}

export function iterate(array, cb) {
  for (let i = 0; i < array.length; i++) cb(array[i]);
}
