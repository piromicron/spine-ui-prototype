
/**
* Editor
*/


class Editor {
	constructor() {
		Editor.installLoadFileHandler();
	}
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

		//TODO: We got this url from uploaded file don't need it anymore, so revoke blob 
		//In fact we may need this image file later (i.e. for saving with poins) so let's keep it at least for now
		//if( url.startsWith("blob:") ) { 
		//	window.URL.revokeObjectURL(this.src); // Revoke blob file
		//}
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
	static installLoadFileHandler() {
		window.URL = window.URL || window.webkitURL;

		var fileSelect = document.getElementById("fileSelect"),
		    fileElem = document.getElementById("fileElem"),
		    fileList = document.getElementById("fileList");

		fileSelect.addEventListener("click", 
			function (e) {
				if (fileElem) {
					fileElem.click();
				}
				e.preventDefault(); // prevent navigation to "#"
			}, false
		);
	}
	static handleFiles(files) {
		if (!files.length) {
			//TODO fileList.innerHTML = "<p>No files selected!</p>";
		} 
		else {
			//TODO fileList.innerHTML = "";
 			const imageURL = window.URL.createObjectURL(files[0]);
			Editor_theEditor.open(imageURL);
		}
	}


	static getEditor() {
		return Editor_theEditor; 
	}
}

var Editor_theEditor = new Editor();
//Editor.installLoadFileHandler();
