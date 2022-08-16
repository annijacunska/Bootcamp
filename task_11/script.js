let resetBtn = document.querySelector('.reset-btn');

resetBtn.onclick = function() {
  reset();
}

function reset() {
  for (let i = 0; i < tile.length; i++) {
    tile[i].innerHTML = '';
    tile[i].style.backgroundColor = null;
    count = 1;
  }
  messageElement.innerHTML = '';
  moves = {
    'X': [],
    'O': []
  }
  fetch('api.php?api-name=reset-moves')
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
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
      if(count > 9) {
        endGame();
      }
    }
  });
}

// function endGame() {
//   let message = 'Game over';
//   messageElement.innerHTML = message;
// }

function show_message(player) {
  let message = 'Player ' + player + ' has won!';
  messageElement.innerHTML = message;
}

function color_Tiles(combination) {
  combination.forEach(win_tile => {
    tile[win_tile].style.backgroundColor = '#542d0c';
  })
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
let player = 'X';
let moves = {
  'X': [],
  'O': []
}
let tile = document.querySelectorAll('.grid__tile');
let messageElement = document.querySelector('.message');
let count = 1;

getMoves();

for (let i = 0; i < tile.length; i++) {
  tile[i].onclick = function() {
    if(this.innerHTML == '') {
      let index = Array.prototype.indexOf.call(tile, this);
      player = ((count % 2) == 1) ? 'X' : 'O';

      this.innerHTML = player;
      saveMove(player, index);
      moves[player].push(index);
      check_win(moves[player], player);
      count++;
      if(count < 10) {
        // make_move();
      }
    }
  }
}

function saveMove(player, id) {
  let info = {
    'id': id,
    'player': player
  }
  fetch('api.php?api-name=make-move', {
    method: 'POST',
    body: JSON.stringify(info)
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
}

function getMoves() {
  fetch('api.php?api-name=all-moves')
  .then((response) => response.json())
  .then((data) => {
    // for(let move in data['x_moves']) {
      // let index = move['move_tile_id'];
      // console.log(move);
      // moves['X'].push(index);
    // }
    // console.log(moves);
  });

  fillBoard();
}

function fillBoard() {

}