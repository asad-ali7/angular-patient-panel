angular.module('hospitalApp').factory('Interceptor', function ($q,$window,$injector) {
    return {
        // optional method
        'request': function (config) {
            // do something on success
            return config;
        },
        // optional method
        'requestError': function (rejection) {
            // do something on error
            return $q.reject(rejection);
        },
        // optional method
        'response': function (response) {
            console.log('-----------------------',response.statusText);
            // do something on success
            return response;
        },
        // optional method
        'responseError': function (rejection) {
            let toastr = $injector.get('toastr');
            console.log('-----------------------',rejection.statusText);
            if (rejection.status && rejection.status == 403) {
                $window.location.href = '#!/login';
            }
            if (rejection.status && rejection.status == 500) {
                toastr.error(rejection.data, 'Error');
            }
            // do something on error
            return $q.reject(rejection);
        }
    };
});

