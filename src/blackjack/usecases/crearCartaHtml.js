// funcion html 
export const crearCartaHtml =(carta) => {

    if(!carta) throw new Error(' la carta es  un argumento Obligatorio')
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`; //3H, JD
    imgCarta.classList.add('carta');

    return imgCarta;
} 