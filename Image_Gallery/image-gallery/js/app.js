const images = document.querySelectorAll('.gallery-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentIndex = 0;

function showLightbox(index) {
  lightboxImg.src = images[index].src;
  lightbox.classList.add('active');
  currentIndex = index;
}

function hideLightbox() {
  lightbox.classList.remove('active');
}

function showPrev() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  lightboxImg.src = images[currentIndex].src;
}

function showNext() {
  currentIndex = (currentIndex + 1) % images.length;
  lightboxImg.src = images[currentIndex].src;
}

// Open Lightbox
images.forEach((img, index) => {
  img.addEventListener('click', () => showLightbox(index));
});

// Navigation buttons
prevBtn.addEventListener('click', showPrev);
nextBtn.addEventListener('click', showNext);

// Close on click outside image
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox || e.target === lightboxImg) {
    hideLightbox();
  }
});

// Keyboard support
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;

  if (e.key === 'Escape') {
    hideLightbox();
  } else if (e.key === 'ArrowLeft') {
    showPrev();
  } else if (e.key === 'ArrowRight') {
    showNext();
  }
});
