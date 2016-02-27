'use strict';

var CMS = angular.module('CMS', [
  'ui.bootstrap',
  'ui.router',
  'uiRouterStyles',
  'ngCookies',
  'pascalprecht.translate',
  'CMS.home',
  'CMS.create',
  'flash',
  'ngMessages',
  'nya.bootstrap.select',
  'angular-spinkit',
  'ngDialog',
  'angularUtils.directives.dirPagination',
  'formly',
  'formlyBootstrap'
]);


CMS.config(function($stateProvider, $locationProvider,$httpProvider,formlyConfigProvider,
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
    abstract: true,
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


    formlyConfigProvider.setType({
      name: 'groupedSelect',
      templateUrl: 'partials/selects/eventType.tpl.html'
    });

    formlyConfigProvider.setType({
      name: 'attendee',
      template: '<attendee-position></attendee-position>'
    });

    formlyConfigProvider.setType({
      name: 'entries',
      template: '<overview-entries></overview-entries>'
    });

    formlyConfigProvider.setType({
      name: 'overviewMeta',
      template: '<overview-meta></overview-meta>'
    });

    formlyConfigProvider.setType({
      name: 'offerings',
      template: '<offerings-sec></offerings-sec>'
    });

    formlyConfigProvider.setType({
      name: 'templateMeta',
      template: '<template-styling></template-styling>'
    });

    formlyConfigProvider.setType({
      name: 'another',
      templateUrl: 'partials/selects/cssSelect.tpl.html'
    });
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





