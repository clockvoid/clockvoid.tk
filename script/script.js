
//$ = require('jquery')
//require("../node_modules/mini.css/src/flavors/mini-default.scss");

$(document).ready(function () {
  PR.prettyPrint();
  var width = Math.min($('div.article').width(), $(window).width() - 32, $(window).height() - 100);
  $('#canvas').get(0).setAttribute("width", width.toString());
  $('#canvas').get(0).setAttribute("height", width.toString());
  startOthello();

  $('a[href^="#"]').click(function () {
    var speed = 400;
    var href = $(this).attr("href");
    var target = $(href == "#" || href == " " ? 'html' : href);
    var position = target.offset().top;
    $('body,html').animate({ scrollTop: position }, speed, 'swing');
    return false;
  });
});
