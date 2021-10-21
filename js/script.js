//prendo gli elementi dal mio codice html
const difficoltaSelezionata = document.getElementById("select-difficolta");
const btnPlay = document.getElementById("button-play");
const containerGriglia = document.getElementById("container-griglia");
const hiddenContainer = document.getElementById("hidden-container");
const numeroBombe = 16;
let bombe = [];
let clickCounter = 0;

//Cosa succede quando clicco sul pulsante?
btnPlay.addEventListener("click", function () {

    hiddenContainer.classList.remove("d-none-container");

    //prendo la difficoltà dal form
    const difficolta = difficoltaSelezionata.value;

    //calcolo il numero di celel totali con una funzione, in base alla difficoltà selezionata
    const celleTotali = functionNumeroCelle(difficolta);

    console.log(`L'utente ha impostato la difficoltà: ${difficolta}`);
    console.log(`Numero celle per la partita: ${celleTotali}`);

    //tramite funzione, creo le celle in relazione al loro numero
    funzioneGeneraGriglia(celleTotali);
    bombe = functionGeneraBombe(numeroBombe, celleTotali);
    console.log(`Numero bombe: ${numeroBombe}`);



});



//creo funzione che mi dia il numero di celle in base alla difficoltà selezionata
function functionNumeroCelle(difficolta) {

    //Inizializzo la variabile, rendendola vuota
    let nCelle;

    //opzioni di scelta con relativo numero di celle
    if (difficolta == "facile") {
        nCelle = 100;
    } else if (difficolta == "media") {
        nCelle = 81;
    } else if (difficolta == "difficile") {
        nCelle = 49;
    }

    return nCelle;
}

//creo una funzione che, dato il numero totale di celle, le disponga nella griglia
function funzioneGeneraGriglia(celleTotali) {

    //svuoto la griglia ad ogni click
    containerGriglia.innerHTML = "";

    //calcolo il numero di celle per ogni riga
    const cellePerRiga = Math.sqrt(celleTotali);
    console.log(`Dimensione griglia: ${cellePerRiga}x${cellePerRiga}`);

    //calcolo le dimensioni di ogni cella in base al numero di celle totali
    const dimCella = 100 / cellePerRiga;


    //un ciclo for che mi crea i div contenitori delle celle, aggiunge le classi che mi servono  e inserisce il contenuto
    for (let i = 0; i < celleTotali; i++) {

        const cella = document.createElement("div");
        cella.classList.add("box", "d-flex", "align-items-center", "justify-content-center");
        cella.style.width = dimCella + "%";
        cella.style.height = dimCella + "%";
        cella.textContent = (i + 1);
        /* cella.innerHTML += `<img src="img/bomb-clipart.png" class="w-100 bomba-icon" alt="bomb-clipart">`; */
        /* const cellaN = cella.createElement("div");
        cellaN.innerHTML = `${i + 1}`;  */

        //uso una nuova funzione per marcare i box che clicco
        cella.addEventListener("click", functionCellaSelezionata);

        containerGriglia.append(cella);
    }
}

function functionCellaSelezionata() {
    clickCounter++;
    const numeroCella = parseInt(this.textContent);

    if (bombe.includes(numeroCella)) {

        this.classList.add("boom");
        this.innerHTML = `<img src="img/bomb-clipart.png" class="w-75" alt="bomb-clipart">`;
        showAllBombs();
        swal("Hai Perso!", `Punteggio: ${clickCounter - 1}`, "error");
        /*         containerGriglia.innerHTML = "";
                hiddenContainer.classList.add("d-none-container"); */

    } else {
        this.classList.add("box-selected");
    }
}


function showAllBombs() {
    //recupero elenco di tutte le celle esistenti
    const cellList = containerGriglia.querySelectorAll(".box");
    console.log(cellList);
    for (let i = 0; i < bombe.length; i++) {
        const bomb = bombe[i];
        const bombCell = cellList[bomb - 1];

        bombCell.classList.add("boom");
        bombCell.innerHTML = `<img src="img/bomb-clipart.png" class="w-75" alt="bomb-clipart">`;
    }
}