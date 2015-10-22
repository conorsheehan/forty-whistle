function simulatePathDrawing(path) {
  // var path = document.querySelector('.squiggle-animated path');
  var length = path.getTotalLength();
  // Clear any previous transition
  path.style.transition = path.style.WebkitTransition = 'none';
  // Set up the starting positions
  path.style.strokeDasharray = length + ' ' + length;
  path.style.strokeDashoffset = length;
  // Trigger a layout so styles are calculated & the browser
  // picks up the starting position before animating
  path.getBoundingClientRect();
  // Define our transition
  // path.style.transition = path.style.WebkitTransition = 'stroke-dashoffset 1.5s ease-in-out';
  path.style.transition = path.style.WebkitTransition = '';
  // Go!
  path.style.strokeDashoffset = '0';
  path.style.strokeWidth = '1px';
  path.style.strokeOpacity = '1';
  path.style.fill = 'rgba(0,0,0,1)';
}

// var chars = $('.svg-animated path').on('mouseover', function(e) {
//   simulatePathDrawing(this)
// })

function drawName() {
  var $name = $('.svg-name');
  var i = 0;
  $name.find('path').each(function() {
    var letterPath = this;
    setTimeout(function() {
      simulatePathDrawing(letterPath);
    }, i * 150 + 250);
    i += 1;
  });
}

function drawTitle() {
  var $title = $('.svg-title');
  var i = 0;
  $title.find('path').each(function() {
    var letterPath = this;
    setTimeout(function() {
      simulatePathDrawing(letterPath);
    }, i * 100 + 1000);
    i += 1;
  });
}

function drawStripes() {
  $('.stripes .stripe').addClass('active');
}

$(document).ready(function() {
  setTimeout(function() {
    drawStripes();
  }, 250);
  setTimeout(function() {
    drawName();
    drawTitle();
  }, 750);
});