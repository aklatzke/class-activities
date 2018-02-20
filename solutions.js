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
        // if chars isn't an array, create an array from it
        chars = Array.from(chars);
        // split the string into an array
        let indexes = s.split("")
                        // map the array, returning the index if the item exists, otherwise false
                        .map( (item, index) => chars.includes(item) ? index : false )
                        // filter out the false values from the array, leaving only the indexes
                        .filter( item => item !== false ? true : false );
        // return the string and indexes as a tuple
        return [s, indexes];
    }

    let stripAtIndexes = function( s, indexes ) {
        // if s is an array, rewrite the arguments to pull
        // the values from the tuple
        if( Array.isArray(s) ){
            // es6 array destructuring allows us to capture the values
            // from the array in a single statement
            [s, indexes] = s;
        }
        // split the string into an array, and then 
        return s.split("")
                // if the iteration count is in the indexes array, add the character to our
                // current value, otherwise add an empty string (essentially removing the character)
                .reduce( (curr, next, iter) => curr + (indexes.includes(iter) ? "" : next), "" )
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
        // create an i and curr value to hold our current iteration as well as 
        // our current additive number
        let i = 0;
        let curr = 0;
        // return a named function that can call itself until it's completed
        return (function acc(){
            i++;
            // add the current number + our n value. If it is higher than our max
            // return our [i, current] tuple, otherwise run the function again
            return (curr = curr + n) >= max ? [i, curr] : acc();
        }())
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
    // define a function that takes a callback as an argument
    let lazyMapper = function (cb) {
        // define the array that will serve as our data store
        // because it is defined outside of the returned function,
        // it will keep its state as it will be the variable in scope
        // for the function
        let arr = [];
        // return a function that will do the actual queueing
        return val => {
            // push the return value of the function after being
            // applied to the passed val argument into the arr
            arr.push(cb(val))
            // return the arr to return all of the values that have been
            // passed in with the cb applied
            return arr;
        }
    }
    // create an instance of the lazyMapper
    let myQueue = lazyMapper(n => n + 10);
    // call the lazyMapper, adding arguments to its queue and logging everything that has been added
    console.log( myQueue(5) )
    console.log( myQueue(10) )
    console.log( myQueue(3) )   
    // create another instance of the lazyMapper, this one that takes an object and returns
    // the name, concatted into a string
    let myHelloQueue = lazyMapper( obj => "Hello " + obj.name + "!" );

    console.log( myHelloQueue( { name : "Andrew" } ) )
    console.log( myHelloQueue( { name : "Bill Pullman" } ) )
    console.log( myHelloQueue( { name : "Bill Paxton" } ) )
    // Complete the function below to create a staircase.
    // A staircase of sum n = 4 would look like:
    //    #
    //   ##
    //  ###
    // ####
    // This should output to the console with the appropriate formatting.
    console.log("staircase Results ---")

    let staircase = function( n ){
        // create a string and a counter as we'll need both
        let staircase = "";
        let i = 0;
        // return a named function that can be called recursively
        return (function acc(){
            // add the following to the staircase string:
            // - an empty string repeated to n - i value, to create the empty space as
            //   this will get smaller as the staircase grows
            // - "#" repeated n times, to fill the actual staircase steps
            // - \n to add a newline to the console
            staircase += " ".repeat(n - (++i)) + "#".repeat(i) + "\n";
            // if our i value equals our n value (max) return the staircase
            // otherwise - recurse!
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
        // This array is going to hold all of the calculated values
        let calcValues = [];
        // Loop over each item of our array
        arr.forEach((item, index) => {
            // create a copy of the array. We cannot just do 
            // let arrCopy = arr because arrays are pass by reference and this
            // would change the initial array, so we create a new copy with .concat()
            let arrCopy = [].concat(arr);
            // set the current index of the arrCopy to 0. What this does is allow us to
            // reduce the entire arrCopy to get a total value. Since we've set the index we're
            // currently on to 0, we've essentially removed that value. Since we're looping,
            // each of the iterations will remove a single number which solves the problem.
            arrCopy[index] = 0;
            // push the reduced value into the calcValues array
            calcValues.push( arrCopy.reduce( ((curr, next) => curr + next), 0 ) );
        })
        // return the tuple of the min and max value. We're using the spread operator
        // here to push our calc values out into the proper format for Math.min and Math.max
        return [ Math.min(...calcValues), Math.max(...calcValues) ]
    }

    console.log( minMax([7, 3, 2, 1, 10]) ) // should output [13, 22]
    console.log( minMax([1, 2, 3, 4, 5]) ) // should output [10, 14]
    console.log( minMax([101, 231, 445, 643, 231]) ) // should output [1008, 1550]    
}())