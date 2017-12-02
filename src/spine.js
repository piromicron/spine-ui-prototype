

/**
* Templates
*/

var poinsTemplateJson_front_lr = '{\
"width": 2130, "height": 1542, "points": [\
  {\
    "x": 1072,\
    "y": 422,\
    "id": "C5.c"\
  },\
  {\
    "x": 962.9895935058594,\
    "y": 355.9895820617676,\
    "id": "C.r"\
  },\
  {\
    "x": 1171,\
    "y": 345.97916412353516,\
    "id": "C.l"\
  },\
  {\
    "x": 1074,\
    "y": 529,\
    "id": "C6.c"\
  },\
  {\
    "x": 957.9895935058594,\
    "y": 478.98958587646484,\
    "id": "C.r"\
  },\
  {\
    "x": 1182,\
    "y": 491,\
    "id": "C.l"\
  },\
  {\
    "x": 1064,\
    "y": 666,\
    "id": "C7.c"\
  },\
  {\
    "x": 958,\
    "y": 609,\
    "id": "C.r"\
  },\
  {\
    "x": 1191,\
    "y": 604,\
    "id": "C.l"\
  },\
  {\
    "x": 1076,\
    "y": 788,\
    "id": "Th1.c"\
  },\
  {\
    "x": 955,\
    "y": 725,\
    "id": "Th.r"\
  },\
  {\
    "x": 1191,\
    "y": 723,\
    "id": "Th.l"\
  },\
  {\
    "x": 1081,\
    "y": 923,\
    "id": "Th2.c"\
  },\
  {\
    "x": 972,\
    "y": 878,\
    "id": "Th.r"\
  },\
  {\
    "x": 1186,\
    "y": 863,\
    "id": "Th.l"\
  },\
  {\
    "x": 1083,\
    "y": 986,\
    "id": "Th3.c"\
  },\
  {\
    "x": 987,\
    "y": 1022,\
    "id": "Th.r"\
  },\
  {\
    "x": 1179,\
    "y": 1019,\
    "id": "Th.l"\
  },\
  {\
    "x": 1082,\
    "y": 1146,\
    "id": "Th4.c"\
  },\
  {\
    "x": 1001,\
    "y": 1172,\
    "id": "Th.r"\
  },\
  {\
    "x": 1170,\
    "y": 1180,\
    "id": "Th.l"\
  },\
  {\
    "x": 1090,\
    "y": 1304,\
    "id": "Th5.c"\
  },\
  {\
    "x": 950,\
    "y": 1310,\
    "id": "Th.r"\
  },\
  {\
    "x": 1170,\
    "y": 1310,\
    "id": "Th.l"\
  },\
  {\
    "x": 1092,\
    "y": 1493,\
    "id": "Th6.c"\
  },\
  {\
    "x": 973,\
    "y": 1475,\
    "id": "Th.r"\
  },\
  {\
    "x": 1166,\
    "y": 1477,\
    "id": "Th.l"\
  },\
  {\
    "x": 1089,\
    "y": 1635,\
    "id": "Th7.c"\
  },\
  {\
    "x": 961,\
    "y": 1629,\
    "id": "Th.r"\
  },\
  {\
    "x": 1169,\
    "y": 1636,\
    "id": "Th.l"\
  }\
]\
}';

function pointId2place(id) {
	const suffix2place = { "l":"left", "r": "right", "c":"center"};
	let place = suffix2place[id.split(".").slice(-1)]; 
	return place ? place : "other"; 
}

function pointTemplate_Front_LR() {
	if(1) {
		let pmap = JSON.parse(poinsTemplateJson_front_lr);
		pmap.points.forEach( function(element, index) {
			element.place = pointId2place(element.id);
		});
		return pmap;
	}
	else { //TODO: Auto point generator may be needed 
		let vertebraLabels = ["C5","C6","C7","Th1","Th2","Th3","Th4","Th5","Th6","Th7"];

		let points = [
			{ 
				id: "test", 
				x: 0,
				y: 0,
				place: "center"
			},
		];

		const minY=400;
		const maxY=1700;
		const cX=1060;
		const dX=110;
		const dY = (maxY-minY)/vertebraLabels.length;

		//right is on the left on image
		for( let i=0; i < vertebraLabels.length; i++ ) {
			points[3*i] = { "id": vertebraLabels[i]+".c", "y": minY+dY*i, "x": cX, place: "center" };
			points[3*i+1] = { "id": vertebraLabels[i]+".r", "y": minY+dY*i, "x": cX-dX, place: "right" };
			points[3*i+2] = { "id": vertebraLabels[i]+".l", "y": minY+dY*i, "x": cX+dX, place: "left" };
		}

		return { "width": 2130, "height": 1542, "points": points  }
	}
} 

function scalePointMap(pmap, width, height) {
	return pmap;
}

function makePointsFromTemplate(width, height) {
	let scaled = scalePointMap(pointTemplate_Front_LR());
	scaled["points"].push({"id": "test", x: 0, y: 0, place: "other"});
	return scaled["points"];
}

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
		console.log("Editor::imageLoaded()");
		let points = makePointsFromTemplate();
		let marker = new Marker()
		document.body.appendChild(marker.element);
		marker.markPoints(points);
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
