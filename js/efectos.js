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
    const totalSlides = slides.length + 1; // +1 por el clon
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

//-------------------------- Menu Desplegable -------------------------------

const boton = document.querySelector(".nav__crossContainer");
const lineas = document.querySelectorAll(".nav__crossLinea");
const aside = document.querySelector(".layout__asideNav");

let cruz = false;
let visible = "aside__visible"

let esconder = ()=>{
    
    if(!cruz){
        cruz = true

        lineas.forEach((linea, index)=>{
        
            let mostrar = `clicked${index+1}`;
    
            linea.classList.add(mostrar)  
        })

        aside.classList.add(visible);
    }else{
        cruz=false;

        lineas.forEach((linea, index)=>{

            let mostrar = `clicked${index+1}`;

            linea.classList.remove(mostrar)

        })

        aside.classList.remove(visible)
    }
    
}

boton.addEventListener("click", esconder);

addEventListener("scroll", ()=>{
    lineas.forEach((linea, index)=>{
        
        let mostrar = `clicked${index+1}`;

        linea.classList.remove(mostrar)

    })
    
    cruz= false;
    
    aside.classList.remove(visible)
})

// ------------------ Contador de Numeros ------------------

let spanContador = document.getElementById("contadorSeguidores");
let numeroFinal = 350; // El número final
let duracion = 2000; // Duración en milisegundos
let intervalo = 10; // Intervalo de actualización en milisegundos
let paso = 0;

let iniciarContador = () => {
    let contador = setInterval(() => {
    
        if(paso<= numeroFinal){
            spanContador.innerText = paso;
            paso++
            
        }else{
            clearInterval(contador)
        }            
    }, intervalo);  
}

// ------------------ Observador ------------------
const observerCallBack = (entries, observer) =>{
    entries.forEach(entry => {
        if(entry.isIntersecting){
            const effect = entry.target.getAttribute("data-effect");

            if(effect === "contador"){
                iniciarContador();
            }

            if(effect === "sliceBottom"){
                entry.target.classList.add("visible");
            }

            observer.unobserve(entry.target);
        }
    })
}

const observerOptions = {
    root: null, // usar el viewport como contenedor
    threshold: 0.1, // cuando al menos 20% del elemento es visible
    rootMargin: '0px'
};

const observer = new IntersectionObserver(observerCallBack, observerOptions);

const socialMedia = document.querySelector(".layout__socialMedia");
const aboutMe = document.querySelector(".layout__about");

const sections = document.querySelectorAll("section");

sections.forEach((section)=>{
    if(section.getAttribute("data-effect")){
        observer.observe(section)
    }
})

// ------------------ EmailJs ------------------
const mostrarMensaje = document.querySelector(".contact__mensajeEnvio");
const mensaje = document.querySelectorAll(".mensajeEnvio__mensaje");
const mostrar = "mensaje__mostrar";

const btn = document.getElementById('button');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Enviando...';

   const serviceID = 'default_service';
   const templateID = 'template_p76elwj';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Enviar Mensaje';
      mostrarMensaje.classList.add(mostrar)
      mensaje[0].classList.add(mostrar)
    }, (err) => {
      btn.value = 'Enviar Mensaje';
      mostrarMensaje.classList.add(mostrar)
      mensaje[1].classList.add(mostrar)
      alert(JSON.stringify(err));
    });
});