import store from 'store';

/*cookie依赖函数*/
var cookieRely = {
	pluses: /\+/g,

	isFunction: function(s) {
		return(typeof s == 'function')
	},

	encode: function(s) {
		return config.raw ? s : encodeURIComponent(s);
	},

	decode: function(s) {
		return config.raw ? s : decodeURIComponent(s);
	},

	stringifyCookieValue: function(value) {
		return this.encode(config.json ? JSON.stringify(value) : String(value));
	},

	parseCookieValue: function(s) {
		if(s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(this.pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	},

	read: function(s, converter) {
		var value = config.raw ? s : this.parseCookieValue(s);
		return this.isFunction(converter) ? converter(value) : value;
	}
};

/*cookie*/
var cookie = function(key, value, options) {

	// Write

	if(value !== undefined && !cookieRely.isFunction(value)) {
		options = Object.assign(config.defaults, options);

		if(typeof options.expires === 'number') {
			var days = options.expires,
				t = options.expires = new Date();
			t.setTime(+t + days * 864e+5);
		}

		return(document.cookie = [
			cookieRely.encode(key), '=', cookieRely.stringifyCookieValue(value),
			options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
			options.path ? '; path=' + options.path : '',
			options.domain ? '; domain=' + options.domain : '',
			options.secure ? '; secure' : ''
		].join(''));
	}

	// Read

	var result = key ? undefined : {};

	// To prevent the for loop in the first place assign an empty array
	// in case there are no cookies at all. Also prevents odd result when
	// calling $.cookie().
	var cookies = document.cookie ? document.cookie.split('; ') : [];

	for(var i = 0, l = cookies.length; i < l; i++) {
		var parts = cookies[i].split('=');
		var name = cookieRely.decode(parts.shift());
		var _cookie = parts.join('=');

		if(key && key === name) {
			// If second argument (value) is a function it's a converter...
			result = cookieRely.read(_cookie, value);
			break;
		}

		// Prevent storing a cookie that we couldn't decode.
		if(!key && (_cookie = cookieRely.read(_cookie)) !== undefined) {
			result[name] = _cookie;
		}
	}

	return result;
};
var config = cookie;
config.defaults = {};

export default {
	cookie,
	store
}