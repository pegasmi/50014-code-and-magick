'use strict';

(function() {
  var filter = document.querySelector('.reviews-filter');
  filter.classList.add('.invisible');
  var container = document.querySelector('.reviews-list');
  debugger;
  reviews.forEach(function(review) {
    var element = getElementFromTemplate(review);
    container.appendChild(element);
    console.log(element);
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


    element.querySelector('.review-rating').textContent = data.rating;
    element.querySelector('.review-text').textContent = data.description;

    var backgroundImage = new Image(124, 124);
    backgroundImage.onload = function() {
      backgroundImage.style.backgroundImage = 'url(\'' + backgroundImage.src + '\')';
    };
    backgroundImage.onerror = function() {
      element.classList.add('review-load-failure');
    };

    var timeout = setTimeout(function() {
      backgroundImage.src = '';
      element.classList.add('review-load-failure');
    }, 1000);

    backgroundImage.src = '../' + data.author.picture;
    backgroundImage.classList.add('review-author');
    backgroundImage.title = data.author.name;
    backgroundImage.alt = data.author.name;
    element.replaceChild(backgroundImage, element.querySelector('.review-author'));

    //element.querySelector('.review-rating').classList.add('review-rating-' + ratingArr[data.rating - 1]);
    return element;
  }

})();
