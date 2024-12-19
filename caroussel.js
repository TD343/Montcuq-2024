// Select the carousel container
const carousel = document.querySelector('.carousel');
let index = 0;  // The current index of the displayed image

// Function to move the carousel slide
function moveSlide(direction) {
  // Update the index by the given direction (-1 for previous, 1 for next)
  index = (index + direction + carousel.children.length) % carousel.children.length;

  // Adjust the transform to show the correct image
  carousel.style.transform = `translateX(-${index * 100}%)`;
}

// Optional: Automatically change the slide every 3 seconds
setInterval(() => {
  moveSlide(1); // Auto change slide every 3 seconds
}, 5000);

// Event listeners for the buttons
document.querySelector('.prev').addEventListener('click', () => {
  moveSlide(-1); // Go to the previous slide
});

document.querySelector('.next').addEventListener('click', () => {
  moveSlide(1); // Go to the next slide
});

function moveSlide(direction) {
    index = (index + direction + carousel.children.length) % carousel.children.length;
    carousel.style.transform = `translateX(-${index * 100}%)`;
  }
  
