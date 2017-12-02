/**
* Marker
*/



class Marker extends AbsoluteMarker {
	constructor() {
		super();
		//super($("div#image").get(0));
		//this.element = $("div#image").get(0); //TODO: remove hotfix 
	}
	makeMark() {
		let mark = new Mark(this.element);
		$(mark.element).draggable();
		return mark;
	}

	/*
	createMark(pointid, point) {
		let mark = new Mark();
		mark.mark(point.x,point.y, pointid, point.place);
		return mark.element;
	}

	set(pointid, point) {
		let element = this.createMark(pointid, point);
		$("div#image").append(element);
		$(element).draggable();    
	}
	*/
	markPoints(points) {
		/*
		for(var pointid in points) {
			let point = points[pointid];
			console.log("Point #" + pointid + ": { x: "+ point.x+", y: "+ point.y + ", place: "+ point.place );
			this.mark(point.x, point.y,  pointid, point.place);
		}
		*/
		for(let i=0; i < points.length; i++) {
			let point = points[i];
			console.log("Point #" + point.id + ": { x: "+ point.x+", y: "+ point.y + ", place: "+ point.place );
			this.mark(point.x, point.y,  point.id, point.place);
		}
	}
}
