
(function () {
    'use strict';

    angular.module('hospitalApp').controller('loginController', function ($scope,$http,$window) {
        $scope.object = { type: 'patient'}
        $scope.checkValidUser = (object)=>{
            console.log(object);
            $http.post('/login',object).then(function(resp){
                $window.location.href = '#!/';
            },function(err){
                console.log('<<<<<<<<',err);
            })
        }

    });
})();