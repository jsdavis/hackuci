/* Initialize editor ******************************************/

var editor = ace.edit("editor");
var selection = editor.getSelection();
var session = editor.getSession();

editor.$blockScrolling = Infinity;
editor.setTheme("ace/theme/twilight");
editor.setFontSize(16);
session.setMode("ace/mode/" + getLessonLanguage());


/* Initialize console *****************************************/
var count;
var i;
var rawOutput = "";

function createLine(str) {
	var el = document.createElement("p");
	$(el).css("display", "inline");
	$(el).attr("class", "line");
	el.innerHTML = str;
	document.getElementById("console").appendChild(el);

}

/* TODO: Handle input events on the server side
function handle(e) {
	if(e.keyCode === 13){
		console.log("value: " + document.getElementById("input").value );
		repl.write(document.getElementById("input").value + "\n");
		$("#input").attr("readonly", "true");
		$("#input").attr("id", "none");
		createLine("<br>");
		//$("#input").destroy();
		i++;
		if(i < count) {
			inputTimeout(500);
		}
	}
}
*/

/**************************************************************/

/* TODO: Reintroduce input capability
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function inputTimeout(t) {
  await sleep(t);
  if (count > 0) {
		console.log("halp");
		var inp = document.createElement("textarea");
		$(inp).attr("id", "input");
		$(inp).attr("class", "txtarea");
		$(inp).attr("onkeypress", "handle(event)");
		$("#console").append(inp.outerHTML);
	}
}

$("#input").attr("readonly", "true");
$("#input").on("keydown", function(e) {
  autosize(this);
});

function autosize(el) {
	el.style.overflow = 'hidden';
	el.style.width = 'auto';
	el.style.height = 'auto';
	el.style.height = el.scrollHeight + 'px';
}
*/

function run() {
	// get string from editor
	var code = session.getDocument().getValue();

	/* TODO: Reintroduce input capability
	// get count
	var re = /input\(.*\)/g
	count = (code.match(re) || []).length;
	i = 0;

	// activate console input if the program takes in input
	if (count > 0)
		$("#input").removeAttr("readonly");
	*/

	// clears console text at each run
	document.getElementById('console').innerHTML = ">>  ";

	$.post('/code', { "code": code }, data => {
		var output = generateOutput(code, data.output, data.error);
    // Need to know correctness for moving on to next lesson
	  $('div#feedback').html(output.output);
	  createLine(data.stdout);
	});

	//inputTimeout(500);
}
