$( document ).ready( function () {
    const navTop = $( '#nav-main' ).height();
    var wScroll = 0;
    var slide = false;
    $( window ).scroll( mainAnimate );

    $( window ).on( "load", function () {
        mainAnimate();
        var width = window.innerWidth;
        slickSlider( width, '.slider-skill' );
        slickSlider( width, '.slider-portfolio' );
    } );

    $( window ).on( "resize", function () {
        mainAnimate();
        var width = window.innerWidth;
        if ( slide ) {
            $( '.slider-skill' ).slick( 'unslick' );
            $( '.slider-portfolio' ).slick( 'unslick' );
        }
        slickSlider( width, '.slider-skill' );
        slickSlider( width, '.slider-portfolio' );
    } );

    function slickSlider( width, element ) {
        if ( width > 933 && width <= 1366 ) {
            $( $( element ) ).slick( {
                autoplay: true,
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 1
            } );
        } else if ( width > 576 && width <= 933 ) {
            $( $( element ) ).slick( {
                autoplay: true,
                infinite: true,
                slidesToShow: 2,
                slidesToScroll: 1
            } );
        } else {
            $( $( element ) ).slick( {
                autoplay: true,
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1
            } );
        }
        slide = true;
        return slide;
    }

    function mainAnimate() {
        const about = parseInt( $( '#about' ).offset().top ) - ( navTop * 2 );
        const skill = parseInt( $( '#skill' ).offset().top ) - ( navTop * 2 );
        const contact = parseInt( $( '#contact' ).offset().top ) - ( navTop * 2 );
        const portfolio = parseInt( $( '#portfolio' ).offset().top ) - ( navTop * 2 );
        wScroll = $( this ).scrollTop();

        if ( wScroll > navTop ) {
            $( '#nav-main' ).addClass( 'shadow' );
            $( '#nav-main' ).addClass( 'fixed-top' );
            $( '#home' ).css( 'margin-top', navTop );
            if ( wScroll >= 0 && wScroll < about ) {
                btnActivate( '#btnNavHome' );
                elementAnimate( 'section', '#home' );
            } else if ( wScroll >= about && wScroll < skill ) {
                btnActivate( '#btnNavAbout' );
                elementAnimate( 'section', '#about' );
            } else if ( wScroll >= skill && wScroll < contact ) {
                btnActivate( '#btnNavSkill' );
                elementAnimate( 'section', '#skill' );
                $( '#contact img' ).attr( 'style', '' );
            } else if ( wScroll >= contact && wScroll < portfolio ) {
                btnActivate( '#btnNavContact' );
                elementAnimate( 'section', '#contact' );
                $( '#contact img' ).css( {
                    'transform': 'rotateY(360deg)',
                    'transition-duration': '1.5s'
                } );
            } else {
                $( '#contact img' ).attr( 'style', '' );
                btnActivate( '#btnNavPortfolio' );
                elementAnimate( 'section', '#portfolio' );
            }

        } else {
            if ( wScroll == 0 ) {
                $( '#nav-main' ).removeClass( 'shadow' );
                $( '#nav-main' ).removeClass( 'fixed-top' );
                $( '#home' ).css( 'margin-top', 0 );
                btnActivate( '#btnNavHome' );
                elementAnimate( 'section', '#home' );
            }
        }
    }

    function btnActivate( addClass ) {
        $( 'li.nav-item a' ).each( function () {
            $( this ).removeClass( 'btn-active' );
        } );
        $( addClass ).addClass( 'btn-active' );
    }

    function elementAnimate( elementScope, element ) {
        $( elementScope + "[class~='mui-enter-active']" ).removeClass( 'mui-enter-active' );
        $( element ).addClass( 'mui-enter-active' );
    }

    // Set ScroolTop event Click
    $( 'nav a.btn-custom' ).click( function ( e ) {
        var elementHash = this.hash;
        var element = $( elementHash );

        e.preventDefault();
        if ( elementHash == "#home" ) {
            $( "html, body" ).animate( { scrollTop: 0 }, 600, 'easeInOutExpo' );
        } else {
            $( "html, body" ).animate( { scrollTop: element.offset().top - ( navTop * 2 ) }, 600, 'easeInOutExpo' );
        }

    } );

    // Animate Element on Home Section
    $( '.img-certificate' ).each( function ( i ) {
        $( this ).css( 'opacity', '0' );
        setTimeout( () => {
            MotionUI.animateIn( $( this ), 'scale-in-up' );
            $( this ).css( 'opacity', '1' );
        }, 300 * i );
    } );

    $( '#home' ).addClass( 'mui-enter-active' );

    MotionUI.animateIn( $( '.frame-intro' ), 'slide-in-left' );

    function sosmedActive() {
        $( '.btn-sosmed' ).each( function ( i ) {
            setTimeout( () => {
                $( this ).addClass( 'active' );
            }, 300 * i );
        } );
        setTimeout( () => {
            $( '.btn-sosmed' ).each( function ( i ) {
                setTimeout( () => {
                    $( this ).removeClass( 'active' );
                }, 300 * i );
            } );
        }, 200 );
    }

    var sosmedLight = setInterval( () => {
        sosmedActive();
    }, 2000 );

    $( '.btn-sosmed' ).hover( function () {
        clearInterval( sosmedLight );
    }, function () {
        sosmedLight = setInterval( () => {
            sosmedActive();
        }, 2000 );
    } );

    $( '.btn-sosmed' ).each( function ( i ) {
        $( this ).css( 'opacity', '0' );
        setTimeout( () => {
            MotionUI.animateIn( $( this ), 'hinge-in-from-middle-y' );
            $( this ).css( 'opacity', '1' );
        }, 300 * i );
    } );
} );
