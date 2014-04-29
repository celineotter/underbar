/*jshint eqnull:true, expr:true*/

var _ = {};

(function() {

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
  /******************************************************************************/

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function (array, n) {

    return (n === undefined ? array[0] : array.slice(0, n));
  };
  /******************************************************************************/

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function (array, n) {
    n = (n === 0 ? -array.length : n);

    return (n === undefined ? array[array.length-1] : array.slice(-n, array.length));
  };
  /******************************************************************************/

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.

  _.each = function (collection, iterator ) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else if (typeof collection === 'object') {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };
  /* another option for objects:
      // var keys = Object.keys(obj);
      // for (var i=0; i<keys.length; i++) {
      // iterator(obj[keys[i]], i, collection);
  */
  /******************************************************************************/

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
  _.indexOf = function (array, target) {
    var result = -1;

    _.each(array, function (item, index) {
      if (item === target && result === -1) result = index;
    });

    return result;
  };
  /******************************************************************************/

  // Return all elements of an array that pass a truth test.
  _.filter = function (collection, test) {
    var resultsArr =[];

    _.each(collection, function (item, index) {
      if (test(item, index)) resultsArr.push(item);
    });

    return resultsArr;
  };
  /******************************************************************************/

  // Return all elements of an array that don't pass a truth test.
  // TIP: see if you can re-use _.filter() here, without simply
  // copying code in and modifying it
  _.reject = function (collection, test) {

    return _.filter(collection, function (item) {
        return !test(item);
      });
  };
  /* alternative:
  //   var failTest = function (item) {
  //     return !(test(item));
  //   }
  //   return _.filter(collection, failTest );    
  // };
  */
  /******************************************************************************/

  // Produce a duplicate-free version of the array.
  _.uniq = function (array) {
    var resultArr = [];

    _.each(array, function (item) { 
      if (resultArr.indexOf(item) === -1) resultArr.push(item);
    });

    return resultArr;
  };
  /******************************************************************************/

  // Return the results of applying an iterator to each element.
  // map() is a useful primitive iteration function that works a lot
  // like each(), but in addition to running the operation on all
  // the members, it also maintains an array of results.
  _.map = function (collection, iterator) {
    var resultArr = [];

    _.each (collection, function (item, index) {
      resultArr.push(iterator(item, index));
    });

    return resultArr;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */
  /******************************************************************************/

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  // TIP: map is really handy when you want to transform an array of
  // values into a new array of values. _.pluck() is solved for you
  // as an example of this.
  _.pluck = function (collection, key) {

    return _.map(collection, function (item){
      return item[key];
    });
  };
  /******************************************************************************/

  // Calls the method named by methodName on each value in the list.
  // Note: you will nead to learn a bit about .apply to complete this.
  _.invoke = function (collection, functionOrKey, args) {

      return _.map(collection, function (item) {
        return (typeof functionOrKey === 'function' ? functionOrKey : item[functionOrKey])
      .apply(item, args);
      });
  };
  /* alternative: 
    if (typeof functionOrKey === 'function') {
      return _.map(collection, function (item) {
        return functionOrKey.apply(item, args);
      });
    } else { return _.map(collection, function (item) {
        return item[functionOrKey].apply(item, args);
      });
  */
  /******************************************************************************/

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. If initialValue is not explicitly passed in, it should default to the
  // first element in the collection.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6

  _.reduce = function (collection, iterator, accumulator) {
    var index, isArray = Array.isArray(collection), length;

    if (!isArray) var keys = Object.keys(collection);
    accumulator = (accumulator=== undefined ? (isArray ? collection[0] : collection[keys[0]]) : accumulator);
    index = (accumulator === undefined ? 1: 0);
    length = (isArray ? collection.length : keys.length);

    while (index < length) {
      accumulator = iterator(accumulator, (isArray ? collection[index] : collection[keys[index]]), index);
      index++;
    }

    return accumulator;
  };
/* alternative:
    if (Array.isArray(collection)) {
      accumulator=== undefined? accumulator =collection[0] : accumulator;
      var valueFeeder = collection[index];
      var length = collection.length;
    } else if (typeof collection === 'object') {
      var keys = Object.keys(collection);
      accumulator === undefined? accumulator = collection[keys][0] : accumulator;
      var valueFeeder = collection[keys[index]];
      var length = keys.length;
    }
    arguments[2] === undefined? index = 1: index=0;
    while (index<length) {
      accumulator = iterator(accumulator, valueFeeder, index);
      index++;       
    }
*/
  /******************************************************************************/

  // Determine if the array or object contains a given value (using `===`).
  // TIP: Many iteration problems can be most easily expressed in
  // terms of reduce(). Here's a freebie to demonstrate!  
  _.contains = function (collection, target) {

    return _.reduce(collection, function (wasFound, item) {
      if (wasFound) return true;
      return item === target;
    }, false);
  };
  /******************************************************************************/

  // Determine whether all of the elements match a truth test.
  // TIP: Try re-using reduce() here.
  _.every = function (collection, iterator) {
    iterator = iterator || _.identity;

    return _.reduce(collection, function (isTrue, item) {
      if (!isTrue) return false;
      else if (iterator(item)) return true;
      else return false;
    }, true);
  };
  /******************************************************************************/

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  // TIP: There's a very clever way to re-use every() here.
  _.some = function (collection, iterator) {
    iterator = iterator || _.identity;
    
    return !_.every(collection, function (item) { 
      return !iterator(item); //every returns true if every single item fails the truth test
    });
  }
  /******************************************************************************/

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
  _.extend = function (obj) {
    var index = 1;

    while (index < arguments.length){
      for (var key in arguments[index]) {
        obj[key] = arguments[index][key];
      }
      index++;
    }

    return obj;
  };
  /******************************************************************************/

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function (obj) {
    var index = 1;

    while (index < arguments.length){
      for (var key in arguments[index]) {
        obj[key] = (obj.hasOwnProperty(key) ?  obj[key] : arguments[index][key]);
      }
      index++;
    }

    return obj;
  };
  /******************************************************************************/

  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  
  /*_.once = function (func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // information from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };*/

  /*mine:*/
    _.once = function (callback) {
      var executed = false;
        
      return function() { 
        if (!executed) {
          executed = true;
          return callback();
        }
      }
    };
  /**/
  /******************************************************************************/

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // _.memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function (func) {
    var cache = {};
    
    return function() {
      var callbackValue = arguments[0];

      return (cache.hasOwnProperty(callbackValue) ? cache[callbackValue] : cache[callbackValue] = func(callbackValue));
    };
  };
  /*  alternative:
        if (cache[callbackValue]) {
          return cache[callbackValue];
        } else {
          cache[callbackValue] = func(callbackValue);
          return cache[callbackValue];
        }
  */
  /******************************************************************************/

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function (func, wait) {
    var args = Array.prototype.slice.call(arguments, 2);
    
    return setTimeout ( function() {
        return func.apply(this,args);
      }, wait );
  };
  /******************************************************************************/

  /*
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function (array) {
    var shuffArr = [], arrLength = array.length, runCount = arrLength;
    var copyArray = array.slice(0, array.length);
        
    while (runCount>0) {
      var index = Math.floor(Math.random()*arrLength);
      if (index in copyArray) {
        shuffArr.push(copyArray[index]);
        delete copyArray[index];
        runCount--;
      }
    }

    return shuffArr;
  };
  /******************************************************************************/
  
  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */
  /******************************************************************************/

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function (collection, iterator) {

    return collection.sort(function(obj1, obj2) {
      if (typeof iterator === 'function'){
        return iterator(obj1) - iterator(obj2);
      } else {
        return obj1[iterator] - obj2[iterator];
      }
    });
  };
    // previous Workthrough;
    // var mapObj = {}, resultArr = [];

    // // _.each (collection, function (item, index) {
    // //   mapObj[index] = {target:iterator(item),initial:collection(index)};
    // // });
    // // var arrLength = collecton.length;

    // // var keys = Object.keys(mapObj);
    // // var sortKeys = keys.sort(function (a, b) { mapObj.a.target - mapObj.b.target}

    // _.each (collection, function (item, index) {
    //   mapObj[index] = iterator(item);
    // });
    // var keys = Object.keys(mapObj);
    // var sortKeys = keys.sort(function (a, b) {
    //     return mapObj[a]-mapObj[b];
    //     // var firstVal = mapObj.a;
    //     // var secondVal = mapObj.b;
    //   });
    // return _.map(sortKeys, function (item) { return collection[item];});
    // _.each(sortKeys, function (item) {
    //   resultArr.push(collection[item]);
    // });
    // var dataArray = Object.keys(mapObj).map(function(k){return mapObj[k]});
    // var sortedArr = dataArray.sort(function (a, b) {
    //     return a-b;
    //   });
    
    //var sortedArr = Object.keys(mapObj).sort(function (a, b) {
      //   return a-b;
      // });
    // _.each(sortedArr, function (item) {
    //   resultArr.push(mapObj[item]);
    // });

  /******************************************************************************/

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var gpsToZip = arguments[0].length, arrDepth = arguments.length;
    var resultArr = new Array(gpsToZip);

    _.each(resultArr, function (item, index) {
        resultArr[index] = new Array(arrDepth);
      });

    _.each(arguments, function (item, argumIndex) {
        for (var subItemIndex=0; subItemIndex<arrDepth; subItemIndex++) {
          resultArr[subItemIndex][argumIndex] = item[subItemIndex];
        }
      });

    return resultArr;
  };
  /* or:
    for (var i=0; i<gpsToZip; i++) {
      resultArr[i] = new Array(arrDepth);
    }
    for (var j=0; j<arrDepth ; j++) {
      for (var k=0; k<gpsToZip; k++) {
        resultArr[k][j] = arguments[j][k]; // =>which arguments, which index inside
      }
    }
    */
    /******************************************************************************/

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function (nestedArray, result) {
    var resultArr = [];

    var recurFunc = function (element) {
      (!Array.isArray(element) ? resultArr.push(element) : _.each(element,recurFunc));
    };
    recurFunc(nestedArray);

    return resultArr;
  };
  /******************************************************************************/

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var resultArr = [], countPropertiesObj = {};

    _.each(arguments, function (array) {
      _.each(array, function (element) {
        if (countPropertiesObj[element] === (arguments.length-2)) {
          resultArr.push(element);
        } else {
          countPropertiesObj[element] = countPropertiesObj[element] ? +1 : 1;
        }
      });
    });

    return resultArr;
  };
  /******************************************************************************/

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function (array) {
    var resultArr = [], countPropertiesObj = {}, flat =[];
    var firstArr = _.flatten(arguments[0]);
    var compareArgs = Array.prototype.slice.call(arguments, 1);

    _.each(firstArr, function (element) {
      countPropertiesObj[element] = countPropertiesObj[element] ? +1 : 1;
    });

    _.each(compareArgs, function (element) {
      flat = Array.isArray(element) ? _.flatten(element) : element;
      _.each(flat, function (item) {
        if (countPropertiesObj[item]) {
          countPropertiesObj[item]++;
        }
      });
    });

    for (var key in countPropertiesObj) {
      if (countPropertiesObj[key] === 1) {
        resultArr.push(key);
      }
    }

    return resultArr;
  };
  /******************************************************************************/

  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function (func, wait) {
    var lastResult;
    var noWait = true;
    var queue = false;
    
    return function executeFunc() {
      if (noWait) {
        noWait = false;
        setTimeout (function () {
          noWait = true;
          if (queue) {
            queue = false;
            executeFunc();
          }
        }, wait);
        lastResult = func();
        return lastResult;
      } else {
        queue = true;
        return lastResult;
      }
    };
  };

}).call(this);
