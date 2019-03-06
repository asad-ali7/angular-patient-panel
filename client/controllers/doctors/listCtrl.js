
(function () {
    'use strict';

    angular.module('hospitalApp').controller('doctorListController', function ($scope, $http, doctors) {
        var refresh = () => {
            // $http.get('/doctors').then(function (response) {
            //     $scope.doctors = response.data;
            // })
            $scope.doctors = doctors;
        }
        refresh();

        $scope.deleteDoctor = function (id, index) {
            $http.delete('/doctors/' + id + '/delete').then(function (response) {
                $scope.doctors.splice(index, 1);
            }, function (err) {
                console.log('<<<<<<<<', err);
            })

        }

    });
})();