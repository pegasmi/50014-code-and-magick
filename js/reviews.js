'use strict';
/* global reviews:true */

(function() {
  var filter = document.querySelector('.reviews-filter');
  var container = document.querySelector('.reviews-list');
  var ratings = [
    'one',
    'two',
    'three',
    'four',
    'five'
  ];

  filter.classList.add('.invisible');

  reviews.forEach(function(review) {
    var cloneElement = getElementFromTemplate(review);
    container.appendChild(cloneElement);
  });

  function getElementFromTemplate(data) {
    var template = document.querySelector('#review-template');
    var element;
    if ('content' in template) {
      element = template.content.children[0].cloneNode(true);
    } else {
      element = template.children[0].cloneNode(true);
      template.setAttribute('display', 'none');
    }

    element.querySelector('.review-rating').textContent = "";
    element.querySelector('.review-text').textContent = data.description;

    var picture = new Image(124, 124);

    picture.onerror = function() {
      element.classList.add('review-load-failure');
    };

    var imageLoadTimeout = setTimeout(function() {
      picture.src = '';
      element.classList.add('review-load-failure');
    }, 1000);

    picture.onload = function() {
      clearTimeout(imageLoadTimeout);
    };

    picture.classList.add('review-author');
    picture.src = '../' + data.author.picture;
    picture.title = data.author.name;
    picture.alt = data.author.name;
    element.replaceChild(picture, element.querySelector('.review-author'));
    element.querySelector('.review-rating').classList.add('review-rating-' + ratings[data.rating - 1]);
    return element;
  }

  filter.classList.remove('.invisible');
})();
