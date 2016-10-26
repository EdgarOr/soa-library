function WebService ($http, consts) {

  var WebService = {};

  WebService.getList = (url, onSuccess, onFail) => {
  	$http.get(url).then(onSuccess, onFail);
  };

   WebService.getById = (url, id, onSuccess, onFail) => {
    $http.get(url + '/' + id).then(onSuccess, onFail);
  };

  WebService.create = (url, docData, onSuccess, onFail) => {
  	$http
  	.post(url, docData)
  	.then(onSuccess, onFail);
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

angular.
	module('librarian.web-service', []).
	factory('WebService' , ['$http', 'librarianConsts', WebService]);