/*var jqconsole = $('#console').jqconsole('Hi\n', '>>>');
var startPrompt = function () {
          // Start the prompt with history enabled.
          jqconsole.Prompt(true, function (input) {
            // Output input with the class jqconsole-output.
            jqconsole.Write(input + '\n', 'jqconsole-output');
            // Restart the prompt.
            startPrompt();
          });
        };
        startPrompt();
*/

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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function inputTimeout(t) {
  await sleep(t);
  if(count > 0) {
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

var token = { time_created: 1484390026000,
  msg_mac: 'pfMbpHa9jM0Pi1k11euqEnrFjVrSEKDu648jtNt/Lpw=' };
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
	count = (code.match('input\(.*\)') || []).length;
	i = 0;
	console.log("count: " + count);

	// activate console input if the program takes in input
	if(count > 0) {
		$("#input").removeAttr("readonly");
	}

	// clears console text at each run
	document.getElementById('console').innerHTML = ">>  ";

	var x = repl.evaluate(code, {
	                stdout: function(str) {
	                	rawOutput += str;
	                	if(str === '\n') {
	                		str = "<br>";
	                	}
	                	createLine(str);

	                	//document.getElementById("console").insertBefore(line, document.getElementById("console").firstChild);
	                    //line.innerHTML += str;
	                
	                }
	             }).then(
	   function success(result) {
	     // The evaluation succeeded. Result will contain `data` or `error`
	     // depending on whether the code compiled and ran or if there was an
	     // error.


	      var data = result.error ? result.error : rawOutput;

	      var output = generateOutput(data);

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
	
	/*
	document.querySelector('#test').onclick = function() {
		if(i < count) {
			repl.write("hi\n");
			i++;
		}
	}*/
  //$("#input").attr("readonly", "false");
}