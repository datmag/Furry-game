import Game from './game';

const game = new Game();

game.showCoin();
game.showFurry();
game.startGame();

document.addEventListener('keydown', event => game.turnFurry(event));