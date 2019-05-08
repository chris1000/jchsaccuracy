(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD (Register as an anonymous module)
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		module.exports = factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (arguments.length > 1 && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {},
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling $.cookie().
			cookies = document.cookie ? document.cookie.split('; ') : [],
			i = 0,
			l = cookies.length;

		for (; i < l; i++) {
			var parts = cookies[i].split('='),
				name = decode(parts.shift()),
				cookie = parts.join('=');

			if (key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

config.defaults = {expires: 180, path:'/'};


	$.removeCookie = function (key, options) {
		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));


var cookieName = 'current-branding';
function changeBranding(branding) {
    $.cookie(cookieName, branding);
    $("#accentcolor" ).attr("href", '/js/skin/' + branding + '.css');

}
$(document).ready(function(){ 
    if( $.cookie(cookieName)) {
        changeBranding($.cookie(cookieName));
    }
	$("#reset").click( function(){ $
       changeBranding('skin1');
    });
    $(".color1").click( function(){ $
       changeBranding('skin1');
    });
    $(".color2").click( function(){ $
       changeBranding('skin2');
    });
	 $(".color3").click( function(){ $
       changeBranding('skin3');
    });
	 $(".color4").click( function(){ $
       changeBranding('skin4');
    });
 	$(".color5").click( function(){ $
       changeBranding('skin5');
    });
	  $(".color6").click( function(){ $
       changeBranding('skin6');
    });
	  $(".color7").click( function(){ $
       changeBranding('skin7');
    });
	  $(".color8").click( function(){ $
       changeBranding('skin8');
    });
	  $(".color9").click( function(){ $
       changeBranding('skin9');
    });
	  $(".color10").click( function(){ $
       changeBranding('skin10');
    });
	  $(".color11").click( function(){ $
       changeBranding('skin11');
    });
	  $(".color12").click( function(){ $
       changeBranding('skin12');
    });
});


var resize = new Array('p','.resizable');
  resize = resize.join(',');
  
  //resets the font size when "reset" is clicked
  var resetFont = $(resize).css('font-size');
  if($.cookie('fontSize'))
  {
   $(resize).css('font-size', parseInt($.cookie('fontSize')));
  }
    $("#reset").click(function(){
      $(resize).css('font-size', resetFont);
      $.cookie('fontSize', resetFont);
		return false;
    });
  
  //increases font size when "+" is clicked
  $("#increase").click(function(){
    var originalFontSize = $(resize).css('font-size');
    var originalFontNumber = parseFloat(originalFontSize, 10);
    var newFontSize = originalFontNumber*1.1;
    $.cookie('fontSize', newFontSize);
    $(resize).css('font-size', newFontSize);
    return false;
  });
  
  //decrease font size when "-" is clicked
  
  $("#decrease").click(function(){
    var originalFontSize = $(resize).css('font-size');
    var originalFontNumber = parseFloat(originalFontSize, 10);
    var newFontSize = originalFontNumber*0.8;
    $.cookie('fontSize', newFontSize);
    $(resize).css('font-size', newFontSize);
    return false;
  });


console.log($(resize).css('font-size'));

$.cookie($(resize).css('font-size'));


(function (win, doc, nav, params, namespace, undefined) {
    'use strict';

    var util = {
        keycode: {
            ESCAPE: 27
        },
        getRequest: function () {
            if (win.XDomainRequest) {
                return new win.XDomainRequest();
            }
            if (win.XMLHttpRequest) {
                return new win.XMLHttpRequest();
            }
            return null;
        },
        loadScript: function (src, parent, callback) {
            var script = doc.createElement('script');
            script.src = src;

            script.addEventListener('load', function onLoad() {
                this.removeEventListener('load', onLoad, false);
                callback();
            }, false);

            parent.appendChild(script);
        },
        loadResource: function (url, callback) {
            var request = this.getRequest();

            if (!request) {
                return null;
            }

            request.onload = function () {
                callback(this.responseText);
            };
            request.open('GET', url, true);

            win.setTimeout(function () {
                request.send();
            }, 0);

            return request;
        },
        getStyleList: function (element) {
            var value = element.getAttribute('class');
            if (!value) {
                return [];
            }
            return value.replace(/\s+/g, ' ').trim().split(' ');
        },
        hasStyleName: function (element, name) {
            var list = this.getStyleList(element);
            return !!list.length && list.indexOf(name) >= 0;
        },
        addStyleName: function (element, name) {
            var list = this.getStyleList(element);
            list.push(name);
            element.setAttribute('class', list.join(' '));
        },
        removeStyleName: function (element, name) {
            var list = this.getStyleList(element), index = list.indexOf(name);
            if (index >= 0) {
                list.splice(index, 1);
                element.setAttribute('class', list.join(' '));
            }
        },
        isSupportedBrowser: function () {
            return 'localStorage' in win &&
                   'querySelector' in doc &&
                   'addEventListener' in win &&
                   'getComputedStyle' in win && doc.compatMode === 'CSS1Compat';
        }
    };

    // Button

    var Button = function Button(element, contentElement) {
        var self = this;

        element.addEventListener('click', function (event) {
            self.onClick(event);
        }, false);

        this._element = element;
        this._contentElement = contentElement || this._element;
    };

    Button.prototype.onClick = function () {};

    Button.prototype.setText = function (text) {
        this._contentElement.textContent = text;
        return this;
    };

    // Select

    var Select = function Select(form, itemName) {
        var self = this;

        form.reset();

        form.addEventListener('click', function (event) {
            var target = event.target;
            if ('value' in target) {
                self.onSelect(target.value);
            }
        }, false);

        form.addEventListener('change', function (event) {
            var target = event.target;
            if (target.checked) {
                self.onChange(target.value);
            }
        }, false);

        this._form = form;
        this._itemName = itemName;
    };

    Select.prototype.onSelect = function () {};

    Select.prototype.onChange = function () {};

    Select.prototype.isHidden = function () {
        return this._form.hasAttribute('hidden');
    };

    Select.prototype.getItems = function () {
        return this._form[this._itemName] || [];
    };

    Select.prototype.getValue = function () {
        var i, n, items = this.getItems();
        for (i = 0, n = items.length; i < n; i++) {
            if (items[i].checked) {
                return items[i].value;
            }
        }
        return '';
    };

    Select.prototype.setValue = function (value) {
        var i, n, items = this.getItems();
        if (value === this.getValue()) {
            return this;
        }
        for (i = 0, n = items.length; i < n; i++) {
            if (items[i].value === value) {
                items[i].checked = true;
                this.onChange(value);
                break;
            }
        }
        return this;
    };

    Select.prototype.setHidden = function (hidden) {
        hidden = !!hidden;
        if (hidden !== this.isHidden()) {
            this._form[(hidden ? 'set' : 'remove') + 'Attribute']('hidden', '');
            this.onHiddenChange(hidden);
        }
        return this;
    };

    Select.prototype.onHiddenChange = function () {};

    // Widget

    var Widget = function Widget(options) {
        var self = this,
            active,
            select = options.select,
            element = options.element,
            storage = options.storage,
            autoMode = options.autoMode,
            pageLang = options.pageLang,
            userLang = options.userLang,
            translator = options.translator,
            leftButton = options.leftButton,
            rightButton = options.rightButton,
            closeButton = options.closeButton,
            defaultLang;

        this._element = element;
        this._pageLang = pageLang;
        this._translator = translator;

        this.onStateChange = function (name, enable) {
            if (name === 'active') {
                storage.setValue('active', enable);
            }
        };

        select.onSelect = function (lang) {
            this.setHidden(true);
            self.translate(lang);
        };

        select.onChange = function (lang) {
            storage.setValue('lang', lang);
            rightButton.setText(lang);
            self.setState('invalid', lang === pageLang);
        };

        select.onHiddenChange = function (hidden) {
            var docElem = doc.documentElement, formRect;
            self.setState('expanded', !hidden);
            if (!hidden) {
                self.setState('right', false)
                    .setState('bottom', false);
                element.focus();
                formRect = this._form.getBoundingClientRect();

                if (formRect.right + (win.pageXOffset || docElem.scrollLeft) + 1 >= Math.max(docElem.clientWidth, docElem.scrollWidth)) {
                    self.setState('right', true);
                }

                if (formRect.bottom + (win.pageYOffset || docElem.scrollTop) + 1 >= Math.max(docElem.clientHeight, docElem.scrollHeight)) {
                    self.setState('bottom', true);
                }
            }
        };

        element.addEventListener('blur', function () {
            select.setHidden(true);
        }, false);

        element.addEventListener('keydown', function (event) {
            switch (event.keyCode) {
                case util.keycode.ESCAPE:
                    select.setHidden(true);
                    break;
            }
        }, false);

        translator.on('error', function () {
            this.abort();
            self.setState('busy', false)
                .setState('error', true);
        });

        translator.on('progress', function (progress) {
            switch (progress) {
                case 0:
                    self.setState('busy', true)
                        .setState('active', true);
                    break;

                case 100:
                    self.setState('done', true)
                        .setState('busy', false);
                    break;
            }
        });

        leftButton.onClick = function () {
            select.setHidden(true);
            self.translate(select.getValue());
        };

        rightButton.onClick = function () {
            if (self.hasState('active')) {
                translator.undo();
                self.setState('busy', false)
                    .setState('done', false)
                    .setState('error', false)
                    .setState('active', false);
            } else {
                select.setHidden(!select.isHidden());
            }
        };

        closeButton.onClick = function () {
            select.setHidden(true);
        };

        defaultLang = storage.getValue('lang') || userLang;

        if (defaultLang) {
            select.setValue(defaultLang);
            active = storage.getValue('active');
            if (active || (autoMode && active === undefined)) {
                this.translate(defaultLang);
            }
        }
    };

    Widget.prototype.hasState = function (name) {
        return util.hasStyleName(this._element, 'yt-state_' + name);
    };

    Widget.prototype.setState = function (name, enable) {
        var hasState = this.hasState(name);
        enable = !!enable;
        if (enable === hasState) {
            return this;
        }
        util[(enable ? 'add' : 'remove') + 'StyleName'](
            this._element, 'yt-state_' + name
        );
        this.onStateChange(name, enable);
        return this;
    };

    Widget.prototype.translate = function (targetLang) {
        if (targetLang && !this.hasState('active')) {
            this._translator.translate(this._pageLang, targetLang);
        }
        return this;
    };

    Widget.prototype.onStateChange = function () {};

    // Storage

    var Storage = function Storage(name) {
        this._name = name;
        try {
            this._data = win.JSON.parse(win.localStorage[name]);
        } catch (error) {
            this._data = {};
        }
    };

    Storage.prototype.getValue = function (prop) {
        return this._data[prop];
    };

    Storage.prototype.setValue = function (prop, value) {
        this._data[prop] = value;
        try {
            win.localStorage[this._name] = win.JSON.stringify(this._data);
        } catch (error) {}
    };

    var wrapper = doc.getElementById(params.widgetId);

    if (!wrapper || !util.isSupportedBrowser()) {
        return;
    }

    var initWidget = function () {
        util.loadScript('https://yastatic.net/s3/translate/v19.4.4/js/tr_page.js', wrapper, function () {
            util.loadResource('widget.html',
                function (responseText) {
                    var element;

                    if (!responseText) {
                        return;
                    }

                    wrapper.innerHTML = responseText;
                    element = wrapper.querySelector('.yt-widget');
                    if (params.widgetTheme) {
                        element.setAttribute('data-theme', params.widgetTheme);
                    }

                    new Widget({
                        select: new Select(element.querySelector('.yt-listbox'), 'yt-lang'),
                        element: element,
                        storage: new Storage('yt-widget'),
                        autoMode: params.autoMode === 'true',
                        pageLang: params.pageLang,
                        userLang: (nav.language || nav.userLanguage || '').split('-')[0],
                        translator: new namespace.PageTranslator({
                            srv: 'tr-url-widget',
                            sid: '221ece32.5cd1c266.795d07df',
                            url: 'https://translate.yandex.net/api/v1/tr.json/translate',
                            autoSync: true,
                            maxPortionLength: 600
                        }),
                        leftButton: new Button(element.querySelector('.yt-button_type_left')),
                        rightButton: new Button(
                            element.querySelector('.yt-button_type_right'),
                            element.querySelector('.yt-button_type_right > .yt-button__text')
                        ),
                        closeButton: new Button(element.querySelector('.yt-button_type_close'))
                    });
                }
            );
        });
    };

    if (doc.readyState === 'complete' || doc.readyState === 'interactive') {
        initWidget();
    } else {
        doc.addEventListener('DOMContentLoaded', initWidget, false);
    }
})(this, this.document, this.navigator, {"pageLang":"en","widgetTheme":"light","autoMode":"false","widgetId":"ytWidget"}, this.yt = this.yt || {});

