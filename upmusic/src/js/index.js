/** 
 * @fileoverview 
 * @author 
 */

define(function (require , exports , module) {

	require('./mediaelement-and-player');  // refs : http://mediaelementjs.com/
	require('./jqmp3');
	
	var $mp3 = $('#mp3');
	var $playbtn = $('#play');
	var $player = $('#player');

	// 若支持audio
	if (!!(document.createElement('audio').canPlayType)) {
		var $audio;

		var player = $player.mediaelementplayer({
			success: function(mediaElement, originalNode) {
				$audio = mediaElement;
			}

		});

		$playbtn.removeClass('hidden');
		$mp3.addClass('hidden');
		
		$playbtn.click(function (e) {
			var el = $(e.currentTarget);
			if ($audio) {
				
				if ($audio.paused) {
					el[0].src = 'http://local.cdn.pengpengla.com/upmusic/@@version/images/pausebtn.png';
					$audio.play();
				} else {
					el[0].src = 'http://local.cdn.pengpengla.com/upmusic/@@version/images/playbtn.png';
					$audio.pause();
				}
				
			} else {
				alert('音乐未加载，稍后再试!')
			}
		});
	} else {

		$mp3.jmp3({
			"backcolor": "000000",									// background color
			"forecolor": "ffffff",
		});
		$mp3.css('visibility' , 'visible');

	}



	


});