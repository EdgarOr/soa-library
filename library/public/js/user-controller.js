angular.
module('librarian.controller.user', ['librarian.web-service', 'librarian']).

controller(
    'UserController', 
    ['$scope', '$timeout', '$location', 'librarianConsts', 'WebService', '$http', 'sharedData',
    function ($scope, $timeout, $location, consts, service, $http, sharedData) {
	
    
    $scope.setupToUpdate = (user) =>{
        sharedData.saveData(user);
    };

    $scope.update = () => {
        angular.element('#edit-modal').modal('hide');
        angular.element('#wait-modal').modal('show');
        const user = $scope.userToEdit;

        const data = new FormData(angular.element('#user-edit-form')[0]);

        $http
        .put(USERS_URL + '/' + $scope.userToEdit._id, data,{
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .then((response) => {
            angular.element('#wait-modal').modal('hide');
            $scope.showResponseMessage('Success!', 'The user was updated.', () => {
                $scope.getUsers();
            });
        },(respOnError) =>{
            $scope.showResponseMessage('Sorry!', 'The\'re some troubles with the server, Try again later.', () => {
                angular.element('#edit-modal').modal('show');
            });
        });
    };


    $scope.setupToDelete = (userToDelete) => {
    	console.log('Executing setup to delete');
    	$scope.userToDelete = userToDelete;
    };
    
    $scope.delete = () => {
    	service.delete(consts.USERS_URL, $scope.userToDelete,
    		(response) => {
                showResponseMessage('Success!', 'The user was deleted.', ()=>{
                   service.getList(consts.USERS_URL, (response) => {
                      $scope.users = response.data;
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
        angular.element('#preview-img,#prof-photo-edit-prev').attr('src', '/public/images/profile-photos/default.png');
        angular.element('#new-user-form')[0].reset();
    };

    $scope.create = () => {
        angular.element('#wait-modal').modal('show');

        const data = new FormData(angular.element('#new-user-form')[0]);

        $http
        .post(consts.USERS_URL, data,{
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .then((response) => {
            showResponseMessage('Success!', 'The user was created.', ()=>{
                resetCreateForm();
                angular.element('#create-modal').modal('show');
                //$scope.getUsers();
            });
            
        },(respOnError) =>{
            showResponseMessage('Sorry!', 'The\'re some troubles with the server, Try again later.', () => {
                angular.element('#create-modal').modal('show');
            });
        });
    };

    $scope.showPreviewImg = (target, input) =>{
  
        console.log('Change event on file input');
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                angular.element('#' + target).attr('src', e.target.result);
                //$scope.bookToEdit.cover =  e.target.result;
            }
            reader.readAsDataURL(input.files[0]);
        }
    };

}]).

controller(
    'EditUserController', 
    ['$scope', '$timeout', '$location', 'librarianConsts', 'WebService', 'sharedData', '$http', 
    function ($scope, $timeout, $location, consts, service, sharedData, $http) {
     $scope.showPreviewImg = (target, input) =>{
  
        console.log('Change event on file input');
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                angular.element('#' + target).attr('src', e.target.result);
                //$scope.bookToEdit.cover =  e.target.result;
            }
            reader.readAsDataURL(input.files[0]);
        }
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

    $scope.update = () => {
        console.log('Updating a user data');
        angular.element('#wait-modal').modal('show');
        const userId = $scope.userToEdit._id;
        const user = new FormData(angular.element('#edit-user-form')[0]);

         $http
        .put(consts.USERS_URL + '/' +userId, user,{
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .then((response) => {
            showResponseMessage('Success!', 'The user was updated.', ()=>{
                $timeout(() => {
                        $scope.$apply(()=>{
                            $location.path('/user/list');
                        });
                    }, 500);
            });
            
        },(respOnError) =>{
            showResponseMessage('Sorry!', 'The\'re some troubles with the server, Try again later.', () => {
               
            });
        });

       
    };

}]).

directive(
    'libUserToEdit',
    ['librarianConsts', 'WebService', '$routeParams',
    (consts, WebService, $routeParams) => {
        function link (scope, element, attrs) {
            WebService.getById(consts.USERS_URL, $routeParams.userId, (response) => {
                scope.userToEdit = response.data;
            }, undefined);
        }

        return {
            link: link
        };
    }]).

directive('getUserToEdit', ['librarianConsts', 'WebService', 'sharedData', (consts, service, data) => {
    function link (scope, element, attrs) {
        scope.userToEdit = data.getData().data;
    }

    return {
        link: link
    };
}]).

directive('loadUsers', ['$http', 'librarianConsts', 'WebService', ($http, consts, WebService) => {
    function link (scope, element, attrs) {
        WebService.getList(consts.USERS_URL, (response) => {
            scope.users = response.data;
        }, undefined);
    }

    return {
        link: link
    };
}]);