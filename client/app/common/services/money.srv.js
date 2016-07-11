/* Money Service */

(function(){

    angular
        .module('cabbage')
        .factory('moneySrv', moneySrv);

        function moneySrv($q, $http, SERVER, jwtHelper){

            var service = {
                checkBalance: checkBalance,
                sendMoney: sendMoney
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

            function sendMoney(amount, toId){

                var data = $.param({
                    amount: amount,
                    to: toId
                })

                var deferred = $q.defer();

                $http.post(SERVER.url + 'money', data)
                .then(function(res){
                    deferred.resolve();
                }, function(err){
                    deferred.reject();
                })

                return deferred.promise;

            }




        }

})();