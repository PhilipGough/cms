'use strict';

var CMS = angular.module('CMS', [
  'ui.bootstrap',
  'ui.router',
  'uiRouterStyles',
  'ngCookies',
  'pascalprecht.translate',
  'CMS.home',
  'flash',
  'ngMessages',
  'nya.bootstrap.select',
  'angular-spinkit',
  'ngDialog',
  'angularUtils.directives.dirPagination'
]);


CMS.config(function($stateProvider, $locationProvider,$httpProvider,
                     $urlRouterProvider, $translateProvider, $compileProvider){

  $urlRouterProvider.otherwise('/home');
  //allow local assets CSP
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|chrome-extension):|data:image\//);
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|chrome-extension):/);

  $stateProvider.state('main', {
    url: '/',
    data : {
      restricted: false
    },
    abstract: false,
    templateUrl: 'partials/main.tpl.html',
    controller: 'MainCtrl'
  });

  $httpProvider.interceptors.push('httpInterceptor');
  //$httpProvider.defaults.withCredentials = true;
  //No states are matched, use this as the fallback
  //$locationProvider.html5Mode(true);

  //Set Up Translation Provider
  $translateProvider
    .preferredLanguage('en')
    .useLocalStorage()
    .useStaticFilesLoader({ prefix: '/copy/', suffix: '.json' })
    .useSanitizeValueStrategy('escaped');
});

CMS.run(function($rootScope, $state, $stateParams){
   $rootScope.baseURL = 'https://api.parse.com/1/classes/';
   $rootScope.$state = $state;
   $rootScope.$stateParams = $stateParams;
});

CMS.factory('httpInterceptor', function() {
  return {
    request: function (config) {

      config.headers['X-Parse-Application-Id'] = 'GIMuFPXzRBxLxD0LbCn5nUYD9ObOYuWFLSL4GYNN';
      config.headers['X-Parse-REST-API-Key'] = 'I5iVhUODnTEiZXDCfDbFBnp4Xo2SOBWyXd3vwvzE';

      return config;
    }
  };
});

CMS.controller('MainCtrl', function(){

});





