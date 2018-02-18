"use strict";

(function(){
    // Complete the following two functions such that:
    // - charIndexes takes a string and a character (or array of characters) and returns the indexes of 
    //   each character's position in the string and the string itself as a tuple
    // - stripIndexes takes a tuple from charIndexes to return a string without
    //   those characters at the specified indexes
    // e.g.
    // stripAtIndexes( charIndexes( "marshmallow", ["m", "l"] ) )
    // returns "arshaow"
    // stripAtIndexes should be able to take EITHER a tuple or two arguments, for example:
    // stripAtIndexes("red", [0, 1]) // "d"
    // stripAtIndexes(["red", [0, 2]]) // "e"
    console.log("charIndexes & stripAtIndexes Results ---")

    let charIndexes = function ( s, chars ) {
        chars = Array.from(chars);
        
        let indexes = s.split("")
                        .map( (item, index) => chars.includes(item) ? index : false )
                        .filter( item => item !== false ? true : false );

        return [s, indexes];
    }

    let stripAtIndexes = function( s, indexes ) {
        if( Array.isArray(s) ){
            [s, indexes] = s;
        }
        
        return s.split("").reduce( (curr, next, iter) => curr + (indexes.includes(iter) ? "" : next), "" )
    }

    console.log( stripAtIndexes(charIndexes("red", "d")) ) // should equal "re"
    console.log( stripAtIndexes(charIndexes("marshmallow", ["m", "l"])) ) // should equal "arshaow"
    console.log( stripAtIndexes("red", [0, 1]) ) // should equal "d"
    console.log( stripAtIndexes("red", [0, 2]) ) // should equal "e"
    // Write a function that returns a recursive function that does the following:
    // - Takes two arguments, an iteration value and a max value
    // - Returns the the number of counts of the iteration + iteration (from zero) until
    //   the number would reach the max as well as the end result
    // - e.g. if the iteration number is 2, and the max is 5, it should return:
    //   [3, 6] because 2 + 2 + 2 (three counts of 2) is 6 which is greater than 
    //   or equal to the max of 5
    console.log("countIterationsToMax Results ---")

    let countIterationsToMax = function( n, max ){
        let i = 0;
        let curr = 0;
        return (function acc(n){
            i++;
            return (curr = curr + n) >= max ? [i, curr] : acc(n);
        }(n))
    }
    console.log( countIterationsToMax(2, 5) ); // should equal 3, 6
    console.log( countIterationsToMax(5, 25) ); // should equal 5, 25
    console.log( countIterationsToMax(10, 100) ); // should equal 10, 100
    console.log( countIterationsToMax(3, 100) ); // should equal 34, 102

    // Complete the function such that passing it an argument adds it to an 
    // array and returns all current items in the array with the callback function applied
    // e.g:
    // - let myQueue = lazyMapper((n) => n + 10);
    // - queue(5) // returns [15]
    // - queue(10) // returns [15, 20]
    // - queue(3) // returns [15, 20, 13]
    // use the ((n) => n + 10) callback above to check your work, this is equivalent to:
    // function(n){ return n + 10 }
    console.log("lazyMapper Results ---")

    let lazyMapper = function (cb) {
        let arr = [];
        return val => {
            arr.push(cb(val))
            return arr;
        }
    }

    let myQueue = lazyMapper(n => n + 10);

    console.log( myQueue(5) )
    console.log( myQueue(10) )
    console.log( myQueue(3) )   
    // Complete the function below to create a staircase.
    // A staircase of sum n = 4 would look like:
    //    #
    //   ##
    //  ###
    // ####
    // This should output to the console with the appropriate formatting.
    console.log("staircase Results ---")

    let staircase = function( n ){
        let staircase = "";
        let i = 0;
        return (function acc(){
            staircase += " ".repeat(n - (++i)) + "#".repeat(i) + "\n";
            return i === n ? staircase : acc();
        }())
    }

    console.log( staircase(4) );
    console.log( staircase(6) );
    console.log( staircase(14) );    

    // Complete the function below such that:
    // Given an array of 5 integers calculate the maximum and minimum sum of those integers.
    // Note that they will not necessarily be in order 
    // e.g. [7, 3, 2, 1, 10] // min: 13, max: 23
    // e.g. [1, 2, 3, 4, 5] // min: 10, max: 14
    console.log("minMax Results ---")

    let minMax = function( arr ) { 
        let calcValues = [];
        arr.forEach((item, index) => {
            let arrCopy = [].concat(arr);
            arrCopy[index] = 0;
            calcValues.push( arrCopy.reduce( ((curr, next) => curr + next), 0 ) );
        })

        return [ Math.min(...calcValues), Math.max(...calcValues) ]
    }

    console.log( minMax([7, 3, 2, 1, 10]) ) // should output [13, 22]
    console.log( minMax([1, 2, 3, 4, 5]) ) // should output [10, 14]
    console.log( minMax([101, 231, 445, 643, 231]) ) // should output [1008, 1550]    
}())