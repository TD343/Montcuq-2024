// Select elements from the DOM
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

// Add event listener to the toggle button
menuToggle.addEventListener('click', () => {
  // Toggle the "active" class on the nav-links
  navLinks.classList.toggle('active');

  // Change the aria-expanded attribute for accessibility
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
  menuToggle.setAttribute('aria-expanded', !expanded);
});
