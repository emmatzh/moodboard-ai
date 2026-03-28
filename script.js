let selectedMood = "";

// ---- STREAK ----
function updateStreak() {
  const today = new Date().toDateString();
  const last = localStorage.getItem("lastCheckin");
  let streak = parseInt(localStorage.getItem("streak") || "0");
  if (last !== today) {
    streak += 1;
    localStorage.setItem("streak", streak);
    localStorage.setItem("lastCheckin", today);
  }
  const el = document.getElementById("streakLine");
  if (el) el.textContent = `Day ${streak} of showing up for yourself ✨`;
}

document.addEventListener("DOMContentLoaded", () => {
  updateStreak();
  document.getElementById("imageUpload").addEventListener("change", function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(event) {
      const img = document.getElementById("userImage");
      img.src = event.target.result;
      img.style.display = "block";
    };
    reader.readAsDataURL(file);
  });
});

// ---- MOOD SELECTION ----
function selectMood(el) {
  selectedMood = el.dataset.mood;
  document.querySelectorAll(".emoji-btn").forEach(b => b.classList.remove("selected"));
  el.classList.add("selected");

  const panel = document.getElementById("checkin-panel");
  panel.className = panel.className.replace(/mood-\w+/g, "").trim();
  panel.classList.add(`mood-${selectedMood}`);

  const moodToVibe = {
    happy: "happy pastel cute",
    sad: "calm ocean minimal",
    angry: "dark academia gothic",
    tired: "cozy autumn cabin hygge",
    anxious: "forest nature botanical",
    excited: "sunset dusk twilight"
  };

  const vibe = moodToVibe[selectedMood];
  if (vibe) document.getElementById("vibeInput").value = vibe;
}

// ---- EXPORT BOARD ----
function exportBoard() {
  const board = document.getElementById("board");
  html2canvas(board, {
    useCORS: true,
    allowTaint: false,
    backgroundColor: "#FDFAF7",
    scale: 2
  }).then(canvas => {
    const link = document.createElement("a");
    link.download = "moodboard.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }).catch(err => {
    console.error("Export failed:", err);
    alert("Download failed — try right clicking the board and saving as image instead!");
  });
}

function selectVibe(prompt) {
  document.getElementById("vibeInput").value = prompt;
  generateMoodboard();
}

// ---- SPOTIFY PLAYLISTS ----
const moodPlaylists = {
  happy: "https://open.spotify.com/embed/playlist/37i9dQZF1DXdPec7aLTmlC",
  sad: "https://open.spotify.com/embed/playlist/37i9dQZF1DX7K31D69s4M1",
  angry: "https://open.spotify.com/embed/playlist/37i9dQZF1DX4sWSpwq3LiO",
  tired: "https://open.spotify.com/embed/playlist/37i9dQZF1DWZd79rJ6a7lp",
  anxious: "https://open.spotify.com/embed/playlist/37i9dQZF1DWXe9gFZP0gtP",
  excited: "https://open.spotify.com/embed/playlist/37i9dQZF1DX3rxVfibe1L0"
};

