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
    //el jugador 0 somos nosotros y el jugador 1 es la computadora
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


        //crear baraja
        deckOfCards = createDeck();
        console.log(deckOfCards);

        //cada nuevo juego se reinician los pts
        scorePlayers = [];
        for (let i = 0; i < numPlayer; i++) {
            scorePlayers.push(0);
        }

        //resetear los puntajes de los jugadores
        //LIMPIAR EL AREA DEL JUEGO
        scoreHtml.forEach(element => element.innerText = 0);
        divCardPlayer.forEach(element => element.innerHTML = '');

        //habilitar los botones
        getBtnCard.disabled = false;
        stopBtnTurn.disabled = false;
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

        return _.shuffle(deckOfCards);
    };

    //Obrener una carta
    const getOneCard = () => {
        if (deckOfCards.length === 0) {
            throw 'The deck is empty';
        }
        //el pop elimina el ultimo elemento y me devuelve el elemento eliminado
        return deckOfCards.pop();
    };

    //Valor de la carta
    //en js los strings se pueden acceder como si fueran un arreglo
    //ejemplo:2D se puede acceder asi [2,D] indices: 2 = 0; D = 1;
    const valueCard = (card) => {
        const value = card.substring(0, card.length - 1);
        return value;
    };

    //Contador de puntaje
    const countScore = (card) => {
        console.log(valueCard(card));

    };

    //Crear carta para mostrarla en DOM
    //obtener carta a crear y el turno del jugador 0 o1
    //nosotros somos 0 y el computador es 1
    const createCard = (card, turn) => {
        const imgCard = document.createElement('img');
        // <img src=""> </img>
        imgCard.src = `assets/img/cartas/${card}.png`;
        // <img src="assets/img/cartas/ejemplo.png"> </img>
        imgCard.classList.add('img-card', 'animate__animated', 'animate__fadeInRight');
        // <img src="assets/img/cartas/ejemplo.png class="img-card animate__animated animate__fadeInRight"> </img>
        divCardPlayer[turn].append(imgCard);
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

    getBtnCard.addEventListener('click', () => {
        const card = getOneCard();
        countScore(card);
        //vamos a enviar el jugador y la carta para que sea creada
        createCard(card, 0);
    });




})();