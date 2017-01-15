var keywords = Object.keys(getLangTips());

// Initialize the lesson
init_lesson(0);

// Custom tooltip behavior
selection.on("changeSelection", function() {
  var txt = session.getTextRange(selection.getRange()).toLowerCase();

  // If selection is a known keyword, show the tooltip
  if (_.includes(keywords, txt)) {
    $('div#tooltip').append(
      '<div class="card"><div id="tip-body" style="margin: 1px 5px"><b>!</b></div></div>');

    $('div#tooltip').hover(function() {
      $(this).find('div#tip-body').html(getLangTips()[txt])
    }, function() {
      $(this).find('div#tip-body').html('<b>!</b>');
    });

    var screenPos = editor.getCursorPositionScreen();
    if (screenPos.column < 5)
      screenPos.row += 1;

    var y = screenPos.row * $('div.ace_line').height();
    var x = $('div.ace_gutter-layer').width() - 14;
    $('div#tooltip').css("left", x).css("top", y);
  }

  // Make sure the tooltip is empty
  else
    $('div#tooltip').empty();
});
