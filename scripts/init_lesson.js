function init_lesson(num) {
  setLesson(num);

  $('span#title').html(getLessonTitle());
  $('div#steps').html(getSteps());
  $('div#feedback').empty();
  $('div#console').empty();

  session.getDocument().setValue(getSkeleton());
  setFullTips(_.merge({}, getLangTips(), getLessonTips()));
}


function generateOutput(input, output, syntaxErr) {
	console.log("HERE: " + output + "\n");
	var result = {};

	var expected = getExpectedResult();
	result.correct = expected instanceof RegExp ?
		expected.test(output) : expected === output;

	// Remove empty lines
	// match line i with regex i for all i
	_.remove(lines, function(line) {
		return (_.startsWith(line, '#') || line=="");
	});

	var codeEval = true;

	var evalLength = lesson.lesson.evaluateCode.length;
	for (var i = 0; i < evalLength; i++) {
		if (!lesson.lesson.evaluateCode[i].test(lines[i])) {
			codeEval = false;
			break;
		}
	}
	result.correct = codeEval;

	if (getExpectedResult() != null) {

		var expected = getExpectedResult();
		result.correct = expected instanceof RegExp ?
			expected.test(output) : expected === output;

	}

	if (syntaxErr) {

		var errors = Object.keys(getExceptionFeedback());
		_.remove(errors, function(err) {
			return !_.includes(output.toLowerCase(), err.toLowerCase());
		});

		result.output = "";
		errors.forEach(function(err) {
			result.output += getExceptionFeedback()[err] + "<br>";
		});

		if (!result.output && !_.includes(output.toLowerCase(), 'traceback')) {
			result.output = "Not quite! Try again.";
		}
		else {
			result.output = output;
		}

	}

	else
		result.output = getSuccessMessage();

	return result;
}

function next_lesson() {
	var nextLessonNum = getLessonNum() + 1;
	if (nextLessonNum > getNumberOfLessons()) {
		return;
	}
	else {
		init_lesson(nextLessonNum - 1);
		console.log("Lesson changed to " + nextLessonNum);
		return;
	}
}

function prev_lesson() {
	var prevLessonNum = getLessonNum() - 1;
	if (prevLessonNum > 0) {
		init_lesson(prevLessonNum - 1);
		console.log("Lesson changed to " + prevLessonNum);
		return;
	}
}

init_lesson(0);