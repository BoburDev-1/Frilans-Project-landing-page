if (window.innerWidth < 576) {
    function removeAos() {
        var elem = document.getElementById("aos-css-file");
        elem.parentNode.removeChild(elem);
        return false;
    }
    removeAos();
}

AOS.init({
    once: true, // 1marta, false busa infinete
    mirror: true,
    offset: 300,
    disable: "mobile",
});

let header = document.querySelector(".header_nav");
let openFeedbackModal = document.getElementById("open_feedback_modal_form");
let feedbackForm = document.querySelector("#feedback_form");
let feedbackModal = document.querySelector(".feedback_modal");
let feedbackBtn = document.getElementById("feedback_btn");
let feedbackName = document.getElementById("feedback_name");
let feedbackPhone = document.getElementById("feedback_phone");
let feedbackMsg = document.getElementById("feedback_msg");
let feedback_close_modal = document.getElementById("feedback_close_modal");

feedbackBtn.addEventListener("click", feedbackAjax);
feedbackPhone.addEventListener("input", validationPhoneNumber);
openFeedbackModal.addEventListener("click", openFeedbackModalFunction);
feedback_close_modal.addEventListener("click", feedbackCloseModal);

function feedbackAjax(e) {
    let phone = feedbackPhone.value.replace(/[^0-9]/g, "");
    let ajax = new XMLHttpRequest();
    let feedbackMessagError = document.querySelector(".feedback_msg_error");
    let feedbackPhoneError = document.querySelector(".feedback_phone_error");
    let feedbacknameError = document.querySelector(".feedback_name_error");

    if (
        feedbackName.value.length <= 8 ||
        phone.length <= 8 ||
        feedbackMsg.value.length <= 80
    ) {
        if (feedbackName.value.length <= 8) {
            feedbackName.classList.add("is-invalid");
            feedbacknameError.classList.remove("d-none");
        } else {
            feedbackName.classList.remove("is-invalid");
            feedbackName.classList.add("is-valid");
            feedbacknameError.classList.add("d-none");
        }
        if (phone.length <= 8) {
            feedbackPhone.classList.add("is-invalid");
            feedbackPhoneError.classList.remove("d-none");
        } else {
            feedbackPhone.classList.remove("is-invalid");
            feedbackPhone.classList.add("is-valid");
            feedbackPhoneError.classList.add("d-none");
        }

        if (feedbackMsg.value.length <= 80) {
            feedbackMsg.classList.add("is-invalid");
            feedbackMessagError.classList.remove("d-none");
        } else {
            feedbackMsg.classList.remove("is-invalid");
            feedbackMsg.classList.add("is-valid");
            feedbackMessagError.classList.add("d-none");
        }
    } else {
        feedbackName.classList.add("is-valid");
        feedbackPhone.classList.add("is-valid");
        feedbackMsg.classList.add("is-valid");

        let feedback = JSON.stringify({
            name: feedbackName.value,
            phone: phone,
            msg: feedbackMsg.value,
        });

        ajax.onload = function() {
     
            if (ajax.status == 200 && ajax.readyState == 4) {
            
                if (ajax.response === "ok") {
                    feedbackModal.style.display = "none";
                    feedbackBtn.disabled = true;
                    alert("Xabaringiz yuborildi");
                    feedbackForm.reset();               
                } else {
                    alert("Raqamingizni yuboriwda xatolik yuz berdi ");             
                }
            }
        };
        ajax.open("post", "http://test/api/frilans_feedback.php");
        ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        ajax.send("feedback=" + encodeURIComponent(feedback));
    }
}

// feedbackOpenModal
function openFeedbackModalFunction() {
    openFeedbackModal.classList.remove("open_feedback_modal_form_animation");
    feedbackModal.style.display = "block";
}
// feedbackCloseModal
function feedbackCloseModal() {
    feedbackModal.classList.remove("feedback_open_animation");
    feedbackModal.classList.add("feedback_close_animation");

    setTimeout(() => {
        feedbackModal.style.display = "none";
        feedbackModal.classList.add("feedback_open_animation");
        feedbackModal.classList.remove("feedback_close_animation");
    }, 500);
}

// valid phone number
let phone = document.getElementById("phone");
phone.addEventListener("input", validationPhoneNumber);

