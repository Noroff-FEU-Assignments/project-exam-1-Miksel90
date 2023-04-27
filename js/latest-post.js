// Base URL
const apiBase = "http://bogeys-bunkers.local";
const jsonBase  = "/wp-json/wp/v2";
const postEndpoint = "/posts"; 

// Full URL 
const fullPostURL = apiBase + jsonBase + postEndpoint;

// Fetching the products
async function getLatestPost() {
  const response = await fetch(fullPostURL + "?_embed" );

  const latestPosts = await response.json();

  return latestPosts;
//   console.log(latestPosts);
}
// Create HTML
function createPostHTML(latestPost) {
    const container = document.querySelector(".container-latest");

    const productContainer = document.createElement("a");
    productContainer.href = "blog-specific.html?id=" + latestPost.id;
    productContainer.classList.add("posts");
    productContainer.id = latestPost.id;

    const title = document.createElement("h4");
    title.innerText = latestPost.title.rendered;
    productContainer.append(title);

    const featuredImage = latestPost._embedded["wp:featuredmedia"][0];
    if (featuredImage) {
      const image = document.createElement("img");
      image.src = featuredImage.source_url;
      productContainer.append(image);
    }

    const quote = document.createElement("h5")
    quote.innerText = latestPost.content.rendered;
    productContainer.append(quote);

    
  container.append(productContainer);
}

function createPostsHTML(latestPosts) {
    for (let i = 0; i < latestPosts.length; i++) {
      const latestPost = latestPosts[i];
      createPostHTML(latestPost);
    }}


// Create the main function
async function main() {
    const latestPosts = await getLatestPost();
    createPostsHTML(latestPosts);
  }


// Run the entire function
main()