(function(){
    'use strict';

    angular
        .module('cabbage')
        .factory('authInjector', authInjector);

        function authInjector(){

            var authInjector = {
                request: request
            }

            return authInjector;

            //////////

            function request(config){
                
//                config.headers.Authorization = 'Bearer ' + localStorage.getItem('jwt');
                config.headers.accept = 'application/json';
                config.headers['Content-Type'] = 'application/x-www-form-urlencoded;';

                return config;

            }

        }
    
})();