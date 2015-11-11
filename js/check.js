  'use strict';
  function getMessage (a, b) {

    if(a === true) {
      return ('Я попал в ' + b);
    } else if (a === false) {
      return 'Я никуда не попал';
    }

    if(typeof a === 'number') {
      return 'Я прыгнул на ' + (a * 100) + ' сантиметров';
    }

    if((Array.isArray(a)) && (!Array.isArray(b))) {
      var sum = a.reduce(function(count, current) {
        return count + current;
      });
      return 'Я прошел ' + sum + ' шагов';
    }

    if((Array.isArray(a)) && (Array.isArray(b))) {

      var length = a.length > b.length ? a : b;
      var slave = length === a ? b : a;

      length = length.map(function(value, index) {
        return value * (slave[index] || 0);
      });

      length = length.reduce(function(count, current) {
        return count + current;
      });
      return 'Я прошел ' + length + ' метров';
    }
  return 'Ой';
  };
