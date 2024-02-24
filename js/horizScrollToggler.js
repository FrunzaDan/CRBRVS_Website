const horizontalScrollContainer = document.getElementById("horizontalScrollContainer");
const hintScrollHoriz = document.getElementById("hint-scroll-horiz");

horizontalScrollContainer.addEventListener("scroll", () => {
    if (horizontalScrollContainer.scrollLeft > 100) {
        hintScrollHoriz.classList.add('hidden');
    } else {
        hintScrollHoriz.classList.remove('hidden');
    }
});