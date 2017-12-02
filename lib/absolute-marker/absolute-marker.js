////////////////////////////////////////////////////////////////////////////////
//
// AbsoluteMarker class

const AbsoluteMarker_defaultClass = "marker";

class AbsoluteMarker {
	constructor() {
		this.element = this.makeElement();
		this.element["x-" + AbsoluteMarker_defaultClass] = this;
	} 
	makeElement() {
		let e = document.createElement("div");
		e.setAttribute("class", AbsoluteMarker_defaultClass); 
		return e;
	}
	makeMark() {
		return new AbsoluteMark(this.element);
	}
	mark(...args) { // x, y, ...
		this.element.appendChild(this.makeMark().mark(...args).element);
	}
	marks() {
		let marks = []; 
		for (let i = 0; i < this.element.childNodes.length; i++) {
			let markElement = this.element.childNodes[i];
	  		marks.push(AbsoluteMark.get(markElement));
	  	}
	  	return marks;
	}
	values() {
		return this.marks().map(function(e){return e.value();});
	}
	static get(element) {
		return element["x-" + AbsoluteMarker_defaultClass];
	}
}