////////////////////////////////////////////////////////////////////////////////
//
// AbsoluteMark class
//
// Default mark is empty <div class="absolute-mark"> with left-top corner at marked position
//

const AbsoluteMark_defaultClass = "mark";

class AbsoluteMark {
	constructor(reference) { 
		this.element = this.makeElement();
		this.element["x-" + AbsoluteMark_defaultClass] = this; // Store mark object in DOM
		this.reference = reference;
	}
	makeElement() {
		let e = document.createElement("div");
		e.setAttribute("class", AbsoluteMark_defaultClass); 
		return e;
	}
	// pin - returns position of marked point relative to mark left-top corner
	pin() { 
		return {x: 0, y: 0}; 
	}
	mark(x, y) {
		let pin = this.pin(this);
		this.place(x-pin.x, y-pin.y);
		return this;
	}
	place(left, top) {
		this.element.style["position"] = "absolute";
		this.element.style["left"] = left + "px";
		this.element.style["top"] = top + "px";
		return this;
	}
	value() { 
		let pin = this.pin();
		let mark = this.element.getBoundingClientRect();
		let ref = this.reference.getBoundingClientRect();
		return { "x": mark.left + pin.x - ref.left, "y": mark.top + pin.y - ref.top }; 
	}
	static get(element) {
		return element["x-" + AbsoluteMark_defaultClass];
	}	
}

