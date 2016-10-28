function WebService ($http, consts) {

  var WebService = {};

  WebService.getList = function (url, onSuccess, onFail){
  	$http.get(url).then(onSuccess, onFail);
  };

   WebService.getById = (url, id, onSuccess, onFail) => {
    $http.get(url + '/' + id).then(onSuccess, onFail);
  };

  WebService.create = (url, docData, config) => {
    return $http.post(url, docData, config);
  };

  WebService.update = (url, documentId, docData, onSuccess, onFail) => {
  	$http
  	.put(url + "/" + documentId, docData)
  	.then(onSuccess, onFail);
  };

  WebService.delete = (url, documentId, onSuccess, onFail) => {
  	$http
  	.delete(url + "/" + documentId)
  	.then(onSuccess, onFail);
  };


  return WebService;
}

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
  }
  return service;
}

function CopyService ($http) {
  var url = '/api/v1/copies';
  var service = GenericService($http, url);

  service.getByBook = (bookId, onSuccess, onError) => {
    $http.get(url + '?bookId=' + bookId).then(onSuccess, onError);
  }
  return service;
}

function LendingService ($http) {
  var url = '/api/v1/lendings';
  var service = GenericService($http, url);

  service.getByReader = (readerId, onSuccess, onError) => {
    $http.get(url + '?readerId=' + readerId).then(onSuccess, onError);
  }
  return service;
}

angular.
	module('librarian.web-service', []).
	factory('WebService' , ['$http', 'librarianConsts', WebService]).
  factory('CategoryService', ['$http', CategoryService]).
  factory('BookService', ['$http', BookService]).
  factory('LendingService', ['$http', LendingService]).
  factory('CopyService', ['$http', CopyService]).
  factory('UserService', ['$http', UserService]);