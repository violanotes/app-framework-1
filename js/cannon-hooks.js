// hook events here...

function volumeSliderCallbackOnSlideEnd(position, value) {
  // use value (position is the relative x-value)
  afterChangeVolume(value)
}

function volumeSliderCallbackOnSlide(position, value) {
  whileChangingVolume(value)
}


$(function() {
  // load GUI components that require JS
  initializeGUI()
  fetchAJAXContent()

  loadSavedSettings(readSavedSettings());

  $("#button-status, #span-main-status").click(function() {
    clickStatusButton();
  });

  $("#button-settings-ok").click(function() {
    saveSettings()
  });

  $("#button-fire").click(function() {
    fireCannon()
  });

  window.addEventListener('keydown', function(e) {
    if(e.keyCode == 32 && e.target == document.body) {
      e.preventDefault();
    }
  });

  $("#icon-main-volume").click(function() {
    if (currentSettings["muted"]) {
      performUnmute()
    } else {
      performMute()
    }
  });

});
