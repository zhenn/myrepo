/**
 * @fileoverview 播放flash
 * @author zhenn
 */
define(function(require, exports, module) {
	
	var Base = require('module/base/index');

    var Flv = Base.extend({

    	defaults: {
    		wrap: '#wrap',
    		source: 'http://flv-player.net/medias/KyodaiNoGilga.flv'
    	},

    	initialize: function() {

    		var self = this,
    			wrap = $(self.get('wrap'));
    			videoSourceArr = [
					'<video id="video1" width="0" height="0">',
			        	'<source type="video/x-flv">',
			    	'</video>'
				],
				element = $(videoSourceArr.join('')),
				ch = self.ch = document.documentElement.clientHeight,
				cw =self.cw = document.body.clientWidth;

    		wrap.append(element);
    		element.find('source').attr('src', self.get('source'));
    	},

    	play: function(wrap, source) {

    		var self = this;
    		
    		VideoJS('video1', {
		    	techOrder: ['flash'],
			    autoplay: true,
			    controlBar: {
					captionsButton: false,
					chaptersButton: false,
					liveDisplay: false,
					playbackRateMenuButton: false,
					subtitlesButton: false
				}

		    }).ready(function() {
		    
		    	$(this.el)
			    	.addClass('video-js vjs-default-skin')
			    	.css({
			    		width: self.cw,
			    		height: self.ch
			    	});

			    this.one('loadeddata', function() {
			    	self.emit('loadeddata');
			    });

		    	this.one('ended', function() {
					self.emit('ended');
				});

		    });
    	}

    });

    module.exports = Flv;

});