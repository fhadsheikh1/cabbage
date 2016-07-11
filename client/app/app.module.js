/* Set Angular Module for Cabbage */

(function(){

    'use strict';

    // Define name for angular module and it's dependencies
    angular
        .module('cabbage', [
            'ui.router',
            'validation.match',
            'angular-jwt',
            'angular-storage',
            'counter',
            'oitozero.ngSweetAlert'
        ])

})();