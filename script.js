// 1. Select Elements using queryselector 
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector ("#notes-list");
const noteCount = document.querySelector ("#note-count");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");
const clearAllBtn = document.querySelector("#clear-all-btn");
const themeToggle = document.querySelector("#theme-toggle");

// 2. CONSTANTS
const MAX_LENGTH = 200;
const STORAGE_KEY = "downnote-notes";
const THEME_KEY = "downnote-theme";
const CATEGORIES = ["personal", "work", "study"];

// 3. State the notes array
let notes = loadNotes();

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
  card.className = `note-card category-${note.category}`;

  const text = document.createElement("p");
  text.className = "note-text";
  text.textContent = note.text;

  const footer = document.createElement("div");
  footer.className = "note-footer";

  const badge = document.createElement("span");
  badge.className = "category-badge";
  badge.textContent = capitalise(note.category);

  const date = document.createElement("span");
  date.className = "note-date";
  date.textContent = note.createdAt;

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "btn-danger delete-btn";
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", function () {
    deleteNote(note.id);
  });

  footer.append(badge, date, deleteBtn);
  card.append(text, footer);
  return card;
}

// 6. render()
function render() {
  const visibleNotes = getVisibleNotes();

  notesList.textContent = ""; 

  if (visibleNotes.length === 0) {
    const message = document.createElement("li");
    message.className = "empty-message";
    
    if (searchInput.value.trim() !== "") {
      message.textContent = "No notes match your search.";
    } else {
      message.textContent = "Nothing here yet. Add your first note above.";
    }
    notesList.appendChild(message);
  }

  for (const note of visibleNotes) {
    notesList.appendChild(createNoteCard(note));
  }

  updateCount();
  clearAllBtn.disabled = notes.length === 0;
}

// 7. Note Count
function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

// 8. Search filter
function getVisibleNotes() {
  const words = searchInput.value
  .trim()
  .toLowerCase()
  .split(/\s+/)
  .filter((word) => word !== "");

  return notes.filter((note) => {
    const lowerText = note.text.toLowerCase();
    return words.every((word) => lowerText.includes(word));
  });
}

// 8. Validation Messages
function showError(message) {
  errorMessage.textContent = message;
}

function clearError() {
  errorMessage.textContent = "";
}

// 9. Add a Note
noteForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = noteInput.value.trim();

  if (text === "") {
    showError("Please type a note first.");
    return;
  }
  if (text.length > MAX_LENGTH) {
    showError("Notes must be 200 characters or fewer.");
    return;
  }

  clearError();

  const newNote = {
    id: Date.now(),
    text: text,
    category: noteCategory.value,
    createdAt: formatDate(new Date()),
  };

  notes.unshift(newNote);
  saveNotes();
  noteInput.value = "";
  noteInput.focus();
  render();
});

//  10. Delete a Note
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render();
}

// Save And Load (localStorage)
function saveNotes() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    console.warn("Could not save notes:", error);
  }
}

function loadNotes() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === null) {
      return [];
    }

    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((note) => {
      return typeof note.text === "string" && CATEGORIES.includes(note.category);
    });
  } catch (error) {
    return [];
  }
}

// Search Event
searchInput.addEventListener("input", render);

// Clear All
clearAllBtn.addEventListener("click", function () {
  if (confirm("Delete all notes?")) {
    notes = [];
    saveNotes();
    render();
  }
});

//Light / Dark Theme
function applyTheme(theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  themeToggle.textContent =theme === "dark" ? "Light" : "Dark";
} 

themeToggle.addEventListener("click",  function () {
  const isDark = document.documentElement.classList.contains("dark");
  const newTheme = isDark ? "light" : "dark";
  applyTheme(newTheme);
  localStorage.setItem(THEME_KEY, newTheme);
});

const savedTheme = localStorage.getItem(THEME_KEY);
if (savedTheme !== null) {
  applyTheme(savedTheme);
} else {
  applyTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
}


render();