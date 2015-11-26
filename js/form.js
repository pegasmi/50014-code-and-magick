'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');
  var formMarks = document.querySelectorAll('input[name="review-mark"]');
  var formReviewText = document.querySelector('#review-text');
  var formReviewName = document.querySelector('#review-name');
  var reviewFieldsName = document.querySelector('.review-fields-name');

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  for (var i = 0; formMarks.length > i; i++) {
    formMarks[i].addEventListener('change', function(evt) {
      if (evt.target.value < 4) {
        formReviewText.required = true;
      } else {
        formReviewText.required = false;
      }
    });
  }

  formReviewName.addEventListener('change', function() {
    if (formReviewName.value) {
      reviewFieldsName.classList.add('invisible');
    }
  });

})();
