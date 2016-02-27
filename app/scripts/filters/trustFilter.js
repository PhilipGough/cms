// Copied from http://ericclemmons.com/angular/angular-trust-filter/
// This filter allows HTML string to be presented as is in the view
'use strict';
angular.module('CMS')

.filter('trust', [
        '$sce',
        function($sce) {
          return function(value, type) {
        // Defaults to treating trusted text as `html`
        return $sce.trustAs(type || 'html', value);
      }
    }
]);
