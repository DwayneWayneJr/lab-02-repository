'use strict';

const allHorns = [];
let keywords =[];

function NewGallery(horn) {
  this.image_url = horn.image_url;
  this.title = horn.title;
  this.description = horn.description;
  this.keyword = horn.keyword;
  this.horns = horn.horns;

  allHorns.push(this);

}

function uniqueList () {
  const uniqueKeywords = [];

  allHorns.forEach(image => {
    if(!uniqueKeywords.includes(image.keyword)){
      uniqueKeywords.push(image.keyword);
    }
  })
  uniqueKeywords.forEach(keyword => {
    let optionTag = `<option value=${keyword}>${keyword}</option>`;
    $('select').append(optionTag);
  })
}


NewGallery.prototype.render = function () {
  const template = $('#photo-template').html();

  const $newSection = $('<section></section>');

  $newSection.html(template);

  $newSection.find('h2').text(this.title);

  $newSection.find('p').text(this.description);

  $newSection.find('img').attr('src', this.image_url);

  $newSection.attr('class', this.keyword);

  $('main').append($newSection);


};

$.get('data/page-1.json', data => {
  data.forEach(horn => {
    new NewGallery(horn).render();
  })
  uniqueList();
});

$('select').on('change', function(){
  let thingThatWasClicked = $(this).val();
  if(thingThatWasClicked !== 'default'){
    $('section').hide();
    $(`section.${thingThatWasClicked}`).fadeIn();
  }
})
