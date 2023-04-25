document.querySelector('.hamburger').addEventListener('click', function() {
    this.classList.toggle('clicked');
  });
  
// Toggle .menu when .hamburger is clicked
document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('.menu').classList.toggle('show');
  });
