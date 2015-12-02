'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');
  //var submitButton = document.querySelector('.review-submit');
  var form = document.querySelector('.review-form');
  var mark = form.elements.namedItem('review-mark');
  var user = document.querySelector('.review-form-field-name');


  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  form.addEventListener('submit', function(evt) {
    evt.preventDefault();
    docCookies.setItem('checked-mark', mark.value);
    docCookies.setItem('user-name', user.value);
    docCookies.setItem('expires', getCookieLife());
    formContainer.classList.add('invisible');
  });

  function getCookieLife() {
    var now = +Date.now();
    var myLastBirthday = new Date('2015, 03, 28');
    var myLastBirthdayInSec = +myLastBirthday;
    var tillLastBirthday = now - myLastBirthdayInSec;
    var result = new Date(tillLastBirthday);
    return result;
  }

  var restoreCookies = function() {
    if (docCookies.hasItem('сhecked-mark') && docCookies.hasItem('user-name')) {
      mark.value = docCookies.getItem('сhecked-mark');
      user.value = docCookies.getItem('user-name');
    }
  };
  restoreCookies();
})();

