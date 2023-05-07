const apiBase = "https://www.mikaelselstad.no/";
const jsonBase = "/wp-json/wp/v2";
const postEndpoint = "/posts";

const fullPostURL = apiBase + jsonBase + postEndpoint + "?_embed";

async function getLatestPost() {
  const loader = document.querySelector(".loader");
  loader.classList.add("show");

  try {
    const response = await fetch(fullPostURL);
    const latestPosts = await response.json();

    if (latestPosts.length === 0) {
      throw new Error("No results fetched.");
    }

    loader.classList.remove("show");

    return latestPosts;
    
  } catch (error) {
    loader.classList.remove("show");
    console.error(error);
    return []; 
  }
}

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
      productContainer.append(image);
    }
  }

  container.append(productContainer);
}

function createPostsHTML(latestPosts) {
  const container = document.querySelector(".latest-container");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const posts = document.querySelectorAll(".posts");
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
  }

  prevBtn.style.display = "block"; 
  nextBtn.style.display = "block"; 
  loader.style.display = "block"; 
  scene.style.display = "block"; 
}

async function main() {
  const latestPosts = await getLatestPost();
  createPostsHTML(latestPosts);
}

main();
