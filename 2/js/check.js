  'use strict';
/**
 * @param {(array|number|boolean)} a
 * @param {(array|number|boolean)} b
 * @returm {string} 
 */
  function getMessage (a, b) {
    if(a === true) {
      return ('Я попал в ' + b);
    } else if (a === false) {
      return 'Я никуда не попал';
    }

    if(typeof a === 'number') {
      return 'Я прыгнул на ' + (a * 100) + ' сантиметров';
    }

    if(Array.isArray(a) && !Array.isArray(b)) {
      var sum = a.reduce(function(count, current) {
        return count + current;
      });
      return 'Я прошёл ' + sum + ' шагов';
    }

    if(Array.isArray(a) && Array.isArray(b)) {
      var length = a.length > b.length ? a : b;
      var slave = length === a ? b : a;

      length = length.reduce(function(count, current, index) {
        return count + (current * slave[index] || 0);
      });
      return 'Я прошёл ' + length + ' метров';
    }
  return 'Ой';
  };
