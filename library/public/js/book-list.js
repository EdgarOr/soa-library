const booksURL = '/api/v1/books';
const copiesURL = '/api/v1/copies';
var bookToDelete;

function setupModalImage(img) {
    $('#img-modal').attr('src', img.src);
    $('.modal-content').addClass('hide');
    $('#coverModal').removeClass('hide');
}

function setBookDataToModal(bookTitle, bookId) {
    $('#copy-modal-title').text(bookTitle);
    $('#book-id').attr('value', bookId);
    $('.modal-content').addClass('hide');
    $('#copyModal').removeClass('hide');
}

function setupToDelete(bookId) {
    bookToDelete = bookId;
    $('.modal-content').addClass('hide');
    $('#deleteModal').removeClass('hide');
}

function deleteBook() {
    $('.modal-content').addClass('hide');
    $('#waitModal').removeClass('hide');
    $.ajax({
        url: booksURL +'/'+ bookToDelete
        , type: 'DELETE'
        , success: function (books, status, xhttp) {
            showResponseMessage('Success!', 'The book was deleted.', () => {
                location.reload();
            });
        }
        , error: function (jqXHR, textStatus, errorThrown) {
            showResponseMessage('Sorry!', 'The\'re some troubles with the server, Try again later.', undefined);
        }
    });
}

function getBooksCatalog() {
    $.ajax({
        url: booksURL
        , type: 'GET'
        , success: function (books, status, xhttp) {
            var book;
            var counter = 0;
            for (book of books) {
                counter++;
                var article = $('#book-card').clone();
                article.css('display', 'block');
                article.attr('id', 'book-card-' + counter);
                article.find('.title').text(book.title);
                article.find('.isbn').text(book.isbn);
                article.find('.author').text(book.author);
                article.find('.description').text(book.description.substr(0, 150) + '...');
                if (book.cover_photo) {
                    article.find('.cover-image').attr('src', book.cover_photo);
                }
                article.find('button').click(book, (e) => {
                    $('.modal-content').addClass('hide');
                    $('#bookInfoModal').removeClass('hide');
                    $('#modal-book-isbn').text(e.data.isbn);
                    $('#modal-book-title').text(e.data.title);
                    $('#modal-book-abstract').text(e.data.description);
                    $('#modal-book-author').text(e.data.author);
                    $('#modal-book-categories').empty();
                    for (var cat of e.data.categories) {
                        var category = $('<h4></h4>');
                        var span = $('<span></span>').addClass('label label-primary').text(cat.name);
                        category.append(span);
                        $('#modal-book-categories').append(category);
                    }
                    $.ajax({
                        url: copiesURL + '?bookId=' + e.data._id
                        , method: 'GET'
                        , success: (copies, status, jqXHR) => {
                            var table = $('#copies-table');
                            var thead = $('<thead></thead>');
                            var tr = $('<tr></tr>');
                            tr.append($('<th></th>').text('Status'));
                            tr.append($('<th></th>').text('Pages'));
                            tr.append($('<th></th>').text('Edition'));
                            tr.append($('<th></th>').text('Language'));
                            tr.append($('<th></th>').text('Pub. Date'));
                            thead.append(tr);
                            var tbody = $('<tbody></tbody>');
                            for (var copy of copies) {
                                tr = $('<tr></tr>');
                                tr.append($('<td></td>').text(copy.state));
                                tr.append($('<td></td>').text(copy.pages));
                                tr.append($('<td></td>').text(copy.edition));
                                tr.append($('<td></td>').text(copy.language));
                                tr.append($('<td></td>').text(copy.publication_date));
                                tbody.append(tr);
                            }
                            $('#copies-table').empty();
                            table.append(thead);
                            table.append(tbody);
                        }
                        , error: (jqXHR, textStatus, errorThrown) => {}
                    });
                });
                article.find('.options-menu').attr('data-content', "<div class='list-group'>" + "<a href='#' class='list-group-item popup-list-item' data-toggle='modal' data-target='#modal' onclick='setBookDataToModal(\"" + book.title + "\",\"" + book._id + "\");'>Add a copy</a>" + "<a href='#' class='list-group-item popup-list-item' data-toggle='modal' data-target='#modal'>Edit</a>" + "<a href='#' class='list-group-item popup-list-item' data-toggle='modal' data-target='#modal' onclick='setupToDelete(\"" + book._id + "\")'>Delete</a></div>");
                $('.options-menu').popover({
                    html: true
                    , placement: "bottom"
                });
                $('#content-panel').append(article);
            }
            $('.options-menu').popover({
                placement: 'bottom'
                , html: 'true'
            });
        }
        , error: function (jqXHR, textStatus, errorThrown) {
            alert('error');
        }
    });
}
$(() => {
    $('#copy-form').submit(function (event) {
        $('.modal-content').addClass('hide');
        $('#waitModal').removeClass('hide');
        $.ajax({
            url: copiesURL
            , type: 'POST'
            , data: new FormData(this)
            , processData: false
            , contentType: false
            , success: function (data, textStatus, jqXHR) {
                showResponseMessage('Success!', 'The copy was registed.', undefined);
            }
            , error: function (jqXHR, textStatus, errorThrown) {
                showResponseMessage('Oh, no!', 'The\'re some troubles with the server, Try again later.', undefined);
            }
        });
        event.preventDefault();
    });
    //getBooksCatalog();
});

function showResponseMessage(title, message, handler) {
    $('#waitModal').addClass('hide');
    $('#responseModal').removeClass('hide');
    $('#responseModal').find('#response-title').text(title);
    $('#responseModal').find('#response-message').text(message);
    $('#responseModal').find('button').click(handler);
}

angular.module('demo', [])
.controller('controller', ($scope, $http, $timeout) => {
    $http
    .get(booksURL)
    .then((response) => {
        $scope.books = response.data;
    });



    $scope.showBookInfo = (book) => {
        $('.modal-content').addClass('hide');
        $('#bookInfoModal').removeClass('hide');
        $timeout(() => {
            $scope.$apply(()=>{
                $scope.bookInfo = book;
              });
        }, 0);

        

        $http
        .get(copiesURL + '?bookId=' + book._id)
        .then((resp)=>{
            $timeout(() => {
            $scope.$apply(()=>{
                $scope.bookInfo.copies = resp.data;
              });
            }, 0);
        });
    }

    $scope.setBookDataToModal = (bookTitle, bookId) =>{
        console.log('Setting book data in to modal');
        angular.element('#copy-modal-title').text(bookTitle);
        angular.element('#book-id').attr('value', bookId);
        angular.element('.modal-content').addClass('hide');
        angular.element('#copyModal').removeClass('hide');
    }

    $scope.setupToDelete = (bookId) => {
        angular.element('.modal-content').addClass('hide');
        angular.element('#deleteModal').removeClass('hide');
        bookToDelete = bookId;
}

    $scope.cutAbstract = (abstract) => {
        return abstract.substr(0, 150) + '...'
    }
});