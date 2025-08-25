document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const pageSections = document.querySelectorAll('.page-section');
    const body = document.body;

    // Tambah class landing saat pertama kali load
    body.classList.add('landing');

    // Navigation click dengan animasi smooth
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href').substring(1);
            
            pageSections.forEach(section => {
                section.classList.remove('active');
            });
            
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });

    // 🔘 Dark Mode Toggle Button
    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = "🌙";
    toggleBtn.classList.add('dark-toggle');
    document.querySelector('nav').appendChild(toggleBtn);

    toggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        toggleBtn.textContent = body.classList.contains('dark-mode') ? "☀️" : "🌙";
    });
});
