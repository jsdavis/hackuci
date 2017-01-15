define(['lessons', 'tooltips'], function(lessons, tooltips) {
	console.log('lessons: ' + lessons);
	console.log('tooltips: ' + tooltips);

	lessons = lessons.lessons;
	return {
		lesson : lessons[0],

		setLesson: function(num) {
			if (lessons.length < num) {
				console.warn("Lesson " + num + " out of range. Aborted");
				return;
			}
			lesson = lessons[num];
		},

		lessonNum: function() {
			return lesson.lesson.id;
		},

		language: function() {
			return window.lesson_lang;
		},

		lessonTitle: function() {
			return lesson.lesson.title;
		},

		steps: function() {
			var stepsString = "Steps: <br>"
			var n = 1;
			for (x in lesson.lesson.steps) {
				stepsString += n + ". " + lesson.lesson.steps[x] + "<br>";
				n++;
			}
			return stepsString;
		},

		skeleton: function() {
			return lesson.lesson.skeleton;
		},

		expectedResult: function() {
			return lesson.lesson.expectedResult;
		},

		successMessage: function() {
			return lesson.lesson.successMessage;
		},

		exceptionFeedback: function() {
			return lesson.lesson.exceptionFeedback;
		},

		tooltips: function() {
			return tooltips.language;
		},

		lessonTooltips: function() {
			return tooltips.lesson[lessonNum()];
		},

		generateOutput: function(output) {
			var result = {};

			var expected = expectedResult();
			result.correct = expected instanceof RegExp ?
			expected.test(output) : expected === output;

			if (!result.correct) {
				var errors = Object.keys(exceptionfeedback());
				_.remove(errors, function(err) {
					return _.includes(output, err);
				});

				result.output = "";
				errors.forEach(function(err) {
					result.output += exceptionfeedback()[err] + "<br>";
				});

				if (!result.output)
					result.output = "Not quite! Try again.";
			}

			else
				result.output = successMessage();

			return result;
		}
	}
});