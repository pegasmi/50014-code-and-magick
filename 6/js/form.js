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

  for (var i = 0; formMarks.length > i; i++) {
    formMarks[i].addEventListener('change', function(evt) {
      if (evt.target.value < 3) {
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
    if (this.value && formReviewText.required === true) {
      elementShow(reviewFieldsName);
      buttonTogler();
    } else if (this.value && formReviewText.required === false) {
      elementShow(reviewFieldsText);
      elementShow(reviewFieldsName);
      buttonTogler();
    } else {
      elementHidden(reviewFieldsName);
      buttonTogler();
    }
  });

  formReviewText.addEventListener('change', function() {
    if (this.value) {
      elementShow(reviewFieldsText);
      buttonTogler();
    } else {
      elementHidden(reviewFieldsText);
      buttonTogler();
    }
  });

  function buttonTogler() {
    if (formReviewText.required && formReviewText.value) {
      reviewSubmitBtn.disabled = false;
    } else if (formReviewText.required && !formReviewText.value) {
      reviewSubmitBtn.disabled = true;
    } else if (!formReviewText.required && !formReviewName.value) {
      reviewSubmitBtn.disabled = true;
    } else if (!formReviewText.required && formReviewName.value) {
      reviewSubmitBtn.disabled = false;
    }
  }

  function elementShow(el) {
    el.classList.add('invisible');
  }

  function elementHidden(el) {
    el.classList.remove('invisible');
  }

})();
