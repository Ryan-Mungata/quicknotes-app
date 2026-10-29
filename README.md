# DownNote

*Take and Store notes faster, easily and conveniently.*

## Description

DownNote is a simple note-taking web app built with **HTML**, **CSS** and **JavaScript**, with no frameworks or libraries. You type a note, choose a category (Personal, Work or Study), and it appears as a colour-coded card showing the text, the category, and the date and time it was created. Your notes are saved in the browser using **localStorage**, so they are still there after you refresh or close the page. You can search your notes, delete them one by one or all at once, and switch between a light and a dark theme. The layout adjusts to phones, tablets and desktops.

## Features

- **Add notes** with a category: Personal, Work or Study
- **Note cards** that show the note text, a category label, the date and time created, and a Delete button
- **Colour-coded categories:** each category has its own left-border colour (teal, dark red and blue)
- **Validation:** an error message appears if the note is empty (or only spaces) or longer than 200 characters
- **Delete a note** with its own Delete button
- **Live search:** the list filters as you type, ignores upper and lower case, and shows "No notes match your search." when nothing is found
- **Note counter** that reads correctly for none, one or many notes ("You have no notes yet.", "You have 1 note.", "You have N notes.")
- **Saved notes:** notes are stored in `localStorage` and loaded again when the page opens
- **Clear all** button that asks for confirmation first (bonus feature)
- **Light and dark themes:** the app follows your device setting at first, then remembers the theme you choose
- **Responsive design:** a `@media (max-width: 600px)` rule stacks the form vertically on small screens
- **Accessible:** every input has a `<label>`, and the error message uses `role="alert"`

## Technologies Used

- **HTML5** for the structure, using semantic tags (`header`, `main`, `section`, `footer`)
- **CSS3** with CSS variables, Flexbox and a media query
- **JavaScript (ES6)** for the app logic, using the DOM, arrays of objects and `localStorage`

## How to Run Locally

You do not need to install anything.

1. Clone the repository:
   ```bash
   git clone https://github.com/Ryan-Mungata/quicknotes-app.git
   ```
2. Open the `quicknotes-app` folder in VS Code.
3. Right-click `index.html` and choose **Open with Live Server**. You can also double-click `index.html` to open it in your browser.

## Project Structure

```
quicknotes-app/
├── index.html   # the page structure
├── style.css    # styling, light/dark themes and responsive layout
├── script.js    # adding, deleting, searching, validation and saving notes
└── README.md    # project documentation
```

## How It Works

1. Each note is an **object** with four properties: `id`, `text`, `category` and `createdAt`.
2. All notes are kept in one **array**. The array is the source of truth, and the page is just a picture of it.
3. The `render()` function clears the list and rebuilds it from the array using `createElement` and `textContent`. It is called every time the notes or the search text change.
4. After every change, the array is converted to text with `JSON.stringify` and saved in `localStorage`. When the page opens, it is read back with `JSON.parse`.

## What I Learned

- **Semantic HTML and labels:** how to structure a page with `header`, `main`, `section` and `footer`, and link each `<label>` to its input using `for` and `id`.
- **CSS variables for theming:** the dark theme only redefines the colour variables, so the whole page changes without rewriting any other rule. I also learned to use Flexbox for the form layout and a media query for small screens.
- **Arrays of objects and `render()`:** keeping the data in an array and rebuilding the page from it makes adding, deleting and searching simple and consistent.
- **Safe DOM updates:** using `createElement` and `textContent` instead of `innerHTML` means anything a user types is shown as plain text and can never run as code.
- **Saving data with `localStorage`:** `localStorage` only stores text, so arrays must be converted with `JSON.stringify` and `JSON.parse`, and loaded data should be checked in case it is missing or broken.
- **Debugging:** reading the red error messages in the Console, and checking small details such as a missing `#` in a selector, a misspelled property like `lenght`, or using quotes instead of backticks for template literals.
- **Working with Git:** building the project in small steps and committing after each one, so the commit history shows how the app grew.

# Ryan Kyalo. Konoha Tech.