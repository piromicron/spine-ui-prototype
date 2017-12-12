////////////////////////////////////////////////////////////////////////////////
//
// AbsoluteMarker class

const AbsoluteMarker_defaultClass = "marker";

class AbsoluteMarker {
	constructor(element) {
		if(element)
			this.element = element;
		else
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
		let mark = this.makeMark();
		mark.mark(...args);
		this.element.appendChild(mark.element);
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