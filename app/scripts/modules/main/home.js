'use strict';
angular.module('CMS.home', [])
.config(function($stateProvider){
  $stateProvider.state('main.home', {
    url: 'home',
    data : { title: 'Home' },
    views: {
      'layoutMainContent': {
        controller: 'HomeCtrl',
        controllerAs: 'vm',
        templateUrl: 'partials/home.tpl.html'
      }
    }
  });
})

.controller('HomeCtrl', [ 'restFactory', 'Flash', '$timeout', 'ngDialog', '$scope', function(restFactory, Flash, $timeout, ngDialog, $scope) {

  var vm = this;
  vm.loading = true;
  vm.pageSize = 5;
  activate();

  /**
   *  Retrieve a list of stored events from server
   */
   function activate() {
    return restFactory.makeGETrequest('ent_dev')
    .then(function(response) {
      vm.events = response.data.results;
      $timeout(stopLoading, 500);
    }, function(error) {
      var message = '<strong>Error!</strong> Unable to retrieve data at this time';
      $timeout(stopLoading, 2000);
      Flash.create('danger', message, 'custom-class');
    });
  }

  /*
   * Function called when the user clicks to delete an item from the list
   * Will open an additional dialog box to confirm the request
   */
  vm.delete = function(eventObj) {
    ngDialog.open({
      template: 'partials/modals/dialog.html',
      controller : DeleteEntryCtrl(eventObj),
      scope: $scope
    });
  };

  /**
   * Function called when user wishes to create a new event
   * Will route the user to a different state
   */
  vm.create = function() {
    restFactory.makePOSTrequest('ent_dev', 'ent_dev.json')
    .then(function(data){

    });
  };

  vm.pageCtrl = function() {
    $scope.pageChangeHandler = function(num) {
    console.log('going to page ' + num);
  };
}

  /*
   * Display data to user and cancel the loading directive
   */
   function stopLoading(){
     vm.loading = false;
   }


  /**
   * Function to handle the dialog box to delete and object
   * The user must confirm to delete the selected event
   * @param {obj} event - The event the user may wish to delete
   */
   function DeleteEntryCtrl(event) {
    vm.deleteEvent = function() {
      restFactory.makeDELETErequest('ent_dev', event.objectId)
      .then(handleSuccess)
      .catch(handleError)
      .finally(function(){
        ngDialog.close();
      });

    };
    /*
     * Handles a succesfull DELETE request
     */
    function handleSuccess(data, status) {
      var message = '<strong>Done!!</strong> This event has now been removed';
      Flash.create('success', message, 'custom-class');
      activate();
    }
    /*
     * Display an error message to the user if this request fails for any reason
     */
    function handleError(errorResponse) {
      var message = '<strong>Error!</strong> There was a problem deleting the event. Please try again';
      Flash.create('danger', message, 'custom-class');
    }
  }


}]);
