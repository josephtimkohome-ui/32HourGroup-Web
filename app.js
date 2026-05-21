const ids = ["creation", "maintenance", "reflection", "connection", "rest"];

document.getElementById("cycleDate").value = new Date().toISOString().slice(0, 10);

ids.forEach(id => {
  const slider = document.getElementById(id);
  const value = document.getElementById(id + "Val");
  slider.addEventListener("input", () => value.textContent = slider.value);
});

function getEntries() {
  return JSON.parse(localStorage.getItem("cycleEntries") || "[]");
}

function saveEntries(entries) {
  localStorage.setItem("cycleEntries", JSON.stringify(entries));
}

function renderEntries() {
  const entries = getEntries();
  const container = document.getElementById("entries");

  if (!entries.length) {
    container.innerHTML = "<p>No entries yet. Start with one honest cycle.</p>";
    return;
  }

  container.innerHTML = entries.map(entry => `
    <article class="entry">
      <small>${entry.date} • ${entry.feel}</small>
      <div class="scores">
        <span class="score">Creation: ${entry.scores.creation}</span>
        <span class="score">Maintenance: ${entry.scores.maintenance}</span>
        <span class="score">Reflection: ${entry.scores.reflection}</span>
        <span class="score">Connection: ${entry.scores.connection}</span>
        <span class="score">Rest: ${entry.scores.rest}</span>
      </div>
      <p><strong>Noticed:</strong> ${entry.noticed || "—"}</p>
      <p><strong>Repair:</strong> ${entry.repair || "—"}</p>
      <p><strong>Intention:</strong> ${entry.intention || "—"}</p>
    </article>
  `).join("");
}

document.getElementById("saveBtn").addEventListener("click", () => {
  const entry = {
    id: crypto.randomUUID(),
    date: document.getElementById("cycleDate").value,
    feel: document.getElementById("cycleFeel").value,
    scores: {
      creation: document.getElementById("creation").value,
      maintenance: document.getElementById("maintenance").value,
      reflection: document.getElementById("reflection").value,
      connection: document.getElementById("connection").value,
      rest: document.getElementById("rest").value,
    },
    noticed: document.getElementById("noticed").value.trim(),
    repair: document.getElementById("repair").value.trim(),
    intention: document.getElementById("intention").value.trim(),
    createdAt: new Date().toISOString()
  };

  const entries = getEntries();
  entries.unshift(entry);
  saveEntries(entries);

  document.getElementById("noticed").value = "";
  document.getElementById("repair").value = "";
  document.getElementById("intention").value = "";

  renderEntries();
});

document.getElementById("exportBtn").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(getEntries(), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "32hour-cycle-journal.json";
  a.click();
  URL.revokeObjectURL(url);
});

document.getElementById("clearBtn").addEventListener("click", () => {
  if (confirm("Clear all journal entries from this browser?")) {
    localStorage.removeItem("cycleEntries");
    renderEntries();
  }
});

renderEntries();
