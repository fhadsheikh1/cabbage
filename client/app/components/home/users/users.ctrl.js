/* Users Controller */

(function(){

    angular
        .module('cabbage')
        .controller('UsersCtrl', usersCtrl);

        function usersCtrl(usersSrv, SweetAlert, moneySrv, $rootScope, layoutSrv){

            var vm = this;
            vm.sendMoney = sendMoney;
            vm.busy = true;

            load();

            function load(){
                loadUsers();
            }
            function loadUsers(){

                usersSrv.getUsers()
                .then(function(res){
                    vm.users = res.data;
                    vm.busy = false;
                }, function(err){
                    vm.busy = false;
                })

            }
            
            function sendMoney(name, toId, senderBalance){


                swal({
                    title: "Send Money to "+name,
                    type: "input",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    inputPlaceholder: "Enter Amount",
                    showLoaderOnConfirm: true
                }, function(inputValue){

                    if (inputValue === false) return false;
                    if (inputValue === "") {
                       swal.showInputError("Please enter amount");
                       return false
                    }
                    
                    inputValue = parseInt(inputValue);
                    senderBalance = parseInt(senderBalance);

                    if (inputValue > senderBalance){
                        swal.showInputError("Insufficient Funds, you only have $"+senderBalance);
                        return false;
                    }

                    moneySrv.sendMoney(inputValue, toId)
                    .then(function(res){
                        swal("Money Transferred!", '$'+inputValue+' successfully sent', "success"); 
                        $rootScope.$broadcast('updatedBalance');
                        loadUsers();
                    }, function(err){
                        swal("Transfer Failed!", 'There was an error', "error"); 
                    })
                    
                    

                });
                
            }

            layoutSrv.stickyFooter(260);
            
        }

})();