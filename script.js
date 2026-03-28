let selectedMood = "";

// ---- TAB SWITCHING ----
function showTab(tab) {
  document.getElementById("moodboard-tab").style.display = tab === "moodboard" ? "block" : "none";
  document.getElementById("checkin-tab").style.display = tab === "checkin" ? "block" : "none";

  document.getElementById("tab-moodboard").classList.toggle("active", tab === "moodboard");
  document.getElementById("tab-checkin").classList.toggle("active", tab === "checkin");
}

// ---- MOOD SELECTION ----
function selectMood(el) {
  selectedMood = el.dataset.mood;
  document.querySelectorAll(".emoji-btn").forEach(b => b.classList.remove("selected"));
  el.classList.add("selected");
}

// ---- IMAGE UPLOAD ----
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("imageUpload").addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = document.getElementById("userImage");
      img.src = event.target.result;
      img.style.display = "block";
    };
    reader.readAsDataURL(file);
  });
});

async function generateMoodboard() {
  const prompt = document.getElementById("vibeInput").value.trim();
  if (!prompt) {
    alert("Type a vibe first!");
    return;
  }

  document.getElementById("loader").style.display = "block";
  document.getElementById("board").style.display = "none";

  // simulate loading delay so it feels like AI
  await new Promise(resolve => setTimeout(resolve, 1500));

  const vibes = {
    cozy: {
      title: "Cozy Warmth",
      colors: ["#C8956C", "#E8C9A0", "#F2E8DC", "#8B6355", "#D4A574"],
      fonts: ["Playfair Display", "Lora"],
      quote: "Happiness is a warm cup of tea and a good book.",
      imageKeywords: ["cozy cabin", "autumn leaves", "warm fireplace"]
    },
    dark: {
      title: "Dark Academia",
      colors: ["#2C2416", "#5C4A1E", "#8B7355", "#C4A882", "#E8DCC8"],
      fonts: ["EB Garamond", "Cormorant Garamond"],
      quote: "She read books as one would breathe air.",
      imageKeywords: ["library", "candlelight", "vintage books"]
    },
    neon: {
      title: "Neon Nights",
      colors: ["#0D0D0D", "#FF006E", "#8338EC", "#3A86FF", "#FB5607"],
      fonts: ["Rajdhani", "Orbitron"],
      quote: "The city never sleeps, and neither does the dream.",
      imageKeywords: ["neon lights", "cyberpunk city", "night rain"]
    },
    pastel: {
      title: "Soft Dreams",
      colors: ["#FFD6E0", "#FFEFCF", "#C8E6C9", "#BBDEFB", "#E1BEE7"],
      fonts: ["Quicksand", "Nunito"],
      quote: "Let your soul bloom like a spring morning.",
      imageKeywords: ["pastel flowers", "soft clouds", "dreamy sky"]
    },
    default: {
      title: "Your Vibe",
      colors: ["#A8DADC", "#457B9D", "#1D3557", "#E63946", "#F1FAEE"],
      fonts: ["Montserrat", "Open Sans"],
      quote: "Every moment has its own color.",
      imageKeywords: ["aesthetic", "minimal", "nature"]
    }
  };

  // pick vibe based on keywords in prompt
  let data = vibes.default;
  const p = prompt.toLowerCase();
  if (p.includes("cozy") || p.includes("warm") || p.includes("autumn") || p.includes("cabin")) data = vibes.cozy;
  else if (p.includes("dark") || p.includes("academia") || p.includes("library")) data = vibes.dark;
  else if (p.includes("neon") || p.includes("cyber") || p.includes("punk") || p.includes("city")) data = vibes.neon;
  else if (p.includes("pastel") || p.includes("soft") || p.includes("dream") || p.includes("cute")) data = vibes.pastel;

  data.images = [];
  renderMoodboard(data);

  document.getElementById("loader").style.display = "none";
  document.getElementById("board").style.display = "block";
}

// ---- UNSPLASH FETCH ----
async function fetchImages(keywords) {
  const images = [];
  for (let keyword of keywords) {
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${keyword}&per_page=1&orientation=landscape`,
        { headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` } }
      );
      const data = await res.json();
      if (data.results && data.results[0]) {
        images.push(data.results[0].urls.regular);
      }
    } catch (e) {
      console.log("Image fetch failed for:", keyword);
    }
  }
  return images;
}

