const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

//import voiceRSS from voice.js

const apiKey = "c2de1a7158e84e34aefb8beb8c97603a";

// Disable / enable button
function toggleButton() {
    button.disabled = !button.disabled;
}
// Pass joke to the VoiceRSS Javascript SDK
function tellMeJoke(joke) {
    VoiceRSS.speech({
        key: apiKey,
        src: joke,
        hl: "en-us",
        v: "Linda",
        r: 0,
        c: "mp3",
        f: "44khz_16bit_stereo",
        ssml: false,
    });
}
// Get Jokes from the API
async function getJokes() {
    let joke = "";
    const apiUrl =
        "https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Dark?blacklistFlags=racist,sexist";
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        data.setup
            ? (joke = `${data.setup}... ${data.delivery}`)
            : (joke = data.joke);
        // Text-to-speech
        tellMeJoke(joke);
        // Enable button
        toggleButton();
    } catch (error) {
        console.log("Whoops", error);
    }
}

// Event listener
button.addEventListener("click", getJokes);
audio.addEventListener("ended", toggleButton);
