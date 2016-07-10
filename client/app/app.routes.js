/* Routes for Cabbage using ui-router */

(function(){

    angular
        .module('cabbage')
        .config(config);

        function config($stateProvider, $urlRouterProvider, $locationProvider){

            $urlRouterProvider
            .otherwise('/');

            $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/components/home/home.view.html',
                controller: 'HomeCtrl',
                controllerAs: 'home'
            })

            $locationProvider
            .html5Mode(true);

        }

})();