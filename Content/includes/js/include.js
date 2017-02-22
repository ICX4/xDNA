/*if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
} */

var include = {
  folder: 'Content\/includes',
  fileType: 'html',
  selector: 'data-include-html',
  DOMselector: function() {
    return '[' + include.selector +']';
  },

  getAll: function(_selector) {
    return document.querySelectorAll(_selector);
  },



  xhttp: function(_file, _target, _method) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        var html = this.responseText;

        if (_method === 'insert') {
          _target.innerHTML = html;
          _target.removeAttribute(include.selector);
        }
        else {
          _target.outerHTML = html;
        }
      }
    }
    xhttp.open("GET", _file, true);
    xhttp.send();
    return;
  },

  process: function(_include) {
    var target = _include;
    var settings = (_include.getAttribute(include.selector).split(','));
    var file = include.folder + '\/' + settings[0].trim() + '.' + include.fileType;
    var method = !!settings[1] ? settings[1].trim() : 'insert';

    include.xhttp(file, target, method);
  },

  init: function() {
    var includes = include.getAll(include.DOMselector());

    if (includes) {
      for (var i = 0, ii = includes.length; i < ii; i++) {
        include.process(includes[i]);
      }
    }
  }
}

include.init();
