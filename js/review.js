'use strict';

(function() {
  var templateElem = document.querySelector('#review-template');
  var template = 'content' in templateElem ? templateElem.content : templateElem;
  templateElem.style.display = 'none';

  /**
  * @const {number}
  */
  var IMAGE_TIMEOUT = 1000000;
  // var timeOut;
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
    this.pictureFailure = this.pictureFailure.bind(this);
    this.pictureLoad = this.pictureLoad.bind(this);
  }

  Review.prototype.pictureLoad = function() {
    clearTimeout(this._timeOut);
  };

  Review.prototype.pictureFailure = function() {
    this._picture.onerror = null;
    this._picture.src = '';
    this.element.classList.add('review-load-failure');
    clearTimeout(this._timeOut);
  };

  Review.prototype.render = function() {
    this.element = template.children[0].cloneNode(true);
    this.element.querySelector('.review-rating').textContent = '';
    this.element.querySelector('.review-text').textContent = this._data.description;

    this._picture = new Image(124, 124);

    this._picture.onerror = this.pictureFailure;
    this._timeOut = setTimeout(this.pictureFailure, IMAGE_TIMEOUT);
    this._picture.onload = this.pictureLoad;

    this._picture.classList.add('review-author');
    this._picture.src = this._data.author.picture;
    this._picture.title = this._data.author.name;
    this._picture.alt = this._data.author.name;
    this.element.replaceChild(this._picture, this.element.querySelector('.review-author'));
    this.element.querySelector('.review-rating').classList.add('review-rating-' + RATINGS[this._data.rating - 1]);
  };

  window.Review = Review;
})();
