const count: number = 902209;

console.log(count);

interface Params {
  name: string;
  age: number;
}

const getInfo = (param: Params) => {
  return param;
};

const info = getInfo({ name: "dnhyxc", age: 18 });

console.log(info)
