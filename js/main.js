(() => {
	// make the connections to the elements on the page
	// that we want the user to interact with
	const theButtons = document.querySelectorAll("#buttonHolder img"),
		puzzlePieces = document.querySelectorAll(".puzzle-pieces *"),
		dropZones = document.querySelectorAll(".drop-zone"),
		theGameBoard = document.querySelector(".puzzle-board");
		theLink = document.querySelector("a")
		dragZone =document.querySelector("b");

		const piecePaths = ["topLeft", "topRight", "bottomLeft", "bottomRight"];

		theLink.addEventListener("click", function(event) { event.preventDefault();})

	// theButtons become this:
	// [
	// <img>
	// <img>
	// <img>
	// <img>
	// ]


	//first we're gonna prevent objects from stacking on one another
	//best way to do this I think is to make an if statement, stating that
	//if (element) has (child) then don't do thing, otherwise do thing
	function changeImageSet() {
		// debugger; //pause our code at this point
		theGameBoard.style.backgroundImage = `url(../images/backGround${this.dataset.bgref}.jpg)`;

		piecePaths.forEach((piece, index) => {
			puzzlePieces[index].src = `images/${piece + this.dataset.bgref}.jpg`
		})

		// `` => this is a javascript template string. You can use it to write a but of inline JavaScript while will be interpreted at runtime
		// search for MDN JavaScript Template String
	}

	function startDrag(event) {
		// console.log("started dragging");
		// save a reference to the element we're dragging
		event.dataTransfer.setData("draggedElement", event.target.id);
	}

	function draggedOver(event) {
		// event is the user event (a click, a drag, a drop)
		// some elements have default behavior (like an anchor tag) -> we need to block that behavior
		// and script our own
		// that's what event.preventDefault() does -> override the default behavior (block it)
		event.preventDefault();
		// console.log("dragged over me");
	}

	function handleDrop(event) {
		event.preventDefault();
		console.log("dropped on me");
		let currentEl = event.dataTransfer.getData("draggedElement");
		// appendChild (add child) is a built-in JavaScript method that adds an element to a containing element
		// the "this" keyword is a ref to a the element you're dropping onto

		//HAHA BITCH FINALLY GOT IT WORKING
		//childElementCount for the win
		if(this.childElementCount == 0){
			this.appendChild(document.querySelector(`#${currentEl}`));
		}
		else {
			console.log(this.childElementCount);
		}
		// console.log(`dropped this element:`, currentEl);
	}

	// these are the "triggers" we want the user to use to fire off events
	theButtons.forEach(button => button.addEventListener("click", changeImageSet));

	puzzlePieces.forEach(piece => piece.addEventListener("dragstart", startDrag));

	dropZones.forEach(zone => {
		zone.addEventListener("dragover", draggedOver);
		zone.addEventListener("drop", handleDrop);
	});
})();
