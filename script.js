document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            const navbarNav = document.querySelector('.navbar-nav');
            const menuToggle = document.querySelector('.menu-toggle');
            if (navbarNav.classList.contains('active')) {
                navbarNav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

    const menuToggle = document.querySelector('.menu-toggle');
    const navbarNav = document.querySelector('.navbar-nav');

    menuToggle.addEventListener('click', () => {
        navbarNav.classList.toggle('active');
        menuToggle.classList.toggle('active'); 
    });

    document.querySelectorAll('.dropdown > a, .has-submenu > a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 || this.closest('.dropdown') || this.closest('.has-submenu')) {
                e.preventDefault(); 

                const dropdownContent = this.nextElementSibling; 

                if (dropdownContent && dropdownContent.classList.contains('dropdown-content')) {
                    this.parentElement.parentElement.querySelectorAll('.dropdown-content.active').forEach(openDropdown => {
                        if (openDropdown !== dropdownContent) {
                            openDropdown.classList.remove('active');
                            openDropdown.previousElementSibling.classList.remove('active'); 
                        }
                    });

                    dropdownContent.classList.toggle('active'); 
                    this.classList.toggle('active'); 
                }
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) { // Only apply for mobile view
            if (!e.target.closest('.navbar-nav') && !e.target.closest('.menu-toggle')) {
                document.querySelectorAll('.dropdown-content.active').forEach(dropdown => {
                    dropdown.classList.remove('active');
                    if (dropdown.previousElementSibling) {
                        dropdown.previousElementSibling.classList.remove('active');
                    }
                });
                // Also close the main mobile menu if open
                if (navbarNav.classList.contains('active') && !e.target.closest('.navbar-nav') && !e.target.closest('.menu-toggle')) {
                    navbarNav.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        }
    });

    document.querySelectorAll('.dropdown-content').forEach(dropdown => {
        dropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
});