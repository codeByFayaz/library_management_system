// Function to display books from local storage
function displayBooks() {
    const books = getBooks();
    const bookList = document.querySelector("#book-list tbody");
    bookList.innerHTML = ''; // Clear current list

    books.forEach((book, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><button class="delete-btn" onclick="deleteBook(${index})">Delete</button></td>
        `;

        bookList.appendChild(row);
    });
}

// Function to get books from local storage
function getBooks() {
    return JSON.parse(localStorage.getItem("books") || "[]");
}

// Function to add a book to local storage
function addBook(book) {
    const books = getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
}

// Function to delete a book from local storage
function deleteBook(index) {
    const books = getBooks();
    books.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(books));
    displayBooks();
}

// Event listener for form submission
document.querySelector("#book-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;

    if (title && author && isbn) {
        const book = { title, author, isbn };
        addBook(book);
        displayBooks();
        document.querySelector("#book-form").reset();
    } else {
        alert("Please fill in all fields");
    }
});

// Display books when the page loads
document.addEventListener("DOMContentLoaded", displayBooks);
