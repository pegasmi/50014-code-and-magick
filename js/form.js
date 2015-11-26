'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');
  var formMarks = document.querySelectorAll('input[name="review-mark"]');
  var formReviewText = document.querySelector('#review-text');
  var formReviewName = document.querySelector('#review-name');
  var reviewFieldsName = document.querySelector('.review-fields-name');
  var reviewFieldsText = document.querySelector('.review-fields-text');
  var reviewSubmitBtn = document.querySelector('.review-submit');

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    elementHidden(formContainer);
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    elementShow(formContainer);
  };

  var valueChecker = new Event('change');
  formReviewText.required = true;

  for (var i = 0; formMarks.length > i; i++) {
    formMarks[i].addEventListener('change', function(evt) {
      if (evt.target.value < 4) {
        formReviewText.required = true;
        formReviewName.dispatchEvent(valueChecker);
        formReviewText.dispatchEvent(valueChecker);
      } else {
        formReviewText.required = false;
        elementShow(reviewFieldsText);
        buttonTogler();
      }
    });
  }

  formReviewName.addEventListener('change', function() {
    if (this.value && this.value.match(/^[А-Яа-яЁё\s]+$/)) {
      elementShow(reviewFieldsName);
      buttonTogler();
    } else {
      this.value = '';
      elementHidden(reviewFieldsName);
      buttonTogler();
    }
  });

  formReviewText.addEventListener('change', function() {
    if (this.value && this.value.match(/^[А-Яа-яЁё\s]+$/)) {
      elementShow(reviewFieldsText);
      buttonTogler();
    } else {
      this.value = '';
      elementHidden(reviewFieldsText);
      buttonTogler();
    }
  });

  function buttonTogler() {
    if (formReviewText.required && formReviewText.value) {
      reviewSubmitBtn.disabled = false;
    } else if (formReviewText.required && formReviewText.value !== false) {
      reviewSubmitBtn.disabled = true;
    } else if (formReviewText.required === false && formReviewName.value !== '') {
      reviewSubmitBtn.disabled = false;
    } else if (formReviewText.required === false) {
      reviewSubmitBtn.disabled = true;
    }
  }

  function elementShow(el) {
    el.classList.add('invisible');
  }

  function elementHidden(el) {
    el.classList.remove('invisible');
  }

})();
