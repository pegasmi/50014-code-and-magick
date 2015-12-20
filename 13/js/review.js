'use strict';

(function() {
  var template = document.querySelector('#review-template');
   /**
  * @const {number}
  */
  var IMAGE_TIMEOUT = 1000;
  /**
   *@param{Object} data
   *@constructor
   */

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

  function Review(data) {
    this._data = data;
  }

  Review.prototype.render = function() {

    function checkTemplate() {
      if ('content' in template) {
        return template.content;
      } else {
        template.style.display = 'none';
        return template;
      }
    }

    var elementParent = checkTemplate();
    this.element = elementParent.children[0].cloneNode(true);
    this.element.querySelector('.review-rating').textContent = '';
    this.element.querySelector('.review-text').textContent = this._data.description;

    var picture = new Image(124, 124);

    var failure = function() {
      picture.src = '';
      this.element.classList.add('review-load-failure');
      clearTimeout(timeOut);
    }.bind(this);

    var timeOut = setTimeout(failure, IMAGE_TIMEOUT);
    picture.onerror = failure;

    picture.onload = function() {
      clearTimeout(timeOut);
    };


    picture.classList.add('review-author');
    picture.src = this._data.author.picture;
    picture.title = this._data.author.name;
    picture.alt = this._data.author.name;
    this.element.replaceChild(picture, this.element.querySelector('.review-author'));
    this.element.querySelector('.review-rating').classList.add('review-rating-' + RATINGS[this._data.rating - 1]);

  };

  window.Review = Review;
})();
