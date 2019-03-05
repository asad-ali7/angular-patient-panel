
(function () {
    'use strict';

    angular.module('hospitalApp').controller('doctorFormCtrl', function ($scope, $http, $sce, $window, $routeParams, doctor) {
        console.log(doctor);
        $scope.doctor = doctor || {};
        if ($routeParams.id) {
            // $http.get('/doctors/' + $routeParams.id + '/get').then(function (response) {
            //     $scope.doctor = angular.copy(response.data);
            // })
        }
        $scope.createDoctor = function () {
            if ($scope.doctor._id) {
                $http.put('/doctors/' + $scope.doctor._id + '/update', $scope.doctor).then(function (response) {
                    $window.location.href = '#!/doctors';
                    // $scope.doctors.push(response.data);
                    //    refresh();
                });
            }
            else {
                $http.post('/doctors', $scope.doctor).then(function (response) {
                    $window.location.href = '#!/doctors';
                    // console.log(response);
                    // $scope.doctors.push(response.data);
                    // refresh();
                });
            }
        }


        $scope.printError = (field) => {
            let errors = '';
            let number = 1;
            console.log(field)
            if (field.$touched) {
                if (Object.keys(field.$error).length > 0) {
                    if (field.$error.required) {
                        errors += `<p>${number}. This field is required</p>`;
                        number++;
                    }
                    if (field.$error.minlength) {
                        errors += `<p>${number}. Your ${field.$name} should contain atleast ${field.$$attr.minlength} characters.</p>`
                        number++;
                    }
                    if (field.$error.pattern) {
                        errors += `<p>${number}. ${field.$$attr.title}.</p>`
                        number++;
                    }

                } else {
                    errors += 'Field is Ok.\n'
                }
            }
            return $sce.trustAsHtml(errors);
        }




    });
})();