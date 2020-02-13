// variables

var grid = [ 
	[null, null, null],
	[null, null, null],
	[null, null, null]
];

// var grid creates a 9 tiles grid

var players = ['X','O'];  // what are the players
var colors = ['#7fffd4', '#8b008b'];  // each player color  
var indice = parseInt(Math.random() * 2);  // chose randomly what player will start the game
var player = players[indice];
var winner = undefined; 

var tilesLeft = 9;  // the number of tiles remaining

var currentPlayer = document.querySelector('#player');  // who is the current player
var result = document.querySelector('#winner');  // the result of the game
var tiles = document.querySelectorAll('td');

currentPlayer.style.color = colors[indice];
currentPlayer.innerHTML = player;

tiles.forEach(function (tile) {
	tile.addEventListener('click', play);
});

// functions

function play()
{
	if(this.innerHTML == '') {
		tileId = this.id;
		carth = tileId.replace(/[a-z]/, '');

		coordX = carth[0];
		coordY = carth[1];

		grid[coordX][coordY] = player;
		this.innerHTML = player;

		if (player == 'X') {
			this.style.color = colors[0];
			player = 'O';
		} else {
			this.style.color = colors[1];
			player = 'X';
		};

		tilesLeft--;

		currentPlayer.style.color = colors[players.indexOf(player)];
		currentPlayer.innerHTML = player;

		check ();
	};
};

function check ()
{
	var cond1 = false;
	var cond2 = false;
	var cond3 = false;
	var cond4 = false;

	for (r = 0; r < 3; r++) {
		//horizontal matches
		if (grid[r][0] != null) {
			cond1 = grid[r][0] == grid [r][1] && grid [r][0] == grid[r][2];

			if (cond1 == true) {
				winner = grid[r][0];
				end();
				return;
			};
		};
	};

	for (c = 0; c < 3; c++) {
		if (grid[0][c] != null) {
			cond2 = grid[0][c] == grid[1][c] && grid[0][c] == grid[2][c];

			if (cond2 == true) {
				winner = grid[0][c];
				end();
				return;
			};
		};
	};

	if (grid[1][1] != null) {
		//diagonal matches
		cond3 = grid[0][0] == grid[1][1] && grid[0][0] == grid[2][2];
		cond4 = grid[0][2] == grid[1][1] && grid[0][2] == grid[2][0];

		if (cond3 == true || cond4 == true) {
			winner = grid[1][1];
			end();
			return;
		};
	};

	if(tilesLeft == 0) {
		end();
	};
};

function end()
{
	tiles.forEach(function (tile) {
		tile.removeEventListener('click', play);
	});

	if (winner == undefined) {
		result.style.color = '#ff0000';
		result.innerHTML = 'Draw';
	} else {
		result.style.color = colors[players.indexOf(winner)];
		result.innerHTML = winner;
	};

	return;
};