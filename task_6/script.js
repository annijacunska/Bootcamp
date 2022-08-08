let board = document.querySelector('.grid');
let tiles = board.children;
// let tile_coords = [10][10];

let tile_coords = [...Array(10)].map(e => Array(10));


let reset_btn = document.querySelector('.reset-btn');
let messageElement = document.querySelector('.message');
let symbol = 'X';

for (let i = 0; i < 100; i++) {
  let tile = document.createElement('a');
  tile.setAttribute('class', 'grid__tile');
  tile.setAttribute('href', '#');
  // tile.textContent = i;
  board.appendChild(tile);
}

let x = 0;
// Create 2d array
for (let i = 0; i < 100; i += 10) {
  let sliced = Array.prototype.slice.call(tiles, i, i+10);
  tile_coords[x] = sliced;
  let y = 0;
  for(let tile of tile_coords[x]) {
    tile.textContent = x + ';' + y;
    y++;
  }
  x++;
}

board.onclick = function(event) {
  event.preventDefault();
  if(event.target.tagName == 'DIV') return;

  let tile = event.target;
  // if (tile.textContent != '') return;


  let index = Array.prototype.indexOf.call(tiles, tile);
  if (index < 90 && tiles[index + 10].textContent == '') return;

  tile.textContent = symbol;
  check_win(tile)
  symbol = (symbol == 'X') ? 'O' : 'X';
};

reset_btn.onclick = function (event) {
  event.preventDefault();
  resetGame();
};

function get_coords(tile) {
  for (let i = 0; i < tile_coords.length; i++) {
    let row = tile_coords[i];
    let index = Array.prototype.indexOf.call(row, tile);

    if(index != -1) {
      console.log(i + ',' + index);
      // return [i, index];
    }
  }
}

function check_win(tile) {

  let coords = get_coords(tile);

  //TO DO - finish funct 
  if (
    tile_coords[coords[0]][coords[1] + 1] 

  ) {

  }

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

function resetGame() {
  for (let tile of board.children) {
    tile.textContent = '';
    symbol = 'X';
    displayMessage('');
  }
}

function displayMessage(message) {
  messageElement.textContent = message;
}


