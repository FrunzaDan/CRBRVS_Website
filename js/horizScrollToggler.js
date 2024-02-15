const horizontalScrollContainer = document.getElementById("horizontalScrollContainer");
const hintScrollHoriz = document.getElementById("hintScrollHoriz");

horizontalScrollContainer.addEventListener("scroll", () => {
    if (horizontalScrollContainer.scrollLeft > 100) {
        hintScrollHoriz.classList.add('hidden');
    } else {
        hintScrollHoriz.classList.remove('hidden');
    }
});