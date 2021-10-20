//Creo una funzione che mi genera le bombe
//Devo avere 16 bombe
//le bombe saranno casuali, e i numeri estratti dipendono dal numero di celle, quindi dalla difficoltà
function numeroRandom(min, max) {
    const rand = Math.floor(Math.random() * (max - min + 1) + min);
    return rand;
}

function functionGeneraBombe(numeroBombe, celleTotali) {

    let celleBombe = [];

    while (celleBombe.length < numeroBombe) {
        const addBomb = numeroRandom(1, celleTotali);
        /*  const bombaEsistente = celleBombe.includes(addBomb); */
        funzioneControlloBombe(celleBombe, addBomb);
    }
    console.log(`Numero bombe: ${numeroBombe}`);
    console.log(celleBombe);

    return celleBombe;
}

function funzioneControlloBombe(array, addBomb) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] != addBomb) {
            array.push(addBomb);
        }
    }
    return array;

}