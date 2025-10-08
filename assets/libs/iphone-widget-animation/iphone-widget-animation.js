// iPhone Widget Scroll Animation
// Inspired by Haptic's site and CodePen example

document.addEventListener('DOMContentLoaded', function() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    const iphone = document.querySelector(".iphone-mockup");
    const widgets = document.querySelectorAll(".widgets");
    
    // Set initial states
    gsap.set(iphone, { scale: 0.75, opacity: 0 });
    gsap.set(widgets, { 
        opacity: 0, 
        scale: 0, 
        x: 0, 
        y: 0
    });
    
    // iPhone animation function
    function iPhoneAnimation() {
        const tl = gsap.timeline({ defaults: { duration: 1 } });
        tl.to(iphone, { scale: 1, opacity: 1 })
          .to(iphone, { duration: 3, scale: 1, opacity: 1 });
        return tl;
    }
    
    // Widget animation function
    function widgetAnimation() {
        const tl = gsap.timeline();
        tl.to(widgets, { duration: 0, opacity: 1 });
        return tl;
    }
    
    // Widget animations configuration - Perfectly Symmetric Layout
    const animations = [
        // LEFT SIDE (5 widgets)
        {
            selector: "#hashtag-widget",
            duration: 3,
            scale: 1,
            x: 350,
            y: -350,
            ease: "power4.out"
        },
        {
            selector: "#religious-widget",
            duration: 3,
            scale: 1,
            x: 350,
            y: -200,
            ease: "power2.out"
        },
        {
            selector: "#calendar-widget",
            duration: 3,
            scale: 1,
            x: 350,
            y: -50,
            ease: "power4.out"
        },
        {
            selector: "#love-widget",
            duration: 3,
            scale: 1,
            x: 350,
            y: 100,
            ease: "power4.out"
        },
        {
            selector: "#culture-widget",
            duration: 3,
            scale: 1,
            x: 350,
            y: 250,
            ease: "power2.out"
        },
        
        // RIGHT SIDE (5 widgets) - Mirror positions
        {
            selector: "#guidance-widget",
            duration: 3,
            scale: 1,
            x: -350,
            y: -350,
            ease: "power4.out"
        },
        {
            selector: "#community-widget",
            duration: 3,
            scale: 1,
            x: -350,
            y: -200,
            ease: "power2.out"
        },
        {
            selector: "#analysis-widget",
            duration: 3,
            scale: 1,
            x: -350,
            y: -50,
            ease: "power4.out"
        },
        {
            selector: "#reflection-widget",
            duration: 3,
            scale: 1,
            x: -350,
            y: 100,
            ease: "power4.out"
        },
        {
            selector: "#passion-widget",
            duration: 3,
            scale: 1,
            x: -350,
            y: 250,
            ease: "power2.out"
        },
        
        // Socials at top center
        {
            selector: "#socials",
            duration: 3,
            scale: 1.0,
            x: 350,
            y: 350,
            ease: "power2.out"
        }
    ];
    
    const startTime = 2;
    const masterTimeline = gsap.timeline();
    masterTimeline.add(iPhoneAnimation()).add(widgetAnimation(), startTime);
    
    // Add individual widget animations
    animations.forEach((animation, index) => {
        const { selector, duration, scale, x, y, ease } = animation;
        const element = document.querySelector(selector);
        if (element) {
            // Adjust positions for mobile
            let adjustedX = x;
            let adjustedY = y;
            let adjustedScale = scale;
            
            if (window.innerWidth < 768) {
                adjustedX = x * 0.5; // Reduce horizontal movement on mobile
                adjustedY = y * 0.6; // Reduce vertical movement on mobile
                adjustedScale = scale * 0.8; // Slightly smaller on mobile
            }
            
            masterTimeline.add(
                gsap.to(element, { 
                    duration, 
                    scale: adjustedScale, 
                    x: adjustedX, 
                    y: adjustedY, 
                    ease
                }),
                startTime + (index % 3) / 2
            );
        }
    });
    
    // Create ScrollTrigger
    ScrollTrigger.create({
        animation: masterTimeline,
        trigger: ".iphone-widget-animation",
        scrub: 1,
        pin: true,
        start: "top top",
        end: "+=300%",
        onComplete: function() {
            // Add cloud-like floating animation after main animation completes
            widgets.forEach((widget, index) => {
                // Create a subtle floating animation
                const floatAnimation = gsap.timeline({ repeat: -1, yoyo: true });
                
                // Subtle floating pattern
                const randomX = (Math.random() - 0.5) * 8;
                const randomY = (Math.random() - 0.5) * 6;
                const randomRotation = (Math.random() - 0.5) * 3;
                
                floatAnimation
                    .to(widget, {
                        x: `+=${randomX}`,
                        y: `+=${randomY}`,
                        rotation: randomRotation,
                        duration: 4 + (index * 0.5),
                        ease: "power2.inOut"
                    })
                    .to(widget, {
                        x: `+=${-randomX * 0.5}`,
                        y: `+=${-randomY * 0.3}`,
                        rotation: -randomRotation * 0.6,
                        duration: 3 + (index * 0.3),
                        ease: "power1.inOut"
                    });
                
                // Start animation with delay
                floatAnimation.delay(index * 0.3);
            });
        }
    });
    
    // Add hover effects for widgets
    widgets.forEach(widget => {
        widget.addEventListener('mouseenter', function() {
            gsap.to(this, { scale: 1.1, duration: 0.3, ease: "power2.out" });
        });
        
        widget.addEventListener('mouseleave', function() {
            gsap.to(this, { scale: 1, duration: 0.3, ease: "power2.out" });
        });
    });
    
    // Add click effects for image widgets
    const imageWidgets = document.querySelectorAll('.image-widget');
    imageWidgets.forEach(widget => {
        widget.addEventListener('click', function() {
            // Add click animation
            gsap.to(this, { scale: 15, duration: 0.1, yoyo: true, repeat: 1 });
            
            // You can add more functionality here if needed
            console.log('Image widget clicked:', this.id);
        });
        
        // Add cursor pointer
        widget.style.cursor = 'pointer';
    });
});
