
(function () {
    'use strict';

    angular.module('hospitalApp').controller('patientListController', function ($scope, $http) {
        var refresh = () => {
            $http.get('/patients').then(function (response) {
                $scope.patients = response.data;
            })
        }
        refresh();

        $scope.deletePatient = function (id, index) {
            $http.delete('/patients/' + id + '/delete').then(function (response) {
                $scope.patients.splice(index, 1);
            })

        }

    });
})();