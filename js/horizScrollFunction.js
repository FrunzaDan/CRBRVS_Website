let scrollSpeed = 50;
let scrollContainer = document.getElementById("horizontalScrollContainer");

scrollContainer.addEventListener("wheel", wheelEvent => {
    // block if e.deltaY==0
    if (!wheelEvent.deltaY) return;

    // Set scrollDirection (-1 = up // 1 = down)
    let scrollDirection = (wheelEvent.deltaY > 0) ? 1 : -1;

    // convert vertical scroll into horizontal
    scrollContainer.scrollLeft += scrollSpeed * scrollDirection;
    let scrollLeft = Math.round(scrollContainer.scrollLeft);

    // calculate box total vertical scroll 
    let maxScrollLeft = Math.round(scrollContainer.scrollWidth - scrollContainer.clientWidth);

    // if element scroll has not finished scrolling
    // prevent window to scroll
    if (
        (scrollDirection === -1 && scrollLeft > 0) ||
        (scrollDirection === 1 && scrollLeft < maxScrollLeft)
    ) wheelEvent.preventDefault()
    return true;
}, false);