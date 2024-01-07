// Get all the links inside the navigation
const navLinks = document.querySelectorAll('.nav-links a');

// Attach a click event listener to each link
navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        // Prevent the default link behavior
        event.preventDefault();

        // Get the target section based on the link's href
        const targetId = link.getAttribute('href').substring(1); // Remove the "#" symbol

        // Get the target element
        const targetSection = document.getElementById(targetId);

        // Scroll to the target section smoothly
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
