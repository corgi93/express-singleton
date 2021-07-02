/**
 * reduce는 배열 순회하는 강력한 기능.
 * 우리가 배열 내장함수로 자주 쓰는 every, filter, map , includes, find, findIndex 등의 아버지!
 *
 *
 */

const numbers = [11, 22, 33, 44];
// total , value , index , array-> 누적값, 현재값, 인덱스, 전체 배열
const avg = numbers.reduce((total, value, index, array) => {
  console.log(total, value, index);

  console.log(typeof total)
  total += value;
  if (index === array.length - 1) {
    return total / array.length;
  } else {
    return total;
  }
}, 0);

console.log(avg);

const arr = ["pdf", "html", "gif", "gif", "gif", "html" ,"gif"];

const filteredArray = arr.reduce((count, fileType) => {
    console.log('count!' , count , 'fileType: ' , fileType)
    console.log(typeof count)
    count[fileType] = (count[fileType] ? count[fileType] : 0 ) + 1
    return count;
},{test : 10});

console.log(filteredArray);
