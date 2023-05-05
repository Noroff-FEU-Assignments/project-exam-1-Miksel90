// Base URL
const apiBase = "https://www.mikaelselstad.no/";
const jsonBase  = "/wp-json/wp/v2";
const postEndpoint = "/posts"; 

// Full URL 
const fullPostURL = apiBase + jsonBase + postEndpoint + "?_embed";

// Fetching the products
async function getLatestPost() {
  const response = await fetch(fullPostURL);
  const latestPosts = await response.json();
  
  return latestPosts;
}

// Create HTML
function createPostHTML(latestPost) {
  const container = document.querySelector(".latest-container");

  const productContainer = document.createElement("a");
  productContainer.href = "blog-specific.html?id=" + latestPost.id;
  productContainer.classList.add("posts");
  productContainer.id = latestPost.id;

  const title = document.createElement("h4");
  title.innerText = latestPost.title.rendered;
  productContainer.append(title);

  // Check if post has a featured image
  if (latestPost._embedded && latestPost._embedded["wp:featuredmedia"]) {
    const featuredMedia = latestPost._embedded["wp:featuredmedia"];
    if (featuredMedia.length > 0) {
      const featuredImage = featuredMedia[0];
      const image = document.createElement("img");
      image.src = featuredImage.source_url;
      productContainer.append(image);
    }
  }

  container.append(productContainer);
}

function createPostsHTML(latestPosts) {
  for (let i = 0; i < latestPosts.length; i++) {
    const latestPost = latestPosts[i];
    createPostHTML(latestPost);
  }

  // Add click event listeners to the prev/next buttons
  const container = document.querySelector(".latest-container");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const posts = document.querySelectorAll(".posts");

  let currentIndex = 0;
  let scrollAmount = 0;
  const scrollSize = posts[0].offsetWidth * 4 + 80; // 80px for the gap between groups of 4 posts

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
    if (currentIndex < Math.ceil(posts.length / 4) - 1) {
      currentIndex++;
      scrollAmount -= scrollSize;
      container.style.transform = `translateX(-${scrollAmount}px)`;
    }
  };

  prevBtn.addEventListener("click", prev);
  nextBtn.addEventListener("click", next);
}

// Create the main function
async function main() {
  const latestPosts = await getLatestPost();
  createPostsHTML(latestPosts);
}

// Run the entire function
main();

