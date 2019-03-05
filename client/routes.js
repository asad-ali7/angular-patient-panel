angular.module('hospitalApp').config(function ($routeProvider) {
    $routeProvider
        .when("/",{
            templateUrl: "views/general/landing.html",
        })
        .when("/doctors", {
            templateUrl: "views/doctors/listDoctors.html",
            controller: 'doctorListController',
            resolve: {
                doctors: function ($http, $q) {
                    let delay = $q.defer();
                    $http.get('/doctors').then(function (response) {
                        delay.resolve(response.data);
                    })
                    return delay.promise;
                }
            }
        })
        .when("/doctor/create", {
            templateUrl: "views/doctors/createDoctor.html",
            controller:'doctorFormCtrl',
            resolve:{
                doctor: function(){
                    return {};
                }
            }
        })
        .when("/doctor/:id?", {
            templateUrl: "views/doctors/updateDoctor.html",
            controller:'doctorFormCtrl',
            resolve:{
                doctor: function($http,$q,$route){
                    let delay = $q.defer();
                    $http.get('/doctors/' + $route.current.params.id + '/get').then(function (response) {
                        console.log(response.data)
                        delay.resolve(response.data);
                    })
                    return delay.promise;
                }
            }
        })
        .when("/patients", {
            templateUrl: "views/patients/list.html",
            controller: 'patientListController',
            resolve: {
                patients: function ($http, $q) {
                    let delay = $q.defer();
                    $http.get('/patients').then(function (response) {
                        delay.resolve(response.data);
                    })
                    return delay.promise;
                }
            }
        })
        .when("/patient/create", {
            templateUrl: "views/patients/create.html",
            controller:'patientFormCtrl',
            resolve:{
                patient: function(){
                    return {};
                }
            }
        })
        .when("/patient/:id?", {
            templateUrl: "views/patients/update.html",
            controller:'patientFormCtrl',
            resolve:{
                patient: function($http,$q,$route){
                    let delay = $q.defer();
                    $http.get('/patients/' + $route.current.params.id + '/get').then(function (response) {
                        console.log(response.data)
                        delay.resolve(response.data);
                    })
                    return delay.promise;
                }
            }
        })
        .otherwise({
            templateUrl: "views/general/404.html",
        })
});