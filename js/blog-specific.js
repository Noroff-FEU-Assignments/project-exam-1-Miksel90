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
}

// Create the main function
async function main() {
  const post = await singleBlogPost();
  createPostHTML(post);
}

// Run the entire function
main();
