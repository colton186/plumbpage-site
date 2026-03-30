/* ═══════════════════════════════════════════
   PlumbPage Marketing Site — JavaScript
   ═══════════════════════════════════════════ */

// ── Navbar scroll effect ──
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Mobile nav toggle ──
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        const icon = navToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            const icon = navToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });
}

// ── Screenshot showcase tabs ──
const tabs = document.querySelectorAll('.showcase-tab');
const images = document.querySelectorAll('.showcase-image');
const caption = document.querySelector('.showcase-caption');

const captions = {
    dashboard: 'Real-time dashboard with job stats, alerts, and today\'s schedule at a glance.',
    jobs: 'Full job management with filtering, sorting, and status tracking.',
    calendar: 'Drag-and-drop calendar view for easy scheduling across your team.',
    customers: 'Customer cards with contact info, job history, and quick actions.',
    invoices: 'Create and track invoices and estimates with online payment support.',
    map: 'Live dispatch map showing job locations and technician positions.',
    technicians: 'Manage your crew with skills tracking, job assignments, and login access.',
    inventory: 'Track parts and materials with low-stock alerts and supplier info.',
    pricebook: 'Standardized pricing for consistent quoting across your team.',
    'job-requests': 'Customer portal submissions flow directly into your review queue.',
};

// Preload all showcase images immediately so tabs switch without flashing
images.forEach(img => { if (!img.complete) new Image().src = img.src; });

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.dataset.target;

        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        images.forEach(img => {
            img.classList.toggle('active', img.dataset.screen === target);
        });

        if (caption && captions[target]) {
            caption.textContent = captions[target];
        }
    });
});

// ── Scroll animations ──
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── Smooth scroll for anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
