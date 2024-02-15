const scroller = document.querySelector("#pageContainer");
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

scroller.addEventListener("scroll", (event) => {
    if (scroller.scrollTop > 600) {
        scrollToTopBtn.classList.add('active');
    } else {
        scrollToTopBtn.classList.remove('active');
    }
});

function topFunction() {
    console.log("Top Scroll Triggered");

    var myDiv = document.getElementById("pageContainer");
    myDiv.scrollTop = 0;
}

