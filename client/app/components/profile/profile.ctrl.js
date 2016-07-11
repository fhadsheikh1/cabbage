(function(){

    angular
        .module('cabbage')
        .controller('ProfileCtrl', profileCtrl);

        function profileCtrl(profileSrv, layoutSrv){

            var vm = this;
            vm.busy = true;

            load();

            function load(){
                loadTransactions();
            }

            function loadTransactions(){

                profileSrv.getTransactions()
                .then(function(res){
                    vm.transactions = res.data;
                    vm.busy = false;
                }, function(err){
                    vm.busy = false;
                })

            }

            layoutSrv.stickyFooter(338);

        }

})();