// ---- RENDER MOODBOARD (your friend fills the inside of this) ----
function renderMoodboard(data) {
  const board = document.getElementById("board");
  board.innerHTML = "";

  // title
  const title = document.createElement("h2");
  title.textContent = data.title;
  board.appendChild(title);

  // colors
  const colorRow = document.createElement("div");
  colorRow.className = "color-row";
  data.colors.forEach(hex => {
    const swatch = document.createElement("div");
    swatch.className = "swatch";
    swatch.style.backgroundColor = hex;
    swatch.title = hex;
    colorRow.appendChild(swatch);
  });
  board.appendChild(colorRow);

  // quote
  const quote = document.createElement("p");
  quote.className = "vibe-quote";
  quote.textContent = `"${data.quote}"`;
  board.appendChild(quote);

  // fonts
  const fontRow = document.createElement("div");
  fontRow.className = "font-row";
  data.fonts.forEach(font => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${font.replace(/ /g, "+")}&display=swap`;
    document.head.appendChild(link);

    const sample = document.createElement("p");
    sample.className = "font-sample";
    sample.style.fontFamily = font;
    sample.textContent = font;
    fontRow.appendChild(sample);
  });
  board.appendChild(fontRow);

  // images
  if (data.images && data.images.length > 0) {
    const imgRow = document.createElement("div");
    imgRow.className = "image-row";
    data.images.forEach(url => {
      const img = document.createElement("img");
      img.src = url;
      img.className = "board-img";
      imgRow.appendChild(img);
    });
    board.appendChild(imgRow);
  }

  // user uploaded image
  const userImg = document.getElementById("userImage");
  if (userImg && userImg.src && userImg.style.display !== "none") {
    const imgRow2 = document.createElement("div");
    imgRow2.className = "image-row";
    const clone = document.createElement("img");
    clone.src = userImg.src;
    clone.className = "board-img";
    imgRow2.appendChild(clone);
    board.appendChild(imgRow2);
  }
}

async function getAffirmation() {
  if (!selectedMood) { alert("Pick an emoji first!"); return; }
  const day = document.getElementById("dayInput").value.trim();
  if (!day) { alert("Tell us about your day first!"); return; }

  document.getElementById("affirmLoader").style.display = "block";
  document.getElementById("affirmCard").style.display = "none";

  await new Promise(resolve => setTimeout(resolve, 1200));

  const affirmations = {
    happy: {
      affirmation: "Your joy is contagious and you deserve every bit of happiness you feel today. Keep spreading that light — the world needs it.",
      tip: "Share your good mood with someone who might need it today.",
      color: "#FFF9C4"
    },
    sad: {
      affirmation: "It's okay to not be okay. Your feelings are valid and this moment will pass. You are stronger than you know.",
      tip: "Try stepping outside for 5 minutes of fresh air — it helps more than you think.",
      color: "#BBDEFB"
    },
    angry: {
      affirmation: "Your feelings make sense. Take a breath — you have the wisdom to handle this with grace when you're ready.",
      tip: "Write down what's bothering you for 2 minutes, then put it away.",
      color: "#FFCCBC"
    },
    tired: {
      affirmation: "You've been working so hard and your body is asking for rest. That's not weakness — that's wisdom.",
      tip: "Give yourself permission to do one less thing today.",
      color: "#E8EAF6"
    },
    anxious: {
      affirmation: "You are safe right now in this moment. Anxiety lies about the future — bring yourself back to right here, right now.",
      tip: "Try box breathing: inhale 4 counts, hold 4, exhale 4, hold 4.",
      color: "#E0F2F1"
    },
    excited: {
      affirmation: "That excitement you feel is your soul saying yes to life! Channel it into something amazing today.",
      tip: "Write down the one thing you're most excited about and take one step toward it today.",
      color: "#F3E5F5"
    }
  };

  const data = affirmations[selectedMood] || affirmations.happy;
  renderAffirmation(data);

  document.getElementById("affirmLoader").style.display = "none";
  document.getElementById("affirmCard").style.display = "block";
}
// ---- RENDER AFFIRMATION ----
function renderAffirmation(data) {
  const card = document.getElementById("affirmCard");
  card.style.backgroundColor = data.color;
  card.innerHTML = `
    <p class="affirmation-text">${data.affirmation}</p>
    <p class="affirmation-tip">💡 ${data.tip}</p>
  `;
}