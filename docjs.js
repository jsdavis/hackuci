	function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
  console.log('Taking a break...');
  await sleep(2000);
  console.log('Two second later');
}

$("#input").attr("readonly", "true");
$("#input").on("keydown", function(e) {
	autosize(this);
});

function autosize(el) {
	el.style.overflow = 'hidden';
	el.style.height = 'auto';
	el.style.height = el.scrollHeight + 'px';
}

console.log("???");
var token = { time_created: 1484390026000,
  msg_mac: 'pfMbpHa9jM0Pi1k11euqEnrFjVrSEKDu648jtNt/Lpw=' };
var repl = new ReplitClient('api.repl.it', 80, 'python3', token);

repl.connect().then(
	function() {
		console.log("Connection successful");
	},
	function() {
		console.log("Connection failed");
	})

function run() {
	//$("#input").attr("readonly", "false");
	var x = repl.evaluate(document.getElementById("codeTxt").value, {
	                stdout: function(str) {
	                    document.getElementById('console').innerHTML += str + '\n';
	                }
	             }).then(
	   function success(result) {
	     // The evaluation succeeded. Result will contain `data` or `error`
	     // depending on whether the code compiled and ran or if there was an
	     // error.
	     console.log(result)
	     if (result.error) {
	       console.log('Error:', result.error);
	     } else {
	       console.log('Result', result.data);
	     }
	   },
	   function error(error) {
	     // There was an error connecting to the service :(
	     console.error('Error connecting to repl.it');
	   }
	 );
	  demo();
	  console.log(x);
	document.querySelector('#test').onclick = function() {
		repl.write("hi\n");
	}
}