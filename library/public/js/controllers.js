angular.
module('librarian.controller', ['librarian.web-service', 'librarian']).
controller(
    'CategoryController', 
    ['$rootScope', '$scope', '$timeout', '$location', 'CategoryService', CategoryController]).
controller(
    'UserController', 
    ['$rootScope', '$scope', '$timeout', '$location', 'UserService', 'LendingService', 'CopyService', UserController]).
controller(
    'BookController', 
    ['$rootScope', '$scope', '$timeout', '$location', 'BookService', 'CategoryService', 'CopyService', BookController]);






function CategoryController($rootScope, $scope, $timeout, $location, service) {
    var controller = GenericController($rootScope, $scope, $timeout, $location, service);
    controller.redirectTo = '/category/list';
    controller.init();
}


function UserController($rootScope, $scope, $timeout, $location, userService, lendingService, copyService) {
    var controller = GenericController($rootScope, $scope, $timeout, $location, userService);

    var multipartConfig  = {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
    }

    controller.create = () => {
        angular.element('#wait-modal').modal('show');
        const data = new FormData(angular.element('#new-user-form')[0]);
        userService.create(data, controller.succesCallbackToCreate, controller.errorCallback, multipartConfig);
    };

    controller.update = () => {
        angular.element('#wait-modal').modal('show');

        const data = new FormData(angular.element('#edit-user-form')[0]);
        const elementId = $scope.dataToUpdate._id;
        userService.update(elementId, data, controller.succesCallbackToUpdate, controller.errorCallback, multipartConfig);
    };

    controller.resetCreateForm = () => {
        $scope.$apply(() => {
            angular.element('#preview-img,#prof-photo-edit-prev').attr('src', '/public/images/profile-photos/default.png');
            //$scope.newData = {profilePhoto: '/public/images/profile-photos/default.png'};
        });
        console.log('Reseting create form');
    };

    controller.redirectTo = "/user/list";


    if($rootScope.userInfo){
        $scope.userInfo = angular.copy($rootScope.userInfo);
        console.log('Setting up the user information')
        lendingService.getByReader($scope.userInfo._id, (response) => {
            $scope.userInfo.copies =  response.data;
        });
    }

    if($rootScope.userToLend){
        console.log('There is a user to lend a book');
        var user = angular.copy($rootScope.userToLend);
        user.completeName = user.name + " " + user.lastname;
        user.borrowedBooks = 0;
        user.lendingsExpired = 0;
        $scope.userToLend = user;
        $scope.userOk = true;

        $scope.lending = {};
        $scope.lending.authorizatedAt = new Date();

        $scope.copyAvailable = true;
    }

    $scope.newData = {profilePhoto: '/public/images/profile-photos/default.png'};
    
    $scope.showPreviewImg = (target, input) =>{
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                angular.element('#' + target).attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    };

    $scope.showInfo = (user) => {
        $rootScope.userInfo = user;
    };

    $scope.setupToLend = (user) => {
        $rootScope.userToLend = user;
    };

    $scope.changeCopyId = () => {
        copyService.getById($scope.copyToLend._id, (response) => {
            var data = response.data;
            $scope.copyToLend = data;
            $scope.copyAvailable = (data.availability == 'available');
        },(response) =>{
            $scope.copyToLend = {_id : $scope.copyToLend._id};
        })
    };

    $scope.registerLending = () => {
        var lending = $scope.lending;
        lending.reader = $scope.userToLend._id;
        lending.copy = $scope.copyToLend._id;
        lendingService.create(lending, (response) => {
            console.log('Lending maded');

            var copyToUpdate = $scope.copyToLend;

            copyToUpdate.availability = 'unavailable';
            copyService.update(copyToUpdate._id, copyToUpdate, (resp) => {
                console.log('Copy availability updated');

                angular.element('#wait-modal').modal('hide');
                controller.showResponseMessage('Success!', 'The lending was recorded successfully.', () => {
                    $timeout(() => {
                        $scope.$apply(()=>{
                            $location.path('/user/list');
                        });
                    }, 500);
                });

            });

        },(response) =>{
            
        })
    };

    controller.init();
}


