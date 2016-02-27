'use strict';
angular.module('CMS')

.directive('templateStyling', templateStyling);
/*
 * Returns directive which handles meta section of overview object
 */
function templateStyling() {
  var directive = {
      restrict: 'EA',
      templateUrl: 'partials/directivePartials/templateMetaStyling.tpl.html',
      controller: TemplateMeta,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
}
// Inject scope and Service to controller
TemplateMeta.$inject = ['$scope', 'formBuilder'];

/*
 * Controller for this directive
 */
function TemplateMeta($scope, formBuilder) {
  var vm = this;
  vm.data= $scope.model.template_meta;

  vm.borderClrOptions = formBuilder.borderColorOptions();
  vm.borderStyleOptions = formBuilder.borderCssOptions();
  vm.crnrOptions = formBuilder.borderRadius();

  var currentSubmissionString = vm.data.submission_container_css.split(" ");
  for(var i = 0 ; i < currentSubmissionString.length ; i++) {
    if(currentSubmissionString[i].includes('rcorners')) {
      vm.brdCrnrs = currentSubmissionString[i];
    } else if (currentSubmissionString[i].includes('brd_clr')) {
      vm.brdrColor = currentSubmissionString[i];
    }
      else {
        for(var property in vm.borderStyleOptions) {
          if(vm.borderStyleOptions[property] === currentSubmissionString[i]) {
              vm.brdrStyle = vm.borderStyleOptions[property];
              break;
          }
        }
      }
  }


  vm.submissionChange = function() {
    vm.data.submission_container_css = vm.brdCrnrs + ' ' + vm.brdrColor + ' ' + vm.brdrStyle;
  };

}
