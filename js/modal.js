
function createModal(){
    const images = document.querySelectorAll("img");
    // console.log(images);
    const modal = document.getElementById("modal");
    const modalImage = document.getElementById("modal-image");
    const closeBtn = document.getElementsByClassName("close")[0];
  
    images.forEach(function(image) {
      image.addEventListener("click", function() {
        modal.style.display = "block";
        modalImage.src = this.src;
        modalImage.alt = this.alt;

      });
    });
  
    closeBtn.addEventListener("click", function() {
      modal.style.display = "none";
    });
  
    window.addEventListener("click", function(event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  }
  


  export default createModal;

