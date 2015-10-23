function drawPath(path) {
  var length = path.getTotalLength();
  // Clear any previous transition
  path.style.transition = path.style.WebkitTransition = 'none';
  // Set up the starting positions
  path.style.strokeDasharray = length + ' ' + length;
  path.style.strokeDashoffset = length;
  // Trigger a layout so styles are calculated & the browser
  // picks up the starting position before animating
  path.getBoundingClientRect();
  // Reset transition
  path.style.transition = path.style.WebkitTransition = '';
  // Go!
  path.style.strokeDashoffset = '';
  $(path).attr('class', 'shown');
}

function drawName() {
  var $name = $('.svg-name');
  var i = 0;
  $name.find('path').each(function() {
    var letterPath = this;
    setTimeout(function() {
      drawPath(letterPath);
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

function showSocialLink(link) {
  $(link).addClass('shown');
}

function showAllSocialLinks() {
  var i = 0;
  $('.social li').each(function() {
    var link = this;
    setTimeout(function() {
      showSocialLink(link);
    }, i * 100 + 3500);
    i++;
  })
}

$(document).ready(function() {
  setTimeout(function() {
    drawStripes();
    drawName();
    drawTitle();
    showAllSocialLinks();
  }, 250);
});