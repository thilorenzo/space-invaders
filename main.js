var juegoEnPausa = true;
var juegoComenzado = false;
var nave;
var bala;
var balainvader;
var posNave;
var invader;
var areaDeJuego;
var arrayBalas = []
var vidas = 3;
var puntos = 0;
var timer;

var invaders = ["a1", "a2", "a3", "a4", "a5", "a6", "a7", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "c1", "c2", "c3", "c4", "c5", "c6", "c7"];

addEventListener("load",
function() {

    areaDeJuego = document.querySelector(".area-de-juego");
    nave = document.querySelector("#nave");
    bala = $(".bala")
    balainvader = $(".balainvader")
    invader = document.querySelector(".invader")
    nave.style.left = '275px';
    posNave = $("#nave").position().left;
})


addEventListener("keypress", function(e) {
    switch (e.which) {
        case 13:
            pausaOIniciar();
            break;
    }

    if (!juegoEnPausa && juegoComenzado) {
    switch (e.which) {
        case 97:
            moverIzq();
            break;
        case 100:
            moverDer();
            break;
        /* K=107*/
    }
    } 
})

function moverIzq() {
    nave.style.left=parseInt(nave.style.left) - 5 +"px";
    if ((parseInt(nave.style.left) - 5 +"px") <= 0 + "px") {
        nave.style.left = "555px";
    }
}

function moverDer() {
    nave.style.left=parseInt(nave.style.left) + 5 +'px';
    if ((parseInt(nave.style.left) + 5 +"px") == (565 + "px")) {
        nave.style.left = "10px";
    }
}

/*--------------------------------------*/

function mostrarPerdiste() {
    vidas--;
    if (!vidas) {
        document.querySelector('.fondo-iniciar').style.display = 'block';
        juegoComenzado = false;
        juegoEnPausa = true;
        vidas = 3;
        puntos = 0;
        $(".fila1").css("top", "200px")
        $(".fila2").css("top", "275px")
        $(".fila3").css("top", "350px")
        nave.style.left = '275px';
        alert("Perdiste. Apreta F5 para volver a jugar");
    } else {
        alert("Perdiste");
        $(".fila1").css("top", "200px")
        $(".fila2").css("top", "275px")
        $(".fila3").css("top", "350px")
        nave.style.left = '275px';
        $(".bala").remove();
        $(".balainvader").remove();
    }
    document.querySelector('.vidas').innerHTML = vidas;
    document.querySelector('.puntos').innerHTML = puntos;
}

function mostrarGanaste() {
    alert('Ganaste. Apreta F5 para volver a jugar');
}

function pausaOIniciar() {
    if (!juegoComenzado) {
        juegoComenzado = true;
        document.querySelector('.fondo-iniciar').style.display = 'none';
    } else {
        if (juegoEnPausa) {
            document.querySelector('.fondo-pausa').style.display = 'none';
        } else {
            document.querySelector('.fondo-pausa').style.display = 'block';
        }
    }
    juegoEnPausa = !juegoEnPausa;
}

/*--------------------------------------*/


$(document).click(function(e) {

    if (!juegoEnPausa && juegoComenzado){
    $("<div></div>")
    .addClass("bala").appendTo(".area-de-juego")
    .css("left", ($("#nave").position().left + 17))
    }

})

setInterval(() => {
    if (!juegoEnPausa && juegoComenzado) {
        $(".fila1").css("top", ($(".fila1").position().top - 5))
        $(".fila2").css("top", ($(".fila2").position().top - 5))
        $(".fila3").css("top", ($(".fila3").position().top - 5))
        if ($(".invader").position().top <= 50){
            mostrarPerdiste(); 
        }
    }
    }, 1300);

