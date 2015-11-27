  'use strict';
  function getMessage (a, b) {

    if((typeof a === 'boolean') && (typeof a === true)) {
      return 'Я попал в' + b;
    } else if (a === false) {
      return 'Я никуда не попал';
    }

    if(typeof a === 'number') {
      return 'Я прыгнул на ' + (a * 100) + ' сантиметров';
    }

    if((typeof a === 'object') && (typeof b !== 'object')) {
      var sum = a.reduce(function(count, current) {
        return count + current;
      })
      return 'Я прошел ' + sum + ' шагов';
    }

    if((typeof a === 'object') && (typeof b === 'object')) {

      while(a.length > b.length) {
        b.push(0);
      }

      while(a.length < b.length) {
        a.push(0);
      }

      var length = a.map(function(value, index) {
        return (value + b[index]);
      })

      length = length.reduce(function(count, current) {
        return count + current;
      })
      return 'Я прошел ' + length + ' метров';
    }

  };
