angular.
module('librarian.controller.category', ['librarian.web-service', 'librarian']).

controller('CategoryController', ['$scope', '$timeout', '$location', 'librarianConsts', 'WebService', 'sharedData', function ($scope, $timeout, $location, consts, service, sharedData) {
	$scope.catToEdit = this.catToEdit;
    console.log(this.catToEdit);
    
	/**** FIX THE UPDATE SECCTION*/

    $scope.test = ()=> {
        console.log('Categoria en el scope ' + $scope.catToEdit.name);
    };
    
    $scope.setupToUpdate = (cat) => {
        console.log('Categoria ' + cat.name);
        this.catToEdit = cat;
        $timeout(() => {
        $scope.$apply(() => {
            $scope.catToEdit = cat;
        });
    });
        
    };

    $scope.setupToDelete = (catToDelete) => {
    	console.log('Executing setup to delete');
    	$scope.catToDelete = catToDelete;
    };
    
    $scope.delete = () => {
    	service.delete(consts.CATEGORIES_URL, $scope.catToDelete,
    		(response) => {
                showResponseMessage('Success!', 'The category was deleted.', ()=>{
                   service.getList(consts.CATEGORIES_URL, (response) => {
                      $scope.categories = response.data;
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
        angular.element('#new-category-form')[0].reset();
    };

    $scope.create = () => {
        angular.element('#wait-modal').modal('show');
        service.create(consts.CATEGORIES_URL,
            $scope.newCategory, 
            (response) => {
            	showResponseMessage('Success!', 'The category was created.', ()=>{
            		angular.element('#wait-modal').modal('hide');
            		angular.element('#new-category-form')[0].reset();
                });
            }, (respOnError) =>{
                showResponseMessage('Sorry!', 'The\'re some troubles with the server, Try again later.', () => {
                    angular.element('#wait-modal').modal('hide');
                });
            }
            );
    };


     $scope.update = () => {
        angular.element('#wait-modal').modal('show');
        const cat = $scope.catToEdit;

        service.update(
            consts.CATEGORIES_URL, cat._id,
            cat,
            (response) => {
                angular.element('#wait-modal').modal('hide');
                showResponseMessage('Success!', 'The category was updated.', () => {
                    $timeout(() => {
                        $scope.$apply(()=>{
                            $location.path('/category/list');
                        });
                    }, 500);
                });
            },(respOnError) =>{
                angular.element('#wait-modal').modal('hide');
                showResponseMessage('Sorry!', 'The\'re some troubles with the server, Try again later.', () => {
                    
                });
            }
            );
    };
}]).

directive(
    'libCategoryToEdit', 
    ['librarianConsts', 'WebService', '$routeParams', (consts, WebService, $routeParams) => {
    function link (scope, element, attrs) {
        WebService.getById(consts.CATEGORIES_URL, $routeParams.categoryId, (response) => {
            scope.catToEdit = response.data;
        }, undefined);
    }

    return {
        link: link
    };
}]).

directive('libLoadCategories', ['librarianConsts', 'WebService', (consts, WebService) => {
    function link (scope, element, attrs) {
        WebService.getList(consts.CATEGORIES_URL, (response) => {
            scope.categories = response.data;
        }, undefined);
    }

    return {
        link: link
    };
}]);