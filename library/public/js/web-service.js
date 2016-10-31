function GenericService ($http, url) {

  var WebService = {
    getList:  (onSuccess, onError) => {
      $http.get(url).then(onSuccess, onError);
    },

    getById: (id, onSuccess, onError) => {
      $http.get(url + '/' + id).then(onSuccess, onError);
    },

    create: (data, onSuccess, onError, config) => {
      $http.post(url, data, config).then(onSuccess, onError);
    },

    update: (id, data, onSuccess, onError, config) => {
      $http.put(url + "/" + id, data, config).then(onSuccess, onError);
    },

    delete: (id, onSuccess, onError) => {
      $http.delete(url + "/" + id).then(onSuccess, onError);
    }
  };

  return WebService;
}

function CategoryService ($http) {
  return GenericService($http, '/api/v1/categories');
}

function UserService ($http) {
  return GenericService($http, '/api/v1/users');
}

function BookService ($http) {
  return GenericService($http, '/api/v1/books');
}

function CopyService ($http) {
  var url = '/api/v1/copies';
  var service = GenericService($http, url);

  service.getByBook = (bookId, onSuccess, onError) => {
    $http.get(url + '?bookId=' + bookId).then(onSuccess, onError);
  };

  return service;
}

function LendingService ($http) {
  var url = '/api/v1/lendings';
  var service = GenericService($http, url);

  service.getByReader = (readerId, onSuccess, onError) => {
    $http.get(url + '?readerId=' + readerId).then(onSuccess, onError);
  };

  service.deleteByCopy = (copyId, onSuccess, onError) => {
    $http.delete(url + '?copyId=' + copyId).then(onSuccess, onError);
  };

  service.returnCopy = (copyId, onSuccess, onError) => {
    var copy = { availability : 'available'};
    var copyService = CopyService($http);
    service.deleteByCopy(copyId, () => {
       copyService.update(copyId, copy, onSuccess, onError);
    });
  };

  return service;
}

angular.
	module('librarian.web-service', []).
  factory('CategoryService', ['$http', CategoryService]).
  factory('BookService', ['$http', BookService]).
  factory('LendingService', ['$http', LendingService]).
  factory('CopyService', ['$http', CopyService]).
  factory('UserService', ['$http', UserService]).
  factory('LendingService', ['$http', LendingService]);