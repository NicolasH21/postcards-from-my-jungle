const animals = [
  "crystal_roar",
  "moon_howler",
  "tiny_squeaker",
  "stoneback_grunts",
  "rattlejaw",
  "marsh_bellow",
  "glass_whistler",
  "nose_snuffler",
  "bubble_throat",
  "night_clicker",
  "ember_growler",
  "feather_triller",
  "cave_screecher",
  "thunderjaw",
  "moss_puffer",
  "distant_echoer"
];

let postcards = [];
let currentIndex = 0;

const content = document.getElementById("animal-content");
const counter = document.getElementById("counter");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const soundButton = document.getElementById("play-sound");

const audio = new Audio();

function formatName(name) {
  return name
    .replaceAll("_", " ")
    .replace(/\b\w/g, letter => letter.toUpperCase());
}

function getPhraseAndMeaning(text) {
  const lines = text
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean);

  const meaningIndex = lines.findIndex(line =>
    /^meaning\s*:/i.test(line)
  );

  const phraseLines = lines.filter((line, index) =>
    index !== 0 &&
    index !== meaningIndex &&
    !/^meaning\s*:/i.test(line)
  );

  const meaning = meaningIndex >= 0
    ? lines[meaningIndex].replace(/^meaning\s*:\s*/i, "")
    : "An expression from this imagined animal language.";

  const phrase = phraseLines[0] || "A sound from the jungle.";

  return { phrase, meaning };
}

function showPostcard(index) {
  currentIndex = (index + postcards.length) % postcards.length;

  const animal = postcards[currentIndex];
  const details = getPhraseAndMeaning(animal.phrase_and_meaning);

  const imageNumber = String(currentIndex).padStart(2, "0");
  const soundNumber = String(currentIndex + 1).padStart(2, "0");

  counter.textContent =
    `POSTCARD ${String(currentIndex + 1).padStart(2, "0")} / ${postcards.length}`;

  content.innerHTML = `
    <div class="polaroid">
      <img
        class="animal-image"
        src="images/fictional_animals_${imageNumber}.png"
        alt="Imagined animal ${formatName(animal.animal)}"
      >
    </div>

    <div class="animal-info">
      <h2>${formatName(animal.animal)}</h2>

      <p class="animal-label">ANIMAL LANGUAGE</p>
      <p class="animal-phrase">${details.phrase}</p>

      <p class="animal-label">TRANSLATION</p>
      <p class="animal-meaning">${details.meaning}</p>
    </div>
  `;

  audio.src = `sounds/${soundNumber}_${animal.animal}.wav`;
  audio.load();

  soundButton.textContent = "Play sound ♫";
}

previousButton.addEventListener("click", () => {
  showPostcard(currentIndex - 1);
});

nextButton.addEventListener("click", () => {
  showPostcard(currentIndex + 1);
});

soundButton.addEventListener("click", async () => {
  try {
    if (audio.paused) {
      await audio.play();
      soundButton.textContent = "Pause sound Ⅱ";
    } else {
      audio.pause();
      soundButton.textContent = "Play sound ♫";
    }
  } catch (error) {
    console.error("Could not play sound:", error);
    alert("The sound could not be played. Check the filename in the sounds folder.");
  }
});

audio.addEventListener("ended", () => {
  soundButton.textContent = "Play sound ♫";
});

fetch("animal-language.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Could not load animal-language.json");
    }
    return response.json();
  })
  .then(data => {
    const entries = Array.isArray(data) ? data : data.animals;

    if (!Array.isArray(entries) || entries.length === 0) {
      throw new Error("No animal phrases were found in the JSON file.");
    }

    const entryMap = new Map(
      entries.map(entry => [entry.animal, entry])
    );

    postcards = animals.map(name => {
      const entry = entryMap.get(name);

      return entry || {
        animal: name,
        phrase_and_meaning:
          `${formatName(name)}\nA made-up jungle expression.\nMeaning: An expression from this imagined ecosystem.`
      };
    });

    showPostcard(0);
  })
  .catch(error => {
    console.error(error);
    content.innerHTML = `
      <p>Could not load the animal language file.
      Check that animal-language.json is in the main project folder.</p>
    `;
  });