/**
 * 2C = two of Clubs (treboles)
 * 2D = two of Diamodns (diamantes)
 * 2H = two of Hearts (corazones)
 * 2S = two of Spades (espadas)
 * 
 * La meta es llegar a 21 pts sin pasarnos
 */

//funcion anonima auto-invovcada
(() => {
    let deckOfCards = [];
    //C = treboles D = diamantes H = corazones S = espadas
    const types = ['C', 'D', 'H', 'S'];
    const specials = ['A', 'J', 'Q', 'K'];

    //Score de los jugadores
    let scorePlayers = [];

    /*--- REFERENCIAS AL DOM  ---*/

    //botones de acciones
    const getBtnCard = document.querySelector("#btnGetCard");
    const stopBtnTurn = document.querySelector("#btnStopTurn");
    const newBtnGame = document.querySelector("#btnNewGame");

    //referencias al area de juego

    const divCardPlayer = document.querySelectorAll('.divCards');
    const scoreHtml = document.querySelectorAll('small');
    /*FIN DE REFERENCIAS AL DOM */

    //Funciones
    //iniciar el juego
    const startGame = (numPlayer = 2) => {

        //cada nuevo juego se reinician los pts
        console.log('HORA DE COMENZAR EL JUEGO');
        //crear baraja
        deckOfCards = createDeck();

        //el puntaje de los jugadores
        scorePlayers = [];
        for (let i = 0; i < numPlayer; i++) {
            scorePlayers.push(0);
        }
        console.log(scorePlayers);

    };

    //Crear la baraja
    const createDeck = () => {
        let deckOfCards = [];
        for (let i = 2; i <= 10; i++) {
            for (let type of types) {
                deckOfCards.push(i + type)
            }
        }
        for (let type of types) {
            for (let special of specials) {
                deckOfCards.push(special + type)
            }
        }
        console.log(deckOfCards);
        return _.shuffle(deckOfCards);
    };

    //Obrener una carta
    const getOneCard = () => {

    };

    //Valor de la carta
    const valueCard = () => {

    };

    //Contador de puntaje
    const countScore = () => {

    };

    //Crear carta para mostrarla en DOM
    const createCard = () => {

    };

    //Determinar un ganador
    const winnerPlayer = () => {

    };

    //Turno para la Computadora
    const turnComputer = () => {

    };

    /* LOS EVENTOS DE LOS BOTONES */

    newBtnGame.addEventListener('click', () => {
        startGame();
    });





})();