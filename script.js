// DOM elements
const inputField = document.querySelector('#book-name');
const addBookBtn = document.querySelector('#addBook-btn');
const bookCard = document.querySelector('#book-container');
const popupDiv = document.querySelector('.popup-div');
const popupMessage = document.querySelector('#popup-message');
const bookForm = document.querySelector('.book-form');
const closePopup = document.querySelector('#close-popup');
const closeBookFormBtn = document.querySelector('#close-book-form');
const emptyMessage = document.querySelector('.empty-list-message');

// Form elements
const submitBookFormBtn = document.querySelector('#submit-bookform');
const bookTitle = document.querySelector('#book-title');
const bookAuthor = document.querySelector('#book-author');
const bookPages = document.querySelector('#book-pages');
const isBookRead = document.querySelector('#book-isread');
const toggleReadBtns = document.querySelectorAll('.isRead-btn');
const deleteBookBtns = document.querySelectorAll('.delete-book-btn');

let myLibrary = [];
let bookIdCounter = 0;

class Book {
  constructor(title, author, pages, isRead) {
    this.id = bookIdCounter++; //Assign unique id
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
  //remove empty icon
  emptyMessage.style.display = 'none';

  // Display in the page
  const newCard = document.createElement('div');
  newCard.classList.add('book-card');
  newCard.dataset.id = book.id;

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

//checking if same book title already exists
function checkDuplicateBook(book) {
  return myLibrary.some((item) => item.title === book.title);
}

//popup func to show for 2sec
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

//listening for delete and read-toggle btns
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-book-btn')) {
    const bookDiv = event.target.closest('.book-card');
    const bookId = bookDiv.dataset.id;

    //calling delete by id funcs
    deleteBookById(bookId);
  } else if (event.target.classList.contains('isRead-btn')) {
    const bookDiv = event.target.closest('.book-card');
    const bookId = bookDiv.dataset.id;

    console.log('click');
    toggleReadBtn(bookId);
  }
});

function toggleReadBtn(bookId) {
  //toggling the read btn
  const index = myLibrary.findIndex(
    (book) => String(book.id) === String(bookId)
  );

  myLibrary[index].isRead = !myLibrary[index].isRead;

  //refresh the book displaying
  bookCard.textContent = '';
  myLibrary.forEach((book) => displayBook(book));
  console.log(myLibrary);
}

function deleteBookById(id) {
  //finding the index of the to be deleted id
  const index = myLibrary.findIndex((book) => String(book.id) === String(id));

  //check if the book was found
  if (index != -1) {
    myLibrary.splice(index, 1);
    showPopup(`Deleted successfully.`);
  }

  //refresh the book displaying

  bookCard.textContent = '';
  myLibrary.forEach((book) => displayBook(book));

  //show empty icon if myLibrary is empty
  emptyMessage.style.display = 'block';
}

// Attach form submit event listener
submitBookFormBtn.addEventListener('click', handleFormSubmit);

// Main entry point
addBookToLibrary();
