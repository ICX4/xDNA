
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

  createIcon: function(_href) {
    var icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    var use = document.createElementNS('http://www.w3.org/2000/svg', 'use');

    icon.classList.add('x-icon');
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', _href);

    icon.appendChild(use);

    return icon;
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

  // object
  // NESTED MENU
  nestedMenu: {
    JSON: null,
    parent: el.get('.x-nested-menu--container'),
    icons: {
      'home': 'home',
      'data:view': 'grid',
      'case:flow': 'puzzle-piece',
      'alignment': 'shuffle',
      'admin:view': 'cog',
      'support': 'life-ring',

      'global': 'global',
      'atoms': 'atom',
      'molecules': 'molecule',
      'organisms': 'organism',
      'build your own': 'puzzle-piece'
    },

    createNav: function(_id) {
      var nav = el.create('nav', 'x-nested-menu');

      nav.setAttribute('data-receive', _id);

      return nav;
    },

    createCrumbs: function(_object, _indices) {
      var indexString = _indices.join('-');
      var ul = el.create('ul');

      for (var i = 0, ii = _indices.length; i < ii; i++) {
        var breadcrumb = el.create('li', 'x-nested-menu--breadcrumb');

        breadcrumb.textContent = _object[_indices[i]].Text;
        if (i !== (ii -1)) {
          breadcrumb.setAttribute('data-send', 'mm-uid-' + indexString.substring(0, (i * 2) + 1) + ', mm-uid-' + indexString);
        }
        ul.appendChild(breadcrumb);

        if (i > 0) {
          _object = _object[_indices[i]].ChildMenuItems;
        }
      }

      return ul;
    },

    createBackLink: function(_indices) {
      var indexString = _indices.join('-');
      var backString = indexString.substring(0, (_indices.length * 2) - 3);
      var backLink = el.create('a', 'x-nested-menu--back');

      backLink.textContent = 'Back';
      backLink.setAttribute('data-send', 'mm-uid-' + backString + ', mm-uid-' + indexString);

      return backLink;
    },

    createItem: function(_link, _text) {
      var xLink = el.create('a', 'x-link');
      var span = el.create('span');

      xLink.setAttribute (_link.substring(0, 6) === 'mm-uid' ? 'data-send' : 'href', _link);
      span.textContent = _text;

      if (x.nestedMenu.icons.hasOwnProperty(_text.toLowerCase())) {
        var xIcon = el.createIcon('#icon--' + x.nestedMenu.icons[_text.toLowerCase()]);

        xLink.appendChild(xIcon);
      }

      xLink.appendChild(span);

      return xLink;
    },

    traverse: function(_object, _index) {
      var index = !!_index ? _index : '-0';
      var subMenu = {
        children: [],
        indices: [],
        parents: index.substring(1).split('-')
      }
      var nav = x.nestedMenu.createNav('mm-uid' + index);

      if (subMenu.parents.length > 1) {
        nav.appendChild(x.nestedMenu.createCrumbs(x.nestedMenu.JSON, subMenu.parents));
        nav.appendChild(x.nestedMenu.createBackLink(subMenu.parents));
      }

      for (var i = 0, ii = Object.keys(_object).length; i < ii; i++) {

        if (!!Object(_object)[i].ChildMenuItems.length) {
          link = 'mm-uid' + index + '-' + i + ', mm-uid' + index;
          subMenu.indices.push(index + '-' + i);
          subMenu.children.push(Object(_object)[i].ChildMenuItems);
        }
        else {
          link = Object(_object)[i].Link;
        }

        var xLink = x.nestedMenu.createItem(link, Object(_object)[i].Text);
        nav.appendChild(xLink);

        if (index === '-0') {
          nav.classList.add('x-active');
        }
      }

      x.nestedMenu.parent.appendChild(nav);

      for (var i = 0, ii = subMenu.indices.length; i < ii; i++) {
        x.nestedMenu.traverse(subMenu.children[i], subMenu.indices[i]);
      }
    },

    init: function(_menuObject) {
      x.nestedMenu.JSON = _menuObject;
      this.traverse(x.nestedMenu.JSON);
    }
  },

  // function
  // NESTED MENU
  globalMenu: function() {
    var className = 'x-global-menu';
    var activeClass = '-show';
    var menu = el.get('.' + className);
    var menuHeight = menu.offsetHeight;
    var lastScrollTop = 0;

    document.addEventListener('scroll', function() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        // scrolling down
        if (scrollTop > menuHeight && menu.classList.contains(activeClass)) {
            menu.classList.remove(activeClass);
        }
      }
      else {
        // scrolling up
        if (!menu.classList.contains(activeClass)) {
          menu.classList.add(activeClass);
        }
      }

      lastScrollTop = scrollTop;
    }, false);
  },

  // function
  // DATA SENDERS
  dataSenders: function (_dataSenders) {
    if (!!_dataSenders) {
      for (var i = 0, ii = _dataSenders.length; i < ii; i++) {

        _dataSenders[i].addEventListener('click', function () {
          var broadcasts = this.getAttribute('data-send').split(',');

          for (var j = 0, jj = broadcasts.length; j < jj; j++) {
            var broadcast = broadcasts[j].trim();
            var dataReceivers = el.getAll('[data-receive="' + broadcast + '"]');

            for (var k = 0, kk = dataReceivers.length; k < kk; k++) {
              dataReceivers[k].classList.toggle('x-active');
            }
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
    triggers: '[data-notification]',

    animate: function() {
      x.notification.panel.classList.remove('x-active');
      void x.notification.panel.offsetWidth;
      x.notification.panel.classList.add('x-active');
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
      var triggers = el.getAll(x.notification.triggers);
      var messageType = false;

      for (var i = 0, ii = triggers.length; i < ii; i++) {
        triggers[i].addEventListener('click', function() {
          var msg = this.getAttribute('data-notification');
          var msgType = this.hasAttribute('data-notification-type') ? this.getAttribute('data-notification-type') : 'info';

          x.notification.post(msg, msgType);
        }, false);
      }
    }
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

setTimeout(function() {
  x.nestedMenu.init(menuJSON);
  x.globalMenu();
  x.dataSenders(el.getAll('[data-send]'));
  x.carousels.init();
  x.notification.init();
  x.scrollFocus.init();
  x.help();
}, 5000);
