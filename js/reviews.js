'use strict';
/* global reviews:true */

(function() {
  //отрисовка по шаблону
  var container = document.querySelector('.reviews-list');
  var template = document.querySelector('#review-template');
  var reviewsContainer = document.querySelector('.reviews');

  //работа с фильтрами
  var filter = document.querySelector('.reviews-filter');
  var filters = filter.elements.namedItem('reviews');
  var activeFilter = 'reviews-all';
  var reviews = [];
  var ratings = [
    'one',
    'two',
    'three',
    'four',
    'five'
  ];
 /**
  * @const {number}
  **/
  var IMAGE_TIMEOUT = 1000;

  getReviews();

  if (!reviews.length === 0) {
    filter.classList.add('invisible');
  }

  filter.addEventListener('click', function(evt) {
    var clickedElementID = evt.target.id;
    setActiveFilter(clickedElementID);
  });

  var elementParent = getTemplateContent();

 /**
  * @returns {Object} HTML как document-fragment
  **/
  function getTemplateContent() {
    if ('content' in template) {
      return template.content;
    } else {
      template.style.display = 'none';
      return template;
    }
  }

  function renderReviews(reviewsToRender) {
    container.innerHTML = '';
    var fragment = document.createDocumentFragment();

    reviewsToRender.forEach(function(review) {
      var cloneElement = getElementFromTemplate(review);
      fragment.appendChild(cloneElement);
    });
    container.appendChild(fragment);
  }

  function setActiveFilter(id) {
    if (activeFilter === id) {
      return;
    }
    var filteredReviews = reviews.slice(0);

    switch (id) {
      case 'reviews-recent':
        var HALF_YEAR = 60 * 60 * 24 * 182 * 1000;

        filteredReviews = filteredReviews.filter(function(a) {
          var dateComment = new Date(a.date);
          var date = new Date(Date.now() - HALF_YEAR);
          return dateComment >= date;
        });

        filteredReviews = filteredReviews.sort(function(a, b) {
          var dateA = new Date(a.date);
          var dateB = new Date(b.date);
          return dateB - dateA;
        });

        break;
      case 'reviews-good':

        filteredReviews = filteredReviews.filter(function(a) {
          return a.rating >= 3;
        });

        filteredReviews = filteredReviews.sort(function(a, b) {
          return b.rating - a.rating;
        });

        break;
      case 'reviews-bad':

        filteredReviews = filteredReviews.filter(function(a) {
          return a.rating <= 2;
        });

        filteredReviews = filteredReviews.sort(function(a, b) {
          return a.rating - b.rating;
        });

        break;
      case 'reviews-popular':

        filteredReviews = filteredReviews.sort(function(a, b) {
          return b['review-rating'] - a['review-rating'];
        });

        break;
    }

    renderReviews(filteredReviews);
    activeFilter = id;
  }

  function getReviews() {
    var xhr = new XMLHttpRequest();
    reviewsContainer.classList.add('reviews-list-loading');

    xhr.open('GET', 'data/reviews.json');

    xhr.onload = function(event) {
      var rawData = event.target.response;
      var loadedReviews = JSON.parse(rawData);
      reviews = loadedReviews;
      renderReviews(loadedReviews);
      reviewsContainer.classList.remove('reviews-list-loading');
    };

    xhr.onerror = function() {
      reviewsContainer.classList.add('reviews-load-failure');
    };

    xhr.send();
  }
 /**
  * @param {Array.<Object>} data
  * @return {Element}
  **/
  function getElementFromTemplate(data) {
    var element = elementParent.children[0].cloneNode(true);
    element.querySelector('.review-rating').textContent = '';
    element.querySelector('.review-text').textContent = data.description;

    var picture = new Image(124, 124);

    var failure = function() {
      picture.src = '';
      element.classList.add('review-load-failure');
      clearTimeout(timeOut);
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
