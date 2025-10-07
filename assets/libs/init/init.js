var video = document.querySelector('#Modal #videop');
video.addEventListener("canplay", function() {
document.querySelector('#Modal #videop').style.display = "block";
document.querySelector('#Modal #imagep').style.display = "none";
});
video.addEventListener("error", function() {
document.querySelector('#Modal #videop').style.display = "none";
document.querySelector('#Modal #imagep').style.display = "block";
});
   
   
   
    function showVideo(id) {
        let dataExportModal = new bootstrap.Modal(document.getElementById('Modal'))
        dataExportModal.show();
        document.querySelector('#Modal #videop').src = `assets/video/${id}.mp4`;
        document.querySelector('#Modal #imagep').src = `assets/images/${id}.jpg`;
   }
   

    function stopVideo(){
        document.querySelector('#Modal video').pause();
        document.querySelector('#Modal video').currentTime = 0;
    }

    

// var v = document.getElementById("lcd");
//   v.onclick = function() {
//     if (v.paused) {
//       v.play();
//     } else {
//       v.pause();
//     }
//   };


   new universalParallax().init();

jQuery(function () {


    $('.menu__box__Back').click(function () {
        $('.menu__btn').trigger('click');
    });

    $('.menu__item').click(function () {
        $('.menu__btn').trigger('click');
    });
});


        const hhmm = new Date().toLocaleTimeString("en-US", { timeZone: 'Asia/Beirut', hour: '2-digit', minute: '2-digit', hour12: false });
        fetch(`./programs2.json?t=${hhmm}`)
            .then(response => response.json())
            .then(data => {
                const programs = Array.from(data);
                const today = ((new Date().getDay())+1).toString();
                let todayPrograms = [];

                programs.forEach(program => {
                    if (program.day.toString().includes(today) || program.day.toString().includes("0"))
                        todayPrograms.push(program);
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
                todayProgramsDiv.innerHTML = "";
                todayPrograms.forEach((program, index) => {
                    todayProgramsDiv.innerHTML += `<div class="swiper-slide swiper-card card-d1 text-center"><a class=" text-decoration-none">
                                <div class=" d-flex justify-content-start align-items-center">
                                    <img loading="lazy"    onError="this.onerror=null;this.src='assets/images/00.png';" src="assets/images/${program.name.replaceAll(" ","_")}.png"
                                        class=" image-r1 img-responsive round rounded-3 cardIMG">
                                    <div class="text-white fs-1 me-1 position-absolute timeOpacity " style="
    font-size: 2.0rem !important;
    letter-spacing: -1px;
">${program.time}</div>
                                </div>
                                <p class="text-end secondary fw-bold mt-2 headerFontSize">${program.name}</p>
                            </a>
                        </div>`;
                    if (currentProgram == -1 && (((program.time < hhmm && index == todayPrograms.length - 1)) || (program.time < hhmm && index != 0 && todayPrograms[index + 1].time > hhmm) || (program.time >= hhmm))) {
                        currentProgram = index;
                    }

                });

                if (todayProgramsDiv.innerHTML != "") {
                    for (var i = 0; i < 4; i++) {
                        todayProgramsDiv.innerHTML += `<div class="swiper-slide swiper-card card-d1 text-center">
                            <a class=" text-decoration-none">
                                <div class=" d-flex justify-content-start align-items-center">
                                    <img loading="lazy" src="assets/images/tt.png"
                                        class=" image-r1 img-responsive round rounded-3 cardIMG">
                                    <div class="text-white fs-1 me-1 position-absolute timeOpacity "></div>
                                </div>
                                <p class="text-end secondary fw-bold mt-2 headerFontSize"></p>
                            </a>
                        </div>`;
                    }


                }

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
                //    let lvw = vw(40);
                //     if(lvw<180) lvw = 180
                //     else if(lvw > 230) lvw = 230 
                swiper.slideTo(currentProgram, 0);
                // swiper.translateTo(-2300, 1000, true, false);
                // document.getElementById("todayProgramsSection")
                // transform: translate3d(230px, 0px, 0px);
                // document.getElementById("todayPrograms").style.transform = `translateX(230px)`;


            });