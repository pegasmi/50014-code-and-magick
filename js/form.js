'use strict';

(function() {
  //попап с формой обратной связи
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

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

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

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

  function disableButton() {
    if (!nameValue && !reviewValue) {
      reviewSubmitBtn.disabled = false;
    } else {
      reviewSubmitBtn.disabled = true;
    }
  }

  function changeHandler() {
    reviewValidate().forEach(showElement);
    disableButton();
  }

  reviewForm.addEventListener('change', changeHandler);
  changeHandler();

})();
