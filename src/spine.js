

/**
* Templates
*/

function pointTemplate_Front_LR() {
	let vertebraLabels = ["C5","C6","C7","Th1","Th2","Th3","Th4","Th5","Th6","Th7"];

	let points = {

		"test": {
			x: 0,
			y: 0,
			place: "center"
		},
	};

	const minY=400;
	const maxY=1700;
	const cX=1060;
	const dX=110;
	const dY = (maxY-minY)/vertebraLabels.length;

	//right is on the left on image
	for( let i=0; i < vertebraLabels.length; i++ ) {
		points[vertebraLabels[i]+"c"] = { "y": minY+dY*i, "x": cX, place: "center" };
		points[vertebraLabels[i]+"r"] = { "y": minY+dY*i, "x": cX-dX, place: "right" };
		points[vertebraLabels[i]+"l"] = { "y": minY+dY*i, "x": cX+dX, place: "left" };
	}

	return { "width": 2130, "height": 1542, "points": points  }
} 

function scalePointMap(pmap, width, height) {
	return pmap;
}

function makePointsFromTemplate(width, height) {
	return scalePointMap(pointTemplate_Front_LR()).points;
}

/*
* Mark
*/
class Mark extends AbsoluteMark { 
	makeElement() {
		let svg = $("svg#vertebra-point-template").get(0).cloneNode(true)//.clone()
			//.attr( "id", pointid)
			//.addClass("vertebra-point set " + point.place)
			;
		//let div = $(svg).wrap("<div id=\"div_"+pointid+"\" style=\""+style+"\"></div>").parent(); 
		let div = super.makeElement();

		//TODO: fix absolute mark then put it back from .mark
		//div.style["width"] = 90;
		//div.style["height"] = 90;


		div.appendChild(svg)
		//let labelElemeent = $(svg).find("text").get(0);
		//let labelClass = "svg-label-"+ point.place;
		//$(svg).find("text").each(function () { $(this).html(pointid); $(this).addClass(labelClass); });                     
		//return div;
		return div;	
	}
	pin() {
		const centerOfPointImage = (40*90/150);//+1; //TODO: why?!        
		return {x: centerOfPointImage, y: centerOfPointImage}; 
	}
	mark(x, y, pointId, pointClass) {
		super.mark(x,y);
		this.element.setAttribute("id", pointId);
		//TODO: fix absolute mark then move it to createElemeent
		this.element.style["width"] = 90;
		this.element.style["height"] = 90;
		let svg = $(this.element).find("svg").get(0);
		let labelElemeent = $(svg).find("text").get(0);
		let labelClass = "svg-label-"+ pointClass;
		$(svg).find("text").each(function () { $(this).html(pointId); $(this).addClass(labelClass); });                     
		// pointClass is not a part of mark value
		this.element.className += " vertebra-point set " + pointClass;
	}
	value() { 
		let value = super.value();
		value["id"] = this.element.id;
		return value; 
	}
}

/**
* Marker
*/



class Marker {
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

	markPoints(points) {
		for(var pointid in points) {
			let point = points[pointid];
			console.log("Point #" + pointid + ": { x: "+ point.x+", y: "+ point.y + ", place: "+ point.place );
			this.set(pointid,point);
		}
	}
}

/**
* Editor
*/


class Editor {
	open(url) {
		this.loadImage(url);
	}
	loadImage(url) {
		this.$image().load( function() {
			console.log("Image loaded.");
			Editor.getEditor().imageLoaded();
		});
		this.$image().attr("src", url );
	}
	imageLoaded() {
		let points = makePointsFromTemplate();
		new Marker().markPoints(points);
		this.scrollToStart();
	}
	scrollToStart() {
		let imageWidth = this.$image().width();
		let imageHeight = this.$image().height();
		if( $(window).width() < imageWidth ) {
			this.$image().scrollLeft((imageWidth-$(window).width())/2);
		}
		if( $(window).height() < imageHeight ) {
			this.$image().scrollTop(0.06*$(window).height());
		}
	}
	$image() {
		return $("img#theimage");
	}

	static getEditor() {
		return Editor_theEditor; 
	}
}

var Editor_theEditor = new Editor();


const imageURL = "IMG-0001-00001.jpg";
Editor_theEditor.open(imageURL);
