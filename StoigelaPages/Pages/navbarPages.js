let navbarCache = null;

function loadNavbar() {
    if (!navbarCache) {
        return fetch('navbarPages.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                navbarCache = data; // Cache the navbar content
                return navbarCache;
            });
    }
    return Promise.resolve(navbarCache); // Use cached navbar
}

function setActiveLink() {
    const currentPath = window.location.pathname; // Get the current page path (e.g., /about.html)
    const navLinks = document.querySelectorAll('#navbar a'); // Get all <a> tags inside the injected navbar

    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname; // Get the path of the link (handles absolute/relative URLs)
        
        // Remove the active class from all links
        link.classList.remove('active');
        link.classList.remove('active2');
        
        // Add active class if the link matches the current path
        if (linkPath === currentPath) {
            link.classList.add('active');
            link.classList.add('active2');
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadNavbar()
        .then(data => {
            document.getElementById('navbar').innerHTML = data; // Inject navbar content
            setActiveLink(); // Apply the active class after injection
        })
        .catch(error => console.error('Error loading navbar:', error));
});
