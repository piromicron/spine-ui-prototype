

/**
* Templates
*/

var poinsTemplateJson_front_rl = '{\
"width": 2130, "height": 1542, "points": [\
  {\
    "x": 1072,\
    "y": 422,\
    "id": "C5.c"\
  },\
  {\
    "x": 962.9895935058594,\
    "y": 355.9895820617676,\
    "id": "C5.r"\
  },\
  {\
    "x": 1171,\
    "y": 345.97916412353516,\
    "id": "C5.l"\
  },\
  {\
    "x": 1074,\
    "y": 529,\
    "id": "C6.c"\
  },\
  {\
    "x": 957.9895935058594,\
    "y": 478.98958587646484,\
    "id": "C6.r"\
  },\
  {\
    "x": 1182,\
    "y": 491,\
    "id": "C6.l"\
  },\
  {\
    "x": 1064,\
    "y": 666,\
    "id": "C7.c"\
  },\
  {\
    "x": 958,\
    "y": 609,\
    "id": "C7.r"\
  },\
  {\
    "x": 1191,\
    "y": 604,\
    "id": "C7.l"\
  },\
  {\
    "x": 1076,\
    "y": 788,\
    "id": "Th1.c"\
  },\
  {\
    "x": 955,\
    "y": 725,\
    "id": "Th1.r"\
  },\
  {\
    "x": 1191,\
    "y": 723,\
    "id": "Th1.l"\
  },\
  {\
    "x": 1081,\
    "y": 923,\
    "id": "Th2.c"\
  },\
  {\
    "x": 972,\
    "y": 878,\
    "id": "Th2.r"\
  },\
  {\
    "x": 1186,\
    "y": 863,\
    "id": "Th2.l"\
  },\
  {\
    "x": 1083,\
    "y": 986,\
    "id": "Th3.c"\
  },\
  {\
    "x": 987,\
    "y": 1022,\
    "id": "Th3.r"\
  },\
  {\
    "x": 1179,\
    "y": 1019,\
    "id": "Th3.l"\
  },\
  {\
    "x": 1082,\
    "y": 1146,\
    "id": "Th4.c"\
  },\
  {\
    "x": 1001,\
    "y": 1172,\
    "id": "Th4.r"\
  },\
  {\
    "x": 1170,\
    "y": 1180,\
    "id": "Th4.l"\
  },\
  {\
    "x": 1090,\
    "y": 1304,\
    "id": "Th5.c"\
  },\
  {\
    "x": 950,\
    "y": 1310,\
    "id": "Th5.r"\
  },\
  {\
    "x": 1170,\
    "y": 1310,\
    "id": "Th5.l"\
  },\
  {\
    "x": 1092,\
    "y": 1493,\
    "id": "Th6.c"\
  },\
  {\
    "x": 973,\
    "y": 1475,\
    "id": "Th6.r"\
  },\
  {\
    "x": 1166,\
    "y": 1477,\
    "id": "Th6.l"\
  },\
  {\
    "x": 1089,\
    "y": 1635,\
    "id": "Th7.c"\
  },\
  {\
    "x": 961,\
    "y": 1629,\
    "id": "Th7.r"\
  },\
  {\
    "x": 1169,\
    "y": 1636,\
    "id": "Th7.l"\
  }\
]\
}';

function pointId2place(id) {
	const suffix2place = { "l":"left", "r": "right", "c":"center"};
	let place = suffix2place[id.split(".").slice(-1)]; 
	return place ? place : "other"; 
}

function pointTemplate_Front_RL() {
	if(1) {
		let pmap = JSON.parse(poinsTemplateJson_front_rl);
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
	let scaled = scalePointMap(pointTemplate_Front_RL());
	scaled["points"].push({"id": "test", x: 0, y: 0, place: "other"});
	return scaled["points"];
}
