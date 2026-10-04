/* ==========================================================
   PORTAFOLIO DE HAIAT GHADDARI - JAVASCRIPT

   Lo que hace este archivo:
     1. Guarda los elementos de la página en variables
     2. Efecto de la intro al hacer scroll (zoom y velo)
     3. Enseña el menú al bajar
     4. Hace aparecer las secciones al llegar a ellas
     5. Botón de modo claro / oscuro
     6. Botón del menú en el móvil
     7. Pone el año actual en el pie de página
   ========================================================== */


/* ==========================================================
   1. ELEMENTOS DE LA PÁGINA

   Se guardan en variables al principio para no tener que
   buscarlos cada vez que se usan.
   ========================================================== */

var introImagen = document.getElementById("introImagen");
var introVelo = document.getElementById("introVelo");
var introTexto = document.getElementById("introTexto");
var menu = document.getElementById("menu");
var menuNav = document.getElementById("menuNav");
var botonMenu = document.getElementById("botonMenu");
var botonTema = document.getElementById("botonTema");


/* ==========================================================
   2, 3 y 4. TODO LO QUE PASA AL HACER SCROLL

   Esta función se ejecuta cada vez que se mueve la página.
   ========================================================== */

function alHacerScroll() {

    // Cuántos píxeles se ha bajado desde arriba del todo
    var y = window.scrollY;


    // ----- LA IMAGEN SE ACERCA -----
    // Se divide entre 700 para que crezca poco a poco.
    // Si y vale 0 la escala es 1 (tamaño normal).
    // Si y vale 700 la escala es 2 (el doble de grande).
    var escala = 1 + y / 700;
    introImagen.style.transform = "scale(" + escala + ")";


    // ----- EL TEXTO DE BIENVENIDA DESAPARECE -----
    // Se va con los primeros 400 píxeles de scroll
    var opacidadTexto = 1 - y / 400;

    if (opacidadTexto < 0) {
        opacidadTexto = 0;
    }

    introTexto.style.opacity = opacidadTexto;


    // ----- EL VELO TAPA LA PANTALLA -----
    // Empieza a aparecer a los 500 píxeles y tapa del todo
    // a los 1100. Antes de 500 el resultado sale negativo,
    // y después de 1100 sale mayor que 1, así que se corrige.
    var opacidadVelo = (y - 500) / 600;

    if (opacidadVelo < 0) {
        opacidadVelo = 0;
    }
    if (opacidadVelo > 1) {
        opacidadVelo = 1;
    }

    introVelo.style.opacity = opacidadVelo;


    // ----- EL MENÚ APARECE -----
    // Cuando ya casi ha terminado la intro
    if (y > 1000) {
        menu.classList.add("visible");
    } else {
        menu.classList.remove("visible");
    }


    // ----- LAS SECCIONES APARECEN -----
    revelarSecciones();
}


/* Hace aparecer las secciones cuando entran en la pantalla.

   getBoundingClientRect().top dice a qué altura está el
   elemento respecto a la ventana. Si ese número es menor que
   la altura de la ventana, es que ya se está viendo. */

function revelarSecciones() {

    var secciones = document.querySelectorAll(".revelar");

    for (var i = 0; i < secciones.length; i++) {

        var posicion = secciones[i].getBoundingClientRect().top;

        if (posicion < window.innerHeight - 100) {
            secciones[i].classList.add("visible");
        }
    }
}


// Se avisa al navegador de que ejecute la función cada vez
// que se haga scroll
window.addEventListener("scroll", alHacerScroll);

// Y se ejecuta una vez al cargar, por si la página se abre
// ya con scroll hecho (al recargar, por ejemplo)
alHacerScroll();


/* ==========================================================
   5. MODO CLARO / OSCURO

   El modo claro se activa poniéndole la clase "claro" al
   <body>. En el CSS, body.claro cambia todos los colores.

   La elección se guarda con localStorage, que es una especie
   de memoria del navegador, para que se recuerde la próxima
   vez que se entre.
   ========================================================== */

botonTema.addEventListener("click", function () {

    // toggle quita la clase si está, y la pone si no está
    document.body.classList.toggle("claro");

    if (document.body.classList.contains("claro")) {
        botonTema.textContent = "Modo oscuro";
        localStorage.setItem("tema", "claro");
    } else {
        botonTema.textContent = "Modo claro";
        localStorage.setItem("tema", "oscuro");
    }
});


// Al cargar la página se mira si ya se había elegido un modo
if (localStorage.getItem("tema") === "claro") {
    document.body.classList.add("claro");
    botonTema.textContent = "Modo oscuro";
}


/* ==========================================================
   6. BOTÓN DEL MENÚ EN EL MÓVIL
   ========================================================== */

botonMenu.addEventListener("click", function () {
    menuNav.classList.toggle("abierto");
});


// Al pulsar un enlace del menú, se cierra solo
var enlacesMenu = menuNav.querySelectorAll("a");

for (var i = 0; i < enlacesMenu.length; i++) {
    enlacesMenu[i].addEventListener("click", function () {
        menuNav.classList.remove("abierto");
    });
}


/* ==========================================================
   7. AÑO ACTUAL EN EL PIE DE PÁGINA

   Así no hay que cambiarlo a mano cada año.
   ========================================================== */

document.getElementById("anyo").textContent = new Date().getFullYear();
