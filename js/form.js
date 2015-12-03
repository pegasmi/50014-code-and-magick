'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');
  var form = document.querySelector('.review-form');
  var mark = form.elements.namedItem('review-mark');
  var user = document.querySelector('.review-form-field-name');

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
    restoreCookies();
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  form.addEventListener('submit', function(evt) {
    evt.preventDefault();
    docCookies.setItem('checked-mark', mark.value, getCookieLife());
    docCookies.setItem('user-name', user.value, getCookieLife());
    formContainer.classList.add('invisible');
  });

  function getCookieLife() {
    var now = +Date.now();
    var myLastBirthday = new Date('2015, 03, 28');
    var sinceMyLastBirthday = now - +myLastBirthday;
    var cookiesDeleteDate = now + sinceMyLastBirthday;
    var result = new Date(cookiesDeleteDate);
    return result;
  }

  function restoreCookies() {
    user.value = docCookies.getItem('user-name');
    var number = parseInt(docCookies.getItem('сhecked-mark'), 10) - 1;
    var checkedMark = form.elements.namedItem('review-mark')[number];
    checkedMark.checked = true;
  }
})();

