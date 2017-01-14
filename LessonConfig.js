function getLessonNum(lessonObject) {
	return lessonObject.lesson.id;
}

function getLessonLanguage(lessonObject) {
	return lessonObject.lesson.language;
}

function getLessonTitle(lessonObject) {
	return lessonObject.lesson.title;
}

function getSteps(lessonObject) {
	var stepsString = "Steps: <br>"
	var n = 1;
	for (x in lessonObject.lesson.steps) {
		stepsString += n + ". " + lessonObject.lesson.steps[x] + "<br>";
		n++;
	}
	return stepsString;
}

function getExpectedResult(lessonObject) {
	return lessonObject.lesson.expectedResult;
}

function getExpectedResult(successMessage) {
	return lessonObject.lesson.successMessage;
}

function getException(lessonObject) {
	return lessonObject.lesson.exceptionFeedback.exception;
}

function getSyntaxError(lessonObject) {
	return lessonObject.lesson.exceptionFeedback.syntaxError;
}