function validationPhoneNumber(e) {
    let x = e.target.value
        .replace(/\D/g, "")
        .match(/(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);

    e.target.value = !x[2] ?
        x[1] :
        "( " +
        x[1] +
        ") " +
        (x[2] ? " " + x[2] : "") +
        (x[3] ? " " + x[3] : "") +
        (x[4] ? " " + x[4] : "") +
        (x[5] ? " " + x[5] : "");
    let num = e.target.value.replace(/[^0-9]/g, "");
}

let sendPhone = document.getElementById("send_phone");
sendPhone.addEventListener("click", sendPhoneAjax);

function sendPhoneAjax(e) {
    let num = phone.value.replace(/[^0-9]/g, "");
    let ajax = new XMLHttpRequest();

    if (num.length <= 8) {
        alert("Telefonni raqamni tuliq kiriting ", phone.value.length);
    } else if (phone.value.length === 0) {
        alert("Telefonni raqamingizni kiriting ", phone.value.length);
    } else {
        ajax.onload = function() {
            if (ajax.status == 200 && ajax.readyState == 4) {
         
                if (ajax.response) {
                    sendPhone.disabled = true;
                    alert("Raqamingiz yuborildi");
                    phone.value = "";             
                } else {
                    alert("Raqamingizni yuboriwda xatolik yuz berdi ");                
                }
            }
        };
        ajax.open("post", "http://test/api/frilans_phone_save.php");
        ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        ajax.send("phone=" + encodeURIComponent(num));
    }
}

// accordion
let accordion_btn = document.querySelectorAll(".accordion");
for (let i = 0; i < accordion_btn.length; i++) {
    accordion_btn[i].addEventListener("click", accordionFunc);
}

function accordionFunc(e) {
    e.preventDefault();
    let nextElement = e.target.nextElementSibling;
    this.classList.add("accordion_active");
    let panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
        nextElement.style.maxHeight = null;
        this.classList.remove("accordion_active");
    } else {
        nextElement.style.maxHeight = nextElement.scrollHeight + "px";
    }
}

// tab
function tab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(
            " section_4_tab_active",
            ""
        );
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " section_4_tab_active";
}
// defaultOpen tab
document.getElementById("defaultOpen").click();

// slider
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {    
    showSlides((slideIndex += n));
}

function currentSlide(n) {    
    showSlides((slideIndex = n));
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" user_navigator_active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " user_navigator_active";
}

// gallery slider
let sectionGallery = document.querySelectorAll(".section_7_gallery ");
let gallerySlideIndex = 1;
gallerySlides(gallerySlideIndex);

function galleryPlusSlide(n) {
    if (n === -1) {
        sectionGallery.forEach((e) => {
            e.classList.remove("section_7_gallery_animation_to_left");
            e.classList.add("section_7_gallery_animation_to_right");
        });
    } else {
        sectionGallery.forEach((e) => {
            e.classList.remove("section_7_gallery_animation_to_right");
            e.classList.add("section_7_gallery_animation_to_left");
        });
    }
    gallerySlides((gallerySlideIndex += n));
}

function galleryCurrentSlide(n) {
    gallerySlides((gallerySlideIndex = n));
}

function gallerySlides(n) {
    let i;
    let slides = document.getElementsByClassName("gallery_slider");
    let dots = document.getElementsByClassName(
        "section_7_gallery_navigation_pagination_dot"
    );
    if (n > slides.length) {
        gallerySlideIndex = 1;
    }
    if (n < 1) {
        gallerySlideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(
            " section_7_gallery_active",
            ""
        );
    }
    slides[gallerySlideIndex - 1].style.display = "block";
    dots[gallerySlideIndex - 1].className += " section_7_gallery_active";
}

// burger menu
let menu = document.querySelector(".header_nav_item");
let openMenu = document.querySelector("#burger_menu_icon");
openMenu.addEventListener("click", openMenuFunc);
let closeMenu = document.querySelector("#close_menu");
closeMenu.addEventListener("click", closeMenuFunc);

function openMenuFunc(e) {
    e.target.style.display = "none";
    menu.style.width = "100%";
    closeMenu.style.display = "block";
}

function closeMenuFunc() {
    menu.style.width = "0";
    openMenu.style.display = "block";
    closeMenu.style.display = "none";
}

const makeNavLinksSmooth = () => {
    const navLinks = document.querySelectorAll(".header_nav_item_links_a");

    for (let n in navLinks) {
        if (navLinks.hasOwnProperty(n)) {
            navLinks[n].addEventListener("click", (e) => {
                e.preventDefault();
                document.querySelector(navLinks[n].hash).scrollIntoView({
                    behavior: "smooth",
                });
            });
        }
    }
};

const spyScrolling = () => {
    const sections = document.querySelectorAll(".section_scroll");
    let header = document.querySelector(".header_nav");
    window.onscroll = () => {
        if (document.documentElement.scrollTop > 100) {
            header.classList.add("pos_fixed");
        } else {
            header.classList.remove("pos_fixed");
        }
        const scrollPos =
            document.documentElement.scrollTop || document.body.scrollTop;

        for (let s in sections)
            if (sections.hasOwnProperty(s) && sections[s].offsetTop <= scrollPos) {
                const id = sections[s].id;            
                document.querySelector(".active_link").classList.remove("active_link");
                document
                    .querySelector("a[href*=" + id + "]")
                    .setAttribute("class", "active_link");
            }
    };
};

makeNavLinksSmooth();
spyScrolling();
