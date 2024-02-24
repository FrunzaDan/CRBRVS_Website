const scroller = document.querySelector("#page-container");
const scrollToTopButton = document.getElementById("scroll-to-top-button");

scroller.addEventListener("scroll", (event) => {
    if (scroller.scrollTop > 600) {
        scrollToTopButton.classList.add('active');
    } else {
        scrollToTopButton.classList.remove('active');
    }
});

function topFunction() {
    console.log("Top Scroll Triggered");

    var myDiv = document.getElementById("page-container");
    myDiv.scrollTop = 0;
}

