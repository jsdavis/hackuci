function init_lesson(num) {
  setLesson(num);

  $('span#title').html(getLessonTitle());
  $('div#steps').html(getSteps());
  $('div#feedback').empty();
  $('div#console').empty();

  session.getDocument().setValue(getSkeleton());
  setFullTips(_.merge({}, getLangTips(), getLessonTips()));
}

function generateOutput(output) {
	console.log("HERE: " + output + "\n");
	var result = {};

	var expected = getExpectedResult();
	result.correct = expected instanceof RegExp ?
		expected.test(output) : expected === output;

	if (!result.correct) {
		var errors = Object.keys(getExceptionFeedback());
		_.remove(errors, function(err) {
			return !_.includes(output.toLowerCase(), err.toLowerCase());
		});

		result.output = "";
		var begEz = false;
		errors.forEach(function(err) {
			result.output += getExceptionFeedback()[err] + "<br>";
			begEz = true;
		});

		if (!begEz && !_.includes(output.toLowerCase(), 'traceback')) {
			result.output = "Not quite! Try again.";
		}
		else if(!begEz) {
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
		setLesson(0);
		console.log("Lesson changed to 0")
		return;
	}
	else {
		init_lesson(nextLessonNum - 1);
		console.log("Lesson changed to " + nextLessonNum);
		return;
	}
}

init_lesson(0);