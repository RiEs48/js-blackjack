
/**
 * 
 * @param {Array<string>} deck 
 * @returns 
 */
export const pedirCarta = (deck) => {
    //let deck= [];
    if(!deck || deck.length === 0){
        throw new Error('No hay cartas en el Deck')
    }
   
    const carta = deck.pop();
    return carta;
}
