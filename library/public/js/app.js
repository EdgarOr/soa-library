angular.module(
	'librarian', 
	['ngRoute', 'librarian.web-service', 'librarian.controller']
	).

	constant('librarianConsts', {
	    'BOOKS_URL' 		: '/api/v1/books',
	    'CATEGORIES_URL'	: '/api/v1/categories',
	    'COPIES_URL' 		: '/api/v1/copies',
	    'USERS_URL' 		: '/api/v1/users',
	    'LENDINGS_URL' 		: '/api/v1/lendings'
	}).

	config(function($locationProvider) {
	  $locationProvider.html5Mode(false);
	}).

	config(function($routeProvider) {
		$routeProvider

		.when('/', {
			redirectTo: '/book/list'
		})

		.when("/category/list", {
			templateUrl : "category-list",
			controller : "CategoryController"
		})
		.when("/category/new", {
			templateUrl : "category-create",
			controller: "CategoryController"
		})
		.when("/category/:categoryId/edit", {
			templateUrl : "category-update",
			controller: "CategoryController",
			controllerAs: 'CatCont'
		})


		.when("/user/list", {
			templateUrl : "user-list",
			controller : "UserController"
		})
		.when("/user/new", {
			templateUrl : "user-create",
			controller: "UserController"
		})
		.when("/user/:userId/edit", {
			templateUrl : "user-update",
			controller: "UserController"
		})
		.when("/user/:userId/info", {
			templateUrl : "user-info",
			controller: "UserController"
		})
		.when("/user/:userId/lend", {
			templateUrl : "book-lend",
			controller: "UserController"
		})


		.when("/book/list", {
			templateUrl : "book-list",
			controller : "BookController"
		})
		.when("/book/:bookId/info", {
			templateUrl : "book-info",
			controller : "BookController"
		})
		.when("/book/new", {
			templateUrl : "book-create",
			controller: "BookController"
		})
		.when("/book/:bookId/copy", {
			templateUrl : "book-copy",
			controller: "BookController"
		})
		.when("/book/:bookId/edit", {
			templateUrl : "book-update",
			controller: "BookController"
		})


		.when("/lendings/list", {
			templateUrl : "lendings-list"
			//,controller: "LendingsController"
		});
	}).

	factory('sharedData' , function(){
		var sharedData = {};

		return {
			saveData: function (data){
			sharedData.data = data;
			console.log(sharedData.data);
		}, 
		getData: function(){
			return sharedData;
		}};
	});