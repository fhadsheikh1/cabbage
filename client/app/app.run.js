(function(){

    angular
        .module('cabbage')
        .run(run);

        
        function run($rootScope, $location, authSrv, moneySrv, $state){

            $rootScope.$on('$routeChangeError', function(){
                $state.go('login');
            })
            
            $rootScope.$on('$stateChangeStart', stateChangeStart)
            
            function stateChangeStart(event, toState){
                authentication(event, toState);
                loggedInRedirect(event, toState);
                checkBalance();
            }
            
            function authentication(event, toState){
                
                if(toState.protected){
                    
                    authSrv.checkLogin()
                    .then(function(){
                        
                    }, function(){
                        $state.go('login');
                    })
                    
                }
            }

           function loggedInRedirect(event, toState){

               if(toState.name == 'login'){

                   authSrv.checkLogin()
                   .then(function(){
                       $state.go('home.users');
                   })

               }

           }

           function checkBalance(event, toState){

               authSrv.checkLogin()
               .then(function(res){


                moneySrv.checkBalance()
                .then(function(res){
                    $rootScope.$broadcast('updatedBalance', res);
                })

               })

           }
            
        
    }


})();