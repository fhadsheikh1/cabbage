/* Routes for Cabbage using ui-router */

(function(){

    angular
        .module('cabbage')
        .config(config);

        function config($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider){

            $urlRouterProvider
            .otherwise('/');

            $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/components/login/login.view.html',
                controller: 'LoginCtrl',
                controllerAs: 'login'
            })
            .state('profile', {
                url: '/profile',
                templateUrl: 'app/components/profile/profile.view.html',
                controller: 'ProfileCtrl',
                controllerAs: 'profile',
                protected: true
            })
            .state('home', {
                abstract: true,
                url: '/',
                templateUrl: 'app/components/home/home.view.html',
                controller: 'HomeCtrl',
                controllerAs: 'home',
                protected: true
            })
            .state('home.users', {
                url: '',
                templateUrl: 'app/components/home/users/users.view.html',
                controller: 'UsersCtrl',
                controllerAs: 'users',
                protected: true
            });

            // Send Authorization header with JWT with each request
            $httpProvider.interceptors.push('authInjector');

            $locationProvider
            .html5Mode(true);

        }

})();