// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu toggle functionality
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileSidebar = document.getElementById('mobileSidebar');
    
    if (mobileMenuToggle && mobileSidebar) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileSidebar.classList.toggle('active');
        });
        
        // Close sidebar when clicking on nav links
        const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                mobileSidebar.classList.remove('active');
            });
        });
        
        // Close sidebar when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileSidebar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                mobileSidebar.classList.remove('active');
            }
        });
    }
    
    // Auto slider click handler
    const autoSlides = document.querySelectorAll('.auto-slide');
    autoSlides.forEach(slide => {
        slide.addEventListener('click', function() {
            const carType = this.getAttribute('data-car');
            scrollToCarSection(carType);
        });
    });
    
    // Function to navigate to car detail page or scroll to car section
    function scrollToCarSection(carType) {
        // Define car page URLs
        const carPages = {
            'signature': 'cars/signature.html',
            'kona-electric': 'cars/kona-electric.html',
            'ioniq6': 'cars/ioniq6.html',
            'ioniq5': 'cars/ioniq5.html',
            'creta': 'cars/creta.html',
            'tucson': 'cars/tucson.html',
            'stargazer': 'cars/stargazer.html',
            'staria': 'cars/staria.html',
            'palisade': 'cars/palisade.html',
            'santa-fe': 'cars/santa-fe.html'
        };
        
        // If car page exists, navigate to it
        if (carPages[carType]) {
            window.location.href = carPages[carType];
            return;
        }
        
        // Fallback: scroll to car section (for backward compatibility)
        const carCards = document.querySelectorAll('.car-card');
        let targetCard = null;
        
        // Find the matching car card based on data attributes or content
        carCards.forEach(card => {
            const cardTitle = card.querySelector('h3');
            if (cardTitle) {
                const titleText = cardTitle.textContent.toLowerCase();
                
                // Match car types
                if ((carType === 'signature' && titleText.includes('signature')) ||
                    (carType === 'kona-electric' && titleText.includes('kona')) ||
                    (carType === 'ioniq6' && titleText.includes('ioniq 6')) ||
                    (carType === 'ioniq5' && titleText.includes('ioniq 5')) ||
                    (carType === 'creta' && titleText.includes('creta')) ||
                    (carType === 'tucson' && titleText.includes('tucson')) ||
                    (carType === 'stargazer' && titleText.includes('stargazer')) ||
                    (carType === 'staria' && titleText.includes('staria')) ||
                    (carType === 'palisade' && titleText.includes('palisade')) ||
                    (carType === 'santa-fe' && titleText.includes('santa fe'))) {
                    targetCard = card;
                }
            }
        });
        
        if (targetCard) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetCard.offsetTop - headerHeight - 100; // Extra space
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Add highlight effect
            targetCard.style.transform = 'scale(1.05)';
            targetCard.style.boxShadow = '0 25px 80px rgba(255, 107, 53, 0.3)';
            targetCard.style.border = '3px solid #ff6b35';
            
            setTimeout(() => {
                targetCard.style.transform = '';
                targetCard.style.boxShadow = '';
                targetCard.style.border = '';
            }, 2000);
        }
    }
    
    // Responsive auto slider
    function adjustSliderSpeed() {
        const slider = document.getElementById('autoSlider');
        const slides = slider.querySelectorAll('.auto-slide');
        const screenWidth = window.innerWidth;
        
        if (screenWidth < 768) {
            // Mobile: slower animation
            slider.style.animationDuration = '40s';
        } else if (screenWidth < 1024) {
            // Tablet: medium speed
            slider.style.animationDuration = '35s';
        } else {
            // Desktop: normal speed
            slider.style.animationDuration = '30s';
        }
    }
    
    // Adjust on load and resize
    adjustSliderSpeed();
    window.addEventListener('resize', adjustSliderSpeed);
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Lead form submission
    const leadForm = document.getElementById('leadForm');
    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = {};
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }
            
            // Create WhatsApp message
            const message = `Halo, saya tertarik dengan Hyundai ${data.mobil}.\n\nNama: ${data.nama}\nTelepon: ${data.telepon}\nEmail: ${data.email}\n\nPesan: ${data.pesan || 'Tidak ada'}`;
            
            const whatsappUrl = `https://wa.me/6281250506767?text=${encodeURIComponent(message)}`;
            
            // Show success message
            alert('Terima kasih! Anda akan diarahkan ke WhatsApp untuk melanjutkan konsultasi.');
            
            // Redirect to WhatsApp
            window.open(whatsappUrl, '_blank');
            
            // Reset form
            this.reset();
        });
    }
    
    
    // Car cards animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe car cards
    const carCards = document.querySelectorAll('.car-card');
    carCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Gallery items animation
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
    
    // Phone number click tracking
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Track phone click for analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'phone_call', {
                    'event_category': 'contact',
                    'event_label': 'phone_click'
                });
            }
        });
    });
    
    // WhatsApp link click tracking
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Track WhatsApp click for analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'whatsapp_click', {
                    'event_category': 'contact',
                    'event_label': 'whatsapp_click'
                });
            }
        });
    });
});

