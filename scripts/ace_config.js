define(['jquery', 'lodash', 'ace', 'lesson_config', 'init_lesson'], function($, _, ace, l_conf, init_lesson) {

  console.log('lesson_config: ' + l_conf);

  /* TODO: Get config values from JSON */
  var language = l_conf.language().toLowerCase();
  var tooltips = l_conf.tooltips();
  var keywords = Object.keys(tooltips);

  // Initialize the lesson
  init_lesson(0);

  // Initialize ace editor
  var editor = ace.edit("editor");
  var selection = editor.getSelection();
  var session = editor.getSession();

  editor.setTheme("ace/theme/solarized_dark");
  editor.setFontSize(16);
  session.setMode("ace/mode/" + language);

  // Custom tooltip behavior
  selection.on("changeSelection", function() {
    var txt = session.getTextRange(selection.getRange()).toLowerCase();

    // If selection is a known keyword, show the tooltip
    if (_.includes(keywords, txt)) {
      $('div#tooltip').append(
        '<div class="card"><div id="tip-body" style="margin: 1px 5px"><b>!</b></div></div>');

      $('div#tooltip').hover(function() {
        $(this).find('div#tip-body').html(tooltips[txt])
      }, function() {
        $(this).find('div#tip-body').html('<b>!</b>');
      });

      var screenPos = editor.getCursorPositionScreen();
      var y = ((screenPos.row + 1) * $('div.ace_line').height()) + 4;
      var x = $('div.ace_gutter-layer').width();
      $('div#tooltip').css("left", x).css("top", y);
    }

    // Make sure the tooltip is empty
    else
      $('div#tooltip').empty();
  });
});