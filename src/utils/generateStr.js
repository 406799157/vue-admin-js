/*
  len：长度
  model：
*/
export function generateRandomStr(len = 6, obj = { num: true, lower: true, upper: true }) {
  let arr = [];
  let str = "";
  obj.num ? addNumAscToArr(arr) : "";
  obj.lower ? addLowerAscToArr(arr) : "";
  obj.upper ? addUpperAscToArr(arr) : "";
  let arrLen = arr.length - 1;
  for(let i = 0; i < len; i ++) {
    str += String.fromCharCode(arr[getRandom(0, arrLen)]);
  }
  return str;
}

//获取随机数
const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const addAscToArr = (arr, min, max) => {
  for(let asc = min; asc <= max; asc ++) {
    arr.push(asc)
  }
  return arr;
}

const addNumAscToArr = arr => {
  return addAscToArr(arr, 48, 57);
}

const addUpperAscToArr = arr => {
  return addAscToArr(arr, 65, 90);
}

const addLowerAscToArr = arr => {
  return addAscToArr(arr, 97, 122);
}