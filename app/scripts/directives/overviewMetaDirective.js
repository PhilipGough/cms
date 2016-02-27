'use strict';
angular.module('CMS')

.directive('overviewMeta', overviewMeta);
/*
 * Returns directive which handles meta section of overview object
 */
function overviewMeta() {
  var directive = {
      restrict: 'EA',
      templateUrl: 'partials/directivePartials/overviewMetaSection.tpl.html',
      controller: MetaCtrl,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
}
// Inject scope and Service to controller
MetaCtrl.$inject = ['$scope', 'formBuilder'];

/*
 * Controller for this directive
 */
function MetaCtrl($scope, formBuilder) {
  var vm = this;
  vm.meta = $scope.model.meta;
  vm.showSection = vm.meta.visible;

  // Retreive the dropdown menu objects from the service
  vm.bckgClrOptions = formBuilder.backgroundColorOptions();
  vm.cornerOpts = formBuilder.borderRadius();

  // Parse current css string to array, check if values in our object
  // Assign default value to already selected value if found
  var currentCss = (vm.meta.css).split(" ");
  for(var i = 0 ; i < currentCss.length ; i ++) {
      for(var property in vm.bckgClrOptions) {
          if(vm.bckgClrOptions[property] === currentCss[i]) {
              vm.chosenBckColor = vm.bckgClrOptions[property];
              break;
          }
        }
      for(var property in vm.cornerOpts) {
          if(vm.cornerOpts[property] === currentCss[i]) {
              vm.chosenRadius = vm.cornerOpts[property];
              break;
          }
        }
  }


}
