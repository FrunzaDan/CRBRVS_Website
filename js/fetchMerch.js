

const merchContainer = document.querySelector(".horizontalScrollContainer");
const merchJson = '../product-list.json';

const imagesArray = [];

window.addEventListener("load", () => {
    loadMerchSection();
});

async function loadMerchSection() {
    merch = await fetchProductsData();
    if (merch) {
        merch.forEach((item) => {
            merchContainer.innerHTML += `
                        <div class="card merch-card hover-card">
                            <div class="merch-img-container">
                                <img class="merch-img" src="${item.imagePath}" alt="${item.name}">
                            </div>
                            <div class="card-footer">
                                <p>${item.price} RON</p>
                                <button data-modal-target="#getMerchModal" class="buy-button-style">Get it!</button>
                            </div>
                        </div>
                    `;
        });
        horizScrollToggler();

    }
}

async function fetchProductsData() {
    const response = await fetch(merchJson);
    const data = await response.json();
    return data;
}

function horizScrollToggler() {
    const hintScrollHoriz = document.getElementById("hint-scroll-horiz");
    merchContainer.addEventListener("scroll", () => {
        if (merchContainer.scrollLeft > 100) {
            hintScrollHoriz.classList.add('hidden');
        } else {
            hintScrollHoriz.classList.remove('hidden');
        }
    });
}

