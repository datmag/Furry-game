import Furry from './furry';
import Coin from './coin';

class Game {
    constructor() {
        this.board = document.querySelectorAll("#board div");
        this.furry = new Furry();
        this.coin = new Coin();
        this.score = 0;
        this.points = document.querySelector("#score strong");
        
        this.index = (x, y) => x + (y * 10);

        this.showFurry = () => {
    
            this.hideVisibleFurry();
            this.board[ this.index(this.furry.x,this.furry.y) ].classList.add('furry');
        };
    
        this.showCoin = () => this.board[ this.index(this.coin.x,this.coin.y) ].classList.add('coin');
        
        this.moveFurry = () => { 
    
            if(this.furry.direction === "right") {
                this.furry.x++;
            } else if (this.furry.direction === "down") {
                this.furry.y++;
            } else if (this.furry.direction === "left") {
                this.furry.x--;
            } else if (this.furry.direction === "up") {
                this.furry.y--;
            }
    
            this.checkCoinCollision();
            this.gameOver();
            this.showFurry();
        };
    
        this.startGame = () => {

            var idSetInterval = setInterval(() => {
                this.moveFurry();   
            }, 250);
            return idSetInterval;
        };
    
        this.hideVisibleFurry = () => {
    
            for (var i = 0; i < this.board.length; i++) {
                this.board[i].classList.remove("furry");
            }
        };
    
        this.turnFurry = event => {
    
            switch (event.which) {
                case 37:
                    this.furry.direction = 'left';
                    break;
                case 38:
                    this.furry.direction = 'up';
                    break;
                case 39:
                    this.furry.direction = 'right';
                    break;
                case 40:
                    this.furry.direction = 'down';
                    break;
            };  
        };
    
        this.checkCoinCollision = () => {
    
            if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {

                this.board[ this.index(this.coin.x,this.coin.y) ].classList.remove('coin');
                this.score++;
                this.points.innerHTML = this.score;
                this.coin = new Coin();
                this.showCoin();
            };
        };
    
        this.gameOver = () => {
            
            if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
    
                clearInterval(this.idSetInterval);
                this.hideVisibleFurry();
    
                if (this.score === 1 || this.score === 0) {
                    alert('KONIEC GRY!!! Zdobyłeś ' + this.score + ' punkt.' + ' Serio? xD xD xD');
                } else if (this.score > 1 && this.score <= 4) {
                    alert('KONIEC GRY!!! Zdobyłeś ' + this.score + ' punkty.');
                } else if (this.score < 10) {
                    alert('KONIEC GRY!!! Zdobyłeś ' + this.score + ' punkty.' + ' Brawo!');
                } else {
                    alert('KONIEC GRY!!! Zdobyłeś ' + this.score + ' punktów.' + ' Naprawdę Ci się chciało? Idź lepiej pograć w Golden Axe czy coś... Nolifie ;)');
                };
                
                this.score = 0;
                this.points.innerHTML = this.score;
                this.board[ this.index(this.coin.x,this.coin.y) ].classList.remove('coin');
                this.coin = new Coin();
                this.showCoin();
                return this.furry = new Furry();
            };
        };
    }

}

export default Game;