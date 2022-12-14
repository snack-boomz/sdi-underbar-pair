(function () {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function (val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function (array, n) {

    if (n === undefined) {
      return array[0];
    }
    else {
      return array.slice(0, n);
    }
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function (array, n) {
    let returnedArray = array.slice(array.length - 1 - n);
    if (n === undefined) {
      let number = array[array.length - 1];
      return number;
    } else if (n === 0) {
      return [];
    }
    return returnedArray;
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function (collection, iterator) {
    if (typeof collection === 'object' && !Array.isArray(collection)) {

      if (iterator.length === 2) {
        let keys = Object.keys(collection);
        let values = Object.values(collection);

        for (let x = 0; x < values.length; x++) {
          iterator(values[x], keys[x]);
        }

      } else if (iterator.length < 2) {
        let values = Object.values(collection);


        for (let x = 0; x < values.length; x++) {
          iterator(values[x]);
        }

      } else if (iterator.length > 2) {
        let keys = Object.keys(collection);
        let values = Object.values(collection);
        for (let x = 0; x < values.length; x++) {
          iterator(values[x], keys[x], collection);
        }
      }

    } else {

      if (iterator.length === 2) {

        for (let x = 0; x < collection.length; x++) {
          iterator(collection[x], x);
        }

      } else if (iterator.length < 2) {

        for (let x = 0; x < collection.length; x++) {
          iterator(collection[x]);
        }

      } else if (iterator.length >= 3) {

        for (let x = 0; x < collection.length; x++) {
          iterator(collection[x], x, collection);
        }

      }
    }

    // if (Array.isArray(collection)) {
    //   for (let x = 0; x < collection.length; x++) {
    //     iterator(collection[x], x, collection);
    //   }
    // }
    // else if ( typeof collection === 'object') {
    //   let values = Object.values(collection);
    //   let keys = Object.keys(collection);
    //   for (let x = 0; x < values.length; x++) {
    //     iterator(values[x], keys[x], collection);
    //   }
    // }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function (array, target) {
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function (item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function (collection, test) {
    let fixedArray = [];

    for (let x = 0; x < collection.length; x++) {
      if (test(collection[x])) {
        fixedArray.push(collection[x])
      }
    }
    return fixedArray;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function (collection, test) {
    let fixedArray = [];

    for (let x = 0; x < collection.length; x++) {
      if (!test(collection[x])) {
        fixedArray.push(collection[x])
      }
    }
    return fixedArray;

    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function (array) {
    let uniqueArray = [];
    for (let x = 0; x < array.length; x++) {
      console.log(array[x]);
      let duplicate = false;
      for (let i = 0; i < uniqueArray.length; i++) {
        console.log(uniqueArray[i]);
        if (array[x] === uniqueArray[i]) {
          duplicate = true;
        }
      }
      if (duplicate === true) {

      }
      else {
        uniqueArray.push(array[x]);
      }

    }
    return uniqueArray;
  };


  // Return the results of applying an iterator to each element.
  _.map = function (collection, iterator) {
    let mappedArr = [];
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    for (let x = 0; x < collection.length; x++) {
      mappedArr.push(iterator(collection[x]));
    }
    return mappedArr;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function (collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function (item) {
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.

  // _.reduce = function (collection, iterator, accumulator){
  //   accumulator =
  //   for(let x = 0; x < collection; x++){
  //     if()
  //     iterator(accumulator, item[x])
  //   }
  // }



  _.reduce = function (collection, iterator, accumulator = collection[0]) { // accumulator = collection[0];



    let values = Object.values(collection);

    if (typeof collection === "object" && !Array.isArray(collection)) {

      if (accumulator === collection[0]) {
        accumulator = values[0];

        for (let x = 1; x < values.length; x++) {

          console.log(values[x]);

          if (iterator(accumulator, values[x]) === undefined) {
            console.log('stuff');
          }

          else {
            accumulator = iterator(accumulator, values[x])
            // 0 = 0 + 9 = 9
            // 9 = 9 + 8 = 17
            console.log(`accumulator: ${accumulator}`)
          }

        }

      } else {

        for (let x = 0; x < values.length; x++) {

          if (iterator(accumulator, values[x]) === undefined) {

            console.log('stuff');

          } else {

            accumulator = iterator(accumulator, values[x]);

          }

        }

      }

    } else {

      if (accumulator === collection[0]) {
        for (let x = 1; x < collection.length; x++) {
          console.log(collection[x]);
          if (iterator(accumulator, collection[x]) === undefined) {
            console.log('stuff')
          }
          else {
            accumulator = iterator(accumulator, collection[x])
            // 0 = 0 + 9 = 9
            // 9 = 9 + 8 = 17
            console.log(`accumulator: ${accumulator}`)
          }
        }
      }
      else {
        for (let x = 0; x < collection.length; x++) {
          console.log(collection[x]);
          if (iterator(accumulator, collection[x]) === undefined) {
            console.log('stuff')
          }
          else {
            accumulator = iterator(accumulator, collection[x])
            // 0 = 0 + 9 = 9
            // 9 = 9 + 8 = 17
            console.log(`accumulator: ${accumulator}`)
          }
        }
      }
    }
    return accumulator;

  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function (collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function (wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, 0);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function (collection, iterator) {
    // TIP: Try re-using reduce() here.
    let truthArray = [];
    if (iterator === undefined) {
      for (let i = 0; i < collection.length; i++) {
        if (collection[i]) {
          truthArray.push(collection[i]);
        }
      }

      if (truthArray.length === collection.length) {
        return true;
      } else {
        return false;
      }

    }
    for (let i = 0; i < collection.length; i++) {
      if (iterator(collection[i])) {
        truthArray.push(collection[i]);
      }
    }

    if (truthArray.length === collection.length) {
      return true;
    } else {
      return false;
    }
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function (collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    let truthArray = [];
    if (iterator === undefined) {
      for (let i = 0; i < collection.length; i++) {
        if (collection[i]) {
          return true;
        }
      }
      return false;
    }

    for (let i = 0; i < collection.length; i++) {
      if (iterator(collection[i])) {
        return true;
      }

    }

    return false;

  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function (destinationObj, objToAdd, secondObjToAdd) {
    // for loop to iterate over object
    // grab each key and value
    // destinationObj[property] = value;
    // let size = Object.keys(myObj).length;
    // destinationObj[property] = value;

    // for loop to iterate over object
    // grab each key and value
    // destinationObj[property] = value;
    // let size = Object.keys(myObj).length;
    // destinationObj[property] = value;

    let keys = Object.keys(objToAdd);
    let values = Object.values(objToAdd);
    for (let i = 0; i < keys.length; i++) {

      console.log(keys[i]);
      console.log(values[i]);
      destinationObj[`${keys[i]}`] = values[i];
      // destinationObj[`${keys[i]}`] = `${values[i]}`
    }

    if (secondObjToAdd) {
      let keys = Object.keys(secondObjToAdd);
      let values = Object.values(secondObjToAdd);
      for (let i = 0; i < keys.length; i++) {
        console.log(keys[i]);
        console.log(values[i]);
        destinationObj[`${keys[i]}`] = values[i];
        // destinationObj[`${keys[i]}`] = `${values[i]}`
      }
    }


    return destinationObj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function (destinationObj, objToAdd, secondObjToAdd, thirdObjToAdd) {
    // for loop to iterate over object
    // grab each key and value
    // destinationObj[property] = value;
    // let size = Object.keys(myObj).length;
    // destinationObj[property] = value;

    // for loop to iterate over object
    // grab each key and value
    // destinationObj[property] = value;
    // let size = Object.keys(myObj).length;
    // destinationObj[property] = value;

    let keys = Object.keys(objToAdd);
    let values = Object.values(objToAdd);
    for (let i = 0; i < keys.length; i++) {

      if (destinationObj.hasOwnProperty(`${keys[i]}`)) {

        // if key already exists, ignore
      } else {
        destinationObj[`${keys[i]}`] = values[i];
      }

      // destinationObj[`${keys[i]}`] = `${values[i]}`
    }

    if (secondObjToAdd) {
      let keys = Object.keys(secondObjToAdd);
      let values = Object.values(secondObjToAdd);
      for (let i = 0; i < keys.length; i++) {

        if (destinationObj.hasOwnProperty(`${keys[i]}`)) {

          // if key already exists, ignore
        } else {
          destinationObj[`${keys[i]}`] = values[i];
        }
        // destinationObj[`${keys[i]}`] = `${values[i]}`
      }
    }

    if (thirdObjToAdd) {
      let keys = Object.keys(thirdObjToAdd);
      let values = Object.values(thirdObjToAdd);
      for (let i = 0; i < keys.length; i++) {

        if (destinationObj.hasOwnProperty(`${keys[i]}`)) {

          // if key already exists, ignore
        } else {
          destinationObj[`${keys[i]}`] = values[i];
        }
        // destinationObj[`${keys[i]}`] = `${values[i]}`
      }
    }


    return destinationObj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function (func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function () {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function (func) {
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function (func, wait, arg1, arg2) {

    if (arg1 == undefined && arg2 == undefined) {
      setTimeout(func, wait);
    } else {
      setTimeout(func(arg1, arg2), wait);
    }

  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function (array) {
    // make copy of array with array.slice
    // use Math.random() to shuffle up each element of copied array
    let shuffledArray = [];
    for (let i = 0; i < array.length; i++) {
      // Math.floor(Math.random() * (array.length - 1))
      let counter = 0;
      let shuffledValue = Math.floor(Math.random() * (array.length));

      if (shuffledArray[shuffledValue] === undefined) {

        shuffledArray[shuffledValue] = array[i];

      } else if (shuffledArray[shuffledValue] !== undefined) {

        shuffledValue = Math.floor(Math.random() * (array.length));

        let loop = true;

        while (loop) {

          shuffledValue = Math.floor(Math.random() * (array.length));

          if (shuffledArray[shuffledValue] === undefined) {

            console.log("found unfilled index: " + shuffledArray[shuffledValue])
            console.log("index location is: " + shuffledValue);

            shuffledArray[shuffledValue] = array[i];

            loop = false;
          }

        }

      }
    }
    return shuffledArray;

  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function (collection, functionOrKey, args) {
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function (collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function () {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function (nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function () {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function (array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function (func, wait) {
  };
}());
