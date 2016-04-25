/**
 * @fileoverview 视频播放器
 * @author zhenn
 */

define(function (require , exports , module) {

	var Base = require('module/base/index');

	var Video = Base.extend({
		defaults: {
			wrap: '#wrap',
			// - 分帧加载视频源： http://www.asiainnovations.com/tmp/echo-hereweare.mp4
			// - 非分帧加载视频源：
			// 		- http://www.w3school.com.cn/example/html5/mov_bbb.mp4
			// 		- http://v.cdn.pengpengla.com/daidai/v/u/2016/4/5/194a8fec-d9d7-42d7-8d90-7eb2d12be2ae.mp4
			source : 'http://www.w3school.com.cn/example/html5/mov_bbb.mp4',
			previewPic : 'http://local.cdn.pengpengla.com/video/@@version/images/poster.png',
			playbtn : 'http://local.cdn.pengpengla.com/video/@@version/images/playnew.png',
			loading : 'http://local.cdn.pengpengla.com/video/@@version/images/loading.gif'
		},

		initialize: function () {
			var self = this;
			self.insertVideoElement();
			self.createPoster();

			self.bindEvent();
		},

		// 初始化video对象，插入dom
		insertVideoElement: function () {
			var self = this;
			var source = self.get('source');
			var $wrap = self.$wrap = $(self.get('wrap'));

			$wrap.css({
				position : 'relative'
			});

			var videoArr = [
				'<video width="1" height="1" webkit-playsinline>',
					'<source src="{{source}}" type="video/mp4">',
				'</video>'
			];

			var $video = self.$video = $(videoArr.join('').replace('{{source}}' , source));

			$video.css({
				position : 'absolute',
				left : 0,
				top : 0,
				zIndex : 1
			});

			$wrap.append($video);	

			return self;	
		},

		// 创建封面
		createPoster: function() {
			var self = this;
			var $wrap = self.$wrap;

			var $preview = self.$preview = $('<img />'),
				$playbtn = self.$playbtn = $('<img />'),
				$loading = self.$loading = $('<img />');

			$preview
				.css({
					position : 'absolute',
					width : '100%',
					left : 0,
					top : 0,
					zIndex : 9
				})
				.attr('src' , self.get('previewPic'))
				.addClass('v-poster');
			
			$wrap.append($preview);

			setTimeout(function() {
				$wrap.css({
					height : $preview.height()
				});

				self.$video.css({
					width : $wrap.width(),
					height : $wrap.height()
				});

				$playbtn
					.css({
						position : 'absolute',
						width: '80px',
						height : '80px',
						left : '50%',
						top: '50%',
						margin : '-40px 0 0 -40px',
						zIndex : 10
					})
					.attr('src' , self.get('playbtn'))
					.attr('data-id' , 'playbtn');

				$wrap.append($playbtn);

				$loading
					.css({
						position : 'absolute',
						width: '80px',
						height : '80px',
						left : '50%',
						top: '50%',
						margin : '-40px 0 0 -40px',
						zIndex : 10
					})
					.attr('src' , self.get('loading'))
					.addClass('hidden');

				$wrap.append($loading);

			} , 200);
		},

		bindEvent: function() {
			var self = this;
			var $video = self.$video;
			var $wrap = self.$wrap;

			$video
				// 视频元数据加载完成
				.on('loadeddata', function (res) {
					self.videoLoadedHandler();
				})
				.on('loadedmetadata', function () {
					self.videoLoadedHandler();
				})
				.on('waiting', function () {
					self.$loading.removeClass('hidden');
				})
				.on('playing', function () {
					self.$loading.addClass('hidden');
				})
				.on('ended', function () {
					// self.$playbtn.removeClass('hidden');
					// self.$video[0].currentTime = 0;
					self.emit('ended');
				});

			$wrap
				.on('click', '[data-id=playbtn]' , function (e) {
					self.playbtnClickHandler(e)
				});
		},

		videoLoadedHandler: function () {
			var self = this;
			
			self.videoLoaded = 1;
			
			var $video = self.$video;
			var wrapWidth = self.$wrap.width();
			var wrapHeight = self.$wrap.height();

			// 外层容器高度少于100px
			// 则判断为未设置视频播放高度，此时设置自适应视频高度
			if (wrapHeight < 100) {
				
				self.$video.css({
					width : wrapWidth,
					height : (wrapWidth / $video[0].videoWidth) * $video[0].videoHeight
				});
				
			} else {
				self.$video.css({
					width : wrapWidth,
					height : wrapHeight
				});
			}
			
			if (self.playbtnClicked) {
				self.$video[0].play();
				self.$preview.remove();
				self.$loading.addClass('hidden');
			}
		},

		playbtnClickHandler: function (e) {
			var self = this;
			var el = $(e.currentTarget);
			el.addClass('hidden');
			// alert(self.videoLoaded)
			if (self.videoLoaded) {
				self.$preview.remove();
				self.$video[0].play();
			} else {
				self.$loading.removeClass('hidden');
				self.playbtnClicked = 1;
			}

		}

	});

	module.exports = Video;

});

