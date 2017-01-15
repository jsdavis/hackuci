function saveAsFile() {
	var code = session.getDocument().getValue();
	var file = new Blob([code], {type: "text/python"});
	var url = window.URL.createObjectURL(file);
	var fileName = document.getElementById("inlineFormInput").value;

	var dlLink = document.createElement("a");
	dlLink.download = fileName;
	dlLink.href = url;
	dlLink.style.display = "none";
	console.log(dlLink.outerHTML);
	document.body.appendChild(dlLink);
	dlLink.click();
}
	
function openFile() {
	var file = document.getElementById("inlineFileInput").files[0];

	var reader = new FileReader();
	reader.onload = function(fileLoadedEvent) {
		var txt = fileLoadedEvent.target.result;
		session.getDocument().setValue(txt);
		console.log(txt);
	};
	reader.readAsText(file, "UTF-8");
}