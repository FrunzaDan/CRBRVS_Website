const scroller = document.getElementById( "page-container" );
const scrollToTopButton = document.getElementById( "scroll-to-top-button" );

scroller.addEventListener( "scroll", ( event ) => {
    if ( scroller.scrollTop > 600 ) {
        scrollToTopButton.classList.add( 'active' );
    } else {
        scrollToTopButton.classList.remove( 'active' );
    }
} );

function topFunction() {

    var myDiv = document.getElementById( "page-container" );
    myDiv.scrollTop = 0;
}

