function reset() {
  for (i = 0; i < tile.length; i++) {
    tile[i].innerHTML = '';
    tile[i].style.backgroundColor = null;
    count = 0;
  }
  messageElement.innerHTML = '';
  x_moves = [];
  o_moves = [];
}

function check_win(moves, player) {
  let has_won;
  win_comb.forEach(combination => { 
    has_won = combination.every(value => {
      return moves.includes(value);
    });

    if(has_won) {
      show_message(player);
      color_Tiles(combination);
      return true;
    } else {
      if(count > 8) {
        endGame();
      }
    }
  });
}

function endGame() {
  let message = 'Game over';
  messageElement.innerHTML = message;
}

function show_message(player) {
  let message = 'Player ' + player + ' has won!';
  messageElement.innerHTML = message;
}

function color_Tiles(combination) {
  combination.forEach(win_tile => {
    tile[win_tile].style.backgroundColor = '#542d0c';
  })
}

function make_move () {
  let min = 0;
  let max = 8;
  let random;

  do {
    random = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (tile[random].innerHTML != '')

  tile[random].innerHTML = 'O';
  o_moves.push(random);
  check_win(o_moves, 'O');
  count++;
}

let win_comb = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6],
];
let x_moves = [];
let o_moves = [];
let tile = document.querySelectorAll('.grid__tile');
let messageElement = document.querySelector('.message');
let count = 0;

for (i = 0; i < tile.length; i++) {
  tile[i].addEventListener('click', function() {
    if(this.innerHTML == '') {
      let index = Array.prototype.indexOf.call(tile, this);
      if ((count % 2) == 1) {
        // this.innerHTML = 'O';
        // o_moves.push(index);
        // check_win(o_moves, 'O');
      } else {
        this.innerHTML = 'X';
        x_moves.push(index);
        check_win(x_moves, 'X');
      }
      count++;
      if(count < 9) {
        make_move();
      }
    }
  });
}

