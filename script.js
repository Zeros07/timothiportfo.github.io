// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    
// Language Switcher Functionality
const langToggle = document.getElementById('lang-toggle');
const langCard = document.querySelector('.lang-card');
let currentLang = localStorage.getItem('language') || 'id';

// Language data
const translations = {
    id: {
        // Navigation
        'nav-home': 'Beranda',
        'nav-about': 'Tentang',
        'nav-projects': 'Proyek',
        'nav-contact': 'Kontak',
        
        // Hero section
        'hero-greeting': 'Halo, Saya',
        'hero-tagline': 'Seorang <span class="highlight">Web Developer</span> yang bersemangat dalam menciptakan solusi digital inovatif',
        'hero-description': 'Saya membuat proyek-proyek yang memecahkan masalah nyata dan berinteraksi dengan dunia fisik melalui teknologi modern.',
        'hero-btn-projects': 'Lihat Proyek Saya',
        'hero-btn-github': 'GitHub Saya',
        
        // Sections
        'section-about': 'Tentang Saya',
        'section-projects': 'Proyek Unggulan',
        'section-contact': 'Mari Berkolaborasi',
        'contact-description': 'Tertarik untuk berkolaborasi atau memiliki proyek menarik? Mari kita diskusikan!'
    },
    en: {
        // Navigation
        'nav-home': 'Home',
        'nav-about': 'About',
        'nav-projects': 'Projects',
        'nav-contact': 'Contact',
        
        // Hero section
        'hero-greeting': 'Hello, I\'m',
        'hero-tagline': 'A passionate <span class="highlight">Web Developer</span> creating innovative digital solutions',
        'hero-description': 'I build projects that solve real-world problems and interact with the physical world through modern technology.',
        'hero-btn-projects': 'View My Projects',
        'hero-btn-github': 'My GitHub',
        
        // Sections
        'section-about': 'About Me',
        'section-projects': 'Featured Projects',
        'section-contact': 'Let\'s Collaborate',
        'contact-description': 'Interested in collaborating or have an exciting project? Let\'s discuss it!'
    }
};

// Apply saved language on load
if (currentLang === 'en') {
    langToggle.checked = true;
    applyLanguage('en');
} else {
    applyLanguage('id');
}

// Language toggle event listener
langToggle.addEventListener('change', function() {
    // Add pulse animation
    langCard.classList.add('pulse');
    setTimeout(() => langCard.classList.remove('pulse'), 400);
    
    if (this.checked) {
        currentLang = 'en';
        applyLanguage('en');
        localStorage.setItem('language', 'en');
    } else {
        currentLang = 'id';
        applyLanguage('id');
        localStorage.setItem('language', 'id');
    }
});

function applyLanguage(lang) {
    const elements = document.querySelectorAll('[data-en][data-id]:not(.button):not(.section-title):not(.project-detail-trigger)');
    
    elements.forEach(element => {
        element.classList.add('lang-transition', 'fade-out');
        
        setTimeout(() => {
            if (lang === 'en') {
                element.innerHTML = element.getAttribute('data-en');
            } else {
                element.innerHTML = element.getAttribute('data-id');
            }
            
            element.classList.remove('fade-out');
            element.classList.add('fade-in');
            
            setTimeout(() => {
                element.classList.remove('lang-transition', 'fade-in');
            }, 300);
        }, 150);
    });

    // Update button text specifically
    const buttons = document.querySelectorAll('.button[data-en][data-id], .project-detail-trigger[data-en][data-id]');
    buttons.forEach(button => {
        const span = button.querySelector('span');
        if (span) {
            if (lang === 'en') {
                span.textContent = button.getAttribute('data-en');
            } else {
                span.textContent = button.getAttribute('data-id');
            }
        }
    });

    // Update section titles specifically
    const sectionTitles = document.querySelectorAll('.section-title[data-en][data-id]');
    sectionTitles.forEach(title => {
        const span = title.querySelector('span');
        if (span) {
            if (lang === 'en') {
                span.textContent = title.getAttribute('data-en');
            } else {
                span.textContent = title.getAttribute('data-id');
            }
        }
    });
}

// Theme Switcher Functionality
const themeToggle = document.getElementById('theme-toggle');
const themeText = document.querySelector('.theme-text');
const body = document.body;

// Check for saved theme preference or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';

