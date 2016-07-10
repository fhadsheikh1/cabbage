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
                abstract: true,
                url: '/',
                templateUrl: 'app/components/home/home.view.html',
                controller: 'HomeCtrl',
                controllerAs: 'home'
            })
            .state('home.users', {
                url: '',
                templateUrl: 'app/components/home/users/users.view.html',
                controller: 'UsersCtrl',
                controllerAs: 'users'
            })

            $locationProvider
            .html5Mode(true);

        }

})();