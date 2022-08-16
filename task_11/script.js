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
let resetBtn = document.querySelector('.reset-btn');
let gameActive = true;
let count = 1;

getMoves();

for (let i = 0; i < tile.length; i++) {
  tile[i].onclick = function() {
    if(!gameActive) return;
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

resetBtn.onclick = function() {
  reset();
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
  .then((response) => response.json());
}

function getMoves() {
  fetch('api.php?api-name=all-moves')
  .then((response) => response.json())
  .then((data) => {
    fillBoard(data, 'X');
    fillBoard(data, 'O');
  });
}

function fillBoard(data, symbol) {
  for(let move in data[symbol]) {
    let index = data[symbol][move]['move_tile_id'];
    moves[symbol].push(index);
    tile[index].innerHTML = symbol;
    count++;
  }
  check_win(moves[symbol], symbol);
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
  gameActive = true;
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
      gameActive = false;
      return true;
    } else {
      if(count > 8) {
        endGame();
      }
    }
  });
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

function endGame() {
  let message = 'Game over';
  messageElement.innerHTML = message;
}