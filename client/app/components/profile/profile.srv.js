(function(){

    angular
        .module('cabbage')
        .factory('profileSrv', profileSrv);

        function profileSrv(SERVER, $q, $http){

            var service = {
                getTransactions: getTransactions
            }

            return service;

            //////////////

            function getTransactions(){

                var deferred = $q.defer();

                $http.get(SERVER.url + 'transactions')
                .then(function(res){
                    deferred.resolve(res);
                }, function(err){
                    deferred.reject(err);
                })

                return deferred.promise;

            }


        }

})();