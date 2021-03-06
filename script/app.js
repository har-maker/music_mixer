(() => {
	
	
	
	var musicSrc = ["music/bestOfBest.mp3", "music/eventually.mp3", "music/long.mp3", "music/ringtone.mp3", "music/when.mp3"];
	var myMusic = new Audio();
	var soundCounter = 0;
	
	// set up the puzzle pieces and boards
	const puzzleButtons = document.querySelectorAll('#buttonHolder img'),
		puzzlePieces = document.querySelectorAll('.puzzle-pieces img'),
		dropZones = document.querySelectorAll('.drop-zone'),
		gameBoard = document.querySelector('.puzzle-board');

	const pieceNames = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];

	function changeImageSet() {
		// change all the image elements on the page -> draggable image sources
		// change the image elements on the left to match the selected puzzle
		pieceNames.forEach((piece, index) => {
			puzzlePieces[index].src = `images/${piece + this.dataset.puzzleref}.jpg`;
			puzzlePieces[index].id = `${piece + this.dataset.puzzleref}`;
		});
		console.log(puzzlePieces[index].src);
		

		// and set the drop zone background image based on the puzzle the user selects
		gameBoard.style.backgroundImage = `url(images/backGround${this.dataset.puzzleref}.jpg)`;


		// debugger;
	}
	function allowDrag(event) {
		console.log('started dragging an image');

		event.dataTransfer.setData('text/plain', this.id);
	}
	function allowDragOver(event) {
		event.preventDefault();
		console.log('dragged over a drop zones');
	}
	function allowDrop(event) {
		// event.preventDefault();
		console.log('dropped on a drop zone');

		

		// go and get the dragged element's ID frm the data transfer object
		let currentImage = event.dataTransfer.getData('text/plain');
		console.log(currentImage);

		elem = document.createElement('img');
		elem.setAttribute('src', currentImage);
		elem.setAttribute('height', '100%');
		elem.setAttribute('width', 'auto');
		// add that image to whatever drop zone  we're dropping our image on
		event.target.appendChild(elem);
		// event.target.appendChild(document.querySelector(`${currentImage}`));
		
		if(soundCounter < musicSrc.length){
			myMusic.pause();
			myMusic = new Audio(musicSrc[soundCounter]);
			myMusic.loop = true;
			myMusic.play();
			soundCounter++;
			if(soundCounter == musicSrc.length){
				soundCounter = 0;
			}
		}
	}

	//add event handling here -> how is the user going to use our app?
	// what triggers do we need?
	// click on the bottom buttons to change the puzzle image we're working with
	puzzleButtons.forEach((button) =>
		button.addEventListener('click', changeImageSet)
	);

	puzzlePieces.forEach((piece) =>
		piece.addEventListener('dragstart', allowDrag)
	);

	dropZones.forEach((zone) => {
		zone.addEventListener('dragover', allowDragOver);
		zone.addEventListener('drop', allowDrop);
	});

	// call the function and pass in the first nav button as a reference
	// research call, apply and bind -> look at MDN
	changeImageSet.call(puzzleButtons[0]);
})();
function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.setData('text', ev.target.id);
}

function drop(ev) {
	ev.preventDefault();
	var data = ev.dataTransfer.getData('text');
	ev.target.appendChild(document.getElementById(data));
}
