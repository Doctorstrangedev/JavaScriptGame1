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
    let scorePlayers = []; //[0,0]

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

        return (isNaN(value) ? (value === 'A') ? 11 : 10 : value * 1);
    };

    //Contador de puntaje
    const countScore = (card, turn) => {
        scorePlayers[turn] += valueCard(card);
        //scorePlayers[turn] = scorePlayers[turn] + valueCard(card);
        scoreHtml[turn].innerText = scorePlayers[turn];
        return scorePlayers[turn];

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
        //score players, pts jugador y compu
        const [scorePlayer, scoreComputer] = scorePlayers;
        if (scoreComputer === scorePlayer) {
            Swal.fire({
                title: 'Empate',
            });
        } else if (scorePlayer > 21) {
            Swal.fire({
                icon: 'error',
                title: 'Derrota',
                texto: 'Perdiste, el computador Gana'
            });
        } else if (scoreComputer > 21) {
            Swal.fire({
                title: 'Victoria',
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Derrota',
                texto: 'Perdiste, el computador Gana'
            });
        }
    };

    //Turno para la Computadora
    //minScore sera el puntaje que obtuvo el player 0 
    const turnComputer = (minScore) => {
        let scoreComputer = 0;
        do {
            const card = getOneCard();
            scoreComputer = countScore(card, scorePlayers.length - 1);
            createCard(card, scorePlayers.length - 1);

        } while ((scoreComputer < minScore) && (minScore <= 21))
        winnerPlayer();
    };

    /* LOS EVENTOS DE LOS BOTONES */
    //creamios juego
    newBtnGame.addEventListener('click', () => {
        startGame();
    });
    //obtenemos carta
    getBtnCard.addEventListener('click', () => {
        const card = getOneCard();
        //vamos a enviar el jugador y la carta para que sea creada
        const scorePlayer = countScore(card, 0);
        createCard(card, 0);
        if (scorePlayer > 21) {
            getBtnCard.disabled = true;
            stopBtnTurn.disabled = true;
            //turno de la maquina
            turnComputer(scorePlayer);
        } else if (scorePlayer === 21) {
            getBtnCard.disabled = true;
            stopBtnTurn.disabled = true;
            //turno de la maquina
            turnComputer(scorePlayer);
        }
        //Stop, turno de la compu
        stopBtnTurn.addEventListener('click', () => {
            getBtnCard.disabled = true;
            stopBtnTurn.disabled = true;
            turnComputer(scorePlayers[0])
        })
    });




})();