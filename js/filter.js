const searchBar = document.querySelector(".searchbar");
searchBar.addEventListener("keyup", filterPosts);

function filterPosts() {
  let filterValue = searchBar.value.toLowerCase();

  // Select all the posts
  const searchPosts = document.querySelectorAll(".blogpost");

  // Loop through each post and check if it should be displayed or not
  searchPosts.forEach((post) => {
    const postText = post.innerText.toLowerCase();
    if (postText.indexOf(filterValue) > -1) {
      post.style.display = "block";
    } else {
      post.style.display = "none";
    }
  });
}