// Initialize Google Maps
function initMap() {
    // Coordinates for Jakarta Barat (example location)
    const dealerLocation = { lat: -6.1944, lng: 106.8229 };
    
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: dealerLocation,
        styles: [
            {
                "featureType": "all",
                "elementType": "geometry.fill",
                "stylers": [{"weight": "2.00"}]
            },
            {
                "featureType": "all",
                "elementType": "geometry.stroke",
                "stylers": [{"color": "#9c9c9c"}]
            },
            {
                "featureType": "all",
                "elementType": "labels.text",
                "stylers": [{"visibility": "on"}]
            }
        ]
    });
    
    const marker = new google.maps.Marker({
        position: dealerLocation,
        map: map,
        title: 'Hyundai Andalan Motors',
        icon: {
            url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiMwMDMzNjYiLz4KPHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiIHg9IjYiIHk9IjYiPgo8cGF0aCBkPSJNMTIgMkM4LjEzIDIgNSA1LjEzIDUgOWMwIDUuMjUgNyAxMyA3IDEzczctNy43NSA3LTEzYzAtMy44Ny0zLjEzLTctNy03eiIvPgo8Y2lyY2xlIGN4PSIxMiIgY3k9IjkiIHI9IjIuNSIvPgo8L3N2Zz4KPC9zdmc+',
            scaledSize: new google.maps.Size(40, 40)
        }
    });
    
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div style="padding: 10px;">
                <h3 style="margin: 0 0 10px 0; color: #003366;">Hyundai Andalan Motors</h3>
                <p style="margin: 0; line-height: 1.4;">Jl. Raya Jakarta-Tangerang No. 123<br>Jakarta Barat, DKI Jakarta 11470</p>
                <p style="margin: 10px 0 0 0;"><strong>Telepon:</strong> 0812 5050 6767</p>
            </div>
        `
    });
    
    marker.addListener('click', function() {
        infoWindow.open(map, marker);
    });
}

// Fallback for maps if Google Maps fails to load
window.addEventListener('load', function() {
    setTimeout(function() {
        const mapElement = document.getElementById('map');
        if (mapElement && !mapElement.hasChildNodes()) {
            mapElement.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f0f0f0; color: #666; text-align: center; padding: 20px;">
                    <div>
                        <i class="fas fa-map-marker-alt" style="font-size: 2rem; margin-bottom: 1rem; color: #003366;"></i>
                        <h3 style="margin-bottom: 1rem;">Hyundai Andalan Motors</h3>
                        <p>Jl. Raya Jakarta-Tangerang No. 123<br>Jakarta Barat, DKI Jakarta 11470</p>
                        <a href="https://maps.google.com/?q=-6.1944,106.8229" target="_blank" style="color: #ff6b35; text-decoration: none; font-weight: bold;">Buka di Google Maps</a>
                    </div>
                </div>
            `;
        }
    }, 3000);
});

// Mobile menu toggle function (legacy - now handled in DOMContentLoaded)
function toggleMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileSidebar = document.getElementById('mobileSidebar');
    
    if (mobileMenuToggle && mobileSidebar) {
        mobileMenuToggle.classList.toggle('active');
        mobileSidebar.classList.toggle('active');
    }
}

// Contact form validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#ff6b35';
        } else {
            field.style.borderColor = '';
        }
    });
    
    return isValid;
}

// Format price numbers
function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
}