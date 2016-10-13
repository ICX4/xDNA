
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
  // NOTIFY
  notify: {
    panel: el.get('.x-global-notification'),
    panelText: el.get('.x-global-notification--message'),
    triggers: el.getAll('[data-notify]'),

    animate: function() {
      x.notify.panel.classList.remove('x-data-active');
      void x.notify.panel.offsetWidth;
      x.notify.panel.classList.add('x-data-active');
    },

    setType: function(_type) {
      x.notify.panel.classList.toggle('-success', _type === 'success');
      x.notify.panel.classList.toggle('-warning', _type === 'warning');
      x.notify.panel.classList.toggle('-error', _type === 'error');
    },

    setMessage: function(_text) {
      x.notify.panelText.innerHTML = _text;
    },

    init: function() {
      var triggers = x.notify.triggers;
      var messageType = false;

      for (var i = 0, ii = x.notify.triggers.length; i < ii; i++) {
        triggers[i].addEventListener('click', function() {
          x.notify.setType(this.hasAttribute('data-notify-type') ? this.getAttribute('data-notify-type') : 'info');
          x.notify.setMessage(this.getAttribute('data-notify'));
          x.notify.animate();
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
  }
};

x.dataSenders();
x.adjustPagePadding();
x.carousels.init();
x.notify.init();
