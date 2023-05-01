import { valorCarta } from "./valor-carta";
import { pedirCarta } from "./pedir-carta";
import { crearCartaHtml } from "./crearCartaHtml";

export const turnoComputadora = ( puntosMinimos,puntosHTML,divCartasComputadora ,deck = []  ) => {
   
    if(!puntosMinimos) throw new Error('Puntos Minimos Son necesarios');
    if(!puntosHTML) throw new Error('Argumento necesario Puntos Html Son necesarios');
    let puntosComputadora = 0;
    
    do {
        const carta = pedirCarta(deck);

        puntosComputadora = puntosComputadora + valorCarta( carta );
        puntosHTML.innerText = puntosComputadora;
        
        // <img class="carta" src="assets/cartas/2C.png">
        const imgCarta =crearCartaHtml(carta);
        divCartasComputadora.append( imgCarta );

        if( puntosMinimos > 21 ) {
            break;
        }

    } while(  (puntosComputadora < puntosMinimos)  && (puntosMinimos <= 21 ) );

    setTimeout(() => {
        if( puntosComputadora === puntosMinimos ) {
            alert('Nadie gana :(');
        } else if ( puntosMinimos > 21 ) {
            alert('Computadora gana')
        } else if( puntosComputadora > 21 ) {
            alert('Jugador Gana');
        } else {
            alert('Computadora Gana')
        }
    }, 100 );
}