// ---- VIBES ----
const vibes = {
  calm: {
    title: "Be as calm as the water",
    colors: ["#A8DADC", "#D6F0F8", "#EDF6F9", "#89C2D9", "#CFE8F3"],
    titleFont: "Playfair Display",
    bodyFont: "Lora",
    quote: "Let the quiet within you be louder than the noise around you.",
    keywords: ["calm", "peaceful", "relaxed", "quiet", "soft"],
    images: [
      "https://images.unsplash.com/photo-1650602702240-c44cb17de570?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG9jZWFuJTIwYmx1ZXxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1580666622398-d5bffc4c9051?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNvZmZlZSUyMHdpdGglMjBibHVlJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D",
      "https://media.istockphoto.com/id/1446415958/photo/landscape-of-heaven-and-earth-jubtas.webp?a=1&b=1&s=612x612&w=0&k=20&c=vwxDh58DFXd-fcGTDO20BjFut1F0vX9cfxBexVdicHc=",
      "https://images.unsplash.com/photo-1585821037935-e35488ab3b94?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJsdWUlMjBmbG93ZXJ8ZW58MHx8MHx8fDA%3D"
    ]
  },
  happy: {
    title: "Feeling joyful and blissful",
    colors: ["#FFD166", "#FFE29A", "#FFF3B0", "#F6D365", "#FFEF9F"],
    titleFont: "DM Serif Display",
    bodyFont: "Nunito",
    quote: "Let yourself glow in the warmth of this moment.",
    keywords: ["happy", "joy", "cheerful", "bright", "good", "pastel", "cute"],
    images: [
      "https://images.unsplash.com/photo-1442528010304-834a5d4f3925?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fHN1bmZsb3dlcnxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1749805339707-4f797b4b5b3c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
      "https://images.unsplash.com/photo-1711287444863-2eadd4766ef0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzd8fHllbGxvdyUyMHR1bGlwc3xlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1685294380081-a240d0abb9f0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z2lybCUyMHdpdGglMjBkcmVzc3xlbnwwfHwwfHx8MA%3D%3D"
    ]
  },
  stressed: {
    title: "Let your mind wonder",
    colors: ["#5F7F67", "#8DAA91", "#CAD2C5", "#A3B18A", "#E9F0E3"],
    titleFont: "Cormorant Garamond",
    bodyFont: "Merriweather",
    quote: "Breathe slowly. You do not have to carry everything at once.",
    keywords: ["stressed", "stress", "overwhelmed", "anxious", "tense", "forest", "nature", "botanical"],
    images: [
      "https://images.unsplash.com/photo-1689994618755-71e5c4bffaec?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGdyZWVuJTIwcG9uZHxlbnwwfHwwfHx8MA%3D%3D",
      "https://media.istockphoto.com/id/2231272623/photo/sprinkling-matcha-powder.webp?a=1&b=1&s=612x612&w=0&k=20&c=S2uQKZ7vTwdEqTF4-SGUaiqTW8WSKGa0E_I2UZ3BORA=",
      "https://media.istockphoto.com/id/638008750/photo/young-tree-with-bokeh.jpg?s=612x612&w=0&k=20&c=U1gltUPm69ULBOEPoQEtq98a2cU3U0WjXitO-O7epgg=",
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=80https://media.istockphoto.com/id/1308087213/photo/backyard-english-cottage-garden-colorful-flowering-plant-and-green-grass-lawn-brown-pavement.webp?a=1&b=1&s=612x612&w=0&k=20&c=vVzrT7N8UDysMpCYyaTbH-dAdZqeDwbrTtwF7SrAyAk=",
    ]
  },
  lonely: {
    title: "Rest assured in your comfort",
    colors: ["#C9ADA7", "#EDE0D4", "#F5EBE0", "#B08968", "#D6CCC2"],
    titleFont: "Playfair Display",
    bodyFont: "Crimson Text",
    quote: "Even in quiet moments, you are still deeply held by the world.",
    keywords: ["lonely", "alone", "isolated", "empty", "comfort", "ocean", "minimal"],
    images: [
      "https://plus.unsplash.com/premium_photo-1732017765144-d8d536170804?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIwfHx8ZW58MHx8fHx8",
      "https://images.pexels.com/photos/9808006/pexels-photo-9808006.jpeg",
      "https://images.unsplash.com/photo-1603950227760-e609ce8e15b4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29mZmVlJTIwYWVzdGhldGljfGVufDB8fDB8fHww",
      "https://media.istockphoto.com/id/1370672683/photo/time-for-me.jpg?s=612x612&w=0&k=20&c=dz1RQEVjKlH7qu8ulC1c_8Yl5ik3tUgJ_sosMwh_WXY="
    ]
  },
  tired: {
    title: "Rest & reset your mind",
    colors: ["#D8D8D8", "#ECECEC", "#F7F7F7", "#BFC0C0", "#A5A5A5"],
    titleFont: "Libre Baskerville",
    bodyFont: "Open Sans",
    quote: "Rest is not falling behind. Rest is part of becoming whole again.",
    keywords: ["tired", "sleepy", "drained", "exhausted", "rest", "cozy", "autumn", "cabin", "hygge"],
    images: [
      "https://images.unsplash.com/photo-1720811568552-efdbdf48b769?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2xlZXAlMjBvbiUyMGJlZCUyMGFlc3RoZXRpY3xlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1656690099946-51dd6d2e7ccf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGZlZWxpbmclMjBicmVha2Zhc3R8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1586380951230-e6703d9f6833?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8am91cm5hbHxlbnwwfHwwfHx8MA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1723488395681-bf0e187c5486?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D"
    ]
  },
  hopeful: {
    title: "The journey that makes it worth",
    colors: ["#FDBA74", "#FED7AA", "#FDE68A", "#FFEDD5", "#FFD6A5"],
    titleFont: "Libre Baskerville",
    bodyFont: "Lato",
    quote: "A new day is still allowed to be beautiful, even after a hard one.",
    keywords: ["hopeful", "hope", "fresh", "better", "sunrise", "sunset", "dusk", "twilight", "golden"],
    images: [
      "https://images.unsplash.com/photo-1737113558728-368e66afd201?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D",
      "https://images.unsplash.com/photo-1567629556663-4989821642aa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZsb3dlciUyMGFuZCUyMHNreXxlbnwwfHwwfHx8MA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1712935716264-6cf176237b0b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fG1lZGl0YXRlfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1611338687599-7b4cb865b254?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D"
    ]
  },
  sad: {
    title: "You're not alone in this",
    colors: ["#A8DADC", "#457B9D", "#1D3557", "#0d719f", "#eef8fa"],
    titleFont: "Montserrat",
    bodyFont: "Open Sans",
    quote: "Every feeling deserves a space to be seen. Tears come from the heart and not from the brain.",
    keywords: ["sad","down","blue","upset","cry"],
    images: [
      "https://images.unsplash.com/photo-1736348188907-d570b50fd1d4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3Jvd2RlZCUyMHBsYWNlfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1580812334637-d31a2cf7a175?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fGZlZWxpbmclMjBsb3N0JTIwdGVhcnN8ZW58MHx8MHx8fDA%3D",
      "https://plus.unsplash.com/premium_photo-1666299237086-aeb47e4ea8cd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzl8fGJlZCUyMGNyeWluZ3xlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1563905810819-351c6649df16?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFza3xlbnwwfHwwfHx8MA%3D%3D"
    ]
  },
  angry: {
    title: "Burning inside that unleashed one fury.",
    colors: ["#A8DADC", "#457B9D", "#1D3557", "#E63946", "#F1FAEE"],
    titleFont: "Playfair Display",
    bodyFont: "Open Sans",
    quote: "For every minute you remain angry, you give up sixty seconds of peace",
    keywords: ["angry","frustrated", "burst", "strong feeling","anger"],
    images: [
      "https://plus.unsplash.com/premium_photo-1697474429687-5fbfdd7622d3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YW5nZXJ8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1653067415490-e83562337955?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFnZXxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1639658342527-21899fd8ca0a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHJhZ2V8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1770561799814-c1176e021c8f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2FsbSUyMHJpdmVyfGVufDB8fDB8fHww"
    ]
  },
  excited: {
    title: "Feeling over the moon",
    colors: ["#A8DADC", "#457B9D", "#1D3557", "#E63946", "#F1FAEE"],
    titleFont: "Playfair Display",
    bodyFont: "Open Sans",
    quote: "Can’t stop, won’t stop—this is my moment!",
    keywords: ["excited","fun","joy"],
    images: [
      "https://images.unsplash.com/photo-1479742285000-3f6ca2fd0291?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZXhjaXRlbWVudHxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1586836476603-ce713984045e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZXhjaXRpbmd8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1612038750554-db2fa5d68752?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2VsZWJyYXRlfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNlbGVicmF0ZXxlbnwwfHwwfHx8MA%3D%3D"
    ]
  }
};

