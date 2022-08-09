let board = document.querySelector('.grid');
let tiles = board.children;
// let tile_coords = [...Array(10)].map(e => Array(10));

let reset_btn = document.querySelector('.reset-btn');
let messageElement = document.querySelector('.message');
let symbol = 'X';
let gameActive = false;

addCells();

// for (let i = 0; i < 100; i++) {
//   let tile = document.createElement('a');
//   tile.setAttribute('class', 'grid__tile');
//   tile.setAttribute('href', '#');
//   // tile.textContent = i;
//   board.appendChild(tile);
// }

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
//   // if (tile.textContent != '') return;


//   let index = Array.prototype.indexOf.call(tiles, tile);
//   if (index < 90 && tiles[index + 10].textContent == '') return;

//   tile.textContent = symbol;
//   check_win(tile)
//   symbol = (symbol == 'X') ? 'O' : 'X';
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
  if (
    checkLine(r, c, 0, -1, 0, 1) ||
    checkLine(r, c, 1, 0) ||
    checkLine(r, c, 1, 1, -1, -1) ||
    checkLine(r, c, 1, -1, -1, 1)
  ) {
    return true;
  }

  return false;

  // let coords = get_coords(tile);

  // //TO DO - finish funct 
  // if (
  //   tile_coords[coords[0]][coords[1] + 1] 

  // ) {

  // }

  // console.log(index-1);

  // if (
  //   tiles[index-1].textContent == symbol &&
  //   tiles[index-2].textContent == symbol &&
  //   tiles[index-3].textContent == symbol
  // ) {
  //   console.log('Win');
  //   return true;
  // }

  // if (
  //   tiles[index+1].textContent == symbol &&
  //   tiles[index+2].textContent == symbol &&
  //   tiles[index+3].textContent == symbol
  // ) {
  //   console.log('Win');
  //   return true;
  // }
}

function checkLine(r, c, y1, x1, y2 = 0, x2 = 0) {
  let counter = 0;
  counter += countMatches(r, c, y1, x1);

  if(y2 != 0 && x2 != 0) {
    counter += countMatches(r, c, y2, x2);
  }

  if (counter >= 3) {
    gameActive = false;
    return true;
  }
}

function countMatches(r, c, y_diff, x_diff) {
  let count_matches = 0;
  for (let i = 0; i <= 2; i++) {
      c += x_diff;
      r += y_diff;
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