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
  sad: "https://open.spotify.com/embed/playlist/37i9dQZF1DX3YSRoSdA634",
  angry: "https://open.spotify.com/embed/playlist/37i9dQZF1DWWjGdmHM4T78",
  tired: "https://open.spotify.com/embed/playlist/37i9dQZF1DX4sWSpwq3LiO",
  anxious: "https://open.spotify.com/embed/playlist/37i9dQZF1DWXe9gFZP0gtP",
  excited: "https://open.spotify.com/embed/playlist/37i9dQZF1DX0HRj9P7NxeE"
};

// ---- VIBES ----
const vibes = {
  calm: {
    title: "Calm Waters",
    colors: ["#A8DADC", "#D6F0F8", "#EDF6F9", "#89C2D9", "#CFE8F3"],
    titleFont: "Playfair Display",
    bodyFont: "Lora",
    quote: "Let the quiet within you be louder than the noise around you.",
    keywords: ["calm", "peaceful", "relaxed", "quiet", "soft"],
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511300636408-a63a89df3482?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  happy: {
    title: "Golden Joy",
    colors: ["#FFD166", "#FFE29A", "#FFF3B0", "#F6D365", "#FFEF9F"],
    titleFont: "DM Serif Display",
    bodyFont: "Nunito",
    quote: "Let yourself glow in the warmth of this moment.",
    keywords: ["happy", "joy", "cheerful", "bright", "good", "pastel", "cute"],
    images: [
      "https://images.unsplash.com/photo-1490750967868-88df5691cc8e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  stressed: {
    title: "Grounded Green",
    colors: ["#5F7F67", "#8DAA91", "#CAD2C5", "#A3B18A", "#E9F0E3"],
    titleFont: "Cormorant Garamond",
    bodyFont: "Merriweather",
    quote: "Breathe slowly. You do not have to carry everything at once.",
    keywords: ["stressed", "stress", "overwhelmed", "anxious", "tense", "forest", "nature", "botanical"],
    images: [
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  lonely: {
    title: "Soft Comfort",
    colors: ["#C9ADA7", "#EDE0D4", "#F5EBE0", "#B08968", "#D6CCC2"],
    titleFont: "Playfair Display",
    bodyFont: "Crimson Text",
    quote: "Even in quiet moments, you are still deeply held by the world.",
    keywords: ["lonely", "alone", "isolated", "empty", "comfort", "ocean", "minimal"],
    images: [
      "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  tired: {
    title: "Rest & Reset",
    colors: ["#D8D8D8", "#ECECEC", "#F7F7F7", "#BFC0C0", "#A5A5A5"],
    titleFont: "Libre Baskerville",
    bodyFont: "Open Sans",
    quote: "Rest is not falling behind. Rest is part of becoming whole again.",
    keywords: ["tired", "sleepy", "drained", "exhausted", "rest", "cozy", "autumn", "cabin", "hygge"],
    images: [
      "https://images.unsplash.com/photo-1520209759809-a9bcb6cb3241?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  hopeful: {
    title: "New Light",
    colors: ["#FDBA74", "#FED7AA", "#FDE68A", "#FFEDD5", "#FFD6A5"],
    titleFont: "Cinzel",
    bodyFont: "Lato",
    quote: "A new day is still allowed to be beautiful, even after a hard one.",
    keywords: ["hopeful", "hope", "fresh", "better", "sunrise", "sunset", "dusk", "twilight", "golden"],
    images: [
      "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  default: {
    title: "Your Mood",
    colors: ["#A8DADC", "#457B9D", "#1D3557", "#E63946", "#F1FAEE"],
    titleFont: "Montserrat",
    bodyFont: "Open Sans",
    quote: "Every feeling deserves a space to be seen.",
    keywords: [],
    images: [
      "https://images.unsplash.com/photo-1499336315816-097655dcfbda?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1200&q=80"
    ]
  }
};

// ---- MOODBOARD GENERATION ----
async function generateMoodboard() {
  const prompt = document.getElementById("vibeInput").value.trim();
  if (!prompt) { alert("Pick a mood or type a vibe first!"); return; }

  document.getElementById("loader").style.display = "block";
  document.getElementById("board").style.display = "none";
  document.getElementById("exportBtn").style.display = "none";

  await new Promise(resolve => setTimeout(resolve, 1500));

  const p = prompt.toLowerCase();
  let matched = vibes.default;

  for (const [key, vibe] of Object.entries(vibes)) {
    if (key === "default") continue;
    if (vibe.keywords && vibe.keywords.some(kw => p.includes(kw))) {
      matched = vibe;
      break;
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

  const fontRow = document.createElement("div");
  fontRow.className = "font-row";
  const titleSample = document.createElement("p");
  titleSample.className = "font-sample font-title-sample";
  titleSample.style.fontFamily = data.titleFont;
  titleSample.textContent = data.titleFont;
  fontRow.appendChild(titleSample);
  const bodySample = document.createElement("p");
  bodySample.className = "font-sample font-body-sample";
  bodySample.style.fontFamily = data.bodyFont;
  bodySample.textContent = data.bodyFont;
  fontRow.appendChild(bodySample);
  board.appendChild(fontRow);

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

  generateMoodboard();

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