
var tts = new RemoteTTS("https://support.readaloud.app");

function readIt() {
  tts.speak($("#text-to-read").val());
}

function downloadMp3() {
  tts.download($("#text-to-read").val());
}

function changeInputMethod() {
  CHIM.SetMethod($("#input-method").val());
}

$(function() {
  CHIM.Attach($("#text-to-read").get(0), true);
  changeInputMethod();
});


function RemoteTTS(host) {
  var audio;

  this.speak = function(text, onEnd) {
    if (!audio) {
      audio = document.getElementById("player");
      audio.src = "sound/silence.mp3";
      audio.play();
      $("#playback").show();
    }
    $("#progress-ind").show();
    return new Promise(function(fulfill) {
      audio.pause();
      audio.src = host + "/read-aloud/speak/vi/" + encodeURIComponent($("#voice").val()) + "?q=" + encodeURIComponent(text);
      audio.onplaying = fulfill;
      audio.onerror =
      audio.onended = onEnd;
      audio.play();
    })
    .then(function() {
      $("#progress-ind").hide();
    })
  }

  this.download = function(text) {
    location.href = host + "/read-aloud/speak/vi/" + encodeURIComponent($("#voice").val()) + "?saveAs=docthanhloi.mp3&q=" + encodeURIComponent(text);
  }

  this.isSpeaking = function(callback) {
    callback(audio.currentTime && !audio.paused && !audio.ended);
  }

  this.stop = function() {
    audio.pause();
  }
}
