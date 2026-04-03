// app.js — Lokrakshak Real Property Center

const defaultProperties = [
    {
        id: 1,
        title: "Prime NA Plot – Vijalpore",
        type: "Land",
        price: "₹ 45,00,000",
        description: "Excellent non-agricultural plot ready for residential development. Close to main road with all utilities nearby.",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        title: "Luxury 3BHK Bungalow",
        type: "Residential",
        price: "₹ 1,20,00,000",
        description: "Spacious family home in a premium Navsari society. Features modern amenities, covered parking, and 24/7 security.",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        title: "Commercial Shop – Main Market",
        type: "Commercial",
        price: "₹ 38,00,000",
        description: "Ground-floor shop in a high-footfall location near Navsari city centre. Ideal for retail or office use.",
        image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80"
    }
];

function initDB() {
    if (!localStorage.getItem('propertiesData')) {
        localStorage.setItem('propertiesData', JSON.stringify(defaultProperties));
    }
}

function getProperties() {
    initDB();
    return JSON.parse(localStorage.getItem('propertiesData'));
}

function addProperty(property) {
    const properties = getProperties();
    property.id = Date.now();
    properties.push(property);
    localStorage.setItem('propertiesData', JSON.stringify(properties));
}

function updateProperty(id, updatedData) {
    let properties = getProperties();
    properties = properties.map(p => p.id === id ? { ...p, ...updatedData } : p);
    localStorage.setItem('propertiesData', JSON.stringify(properties));
}

function deleteProperty(id) {
    if (!confirm('Are you sure you want to delete this property listing?')) return;
    let properties = getProperties();
    properties = properties.filter(p => p.id !== id);
    localStorage.setItem('propertiesData', JSON.stringify(properties));
    window.location.reload();
}

// ─── AUTH ─────────────────────────────────────────────────────────────────────
function checkAuth() {
    if (sessionStorage.getItem('adminLoggedIn') !== 'true') {
        window.location.href = 'login.html';
    }
}

function login(username, password) {
    if (username === 'admin' && password === 'password123') {
        sessionStorage.setItem('adminLoggedIn', 'true');
        window.location.href = 'admin.html';
    } else {
        showToast('Invalid credentials. Please try again.', 'error');
    }
}

function logout() {
    sessionStorage.removeItem('adminLoggedIn');
    window.location.href = 'index.html';
}

// ─── TOAST ────────────────────────────────────────────────────────────────────
function showToast(message, type = 'success') {
    const existing = document.getElementById('toast');
    if (existing) existing.remove();
    const colors = { success: '#15803d', error: '#dc2626', info: '#0891b2' };
    const icons  = { success: '✓', error: '✕', info: 'ℹ' };
    const toast = document.createElement('div');
    toast.id = 'toast';
    toast.innerHTML = `<span style="font-weight:700;">${icons[type]}</span> ${message}`;
    Object.assign(toast.style, {
        position: 'fixed', bottom: '28px', right: '28px',
        background: colors[type] || colors.success, color: 'white',
        padding: '14px 22px', borderRadius: '10px',
        fontFamily: "'Inter', sans-serif", fontSize: '0.88rem', fontWeight: '500',
        boxShadow: '0 8px 30px rgba(0,0,0,0.2)', zIndex: '9999',
        display: 'flex', alignItems: 'center', gap: '10px',
        transform: 'translateY(20px)', opacity: '0',
        transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
        maxWidth: '320px'
    });
    document.body.appendChild(toast);
    requestAnimationFrame(() => { toast.style.transform = 'translateY(0)'; toast.style.opacity = '1'; });
    setTimeout(() => {
        toast.style.transform = 'translateY(20px)'; toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 320);
    }, 3200);
}

// ─── MOBILE NAV ───────────────────────────────────────────────────────────────
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const closeBtn  = document.querySelector('.mobile-nav-close');
    if (!hamburger || !mobileNav) return;
    const open  = () => { hamburger.classList.add('open'); mobileNav.classList.add('open'); document.body.style.overflow = 'hidden'; };
    const close = () => { hamburger.classList.remove('open'); mobileNav.classList.remove('open'); document.body.style.overflow = ''; };
    hamburger.addEventListener('click', () => mobileNav.classList.contains('open') ? close() : open());
    if (closeBtn) closeBtn.addEventListener('click', close);
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

document.addEventListener('DOMContentLoaded', initMobileNav);
initDB();