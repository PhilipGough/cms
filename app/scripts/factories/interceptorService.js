'use strict';
angular.module('CMS')

.factory('httpInterceptor', function() {
  return {
    request: function (config) {

      config.headers['X-Parse-Application-Id'] = 'GIMuFPXzRBxLxD0LbCn5nUYD9ObOYuWFLSL4GYNN';
      config.headers['X-Parse-REST-API-Key'] = 'I5iVhUODnTEiZXDCfDbFBnp4Xo2SOBWyXd3vwvzE';

      return config;
    }
  };
});
