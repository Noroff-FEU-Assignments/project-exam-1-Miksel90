// Base URL
const apiBase = "https://www.mikaelselstad.no";
const jsonBase = "/wp-json/wp/v2";
const postEndpoint = "/posts";

// Full URL
const fullPostURL = apiBase + jsonBase + postEndpoint + "?_embed";

// Global variables
let displayedPosts = 10;
const numBlogsToShow = 10;

// Fetching the posts
async function getLatestPost() {
  const allPosts = [];

  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const response = await fetch(`${fullPostURL}&page=${page}`);
    const posts = await response.json();

    allPosts.push(...posts);

    totalPages = response.headers.get("X-WP-TotalPages");
    page++;
  }

  return allPosts;
}

// Create HTML
function createPostHTML(latestPost) {
  const container = document.querySelector(".container-blogs");

  const productContainer = document.createElement("a");
  productContainer.href = "blog-specific.html?id=" + latestPost.id;
  productContainer.classList.add("posts", "blogpost");
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
          image.alt = featuredImage.alt_text || latestPost.title.rendered;
      productContainer.append(image);
    }
  }

  container.append(productContainer);
}

// Setting up main function
async function main() {
  function createPostsHTML(latestPosts, startIndex, numPosts) {
    for (let i = startIndex; i < startIndex + numPosts && i < latestPosts.length; i++) {
      const latestPost = latestPosts[i];
      createPostHTML(latestPost);
    }
  }

  // Show more/less posts
  async function showMorePosts() {
    const latestPosts = await getLatestPost();
    const startIndex = displayedPosts;
    const numPostsToShow = numBlogsToShow;

    createPostsHTML(latestPosts, startIndex, numPostsToShow);
    displayedPosts += numPostsToShow;

    if (displayedPosts >= latestPosts.length) {
      const moreButton = document.querySelector(".more-button");
      moreButton.style.display = "none";
    }
  }

  const latestPosts = await getLatestPost();
  createPostsHTML(latestPosts, 0, displayedPosts);

  const moreButton = document.querySelector(".more-button");
  moreButton.addEventListener("click", showMorePosts);
}

// Run the entire function
main();

