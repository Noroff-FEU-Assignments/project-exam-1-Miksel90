//Search functionality
const searchBar =document.querySelector(".searchbar");
searchBar.addEventListener("keyup", filterPosts);

function filterPosts(){
    let filterValue = searchBar.value.toLowerCase();
    // console.log(filterValue);

    //Looping through the shown posts
    const searchPosts = document.querySelectorAll(".blogpost").forEach(post => {
       post.innerText.toLowerCase().indexOf(filterValue) > -1
        ? post.style.display = "" : post.style.display = "none";
    })
}