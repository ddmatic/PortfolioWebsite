// ====================================================================
// GLOBAL FUNCTIONS (can run outside DOMContentLoaded if they don't
// directly interact with specific DOM elements on load, or are called later)
// ====================================================================

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

// Add CSS animation keyframes dynamically (best placed here, as it modifies the head)
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }

    /* New CSS for the blackout screen */
    .blackout-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw; /* Viewport width */
        height: 100vh; /* Viewport height */
        background-color: rgba(0, 0, 0, 1); /* Solid black */
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Arial', sans-serif; /* You can use your preferred font */
        font-size: 2.5em; /* Adjust size as needed */
        font-weight: bold;
        text-align: center;
        z-index: 9999; /* Ensure it's on top of everything */
        opacity: 0; /* Start invisible for a fade-in effect */
        transition: opacity 0.3s ease-in-out; /* Smooth fade-in/out */
        pointer-events: none; /* Allows clicks to pass through when not active */
        text-shadow: 2px 2px 4px rgba(0,0,0,0.5); /* Subtle shadow for text readability */
    }
    .blackout-screen.active {
        opacity: 1; /* Fade in */
        pointer-events: auto; /* Re-enable pointer events when active */
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
    if (!plane) {
        return;
    }

    const randomTop = Math.floor(Math.random() * window.innerHeight * 0.7) + 50;
    plane.style.top = `${randomTop}px`;

    plane.classList.remove('fly');
    void plane.offsetWidth;
    plane.classList.add('fly');

    setTimeout(() => {
        plane.classList.remove('fly');
    }, 6000);
}

// Combined window load event
window.addEventListener('load', function() {
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        const originalText = subtitle.textContent;
        typeWriter(subtitle, originalText, 50);
    }

    launchPlane();
    setInterval(launchPlane, 6000);
});