setInterval(function() {

    $(".bala").each(function(indice, bala) {
        $(bala).css("top", ($(bala).position().top + 5 ) + "px")
        if ( $(bala).position().top >= 400){
            $(bala).remove()
        }
        
    // $(".invader").each(function(indice, invader) {
    //     if (($(bala).position().top >= $(invader).position().top) 
    //     && (($(bala).position().left >= $(invader).position().left &&
    //     $(bala).position().left <= $(invader).position().left + 30))){
    //         $(bala).remove()
    //         var invaderActive = document.getElementsByClassName('invader');
    //         console.log(invaderActive);
    //         var invaderId = $(invaderActive).attr('id');
    //         console.log(invaderId);
    //         var index = invaders.indexOf(invaderId);
    //         var x = invaders.splice(index, 1);
    //         $(invader).remove()
    //         document.querySelector('.puntos').innerHTML = puntos;
    //         puntos = puntos + 100; 
    //         if (puntos == 2100) {
    //             mostrarGanaste()
    //         }
    //     }})

        document.querySelectorAll('.invader').forEach(function(invader) {
        if (($(bala).position().top >= $(invader).position().top) 
        && (($(bala).position().left >= $(invader).position().left &&
        $(bala).position().left <= $(invader).position().left + 30))){
            $(bala).remove()
            var invaderId = $(invader).attr('id');
            console.log(invaderId);
            var index = invaders.indexOf(invaderId);
            var x = invaders.splice(index, 1);
            console.log(invaders);
            $(invader).remove()
            document.querySelector('.puntos').innerHTML = puntos;
            puntos = puntos + 100; 
            if (puntos == 2100) {
                mostrarGanaste()
            }
        }})
    })
}, 20)

/*--------------------------------------------*/
/*--------------Disparo random----------------*/
/*--------------------------------------------*/

function getRandomInvader(invaders) {

    // get random index value
    const randomIndex = Math.floor(Math.random() * invaders.length);

    // get random item
    const item = invaders[randomIndex];

    return item;
}

// function getTimer() {
    
// }
// setInterval(() => {
//     var invadersLenght = invaders[Math.floor(Math.random() * invaders.length)];
//     timer = 200;
//     if (invadersLenght < 15){
//         timer = 300;
//     }
//     if (invadersLenght < 10){
//         timer = 1000;
//     }
//     if (invadersLenght < 5){
//         timer = 4000;
//     } 
//     if (invadersLenght < 3){
//         timer = 6000;
//     }
//     console.log(timer);
// }, 200);

setInterval(() => {
    if (!juegoEnPausa && juegoComenzado){
        var invaderActive = invaders[Math.floor(Math.random() * invaders.length)];
        var invaderActiveId = document.getElementById(invaderActive);
        if (invaderActiveId){
            const invaderClass = invaderActiveId.classList[2];
            $("<div></div>")
            .addClass("balainvader").appendTo(".area-de-juego")
            .css("left", ($("."+invaderClass).position().left + 18))
            .css("top", ($("."+invaderClass).position().top))
        }
        else {
            var index = invaders.indexOf(invaderActive);
            var x = invaders.splice(index, 1);
        }
    }
}, 200);

var disparo = setInterval(function() {
    $(".balainvader").each(function() {
        $(this).css("top", ($(this).position().top - 5 ) + "px")

        if ( $(this).position().top <= 30){
            $(this).remove()
        }

        if (($(this).position().top == $("#nave").position().top) 
            && (($(this).position().left >= $("#nave").position().left &&
            $(this).position().left <= $("#nave").position().left + 25))){
            $(this).remove()
            mostrarPerdiste()
        }
    })
}, 20)

// /*----------------------------------------*/
// /*--------------Disparo 1-----------------*/
// /*----------------------------------------*/
// setInterval(() => {
//     if (!juegoEnPausa && juegoComenzado){

