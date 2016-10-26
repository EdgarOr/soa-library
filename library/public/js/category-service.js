function CategoryService ($http, consts) {

  var CategoryService = {};

  CategoryService.getList = (onSuccess, onFail) => {
  	$http.get(consts.CATEGORIES_URL).then(onSuccess, onFail);
  };

  CategoryService.create = (catData, onSuccess, onFail) => {
  	$http
  	.post(consts.CATEGORIES_URL, catData)
  	.then(onSuccess, onFail);
  };

  CategoryService.update = (catId, catData, onSuccess, onFail) => {
  	$http
  	.put(consts.CATEGORIES_URL + "/" +catId, catData)
  	.then(onSuccess, onFail);
  };

  CategoryService.delete = (catId, onSuccess, onFail) => {
  	$http
  	.delete(consts.CATEGORIES_URL + "/" +catId)
  	.then(onSuccess, onFail);
  };


  return CategoryService;
}

angular.
	module('librarian.service.category', []).
	factory('CategoryService' , ['$http', 'librarianConsts', CategoryService]);