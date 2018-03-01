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
            var row = $('<tr>')
            row.append('<td>' + this._id + '</td>');
            row.append('<td>' + this._title + '</td>')
            row.append('<td>' + this._author + '</td>')
            row.append('<td>' + this._isbn + '</td>')
            row.append('<td>' + this._coverUrl + '</td>')
            return row;
    }

    setBookImg() {
        
    }
}

$(document).ready(function () {

    $.getJSON({
        url: "./data/books.json",
        success: function (d) {

            var library = [];
            $.each(d.books, function (i, book) {
                var theBook = new Book(book.id, book.title, book.author, book.isbn, book.coverUrl);
                library.push(theBook);
            });

            var body = $('#booksToShow')
            
            $.each(library, function (i, book) {
                body.append(book.createBookData());
            });
        },
        error: function (d) {
            console.log('Uhh..');
        }
    });

});
