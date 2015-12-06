'use strict';

(function() {
  //попап с формой обратной связи
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');
  var form = document.querySelector('.review-form');
  var mark = form.elements.namedItem('review-mark');
  var user = document.querySelector('.review-form-field-name');

  //элементы формы и форма
  var reviewForm = document.querySelector('.review-form');
  var reviewFormMarks = reviewForm.elements.namedItem('review-mark');
  var fieldReview = reviewForm.querySelector('#review-text');
  var fieldName = reviewForm.querySelector('#review-name');

  //появление блока с информацией о заполнении
  var notificationContainer = reviewForm.querySelector('.review-fields');
  var notificationName = reviewForm.querySelector('.review-fields-name');
  var notificationReview = reviewForm.querySelector('.review-fields-text');

  var nameValue;
  var reviewValue;

  //Кнопка отправки
  var reviewSubmitBtn = reviewForm.querySelector('.review-submit');

  /**
   * @const
   * @type {number}
   */
  var SECONDS_IN_DAY = 60 * 60 * 24;

  function calcCookiesDeleteDate() {
    var currentDate = new Date();
    var myLastBirthday = new Date(currentDate.getFullYear(), 2, 28);

    if (myLastBirthday > currentDate) {
      myLastBirthday.setFullYear(myLastBirthday.getFullYear() - 1);
    }

    var diffInDays = Math.floor((currentDate - myLastBirthday) / 1000 / SECONDS_IN_DAY);
    return diffInDays * SECONDS_IN_DAY;
  }

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
    var deleteCookiesDate = calcCookiesDeleteDate();
    docCookies.setItem('checked-mark', mark.value, deleteCookiesDate);
    docCookies.setItem('user-name', user.value, deleteCookiesDate);
    formContainer.classList.add('invisible');
  });

  function restoreCookies() {
    if (docCookies.hasItem('user-name') && docCookies.hasItem('checked-mark')) {
      user.value = docCookies.getItem('user-name');
      var number = parseInt(docCookies.getItem('checked-mark'), 10) - 1;
      mark.value = number + 1;
    }
  }
  restoreCookies();

  function reviewValidate() {
    var badMark = reviewFormMarks.value < 3;
    nameValue = !fieldName.value;
    reviewValue = badMark && !fieldReview.value;
    return [
      [notificationName, !nameValue],
      [notificationReview, !reviewValue],
      [notificationContainer, !nameValue && !reviewValue]
    ];
  }

  function showElement(arr) {
    if (arr[1]) {
      arr[0].classList.add('invisible');
    } else {
      arr[0].classList.remove('invisible');
    }
  }

  function changeHandler() {
    reviewValidate().forEach(showElement);
    reviewSubmitBtn.disabled = nameValue || reviewValue;
  }

  reviewForm.addEventListener('change', changeHandler);
  changeHandler();
})();
