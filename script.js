/**
 * PORTFOLIO INTERACTIVE LOGIC
 * Muhammad Ardan Al Farezi Arifin — IT Business Analyst & System Solutions Specialist
 */

document.addEventListener('DOMContentLoaded', () => {

  /* -------------------------------------------------------------------------- */
  /* 1. Project Tabs Switcher (Power Inspect, NewPST, PowerSwift ERS)
  /* -------------------------------------------------------------------------- */
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      // Remove active class from all buttons and contents
      tabButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      // Add active to selected
      btn.classList.add('active');
      const targetContent = document.getElementById(targetTab);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  /* -------------------------------------------------------------------------- */
  /* 2. Modal Diagram & PDF Document Viewer
  /* -------------------------------------------------------------------------- */
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const modalPdfFrame = document.getElementById('modalPdfFrame');
  const pdfActions = document.getElementById('pdfActions');
  const modalPdfDownloadBtn = document.getElementById('modalPdfDownloadBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalClose = document.getElementById('modalClose');

  const modalTriggers = document.querySelectorAll('.modal-trigger');
  const pdfTriggers = document.querySelectorAll('.pdf-modal-trigger');

  // Handle Image Triggers
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const imgSrc = trigger.getAttribute('data-img') || trigger.getAttribute('src');
      const title = trigger.getAttribute('alt') || 'Technical Artifact View';

      if (modalTitle) modalTitle.innerText = title;
      if (modalSubtitle) modalSubtitle.innerText = 'High-resolution vector architecture diagram view.';
      
      if (modalImg) {
        modalImg.src = imgSrc;
        modalImg.style.display = 'block';
      }
      if (modalPdfFrame) modalPdfFrame.style.display = 'none';
      if (pdfActions) pdfActions.style.display = 'none';

      if (modal) modal.classList.add('active');
    });
  });

  // Handle PDF Document Triggers
  pdfTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const pdfSrc = trigger.getAttribute('data-pdf');
      const title = trigger.getAttribute('data-title') || 'Wireframe Specification (PDF Document)';

      if (modalTitle) modalTitle.innerText = title;
      if (modalSubtitle) modalSubtitle.innerText = 'Interactive PDF Document & System Specification Viewer.';

      if (modalImg) modalImg.style.display = 'none';

      if (modalPdfFrame) {
        modalPdfFrame.src = pdfSrc;
        modalPdfFrame.style.display = 'block';
      }
      if (pdfActions) {
        pdfActions.style.display = 'flex';
        if (modalPdfDownloadBtn) modalPdfDownloadBtn.href = pdfSrc;
      }

      if (modal) modal.classList.add('active');
    });
  });

  const closeModal = () => {
    if (modal) modal.classList.remove('active');
    if (modalPdfFrame) modalPdfFrame.src = '';
  };

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  /* -------------------------------------------------------------------------- */
  /* 3. Navigation Scroll Active Link Tracking
  /* -------------------------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  /* -------------------------------------------------------------------------- */
  /* 4. Hero Number Stat Counter Animation
  /* -------------------------------------------------------------------------- */
  const statNumbers = document.querySelectorAll('.stat-number');

  const animateStats = () => {
    statNumbers.forEach(stat => {
      const targetText = stat.getAttribute('data-target');
      if (!targetText) return;
      const targetVal = parseInt(targetText, 10);
      let count = 0;
      const duration = 1500;
      const stepTime = Math.abs(Math.floor(duration / targetVal));

      const timer = setInterval(() => {
        count += 1;
        if (targetText.includes('%')) {
          stat.innerText = '0.00%';
        } else if (targetText.includes('+')) {
          stat.innerText = `${count}+`;
        } else {
          stat.innerText = count;
        }

        if (count >= targetVal) {
          clearInterval(timer);
          if (targetText === '11') stat.innerText = '11+';
          if (targetText === '105') stat.innerText = '105 VU';
          if (targetText === '100') stat.innerText = '0.00%';
        }
      }, Math.max(stepTime, 20));
    });
  };

  // Trigger stat animation on page load
  setTimeout(animateStats, 300);

  /* -------------------------------------------------------------------------- */
  /* 5. Prototyping Evolution 10-Second Auto-Play Carousel Slider
  /* -------------------------------------------------------------------------- */
  const evoTrack = document.getElementById('evoCarouselTrack');
  const evoSlides = document.querySelectorAll('#evoCarouselTrack .carousel-slide');
  const evoPrevBtn = document.getElementById('evoPrevBtn');
  const evoNextBtn = document.getElementById('evoNextBtn');
  const evoDots = document.querySelectorAll('#evoCarouselDots .carousel-dot');
  const evoTimerProgress = document.getElementById('evoTimerProgress');
  const evoWrapper = document.getElementById('evoCarouselWrapper');

  if (evoTrack && evoSlides.length > 0) {
    let currentSlide = 0;
    const totalSlides = evoSlides.length;
    const slideDuration = 10000; // 10 seconds auto advance
    let startTime = null;
    let animFrame = null;

    const updateSlidePosition = (slideIndex) => {
      currentSlide = (slideIndex + totalSlides) % totalSlides;
      evoTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

      evoSlides.forEach((s, idx) => {
        if (idx === currentSlide) {
          s.classList.add('active-slide');
        } else {
          s.classList.remove('active-slide');
        }
      });

      evoDots.forEach((d, idx) => {
        if (idx === currentSlide) {
          d.classList.add('active');
        } else {
          d.classList.remove('active');
        }
      });

      resetProgressTimer();
    };

    const resetProgressTimer = () => {
      if (animFrame) cancelAnimationFrame(animFrame);
      if (evoTimerProgress) evoTimerProgress.style.width = '0%';
      startTime = performance.now();
      animateTimer();
    };

    const animateTimer = (now = performance.now()) => {
      const elapsed = now - startTime;
      const progressPercent = Math.min((elapsed / slideDuration) * 100, 100);

      if (evoTimerProgress) evoTimerProgress.style.width = `${progressPercent}%`;

      if (elapsed >= slideDuration) {
        updateSlidePosition(currentSlide + 1);
      } else {
        animFrame = requestAnimationFrame(animateTimer);
      }
    };

    if (evoPrevBtn) {
      evoPrevBtn.addEventListener('click', () => updateSlidePosition(currentSlide - 1));
    }

    if (evoNextBtn) {
      evoNextBtn.addEventListener('click', () => updateSlidePosition(currentSlide + 1));
    }

    evoDots.forEach((dot, idx) => {
      dot.addEventListener('click', () => updateSlidePosition(idx));
    });

    if (evoWrapper) {
      evoWrapper.addEventListener('mouseenter', () => {
        if (animFrame) cancelAnimationFrame(animFrame);
      });
      evoWrapper.addEventListener('mouseleave', () => {
        const currentWidthPercent = parseFloat(evoTimerProgress.style.width || '0');
        startTime = performance.now() - (currentWidthPercent / 100) * slideDuration;
        animateTimer();
      });
    }

    // Initialize timer
    resetProgressTimer();
  }

});
