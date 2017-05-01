// try declaring events...

// actions

// declare global variable
currentSettings = {}
globalSettins = {}

function onBeginLoadingAJAXContent() {
  currentSettings["loading"] = true
  loadingStatusButton()
  simulateAjaxLoadTimePassing(onEndLoadingAJAXContent)
}

function onEndLoadingAJAXContent() {
  currentSettings["loading"] = false
  $("#ajax-loader").css("display", "none")
  $("#button-fire").css("display", "initial")
  readyStatusButton()
}

function simulateAjaxLoadTimePassing(callback) {
  setTimeout(function(){
    callback()
  }, 3000);
}

function fetchAJAXContent() {
  onBeginLoadingAJAXContent()
}

function initializeGUI() {
  // Don't use the slider implementation for now
  // $('#slider-volume').slider({
  //   formatter: function(value) {
  //     return 'Current value: ' + value;
  //   }
  // });
}

function readSavedSettings() {
  // try to read cookies:
  // return defaults where no cookies found
  var settings = getDefaultSettings()

  if ($.cookie("volume") !== undefined) settings["volume"] = $.cookie("volume")
  if ($.cookie("enabled") !== undefined) settings["enabled"] = $.cookie("enabled") !== "false"

  return settings
}

function getDefaultSettings() {
  return {volume: 20, enabled: true}
}

function writeSavedSettings(settings) {
  console.log("saving settings: " + JSON.stringify(settings))
  $.cookie("volume", settings["volume"])
  $.cookie("enabled", settings["enabled"])
}

function clearSavedSettings() {

}

function loadSavedSettings(settings) {
  // create or modify global variable
  initialSettings = settings

  // copy values into currentSettings
  currentSettings["volume"] = initialSettings["volume"]
  currentSettings["enabled"] = initialSettings["enabled"]

  afterLoadSavedSettings()
}

function afterLoadSavedSettings() {
  // set initial state of stateful elements
  console.log("read settings: " + JSON.stringify(initialSettings))

  // volume setting
  setInitialVolumeDOM(initialSettings["volume"])
  setVolumeGUI(initialSettings["volume"])

  // status setting
  setStatusGUI(initialSettings["enabled"])
  setInitialStatusDOM(initialSettings["enabled"])
}

function setInitialVolumeDOM(volume) {
  $("#slider-volume").attr("value", volume)
}

function setVolumeGUI(volume) {
  $("#div-slider-volume-inner").val(volume).change()
  afterChangeVolume(volume)
}

function setVolumeDOM(volume) {
  $("#slider-volume").attr("value", volume)
}

function setStatusGUI(enabled) {
  // enabled setting
  if (enabled) {

    $("#button-fire").removeClass("disabled")

    $("#icon-main-status").removeClass("glyphicon-ban-circle")
    $("#icon-main-status").removeClass("glyphicon-flash")
    $("#icon-main-status").addClass("glyphicon-flash")
    $("#icon-main-status").css("color", "red");

    $("#icon-settings-status").removeClass("glyphicon-ban-circle")
    $("#icon-settings-status").removeClass("glyphicon-flash")
    $("#icon-settings-status").addClass("glyphicon-flash")
    $("#icon-settings-status").css("color", "red");

    if (currentSettings["loading"] !== true) {
      $("#text-settings-status").text("Enabled")
      $("#text-main-status").text("Enabled")
      $("#button-status").text("Click to Disable")
    }
  } else {

    $("#button-fire").addClass("disabled")

    $("#icon-main-status").removeClass("glyphicon-ban-circle")
    $("#icon-main-status").removeClass("glyphicon-flash")
    $("#icon-main-status").addClass("glyphicon-ban-circle")
    $("#icon-main-status").css("color", "#555");

    $("#icon-settings-status").removeClass("glyphicon-ban-circle")
    $("#icon-settings-status").removeClass("glyphicon-flash")
    $("#icon-settings-status").addClass("glyphicon-ban-circle")
    $("#icon-settings-status").css("color", "#555");

    if (currentSettings["loading"] !== true) {
      $("#text-settings-status").text("Disabled")
      $("#text-main-status").text("Disabled")
      $("#button-status").text("Click to Enable")
    }
  }
}

function setInitialStatusDOM(enabled) {
  $("#checkbox-status").prop("checked", enabled)
  console.log("checkbox attr: " + $("#checkbox-status").attr("checked"))
  console.log("checkbox prop: " + $("#checkbox-status").prop("checked"))
}

function setStatusDOM(enabled) {
  $("#checkbox-status").prop("checked", enabled)
}

function fireCannon() {

  if ($("#checkbox-status").prop("checked")) {
    beforeFireCannon()

    // do stuff
    console.log("fireCannon()")

    afterFireCannon()
  }
}

