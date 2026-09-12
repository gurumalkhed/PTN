/* ==========================================
   PLAN YOUR TRIP IN NATURE
   script.js
   STABLE VERSION - NO AUTO SCROLL
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    /* ==========================================
       ELEMENTS
    ========================================== */

    const natureLoader = document.getElementById("natureLoader");
    const navbar = document.getElementById("navbar");
    const menuButton = document.getElementById("menuBtn");
    const menu = document.getElementById("menu");
    const menuIcon = menuButton?.querySelector("i");
    const backToTop = document.getElementById("backToTop");


    /* ==========================================
       NATURE JOURNEY LOADER
    ========================================== */

    if (natureLoader) {

        const message = document.getElementById("loaderMessage");
        const percent = document.getElementById("loaderPercent");

        const messages = [
            "Finding peaceful stays...",
            "Exploring beautiful places...",
            "Connecting with nature...",
            "Preparing your escape...",
            "Your journey is ready."
        ];

        let progress = 0;

        const progressTimer = setInterval(() => {

            progress += Math.floor(Math.random() * 8) + 3;

            if (progress >= 100) {
                progress = 100;
                clearInterval(progressTimer);
            }

            if (percent) {
                percent.textContent = `${progress}%`;
            }

            const index = Math.min(
                Math.floor(progress / 25),
                messages.length - 1
            );

            if (message) {
                message.textContent = messages[index];
            }

        }, 120);


        window.addEventListener("load", () => {

            setTimeout(() => {

                natureLoader.classList.add("hide");

            }, 3500);

        });

    }


    /* ==========================================
       MOBILE MENU
    ========================================== */

    const closeMenu = () => {

        menu?.classList.remove("active");

        menuIcon?.classList.remove("fa-times");
        menuIcon?.classList.add("fa-bars");

    };


    menuButton?.addEventListener("click", () => {

        const isOpen = menu?.classList.toggle("active");

        menuIcon?.classList.toggle("fa-bars", !isOpen);
        menuIcon?.classList.toggle("fa-times", Boolean(isOpen));

    });


    menu?.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", closeMenu);

    });


    /* ==========================================
       NAVBAR
       DOES NOT MOVE PAGE
    ========================================== */

    const updateNavbar = () => {

        if (!navbar) return;

        navbar.classList.toggle(
            "scrolled",
            window.scrollY > 80
        );

    };

    updateNavbar();

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );


    /* ==========================================
       HERO TYPING EFFECT
    ========================================== */

    const typing = document.getElementById("typing");

    if (typing) {

        const words = [
            "Nature Stays",
            "Coffee Estates",
            "Weekend Escapes",
            "Luxury Villas",
            "Homestays"
        ];

        let wordIndex = 0;
        let letterIndex = 0;
        let deleting = false;

        const type = () => {

            const word = words[wordIndex];

            typing.textContent =
                word.substring(0, letterIndex);


            if (!deleting && letterIndex < word.length) {

                letterIndex++;

            }

            else if (!deleting) {

                deleting = true;

                setTimeout(type, 1200);

                return;

            }

            else if (letterIndex > 0) {

                letterIndex--;

            }

            else {

                deleting = false;

                wordIndex =
                    (wordIndex + 1) % words.length;

            }


            setTimeout(
                type,
                deleting ? 60 : 120
            );

        };

        type();

    }


    /* ==========================================
       COUNTERS
    ========================================== */

    const counters =
        document.querySelectorAll(".counter");

    if ("IntersectionObserver" in window) {

        const counterObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) return;

                        const counter =
                            entry.target;

                        const target =
                            Number(counter.dataset.target);

                        let count = 0;

                        const increment =
                            target / 120;


                        const updateCounter = () => {

                            count += increment;

                            if (count < target) {

                                counter.textContent =
                                    String(Math.ceil(count));

                                requestAnimationFrame(
                                    updateCounter
                                );

                            }

                            else {

                                counter.textContent =
                                    `${target}+`;

                            }

                        };

                        updateCounter();

                        observer.unobserve(counter);

                    });

                },
                {
                    threshold: 0.5
                }
            );


        counters.forEach((counter) => {

            counterObserver.observe(counter);

        });

    }


    /* ==========================================
       TESTIMONIALS
    ========================================== */

    const testimonials =
        document.querySelectorAll(".testimonial");

    if (testimonials.length) {

        let testimonialIndex = 0;

        const showTestimonial = (index) => {

            testimonials.forEach(
                (item, itemIndex) => {

                    item.classList.toggle(
                        "active",
                        itemIndex === index
                    );

                }
            );

        };

        showTestimonial(testimonialIndex);

        setInterval(() => {

            testimonialIndex =
                (testimonialIndex + 1) %
                testimonials.length;

            showTestimonial(testimonialIndex);

        }, 5000);

    }


    /* ==========================================
       FAQ
    ========================================== */

    const faqItems =
        document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {

        const question =
            item.querySelector(".faq-question");

        question?.addEventListener(
            "click",
            () => {

                faqItems.forEach((faq) => {

                    if (faq !== item) {

                        faq.classList.remove("active");

                    }

                });

                item.classList.toggle("active");

            }
        );

    });


    /* ==========================================
       BACK TO TOP
       
       IMPORTANT:
       No automatic scrolling.
       Only moves when USER clicks the button.
    ========================================== */

    if (backToTop) {

        const updateBackToTop = () => {

            backToTop.style.display =
                window.scrollY > 400
                    ? "flex"
                    : "none";

        };

        updateBackToTop();

        window.addEventListener(
            "scroll",
            updateBackToTop,
            { passive: true }
        );


        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* ==========================================
       ACTIVE NAVIGATION
       
       Only detects position.
       DOES NOT CHANGE SCROLL POSITION.
    ========================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll("nav a");


    const updateActiveNavigation = () => {

        let currentId = "";

        sections.forEach((section) => {

            if (
                window.scrollY >=
                section.offsetTop - 120
            ) {

                currentId = section.id;

            }

        });


        navLinks.forEach((link) => {

            link.classList.toggle(
                "active",
                link.getAttribute("href") ===
                `#${currentId}`
            );

        });

    };


    updateActiveNavigation();

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );


    /* ==========================================
       SCROLL REVEAL
    ========================================== */

    const revealElements =
        document.querySelectorAll(
            ".fade-up, .fade-left, .fade-right, .zoom-in"
        );


    if (
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting)
                            return;

                        entry.target.classList.add(
                            "show"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.15
                }
            );


        revealElements.forEach((element) => {

            revealObserver.observe(element);

        });

    }


    /* ==========================================
       GALLERY LIGHTBOX
    ========================================== */

    document
        .querySelectorAll(".gallery-grid img")
        .forEach((image) => {

            image.addEventListener(
                "click",
                () => {

                    const overlay =
                        document.createElement("div");

                    const closeButton =
                        document.createElement("span");

                    const preview =
                        document.createElement("img");


                    overlay.className =
                        "lightbox";

                    closeButton.className =
                        "close-lightbox";

                    closeButton.textContent =
                        "×";


                    preview.src =
                        image.currentSrc ||
                        image.src;

                    preview.alt =
                        image.alt ||
                        "Gallery";


                    overlay.append(
                        closeButton,
                        preview
                    );

                    document.body.appendChild(
                        overlay
                    );


                    overlay.addEventListener(
                        "click",
                        () => overlay.remove()
                    );

                }
            );

        });


    /* ==========================================
       CONTACT FORM
    ========================================== */

    const contactForm =
        document.querySelector(
            ".contact-form form"
        );


    contactForm?.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            if (!contactForm.checkValidity()) {

                contactForm.reportValidity();

                return;

            }


            const endpoint =
                contactForm.action;


            if (!endpoint) {

                alert(
                    "Contact form endpoint is not configured."
                );

                return;

            }


            const submitButton =
                contactForm.querySelector(
                    'button[type="submit"]'
                );


            const originalText =
                submitButton?.textContent;


            if (submitButton) {

                submitButton.disabled = true;

                submitButton.textContent =
                    "Sending...";

            }


            try {

                const response =
                    await fetch(
                        endpoint,
                        {
                            method: "POST",
                            body:
                                new FormData(
                                    contactForm
                                ),
                            headers: {
                                Accept:
                                    "application/json"
                            }
                        }
                    );


                const result =
                    await response.json();


                if (
                    response.ok &&
                    result.success
                ) {

                    alert(
                        "Success! Your message has been sent."
                    );

                    contactForm.reset();

                }

                else {

                    alert(
                        result.message ||
                        "Please try again."
                    );

                }

            }

            catch (error) {

                console.error(error);

                alert(
                    "Something went wrong. Please try again."
                );

            }

            finally {

                if (submitButton) {

                    submitButton.disabled = false;

                    submitButton.textContent =
                        originalText ||
                        "Send Message";

                }

            }

        }
    );


    /* ==========================================
       NEWSLETTER
    ========================================== */

    const newsletter =
        document.querySelector(
            ".newsletter form"
        );


    newsletter?.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            const email =
                newsletter
                    .querySelector("input")
                    ?.value
                    .trim();


            if (!email) {

                alert(
                    "Please enter your email."
                );

                return;

            }


            alert(
                "Successfully subscribed!"
            );

            newsletter.reset();

        }
    );


    /* ==========================================
       SEARCH
    ========================================== */

    const searchButton =
        document.querySelector(".search-btn");


    searchButton?.addEventListener(
        "click",
        () => {

            const destination =
                document
                    .querySelector(
                        ".search-item select"
                    )
                    ?.value;


            alert(
                `Searching available stays in ${destination}...`
            );

        }
    );


    /* ==========================================
       CURRENT YEAR
    ========================================== */

    const year =
        document.getElementById("year");


    if (year) {

        year.textContent =
            String(new Date().getFullYear());

    }


    /* ==========================================
       CONSOLE
    ========================================== */

    console.log(
        "%c🌿 Plan Your Trip In Nature",
        "color:#2d6a4f;font-size:18px;font-weight:bold;"
    );

    console.log(
        "%cWebsite Developed Successfully",
        "color:#40916c;font-size:14px;"
    );

});