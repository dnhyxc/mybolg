const bebel = {
  version: 7.2
}

console.log(bebel)

export const func = (a, b) => {
  return a + b
}

const res = func(9, 2)

console.log(res, 'res')

const arr = [2, , 3, , 5]

const arr1 = Array.from(arr)
console.log(arr1, 'arr1')

const test = arr.includes(2)
console.log(test, 'test')

Promise.resolve().finally();

class TestClass {

}

typeof a