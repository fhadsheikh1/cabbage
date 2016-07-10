/* Login Service */

(function(){

    angular
        .module('cabbage')
        .factory('loginSrv', loginSrv);

        function loginSrv($q, $http, SERVER){

            var service = {

                createUser: createUser

            }

            return service;

            ///////////////

            function createUser(firstname, lastname, email, password){

                var data = $.param({
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    password: password
                })

                var deferred = $q.defer();

                $http.post(SERVER.url + 'user', data)
                .then(function(res){
                    deferred.resolve();   
                }, function(){
                    deferred.reject();
                })

                return deferred.promise;

            }

        }

})();