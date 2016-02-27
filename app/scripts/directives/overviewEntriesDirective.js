'use strict';
angular.module('CMS')

.directive('overviewEntries', overviewEntries)

//The following factory and directive used to focus an element was taken from
// http://stackoverflow.com/questions/25596399/set-element-focus-in-angular-way
.factory('focus', function($timeout, $window) {
    return function(id) {
      $timeout(function() {
        var element = $window.document.getElementById(id);
        if(element)
          element.focus();
      });
    };
  })

.directive('eventFocus', function(focus) {
    return function(scope, elem, attr) {
      elem.on(attr.eventFocus, function() {
        focus(attr.eventFocusId);
      });

      // Removes bound events in the element itself
      // when the scope is destroyed
      scope.$on('$destroy', function() {
        elem.off(attr.eventFocus);
      });
    };
});

/*
 * Function returns a new directive with controller and template
 */
function overviewEntries() {
  var directive = {
      restrict: 'EA',
      templateUrl: 'partials/directivePartials/entriesSection.tpl.html',
      controller: EntryCtrl,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
}
// Inject scope and focus factory referecned above
EntryCtrl.$inject = ['$scope', 'focus'];

/*
 * Controller for this directive
 */
function EntryCtrl($scope, focus) {
  var vm = this;
  vm.data = $scope.model.data;

  /*
   * Set dropdown for text positions
   */
  vm.textPositionOptions = {
    'Left': 'text-left',
    'Right': 'text-right',
    'Center': 'text-centre'
  };

  /*
   * Reset all options to defaults
   */
  function reset() {
    vm.tinymceModel = "";
    vm.showEntry = true;
    vm.buttonState = 'Add Entry';
    vm.editIndex = null;
    vm.textPosition = vm.textPositionOptions['Left'];
  }
  reset();

  /*
   * Function which adds an entry to the list
   * Creates object using values associated with models in view
   */
  vm.addEntry = function() {
    if(vm.tinymceModel === ""){
      return;
    }
    if(vm.buttonState === "Edit Entry") {
        editEntry();
    }else {
      var entry = {
        'css': vm.textPosition,
        'style': '',
        'text': vm.tinymceModel,
        'visible': vm.showEntry
      };
      vm.data.push(entry);
    }
    reset();
  };

  /*
   * Function to edit an entry in the list
   * Reassign vaues based on current model values
   */
  function editEntry() {
    vm.data[vm.editIndex].text = vm.tinymceModel;
    vm.data[vm.editIndex].visible = vm.showEntry;
  }

  /*
   * function called on button click in view
   * Revert focus to correct area
   * Change text on "Add entry button" to edit
   */
  vm.editEntry = function(index) {
    focus('editFocus');
    vm.editIndex = index;
    vm.tinymceModel = vm.data[index].text;
    vm.buttonState = "Edit Entry";
  };

  /*
   * Remove entry from list
   */
  vm.deleteEntry = function(index) {
    vm.data.splice(index,1);
  };
}
