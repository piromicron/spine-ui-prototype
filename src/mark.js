/*
* Mark
*/
class Mark extends AbsoluteMark { 
	makeElement() {
		let svg = $("svg#vertebra-point-template").get(0).cloneNode(true);
		let div = super.makeElement();
		div.style["width"] = 90;
		div.style["height"] = 90;
		div.appendChild(svg)
		return div;	
	}
	pin() {
		const centerOfPointImage = (40*90/150);//+1; //TODO: why?!        
		return {x: centerOfPointImage, y: centerOfPointImage}; 
	}
	mark(x, y, pointId, pointClass) {
		super.mark(x,y);
		this.element.setAttribute("id", pointId);
		let svg = $(this.element).find("svg").get(0);
		let labelElemeent = $(svg).find("text").get(0);
		let labelClass = "svg-label-"+ pointClass;
		$(svg).find("text").each(function () { $(this).html(pointId); $(this).addClass(labelClass); });                     
		// pointClass is not a part of mark value
		this.element.className += " vertebra-point set " + pointClass;
		return this;
	}
	value() { 
		let value = super.value();
		value["id"] = this.element.id;
		return value; 
	}
}

