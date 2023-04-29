const express = require("express");
const ExpressError = require("./expressError");

const app = express();
app.use(express.json());

app.get("/mean", (req, res, next) => {
  try {
    const nums = req.query.nums.split(",").map(Number);

    console.log(nums);

    if (nums.includes(NaN)) {
      throw new ExpressError(`nums must = only numbers`, 400);
    }

    if (nums.length === 1 && nums.includes(0)) {
      throw new ExpressError(`numbers are required`, 400);
    }

    const sum = nums.reduce((acc, num) => acc + num, 0);
    const mean = sum / nums.length;

    return res.json({
      operation: "mean",
      value: mean,
    });
  } catch (e) {
    next(e);
  }
});

app.get("/median", (req, res, next) => {
  try {
    let median;
    const nums = req.query.nums.split(",").map(Number);
    const sortedNums = nums.sort((a, b) => a - b);
    const midIndex = Math.floor(nums.length / 2);

    if (sortedNums.length % 2 === 0) {
      median = [sortedNums[midIndex - 1] + sortedNums[midIndex]] / 2;
    } else {
      median = [sortedNums[midIndex]];
    }

    if (nums.includes(NaN)) {
      throw new ExpressError(`nums must = only numbers`, 400);
    }

    if (nums.length === 1 && nums.includes(0)) {
      throw new ExpressError(`numbers are required`, 400);
    }

    console.log(sortedNums);
    return res.json({
      operation: "median",
      value: median,
    });
  } catch (e) {
    next(e);
  }
});

app.get("/mode", (req, res, next) => {
  try {
    let obj = {};
    let mode = "";
    let highVal = -Infinity;
    const nums = req.query.nums.split(",").map(Number);
    const sortedNums = nums.sort((a, b) => a - b);

    if (nums.includes(NaN)) {
      throw new ExpressError(`nums must = only numbers`, 400);
    }

    if (nums.length === 1 && nums.includes(0)) {
      throw new ExpressError(`numbers are required`, 400);
    }

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

    res.json({
      operation: "mode",
      value: mode,
    });
  } catch (e) {
    next(e);
  }
});

app.use((req, res, next) => {
  const notFoundError = new ExpressError("Not Found", 404);
  return next(notFoundError);
});

app.use((err, req, res, next) => {
  let status = err.status || 500;
  let msg = err.message;

  return res.status(status).json({
    error: { msg, status },
  });
});

const server = app.listen(3000, function () {
  console.log("Server started on port 3000.");
});
