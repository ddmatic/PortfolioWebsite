// Smooth scrolling for any navigation links you might add
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add some interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Skill cards interaction
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Project cards interaction
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add a subtle pulse effect when clicked
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'pulse 0.6s ease';
            }, 10);
        });
    });

    // Contact items interaction
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            // You can add functionality to copy contact info or open links
            const contactText = this.querySelector('p') ? this.querySelector('p').textContent : '';
            console.log('Contact clicked:', contactText);

            // Add a visual feedback
            this.style.background = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
            this.style.color = 'white';

            setTimeout(() => {
                this.style.background = '';
                this.style.color = 'inherit';
            }, 300);
        });
    });
});

// Add CSS animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Parallax effect for header background
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('header');
    if (header) {
        header.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add typing effect to subtitle (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Plane animation function
function launchPlane() {
    const plane = document.getElementById('plane');
    if (!plane) return;

    // Random vertical position between 50px and about 70% viewport height
    const randomTop = Math.floor(Math.random() * window.innerHeight * 0.7) + 50;
    plane.style.top = `${randomTop}px`;

    // Remove the 'fly' class to reset the plane's position before starting a new flight
    plane.classList.remove('fly');

    // Force reflow so the browser registers the class removal and resets the transform
    void plane.offsetWidth; // Use offsetWidth for reflow

    // Add the 'fly' class to start the animation
    plane.classList.add('fly');

    // Remove the 'fly' class after the animation completes (5 seconds, matching CSS transition)
    // This prepares the plane for the next launch
    setTimeout(() => {
        plane.classList.remove('fly');
    }, 6000); // Changed from 1000 to 5000 to match CSS transition duration
}

// Combined window load event
window.addEventListener('load', function() {
    // Typing effect for subtitle
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        const originalText = subtitle.textContent;
        typeWriter(subtitle, originalText, 50);
    }

    // Start plane animation
    launchPlane(); // Launch the first plane
    // Set interval for subsequent plane launches.
    // The interval should be longer than the animation duration to avoid overlapping.
    setInterval(launchPlane, 6000); // Changed from 1000 to 6000 (5s animation + 1s delay)
});
