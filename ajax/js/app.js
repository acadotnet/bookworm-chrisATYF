class Library{
    constructor() {
        this._books = [];
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
}

class Book {
    constructor(id, title, author, isbn, coverUrl) {
        this._id = id;
        this._title = title;
        this._author = author;
        this._isbn = isbn;
        this._coverUrl = coverUrl;
    }
    get id() {
        return this._id;
    }
    get title() {
        return this._title;
    }
    get author() {
        return this._author;
    }
    get isbn() {
        return this._isbn;
    }
    get coverUrl() {
        return this._coverUrl;
    }

    createBookData() {
            var row = $('<tr>');
            row.append('<td>' + this._id + '</td>');
            row.append('<td><a href="./details.html">' + this._title + '</a></td>');
            row.append('<td>' + this._author + '</td>');
            row.append('<td>' + this._isbn + '</td>');
            row.append('<td><img src="' + this._coverUrl + '" alt="' + this._title + '" height="100" width="100"/></td>');
            return row;
    }
}

$(document).ready(function () {

    $.getJSON({
        url: "./data/books.json",
        success: function (d) {

            var library = new Library();
            $.each(d.books, function (i, book) {
                var theBook = new Book(book.id, book.title, book.author, book.isbn, book.coverUrl);
                library.addBook(theBook);
            });
            library.build('#booksToShow');
            library.setBookCount();
        },
        error: function (d) {
            console.log('Uhh..');
        }
    });

});
