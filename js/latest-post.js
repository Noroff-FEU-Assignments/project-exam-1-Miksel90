// The Api im fetching from
const apiBase = "https://www.mikaelselstad.no/";
const jsonBase = "/wp-json/wp/v2";
const postEndpoint = "/posts";

const fullPostURL = apiBase + jsonBase + postEndpoint + "?_embed";

//fetching and returning data
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

//Creating HTML
function createPostHTML(latestPost) {
  const container = document.querySelector(".latest-container");

  const productContainer = document.createElement("a");
  productContainer.href = "blog-specific.html?id=" + latestPost.id;
  productContainer.classList.add("posts");
  productContainer.id = latestPost.id;

  const title = document.createElement("h4");
  title.innerText = latestPost.title.rendered;
  productContainer.append(title);

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

function createPostsHTML(latestPosts) {
  const container = document.querySelector(".latest-container");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  // const posts = document.querySelectorAll(".posts");
  const loader = document.querySelector(".loader");
  const scene = document.querySelector(".scene");

  container.innerHTML = "";

  if (latestPosts.length === 0) {
    container.style.display = "none";
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
    loader.style.display = "none";
    scene.style.display = "none";

    return;
  }

  for (let i = 0; i < latestPosts.length; i++) {
    const latestPost = latestPosts[i];
    createPostHTML(latestPost);

    if (latestPosts.length - 1 == i) {
      setUpCarousel();
    }
  }
  prevBtn.style.display = "block";
  nextBtn.style.display = "block";
  loader.style.display = "block";
  scene.style.display = "block";
}

// const carouselPages = 0;
var carouselPage = 0;

//setting up carousel, timer for the loader to show
function setUpCarousel() {
  setTimeout(() => {
    const container = document.querySelector(".latest-container");
    for (let i = 0; i < container.children.length; i++) {
      if (i > 3) {
        container.children[i].classList.add("hidden");
      }
    }
    handlePrevButton();
  }, 100);
}

// Setting up click events
const prevBtn = document.querySelector(".prev");
prevBtn.addEventListener("click", prev);

const nextBtn = document.querySelector(".next");
nextBtn.addEventListener("click", next);

//What posts are shown/hidden when you click next
function next() {
  carouselPage++;
  const container = document.querySelector(".latest-container");
  handlePrevButton();
  handleNextButton();
  for (let i = 0; i < container.children.length; i++) {
    container.children[i].classList.remove("hidden");
    if (carouselPage === 1) {
      if (i <= 3 || i > 7) {
        container.children[i].classList.add("hidden");
      }
    }
    if (carouselPage === 2) {
      if (i <= 7) {
        container.children[i].classList.add("hidden");
      }
    }
  }
}

//disable button on last page
function handleNextButton() {
  const btn = document.querySelector(".next");
  console.log(next);
  if (carouselPage === 2) {
    btn.setAttribute("disabled", "");
  } else {
    btn.removeAttribute("disabled", "");
  }
}

// What posts are shown/hidden when you click next
function prev() {
  carouselPage--;
  const container = document.querySelector(".latest-container");
  handlePrevButton();
  handleNextButton();
  for (let i = 0; i < container.children.length; i++) {
    container.children[i].classList.remove("hidden");
    if (carouselPage == 0 && i > 3) {
      container.children[i].classList.add("hidden");
    }
    if ((carouselPage == 1 && i <= 3) || i > 7) {
      container.children[i].classList.add("hidden");
    }
  }
}

//Disable button on first page
function handlePrevButton() {
  const btn = document.querySelector(".prev");
  if (carouselPage === 0) {
    btn.setAttribute("disabled", "");
  } else {
    btn.removeAttribute("disabled", "");
  }
}

//putting functions into one function
async function main() {
  const latestPosts = await getLatestPost();
  createPostsHTML(latestPosts);
}

//running the entire function
main();
