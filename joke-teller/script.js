

const textList = [];

async function fetchJoke() {
  try {
    const response = await fetch(
      "https://v2.jokeapi.dev/joke/Programming,Dark?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single"
    );
    const data = await response.json();

    if (!data) {
      console.log("API Error:", error);
      return null;
    }
    const joke = data.joke;
    return joke;
  } catch (error) {
    console.log("Fetch Error:", error);
  }
}

async function textToSpeech(text, lang = "en", speed = "normal") {
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

    const audioElement = document.getElementById('audio');
    audioElement.src = audioUrl;

    audioElement.addEventListener("ended", () => {
      button.disabled = false;
    });
    audioElement.play();
  } catch (error) {
    console.log("TTS Hatası:", error);
    button.disabled = false;
  }
}

const button = document.getElementById("button");

button.addEventListener("click", async () => {
  const randomIndex = Math.floor(Math.random() * textList.length);
  const joke = await fetchJoke();
  if (joke) {
    textList.push(joke);
  }
  const selectedText = textList[randomIndex];
  textToSpeech(selectedText);
});
