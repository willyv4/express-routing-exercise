function getMean(numbers) {
  const nums = numbers.split(",").map(Number);
  const sum = nums.reduce((acc, num) => acc + num, 0);
  return sum / nums.length;
}

function getMedian(numbers) {
  let median;
  const nums = numbers.split(",").map(Number);
  const sortedNums = nums.sort((a, b) => a - b);
  const midIndex = Math.floor(nums.length / 2);

  if (sortedNums.length % 2 === 0) {
    median = [sortedNums[midIndex - 1] + sortedNums[midIndex]] / 2;
  } else {
    median = [sortedNums[midIndex]];
  }
  return median;
}

function getMode(numbers) {
  let obj = {};
  let mode = "";
  let highVal = -Infinity;
  const nums = numbers.split(",").map(Number);
  const sortedNums = nums.sort((a, b) => a - b);

  for (let i = 0; i < sortedNums.length; i++) {
    let currNum = sortedNums[i];
    if (!obj[currNum]) {
      obj[currNum] = 1;
    } else {
      obj[currNum] += 1;
    }
  }

  for (let key in obj) {
    if (obj[key] > highVal) {
      highVal = obj[key];
      mode = key;
    }
  }

  return parseInt(mode);
}

module.exports = {
  getMean,
  getMedian,
  getMode,
};
