/*Contador de numeros */
let spanContador = document.getElementById("contadorSeguidores");
let numeroFinal = 350; // El número final
let duracion = 2000; // Duración en milisegundos
let intervalo = 10; // Intervalo de actualización en milisegundos
let paso = 0;


let contador = setInterval(() => {

    if(paso<= numeroFinal){
        spanContador.innerText = paso;
        paso++
        
    }else{
        clearInterval(contador)
    }            
}, intervalo);  


/* Slider */

// Seleccionamos los elementos necesarios
const track = document.querySelector('.slider__track');
const slides = document.querySelectorAll('.slider__img');

// Configuración base del slider
const slideWidth = 200;
const slideGap = 40;
let currentIndex = 0;

// Función para obtener el número de slides visibles según el viewport
function getVisibleSlides() {
    if (window.innerWidth >= 1025) return 4; // Laptop y Desktop
    if (window.innerWidth >= 768) return 3;  // Tablet
    return 1; // Mobile
}

// Función para calcular el ancho total del track
function calculateTrackWidth() {
    const totalSlides = slides.len
    gth + 1; // +1 por el clon
    return (slideWidth * totalSlides) + (slideGap * (totalSlides - 1));
}

// Configuración inicial del track
track.style.width = `${calculateTrackWidth()}px`;

// Clonamos las primeras imágenes según el número máximo visible
const visibleSlides = Math.max(4, getVisibleSlides()); // Tomamos el máximo para cubrir todos los casos
for (let i = 0; i < visibleSlides; i++) {
    const clone = slides[i].cloneNode(true);
    track.appendChild(clone);
}

function moveSlider() {
    currentIndex++;
    
    // Calculamos el desplazamiento considerando el gap
    const offset = currentIndex * (slideWidth + slideGap);
    
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(-${offset}px)`;

    // Cuando llegamos al final del conjunto original
    if (currentIndex >= slides.length) {
        setTimeout(() => {
            track.style.transition = 'none';
            currentIndex = 0;
            track.style.transform = 'translateX(0)';
        }, 500);
    }
}

// Iniciamos el slider automático
setInterval(moveSlider, 3000);

// Actualizamos el slider cuando cambia el tamaño de la ventana
window.addEventListener('resize', () => {
    track.style.width = `${calculateTrackWidth()}px`;
});