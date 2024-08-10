//dom
const inputField = document.querySelector('#book-name');
const addBookBtn = document.querySelector('#addBook-btn');
const bookTable = document.querySelector('#book-table');
const popupDiv = document.querySelector('.popup-div');
const popupMessage = document.querySelector('#popup-message');
const bookForm = document.querySelector('.book-form');
const closePopup = document.querySelector('#close-popup');
const closeBookFormBtn = document.querySelector('#close-book-form');

//form
const submitBookFormBtn = document.querySelector('#submit-bookform');
const bookTitle = document.querySelector('#book-title');
const bookAuthor = document.querySelector('#book-author');
const bookPages = document.querySelector('#book-pages');
const isBookRead = document.querySelector('#book-isread');

let myLibrary = [];

class Book {
  constructor(title, author, pages, isRead) {
    //the constructor...
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

function addBookToLibrary() {
  addBookBtn.addEventListener('click', () => {
    //show bookform by removing hidden-css class
    bookForm.classList.toggle('hidden');

    //listening for submit button
    submitBookFormBtn.addEventListener('click', (event) => {
      event.preventDefault();

      //getting values from the inputs
      const myBook = new Book(
        bookTitle.value,
        bookAuthor.value,
        bookPages.value,
        isBookRead.value
      );

      if (checkDuplicateBook(myBook)) {
        //checking for duplicate book entry
        showPopup('Book title already exists!');

        console.log('Book already exists.');
      } else {
        myLibrary.push(myBook);

        //displaying the newly added book in the page
        displayBook(myBook);

        showPopup('New book successfully added.');

        console.log(checkDuplicateBook(myBook));
        console.log(myLibrary);
      }
    });
  });
}

function displayBook(book) {
  //display in the page
  const row = document.createElement('tr');

  row.innerHTML = `<td>${myLibrary.length}</td>
                   <td>${book.title}</td>
                   <td>${book.author}</td>
                   <td>${book.pages}</td>`;

  bookTable.appendChild(row);
}

function checkDuplicateBook(book) {
  let hasBook = false;

  if (myLibrary.length > 0) {
    hasBook = myLibrary.some((item) => item.title === book.title);
  }

  return hasBook;
}

function showPopup(message) {
  popupMessage.textContent = message;

  popupDiv.classList.add('show-popup');
  setTimeout(() => {
    popupDiv.classList.remove('show-popup');
  }, 2000);
}

//popup close btn
closePopup.addEventListener('click', () => {
  popupDiv.classList.remove('show-popup');
});

//close button for book form
closeBookFormBtn.addEventListener('click', () => {
  bookForm.classList.add('hidden');
});

//main-entry point
addBookToLibrary();
