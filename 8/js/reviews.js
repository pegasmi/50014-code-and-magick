'use strict';
/* global reviews:true */

(function() {
  var filter = document.querySelector('.reviews-filter');
  var container = document.querySelector('.reviews-list');
  var template = document.querySelector('#review-template');
  var ratings = [
    'one',
    'two',
    'three',
    'four',
    'five'
  ];
  var IMAGE_TIMEOUT = 1000;

  if (!container.firstChild) {
    filter.classList.add('invisible');
  }

  var elementParent = checkContent();

  function checkContent() {
    if ('content' in template) {
      return template.content;
    } else {
      template.style.display = 'none';
      return template;
    }
  }

  if (Array.isArray(reviews)) {
    reviews.forEach(function(review) {
      var cloneElement = getElementFromTemplate(review);
      container.appendChild(cloneElement);
    });
  }

  function getElementFromTemplate(data) {
    var element = elementParent.children[0].cloneNode(true);
    element.querySelector('.review-rating').textContent = '';
    element.querySelector('.review-text').textContent = data.description;

    var picture = new Image(124, 124);

    var failure = function() {
      picture.src = '';
      element.classList.add('review-load-failure');
    };

    var timeOut = setTimeout(failure, IMAGE_TIMEOUT);
    picture.onerror = failure;

    picture.onload = function() {
      clearTimeout(timeOut);
    };

    picture.classList.add('review-author');
    picture.src = data.author.picture;
    picture.title = data.author.name;
    picture.alt = data.author.name;
    element.replaceChild(picture, element.querySelector('.review-author'));
    element.querySelector('.review-rating').classList.add('review-rating-' + ratings[data.rating - 1]);
    return element;
  }

})();
