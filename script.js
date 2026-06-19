// ========================================
// CERTIFICATE DATA
// ========================================
const CERTIFICATE_COVER_IMAGE = `data:image/svg+xml;utf8,
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
  <rect width="1200" height="800" fill="%2308141f"/>
  <g transform="translate(600 380)">
    <circle r="245" fill="none" stroke="%23ff6a2b" stroke-width="34"/>
    <circle r="190" fill="none" stroke="%23ff6a2b" stroke-width="16"/>
    <g fill="%23ff6a2b">
      <path d="M0-305l33 24 40-8 24 33 40 8 8 40 33 24-8 40 24 33-24 33 8 40-33 24-8 40-40 8-24 33-40-8-33 24-33-24-40 8-24-33-40-8-8-40-33-24 8-40-24-33 24-33-8-40 33-24 8-40 40-8 24-33 40 8 33-24z" opacity="0.95"/>
      <path d="M-505 38l250-48 117 84-250 48z"/>
      <path d="M505-38l-250 48-117 84 250-48z"/>
    </g>
    <g transform="rotate(-10)">
      <rect x="-420" y="-92" width="840" height="184" rx="8" fill="%23ff6a2b"/>
      <text x="0" y="38" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="140" font-weight="900" fill="%23000000">CERTIFIED</text>
    </g>
  </g>
</svg>`;
const RESUME_FILE = 'resume.pdf';

const certificates = [
    { id: 1, name: 'AWS Academy Graduate - Cloud Foundations', issuer: 'Amazon Web Services Training and Certification', imageUrl: 'AWS_CertifiedCloudPractitionercertificate_page-0001.jpg' }
];

// ========================================
// NAVIGATION
// ========================================
document.addEventListener('DOMContentLoaded', function () {
    syncCertificateCover();

    // Mobile menu toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function () {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Active link highlighting based on scroll position
    const sections = document.querySelectorAll('section[id]');
    function highlightNav() {
        const scrollY = window.pageYOffset;
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', highlightNav);

    // ========================================
    // TYPING ANIMATION
    // ========================================
    const typedTextElement = document.getElementById('typedText');
    if (typedTextElement) {
        const textArray = ['Frontend Web Developer', 'Creative Problem Solver', 'UI/UX Enthusiast'];
        let textIndex = 0, charIndex = 0, isDeleting = false, typingDelay = 100;

        function type() {
            const currentText = textArray[textIndex];
            if (isDeleting) {
                typedTextElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingDelay = 50;
            } else {
                typedTextElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingDelay = 100;
            }
            if (!isDeleting && charIndex === currentText.length) {
                typingDelay = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % textArray.length;
                typingDelay = 500;
            }
            setTimeout(type, typingDelay);
        }
        setTimeout(type, 1000);
    }

    // ========================================
    // SKILL PROGRESS BARS
    // ========================================
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    const progressObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = progress + '%';
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    skillProgressBars.forEach(bar => progressObserver.observe(bar));

    // ========================================
    // SCROLL TO TOP BUTTON
    // ========================================
    const scrollTopBtn = document.getElementById('scrollTop');
    if (scrollTopBtn) {
        window.addEventListener('scroll', function () {
            scrollTopBtn.classList.toggle('show', window.pageYOffset > 300);
        });
        scrollTopBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });

    // ========================================
    // CONTACT FORM SUBMISSION
    // ========================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            showToast('Thank you for your message! I will get back to you soon. 🎉');
            contactForm.reset();
        });
    }

    // ========================================
    // PARALLAX FOR BACKGROUND ORBS
    // ========================================
    const orbs = document.querySelectorAll('.orb');
    if (orbs.length > 0) {
        window.addEventListener('mousemove', debounce(function (e) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            orbs.forEach((orb, index) => {
                const speed = (index + 1) * 0.05;
                const xOffset = (x - 0.5) * 50 * speed;
                const yOffset = (y - 0.5) * 50 * speed;
                orb.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
            });
        }, 20));
    }
});

// ========================================
// CERTIFICATE MODAL
// ========================================
function openModal(index) {
    const modal = document.getElementById('certificateModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    if (modal && certificates[index]) {
        const cert = certificates[index];

        if (cert.pdfUrl) {
            window.open(cert.pdfUrl, '_blank', 'noopener');
            return;
        }

        modalTitle.textContent = cert.name;
        modalImage.src = cert.imageUrl;
        modalImage.alt = cert.name;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('certificateModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
});

// ========================================
// RESUME FUNCTIONS
// ========================================
function downloadResume() {
    const link = document.createElement('a');
    link.href = RESUME_FILE;
    link.download = RESUME_FILE;
    link.click();

    setTimeout(() => {
        if (document.visibilityState === 'visible') {
            showToast(`If the download did not start, add ${RESUME_FILE} to this folder first.`);
        }
    }, 800);
}

function viewResume() {
    const resumeWindow = window.open(RESUME_FILE, '_blank', 'noopener');

    setTimeout(() => {
        if (!resumeWindow || resumeWindow.closed) {
            showToast(`Add ${RESUME_FILE} to this folder to enable resume viewing.`);
        }
    }, 800);
}

// ========================================
// TOAST NOTIFICATION
// ========================================
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
}

// ========================================
// UTILITY
// ========================================
function debounce(func, wait = 10) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

function syncCertificateCover() {
    const certificateCoverImage = document.getElementById('certificateCoverImage');
    if (certificateCoverImage) {
        certificateCoverImage.src = CERTIFICATE_COVER_IMAGE;
        certificateCoverImage.alt = `${certificates[0].name} certificate cover`;
    }
}

// Console message
console.log('%c👋 Welcome to my portfolio!', 'color: #22d3ee; font-size: 20px; font-weight: bold;');
console.log('%cMithunathith M.R - Frontend Web Developer', 'color: #3b82f6; font-size: 14px;');
console.log('%cLooking to hire? Let\'s connect!', 'color: #9333ea; font-size: 14px;');
console.log('%c📧 mithun220305@gmail.com', 'color: #22d3ee; font-size: 12px;');

window.addEventListener('load', function () {
    console.log('Portfolio loaded successfully! ✅');
});