// ---- MOOD GENERATION ----
async function generateMoodboard(moodKey) {
  const prompt = moodKey || document.getElementById("vibeInput").value.trim();
  if (!prompt) { alert("Pick a mood or type a vibe first!"); return; }

  document.getElementById("loader").style.display = "block";
  document.getElementById("board").style.display = "none";
  document.getElementById("exportBtn").style.display = "none";

  await new Promise(resolve => setTimeout(resolve, 1500));

  let matched;

  if (moodKey && vibes[moodKey]) {
    // coming from emoji check-in — direct lookup, no keyword matching needed
    matched = vibes[moodKey];
  } else {
    // coming from typed vibeInput — keyword matching
    const p = prompt.toLowerCase();
    matched = vibes.default;
    for (const [key, vibe] of Object.entries(vibes)) {
      if (key === "default") continue;
      if (vibe.keywords && vibe.keywords.some(kw => p.includes(kw))) {
        matched = vibe;
        break;
      }
    }
  }

  renderMoodboard(matched);
  document.getElementById("emptyState").style.display = "none";
  document.getElementById("loader").style.display = "none";
  document.getElementById("board").style.display = "block";
  document.getElementById("exportBtn").style.display = "block";
}

// ---- RENDER MOODBOARD ----
function renderMoodboard(data) {
  const board = document.getElementById("board");
  board.innerHTML = "";

  const fontsToLoad = [data.titleFont, data.bodyFont];
  fontsToLoad.forEach(font => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${font.replace(/ /g, "+")}&display=swap`;
    document.head.appendChild(link);
  });

  const title = document.createElement("h2");
  title.className = "board-title";
  title.style.fontFamily = data.titleFont;
  title.textContent = data.title;
  board.appendChild(title);

  const colorRow = document.createElement("div");
  colorRow.className = "color-row";
  data.colors.forEach(hex => {
    const swatch = document.createElement("div");
    swatch.className = "swatch";
    swatch.style.backgroundColor = hex;
    const hexLabel = document.createElement("span");
    hexLabel.className = "hex-label";
    hexLabel.textContent = hex;
    swatch.appendChild(hexLabel);
    colorRow.appendChild(swatch);
  });
  board.appendChild(colorRow);

  const imgGrid = document.createElement("div");
  imgGrid.className = "image-grid";
  data.images.forEach((url, i) => {
    const img = document.createElement("img");
    img.src = url;
    img.className = `board-img img-${i}`;
    img.alt = "moodboard image";
    img.onerror = function() {
      this.style.backgroundColor = data.colors[i] || "#eee";
      this.src = "";
      this.alt = "";
    };
    imgGrid.appendChild(img);
  });
  board.appendChild(imgGrid);

  const quote = document.createElement("p");
  quote.className = "vibe-quote";
  quote.style.fontFamily = data.bodyFont;
  quote.textContent = `"${data.quote}"`;
  board.appendChild(quote);


  const userImg = document.getElementById("userImage");
  if (userImg && userImg.src && userImg.style.display !== "none") {
    const userImgWrapper = document.createElement("div");
    userImgWrapper.className = "user-img-wrapper";
    const label = document.createElement("p");
    label.className = "user-img-label";
    label.textContent = "✨ Your Photo";
    const clone = document.createElement("img");
    clone.src = userImg.src;
    clone.className = "board-img user-upload-img";
    userImgWrapper.appendChild(label);
    userImgWrapper.appendChild(clone);
    board.appendChild(userImgWrapper);
  }
}

// ---- AFFIRMATION ----
async function getAffirmation() {
  if (!selectedMood) { alert("Pick an emoji first!"); return; }
  const day = document.getElementById("dayInput").value.trim();
  if (!day) { alert("Tell us about your day first!"); return; }

  document.getElementById("affirmLoader").style.display = "block";
  document.getElementById("affirmCard").style.display = "none";
  document.getElementById("playlistCard").style.display = "none";

  await new Promise(resolve => setTimeout(resolve, 1200));

  const affirmations = {
    happy: { affirmation: "Your joy is contagious and you deserve every bit of happiness you feel today. Keep spreading that light — the world needs it.", tip: "Share your good mood with someone who might need it today.", color: "#FFF9C4" },
    sad: { affirmation: "It's okay to not be okay. Your feelings are valid and this moment will pass. You are stronger than you know.", tip: "Try stepping outside for 5 minutes of fresh air — it helps more than you think.", color: "#BBDEFB" },
    angry: { affirmation: "Your feelings make sense. Take a breath — you have the wisdom to handle this with grace when you're ready.", tip: "Write down what's bothering you for 2 minutes, then put it away.", color: "#FFCCBC" },
    tired: { affirmation: "You've been working so hard and your body is asking for rest. That's not weakness — that's wisdom.", tip: "Give yourself permission to do one less thing today.", color: "#E8EAF6" },
    anxious: { affirmation: "You are safe right now in this moment. Anxiety lies about the future — bring yourself back to right here, right now.", tip: "Try box breathing: inhale 4 counts, hold 4, exhale 4, hold 4.", color: "#E0F2F1" },
    excited: { affirmation: "That excitement you feel is your soul saying yes to life! Channel it into something amazing today.", tip: "Write down the one thing you're most excited about and take one step toward it today.", color: "#F3E5F5" }
  };

  const data = affirmations[selectedMood] || affirmations.happy;
  renderAffirmation(data);

  document.getElementById("affirmLoader").style.display = "none";
  document.getElementById("affirmCard").style.display = "block";

  generateMoodboard(selectedMood);
}

// ---- RENDER AFFIRMATION ----
function renderAffirmation(data) {
  const card = document.getElementById("affirmCard");
  card.style.backgroundColor = data.color;
  card.innerHTML = `
    <p class="affirmation-text">${data.affirmation}</p>
    <p class="affirmation-tip">💡 ${data.tip}</p>
  `;

  // show spotify playlist
  const playlistCard = document.getElementById("playlistCard");
  const embed = document.getElementById("spotifyEmbed");
  embed.src = moodPlaylists[selectedMood] || moodPlaylists.happy;
  playlistCard.style.display = "block";
}