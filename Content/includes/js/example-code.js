setTimeout(function() {
  var examples = document.querySelectorAll('.example');

  for (var i = 0, ii = examples.length; i < ii; i++) {
    var pre = el.create('pre', 'example-code');
    pre.textContent = examples[i].innerHTML;
    examples[i].parentNode.insertBefore(pre, examples[i].nextSibling);
  }

}, 5000);
