window.addEventListener("load", function(){
	if(document.getElementById("ctl00_ContentPlaceHolder_PassLookupControl_VisualIDTextBox")){ document.getElementById("ctl00_ContentPlaceHolder_PassLookupControl_VisualIDTextBox").placeholder="Season Pass Barcode Number"; }
	if(document.getElementById("ctl00_ContentPlaceHolder_PassLookupControl_LastNameTextBox")){ document.getElementById("ctl00_ContentPlaceHolder_PassLookupControl_LastNameTextBox").placeholder="Last Name"; }
});


/* Function.bind polyfill
	Author: Mozilla
	Source: https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function/bind
	Purpose:
		Bind specific scopes to handlers
		Specifically included for use in event callbacks
*/

if (!Function.prototype.bind) {
//console.log('bind');
	Function.prototype.bind = function (oThis) {
		if (typeof this !== "function") {
			// closest thing possible to the ECMAScript 5 internal IsCallable function
			throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
		}

		var aArgs = Array.prototype.slice.call(arguments, 1),
			fToBind = this,
			fNOP = function () {},
			fBound = function () {
				return fToBind.apply(this instanceof fNOP && oThis
					? this
					: oThis,
			aArgs.concat(Array.prototype.slice.call(arguments)));
		};

		fNOP.prototype = this.prototype;
		fBound.prototype = new fNOP();

		return fBound;
	};
}



/* HERSHEY.tracking
	Authors: Doug Avery and Jeremy Frank, Viget
	Compatibility: jQuery 1.4.2 or better
*/

var HERSHEY = HERSHEY || {};

