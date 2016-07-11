/* Money Service */

(function(){

    angular
        .module('cabbage')
        .factory('moneySrv', moneySrv);

        function moneySrv($q, $http, SERVER, jwtHelper){

            var service = {
                checkBalance: checkBalance
            }

            return service;

            ///////////////

            function checkBalance(){

                var deferred = $q.defer();

                $http.get(SERVER.url + 'money')
                .then(function(res){
                    deferred.resolve(res.data);
                }, function(err){
                    deferred.reject(err);
                });

                return deferred.promise;

            }


        }

})();