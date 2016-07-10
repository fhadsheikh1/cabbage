/* Routes for Cabbage using ui-router */

(function(){

    angular
        .module('cabbage')
        .config(config);

        function config($stateProvider, $urlRouterProvider, $locationProvider){

            $urlRouterProvider
            .otherwise('home');

        }

})();