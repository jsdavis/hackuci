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
	var re = /\n/g;
	console.log('before: ' + str);
	str.replace(/\n/g,'cry');
	console.log('after: ' + str);
	var el = document.createElement("p");
	$(el).css("display", "inline");
	$(el).attr("class", "line");
	el.innerHTML = str;
	document.getElementById("console").appendChild(el);

}

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

/**************************************************************/

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

var token = {
	time_created: 1488782977000,
  msg_mac: "er3S3ee78ksHnsxTM20fUT/rDchWoCx+tT/QUrdIp/Q="
};
  var repl = new ReplitClient('api.repl.it', 80, 'python3', token);

repl.connect().then(
  function() {
    console.log("Connection successful");
  },
  function() {
    console.log("Connection failed");
  }
);

function run() {
	rawOutput = "";

	// get string from editor
	var code = session.getDocument().getValue();

	// get count
	var re = /input\(.*\)/g
	count = (code.match(re) || []).length;
	i = 0;
	console.log("count: " + count);

	// activate console input if the program takes in input
	if (count > 0)
		$("#input").removeAttr("readonly");

	// clears console text at each run
	document.getElementById('console').innerHTML = ">>  ";

	var x = repl.evaluate(code, {
	    stdout: function(str) {
	    	rawOutput += str;
	    	if(str === '\n') {
	    		str = "<br>";
	    	}
	    	createLine(str);
	    }
	 }).then(
	   function success(result) {
	     // The evaluation succeeded. Result will contain `data` or `error`
	     // depending on whether the code compiled and ran or if there was an
	     // error.


	      var data = result.error ? result.error : rawOutput;

	      var error = false;

	      if(result.error) {
	      	error = true;
	      }

	      var output = generateOutput(code, data, error);

	      // Need to know correctness for moving on to next lesson
	      if (output.correct)
	        console.log("You are correct");
	      else
	        console.log("Code is wrong");

	      $('div#feedback').html(output.output);
	   },
	   function error(error) {
	     // There was an error connecting to the service :(
	     console.error('Error connecting to repl.it');
	   }
	 );
	inputTimeout(500);
}

/*
selection.on("changeSelection", selectionChangeHandler);

function selectionChangeHandler() {
	var tips = getFullTips();
	var keywords = Object.keys(tips);
	console.log(tips);

	var txt = session.getTextRange(selection.getRange()).toLowerCase();

	// If selection is a known keyword, show the tooltip
	if (_.includes(keywords, txt)) {
		$('div#tooltip').append(
		  '<div class="card"><div id="tid-body" style="margin: 1px 5px"><b>!</b></div></div>');

		$('div#tooltip').hover(function() {
			$(this).find('div#tip-body').html(tips[txt])
		}, function() {
			$(this).find('div#tip-body').html('<b>!</b>');
		});

		var screenPos= editor.getCursorPositionScreen();
		if (screenPos.column < 5)
			screenPos.row += 1;

		var y = screenPos.row * $('div.ace_line').height();
		var x = $('div.ace_gutter-layer').width() - 14;
		$('div#tooltip').css("left", x).css("top", y);
	}

	// Make sure tooltip is empty
	else
		$('div#tooltip').empty();
}*/