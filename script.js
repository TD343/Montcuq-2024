// Countdown Timer
const countdown = document.getElementById('countdown-timer');
const eventDate = new Date('2024-07-26T00:00:00').getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const timeLeft = eventDate - now;

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  countdown.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

