$(function() {

  /* TODO: Get config values from JSON */
  var language = 'javascript';
  var tooltips = {'function': 'function tooltip'};
  var keywords = Object.keys(tooltips);


  // Initialize ace editor
  var editor = ace.edit("editor");
  var selection = editor.getSelection();
  var session = editor.getSession();

  editor.setTheme("ace/theme/solarized_dark");
  session.setMode("ace/mode/" + language);

  // Custom tooltip behavior
  selection.on("changeSelection", function() {
    var txt = session.getTextRange(selection.getRange()).toLowerCase();

    // If selection is a known keyword, show the tooltip
    if (_.includes(keywords, txt)) {
      $('div#tooltip').append(
        '<div class="panel panel-default"><div id="tip-body" class="panel-body"><b>!</b></div>');

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