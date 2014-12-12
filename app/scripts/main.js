(function(window, document, undefined){
	'use strict';
	var Player = (function(){
		var player, button, iframe, splashButton, wrap, splash, wrpHeight, isMobile,
		iOS;
		return {
			init: function(){
				iOS = /(iPad|iPhone|iPod)/g.test( navigator.userAgent );
				iframe = $('#player1')[0];
				player = $f(iframe);
				wrap = $('#player-wrap');
				splash = $('.video-splash');
				splashButton = $('#init-video');
				button = $('.custom-controlls').find('button');
				wrpHeight = wrap.height();
				if ( iOS ){
					$('.custom-controlls').hide();
				}
				return this.bindEvents();
			},
			bindEvents: function(){

				var self = this;

				splashButton.on('click', self.startPlayer.bind(this));

				button.on('click', function(e){
					e.preventDefault();
					return self.handleButtonEvent($(this));
				});

			},
			handleButtonEvent: function(el){

				var value = el.data('player-event'),
					type = el.data('type');

				if( type === 'mute' || type === 'unMute' ){
					player.api('setVolume', value);
				} else {
					player.api(type, value);
				}

				return this.toggleButton(el);

			},
			toggleButton: function(el){

				switch (el.data('type')){
					case 'play':
						el.data('type', 'pause')
							.data('player-event', 'pause')
							.removeClass('play')
							.addClass('pause');
						break;
					case 'pause':
						el.data('type', 'play')
							.data('player-event', 'play')
							.removeClass('pause')
							.addClass('play');
							splash.show();
							wrap.css({ 'height' : wrpHeight });
						break;
					case 'mute':
						el.data('type', 'unMute')
							.data('player-event', '1')
							.removeClass('mute')
							.addClass('unMute');
						break;
					case 'unMute':
						el.data('type', 'mute')
							.data('player-event', '0')
							.removeClass('unMute')
							.addClass('mute');
						break;
				}

			},
			setVideoHeight: function(win){
				var width = win.width(),
					aspect = 9 / 16;
					console.log('setVideoHeight');
				return wrap.css({ 'height' : width * aspect });
			},
			startPlayer: function(e){
				var self = this;
				e.preventDefault();

				splash.hide();

				$(window).off().on('resize orientationchange', function(){
					console.log('orientationchange');
					return self.setVideoHeight($(this));
				}).trigger('resize');


				wrap.addClass('player-ready');
				this.toggleButton($('.custom-controlls').find('button.play'));
				return !iOS && player.api('play');
			}
		};

	})();

	window.VPlayer = Player;

})(this, this.document);
