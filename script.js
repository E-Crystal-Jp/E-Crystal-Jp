document.addEventListener('DOMContentLoaded', function() {
    // Fetch products from the products.json file
    fetch('products.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayProducts(data.products);
        })
        .catch(error => {
            console.error('Error loading the products:', error);
            document.getElementById('product-container').innerHTML = 
                '<p class="error">Could not load products. Please try again later.</p>';
        });
    
    // Function to display products in the container
    function displayProducts(products) {
        const productContainer = document.getElementById('product-container');
        
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product-item';
            
            productElement.innerHTML = `
                <h3>${product.name}</h3>
                <p>${product.description}</p>
            `;
            
            productContainer.appendChild(productElement);
        });
    }
    
    // Highlight active menu item based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
});

// Add this inside the DOMContentLoaded event listener, carousel
document.addEventListener('DOMContentLoaded', function() {
    let currentIndex = 0;

    function rotateCarousel() {
        const carouselImages = document.querySelector('.carousel-images');
        const images = document.querySelectorAll('.carousel-images img');
        if (!carouselImages || images.length === 0) return; // Exit if carousel does not exist

        currentIndex = (currentIndex + 1) % images.length; // Loop back to the first image
        carouselImages.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Automatically rotate every 3 seconds
    setInterval(rotateCarousel, 4000);
});
