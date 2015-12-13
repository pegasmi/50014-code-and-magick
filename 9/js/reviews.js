'use strict';

(function() {
  //отрисовка по шаблону
  var container = document.querySelector('.reviews-list');
  var template = document.querySelector('#review-template');
  var reviewsContainer = document.querySelector('.reviews');

  //работа с фильтрами
  var filter = document.querySelector('.reviews-filter');
  var activeFilter = filter.querySelector('input:checked').value;
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
  loadReviews();

  filter.addEventListener('click', function(evt) {
    var clickedElementID = evt.target.id;
    evt.target.checked = true;
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
    filter.classList.remove('invisible');
  }

  function setActiveFilter(id) {
    if (activeFilter === id) {
      return;
    }

    var filteredReviews = [];
    switch (id) {

      case 'reviews-recent':

        filteredReviews = reviews.filter(function(a) {
          var currentDate = new Date();
          var currentHalfYear = new Date(currentDate.getFullYear(), currentDate.getMonth() - 6, currentDate.getDay());
          var dateComment = new Date(a.date);
          return dateComment >= currentHalfYear;
        });

        filteredReviews.sort(function(a, b) {
          var dateA = new Date(a.date);
          var dateB = new Date(b.date);
          return dateB - dateA;
        });

        break;
      case 'reviews-good':

        filteredReviews = reviews.filter(function(a) {
          return a.rating >= 3;
        });

        filteredReviews.sort(function(a, b) {
          return b.rating - a.rating;
        });

        break;
      case 'reviews-bad':

        filteredReviews = reviews.filter(function(a) {
          return a.rating <= 2;
        });

        filteredReviews.sort(function(a, b) {
          return a.rating - b.rating;
        });

        break;
      case 'reviews-popular':
        filteredReviews = reviews.slice(0);
        filteredReviews.sort(function(a, b) {
          return b['review-rating'] - a['review-rating'];
        });

        break;
      case 'reviews-all':
        filteredReviews = reviews;

        break;
    }

    renderReviews(filteredReviews);
    activeFilter = id;
  }

  function loadReviews() {
    var xhr = new XMLHttpRequest();
    filter.classList.add('invisible');
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
      reviewsContainer.classList.remove('reviews-list-loading');
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
