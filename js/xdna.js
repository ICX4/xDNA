
var el = {

  usesClassList: typeof document !== 'undefined' && ('classList' in document.documentElement),

  get: function(_selector) {
    var elements = document.querySelectorAll(_selector)[0];
    return (elements.length > 1) ? elements[0] : elements;
  },

  getAll: function(_selector) {
    return document.querySelectorAll(_selector);
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

  hideTitles: {

    for: function(_elements) {
      var elements = el.getAll(_elements + '[title]');

      for (var i = 0, ii = elements.length; i < ii; i++) {
        elements[i].addEventListener('mouseover', function(_event) {
          _event.preventDefault();
        }, false);
      }
    }
  }
};

x.dataSenders();
x.adjustPagePadding();
x.carousels.init();
x.notification.init();

x.hideTitles.for('abbr');

x.notification.post('WELCOME TO xDNA!');