function beforeFireCannon() {

}

function afterFireCannon() {

}

function clickStatusButton() {
  if (!currentSettings["loading"] == true)
    currentSettings["enabled"] == true ? disableCannon() : enableCannon()
}

function readyStatusButton() {
  $("#span-main-status").removeClass("disabled")
  $("#icon-main-status").css("display", "initial")
  $("#text-main-status").css("color", "#555")
  currentSettings["enabled"] == true ?
    $("#text-main-status").text("Enabled") :
    $("#text-main-status").text("Disabled")
}

function loadingStatusButton() {
  $("#span-main-status").addClass("disabled")
  $("#icon-main-status").css("display", "none")
  $("#text-main-status").css("color", "#cccccc")
  $("#icon-main-status").css("display", "none")
  $("#text-main-status").text("Loading")
}

function disableCannon() {
  console.log("disableCannon()")
  setStatusGUI(false)
  currentSettings["enabled"] = false
  afterDisableCannon()
}

function afterDisableCannon() {
  saveSettings()
}

function enableCannon() {
  console.log("enableCannon()")
  setStatusGUI(true)
  currentSettings["enabled"] = true
  afterEnableCannon()
}

function afterEnableCannon() {
  saveSettings()
}

function whileChangingVolume(volume) {
  if (volume == 0) {
    currentSettings["muted"] = true
    changeVolumeIcon("volume-off")
  } else if (volume < 50) {
    currentSettings["muted"] = false
    changeVolumeIcon("volume-down")
  } else {
    currentSettings["muted"] = false
    changeVolumeIcon("volume-up")
  }
}

function afterChangeVolume(volume) {
  if (volume == 0) {
    currentSettings["muted"] = true
    changeVolumeIcon("volume-off")
  } else if (volume < 50) {
    currentSettings["muted"] = false
    changeVolumeIcon("volume-down")
  } else {
    currentSettings["muted"] = false
    changeVolumeIcon("volume-up")
  }

  currentSettings["volume"] = volume
  saveSettings()
}

function changeVolumeIcon(glyphicon) {
  console.log("changeVolumeIcon(" + glyphicon + ")")

  $("#icon-main-volume").removeClass("glyphicon-volume-down")
  $("#icon-main-volume").removeClass("glyphicon-volume-up")
  $("#icon-main-volume").removeClass("glyphicon-volume-off")

  switch (glyphicon) {
    case "volume-off":
      $("#icon-main-volume").removeClass("glyphicon-volume-down")
      $("#icon-main-volume").removeClass("glyphicon-volume-up")
      $("#icon-main-volume").addClass("glyphicon-volume-off")
      break
    case "volume-down":
      $("#icon-main-volume").removeClass("glyphicon-volume-up")
      $("#icon-main-volume").removeClass("glyphicon-volume-off")
      $("#icon-main-volume").addClass("glyphicon-volume-down")
      break
    case "volume-up":
      $("#icon-main-volume").removeClass("glyphicon-volume-down")
      $("#icon-main-volume").removeClass("glyphicon-volume-off")
      $("#icon-main-volume").addClass("glyphicon-volume-up")
      break;
  }

}

function performMute() {
  // save pre-mute volume
  currentSettings["preMuteVolume"] = $("#div-slider-volume-inner").val()
  $("#div-slider-volume-inner").val(0).change()
  afterChangeVolume(0)
  currentSettings["muted"] = true
}

function performUnmute() {
  // search for saved pre-mute volume-up
  // otherwise, just set volume to 10
  if (currentSettings["preMuteVolume"] != undefined) {
    setVolumeGUI(currentSettings["preMuteVolume"])
  } else {
    setVolumeGUI(10)
  }
  currentSettings["muted"] = false
}

function afterChangeAnySetting() {

}

saveSettings = (function() {
  var isFirst = true

  var returnFunction = function() {
    if (isFirst) {
      isFirst = false
    } else {
      // do the function
      beforeSaveSettings()

      var settings = getCurrentSettings()
      writeSavedSettings(settings)

      afterSaveSettings()
    }
  }

  return returnFunction
})()

function getCurrentSettings() {
  var settings = {}
  settings["volume"] = $("#div-slider-volume-inner").val()
  settings["enabled"] = currentSettings["enabled"]
  console.log("current settings: " + JSON.stringify(settings))

  return settings;
}

function beforeSaveSettings() {

}

function afterSaveSettings() {

}

function cancelSettings() {

}

function beforeCancelSettings() {

}

function afterCancelSettings() {

}

function beforeShowSettings() {

}

function afterShowSettings() {

}

function beforeShowMainFromSettings() {

}

function afterShowMainFromSettings() {

}
