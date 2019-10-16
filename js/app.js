'use strict';

const allHorns = [];
let keywords =[];

function NewGallery(image_url, title, description, horns) {
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.horns = horns;

  allHorns.push(this);

}

function List (keyword) {
  this.keyword = keyword;

  keywords.push(this.keyword)
}


NewGallery.prototype.render = function () {
  const template = $('#photo-template').html();

  const $newSection = $('<section></section>');

  $newSection.html(template);

  $newSection.find('h2').text(this.title);

  $newSection.find('p').text(this.horns);

  $newSection.find('img').attr('src', this.image_url);

  $('main').append($newSection);


};

$.get('data/page-1.json', data => {
  data.forEach(horn => {
    new NewGallery(horn.image_url, horn.title, horn.description, horn.horns).render();
  });
});


// const uniqueSet = new Set(keywords);
// const backToKeywords = [...uniqueSet];
// console.log(backToKeywords);

