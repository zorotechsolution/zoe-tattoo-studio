/* ============================================
   ZOE Tattoo Removal Studio — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Navbar Scroll Effect ---------- */
  const navbar = document.querySelector('.navbar-zoe');
  if (navbar) {
    function onScroll() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', onScroll);
    onScroll(); // run on load
  }

  /* ---------- Active Nav Link ---------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-zoe .nav-link');
  navLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  /* ---------- Close mobile navbar on link click ---------- */
  const navbarCollapse = document.querySelector('.navbar-collapse');
  const navLinkItems = document.querySelectorAll('.navbar-zoe .nav-link');
  navLinkItems.forEach(function (link) {
    link.addEventListener('click', function () {
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });

  /* ---------- FAQ Accordion ---------- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', function () {
        const isActive = item.classList.contains('active');

        // Close all others
        faqItems.forEach(function (otherItem) {
          otherItem.classList.remove('active');
        });

        // Toggle current
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

/* ---------- Contact Form Handler ---------- */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const phone = document.getElementById('contactPhone').value;
    const tattooType = document.getElementById('contactTattooType').value;
    const userMessage = document.getElementById('contactMessage').value;

    const whatsappMessage = `Hello ZOE Studio,

I would like a FREE consultation.

👤 Name: ${name}
📧 Email: ${email}
📞 Phone: ${phone}
🎨 Tattoo Type: ${tattooType}

📝 Message:
${userMessage}`;

    const whatsappNumber = "916383564665";

    const whatsappURL =
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    // Open WhatsApp
    window.open(whatsappURL, '_blank');

    // Show Success Message
    const formContent = contactForm.querySelector('.form-content');
    const successMsg = contactForm.querySelector('.form-success');

    if (formContent && successMsg) {
      formContent.style.display = 'none';
      successMsg.style.display = 'block';

      setTimeout(() => {
        contactForm.reset();
        formContent.style.display = 'block';
        successMsg.style.display = 'none';
      }, 4000);
    }
  });
}

  /* ---------- Scroll-triggered Fade In ---------- */
  const fadeElements = document.querySelectorAll('.fade-in-up');
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  fadeElements.forEach(function (el) {
    observer.observe(el);
  });

  /* ---------- Services Custom Dropdown ---------- */
  const dropdownHeader = document.getElementById('servicesDropdownHeader');
  const dropdownList = document.getElementById('servicesDropdownList');
  const dropdownValue = document.getElementById('servicesDropdownValue');
  const dropdownArrow = document.getElementById('servicesDropdownArrow');
  const hiddenServiceInput = document.getElementById('bookService');
  const dropdownOptions = document.querySelectorAll('.services-dropdown-option');

  if (dropdownHeader && dropdownList) {
    // Toggle dropdown
    dropdownHeader.addEventListener('click', function () {
      const isOpen = dropdownList.classList.contains('open');
      if (isOpen) {
        dropdownList.classList.remove('open');
        dropdownHeader.classList.remove('open');
      } else {
        dropdownList.classList.add('open');
        dropdownHeader.classList.add('open');
      }
    });

    // Select option
    dropdownOptions.forEach(function (option) {
      option.addEventListener('click', function () {
        // Remove selected from all
        dropdownOptions.forEach(function (opt) {
          opt.classList.remove('selected');
        });
        // Mark as selected
        option.classList.add('selected');
        // Update display
        const value = option.getAttribute('data-value');
        const label = option.querySelector('span').textContent;
        dropdownValue.textContent = label;
        dropdownValue.classList.add('selected');
        // Update hidden input
        if (hiddenServiceInput) {
          hiddenServiceInput.value = value;
        }
        // Close dropdown
        dropdownList.classList.remove('open');
        dropdownHeader.classList.remove('open');
      });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function (e) {
      const dropdown = document.getElementById('servicesDropdown');
      if (dropdown && !dropdown.contains(e.target)) {
        dropdownList.classList.remove('open');
        dropdownHeader.classList.remove('open');
      }
    });
  }

/* ---------- Booking Form Handler ---------- */
const bookingForm = document.getElementById('bookingForm');

if (bookingForm) {
  const bookDate = document.getElementById('bookDate');

  if (bookDate) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    bookDate.setAttribute('min', `${yyyy}-${mm}-${dd}`);
  }

  bookingForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Validate service selection
    if (hiddenServiceInput && !hiddenServiceInput.value) {
      dropdownHeader.style.borderColor = '#EF4444';
      dropdownHeader.style.animation = 'shake 0.4s ease';

      setTimeout(() => {
        dropdownHeader.style.borderColor = '';
        dropdownHeader.style.animation = '';
      }, 600);

      return;
    }

    // Get form values
    const name = document.getElementById('bookName').value;
    const phone = document.getElementById('bookPhone').value;
    const date = document.getElementById('bookDate').value;
    const time = document.getElementById('bookTime').value;
    const service = dropdownValue.textContent;

    // WhatsApp Message
    const message = `Hello ZOE Studio,

I would like to book an appointment.

👤 Name: ${name}
📞 Phone: ${phone}
📅 Date: ${date}
⏰ Time: ${time}
🎨 Service: ${service}

Please confirm my appointment.`;

    // CHANGE THIS NUMBER
    const whatsappNumber = "916383564665";

    const whatsappURL =
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp
    window.open(whatsappURL, '_blank');

    // Success Message
    const formFields = bookingForm.querySelectorAll('.row, .mb-4, .btn-book-tattoo');
    const successMsg = document.getElementById('bookingSuccess');

    formFields.forEach(field => {
      field.style.display = 'none';
    });

    if (successMsg) {
      successMsg.style.display = 'block';
    }

    setTimeout(() => {
      bookingForm.reset();

      formFields.forEach(field => {
        field.style.display = '';
      });

      if (successMsg) {
        successMsg.style.display = 'none';
      }

      if (dropdownValue) {
        dropdownValue.textContent = 'Select a service';
        dropdownValue.classList.remove('selected');
      }

      if (hiddenServiceInput) {
        hiddenServiceInput.value = '';
      }

      dropdownOptions.forEach(opt => {
        opt.classList.remove('selected');
      });

    }, 4000);
  });
}

  /* ---------- Hero Parallax Effect ---------- */
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', function () {
      const scrollY = window.scrollY;
      heroBg.style.transform = 'translateY(' + (scrollY * 0.3) + 'px)';
    });
  }

  /* ---------- Hero Fade on Scroll ---------- */
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    window.addEventListener('scroll', function () {
      const scrollY = window.scrollY;
      const heroHeight = document.querySelector('.hero-section')
        ? document.querySelector('.hero-section').offsetHeight
        : 800;
      const opacity = 1 - (scrollY / (heroHeight * 0.6));
      heroContent.style.opacity = Math.max(0, opacity);
    });
  }

  /* ---------- Counter Animation ---------- */
  function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    counters.forEach(function (counter) {
      const target = parseInt(counter.getAttribute('data-count'), 10);
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 2000;
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out quad
        const eased = 1 - (1 - progress) * (1 - progress);
        const current = Math.floor(eased * target);
        counter.textContent = current + suffix;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.textContent = target + suffix;
        }
      }

      requestAnimationFrame(update);
    });
  }

  // Trigger counters when hero stats come into view
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) {
    const statsObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounters();
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    statsObserver.observe(heroStats);
  }

});