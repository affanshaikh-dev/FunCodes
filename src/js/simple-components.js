// Simple component loader that works without fetch API
document.addEventListener('DOMContentLoaded', function() {
    // Insert header component
    if (document.getElementById('header-component')) {
        const isInSubpage = window.location.pathname.includes('/pages/') || 
                           window.location.href.includes('/pages/');
        
        // Determine the correct path prefix
        const pathPrefix = isInSubpage ? '../' : '';
        
        // Insert header HTML directly
        document.getElementById('header-component').innerHTML = `
        <header class="header">
            <figure class="logoContainer" style="font-weight: bold; font-size: 1.5em;">
                LOGO
            </figure>
            <div class="menuContainer">
                <i class="ri-menu-line menu"></i>
                <i class="ri-close-large-line close"></i>
            </div>
            <nav class="navMenu">
                <ul>
                    <li class="navWhiteSpace"><a href="#"></a></li>
                    <li class="navWhiteSpace"><a href="#"></a></li>
                    <li><a href="${pathPrefix}index.html">Home</a></li>
                    <li><a href="${pathPrefix}pages/about.html">About</a></li>
                    <li class="has-dropdown">
                        <a href="${pathPrefix}pages/services.html" aria-haspopup="true" aria-expanded="false">Services</a>
                        <ul class="dropdown-menu" role="menu" aria-label="Services Submenu">
                            <li role="menuitem"><a href="${pathPrefix}pages/services.html#roadhighway">Road & Highway Construction</a></li>
                            <li role="menuitem"><a href="${pathPrefix}pages/services.html#subsoil">Subsoil Drainage System</a></li>
                            <li role="menuitem"><a href="${pathPrefix}pages/services.html#buildingconstruction">Building Construction</a></li>
                            <li role="menuitem"><a href="${pathPrefix}pages/services.html#hardscapelandscape">Hardscape / Landscape</a></li>
                            <li role="menuitem"><a href="${pathPrefix}pages/services.html#compoundwall">Compound & Retaining Wall</a></li>
                            <li role="menuitem"><a href="${pathPrefix}pages/services.html#pilebreaking">Pile Breaking / Cutting Services</a></li>
                            <li role="menuitem"><a href="${pathPrefix}pages/services.html#excavationhard">Excavation in Hard Rock</a></li>
                            <li role="menuitem"><a href="${pathPrefix}pages/services.html#manholeschambers">All Type of Manholes / Chambers</a></li>
                            <li role="menuitem"><a href="${pathPrefix}pages/services.html#statues">Statues & Beautification</a></li>
                        </ul>
                    </li>
                    <li><a href="${pathPrefix}pages/project.html">Project</a></li>
                    <li><a href="${pathPrefix}pages/contact.html">Contact</a></li>
                </ul>
            </nav>
            <nav class="btnHeader btn">
                <a href="#">Quick Enquiry</a>
            </nav>
        </header>
        `;
        
        // Initialize header functionality
        initializeHeader();
    }
    
    // Insert footer component
    if (document.getElementById('footer-component')) {
        document.getElementById('footer-component').innerHTML = `
        <footer>
            <div class="footerContainer"></div>
            <div class="footerContent">
                <p>&copy; 2025 Company Name. All rights reserved.</p>
                <div class="socialIcons">
                    <a href="#" aria-label="Facebook"><i class="ri-facebook-fill"></i></a>
                    <a href="#" aria-label="Twitter"><i class="ri-twitter-fill"></i></a>
                    <a href="#" aria-label="Instagram"><i class="ri-instagram-fill"></i></a>
                    <a href="#" aria-label="LinkedIn"><i class="ri-linkedin-fill"></i></a>
                </div>
            </div>
        </footer>
        `;
    }
});

