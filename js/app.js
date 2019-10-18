'use strict';

let allHorns = [];
let keywords = [];
let uniqueKeywords = [];

function NewGallery(horn) {
  this.image_url = horn.image_url;
  this.title = horn.title;
  this.description = horn.description;
  this.keyword = horn.keyword;
  this.horns = horn.horns;

  allHorns.push(this);

}

NewGallery.prototype.toHtml = function () {
  console.log('hello');
  let template = $('#horns-template').html();
  let templateRender = Handlebars.compile(template);
  return templateRender(this);
};
console.log(allHorns);

function uniqueList() {
  uniqueKeywords = [];
  console.log(uniqueKeywords);

  allHorns.forEach(image => {
    if (!uniqueKeywords.includes(image.keyword)) {
      uniqueKeywords.push(image.keyword);
    }
  });

  $('select').empty();
  uniqueKeywords.forEach(keyword => {
    let optionTag = `<option value=${keyword}>${keyword}</option>`;
    $('select').append(optionTag);
  });
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
    new NewGallery(horn);
  });
  allHorns.forEach(image => {
    $('#photo-template').append(image.toHtml());
  });
  uniqueList();
});

function page1() {

  $('#btn1').click(function () {
    // $('#photo-template').empty();
    // $('#keyword').empty();
    $('#photo-template').siblings().remove();
    $.get('data/page-1.json', data => {
      data.forEach(horn => {
        // new NewGallery(horn).render();
      });
    });
  });
}
page1();

$('#btn2').click(function () {
  $('#photo-template').empty();
  allHorns = [];
  $.get('data/page-2.json', data => {
    data.forEach(horn => {
      new NewGallery(horn);
    });
    allHorns.forEach(image => {
      $('#photo-template').append(image.toHtml());
    });
    uniqueList();
  });
});

$('select').on('change', function () {
  let thingThatWasClicked = $(this).val();
  if (thingThatWasClicked !== 'default') {
    $('section').hide();
    $('#photo-template').show();
    $(`section.${thingThatWasClicked}`).fadeIn();
    console.log(thingThatWasClicked);
  }
});
