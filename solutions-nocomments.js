"use strict";

(function () {
    console.log("charIndexes & stripAtIndexes Results ---")

    let charIndexes = function (s, chars) {
        chars = Array.from(chars);
        let indexes = s.split("")
            .map((item, index) => chars.includes(item) ? index : false)
            .filter(item => item !== false ? true : false);
        return [s, indexes];
    }

    let stripAtIndexes = function (s, indexes) {
        if (Array.isArray(s)) {
            [s, indexes] = s;
        }
        return s.split("")
            .reduce((curr, next, iter) => curr + (indexes.includes(iter) ? "" : next), "")
    }

    console.log(stripAtIndexes(charIndexes("red", "d"))) 
    console.log(stripAtIndexes(charIndexes("marshmallow", ["m", "l"]))) 
    console.log(stripAtIndexes("red", [0, 1])) 
    console.log(stripAtIndexes("red", [0, 2])) 

    console.log("countIterationsToMax Results ---")

    let countIterationsToMax = function (n, max) {
        let i = 0;
        let curr = 0;
        return (function acc() {
            i++;
            return (curr = curr + n) >= max ? [i, curr] : acc();
        }())
    }
    console.log(countIterationsToMax(2, 5));
    console.log(countIterationsToMax(5, 25));
    console.log(countIterationsToMax(10, 100));
    console.log(countIterationsToMax(3, 100));

    console.log("lazyMapper Results ---")

    let lazyMapper = function (cb) {
        let arr = [];
        return val => {
            arr.push(cb(val))
            return arr;
        }
    }
    let myQueue = lazyMapper(n => n + 10);

    console.log(myQueue(5))
    console.log(myQueue(10))
    console.log(myQueue(3))
    
    let myHelloQueue = lazyMapper(obj => "Hello " + obj.name + "!");
    
    console.log(myHelloQueue({
        name: "Andrew"
    }))
    console.log(myHelloQueue({
        name: "Bill Pullman"
    }))
    console.log(myHelloQueue({
        name: "Bill Paxton"
    }))

    console.log("staircase Results ---")

    let staircase = function (n) {
        let staircase = "";
        let i = 0;
        return (function acc() {
            staircase += " ".repeat(n - (++i)) + "#".repeat(i) + "\n";
            return i === n ? staircase : acc();
        }())
    }

    console.log(staircase(4));
    console.log(staircase(6));
    console.log(staircase(14));

    console.log("minMax Results ---")

    let minMax = function (arr) {
        let calcValues = [];
        arr.forEach((item, index) => {
            let arrCopy = [].concat(arr);
            arrCopy[index] = 0;
            calcValues.push(arrCopy.reduce(((curr, next) => curr + next), 0));
        })
        return [Math.min(...calcValues), Math.max(...calcValues)]
    }

    console.log(minMax([7, 3, 2, 1, 10])) 
    console.log(minMax([1, 2, 3, 4, 5])) 
    console.log(minMax([101, 231, 445, 643, 231]))
}())