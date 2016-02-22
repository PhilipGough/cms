'use strict';
angular.module('CMS')

.factory('restFactory', ['$http', '$rootScope', function($http, $rootScope) {

  var restClient = {};

  restClient.makeGETrequest = function(endpoint, id) {
    if(id !== undefined){
      endpoint= endpoint + '/' + id
    }
    return $http({
        method: 'get',
        url: $rootScope.baseURL + endpoint,
        contentType: 'application/json'
    });
  };

  restClient.makePOSTrequest = function(endpoint, payload) {
    return $http({
      method: 'post',
      url: $rootScope.baseURL + endpoint,
      contentType: 'application/json',
      data: payload
    });
  };

  restClient.makeDELETErequest = function(endpoint, id) {
    var resource = id.toString();
    return $http({
      method: 'delete',
      url: $rootScope.baseURL + endpoint + '/' + resource,
      contentType: 'application/json'
    });
  };

  return restClient;
}]);
