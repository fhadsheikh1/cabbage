(function(){
    'use strict';

    angular
        .module('cabbage')
        .factory('authInjector', authInjector);

        function authInjector(store){

            var authInjector = {
                request: request
            }

            return authInjector;

            //////////

            function request(config){
                
                if(store.get('jwt')){
                    config.headers.Authorization = store.get('jwt').replace(/"/g,"");
                }
                
                config.headers.accept = 'application/json';
                config.headers['Content-Type'] = 'application/x-www-form-urlencoded;';
                
                return config;

            }

        }
    
})();