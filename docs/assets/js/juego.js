const miModulo =
(() => {
    'use strict'

    let deck= [];

    let puntosJugadores = [];
    // creamos la funcion  para hacer  la baraja
    const tipos =['C','D','H','S'], // creamos una  variable con los datos
    // variabe  de las especiales
            especiales =['A','J','Q','K']; // creamos una  variable con los datos
    
    //referencias para los botones  y pedir del html
    // con elGato pedimos por ID Y CON EL punto . pedimos por clase
    const btnPedir = document.querySelector('#btnPedir'),
         btnDetener = document.querySelector('#btnDetener'),
         btnReiniciar = document.querySelector('#btnReiniciar');
    // REFERNCIA A DAR CARTAS AL JUGADOR
    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          ptsHtml = document.querySelectorAll('small');
    // funcion para inicar el juego 
    const inicializarJuego = (numJugadores = 2) =>{
        deck = crearDeck();

        puntosJugadores = [];
         for (let i =  0; i < numJugadores; i++) {
            puntosJugadores.push(0);            
         }
         ptsHtml.forEach(elem => elem.innerText=0);
         divCartasJugadores.forEach(elem => elem.innerHTML='');    
    
        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }      
    
    const crearDeck =() => {
        deck = [];
    // utilizamos un for para los numeros  y un FOR OF para  las Letras TREVOL 'C' Diamantes  'D' Corazones 'H' Espadas 'S'
        for(let i=2; i <= 10 ; i++){
            for(let tipo of tipos){
                 deck.push(i + tipo);
            }              
        }
        // aqui otro FOR PARA LAS CARTAS ESPECIALES COMO  A J Q K
        for(let tipo of tipos){
            for (let esp of especiales) {
                deck.push( esp + tipo);
            }
        }
    
       // console.log(deck);
        return _.shuffle(deck);
        
    }
    
    // funcion para poder Pedir cartas 
     const pedirCarta = () => {
        // hacemos la condicion  si en el array ya no hay cartas 
        if (deck.length === 0 ) {            
            // usamoos la palabra throw
            throw ' No hay cartas en La Baraja';
        }
         // aqui usamos la funcion POP que remueve el ultimo elementdo del array y lo regresa 
        return deck.pop();    
     }
     // FUNCION PARA SABER QUE CARTA PEDIMOS  
    
     const valorCarta = (carta) => {    
        // primero extramoes el primer valor del string y el segundo con el metodo SUBSTRING
        const valor = carta.substring(0,carta.length - 1);        
        // reduccion de codigo con operaciones ternarias    
        return(isNaN (valor)) ?
            (valor === 'A')   ? 11 : 10
            : valor * 1; 
     }
     //  0 ES PARA EL PRIMER JUGADOR  Y EL ULTIMO SERA EL BOT
     const acumularPuntos = (carta,turno) =>{
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        ptsHtml[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];

     }
     // Funcion para Crear Cartas 
      const crearCarta = (carta , turno ) => {

       const imgCarta = document.createElement('img');
    // creamos la ruta y remplazamos el valor de la carta  con $ { } para enviar el dato dinamico
       imgCarta.src = `assets/cartas/${carta}.png`;      
       imgCarta.classList.add('carta');
       divCartasJugadores[turno].append(imgCarta);
       
      }
      // funcion determinar ganador
    const determinarGanador =() => {

        const [puntosMinimos, puntosBot] = puntosJugadores;

        setTimeout(() => {
      
    
            //
                   if(puntosBot === puntosMinimos ) {
                      
                       alert(' Es un EMPATE LA CASA GANA ')
                   
                   } else if (puntosMinimos > 21 ){
                       alert(' GANA LA COMPUTADORA');
       
                   }else if (puntosBot>21){
                       alert('Ganaste APUESTA DE NUEVO !!!')
       
                   }else{
                       alert('Gana la Computadora ')
                   }
           }, 100);
    }

     // funcion para  hacer que juegue la computadora
     const turnoComputadora = (puntosMinimos) => {  
         let puntosBot = 0 ;
        // USAMOS EL CICLO DO WHILE  PORQUE  NECESITAMOS QUE   LAS CARTAS SE EJECUTE UNA VEZ
         do {             
             // aqui usamos la funcion de pedir la carta
             const carta = pedirCarta();
            puntosBot = acumularPuntos(carta,puntosJugadores.length-1);
                 crearCarta(carta,puntosJugadores.length-1);
             //-   <img class="carta" src="assets/cartas/10C.png" alt="">  -->  
          
           
    
        } while ((puntosBot < puntosMinimos) && ( puntosMinimos <= 21 ));
        // USANDO UNA FUNCION DE JS para que eljuego inicie
        determinarGanador();
         
     }
    
     // eventos  
     // sintaxis para  hacer el evento del click   
 btnPedir.addEventListener('click', () => {
       // aqui usamos la funcion de pedir la carta
        const carta = pedirCarta();
        const puntosJugador =acumularPuntos(carta, 0 );

        crearCarta(carta, 0);
   
    
    // logica de los puntos control 
     if (puntosJugador> 21) {
        console.warn('Lo siento mucho, perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
       // alert('UUH! Sobrepasate andas  en mala Racha')
    
     }else  if(puntosJugador === 21){
        console.warn('21, genial!');
         btnPedir.disabled = true;
         btnDetener.disabled = true;
         turnoComputadora( puntosJugador );
         //alert(' tu ganaste !!! Estas de Buena Suerte')
    
     } 
    
      
         
    
    
     });
    
     // evento para detener el juego 
     btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);
     
     
      });
      // funcion para reinciar el juego con otro juego de barajaas
    

    
    
    
     
     
   
     
      return {
        nuevoJuego : inicializarJuego
      };
    
    
    

})();
