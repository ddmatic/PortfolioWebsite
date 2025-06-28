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

// Add CSS animation keyframes dynamically (can be outside DOMContentLoaded as it modifies the head)
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Parallax effect for header background (can be outside DOMContentLoaded if you prefer immediate effect)
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('header');
    if (header) {
        // Correct parallax for header. Use transformY for element itself, not its background.
        // If you want background parallax, the CSS for it would be 'background-position: center ' + (-scrolled * 0.5) + 'px;'
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

    const randomTop = Math.floor(Math.random() * window.innerHeight * 0.7) + 50;
    plane.style.top = `${randomTop}px`;

    plane.classList.remove('fly');
    void plane.offsetWidth;
    plane.classList.add('fly');

    setTimeout(() => {
        plane.classList.remove('fly');
    }, 6000);
}

// Combined window load event (runs after all resources like images are loaded)
window.addEventListener('load', function() {
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        const originalText = subtitle.textContent;
        typeWriter(subtitle, originalText, 50);
    }

    launchPlane();
    setInterval(launchPlane, 6000);
});

// ** ALL CODE THAT INTERACTS WITH HTML ELEMENTS SHOULD BE INSIDE DOMContentLoaded **
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
            const contactText = this.querySelector('p') ? this.querySelector('p').textContent : '';
            console.log('Contact clicked:', contactText);

            this.style.background = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
            this.style.color = 'white';

            setTimeout(() => {
                this.style.background = '';
                this.style.color = 'inherit';
            }, 300);
        });
    });

    // >>> MOVE YOUR AVIATION MODE CODE HERE <<<
    const aviationButton = document.querySelector('.aviation-enabled');
    const headerImage = document.getElementById('headerImage');

    if (aviationButton && headerImage) { // Always good to check
        aviationButton.addEventListener('click', function() {
            headerImage.src = 'img/headerimgpilot.png';
            console.log('Image source changed to: img/headerimgpilot.png');
        });
    } else {
        console.error('Aviation button or header image not found. Check HTML IDs/classes.');
    }
    // >>> END OF AVIATION MODE CODE <<<

}); // End of DOMContentLoaded
