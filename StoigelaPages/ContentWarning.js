document.querySelectorAll('.content-warning').forEach(function(warning) {
    warning.addEventListener('click', function() {
      // Hide the content warning
      this.style.display = 'none';
      // Find the next sibling that is the .photo div and add the 'active' class to it
      this.nextElementSibling.classList.add('active');
    });
  });