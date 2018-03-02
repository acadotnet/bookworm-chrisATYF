class Library {
    constructor() {
        this._books = [];
    }

    get books() {
        return this._books;
    }

    addBook(book) {
        this._books.push(book);
    }

    build(target) {
        var $tbody = $(target);

        $.each(this._books, function (b, book) {
            $tbody.append(book.createBookData());
        });
    }

    setBookCount() {
        var count = $('#bookCount').text('Found ' + this._books.length + ' book(s)');
        return count;
    }

    getBookId(pageBookId) {
        var bookId;
        $.each(this._books, function (b, book) {
            bookId = book.id;
            if (bookId == pageBookId) {
                book.updateDetails();
                console.log(book.id);
            }
        });
        return bookId;
    }
}

class Book {
    constructor(id, title, isbn, coverUrl) {
        this._id = id;
        this._title = title;
        this._authors;
        this._isbn = isbn;
        this._coverUrl = coverUrl;
    }
    get id() {
        return this._id;
    }
    get title() {
        return this._title;
    }
    get isbn() {
        return this._isbn;
    }
    get coverUrl() {
        return this._coverUrl;
    }

    addAuthors(authors) {
        this._authors = authors;
    }

    createBookData() {
        var row = $('<tr>');
        row.append('<td>' + this._id + '</td>');
        row.append('<td><a href="./details.html?bookId=' + this._id + '">' + this._title + '</a></td>');
        row.append('<td><li>' + this._authors + '</li></td>');
        row.append('<td>' + this._isbn + '</td>');
        row.append('<td><img src="' + this._coverUrl + '" alt="' + this._title + '" height="100" width="100"/></td>');
        return row;
    }

    updateDetails() {
        $('#bookId').val(this._id);
        $('#bookTitle').val(this._title);
        $('#bookAuthor').append('<li>' + this._authors + '</li>');
        $('#bookISBN').val(this._isbn);
        $('#bookImg').append('<img src="' + this._coverUrl + '" alt="' + this._title + '" height="250" width="250"/>');
        $('#crumbTitle').text(this._title);
    }
}

$(document).ready(function () {
    var currentPage = $('body').data('page');

    $.getJSON({
        url: "./data/books.json",
        success: function (d) {

            var library = new Library();
            $.each(d.books, function (i, book) {
                var theBook = new Book(book.id, book.title, book.isbn, book.coverUrl);
                $.each(book.authors, function (a, author) {
                    theBook.addAuthors(author);
                });
                library.addBook(theBook);
                library.getBookId();
            });

            if (currentPage == 'catalog') {
                library.build('#booksToShow');
                library.setBookCount();
            }

            if (currentPage == 'details') {
                var pageBookId = getQueryParameterByName('bookId');
                library.getBookId(pageBookId);
            }
        },
        error: function (d) {
            console.log('Uhh..');
        }
    });

});
