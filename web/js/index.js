
var tts = new RemoteTTS("https://support.lsdsoftware.com");

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
      audio = document.createElement("AUDIO");
      audio.src = "sound/silence.mp3";
      audio.play();
    }
    return new Promise(function(fulfill) {
      audio.pause();
      audio.src = host + "/read-aloud/speak/vi/any?a=1&q=" + encodeURIComponent(text);
      audio.onplay = fulfill;
      audio.onerror =
      audio.onended = onEnd;
      audio.play();
    })
  }

  this.download = function(text) {
    location.href = host + "/read-aloud/speak/vi/any?saveAs=docthanhloi.mp3&a=1&q=" + encodeURIComponent(text);
  }

  this.isSpeaking = function(callback) {
    callback(audio.currentTime && !audio.paused && !audio.ended);
  }

  this.stop = function() {
    audio.pause();
  }
}
