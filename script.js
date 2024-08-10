// DOM elements
const inputField = document.querySelector('#book-name');
const addBookBtn = document.querySelector('#addBook-btn');
const bookCard = document.querySelector('#book-container');
const popupDiv = document.querySelector('.popup-div');
const popupMessage = document.querySelector('#popup-message');
const bookForm = document.querySelector('.book-form');
const closePopup = document.querySelector('#close-popup');
const closeBookFormBtn = document.querySelector('#close-book-form');

// Form elements
const submitBookFormBtn = document.querySelector('#submit-bookform');
const bookTitle = document.querySelector('#book-title');
const bookAuthor = document.querySelector('#book-author');
const bookPages = document.querySelector('#book-pages');
const isBookRead = document.querySelector('#book-isread');

let myLibrary = [];

class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

function addBookToLibrary() {
  addBookBtn.addEventListener('click', () => {
    // Show book form by removing hidden-css class
    bookForm.classList.toggle('hidden');
  });
}

function handleFormSubmit(event) {
  event.preventDefault();

  // Get values from the inputs
  const myBook = new Book(
    bookTitle.value,
    bookAuthor.value,
    bookPages.value,
    isBookRead.checked // Use .checked for checkbox
  );

  if (checkDuplicateBook(myBook)) {
    showPopup('This book title already exists!');
  } else {
    myLibrary.push(myBook);
    displayBook(myBook);
    showPopup('New book successfully added.');
    bookForm.classList.add('hidden'); // Hide form after submission
  }
}

function displayBook(book) {
  // Display in the page
  const newCard = document.createElement('div');
  newCard.classList.add('book-card');

  newCard.innerHTML = `
  <h3 class="book-card--title">${book.title}</h3>
  <p class="book-card--author">By ${book.author}</p>
  <p class="book-card--pages">${book.pages} Pages</p>
  <button class="isRead-btn">${
    book.isRead ? 'Already Read' : 'Not Read'
  }</button>
  <button class="delete-book-btn">Delete</button>
  `;

  bookCard.appendChild(newCard);
}

function checkDuplicateBook(book) {
  return myLibrary.some((item) => item.title === book.title);
}

function showPopup(message) {
  popupMessage.textContent = message;

  popupDiv.classList.add('show-popup');
  setTimeout(() => {
    popupDiv.classList.remove('show-popup');
  }, 2000);
}

// Popup close button
closePopup.addEventListener('click', () => {
  popupDiv.classList.remove('show-popup');
});

// Close button for book form
closeBookFormBtn.addEventListener('click', () => {
  bookForm.classList.add('hidden');
});

// Attach form submit event listener
submitBookFormBtn.addEventListener('click', handleFormSubmit);

// Main entry point
addBookToLibrary();
