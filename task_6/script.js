import FourInARow from "./FourInARow.js";

//TODO Add all to class FourInARow

let board = document.querySelector('.grid');
let tiles = board.children;
// let tile_coords = [...Array(10)].map(e => Array(10));

let reset_btn = document.querySelector('.reset-btn');
let messageElement = document.querySelector('.message');
let symbol = 'X';
let gameActive = false;

addCells();

// let x = 0;
// // Create 2d array
// for (let i = 0; i < 100; i += 10) {
//   let sliced = Array.prototype.slice.call(tiles, i, i+10);
//   tile_coords[x] = sliced;
//   let y = 0;
//   for(let tile of tile_coords[x]) {
//     tile.textContent = x + ';' + y;
//     y++;
//   }
//   x++;
// }

// board.onclick = function(event) {
//   event.preventDefault();
//   if(event.target.tagName == 'DIV') return;

//   let tile = event.target;
//   if (tile.textContent != '') return;

//   let index = Array.prototype.indexOf.call(tiles, tile);
//   if (index < 90 && tiles[index + 10].textContent == '') return;

// };

reset_btn.onclick = function (event) {
  event.preventDefault();
  resetGame();
};

function addCells() {
  gameActive = true;
  for(let r = 0; r < 10; r++) {
    for(let c = 0; c < 10; c++) {
      let tile = document.createElement('a');
      tile.setAttribute('class', 'grid__tile');
      tile.setAttribute('href', '#');
      board.appendChild(tile);

      tile.onclick = function (event) {
        event.preventDefault();
        if (gameActive == false) return;
        if (this.textContent != '') return;
        if (r < 9 && !getCellValue(r + 1, c)) return;
        this.textContent = symbol;
        if (checkWin(r, c)) {
          displayMessage('Winner is ' + symbol + '!');
        }
        symbol = (symbol == 'X') ? 'O' : 'X';
        make_move();
      }

    }
  }
}

function getCellValue (r, c) {
  if (r > 9 || r < 0 || c > 9 || c < 0) return '';
  let id = '' + r + c;
  id = Number(id);
  return tiles[id].textContent;
}

// function get_coords(tile) {
//   for (let i = 0; i < tile_coords.length; i++) {
//     let row = tile_coords[i];
//     let index = Array.prototype.indexOf.call(row, tile);

//     if(index != -1) {
//       console.log(i + ',' + index);
//       // return [i, index];
//     }
//   }
// }

function checkWin(r, c) {
  let up = -1;
  let down = 1;
  let right = 1;
  let left = -1;
  // let array = [
  //   [[0, left], [0, right]]
  // ]

  if (
    checkLine(r, c, [0, left], [0, right]) ||
    checkLine(r, c, [down, 0], [up, 0]) ||
    checkLine(r, c, [down, right], [up, left]) ||
    checkLine(r, c, [down, left], [up, right])
  ) {
    return true;
  }

  return false;
}


// js arguments[0], atkarībā no padoto argumentu skaita
function checkLine(r, c, vector1, vector2 = null) {
  let counter = 0;
  counter += countMatches(r, c, vector1);
  counter += countMatches(r, c, vector2);


  // if(y2 != 0 && x2 != 0) {
  // }

  if (counter >= 3) {
    gameActive = false;
    return true;
  }
}

function countMatches(r, c, vector) {
  let count_matches = 0;
  for (let i = 0; i <= 2; i++) {
    r += vector[0];
    c += vector[1];

      if (getCellValue(r, c) != symbol) {
        return count_matches;
      }
      count_matches++;
  }

  return count_matches;
}

function resetGame() {
  for (let tile of board.children) {
    tile.textContent = '';
    symbol = 'X';
    gameActive = true;
    displayMessage('');
  }
}

function displayMessage(message) {
  messageElement.textContent = message;
}

function make_move () {
  let min = 0;
  let max = 9;
  let r = 10;

  let random_column = Math.floor(Math.random() * (max - min + 1)) + min;

  do {
    r--;
    if (r < 0) {
      random_column = Math.floor(Math.random() * (max - min + 1)) + min;
      r = 9;
    }
  } while (getCellValue(r, random_column) != '')

  fillCell(r, random_column);
}

function fillCell(r, c) {
  let id = '' + r + c;
  id = Number(id);
  if (!gameActive) return;
  tiles[id].textContent = symbol;

  if (checkWin(r, c)) {
    displayMessage('Winner is ' + symbol + '!');
  }
  symbol = (symbol == 'X') ? 'O' : 'X';
}