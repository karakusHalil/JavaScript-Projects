// VoiceRSS Javascript SDK
const VoiceRSS = {
  speech: function (e) {
    this._validate(e), this._request(e);
  },
  _validate: function (e) {
    if (!e) throw "The settings are undefined";
    if (!e.key) throw "The API key is undefined";
    if (!e.src) throw "The text is undefined";
    if (!e.hl) throw "The language is undefined";
    if (e.c && "auto" != e.c.toLowerCase()) {
      var a = !1;
      switch (e.c.toLowerCase()) {
        case "mp3":
          a = new Audio().canPlayType("audio/mpeg").replace("no", "");
          break;
        case "wav":
          a = new Audio().canPlayType("audio/wav").replace("no", "");
          break;
        case "aac":
          a = new Audio().canPlayType("audio/aac").replace("no", "");
          break;
        case "ogg":
          a = new Audio().canPlayType("audio/ogg").replace("no", "");
          break;
        case "caf":
          a = new Audio().canPlayType("audio/x-caf").replace("no", "");
      }
      if (!a) throw "The browser does not support the audio codec " + e.c;
    }
  },
  _request: function (e) {
    var a = this._buildRequest(e),
      t = this._getXHR();
    (t.onreadystatechange = function () {
      if (4 == t.readyState && 200 == t.status) {
        if (0 == t.responseText.indexOf("ERROR")) throw t.responseText;
        (audioElement.src = t.responseText), audioElement.play();
      }
    }),
      t.open("POST", "https://api.voicerss.org/", !0),
      t.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded; charset=UTF-8"
      ),
      t.send(a);
  },
  _buildRequest: function (e) {
    var a = e.c && "auto" != e.c.toLowerCase() ? e.c : this._detectCodec();
    return (
      "key=" +
      (e.key || "") +
      "&src=" +
      (e.src || "") +
      "&hl=" +
      (e.hl || "") +
      "&r=" +
      (e.r || "") +
      "&c=" +
      (a || "") +
      "&f=" +
      (e.f || "") +
      "&ssml=" +
      (e.ssml || "") +
      "&b64=true"
    );
  },
  _detectCodec: function () {
    var e = new Audio();
    return e.canPlayType("audio/mpeg").replace("no", "")
      ? "mp3"
      : e.canPlayType("audio/wav").replace("no", "")
      ? "wav"
      : e.canPlayType("audio/aac").replace("no", "")
      ? "aac"
      : e.canPlayType("audio/ogg").replace("no", "")
      ? "ogg"
      : e.canPlayType("audio/x-caf").replace("no", "")
      ? "caf"
      : "";
  },
  _getXHR: function () {
    try {
      return new XMLHttpRequest();
    } catch (e) {}
    try {
      return new ActiveXObject("Msxml3.XMLHTTP");
    } catch (e) {}
    try {
      return new ActiveXObject("Msxml2.XMLHTTP.6.0");
    } catch (e) {}
    try {
      return new ActiveXObject("Msxml2.XMLHTTP.3.0");
    } catch (e) {}
    try {
      return new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {}
    try {
      return new ActiveXObject("Microsoft.XMLHTTP");
    } catch (e) {}
    throw "The browser does not support HTTP request";
  },
};

const textList = [
  "Matematik kitabı neden üzgündü? Çünkü çok problemi vardı.",
  "Bir gözlük niye üzgündü? Çünkü gözlük problemi vardı.",
  "Neden bilgisayarım psikoloğa gitti? Çünkü çok byte almıştı!",
  "Kediler neden bilgisayarları sevmez? Çünkü fareyi kovalayamazlar!",
  "Doktor, 'Çok çalışıyorsunuz, dinlenmelisiniz.' dedi. Hasta cevapladı: 'Ama ben bir bilgisayarım!'",
  "Bir telefon neden üzülür? Çünkü kapatıldı!",
  "Nasıl bir balina tiyatroya gider? Büyük bir sahne arar.",
  "Bir muz neden sinirliydi? Çünkü kabukları soyulmuştu.",
  "Köpeğiniz bilgisayarınızı seviyor mu? Çünkü sürekli fareyi takip ediyor!",
  "Bir tavuk neden bilgisayar kullanmaz? Çünkü yumurtaları her zaman kaybolur.",
];

async function textToSpeech(text, lang = "tr", speed = "normal") {
  const button = document.getElementById("button");
  button.disabled = true;

  const url = "https://text-to-speach-api.p.rapidapi.com/text-to-speech";
  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": "79e2f4f522mshfa787bee0c47585p161ecdjsndfed1bb16203",
      "x-rapidapi-host": "text-to-speach-api.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, lang, speed }),
  };
  try {
    const response = await fetch(url, options);

    const blob = await response.blob();
    const audioUrl = URL.createObjectURL(blob);
    console.log("Ses Url:", audioUrl);

    const audio = new Audio(audioUrl);

    audio.addEventListener("ended", () => {
      button.disabled = false;
    });
    audio.play();
  } catch (error) {
    console.log("TTS Hatası:", error);
    button.disabled = false;
  }
}

const button = document.getElementById("button");

button.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * textList.length);
  const selectedText = textList[randomIndex];
  textToSpeech(selectedText);
});
