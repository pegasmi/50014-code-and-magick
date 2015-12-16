'use strict';

(function() {
  //отрисовка по шаблону
  var container = document.querySelector('.reviews-list');
  var template = document.querySelector('#review-template');
  var reviewsContainer = document.querySelector('.reviews');

  //работа с фильтрами
  var filter = document.querySelector('.reviews-filter');
  var activeFilter = filter.querySelector('input:checked').value;
 /**
  * @const {Array.<string>}
  */
  var RATINGS = [
    'one',
    'two',
    'three',
    'four',
    'five'
  ];
 /**
  * @const {number}
  */
  var IMAGE_TIMEOUT = 1000;
  var allReviews = null;

  filter.classList.add('invisible');
  reviewsContainer.classList.add('reviews-list-loading');

  loadData('data/reviews.json', function(error, data) {
    reviewsContainer.classList.remove('reviews-list-loading');
    if (error) {
      reviewsContainer.classList.add('reviews-load-failure');
      return;
    }
    allReviews = data;

    filter.addEventListener('click', function() {
      activeFilter = filter.querySelector('input:checked').value;
      renderReviews(filterReviews(allReviews));
    });

    renderReviews(filterReviews(allReviews));
  });

  function loadData(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'data/reviews.json');

    xhr.onload = function(event) {
      if (xhr.status === 200) {
        callback(false, JSON.parse(event.target.response));
      } else {
        callback(true);
      }
    };

    xhr.onerror = function() {
      callback(true);
    };

    xhr.send();
  }

 /**
  * @returns {Object} HTML как document-fragment
  */
  function renderReviews(reviewsToRender) {
    container.innerHTML = '';
    var fragment = document.createDocumentFragment();

    reviewsToRender.forEach(function(review) {
      var cloneElement = createElement(review);
      fragment.appendChild(cloneElement);
    });

    container.appendChild(fragment);
  }

  function getHalfYear() {
    var currentDate = new Date();
    var year = new Date(currentDate.getFullYear());
    var month = new Date(currentDate.getMonth() - 6);
    var day = new Date(currentDate.getDay());
    return new Date(year, month, day);
  }

  function filterReviews(reviews) {
    var filteredReviews = null;
    switch (activeFilter) {
      case 'reviews-recent':
        filteredReviews = reviews.filter(function(a) {
          var dateComment = new Date(a.date);
          var currentHalfYear = getHalfYear();
          return dateComment >= currentHalfYear;
        });
        return filteredReviews.sort(function(a, b) {
          var commitDate = new Date(a.date);
          var nextCommitDate = new Date(b.date);
          return commitDate - nextCommitDate;
        });
      case 'reviews-good':
        filteredReviews = reviews.filter(function(a) {
          return a.rating >= 3;
        });
        return filteredReviews.sort(function(a, b) {
          return b.rating - a.rating;
        });
      case 'reviews-bad':
        filteredReviews = reviews.filter(function(a) {
          return a.rating <= 2;
        });
        return filteredReviews.sort(function(a, b) {
          return a.rating - b.rating;
        });
      case 'reviews-popular':
        filteredReviews = reviews.slice(0);
        return filteredReviews.sort(function(a, b) {
          return b['review-rating'] - a['review-rating'];
        });
      case 'reviews-all':
        filteredReviews = reviews;
    }
    return reviews;
  }

  function checkTemplate() {
    if ('content' in template) {
      return template.content;
    } else {
      template.style.display = 'none';
      return template;
    }
  }
 /**
  * @param {Object} data
  * @return {Element}
  */
  function createElement(data) {
    var elementParent = checkTemplate();
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
    element.querySelector('.review-rating').classList.add('review-rating-' + RATINGS[data.rating - 1]);
    return element;
  }

  filter.classList.remove('invisible');

})();
