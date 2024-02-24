const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const pageContainer = document.querySelector(".page-container");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    pageContainer.classList.toggle("noScroll");
})

document.querySelectorAll(".nav-link").forEach(
    n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        pageContainer.classList.remove("noScroll");
    }))