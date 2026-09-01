// --- 1. TRANSICIÓN DE BIENVENIDA Y REPRODUCCIÓN DE MÚSICA ---
function openGift() {
    // Cambia de pantalla
    document.getElementById('welcome-screen').classList.remove('active');
    document.getElementById('main-screen').classList.add('active');

    // Reproduce la música automáticamente al abrir el detalle
    const music = document.getElementById('bg-music');
    if (music) {
        music.play().catch(error => {
            console.log("El navegador bloqueó la reproducción automática, interactúa con la pantalla si es necesario:", error);
        });
    }
}

// --- 2. CARRUSEL AUTOMÁTICO (6 FOTOS) ---
let currentIndex = 0;
const slides = document.querySelectorAll('.slider-container .slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    if (slides.length === 0) return;
    
    // Quita la clase activa de todas las fotos y puntos
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Calcula el índice en bucle (del 0 al 5)
    currentIndex = (index + slides.length) % slides.length;
    
    // Muestra la foto y el punto actual
    slides[currentIndex].classList.add('active');
    if(dots[currentIndex]) {
        dots[currentIndex].classList.add('active');
    }
}

function currentSlide(index) {
    showSlide(index);
}

// Cambia de foto automáticamente cada 4 segundos (4000 milisegundos)
setInterval(() => {
    showSlide(currentIndex + 1);
}, 4000);

// --- 3. APERTURA DE CARTA Y LLUVIA DE CORAZONES ---
function openLetter(event) {
    const card = document.getElementById('envelope');
    
    if (!card.classList.contains('open')) {
        card.classList.add('open');
        createScreenRainHearts();
    }
}

function createScreenRainHearts() {
    const container = document.getElementById('hearts-container');
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'screen-heart';
            heart.innerHTML = '❤️';
            
            const randomX = Math.random() * window.innerWidth;
            heart.style.left = `${randomX}px`;
            
            const randomSize = 0.8 + Math.random() * 1.2;
            heart.style.transform = `scale(${randomSize})`;
            
            const randomDuration = 2 + Math.random() * 1.5;
            heart.style.animationDuration = `${randomDuration}s`;
            
            container.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, randomDuration * 1000);
            
        }, i * 80);
    }
}