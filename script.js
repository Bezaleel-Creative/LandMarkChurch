document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link-mobile');

    // Toggle mobile menu
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
        });
    }

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('open')) {
                mobileMenu.classList.remove('open');
            }
        });
    });

    // Optional: Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                 const headerOffset = document.querySelector('.header').offsetHeight;
                 const elementPosition = targetElement.getBoundingClientRect().top;
                 const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

        // ---=== Contact Form Validation ===---
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    if (contactForm && nameInput && emailInput && messageInput) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateForm()) {
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
                clearErrors();
            }
        });
    }

    function validateForm() {
        let isValid = true;
        clearErrors();

        // Validate Name
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Full Name is required.');
            isValid = false;
        }

        // Validate Email
        const emailValue = emailInput.value.trim();
        if (emailValue === '') {
            showError(emailInput, 'Email is required.');
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(emailValue)) {
            showError(emailInput, 'Email address is invalid.');
            isValid = false;
        }

        // Validate Message
        if (messageInput.value.trim() === '') {
            showError(messageInput, 'Message is required.');
            isValid = false;
        }

        return isValid;
    }

    function showError(input, message) {
        input.classList.add('error');
        const errorElement = document.getElementById(`${input.id}-error`);
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    function clearErrors() {
        [nameInput, emailInput, messageInput].forEach(input => {
            input.classList.remove('error');
            const errorElement = document.getElementById(`${input.id}-error`);
            if (errorElement) {
                errorElement.textContent = '';
            }
        });
    }

        // ---=== Giving Modal Functionality ===---
    const giveButton = document.getElementById('give-btn');
    const modal = document.getElementById('giving-modal');
    const closeModalButton = document.getElementById('close-modal-btn');

    const openModal = () => modal.classList.add('show');
    const closeModal = () => modal.classList.remove('show');

    if (giveButton && modal && closeModalButton) {
        giveButton.addEventListener('click', openModal);
        closeModalButton.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

});






const progressCircle = document.querySelector(".autoplay-progress svg");
    const progressContent = document.querySelector(".autoplay-progress span");

    const swiperEl = document.querySelector("swiper-container");
    swiperEl.addEventListener("autoplaytimeleft", (e) => {
      const [swiper, time, progress] = e.detail;
      progressCircle.style.setProperty("--progress", 1 - progress);
      progressContent.textContent = `${Math.ceil(time / 1000)}s`;
    });
    
window.onload = function() {
  const sections = document.querySelectorAll("section");
  const navA = document.querySelectorAll(".nav-link");

  function updateActiveSection() {
    let maxVisibleArea = 0;
    let activeSection = null;

    sections.forEach((section) => {
      const visibleArea = getVisibleArea(section);
      if (visibleArea > maxVisibleArea) {
        maxVisibleArea = visibleArea;
        activeSection = section.getAttribute("id");
      }
    });

    navA.forEach((a) => {
      a.classList.remove("active");
      const href = a.getAttribute("href").replace("#", "");
      if (href === activeSection) {
        a.classList.add("active");
      }
    });
  }

  function getVisibleArea(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
    const visibleWidth = Math.min(rect.right, windowWidth) - Math.max(rect.left, 0);
    return Math.max(0, visibleHeight) * Math.max(0, visibleWidth);
  }

  window.addEventListener("scroll", updateActiveSection);
  window.addEventListener("resize", updateActiveSection);
  updateActiveSection(); // Run once on load
};
