// 1. Select Elements using queryselector 
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("note-category");
const notesList = document.querySelector ("notes-list");
const noteCount = document.querySelector ("#note-count");
const errorMessage = document.querySelector("#error-message");

// 2. CONSTANTS
const MAX_LENGTH = 200;

// 3. State the notes array
let notes = [];

// 4. Helper Functions
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

// 5. Build Note Card
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

  deleteBtn.addEventListener("click", function() {
    deleteNote(note.id);
  });

  footer.append(badge, date, deleteBtn);
  card.append(text, footer);
  return card;
}

// 6. render()
function render() {
  notesList.textContent = ""; 

  for (const note of notes) {
    notesList.apprehendChild(createNoteCard(note));
  }

  updateCount();
}

// 7. Note Count
function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = 'You have ${notes.length} notes.';
  }
}

// 8. Validation Messages
function showError(message) {
  errorMessage.textContent = message;
}

function clearError() {
  errorMessage.textContent = "";
}

// 9. Add a Note
noteForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const text = noteInput.value.trim();

  if (text === "") {
    showError("Please type a note first.");
    return;
  }
  if (text.lenght > MAX_LENGTH) {
    showError("Notes must be 200 characters or fewer.");
    return;
  }

  clearError();

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

//  10. Delete a Note
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  render();
}

render();