// Apply saved theme on load
if (savedTheme === 'light') {
    body.classList.add('light-theme');
    themeToggle.checked = true;
    themeText.textContent = 'Light Mode';
} else {
    themeText.textContent = 'Dark Mode';
}

// Theme toggle event listener
themeToggle.addEventListener('change', function() {
    if (this.checked) {
        body.classList.add('light-theme');
        themeText.textContent = 'Light Mode';
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light-theme');
        themeText.textContent = 'Dark Mode';
        localStorage.setItem('theme', 'dark');
    }
});

// Smooth scrolling untuk navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Animasi untuk elemen yang masuk viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .skill-item, .section-title').forEach(el => {
    observer.observe(el);
});

// Modal functionality
const modals = document.querySelectorAll('.modal');
const demoButtons = document.querySelectorAll('.demo-btn');
const closeButtons = document.querySelectorAll('.close');

demoButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const targetModal = document.querySelector(this.getAttribute('href'));
        if (targetModal) {
            targetModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });
});

closeButtons.forEach(button => {
    button.addEventListener('click', function() {
        this.closest('.modal').style.display = 'none';
        document.body.style.overflow = 'auto';
    });
});

window.addEventListener('click', function(e) {
    modals.forEach(modal => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// Project detail modal
const projectCards = document.querySelectorAll('.project-card');
const projectDetailModal = document.createElement('div');
projectDetailModal.id = 'project-detail-modal';
projectDetailModal.className = 'modal project-detail-modal';
projectDetailModal.innerHTML = `
    <div class="modal-content large-modal">
        <span class="close project-detail-close">&times;</span>
        <div class="project-detail-body"></div>
    </div>
`;
document.body.appendChild(projectDetailModal);

const projectDetailBody = projectDetailModal.querySelector('.project-detail-body');

function openProjectDetail(card) {
    const detail = card.cloneNode(true);
    detail.classList.add('animate-in');
    detail.removeAttribute('tabindex');
    detail.removeAttribute('role');
    projectDetailBody.innerHTML = '';
    projectDetailBody.appendChild(detail);
    projectDetailModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeProjectDetail() {
    projectDetailModal.style.display = 'none';
    projectDetailBody.innerHTML = '';
    document.body.style.overflow = 'auto';
}

projectCards.forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.addEventListener('click', function(e) {
        if (e.target.closest('a')) return;
        openProjectDetail(this);
    });
    card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openProjectDetail(this);
        }
    });
});

projectDetailModal.querySelector('.project-detail-close').addEventListener('click', closeProjectDetail);

projectDetailModal.addEventListener('click', function(e) {
    if (e.target === projectDetailModal) {
        closeProjectDetail();
        return;
    }

    const demoLink = e.target.closest('.demo-btn');
    if (demoLink) {
        e.preventDefault();
        closeProjectDetail();
        const targetModal = document.querySelector(demoLink.getAttribute('href'));
        if (targetModal) {
            targetModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && projectDetailModal.style.display === 'block') {
        closeProjectDetail();
    }
});

// Screenshot Walkthrough Navigation
let currentStep = 1;
const totalSteps = 4;

window.changeStep = function(direction) {
    const newStep = currentStep + direction;
    if (newStep >= 1 && newStep <= totalSteps) {
        // Hide current step
        document.querySelector(`.walkthrough-step[data-step="${currentStep}"]`).classList.remove('active');
        document.querySelector(`.indicator[data-step="${currentStep}"]`).classList.remove('active');
        
        // Show new step
        currentStep = newStep;
        document.querySelector(`.walkthrough-step[data-step="${currentStep}"]`).classList.add('active');
        document.querySelector(`.indicator[data-step="${currentStep}"]`).classList.add('active');
        
        // Update navigation buttons
        document.querySelector('.prev-btn').style.display = currentStep === 1 ? 'none' : 'flex';
        document.querySelector('.next-btn').style.display = currentStep === totalSteps ? 'none' : 'flex';
    }
};

// Initialize walkthrough
document.addEventListener('DOMContentLoaded', function() {
    const prevBtn = document.querySelector('.prev-btn');
    if (prevBtn) {
        prevBtn.style.display = 'none';
    }
});

// Click indicators to jump to step
document.querySelectorAll('.indicator').forEach(indicator => {
    indicator.addEventListener('click', function() {
        const targetStep = parseInt(this.dataset.step);
        const stepDiff = targetStep - currentStep;
        changeStep(stepDiff);
    });
});

}); // End of DOMContentLoaded
