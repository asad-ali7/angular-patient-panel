
(function () {
    'use strict';

    angular.module('hospitalApp').controller('patientController', function ($scope, $http,$sce) {
        console.log("hello world from controller!");
        $scope.listing = true;
        var refresh = () => {
            $http.get('/patients').then(function (response) {
                $scope.patients = response.data;
                console.log('I recieved the data that i requested', response);

            })
            console.log('jab data aa hjaey print krna');
        }
        refresh();
        $scope.toggleForm = () => {
            $scope.patient = {};
            $scope.listing = !$scope.listing;
        }
        $scope.createPatient = function () {
            $scope.listing = true;
            if ($scope.patient._id) {
                $http.put('/patients/' + $scope.patient._id + '/update', $scope.patient).then(function (response) {
                    console.log(response);
                    $scope.patients[$scope.workingIndex] = response.data;
                    $scope.patient = {};
                    // $scope.patients.push(response.data);
                    //    refresh();
                });
            }
            else {
                console.log($scope.patient);
                $http.post('/patients', $scope.patient).then(function (response) {
                    console.log(response);
                    $scope.patients.push(response.data);
                    // refresh();
                });
            }
        }
        $scope.deletePatient = function (id, index) {
            console.log(id);
            $http.delete('/patients/' + id + '/delete').then(function (response) {
                // refresh();
                $scope.patients.splice(index, 1);
            })

        }
        $scope.updatePatient = function (patient, index) {
            $scope.workingIndex = index;
            $scope.listing = false;
            // console.log(id);
            // $http.get('/patients/' + id + '/get').then(function (response) {
            $scope.patient = angular.copy(patient);
            // })

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



        $scope.addmore = () => {
            $scope.patients.push({
                name: 'Ahsan',
                email: 'Ahsan@gmail.com',
                age: 16,
                address: 'sargodha-housing scheme',
                city: 'sargodha',
                gender: 'Male',
                password: '12345678'
            });
        }

    });
})();