function BookController($rootScope, $scope, $timeout, $location, booksService, catsService, copiesService) {
    var controller = GenericController($rootScope, $scope, $timeout, $location, booksService);

    var multipartConfig  = {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
    }

    controller.create = () => {
        angular.element('#wait-modal').modal('show');
        const data = new FormData(angular.element('#new-book-form')[0]);
        booksService.create(data, controller.succesCallbackToCreate, controller.errorCallback, multipartConfig);
    };

    controller.update = () => {
        angular.element('#wait-modal').modal('show');

        const data = new FormData(angular.element('#edit-book-form')[0]);
        const elementId = $scope.dataToUpdate._id;
        booksService.update(elementId, data, controller.succesCallbackToUpdate, controller.errorCallback, multipartConfig);
    };

    controller.resetCreateForm = () => {
        $scope.$apply(() => {
            angular.element('#preview-img').attr('src', '/public/images/covers/generic-book-cover.jpg');
            $scope.newData = {};
        });
    };

    controller.redirectTo = "/book/list";



    $scope.newData = {cover: '/public/images/covers/generic-book-cover.jpg'};

    if($rootScope.bookInfo){
        $scope.bookInfo = angular.copy($rootScope.bookInfo);
        copiesService.getByBook($scope.bookInfo._id, (response) => {
            $scope.bookInfo.copies =  response.data;
        });
    }

    if($rootScope.bookToCopy){
        $scope.bookToCopy = angular.copy($rootScope.bookToCopy);
        $scope.defaultCopy = {
            edition : 'First',
            state : 'ok',
            pages: 20,
            availability: 'available',
            language: 'English'
        };
        $scope.copy = angular.copy($scope.defaultCopy);
    }


    $scope.showPreviewImg = (target, input) =>{
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                angular.element('#' + target).attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    };

    $scope.cutAbstract = (abstract) => {
        return abstract.substr(0, 150) + '...'
    }

    catsService.getList((resp) => {
        $scope.categories = resp.data;
        $timeout(() => {
            angular.element('#category-select').selectpicker('refresh');
        }, 0);
    });

    $scope.showInfo = (book) => {
        $rootScope.bookInfo = book;
    };

    $scope.setBookToCopy = (book) => {
        $rootScope.bookToCopy = book;
    };
    
    $scope.createCopy = () =>{
        angular.element('#wait-modal').modal('show');
        var copy = angular.copy($scope.copy);
        console.log(copy);
        copy.book = $scope.bookToCopy._id;
        copiesService.create(copy, (response) => {
            angular.element('#wait-modal').modal('hide');
            controller.showResponseMessage('Success!', 'The copy was created.', () => {
                $scope.$apply(()=>{
                    $scope.copy = angular.copy($scope.defaultCopy);
                });
            });
        });
    };

    controller.init();
}


function GenericController($rootScope, $scope, $timeout, $location, service) {


    var controller = {
        redirectTo: '/',

        loadData: () => {
            service.getList((response) => {
                $scope.dataList = response.data;
            });
        },

        create: () => {
            angular.element('#wait-modal').modal('show');
            service.create($scope.newData, controller.succesCallbackToCreate, controller.errorCallback);
        },

        update: () => {
            angular.element('#wait-modal').modal('show');
            const data = $scope.dataToUpdate;
            service.update(data._id, data, controller.succesCallbackToUpdate, controller.errorCallback);
        },

        delete: () => {
            service.delete($scope.elementToDelete, controller.succesCallbackToDelete, controller.errorCallback);
        },

        setupToUpdate: (data) => {
            $rootScope.dataToUpdate = angular.copy(data);        
        },

        setupToDelete: (elementId) => {
            $scope.elementToDelete = elementId;
        },

        succesCallbackToCreate: (response) => {
            controller.showResponseMessage('Success!', 'The element was created.', ()=>{
                angular.element('#wait-modal').modal('hide');
                controller.resetCreateForm();
            });
        },

        errorCallback: (response) =>{
            controller.showResponseMessage('Sorry!', 'The\'re some troubles with the server, Try again later.', () => {
                angular.element('#wait-modal').modal('hide');
            });
        },

        succesCallbackToUpdate: (response) => {
            angular.element('#wait-modal').modal('hide');
            controller.showResponseMessage('Success!', 'The element was updated.', () => {
                $timeout(() => {
                    $scope.$apply(()=>{
                        $location.path(controller.redirectTo);
                    });
                }, 500);
            });
        },

        succesCallbackToDelete: (response) => {
            controller.showResponseMessage('Success!', 'The element was deleted.', controller.loadData);
        },

        resetCreateForm : () => {
            $scope.$apply(() => {
                $scope.newData = {};
            });
        },

        showResponseMessage:  (title, message, handler) =>{
            console.log('Showing response message')
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
        }

    };


    controller.init = () => {

        $scope.dataToUpdate = angular.copy($rootScope.dataToUpdate);

        controller.loadData();

        $scope.create = controller.create;
        $scope.update = controller.update;
        $scope.delete = controller.delete;
        $scope.setupToUpdate = controller.setupToUpdate;
        $scope.setupToDelete = controller.setupToDelete;
    }

    return controller;
}