// ====================================================================
// DOMContentLoaded Event Listener
// All code that interacts with specific HTML elements that must be
// present in the DOM should go inside this listener.
// ====================================================================
document.addEventListener('DOMContentLoaded', function() {

    // State variable to track aviation mode
    let isAviationModeActive = false; // Initialize to false

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

    // Aviation Mode and Blackout Effect
    const aviationButton = document.querySelector('.aviation-enabled');
    const headerImage = document.getElementById('headerImage');
    const aboutMeParagraph = document.querySelector('.section p');
    const hotLuxParagraph = document.getElementById('HotLux');
    const planeStatsParagraph = document.getElementById('PlaneStats')
    const aboutMeBullet = document.getElementById('AboutMe')
    const sAndTBullet = document.getElementById('SandT')
    const projectsBullet = document.getElementById('Projects')
    const getInTouchBullet = document.getElementById('GetInTouch')

    const originalAboutMeText = "Data analyst with experience in data as well as business and finance. Likes to measure things or make unmeasurable things measurable. Speaking Serbian, English, and with databases. Loves playing basketball but prefers chess nowadays because he’s out of shape.";
    const aviationAboutMeText = "Data analyst cleared for operations in business and financial airspace. Specializes in precision targeting of metrics - if it can't be measured, he'll deploy tools to get it on radar. Speaks Serbian, English, and DBMS. Used to fly high on the basketball court, but these days he’s logged more hours at the chessboard - fewer Gs, same tactical edge."

    const originalHotLux = "Automates apartment hunting by tracking new and existing listings to avoid missed opportunities. Built with Python, using BeautifulSoup and Selenium for scraping, Flask for the web app, Pandas for data handling, SQLite3 for storage, and OpenAI API for smarter filtering. Provides on-demand updates, Excel export, and a simple web interface."
    const aviationHotLux = "Mission: Automated recon for apartment ops - scans the skies for new and existing listings to make sure no opportunity flies under the radar. Airframe built in Python, running BeautifulSoup and Selenium on the front sweep. Flask handles comms via a lightweight web interface. Pandas manages onboard data, SQLite3 stores it in the hangar, and OpenAI API adds smart filtering to keep noise off the scope. Features include rapid situational updates, Excel payload drops, and smooth cockpit controls."

    const originalPlaneStats = "Scraped aviation accident data from https://asn.flightsafety.org/ and analyzed it by year, aircraft make and model, and fatalities (passenger and ground) to extract flight safety insights and trends. Used Python with BeautifulSoup for scraping and Matplotlib/Seaborn for visualization."
    const aviationPlaneStats = "Pulled flight logs from ASN’s safety tower — scraped aviation accident data direct from the source. Ran analysis by year, aircraft type, and casualty figures (both in-cabin and on the ground) to identify safety trends and highlight turbulence in the skies. Python ran point with BeautifulSoup on the scrape, while Matplotlib and Seaborn handled post-mission visuals for clear situational awareness."

    const originalAboutMe = "About Me"
    const aviationAboutMe = "Brief"
    const originalSandT = "Skills & Tools"
    const aviationSandT = "Onboard Systems"
    const originalProjects = "Featured Projects"
    const aviationProjects = "Mission Reports"
    const originalGiT = "Get In Touch"
    const aviationGiT = "Open Channel"


    if (aboutMeParagraph) {
      aboutMeParagraph.textContent = originalAboutMeText;
    }

    if (aviationButton && headerImage) {
        aviationButton.addEventListener('click', function() {
            let blackoutText = "";
            let newImageSrc = "";
            let buttonText = ""; // To change button text as well
            let newAboutMeText = "";
            let newHotLux = "";
            let newPlaneStats = "";
            let newAboutMe = "";
            let newSandT = "";
            let newProjects = "";
            let newGiT = "";

            if (!isAviationModeActive) {
                // First click: Activate Aviation Mode
                newImageSrc = 'img/headerimgpilot.png';
                blackoutText = "HOWLING TO THE DANGER ZONE!";
                buttonText = "Exit Aviation Mode";
                newAboutMeText = aviationAboutMeText;
                newHotLux = aviationHotLux;
                newPlaneStats = aviationPlaneStats;
                newAboutMe = aviationAboutMe;
                newSandT = aviationSandT;
                newProjects = aviationProjects;
                newGiT = aviationGiT;
                isAviationModeActive = true;
            } else {
                // Second click: Deactivate Aviation Mode
                newImageSrc = 'img/headerimg.png'; // Original image
                blackoutText = "no dngr zne :(";
                buttonText = "Aviation Mode";
                newAboutMeText = originalAboutMeText;
                newHotLux = originalHotLux;
                newPlaneStats = originalPlaneStats;
                newAboutMe = originalAboutMe;
                newSandT = originalSandT;
                newProjects = originalProjects;
                newGiT = originalGiT;
                isAviationModeActive = false;
            }

            // 1. Change header image source
            headerImage.src = newImageSrc;
            console.log('Image source changed to:', newImageSrc);

            // 2. Update button text
            aviationButton.textContent = buttonText;

            aboutMeParagraph.textContent = newAboutMeText;

            hotLuxParagraph.textContent = newHotLux;

            aboutMeBullet.textContent = newAboutMe;

            sAndTBullet.textContent = newSandT;

            projectsBullet.textContent = newProjects;

            getInTouchBullet.textContent = newGiT;

            planeStatsParagraph.textContent = newPlaneStats;
            console.log('About Me text changed to:', newAboutMeText)

            // 3. Create blackout screen element
            const blackoutScreen = document.createElement('div');
            blackoutScreen.classList.add('blackout-screen');
            blackoutScreen.textContent = blackoutText; // Set dynamic text

            // 4. Append to body
            document.body.appendChild(blackoutScreen);

            // 5. Force reflow to allow opacity transition to work from 0 to 1
            void blackoutScreen.offsetWidth;

            // 6. Activate the blackout screen (fade in)
            blackoutScreen.classList.add('active');

            // 7. Set timeout to remove after 2 seconds (2000 milliseconds)
            setTimeout(() => {
                blackoutScreen.classList.remove('active'); // Start fade out

                // 8. Remove the element from DOM after fade out transition completes
                setTimeout(() => {
                    blackoutScreen.remove();
                }, 300); // Matches blackout-screen transition duration
            }, 1000); // Duration the screen stays active (2 seconds)

        });
    } else {
        console.error('Error: Aviation button or header image element not found. Check HTML IDs/classes.');
    }

}); // End of DOMContentLoaded event listener
