
var el = {

  usesClassList: typeof document !== 'undefined' && ('classList' in document.documentElement),

  get: function(_selector) {
    var elements = document.querySelectorAll(_selector)[0];
    return (elements.length > 1) ? elements[0] : elements;
  },

  getAll: function(_selector) {
    return document.querySelectorAll(_selector);
  },

  create: function(_tagName, _className) {
    var newElement = document.createElement(_tagName);

    if (_className) {
      newElement.classList.add(_className);
    }
    return newElement;
  },

  combinedChildrenDim: function(_parent) {
      var totalChildrenDim = {
        width: 0,
        height: 0
      };
      var children = _parent.children;

      for (var i = 0, ii = children.length; i < ii; i++) {
        totalChildrenDim['width'] += parseInt(children[i].offsetWidth);
        totalChildrenDim.height += children[i].offsetHeight;
      }

      return totalChildrenDim;
    }
};



var x = {
  // function
  // DATA SENDERS
  dataSenders: function() {
    var dataSenders = el.getAll('[data-send]');

    if (!!dataSenders) {
      for (var i = 0, ii = dataSenders.length; i < ii; i++) {

        dataSenders[i].addEventListener('click', function() {
          var broadcast = this.getAttribute('data-send');
          var dataReceivers = el.getAll('[data-receive="' + broadcast + '"]');

          for (var j = 0, jj = dataReceivers.length; j < jj; j++) {
            dataReceivers[j].classList.toggle('x-data-active');
          }
        }, false);
      }
    }
  },

  // object
  // DIALOG
  dialog: {
    overlay: el.get('#global-overlay'),
    content: el.get('#global-dialog-content'),
    activeClass: '-active',

    post: function(_body, _title) {
      if (_body) {
        var title = _title ? '<h1 class="x-title">' + _title + '<\/h1>' : '';
        var body = '<div class="x-content">' + _body + '<\/div>';

        x.dialog.content.innerHTML = title + body;
        x.dialog.overlay.classList.add(x.dialog.activeClass);
      }
    },

    close: function() {
      x.dialog.overlay.classList.remove(x.dialog.activeClass);
    }
  },

  // object
  // NOTIFICATION
  notification: {
    panel: el.get('.x-global-notification'),
    panelText: el.get('.x-global-notification--message'),
    triggers: el.getAll('[data-notification]'),

    animate: function() {
      x.notification.panel.classList.remove('x-data-active');
      void x.notification.panel.offsetWidth;
      x.notification.panel.classList.add('x-data-active');
    },

    setType: function(_type) {
      x.notification.panel.classList.toggle('-success', _type === 'success');
      x.notification.panel.classList.toggle('-warning', _type === 'warning');
      x.notification.panel.classList.toggle('-error', _type === 'error');
    },

    setMessage: function(_text) {
      x.notification.panelText.innerHTML = _text;
    },

    post: function(_message, _type) {
      var messageType = _type ? _type : 'info';

      x.notification.setType(messageType);
      x.notification.setMessage(_message);
      x.notification.animate();
    },

    init: function() {
      var triggers = x.notification.triggers;
      var messageType = false;

      for (var i = 0, ii = x.notification.triggers.length; i < ii; i++) {
        triggers[i].addEventListener('click', function() {
          var msg = this.getAttribute('data-notification');
          var msgType = this.hasAttribute('data-notification-type') ? this.getAttribute('data-notification-type') : 'info';

          x.notification.post(msg, msgType);
        }, false);
      }
    }
  },

  // function
  // ADJUST PAGE PADDING
  adjustPagePadding: function() {
    var globalHeader = el.get('.x-global-header');
    var pageHeader = el.get('.x-page--header');

    pageHeader.style['padding-top'] = globalHeader.offsetHeight + 'px';
  },

  // object
  // CAROUSEL
  carousels: {
    activeControls: function(_carousel, _rowX) {
      var carousel = _carousel;
      var rowX = _rowX;

      var carouselWidth = parseInt(carousel.offsetWidth);
      var row = carousel.querySelector('.x-row');
      var rowWidth = parseInt(el.combinedChildrenDim(row).width);
      var controls = {
        left: carousel.querySelector('.x-carousel--control.-left'),
        right: carousel.querySelector('.x-carousel--control.-right')
      };

      if (rowWidth > carouselWidth) {
        controls.left.classList.toggle('-active', rowX < 0);
        controls.right.classList.toggle('-active', (rowWidth + rowX) > carouselWidth);
      }
    },

    click: function() {
      var direction = this.classList.contains('-left') ? 'left' : 'right';
      var carousel = this.parentNode;
      var carouselWidth = parseInt(carousel.offsetWidth);
      var row = carousel.querySelector('.x-row');
      var rowWidth = parseInt(el.combinedChildrenDim(row).width);
      var rowStyles = window.getComputedStyle(row, null);
      var rowX = parseInt(rowStyles.getPropertyValue('transform').split(',')[4]);

      if ((direction === 'right') && (rowWidth + rowX) > carouselWidth) {
        rowX -= (carouselWidth * 0.9);
      }
      else if (direction === 'left' && rowX < 0) {
        rowX = (rowX < (carouselWidth * -0.9)) ? rowX += (carouselWidth * 0.9) : 0;
      }
      row.style.transform = 'translateX(' + rowX + 'px)';
      x.carousels.activeControls(carousel, rowX);
    },

    init: function() {
      var carousels = el.getAll('.x-carousel');

      for (var i = 0, ii = carousels.length; i < ii; i++) {
        var controls = carousels[i].querySelectorAll('.x-carousel--control');
        x.carousels.activeControls(carousels[i], 0);

        for (var j = 0, jj = controls.length; j < jj; j++) {
          controls[j].addEventListener('click', x.carousels.click, false);
        }
      }
    }
  },

  // object
  // SCROLL FOCUS
  scrollFocus: {

    applyTo: '.js-scroll-focus',
    margin: 200,
    class: '-in-focus',

    getAllSections: function() {
      return el.getAll(x.scrollFocus.applyTo);
    },

    isInView: function(_element) {
      var windowHeight = window.innerHeight - x.scrollFocus.margin;
      var elementTop = _element.getBoundingClientRect().top;
      var elementBottom = _element.getBoundingClientRect().bottom;

      return ((elementTop < windowHeight) && (elementBottom > x.scrollFocus.margin));
    },

    detect: function() {
      var sections = x.scrollFocus.getAllSections();

      for (var i = 0, ii = sections.length; i < ii; i++) {
        var audios = sections[i].querySelectorAll('audio');
        var videos = sections[i].querySelectorAll('video');

        sections[i].classList.toggle(x.scrollFocus.class, x.scrollFocus.isInView(sections[i]));

        for (var j = 0, jj = videos.length; j < jj; j++) {
          x.scrollFocus.isInView(sections[i]) ? audios[j].play() : audios[j].pause();
        }
        for (var j = 0, jj = videos.length; j < jj; j++) {
          x.scrollFocus.isInView(sections[i]) ? videos[j].play() : videos[j].pause();
        }
      }
    },

    init: function() {
      x.scrollFocus.detect();
      document.addEventListener('scroll', function() {
        x.scrollFocus.detect();
      });
    }
  },

  // HELP
  help: function() {
    var helpClass = 'x-help';
    var requests = el.getAll('[data-help]');

    for (var i = 0, ii = requests.length; i < ii; i++) {
      requests[i].addEventListener('click', function() {
        if (!!this.querySelector('.x-help')) {
          this.removeChild(this.querySelector('.x-help'));
        }
        else {
          var template = el.get('#' + this.getAttribute('data-help'));
          var clone = document.importNode(template.content, true);
          var helpDiv = el.create('div', helpClass);
          var closeX = el.create('span', 'x-close-icon');

          closeX.innerText = '\u2715';
          helpDiv.appendChild(closeX);
          helpDiv.appendChild(clone);
          this.appendChild(helpDiv);
        }
      }, false);
    }
  }
};

x.dataSenders();
x.adjustPagePadding();
x.carousels.init();
x.notification.init();
x.scrollFocus.init();
x.help();