(function(H, $) {

	H.Tracking = function() {};

	H.Tracking.prototype = {

		version: '0.1.6',

		// Setup methods
		init: function(config) {
			this.setVars(config);
			this.setupGA();
			this.$document.ready(this.setupDOM.bind(this));
		},

		setVars: function(config) {
			this.$document = $(document);
			this.config = config || {
				account1: 'UA-000000-1'
			};
			this.debug = this.isDebug(window.location.href);

			H.tracker = this;
			this.debug && this.log('Entering');
			this.pageTracker = _gat._getTrackerByName();
		},

		setupGA: function() {
			_gaq.push(['_setAccount', this.config.account1]);
			this.config.account2 && _gaq.push(['t2._setAccount', this.config.account2]);

			this.setIgnoredRefs();
			this.push('_setDomainName', this.getDomain(document.domain));
			this.push('_setAllowLinker', true);
			this.push('_setAllowAnchor', true);

			this.config.title && this.push('_set', 'title', this.config.title);
			this.config.campaign && this.push('_setCustomVar', 1, 'Cmpn', this.config.campaign, 1);

			this.trackPageview();
		},

		trackPageview: function() {
			var urlToTrack = this.config.url || window.location.pathname + window.location.search;
			this.push('_trackPageview', urlToTrack + (this.config.urlSuffix || ''));
		},

		trackVirtualPageview: function(virtualURL) {
			this.push('_trackPageview', virtualURL);
		},

		setupDOM: function() {
			this.$body = $('body');
			this.$linksAndForms = $('a, form');

			this.updateCrossDomainURLs();

			this.bindImmediateEvents();
			this.bindDelayedClicks();
			this.bindDelayedSubmits();
			this.bindExternalEvents();
		},

		setIgnoredRefs: function() {
			for (var i = 0, length = this.whitelist.length; i < length; i++) {
				var domain = this.whitelist[i];
				this.push('_addIgnoredRef', domain);
			}
		},


		// Cross-domain methods
		updateCrossDomainURLs: function() {
			var self = this;
			self.$linksAndForms.each(function() {
				self.addLinkerUrl.call(self, this);
			});
		},

		addLinkerUrl: function(elem) {
			var attribute = elem.href ? 'href' : 'action';
			var url = elem[attribute];
			var isGetForm = !!(elem.method && elem.method.toLowerCase() === 'get');

			if(this.isWhitelisted(url) && !this.isCurrentDomain(url)) {
				elem.setAttribute(attribute, this.pageTracker._getLinkerUrl(url, isGetForm));
//console.log(this.pageTracker._getLinkerUrl(url, isGetForm));
			}
		},


		// Binding methods
		bindImmediateEvents: function() {
			this.delegate('click', 'a[data-track-event], button[data-track-event]', this.track.bind(this, 'a'));
			this.delegate('change', 'select[data-track-event]', this.track.bind(this, 'select'));
			this.delegate('submit', 'form[data-track-event]', this.track.bind(this, 'form'));
		},

		bindDelayedClicks: function() {
			this.delegate('click', 'a[data-track-delay]', this.trackThenForward.bind(this));
		},

		bindDelayedSubmits: function() {
			this.delegate('submit', 'form[data-track-delay]', this.trackThenSubmit.bind(this));
		},

		bindExternalEvents: function() {
			this.delegate('click', 'a', this.trackExternalClick.bind(this));
		},

		delegate: function(eventType, selector, callback) {
			if (this.$body.on) {
				this.$body.on(eventType, selector, callback);
			} else if (this.$body.delegate) {
				this.$body.delegate(selector, eventType, callback);
			} else {
				$(selector).live(eventType, callback);
			}
		},


		// Event handlers
		track: function(elemType, event) {
			var $target = this.getElemFromEvent(event, elemType);

			this.pushElemData($target);
			this.debug && event.preventDefault();
		},

		trackCustom: function(target) {
			this.pushElemData(target);
		},

		trackThenForward: function(event) {
			var $target = this.getElemFromEvent(event, 'a');
			var href = $target.attr('href');
			this.pushElemData($target);
			window.setTimeout(this.sendTo.bind(this, href), 100);
			event.preventDefault();
		},

		trackThenSubmit: function(event) {
			var $target = this.getElemFromEvent(event, 'form');

			this.pushElemData($target);
			window.setTimeout(this.submit.bind(this, $target), 100);
			event.preventDefault();
		},

		trackExternalClick: function(event) {
			var href = this.getElemFromEvent(event, 'a').attr('href');

			if(href !== undefined) {
				if(this.isMailto(href)) {
					this.trackMailto(href);
					this.debug && event.preventDefault();
				} else if (this.isFile(href) || this.isExternal(href)) {
					this.trackExternal(href);
					this.debug && event.preventDefault();
				}
			}
		},

		getElemFromEvent: function(event, elemType) {
			var elem = event.currentTarget;
			if (!this.isElemType(elem, elemType)) {
				elem = this.isElemType(event.target, elemType) ? event.target : $(event.target).closest(elemType);
			}
			return $(elem);
		},

		isElemType: function(elem, elemType) {
			return elem && elem.nodeName.toLowerCase() === elemType;
		},


		// Follow-through actions
		sendTo: function(url) {
			if (!this.debug) {
				document.location = url;
			}
			this.log('After 100ms, user sent to ' + url);
		},

		submit: function(form) {
			var $form = $(form);

			this.log('After 100ms, form submitted to ' + $form.attr('action'));

			if(!this.debug) {
				this.$body.undelegate('form[data-track-delay]', 'submit');
				$form.trigger('submit');
			}
		},


		// Pushing to GA
		pushElemData: function(elem) {
			var $elem = $(elem);
			var trackArray = ($elem.attr('data-track-event') || $elem.attr('data-track-delay')).split(',');

			if(trackArray[3] !== undefined) {
				trackArray[3] = Math.round(parseFloat(trackArray[3]));
			}

			trackArray.unshift('_trackEvent');
			this.push.apply(this, trackArray);
		},

		pushArrayData: function(tArray) {
			var trackArray = tArray.split(',');

			if(trackArray[3] !== undefined) {
				trackArray[3] = Math.round(parseFloat(trackArray[3]));
			}

			trackArray.unshift('_trackEvent');
			this.push.apply(this, trackArray);
		},

		push: function() {
			var trackArray = Array.prototype.slice.apply(arguments);
			var trackArrayT2 = this.duplicateArray(trackArray);

			if (this.debug) {
				this.log("_gaq.push(['" + trackArray.join("', '") + "'])");
				this.log("_gaq.push(['" + trackArrayT2.join("', '") + "'])");
			} else {
				_gaq.push(trackArray);
				_gaq.push(trackArrayT2);
			}
		},

		duplicateArray: function(array) {
			var arrayT2 = array.slice();
			arrayT2[0] = 't2.' + arrayT2[0];
			return arrayT2;
		},

		// URL methods
		isMailto: function(url) {
			return !!url.match('mailto:');
		},

		isFile: function(url) {
			return !!url.match(/\.(?:doc|eps|jpg|jpeg|gif|bmp|png|svg|xls|ppt|pdf|zip|txt|vsd|vxd|js|css|rar|exe|wma|mov|avi|wmv|mpg|m4v|mp4|mp3|docx|pptx|xlsx)($|\&|\?)/);
		},

		isWhitelisted: function(url) {
			var matches = false;
			var link = document.createElement('a');
			link.href = url;

			for (var i = 0, length = this.whitelist.length; i < length; i++) {
				if (link.hostname === this.whitelist[i] || link.hostname === 'www.' + this.whitelist[i] ) {
					matches = true;
				}
			}
			return matches;
		},

		isExternal: function(url) {
			return !this.isWhitelisted(url) && !this.isCurrentDomain(url);
		},

		isCurrentDomain: function(url) {
			var link = document.createElement('a');
			link.href = url;
			return link.hostname === '' || link.hostname === window.location.host;
		},

		getDomain: function(url) {
			var match = url.match(/\./g);
			return (match && match.length > 1)
				? this.getDomain(url.replace(/^.*?\./, ''))
				: url;
		},

		trackMailto: function(url) {
			var mailto = '/mailto/' + url.substring(7);
			this.push('_trackPageview', mailto);
		},

		trackExternal: function(url) {
			var link = document.createElement('a');
			link.href = url;

			var hostname = link.hostname === '' ? window.location.host : link.hostname;
			var pathname = (link.pathname.charAt(0) === '/') ? link.pathname : '/' + link.pathname;
			var trackedUrl = '/external/' + hostname + pathname;

			this.push('_trackPageview', trackedUrl);
		},

		addSlash: function(string) {
			return string[0] === '/' ? string : '/' + string;
		},


		// Debug methods
		isDebug: function(url) {
			return !!url.match(/#.*ga_debug/);
		},

		log: function(argument) {
			this.debug && window.console && window.console.log && window.console.log('Debug mode: ' + argument);
		},

		whitelist: [
			'example.com',
			'chocolatecoveredfebruary.com',
			'chocolatespa.com',
			'chocolatetownchallenges.com',
			'groupvisit.hersheypark.com',
			'hersheybears.com',
			'hersheycountryclub.com',
			'hersheyentertainment.com',
			'hersheyentertainmentandresorts.com',
			'hersheyjobs.com',
			'hersheylodge.com',
			'hersheymeetings.com',
			'hersheypa.com',
			'hersheypark.com',
			'hersheyparkcampingresort.com',
			'hersheyplatinum.com',
			'hersheysweetrecipes.com',
			'hrapply.com',
			'misc.hersheypa.com',
			'nexternal.com',
			'reservations.hersheypa.com',
			'staging.tickets.hersheypa.com',
			'store.hersheypa.com',
			'thecircular.com',
			'thehotelhershey.com',
			'tickets.hersheypa.com',
			'trip.hersheypa.com',
			'weddingsinhershey.com',
			'zooamerica.com'
		]
	};

	if(typeof module !== 'undefined') {
		module.exports = H;
	}

})(HERSHEY, jQuery);
