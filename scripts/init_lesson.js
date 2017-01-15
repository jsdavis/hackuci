function init_lesson(num) {
  setLesson(num);

  console.log(getSteps());
  $('span#title').html(getLessonTitle());
  $('div#steps').html(getSteps());
  $('div#editor').text(getSkeleton());
}

function generateOutput(output) {
	console.log("HERE: " + output + "\n")
	var result = {};

	var expected = getExpectedResult();
	result.correct = expected instanceof RegExp ?
		expected.test(output) : expected === output; 

	if (!result.correct) {
		var errors = Object.keys(getExceptionFeedback());
		_.remove(errors, function(err) {
			return _.includes(output, err);
		});
	
		result.output = "";
		errors.forEach(function(err) {
			result.output += getExceptionFeedback()[err] + "<br>";
		});

		if (!result.output)
			result.output = "Not quite! Try again.";
	}

	else
		result.output = getSuccessMessage();

	return result;
}

function next_lesson() {
	var nextLessonNum = getLessonNum() + 1;
	if (nextLessonNum > getNumberOfLessons()) {
		setLesson(0);
		return;
	}
	else {
		setLesson(nextLessonNum);
		return;
	}
}