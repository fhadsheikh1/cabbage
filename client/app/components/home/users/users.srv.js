(function(){

    angular
        .module('cabbage')
        .factory('usersSrv', usersSrv);

        function usersSrv(SERVER, $q, $http){

            var service = {
                getUsers:getUsers
            }

            return service;

            function getUsers(){

                var deferred = $q.defer();

                $http.get(SERVER.url + 'users')
                .then(function(res){
                    deferred.resolve(res);
                    console.log(res);
                }, function(err){
                    deferred.reject(err);
                    console.log(err);
                })

                return deferred.promise;

            }

        }

})();