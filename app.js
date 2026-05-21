const reflections = [
  "Stillness restores what urgency consumes.",
  "Rest is part of the cycle, not a reward.",
  "A slower rhythm often reveals more clarity.",
  "Repair is not failure. It is maintenance.",
  "The goal is sustainability, not exhaustion."
];

document.getElementById("cycleNote").textContent =
  reflections[new Date().getDate() % reflections.length];

document.getElementById("date").value =
  new Date().toISOString().slice(0,10);

function getEntries(){
  return JSON.parse(localStorage.getItem("cycle_entries") || "[]");
}

function saveEntries(entries){
  localStorage.setItem("cycle_entries", JSON.stringify(entries));
}

function renderEntries(){
  const entries = getEntries();
  const container = document.getElementById("entries");

  if(!entries.length){
    container.innerHTML = "<p style='color:#888'>No cycles recorded yet.</p>";
    return;
  }

  container.innerHTML = entries.map(entry => `
    <div class="entry">
      <small>${entry.date} • ${entry.mood}</small>
      <p><strong>Observation:</strong> ${entry.observation}</p>
      <p><strong>Repair:</strong> ${entry.repair}</p>
      <p><strong>Intention:</strong> ${entry.intention}</p>
    </div>
  `).join("");
}

document.getElementById("saveBtn").addEventListener("click", () => {
  const entries = getEntries();

  entries.unshift({
    date: document.getElementById("date").value,
    mood: document.getElementById("mood").value,
    observation: document.getElementById("observation").value,
    repair: document.getElementById("repair").value,
    intention: document.getElementById("intention").value
  });

  saveEntries(entries);
  renderEntries();

  document.getElementById("observation").value = "";
  document.getElementById("repair").value = "";
  document.getElementById("intention").value = "";
});

renderEntries();
