// Galaxy Animation - Complete Redesign
class GalaxyAnimation {
    constructor() {
        this.planets = [];
        this.isInitialized = false;
        this.init();
    }

    init() {
        console.log('🚀 Initializing Galaxy Animation...');
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupAnimation());
        } else {
            this.setupAnimation();
        }
    }

    setupAnimation() {
        try {
            this.planets = document.querySelectorAll('.planet');
            
            if (this.planets.length === 0) {
                console.log('ℹ️ Galaxy Animation section is disabled - no planets found');
                return;
            }

            this.setRandomStartingPositions();
            this.addPlanetInteractions();
            this.addGalaxyEffects();
            this.isInitialized = true;
            
            console.log('✅ Galaxy Animation initialized successfully!');
            console.log(`🌟 Found ${this.planets.length} planets`);
            
        } catch (error) {
            console.error('❌ Error initializing Galaxy Animation:', error);
        }
    }

    setRandomStartingPositions() {
        this.planets.forEach((planet, index) => {
            // Generate random starting angle (0 to 360 degrees)
            const randomAngle = Math.random() * 360;
            
            // Get the orbit element
            const orbit = planet.closest('.orbit');
            if (!orbit) return;
            
            // Calculate the radius based on orbit size
            const orbitWidth = orbit.offsetWidth;
            const radius = orbitWidth / 2;
            
            // Apply the rotation to the planet (only for positioning, not for the image)
            planet.style.transform = `translateX(-50%) rotate(${randomAngle}deg)`;
            planet.style.transformOrigin = `50% ${radius}px`;
            
            // Set random animation delay for more natural movement
            const randomDelay = Math.random() * 5; // 0 to 5 seconds
            planet.style.animationDelay = `-${randomDelay}s`;
            
            // Set the same delay for the planet image to keep it synchronized
            const planetImage = planet.querySelector('.planet-image');
            if (planetImage) {
                planetImage.style.animationDelay = `-${randomDelay}s`;
            }
            
            console.log(`🪐 Planet ${index + 1} starting at angle: ${randomAngle.toFixed(1)}°`);
        });
    }

    addPlanetInteractions() {
        this.planets.forEach((planet, index) => {
            // Hover effects
            planet.addEventListener('mouseenter', (e) => {
                this.handlePlanetHover(e.target, true);
            });

            planet.addEventListener('mouseleave', (e) => {
                this.handlePlanetHover(e.target, false);
            });

            // Click effects
            planet.addEventListener('click', (e) => {
                this.handlePlanetClick(e.target, index);
            });

            // Touch events for mobile
            planet.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.handlePlanetClick(e.target, index);
            });
        });
    }

    handlePlanetHover(planet, isEntering) {
        if (isEntering) {
            planet.style.transform = planet.style.transform.replace('scale(1)', 'scale(1.2)');
            planet.style.zIndex = '10';
            
            // Add glow effect
            const planetImage = planet.querySelector('.planet-image');
            if (planetImage) {
                planetImage.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.9)';
                planetImage.style.borderColor = '#fff';
            }
        } else {
            planet.style.transform = planet.style.transform.replace('scale(1.2)', 'scale(1)');
            planet.style.zIndex = '1';
            
            // Remove glow effect
            const planetImage = planet.querySelector('.planet-image');
            if (planetImage) {
                planetImage.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.5)';
                planetImage.style.borderColor = 'rgba(255, 255, 255, 0.8)';
            }
        }
    }

    handlePlanetClick(planet, index) {
        // Add click animation
        planet.style.animation = 'none';
        planet.offsetHeight; // Trigger reflow
        planet.style.animation = 'planet-click 0.6s ease-out';
        
        // Add ripple effect
        this.createRippleEffect(planet);
        
        // Log click event
        console.log(`🪐 Planet ${index + 1} clicked!`);
        
        // You can add more functionality here, like opening a modal or navigating
        // For example: this.openPlanetModal(index);
    }

    createRippleEffect(planet) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            top: 50%;
            left: 50%;
            width: 100px;
            height: 100px;
            margin-left: -50px;
            margin-top: -50px;
        `;
        
        planet.appendChild(ripple);
        
            setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    addGalaxyEffects() {
        // Add CSS for custom animations
const style = document.createElement('style');
style.textContent = `
            @keyframes planet-click {
                0% { transform: translateX(-50%) scale(1); }
                50% { transform: translateX(-50%) scale(1.3); }
                100% { transform: translateX(-50%) scale(1); }
            }
            
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .galaxy-section {
                position: relative;
            }
            
            .galaxy-section::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: radial-gradient(circle at 30% 20%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 70% 80%, rgba(255, 119, 198, 0.2) 0%, transparent 50%),
                           radial-gradient(circle at 20% 80%, rgba(120, 219, 255, 0.2) 0%, transparent 50%);
                pointer-events: none;
                animation: galaxy-glow 8s ease-in-out infinite alternate;
            }
            
            @keyframes galaxy-glow {
                0% { opacity: 0.3; }
                100% { opacity: 0.7; }
    }
`;
document.head.appendChild(style);
    }

    // Public methods for external control
    pauseAnimation() {
        const planets = document.querySelectorAll('.planet');
        const planetImages = document.querySelectorAll('.planet-image');
        
        planets.forEach(planet => {
            planet.style.animationPlayState = 'paused';
        });
        
        planetImages.forEach(image => {
            image.style.animationPlayState = 'paused';
        });
    }

    resumeAnimation() {
        const planets = document.querySelectorAll('.planet');
        const planetImages = document.querySelectorAll('.planet-image');
        
        planets.forEach(planet => {
            planet.style.animationPlayState = 'running';
        });
        
        planetImages.forEach(image => {
            image.style.animationPlayState = 'running';
        });
    }

    resetAnimation() {
        // Reset planets to random positions
        this.setRandomStartingPositions();
    }


    // Public method to randomize planet positions
    randomizePositions() {
        this.setRandomStartingPositions();
        console.log('🎲 Planet positions randomized!');
    }
}

// Initialize Galaxy Animation
let galaxyAnimation;

// Auto-initialize when script loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        galaxyAnimation = new GalaxyAnimation();
    });
} else {
    galaxyAnimation = new GalaxyAnimation();
}

// Export for external use
window.GalaxyAnimation = GalaxyAnimation;
window.galaxyAnimation = galaxyAnimation;