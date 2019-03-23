/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(1);


const game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */]();

game.showCoin();
game.showFurry();
game.startGame();

document.addEventListener('keydown', event => game.turnFurry(event));

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__furry__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__coin__ = __webpack_require__(3);



class Game {
    constructor() {
        this.board = document.querySelectorAll("#board div");
        this.furry = new __WEBPACK_IMPORTED_MODULE_0__furry__["a" /* default */]();
        this.coin = new __WEBPACK_IMPORTED_MODULE_1__coin__["a" /* default */]();
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
                this.coin = new __WEBPACK_IMPORTED_MODULE_1__coin__["a" /* default */]();
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
                this.coin = new __WEBPACK_IMPORTED_MODULE_1__coin__["a" /* default */]();
                this.showCoin();
                return this.furry = new __WEBPACK_IMPORTED_MODULE_0__furry__["a" /* default */]();
            };
        };
    }

}

/* harmony default export */ __webpack_exports__["a"] = (Game);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Furry {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.direction = "right";
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Furry);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Coin {
    constructor() {
        this.x = Math.floor(Math.random() * 10);
        this.y = Math.floor(Math.random() * 10);
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Coin);

/***/ })
/******/ ]);