//         if (getElementById("a1")){
//             $("<div></div>")
//             .addClass("balainvader").appendTo(".area-de-juego")
//             .css("left", ($(".fila1").position().left + 100))
//             .css("top", ($(".fila1").position().top))
//         }
//     }
// }, 4000);
// /*----------------------------------------*/
// /*--------------Disparo 2-----------------*/
// /*----------------------------------------*/
// setInterval(() => {
//     if (!juegoEnPausa && juegoComenzado){
//         $("<div></div>")
//         .addClass("balainvader").appendTo(".area-de-juego")
//         .css("left", ($(".fila4").position().left + 100))
//         .css("top", ($(".fila4").position().top))
//     }
// }, 2500);
// /*----------------------------------------*/
// /*--------------Disparo 3-----------------*/
// /*----------------------------------------*/
// setInterval(() => {
//     if (!juegoEnPausa && juegoComenzado){
//         $("<div></div>")
//         .addClass("balainvader").appendTo(".area-de-juego")
//         .css("left", ($(".fila3").position().left + 280))
//         .css("top", ($(".fila3").position().top))
//     }
// }, 1000);
// /*----------------------------------------*/
// /*--------------Disparo 4-----------------*/
// /*----------------------------------------*/
// setInterval(() => {
//     if (!juegoEnPausa && juegoComenzado){
//         $("<div></div>")
//         .addClass("balainvader").appendTo(".area-de-juego")
//         .css("left", ($(".fila1").position().left + 100))
//         .css("top", ($(".fila1").position().top))
//     }
// }, 1900);
// /*----------------------------------------*/
// /*--------------Disparo 5-----------------*/
// /*----------------------------------------*/
// setInterval(() => {
//     if (!juegoEnPausa && juegoComenzado){
//         $("<div></div>")
//         .addClass("balainvader").appendTo(".area-de-juego")
//         .css("left", ($(".fila2").position().left + 100))
//         .css("top", ($(".fila2").position().top))
//     }
// }, 2400);
// /*----------------------------------------*/
// /*--------------Disparo 6-----------------*/
// /*----------------------------------------*/
// setInterval(() => {
//     if (!juegoEnPausa && juegoComenzado){
//         $("<div></div>")
//         .addClass("balainvader").appendTo(".area-de-juego")
//         .css("left", ($(".fila3").position().left + 20))
//         .css("top", ($(".fila3").position().top))
//     }
// }, 3567);
// /*----------------------------------------*/
// /*--------------Disparo 7-----------------*/
// /*----------------------------------------*/
// setInterval(() => {
//     if (!juegoEnPausa && juegoComenzado){
//         $("<div></div>")
//         .addClass("balainvader").appendTo(".area-de-juego")
//         .css("left", ($(".fila2").position().left + 370))
//         .css("top", ($(".fila2").position().top))
//     }
// }, 5780);
// /*----------------------------------------*/
// /*--------------Disparo 8-----------------*/
// /*----------------------------------------*/
// setInterval(() => {
//     if (!juegoEnPausa && juegoComenzado){
//         $("<div></div>")
//         .addClass("balainvader").appendTo(".area-de-juego")
//         .css("left", ($(".fila3").position().left + 550))
//         .css("top", ($(".fila3").position().top))
//     }
// }, 5300);
// /*----------------------------------------*/
// /*--------------Disparo 9-----------------*/
// /*----------------------------------------*/
// setInterval(() => {
//     if (!juegoEnPausa && juegoComenzado){
//         $("<div></div>")
//         .addClass("balainvader").appendTo(".area-de-juego")
//         .css("left", ($(".fila4").position().left + 462))
//         .css("top", ($(".fila4").position().top))
//     }
// }, 2400);
// /*----------------------------------------*/
// /*--------------Disparo 10-----------------*/
// /*----------------------------------------*/
// setInterval(() => {
//     if (!juegoEnPausa && juegoComenzado){
//         $("<div></div>")
//         .addClass("balainvader").appendTo(".area-de-juego")
//         .css("left", ($(".fila1").position().left + 462))
//         .css("top", ($(".fila1").position().top))
//     }
// }, 3000);
// /*----------------------------------------*/
// /*----------------------------------------*/

// var disparo = setInterval(function() {
//     $(".balainvader").each(function() {
//         $(this).css("top", ($(this).position().top - 5 ) + "px")

//         if ( $(this).position().top <= 30){
//             $(this).remove()
//         }

//         if (($(this).position().top == $("#nave").position().top) 
//         && (($(this).position().left >= $("#nave").position().left &&
//         $(this).position().left <= $("#nave").position().left + 25))){
//             $(this).remove()
//             mostrarPerdiste()
//         }
//     })
// }, 20)




 




