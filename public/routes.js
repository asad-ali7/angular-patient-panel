angular.module('hospitalApp').config(function ($routeProvider,$locationProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "views/patients/list.html",
        controller: 'patientListController',
        resolve: {
            patients: function(){
                return [];
            }
        }
    })
    .when("/patient/create", {
        templateUrl: "views/patients/create.html"
    })
    .when("/patient/:id?", {
        templateUrl: "views/patients/update.html"
    })
});