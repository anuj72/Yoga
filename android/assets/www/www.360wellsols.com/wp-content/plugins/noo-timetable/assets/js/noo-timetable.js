function ModalEffectsInit() {


	[].slice.call( document.querySelectorAll( '.md-trigger' ) ).forEach( function( el, i ) {

		var modal = document.querySelector( '#' + el.getAttribute( 'data-modal' ) );

		if ( ! modal ) return false;

		var close = modal.querySelector('.md-close');

		function removeModal( hasPerspective ) {
			classie.remove( modal, 'md-show' );

			if( hasPerspective ) {
				classie.remove( document.documentElement, 'md-perspective' );
			}
		}

		function removeModalHandler() {
			removeModal( classie.has( el, 'md-setperspective' ) ); 
		}

		function decodeEntities(encodedString) {
		    var textArea = document.createElement('textarea');
		    textArea.innerHTML = encodedString;
		    return textArea.value;
		}

		el.addEventListener( 'click', function( ev ) {
			classie.add( modal, 'md-show' );
			jQuery(modal).next().unbind( 'click', removeModalHandler );
			jQuery(modal).next().bind( 'click', removeModalHandler );

			if( classie.has( el, 'md-setperspective' ) ) {
				setTimeout( function() {
					classie.add( document.documentElement, 'md-perspective' );
				}, 25 );
			}

			$input = jQuery(el).find('[type="hidden"]').val();
			$event = jQuery.extend({}, jQuery.parseJSON($input));

			if ( $event.excerpt == "undefined" ) {
				$event.excerpt = '';
			} else {
				$event.excerpt = decodeEntities($event.excerpt);
			}

			jQuery(modal).find('h3')
				.text( $event.categoryName )
				.css( 'background', $event.categoryColor )
				.css( 'color', '#fff' )
				.css( 'opacity', '1' );

			jQuery(modal).find('.fc-thumb')
				.css( 'background-image', 'url('+ $event.backgroundImage +')' );
			
			jQuery(modal).find('.fc-time')
				.text( $event.time );

			if ( $event.url == "undefined" || $event.url == "" ) {
				jQuery(modal).find('.fc-title a')
					.attr('href', '#')
					.attr('onclick', 'return false');
			} else {
				jQuery(modal).find('.fc-title a')
					.attr('href', $event.url);				
			}

			jQuery(modal).find('.fc-title a')
					.text($event.title);

			jQuery(modal).find('.fc-trainer')
				.html( $event.trainer );

			jQuery(modal).find('.fc-excerpt')
				.text( $event.excerpt );
			
			jQuery(modal).removeClass('event-content');

			if ( classie.has( el, 'fc-noo-event' ) ) 
			{
				jQuery(modal).addClass('event-content');

				jQuery(modal).find('.fc-thumb, h3').hide();

				jQuery(modal).find('.div_content')
					.addClass('overlay')
					.css( 'background-image', 'url('+ $event.backgroundImage +')' );
			}

			else
			{
				jQuery(modal).find('.fc-thumb, h3').show();

				jQuery(modal).find('.div_content')
					.removeClass('overlay')
					.css( 'background-image', 'none' );
			}
	

			ev.preventDefault();
		});

		close.addEventListener( 'click', function( ev ) {
			ev.stopPropagation();
			removeModalHandler();
		});

	} );

}
