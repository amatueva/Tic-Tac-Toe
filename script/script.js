const board = document.querySelectorAll('.board');
let counter = 0;
let crossesMoves = [];
let knotsMoves = [];
const winningCombinations = [["1","2","3"],["4","5","6"],["7","8" , "9"], ["1", "5", "9"], ["3", "5", "7"], ["1", "4","7"], ["2", "5", "8"], ["3", "6", "9"]];
let winner;
let knotsWin = 0;
let crossesWin = 0;
let numberOfMoves;
const button = document.getElementById('close');
let player1;
let player2;

board.forEach(function(element) {
	element.addEventListener('click', todoClickHandler);
});
var myVar;
	

function todoClickHandler(event) {
    clearTimeout(myVar);
    console.log(event.target);
	if (event.target.childNodes.length == 1) {
		counter++;
		if (counter % 2 == 0) {
			setTimer();
			var cross = document.createElement('img');
			cross.setAttribute('src', 'img/o.png');
			event.target.appendChild(cross);
			crossesMoves.push(event.target.id);
			checkCombination (crossesMoves, winningCombinations);
			if (winner=="Winner"){
				knotsWin++;
				alert('Winner is player1');
				cleanTheBoard();
				totalWins();
			}
			if (knotsMoves.length + crossesMoves.length == 9 && winner!="Winner") {
				alert('You both lost');
				cleanTheBoard();
				totalWins();
			}
		} else {
			setTimer();
			var knot = document.createElement('img');
			knot.setAttribute('src', 'img/x.png');
			event.target.appendChild(knot);
			knotsMoves.push(event.target.id);
			checkCombination (knotsMoves, winningCombinations);
			if (winner=="Winner"){
				crossesWin++;
				alert('Winner is player2');
				cleanTheBoard();
				totalWins();
			}
			if (knotsMoves.length + crossesMoves.length == 9 && winner!="Winner") {
				alert('You both lost');
				cleanTheBoard();
				totalWins();
			}
		}
	} else {
		alert('dont click cells twice, you idiot');
	}
}

window.onload = function () {
	writeOnPanel(knotsWin, ".panel1");
	writeOnPanel(crossesWin, ".panel2");
};

function totalWins () {
	    writeOnPanel(knotsWin, ".panel1");
		writeOnPanel(crossesWin, ".panel2");
	}

function writeOnPanel (text, whatPanel) {
	let line = document.createElement('p');
	let panel = document.querySelector(whatPanel);
	panel.appendChild(line);
	line.textContent = text;
}

function cleanTheBoard () {
	let images = document.getElementsByTagName('img');
	while(images.length > 0) {
    images[0].parentNode.removeChild(images[0]);
	}
	let text = document.getElementsByTagName('p');
	while(text.length > 0) {
		text[0].parentNode.removeChild(text[0]);
	}
	crossesMoves = [];
	knotsMoves = [];
	counter = 0;
	winner = 0;
}


function checkCombination (whatToCheck, winningCombinations) {
	
	for (let i=0; i<winningCombinations.length; i++) {
		let counter1 = 0;
		for (let k=0; k<3; k++){
			if(whatToCheck.indexOf(winningCombinations[i][k]) != -1) {
				counter1++;
			}
			if (counter1 == 3) {
				winner = "Winner";
				whatToCross = winningCombinations[i];
			}
		}
	}
}

function setTimer() {
	if (document.getElementById('2').checked) {
	document.getElementById('timer').innerHTML = 3;
	startTimer();
	} else if (document.getElementById('5').checked) {
	document.getElementById('timer').innerHTML = 6;
	startTimer();
	} else {
	document.getElementById('timer').innerHTML = "&#8734;";
	}
}

function startTimer() { 

		if (document.getElementById('timer').innerHTML>0) {
		document.getElementById('timer').innerHTML--;
		myVar = setTimeout(startTimer, 1000);
		} else {
		counter++;
		alert('times up! you lost your move');
		}
	
}
// Get the modal
var modal = document.getElementById('myModal');

// When the user clicks on the button, open the modal 
window.onload = function() {
    modal.style.display = "block";
};

// When the user clicks anywhere outside of the modal, close it
button.onclick = function() {
	player1 = document.getElementById('name1').value;
	player2  = document.getElementById('name2').value;
    modal.style.display = "none";
    if (player1 && player2) {
    writeOnPanel(player1, ".playerName1");
    writeOnPanel(player2, ".playerName2");
}
};
