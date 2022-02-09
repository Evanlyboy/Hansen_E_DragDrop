(() => {
	// make the connections to the elements on the page
	// that we want the user to interact with
	const theButtons = document.querySelectorAll("#buttonHolder img"),
		puzzlePieces = document.querySelectorAll(".puzzle-pieces *"),
		dropZones = document.querySelectorAll(".drop-zone"),
		theGameBoard = document.querySelector(".puzzle-board");
		theLink = document.querySelector("a");

		theLink.addEventListener("click", function(event) { event.preventDefault();})

	// theButtons become this:
	// [
	// <img>
	// <img>
	// <img>
	// <img>
	// ]

	function changeBgImg() {
		// debugger; //pause our code at this point
		let key = this.dataset.bgref;
		console.log(key);

		theGameBoard.style.backgroundImage = `url(../images/backGround${key}.jpg)`;

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
		this.appendChild(document.querySelector(`#${currentEl}`));
		// console.log(`dropped this element:`, currentEl);
	}

	// these are the "triggers" we want the user to use to fire off events
	theButtons.forEach(button => button.addEventListener("click", changeBgImg));
	puzzlePieces.forEach(piece => piece.addEventListener("dragstart", startDrag));
	dropZones.forEach(zone => {
		zone.addEventListener("dragover", draggedOver);
		zone.addEventListener("drop", handleDrop);
	});
})();
