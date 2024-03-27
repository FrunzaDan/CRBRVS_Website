

const merchContainer = document.querySelector(".horizontalScrollContainer");
const merchJson = '../product-list.json';

const imagesArray = [];

loadMerchSection();

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
        triggerMerchModal();

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

function triggerMerchModal() {
    const openModalButtons = document.querySelectorAll('[data-modal-target]');
    const closeModalButtons = document.querySelectorAll('[data-close-button]');
    const overlay = document.getElementById('overlay');

    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = document.querySelector(button.dataset.modalTarget);
            openMerchModal(modal);
        })
    })

    overlay.addEventListener('click', () => {
        const modals = document.querySelectorAll('.modal.active')
        modals.forEach(modal => {
            closeMerchModal(modal)
        })
    })

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal')
            closeMerchModal(modal)
        })
    })
}

function openMerchModal(modal) {
    if (modal == null) {
        return
    }
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeMerchModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}

