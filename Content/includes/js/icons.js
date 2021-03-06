setTimeout(function() {
  var target = document.querySelector('.icons--output');
  var symbols = document.querySelectorAll('svg.svg-icons symbol');
  var innerHTML = '<div class="x-row -wrap">';

  for (var i = 0, ii = symbols.length; i < ii; i++) {
    innerHTML += '<div class="x-card">';
    innerHTML += '  <div class="x-padding">';
    innerHTML += '    <svg class="x-icon -' + symbols[i].id.substring(6) + '">';
    innerHTML += '      <use xlink:href="#' + symbols[i].id + '"></use>';
    innerHTML += '    <\/svg>';
    innerHTML += '    <p>';
    innerHTML +=        symbols[i].querySelector('title').textContent + '<br \/>';
    innerHTML += '      <small>#' + symbols[i].id + '<\/small>';
    innerHTML += '  <\/div>';
    innerHTML += '<\/div>';
  }

  target.innerHTML = innerHTML + '<\/div>';
}, 5000);
