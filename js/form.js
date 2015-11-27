'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');
  var formReviewText = document.querySelector('#review-text');
  var formReviewName = document.querySelector('#review-name');
  var formReviewFields = document.querySelector('.review-fields');
  var formReviewLabels = document.querySelectorAll('.review-fields-label');
  var reviewFields = document.querySelectorAll('.review-form-field');
  var reviewFieldsName = document.querySelector('.review-fields-name');
  var reviewFieldsText = document.querySelector('.review-fields-text');
  var reviewSubmitBtn = document.querySelector('.review-submit');
  var reviewForm = document.querySelector('.review-form');
  var reviewFormElements = reviewForm.elements.namedItem('review-mark');

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    elementShow(formContainer);
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    elementHide(formContainer);
  };

  for (var i = 0; reviewFormElements.length > i; i++) {
    reviewFormElements[i].addEventListener('change', function(evt) {
      if (parseInt(evt.target.value, 10) < 3) {
        formReviewText.required = true;
        reviewSubmitBtn.disabled = formValid();
      } else {
        formReviewText.required = false;
        reviewSubmitBtn.disabled = formValid();
      }
    });
  }

  function formValid() {
    if (formReviewText.value && formReviewName.value) {
      elementHide(formReviewFields);
      return false;
    }
    if (formReviewText.value && !formReviewName.value) {
      reviewClassClear();
      elementShow(formReviewFields);
      elementHide(reviewFieldsText);
      return true;
    }
    if (formReviewText.required && !formReviewText.value && formReviewName.value) {
      reviewClassClear();
      elementShow(formReviewFields);
      elementHide(reviewFieldsName);
      return true;
    }
    if (formReviewText.required && !formReviewText.value && !formReviewName.value) {
      elementShow(formReviewFields);
      return true;
    }
    if (!formReviewText.required && !formReviewText.value && !formReviewName.value) {
      reviewClassClear();
      elementShow(formReviewFields);
      elementHide(reviewFieldsText);
      return true;
    }
    if (!formReviewText.required && formReviewName.value) {
      elementHide(formReviewFields);
      return false;
    }
  }

  function reviewClassClear() {
    for (var j = 0; formReviewLabels.length > j; j++) {
      formReviewLabels[j].classList.remove('invisible');
    }
  }

  for (var h = 0; reviewFields.length > h; h++) {
    reviewFields[h].addEventListener('change', function() {
      reviewSubmitBtn.disabled = formValid();
    });
  }

  function elementHide(el) {
    el.classList.add('invisible');
  }

  function elementShow(el) {
    el.classList.remove('invisible');
  }

})();

