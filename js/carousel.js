document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.latest-container');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const posts = document.querySelectorAll('.posts');
  
    let currentIndex = 0;
    let scrollAmount = 0;
    const scrollSize = posts[0].offsetWidth + 20; // 20px for the gap between posts
  
    // Move to the previous set of posts
    const prev = () => {
      if (currentIndex > 0) {
        currentIndex--;
        scrollAmount += scrollSize;
        container.style.transform = `translateX(-${scrollAmount}px)`;
      }
    };
  
    // Move to the next set of posts
    const next = () => {
      if (currentIndex < posts.length - 4) {
        currentIndex++;
        scrollAmount -= scrollSize;
        container.style.transform = `translateX(-${scrollAmount}px)`;
      }
    };
  
    // Add click event listeners to the prev/next buttons
    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);
  });
  
