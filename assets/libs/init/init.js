// Video Modal Functions
var video = document.querySelector('#Modal #videop');
if (video) {
    video.addEventListener("canplay", function() {
        document.querySelector('#Modal #videop').style.display = "block";
        document.querySelector('#Modal #imagep').style.display = "none";
    });
    
    video.addEventListener("error", function() {
        document.querySelector('#Modal #videop').style.display = "none";
        document.querySelector('#Modal #imagep').style.display = "block";
    });
}

function showVideo(id) {
    let dataExportModal = new bootstrap.Modal(document.getElementById('Modal'));
    dataExportModal.show();
    document.querySelector('#Modal #videop').src = `assets/video/${id}.mp4`;
    document.querySelector('#Modal #imagep').src = `assets/images/${id}.jpg`;
}

function stopVideo() {
    const videoElement = document.querySelector('#Modal video');
    if (videoElement) {
        videoElement.pause();
        videoElement.currentTime = 0;
    }
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add fade-in animation to elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Add active class to navigation links based on scroll position
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollSections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', function() {
        let current = '';
        scrollSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
});

// Initialize parallax effect
if (typeof universalParallax !== 'undefined') {
    new universalParallax().init();
}

// jQuery functions for mobile menu
jQuery(function () {
    $('.menu__box__Back').click(function () {
        $('.menu__btn').trigger('click');
    });

    $('.menu__item').click(function () {
        $('.menu__btn').trigger('click');
    });
});

// Load today's programs
const hhmm = new Date().toLocaleTimeString("en-US", { 
    timeZone: 'Asia/Beirut', 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: false 
});

fetch(`./programs2.json?t=${hhmm}`)
    .then(response => response.json())
    .then(data => {
        const programs = Array.from(data);
        const today = ((new Date().getDay()) + 1).toString();
        let todayPrograms = [];

        programs.forEach(program => {
            if (program.day.toString().includes(today) || program.day.toString().includes("0")) {
                todayPrograms.push(program);
            }
        });

        todayPrograms.sort((a, b) => {
            const timeA = a.time.toUpperCase();
            const timeB = b.time.toUpperCase();
            if (timeA < timeB) {
                return -1;
            }
            if (timeA > timeB) {
                return 1;
            }
            return 0;
        });

        var currentProgram = -1;
        let todayProgramsDiv = document.getElementById("todayPrograms");
        
        if (todayProgramsDiv) {
            todayProgramsDiv.innerHTML = "";
            todayPrograms.forEach((program, index) => {
                todayProgramsDiv.innerHTML += `<div class="swiper-slide swiper-card card-d1 text-center">
                    <a class="text-decoration-none">
                        <div class="d-flex justify-content-start align-items-center">
                            <img loading="lazy" onError="this.onerror=null;this.src='assets/images/00.png';" 
                                 src="assets/images/${program.name.replaceAll(" ", "_")}.png"
                                 class="image-r1 img-responsive round rounded-3 cardIMG">
                            <div class="text-white fs-1 me-1 position-absolute timeOpacity" 
                                 style="font-size: 2.0rem !important; letter-spacing: -1px;">
                                ${program.time}
                            </div>
                        </div>
                        <p class="text-end secondary fw-bold mt-2 headerFontSize">${program.name}</p>
                    </a>
                </div>`;

                if (currentProgram == -1 && 
                    (((program.time < hhmm && index == todayPrograms.length - 1)) || 
                     (program.time < hhmm && index != 0 && todayPrograms[index + 1].time > hhmm) || 
                     (program.time >= hhmm))) {
                    currentProgram = index;
                }
            });

            if (todayProgramsDiv.innerHTML != "") {
                for (var i = 0; i < 4; i++) {
                    todayProgramsDiv.innerHTML += `<div class="swiper-slide swiper-card card-d1 text-center">
                        <a class="text-decoration-none">
                            <div class="d-flex justify-content-start align-items-center">
                                <img loading="lazy" src="assets/images/tt.png"
                                     class="image-r1 img-responsive round rounded-3 cardIMG">
                                <div class="text-white fs-1 me-1 position-absolute timeOpacity"></div>
                            </div>
                            <p class="text-end secondary fw-bold mt-2 headerFontSize"></p>
                        </a>
                    </div>`;
                }
            }

            // Initialize Swiper
            var swiper = new Swiper('.cardSwiper', {
                slidesPerView: 'auto',
                grabCursor: true,
                lazyPreloadPrevNext: 2,
                freeMode: false,
                centerInsufficientSlides: false,
                loop: false,
                translate: 2,
                grabCursor: true
            });

            if (currentProgram >= 0) {
                swiper.slideTo(currentProgram, 0);
            }
        }
    })
    .catch(error => {
        console.log('Error loading programs:', error);
    });

// Add CSS for active navigation link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color) !important;
        background-color: rgba(26, 188, 229, 0.1);
        transform: translateY(-2px);
    }
`;
document.head.appendChild(style);