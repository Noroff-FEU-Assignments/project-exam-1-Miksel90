// Base URL
const apiBase = "https://www.mikaelselstad.no";
const jsonBase = "/wp-json/wp/v2";
const postEndpoint = "/posts";

// Get post ID from query string
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const postId = urlParams.get("id");

// Full URL
const fullPostURL = apiBase + jsonBase + postEndpoint + `/${postId}?_embed&fields=id,title,content,date&_embed`;

// Fetch single post
async function singleBlogPost() {
  const response = await fetch(fullPostURL);
  const post = await response.json();
  return post;
}

// Update document title
function updateTitle(title) {
  document.querySelector("title").innerText = title;
}

// Create HTML
function createPostHTML(latestPost) {
  const container = document.querySelector(".specific-container");

  const productContainer = document.createElement("div");
  productContainer.classList.add("posts", "post-specific");
  productContainer.id = latestPost.id;

  const title = document.createElement("h1");
  title.innerText = latestPost.title.rendered;
  productContainer.append(title);

  const content = document.createElement("div");
  content.innerHTML = latestPost.content.rendered;
  productContainer.append(content);

  const date = document.createElement("p");
  date.innerText = latestPost.date;
  productContainer.append(date);

  container.append(productContainer);

  updateTitle(`Blog | ${latestPost.title.rendered}`);
}

// Create the main function
async function main() {
  const post = await singleBlogPost();
  createPostHTML(post);
  modalFunc();
}

// Run the entire function
main();



//Creating the modal from the images
const modalImg = document.querySelector('.modal-img')
const modal = document.querySelector('.modal')

function modalFunc() {
  const images = document.querySelectorAll("img");
  const modal = document.querySelector("dialog");
  const modalImg = document.querySelector(".modal-img");
  const closeButton = document.querySelector(".exit-modal");

  images.forEach(function(image) {
    image.addEventListener("click", function() {
      modal.showModal();
      modalImg.src = this.src;
    });
  });

  modal.addEventListener("click", function(event) {
    if (event.target === modal) {
      modal.close();
    }
  });

  closeButton.addEventListener("click", function() {
    modal.close();
  });
}



