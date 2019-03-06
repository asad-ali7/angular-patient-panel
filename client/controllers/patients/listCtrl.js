
(function () {
    'use strict';

    angular.module('hospitalApp').controller('patientListController', function ($scope, $http, patients) {
        var refresh = () => {
            // $http.get('/patients').then(function (response) {
            //     $scope.patients = response.data;
            // })
            $scope.patients = patients;
        }
        refresh();

        $scope.deletePatient = function (id, index) {
            $http.delete('/patients/' + id + '/delete').then(function (response) {
                $scope.patients.splice(index, 1);
            }, function (err) {
                console.log('<<<<<<<<', err);
            })

        }

    });
})();