/* Auth Service */

(function(){

    angular
        .module('cabbage')
        .factory('authSrv', authSrv);

        function authSrv(SERVER, $http, $q, store, jwtHelper, $rootScope, $state){

            var service = {
                login:login,
                logout:logout,
                checkLogin: checkLogin
            } 

            return service;

            ///////////////

            function checkLogin(){

                var deferred = $q.defer();

                if(localStorage.getItem('jwt')){
                    $rootScope.$broadcast('userLoggedIn', true);
                    deferred.resolve('user is logged in');
                } else {
                    $rootScope.$broadcast('userLoggedIn', false);
                    deferred.reject('user is not logged in');
                }

                return deferred.promise;

            }

            function login(email, password){

                var data = $.param({
                    email: email,
                    password: password
                })

                var deferred = $q.defer();

                $http.post(SERVER.url + 'auth', data)
                .then(function(res){
                    store.set('jwt', res.data);
                    deferred.resolve(res);
                }, function(err){
                    deferred.reject();
                })

                return deferred.promise;

            }

            function logout(){

                var deferred = $q.defer();

                if(store.get('jwt')){
                    store.remove('jwt');
                    deferred.resolve();
                    $state.go('login');
                } else {
                    deferred.reject();
                }

                return deferred.promise;
            }


        }

})();