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
 
 // Configuración del slider
 const slideWidth = 200;
 let currentIndex = 0;

 // Clonamos la primera imagen y la agregamos al final
 // Esto crea la ilusión de continuidad
 const firstSlideClone = slides[0].cloneNode(true);
 track.appendChild(firstSlideClone);

 function moveSlider() {
     currentIndex++;
     
     // Aplicamos la transición suave
     track.style.transition = 'transform 0.5s ease-in-out';
     track.style.transform = `translateX(${-currentIndex * slideWidth}px)`;

     // Cuando llegamos al clon de la primera imagen
     if (currentIndex >= slides.length) {
         // Esperamos a que termine la transición
         setTimeout(() => {
             // Removemos la transición para que el salto no sea visible
             track.style.transition = 'none';
             // Volvemos al inicio instantáneamente
             currentIndex = 0;
             track.style.transform = `translateX(0)`;
         }, 500); // Este tiempo debe coincidir con la duración de la transición
     }
 }

 // Iniciamos el slider automático
 setInterval(moveSlider, 3000);