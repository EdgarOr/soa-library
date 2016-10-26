angular.
module('librarian.controller.book', ['librarian.web-service', 'librarian']).

controller(
    'BookController', 
    ['$scope', '$timeout', '$location', 'librarianConsts', 'WebService', '$http', 
    function ($scope, $timeout, $location, consts, service, $http) {
	
    
	/**** FIX THE UPDATE SECCTION*/

    $scope.setupToDelete = (bookToDelete) => {
    	$scope.bookToDelete = bookToDelete;
    };
    
    $scope.delete = () => {
    	service.delete(consts.BOOKS_URL, $scope.bookToDelete,
    		(response) => {
                showResponseMessage('Success!', 'The book was deleted.', ()=>{
                   service.getList(consts.BOOKS_URL, (response) => {
                      $scope.books = response.data;
                  }, undefined);
               });
            },(respOnError) =>{
                showResponseMessage('Sorry!', 'The\'re some troubles with the server, Try again later.', undefined);
            });
    };
    

    function showResponseMessage (title, message, handler) {
        angular.element('#wait-modal').modal('hide');
        const modal = angular.element('#response-modal');
        
        modal.modal('show');

        const response = {};
        response.title = title;
        response.message = message;
        
        $timeout(() => {
            $scope.$apply(()=>{
                $scope.response = response;
            });
        }, 0);
        modal.find('button').off();
        modal.find('button').click(handler);
    };

    function resetCreateForm () {
        angular.element('#preview-img').attr('src', '/public/images/profile-photos/default.png');
        angular.element('#new-book-form')[0].reset();
    };

    $scope.create = () => {
        angular.element('#wait-modal').modal('show');
        /*service.create(consts.USERS_URL,
            $scope.newUser, 
            (response) => {
            	showResponseMessage('Success!', 'The user was created.', ()=>{
            		//angular.element('#wait-modal').modal('hide');
            		angular.element('#new-user-form')[0].reset();
                });
            }, (respOnError) =>{
                showResponseMessage('Sorry!', 'The\'re some troubles with the server, Try again later.', () => {
                    //angular.element('#wait-modal').modal('hide');
                });
            }
            );*/
        const data = new FormData(angular.element('#new-book-form')[0]);

        $http
        .post(consts.BOOKS_URL, data,{
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .then((response) => {
            showResponseMessage('Success!', 'The book was created.', ()=>{
                resetCreateForm();
               
            });
            
        },(respOnError) =>{
            showResponseMessage('Sorry!', 'The\'re some troubles with the server, Try again later.', () => {
                
            });
        });
    };

    $scope.cutAbstract = (abstract) => {
        return abstract.substr(0, 150) + '...'
    }

    $scope.showPreviewImg = (target, input) =>{
        console.log('Changing preview image');
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                angular.element('#' + target).attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
            
        }
    };
    /*
    
    */
    //getCategories();

}]).

controller(
    'EditUserController', 
    ['$scope', '$timeout', '$location', 'librarianConsts', 'WebService', 'sharedData', '$http', 
    function ($scope, $timeout, $location, consts, service, sharedData, $http) {



}]).

directive(
    'libBookInfo', 
    ['$http', 'librarianConsts', 'WebService', '$routeParams', 
    ($http, consts, WebService, $routeParams) => {
        function link (scope, element, attrs) {
            WebService.getById(consts.BOOKS_URL, $routeParams.bookId, (response) => {
                scope.bookInfo = response.data;
                WebService.getList(consts.COPIES_URL + '?bookId=' + $routeParams.bookId, (resp)=>{
                    scope.bookInfo.copies = resp.data;
                }, undefined);
            });
        }
    return { link: link };
}]).

directive('loadBooks', ['$http', 'librarianConsts', 'WebService', ($http, consts, WebService) => {
    function link (scope, element, attrs) {
        WebService.getList(consts.BOOKS_URL, (response) => {
            scope.books = response.data;
        }, undefined);
    }

    angular.element('#category-select').selectpicker('refresh');

    return {link: link};
}]).


directive('loadCategoriesToSelect', ['$http', '$timeout', 'librarianConsts', 'WebService', ($http, $timeout, consts, WebService) => {
    function link (scope, element, attrs) {
        WebService.getList(consts.CATEGORIES_URL, (response) => {
            $timeout(() => {
                scope.$apply(()=>{
                     scope.categories = response.data;
                  });
                angular.element('#category-select').selectpicker('refresh');
            }, 0);
           
        }, undefined);
    }


    return {
        link: link
    };
}]);