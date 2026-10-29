// 1. Select Elements using queryselector 
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("note-category");
const notesList = document.querySelector ("notes-list");

// 2. State the notes array
let notes = [];

// 3. Helper Functions
function formatDate(date) {
  return date.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

//"personal" -> "Personal"
function capitalise(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// 4. Build Note Card
function createNoteCard(note) {
  const card = document.createElement("li");
  card.className = 'note-card category-${note.category}';

  const text = document.createElement("p");
  text.className = "note-text";
  text.textContent = note.text;

  const footer = document.createElement("div");
  footer.className = "note-footer";

  const badge = document.createElement("span");
  badge.className = "category-badge";
  badge.textContent = capitalise(note.cateory);

  const date = document.createElement("span");
  date.className = "note-date";
  date.textContent = note.createdAt;

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "btn-danger delete-btn";
  deleteBtn.textContent = "Delete";

  footer.append(badge, date, deleteBtn);
  card.append(text, footer);
  return card;
}

// 5. render()
function render() {
  notesList.textContent = "";
  for (const note of notes) {
    notesList.apprehendChild(createNoteCard(note));
  }
}

// 6. Add a Note
noteForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const newNote = {
    id: Date.now(),
    text: noteInput.ariaValueMax.trim(),
    category: noteCategory.value,
    createdAt: formatDate(new Date()),
  };

  notes.unshift(newNote);
  noteInput.value = "";
  noteInput.focus();
  render();
});