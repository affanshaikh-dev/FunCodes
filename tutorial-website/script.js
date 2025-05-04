// universal JS code
window.addEventListener('scroll', () => {
    popupContainer.style.display = 'none';
    galleryPopup.style.display = 'none';
    navbar.classList.remove("active")
})

// navigation section -->
let navbar = document.querySelector(".navbar");
let navBtn = document.querySelector(".humberger");

navBtn.addEventListener('click', () => {
    navbar.classList.toggle("active")
})

window.onscroll = () => {
    navbar.classList.remove("active")
}

// Counter Section -->
const counts = document.querySelectorAll(".count");
const speed = 50;

counts.forEach((counter) => {
    function upData() {
        const target = Number(counter.getAttribute('data-target'));
        const count = Number(counter.innerText.replace('+', ''));
        const inc = (target - count) / speed;

        if (count !== target) {
            counter.innerText = `${Math.ceil(count + inc)}+`;
            setTimeout(upData, 8);
        } else {
            counter.innerText = `${target}+`;
        }
    }
    upData();
});

// courses swiper
let boxSwiper = new Swiper('.swiper', {
    loop: true,
    slidesPerView: 3,
    centerSlide: 'true',
    spaceBetween: 15,
    fade: 'true',
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        520: {
            slidesPerView: 2,
        },
        950: {
            slidesPerView: 3,
        },
    },
});

// highlight swiper
let fullSwiper = new Swiper(".mySwiper", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    fade: 'true',
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
})

// highlight popup
let highlightImages = document.querySelectorAll('.highlightImg');
let popupContainer = document.getElementById('popupContainer');
let popupImage = document.getElementById('popupImage');
let closeBtn = document.querySelector('.closeBtn');

highlightImages.forEach((img) => {
    img.addEventListener('click', () => {
        popupImage.src = img.src;
        popupContainer.style.display = 'flex';
    });
});

closeBtn.addEventListener('click', () => {
    popupContainer.style.display = 'none';
});

popupContainer.addEventListener('click', (e) => {
    if (e.target === popupContainer) {
        popupContainer.style.display = 'none';
    }
});

// gallery popup
let glImages = document.querySelectorAll(".imgGal")
let galleryPopup = document.querySelector("#galleryPopup")
let glPopupImage = document.querySelector(".glPopupImage")
let clsBtn = document.querySelector(".glCloseBtn")

glImages.forEach((glImg) => {
    glImg.addEventListener('click', () => {
        glPopupImage.src = glImg.src;
        galleryPopup.style.display = 'flex';
    })
})

clsBtn.addEventListener('click', () => {
    galleryPopup.style.display = 'none';
})

galleryPopup.addEventListener('click', (e) => {
    if (e.target === galleryPopup) {
        galleryPopup.style.display = 'none';
    }
});
