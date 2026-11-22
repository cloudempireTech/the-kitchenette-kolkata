// THE KITCHENETTE — JAVASCRIPT CONTROLLER
document.addEventListener('DOMContentLoaded', () => {
  // 1. MANDATORY GLIDE ANIMATION INTERSECTION OBSERVER
  const glideElements = document.querySelectorAll('.glide-in');
  if ('IntersectionObserver' in window) {
    const glideObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    glideElements.forEach((el, index) => {
      if (!el.style.transitionDelay) {
        el.style.transitionDelay = `${(index % 4) * 0.1}s`;
      }
      glideObserver.observe(el);
    });
  } else {
    glideElements.forEach(el => el.classList.add('in-view'));
  }

  // 2. DYNAMIC TYPEWRITER HEADLINE
  const typewriterEl = document.querySelector('.dynamic-typewriter');
  if (typewriterEl) {
    const phrases = [
      "Kolkata's Premier Hands-On Culinary Studio in Alipore.",
      "Handmade Artisanal Pasta & Sourdough Masterclasses.",
      "Private Chef's Table Dinners & Intimate Feasts.",
      "Corporate Team Cooking & Celebratory Studio Parties."
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 55;

    function type() {
      const currentPhrase = phrases[phraseIndex];
      if (isDeleting) {
        typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 30;
      } else {
        typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 65;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 400;
      }

      setTimeout(type, typeSpeed);
    }
    setTimeout(type, 800);
  }

  // 3. ANIMATED TELEMETRY NUMBER COUNTERS
  const counters = document.querySelectorAll('.stat-counter');
  if (counters.length > 0 && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.getAttribute('data-target') || '0');
          const prefix = el.getAttribute('data-prefix') || '';
          const suffix = el.getAttribute('data-suffix') || '';
          const isFloat = target % 1 !== 0;
          let current = 0;
          const duration = 1800;
          const steps = 40;
          const increment = target / steps;
          const stepTime = duration / steps;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            el.textContent = prefix + (isFloat ? current.toFixed(1) : Math.floor(current).toLocaleString()) + suffix;
          }, stepTime);

          observer.unobserve(el);
        }
      });
    }, { threshold: 0.2 });

    counters.forEach(c => counterObserver.observe(c));
  }

  // 4. VIDEO PAUSE / PLAY TOGGLE BUTTON
  const videoBtn = document.querySelector('.video-control-btn');
  const videoEl = document.querySelector('.hero-video-bg');
  if (videoBtn && videoEl) {
    videoBtn.addEventListener('click', () => {
      if (videoEl.paused) {
        videoEl.play();
        videoBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
        videoBtn.setAttribute('aria-label', 'Pause Hero Video');
      } else {
        videoEl.pause();
        videoBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
        videoBtn.setAttribute('aria-label', 'Play Hero Video');
      }
    });
  }

  // 5. MOBILE HAMBURGER DRAWER TOGGLE
  const hamburger = document.querySelector('.hamburger-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      hamburger.innerHTML = isOpen
        ? `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>`
        : `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 12h18M3 6h18M3 18h18"/></svg>`;
    });

    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 12h18M3 6h18M3 18h18"/></svg>`;
      });
    });
  }

  // 6. GALLERY CATEGORY FILTER RAIL
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter') || 'all';

        galleryItems.forEach(item => {
          const category = item.getAttribute('data-category') || '';
          if (filter === 'all' || category === filter) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // 7. INTERACTIVE CLASS & PRIVATE EVENT PLANNER WIDGET
  const expOptions = document.querySelectorAll('.exp-option');
  const cuisineRadios = document.querySelectorAll('.cuisine-radio-label input[type="radio"]');
  const groupSelect = document.getElementById('planner-group-size');
  const summaryExpEl = document.getElementById('summary-exp-type');
  const summaryCuisineEl = document.getElementById('summary-cuisine');
  const summaryGroupEl = document.getElementById('summary-group-size');
  const btnPlannerWa = document.getElementById('btn-planner-wa');

  if (expOptions.length > 0 && btnPlannerWa) {
    let selectedExp = "Hands-On Masterclass";
    let selectedCuisine = "Artisanal Fresh Pasta & Gnocchi";
    let selectedGroup = "4-6 Guests (Semi-Private)";

    expOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        expOptions.forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        selectedExp = opt.getAttribute('data-exp') || selectedExp;
        if (summaryExpEl) summaryExpEl.textContent = selectedExp;
        updatePlannerWaLink();
      });
    });

    cuisineRadios.forEach(r => {
      r.addEventListener('change', () => {
        if (r.checked) {
          selectedCuisine = r.value;
          if (summaryCuisineEl) summaryCuisineEl.textContent = selectedCuisine;
          updatePlannerWaLink();
        }
      });
    });

    if (groupSelect) {
      groupSelect.addEventListener('change', () => {
        selectedGroup = groupSelect.value;
        if (summaryGroupEl) summaryGroupEl.textContent = selectedGroup;
        updatePlannerWaLink();
      });
    }

    function updatePlannerWaLink() {
      const text = `Namaste The Kitchenette! I'd like to enquire about booking a culinary experience from your website:
• Experience: ${selectedExp}
• Cuisine Workshop: ${selectedCuisine}
• Group Size: ${selectedGroup}
• Location: 24B Raja Santosh Road, Alipore, Kolkata
Please share upcoming date availability and booking details. Thank you!`;
      btnPlannerWa.href = `https://wa.me/919748054675?text=${encodeURIComponent(text)}`;
    }
  }

  // 8. GENERAL BOOKING CONTACT FORM WHATSAPP HANDOFF
  const bookingForm = document.getElementById('kitchenette-contact-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (document.getElementById('form-name')?.value || '').trim();
      const eventType = (document.getElementById('form-type')?.value || 'Cooking Class').trim();
      const guests = (document.getElementById('form-guests')?.value || '4-8').trim();
      const date = (document.getElementById('form-date')?.value || 'Upcoming').trim();
      const notes = (document.getElementById('form-notes')?.value || '').trim();

      const text = `Namaste The Kitchenette!
I'm reaching out from your website to enquire about studio booking:
• Name: ${name}
• Experience Type: ${eventType}
• Guest Count: ${guests}
• Preferred Date: ${date}
• Notes / Dietary Needs: ${notes}

Looking forward to hearing from your Alipore studio team!`;

      const waUrl = `https://wa.me/919748054675?text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank');
    });
  }
});
