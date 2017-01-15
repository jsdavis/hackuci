window.lesson_lang = 'python';

lessons = lessons[window.lesson_lang]
var lesson = lessons[0];

tooltips = tooltips[window.lesson_lang];

function setLesson(num) {
	lesson = lessons[num];
}

function getLessonNum() {
	return lesson.lesson.id;
}

function getNumberOfLessons() {
	return lessons.length;
}

function getLessonLanguage() {
	return lesson.lesson.language;
}

function getLessonTitle() {
	return lesson.lesson.title;
}

function getSteps() {
	var stepsString = '<div class="text-center" style="font-size: 18px">Steps</div><hr>'
	var n = 1;
	for (x in lesson.lesson.steps) {
		stepsString += n + ". " + lesson.lesson.steps[x] + "<hr>";
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

function getSuccessMessage() {
	return lesson.lesson.successMessage;
}

function getExceptionFeedback() {
	return lesson.lesson.exceptionFeedback;
}

function getLangTips() {
	return tooltips.language;
}

function getLessonTips() {
	return tooltips.lesson[getLessonNum()];
}