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
  /* 2. Modal Diagram Viewer for Technical Artifacts
  /* -------------------------------------------------------------------------- */
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const modalClose = document.getElementById('modalClose');
  const modalTriggers = document.querySelectorAll('.modal-trigger');

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const imgSrc = trigger.getAttribute('data-img') || trigger.getAttribute('src');
      const altText = trigger.getAttribute('alt') || 'Technical Diagram';
      modalImg.src = imgSrc;
      modal.classList.add('active');
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      modal.classList.remove('active');
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
  let animated = false;

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

});
