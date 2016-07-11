/* User Service */

(function(){

    angular
        .module('cabbage')
        .factory('userSrv', userSrv);

        function userSrv($q, $http, SERVER, jwtHelper){

            var service = {
                createUser: createUser,
                getUser: getUser
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

            function getUser(){
                if(localStorage.getItem('jwt')){
                    return jwtHelper.decodeToken(localStorage.getItem('jwt'));
                } else {
                    return false;
                }

            }

        }

})();