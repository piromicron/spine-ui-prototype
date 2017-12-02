/**
* Marker
*/

class Marker extends AbsoluteMarker {
	makeMark() {
		let mark = new Mark(this.element);
		$(mark.element).draggable();
		return mark;
	}
	markPoints(points) {
		for(let i=0; i < points.length; i++) {
			let point = points[i];
			console.log("Point #" + point.id + ": { x: "+ point.x+", y: "+ point.y + ", place: "+ point.place );
			this.mark(point.x, point.y,  point.id, point.place);
		}
	}
}
