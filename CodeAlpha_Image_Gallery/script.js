const galleryImages = document.querySelectorAll('.gallery img');
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector('.close');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let currentIndex = 0;

// Open Lightbox
galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => {
        currentIndex = index;
        showImage();
        lightbox.style.display = "flex";
    });
});

// Close Lightbox
closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
});

// Show image in lightbox
function showImage() {
    lightboxImg.src = galleryImages[currentIndex].src;
}

// Next
nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    showImage();
});

// Previous
prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    showImage();
});

// Filters
const filterButtons = document.querySelectorAll('.filter-btn');
const items = document.querySelectorAll('.item');

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        items.forEach(item => {
            if (filter === "all" || item.classList.contains(filter)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });
});
