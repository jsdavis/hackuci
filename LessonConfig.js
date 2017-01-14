var lesson = lessons[0];

function setLesson(num) {
	lesson = lessons[num];
}

function getLessonNum() {
	return lesson.lesson.id;
}

function getLessonLanguage() {
	return lesson.lesson.language;
}

function getLessonTitle() {
	return lesson.lesson.title;
}

function getSteps() {
	var stepsString = "Steps: <br>"
	var n = 1;
	for (x in lesson.lesson.steps) {
		stepsString += n + ". " + lesson.lesson.steps[x] + "<br>";
		n++;
	}
	return stepsString;
}

function getSkeleton() {
	return lesson.lesson.skeleton;
}

function getExpectedResult() {
	return lesson.lesson.expectedResult;
}

function getExpectedResult(successMessage) {
	return lesson.lesson.successMessage;
}

function getException() {
	return lesson.lesson.exceptionFeedback.exception;
}

function getSyntaxError() {
	return lesson.lesson.exceptionFeedback.syntaxError;
}
