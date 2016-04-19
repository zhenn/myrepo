/** 
 * @fileoverview 直播H5
 * @author zhenn
 */

define(function (require , exports , module) {

	var global = require('./global'),
		ppclient = require('module/ppclient/index'),
		Flv = require('./base/flv'),
		Video = require('./base/video'),

		system = ppclient.getSystem();

	// pc上不支持HLS协议
	// 使用flash代替
	if (system == 'pc') {
		var flv = new Flv({
			wrap: '#wrap',
			source: 'http://flv-player.net/medias/KyodaiNoGilga.flv'
		});
		flv.on('ended', function () {
			console.log('播放完毕');
		});
		flv.play();

	} else {

		var video = new Video({
			wrap: '#wrap',
			previewPic: 'http://local.cdn.pengpengla.com/video/@@version/images/poster.png',
			source: 'http://devimages.apple.com/iphone/samples/bipbop/bipbopall.m3u8'
		});
		video.on('ended', function () {
			alert('直播结束');
		});

	}

	

	

});