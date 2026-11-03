/* =========================================================
   WAN AHMAD PORTFOLIO — JAVASCRIPT
   10 interactive features
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  // 1. MOBILE NAVIGATION
  const menuToggle = $("#menuToggle");
  const navLinks = $("#navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );
    });

    $$(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
      });
    });
  }

  // 2. ACTIVE NAVIGATION WHILE SCROLLING
  const sections = $$("main section[id]");
  const navItems = $$(".nav-link");

  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navItems.forEach(link => {
            const active =
              link.getAttribute("href") === '#${entry.target.id}';

            link.classList.toggle("active", active);

            if (active) {
              link.setAttribute("aria-current", "location");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        }
      });
    }, {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0
    });

    sections.forEach(section => sectionObserver.observe(section));
  }

  // 3. PROJECT CATEGORY FILTERING
  const filterButtons = $$(".filter-button");
  const projectCards = $$(".project-card");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach(item => {
        const selected = item === button;

        item.classList.toggle("active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });

      projectCards.forEach(card => {
        card.hidden =
          filter !== "all" && card.dataset.category !== filter;
      });
    });
  });

  // 4. DARK AND LIGHT THEME
  const themeToggle = $("#themeToggle");

  if (themeToggle) {
    const savedTheme = localStorage.getItem("wanPortfolioTheme");

    if (savedTheme === "light") {
      document.body.classList.add("light-theme");
    }

    const updateThemeButton = () => {
      const light = document.body.classList.contains("light-theme");

      themeToggle.setAttribute(
        "aria-label",
        light ? "Switch to dark theme" : "Switch to light theme"
      );

      const themeIcon = $(".theme-icon", themeToggle);

      if (themeIcon) {
        themeIcon.textContent = light ? "☾" : "☼";
      }
    };

    updateThemeButton();

    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-theme");

      localStorage.setItem(
        "wanPortfolioTheme",
        document.body.classList.contains("light-theme") ? "light" : "dark"
      );

      updateThemeButton();
    });
  }

  // 5. SCROLL REVEAL ANIMATION
  const revealItems = $$(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12
    });

    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }

  // 6. BACK TO TOP BUTTON
  const backToTop = $("#backToTop");

  if (backToTop) {
    const updateBackToTop = () => {
      backToTop.classList.toggle("visible", window.scrollY > 500);
    };

    window.addEventListener("scroll", updateBackToTop, {
      passive: true
    });

    updateBackToTop();

    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // 7. TYPING ANIMATION
  const typingTarget = $("#typingText");

  if (typingTarget) {
    const phrases = [
      "Aspiring Network Engineer",
      "Computer Networking",
      "Always learning technology"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!reducedMotion) {
      const typeNext = () => {
        const phrase = phrases[phraseIndex];

        charIndex += deleting ? -1 : 1;
        typingTarget.textContent = phrase.slice(0, charIndex);

        let delay = deleting ? 42 : 78;

        if (!deleting && charIndex === phrase.length) {
          deleting = true;
          delay = 1400;
        } else if (deleting && charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          delay = 350;
        }

        window.setTimeout(typeNext, delay);
      };

      window.setTimeout(typeNext, 900);
    }
  }

  // 8. PROJECT DETAILS MODAL
  const projectInfo = {
    topology: {
      category: "NETWORKING / PROJECT 01",
      title: "Network Topology Design",
      description:
        "A learning project about representing how devices connect in a network. The focus is on understanding network components, choosing a basic topology and describing how data can move between connected devices.",
      learning:
        "Recognising network devices and links, comparing basic topology layouts, and communicating a network design clearly."
    },

    security: {
      category: "SECURITY / PROJECT 02",
      title: "Network Security Study",
      description:
        "A study of foundational network security ideas, common risks to connected systems and practical habits that help improve security awareness.",
      learning:
        "Identifying common risks, understanding why access control and updates matter, and explaining safer practices."
    },

    portfolio: {
      category: "WEB DEVELOPMENT / PROJECT 03",
      title: "Personal Portfolio Website",
      description:
        "A personal website developed with HTML, CSS and JavaScript. It presents my education, interests and learning projects in a responsive layout.",
      learning:
        "Using semantic HTML, responsive CSS, DOM events, accessible controls and JavaScript interactions."
    },

    subnetting: {
      category: "NETWORKING / ADDITIONAL PROJECT 04",
      title: "IP Addressing & Subnetting",
      description:
        "A learning exercise covering IPv4 address structure and subnetting concepts. Personalise this entry with the exact exercises or network scenarios you completed.",
      learning:
        "Practising network and host identification, subnet masks, address ranges and the purpose of dividing a network into subnets."
    },

    vlan: {
      category: "NETWORKING / ADDITIONAL PROJECT 05",
      title: "VLAN Configuration",
      description:
        "A learning exercise exploring Virtual LAN concepts and logical network segmentation. Add your actual configuration steps, topology or lab evidence if you completed a practical exercise.",
      learning:
        "Understanding VLAN purpose, separating broadcast domains conceptually and learning how switch ports are associated with VLANs."
    }
  };

  const modal = $("#projectModal");
  const modalClose = $("#modalClose");

  if (modal && modalClose) {
    let lastFocusedElement = null;

    const closeModal = () => {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";

      if (lastFocusedElement) {
        lastFocusedElement.focus();
      }
    };

    $$(".project-more").forEach(button => {
      button.addEventListener("click", () => {
        const info = projectInfo[button.dataset.project];

        if (!info) return;

        lastFocusedElement = button;

        const category = $("#modalCategory");
        const title = $("#modalTitle");
        const description = $("#modalDescription");
        const learning = $("#modalLearning");

        if (category) category.textContent = info.category;
        if (title) title.textContent = info.title;
        if (description) description.textContent = info.description;
        if (learning) learning.textContent = info.learning;

        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        modalClose.focus();
      });
    });

    modalClose.addEventListener("click", closeModal);

    $$("[data-close-modal]", modal).forEach(item => {
      item.addEventListener("click", closeModal);
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && modal.classList.contains("open")) {
        closeModal();
      }

      // Keep keyboard focus inside the open dialog
      if (event.key === "Tab" && modal.classList.contains("open")) {
        const focusable = $$(
          "button, a[href], input, textarea, [tabindex]:not([tabindex='-1'])",
          modal
        ).filter(element => !element.disabled);

        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });
  }

  // 9. CONTACT FORM VALIDATION AND EMAIL DRAFT
  const contactForm = $("#contactForm");
  const formStatus = $("#formStatus");

  if (contactForm) {
    const fields = {
      name: $("#contactName"),
      email: $("#contactEmail"),
      message: $("#contactMessage")
    };

    const errors = {
      name: $("#nameError"),
      email: $("#emailError"),
      message: $("#messageError")
    };

    const setError = (field, message) => {
      if (!fields[field] || !errors[field]) return;

      errors[field].textContent = message;

      fields[field].classList.toggle(
        "input-invalid",
        Boolean(message)
      );

      fields[field].setAttribute(
        "aria-invalid",
        String(Boolean(message))
      );
    };

    Object.entries(fields).forEach(([key, field]) => {
      if (field) {
        field.addEventListener("input", () => {
          setError(key, "");
        });
      }
    });

    contactForm.addEventListener("submit", event => {
      event.preventDefault();

      if (formStatus) formStatus.textContent = "";

      const name = fields.name?.value.trim() || "";
      const email = fields.email?.value.trim() || "";
      const message = fields.message?.value.trim() || "";

      let valid = true;

      if (name.length < 2) {
        setError("name", "Please enter at least 2 characters.");
        valid = false;
      } else {
        setError("name", "");
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(email)) {
        setError("email", "Please enter a valid email address.");
        valid = false;
      } else {
        setError("email", "");
      }

      if (message.length < 10) {
        setError("message", "Please enter a message of at least 10 characters.");
        valid = false;
      } else {
        setError("message", "");
      }

      if (!valid) {
        if (formStatus) {
          formStatus.textContent =
            "Please correct the highlighted fields.";
        }

        const firstInvalid = $(".input-invalid", contactForm);

        if (firstInvalid) {
          firstInvalid.focus();
        }

        return;
      }

      const subject = encodeURIComponent(
        'Portfolio enquiry from ${name}'
      );

      const body = encodeURIComponent(
        'Name: ${name}\nReply email: ${email}\n\n${message}'
      );

      if (formStatus) {
        formStatus.textContent =
          "Your email application should open with the message prepared.";
      }

      window.location.href =
        'mailto:wanahmadsirajuddin78@gmail.com?subject=${subject}&body=${body}';
    });
  }

  // 10. DYNAMIC COPYRIGHT YEAR
  const currentYear = $("#currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

});