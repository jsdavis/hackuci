function init_lesson(num) {
  setLesson(num);

  console.log(getSteps());
  $('div#steps').html(getSteps());
  $('div#editor').text(getSkeleton());
}