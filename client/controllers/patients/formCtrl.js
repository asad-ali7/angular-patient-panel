
(function () {
    'use strict';

    angular.module('hospitalApp').controller('patientFormCtrl', function ($scope, $http,$sce,$window,$routeParams,patient) {
        console.log(patient);
        $scope.patient = patient || {};
        if($routeParams.id){
            // $http.get('/patients/' + $routeParams.id + '/get').then(function (response) {
            //     $scope.patient = angular.copy(response.data);
            // })
        }
        $scope.createPatient = function () {
            if ($scope.patient._id) {
                $http.put('/patients/' + $scope.patient._id + '/update', $scope.patient).then(function (response) {
                    $window.location.href = '/';
                    // $scope.patients.push(response.data);
                    //    refresh();
                });
            }
            else {
                $http.post('/patients', $scope.patient).then(function (response) {
                    $window.location.href = '/';
                    // console.log(response);
                    // $scope.patients.push(response.data);
                    // refresh();
                });
            }
        }
        

        $scope.printError = (field) => {
            let errors = '';
            let number = 1;
            console.log(field)
            if(field.$touched){
                if(Object.keys(field.$error).length > 0){
                    if (field.$error.required) {
                        errors += `<p>${number}. This field is required</p>`;
                        number++;
                    }
                    if (field.$error.minlength){
                        errors += `<p>${number}. Your ${field.$name} should contain atleast ${field.$$attr.minlength} characters.</p>`
                        number++;
                    }
                    if (field.$error.pattern){
                        errors += `<p>${number}. ${field.$$attr.title}.</p>`
                        number++;
                    }
                    
                }else{
                    errors += 'Field is Ok.\n'
                }
            }
            return $sce.trustAsHtml(errors);
        }




    });
})();