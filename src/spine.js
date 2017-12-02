
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
