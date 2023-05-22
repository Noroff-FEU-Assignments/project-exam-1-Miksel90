 // Function to sort blog posts
 function sortPosts(sortBy) {

  }

  // Function to filter blog posts
  function filterPosts(selectedFilters) {

  }

  // Function to search blog posts
  function searchPosts(query) {
  
  }

  // Event listeners for sorting, filtering, and searching
  document.getElementById('sortSelect').addEventListener('change', function () {
    var sortBy = this.value;
    sortPosts(sortBy);
  });

  var checkboxes = document.querySelectorAll('#filterContainer input[type="checkbox"]');
  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
      var selectedFilters = [];
      checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
          selectedFilters.push(checkbox.value);
        }
      });
      filterPosts(selectedFilters);
    });
  });

  document.getElementById('searchInput').addEventListener('input', function () {
    var query = this.value.toLowerCase();
    searchPosts(query);
  });