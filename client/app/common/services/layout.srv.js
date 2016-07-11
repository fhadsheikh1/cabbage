'use strict';

angular
    .module('cabbage')
    .factory('layoutSrv',layoutSrv);

    function layoutSrv(){

        var layout = {
            stickyFooter: stickyFooter
        }

        return layout;

        //////////

        function load(){
            resizeWindow();
            stickyFooter();
        }

        function resizeWindow(subtract){
            var height = $(window).height();
            $('.fill-window').css('min-height',height-subtract);
        }

        function stickyFooter(subtract){

            resizeWindow(subtract);

            $(window).resize(function(){resizeWindow(subtract);});

        }

  }