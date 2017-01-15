define(['jquery', 'lodash', 'lesson_config'], function($, _, l_conf) {


	return function init_lesson(num) {
	  l_conf.setLesson(num);

	  $('div#steps').html(l_conf.steps());
	  $('div#editor').text(l_conf.skeleton());
	}
});

