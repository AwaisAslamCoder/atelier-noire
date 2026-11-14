/* ATELIER NOIR — scroll-driven luxury menswear concept.
   Motion: GSAP ScrollTrigger + Lenis. Gracefully falls back to native scrolling. */
(() => {
  const loader = document.getElementById('loader');
  const header = document.getElementById('header');
  const progress = document.getElementById('scrollProgress');
  const toggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const closeMenu = () => {
    mobileMenu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  };
  toggle.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  document.querySelectorAll('.mobile-menu a').forEach(a => a.addEventListener('click', closeMenu));

  const updateScrollUI = () => {
    const y = window.scrollY;
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    header.classList.toggle('scrolled', y > 55);
    progress.style.width = `${Math.min(100, y / max * 100)}%`;
  };
  window.addEventListener('scroll', updateScrollUI, { passive: true });
  updateScrollUI();

  // Demo-only appointment form: never silently sends personal information.
  document.getElementById('fittingForm').addEventListener('submit', e => {
    e.preventDefault();
    document.getElementById('formNote').textContent = 'Thank you for your interest! This is a front-end demo. Connect a form service to receive real enquiries.';
  });

  const cursor = document.getElementById('cursor');
  if (!reducedMotion && window.matchMedia('(pointer:fine)').matches) {
    document.addEventListener('mousemove', event => {
      cursor.style.left = event.clientX + 'px';
      cursor.style.top = event.clientY + 'px';
    }, { passive: true });
  }

  if (reducedMotion || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    loader.style.display = 'none';
    document.documentElement.style.scrollBehavior = 'smooth';
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  // Smooth native-document scroll. Lenis and ScrollTrigger share the same animation ticker.
  let lenis;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({ duration: 1.2, smoothWheel: true, wheelMultiplier: 0.9, touchMultiplier: 1.1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(time => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      closeMenu();
      lenis.scrollTo(target, { offset: -65, duration: 1.35 });
    }));
  }

  // A short branded introduction.
  gsap.timeline({ onComplete: () => { loader.style.pointerEvents = 'none'; loader.remove(); ScrollTrigger.refresh(); } })
    .to(loader, { yPercent: -100, duration: 1.05, delay: 1.05, ease: 'power4.inOut' })
    .from('.hero-overline', { y: 22, autoAlpha: 0, duration: 0.8 }, '-=0.4')
    .from('.hero-title-row', { y: 100, autoAlpha: 0, stagger: 0.13, duration: 1.15, ease: 'power3.out' }, '-=0.65')
    .from('.hero-bottom', { y: 24, autoAlpha: 0, duration: 0.8 }, '-=0.45');

  // Hero image moves at a different rate than scroll: parallax / scrubbing.
  gsap.to('.hero-bg', { yPercent: 23, scale: 1.13, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.hero-content', { yPercent: 17, opacity: 0.3, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });

  // Reusable scroll-enter animations.
  gsap.utils.toArray('.reveal').forEach((element) => {
    gsap.from(element, {
      y: 42, opacity: 0, duration: 1.05, ease: 'power3.out',
      scrollTrigger: { trigger: element, start: 'top 90%', once: true }
    });
  });

  // Pinned, scrubbed 3-scene tailoring sequence. Desktop only; mobile retains a beautiful static section.
  ScrollTrigger.matchMedia({
    '(min-width: 761px)': () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.craft-pin', start: 'top top', end: '+=240%',
          scrub: 1.25, pin: true, anticipatePin: 1,
          onUpdate: self => {
            document.querySelector('.craft-progress span').style.width = `${self.progress * 100}%`;
            const active = Math.min(2, Math.floor(self.progress * 3));
            document.querySelectorAll('.craft-steps .step').forEach((step, i) => step.classList.toggle('active', i === active));
          }
        }
      });
      tl.to('.craft-img-1', { scale: 1, duration: 1, ease: 'none' }, 0)
        .to('.craft-img-2', { opacity: 1, scale: 1, duration: 1, ease: 'none' }, 1)
        .to('.craft-img-3', { opacity: 1, scale: 1, duration: 1, ease: 'none' }, 2)
        .to('.craft-copy', { y: -25, duration: 3, ease: 'none' }, 0);
      return () => tl.kill();
    },
    '(max-width: 760px)': () => {
      gsap.to('.craft-img-1', { scale: 1.02, ease: 'none', scrollTrigger: { trigger: '.craft-pin', start: 'top bottom', end: 'bottom top', scrub: true } });
    }
  });

  // Product depth and editorial photo motion.
  gsap.utils.toArray('.product-photo').forEach(photo => {
    gsap.fromTo(photo, { backgroundPosition: 'center 36%' }, {
      backgroundPosition: 'center 64%', ease: 'none',
      scrollTrigger: { trigger: photo, start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });
  gsap.fromTo('.manifesto-image', { backgroundPosition: 'center 10%' }, {
    backgroundPosition: 'center 60%', ease: 'none',
    scrollTrigger: { trigger: '.manifesto-visual', start: 'top bottom', end: 'bottom top', scrub: true }
  });
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
})();
