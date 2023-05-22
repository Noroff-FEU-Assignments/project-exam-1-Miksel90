const searchBar =document.querySelector(".searchbar");
searchBar.addEventListener("keyup", filterPosts);

function filterPosts(){
    let filterValue = searchBar.value.toLowerCase();
    // console.log(filterValue);

    const searchPosts = document.querySelectorAll(".posts").forEach(post => {
       post.innerText.toLowerCase().indexOf(filterValue) > -1
        ? post.style.display = "" : post.style.display = "none";
    })
}