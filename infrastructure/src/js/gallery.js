// Determine the correct path prefix based on the current page
const pathPrefix = window.location.pathname.includes('/pages/') ? '../' : '';

const images = [
    { src: pathPrefix + 'img/project-images/kgn-infra-andheri.jpg', text: 'Project 1' },
    { src: pathPrefix + 'img/project-images/kgn-infra-bandra.jpg', text: 'Project 2' },
    { src: pathPrefix + 'img/project-images/kgn-infra-kurla.jpg', text: 'Project 3' },
    { src: pathPrefix + 'img/project-images/kgn-infra-llp.jpg', text: 'Project 4' },
    { src: pathPrefix + 'img/project-images/kgn-infra-mulund.jpg', text: 'Project 5' },
    { src: pathPrefix + 'img/project-images/kgn-infra-mumbai.jpg', text: 'Project 6' }
];

const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');

// Create and append all gallery items at once for better performance
const fragment = document.createDocumentFragment();

images.forEach((img, index) => {
  const div = document.createElement('div');
  div.classList.add('gallery-item');
  div.innerHTML = `
    <img src="${img.src}" alt="Gallery Image ${index + 1}" loading="lazy">
    <div class="overlay">${img.text}</div>
  `;
  div.addEventListener('click', () => openLightbox(img.src));
  fragment.appendChild(div);
});

gallery.appendChild(fragment);

function openLightbox(src) {
  lightboxImage.src = src;
  lightbox.classList.add('active');
}

function closeLightbox() {
  lightbox.classList.remove('active');
  lightboxImage.src = '';
}

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox || e.target === lightboxImage) {
    closeLightbox();
  }
});