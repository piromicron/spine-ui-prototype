function doit() {
	imageWidth = $("img#theimage").width();
	imageHeight = $("img#theimage").height();
	if( $(window).width() < imageWidth ) {
		$("div#image").scrollLeft((imageWidth-$(window).width())/2);
	}
	if( $(window).height() < imageHeight ) {
		$("div#image").scrollTop(0.06*$(window).height());
	}

	var points = {

		"test": {
			x: 0,
			y: 0,
			place: "center"
		},
	};

	var vertebraLabels = ["C5","C6","C7","Th1","Th2","Th3","Th4","Th5","Th6","Th7"];

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

	const centerOfPointImage = (40*90/150);//+1; //TODO: why?!        
	
	for(var pointid in points) {
		let point = points[pointid];
		console.log("Point #" + pointid + ": { x: "+ point.x+", y: "+ point.y + ", place: "+ point.place );
			
		function set( pointid, point ) {
			let left = point.x-centerOfPointImage;
			let top = point.y-centerOfPointImage;
			let style = "left: "+left+"; top: "+top+"; position: absolute;";
			console.log("Point #" + pointid );
			let svg = $("svg#vertebra-point-template").clone()
				.attr( "id", pointid)
				.addClass("vertebra-point set " + point.place)
				;
			let div = $(svg).wrap("<div id=\"div_"+pointid+"\" style=\""+style+"\"></div>").parent(); 

			let labelElemeent = $(svg).find("text").get(0);
			let labelClass = "svg-label-"+ point.place;
			$(svg).find("text").each(function () { $(this).html(pointid); $(this).addClass(labelClass); });                     
			$("div#image").append(div);
			div.draggable();    
			};
			
		set(pointid,point);
	}
}

$("img#theimage").load( function() {
	console.log("Image loaded.");
	doit();
});

$("img#theimage").attr("src", "IMG-0001-00001.jpg" );