// Function to initialize header functionality
function initializeHeader() {
    let header = document.querySelector(".header");
    let mobMenu = document.querySelector(".menuContainer");
    let dropdownItems = document.querySelectorAll(".has-dropdown > a");

    // Mobile menu toggle
    if (mobMenu) {
        mobMenu.addEventListener("click", () => {
            header.classList.toggle("active");
            document.body.classList.toggle("menu-open");
        });
    }

    // Handle dropdown menus on mobile
    function setupDropdowns() {
        // Handle dropdown toggle
        dropdownItems.forEach(item => {
            item.addEventListener("click", function(e) {
                // Only handle dropdown toggle on mobile view
                if (window.innerWidth <= 630) {
                    e.preventDefault();
                    const parent = this.parentElement;
                    const dropdown = parent.querySelector(".dropdown-menu");

                    // Close all other dropdowns first
                    document.querySelectorAll(".has-dropdown").forEach(otherItem => {
                        if (otherItem !== parent) {
                            otherItem.classList.remove("active");
                            const otherDropdown = otherItem.querySelector(".dropdown-menu");
                            if (otherDropdown) {
                                otherDropdown.classList.remove("active");
                            }
                            const otherLink = otherItem.querySelector("a");
                            if (otherLink) {
                                otherLink.setAttribute("aria-expanded", "false");
                            }
                        }
                    });

                    // Toggle active class for the dropdown
                    parent.classList.toggle("active");

                    // Toggle aria-expanded attribute for accessibility
                    const isExpanded = this.getAttribute("aria-expanded") === "true";
                    this.setAttribute("aria-expanded", !isExpanded);

                    // Toggle dropdown visibility
                    if (dropdown.classList.contains("active")) {
                        dropdown.classList.remove("active");
                        // Force a reflow to ensure the CSS transition works properly
                        void dropdown.offsetWidth;
                    } else {
                        dropdown.classList.add("active");
                    }
                }
            });
        });

        // Handle clicks on dropdown items
        document.querySelectorAll(".dropdown-menu li a").forEach(link => {
            link.addEventListener("click", function() {
                if (window.innerWidth <= 630) {
                    // Close the mobile menu when clicking on a dropdown item
                    header.classList.remove("active");
                    document.body.classList.remove("menu-open");
                    closeAllDropdowns();
                }
            });
        });
    }

    // Close all dropdowns initially on mobile
    function closeAllDropdowns() {
        if (window.innerWidth <= 630) {
            document.querySelectorAll(".has-dropdown").forEach(item => {
                item.classList.remove("active");
                const dropdown = item.querySelector(".dropdown-menu");
                if (dropdown) {
                    dropdown.classList.remove("active");
                    // Force a reflow to ensure the CSS transition works properly
                    void dropdown.offsetWidth;
                }
                const link = item.querySelector("a");
                if (link) {
                    link.setAttribute("aria-expanded", "false");
                }
            });
        }
    }

    // Initialize dropdowns
    setupDropdowns();

    // Close dropdowns on page load for mobile
    closeAllDropdowns();

    // Ensure all dropdowns are properly initialized
    document.querySelectorAll(".dropdown-menu").forEach(dropdown => {
        dropdown.classList.remove("active");
        // Force a reflow to ensure the CSS transition works properly
        void dropdown.offsetWidth;
    });

    // Close dropdowns when clicking outside
    document.addEventListener("click", function(e) {
        if (window.innerWidth <= 630) {
            // Check if the click is outside any dropdown
            if (!e.target.closest('.has-dropdown')) {
                closeAllDropdowns();
            }
        }
    });

    // Handle window resize
    window.addEventListener("resize", () => {
        if (window.innerWidth > 630) {
            // Reset mobile dropdown states when returning to desktop view
            document.querySelectorAll(".has-dropdown.active").forEach(item => {
                item.classList.remove("active");
            });
            document.querySelectorAll(".dropdown-menu.active").forEach(dropdown => {
                dropdown.classList.remove("active");
            });
        } else {
            // Close all dropdowns when switching to mobile view
            closeAllDropdowns();
        }
    });
}
