window.addEventListener("load", (event) => {
    loadingOverlay = document.getElementById("loading-overlay");
    loadingOverlay.style.opacity = 0;
    setTimeout(() => {
        loadingOverlay.style.display = "none";
    }, 800);
});