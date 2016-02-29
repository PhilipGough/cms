'use strict';
angular.module('CMS')

.directive('offeringsSec', offerings);

/**
 * Function which returns a directive for the offering section
 * @return {[type]} [description]
 */
function offerings() {
  var directive = {
    restrict: 'EA',
    templateUrl: 'partials/directivePartials/offeringSection.tpl.html',
    controller: OfferingCtrl,
    controllerAs: 'vm',
    bindToController: true
  };

  return directive;
}
// Inject required scope and formBuilder service into controller for this directive
OfferingCtrl.$inject = ['$scope', 'formBuilder'];

/**
 * Controller ffor this directive
 * @param - $scope - The scope injected
 * @param {Factory Object} formBuilder - The service which returns dropdown options
 */
function OfferingCtrl($scope, formBuilder) {

  var vm = this;
  // This css is always required for items
  var baseItemCss = ' rl_box_shadow1 rl_margin_top_10 ';
  vm.info = $scope.model.offerings;
  vm.info.meta.itemCss = vm.info.meta.itemCss + baseItemCss;

  function reset() {
  vm.mainText = '';
  vm.subText = '';
  vm.addOffering = false;
  vm.showOffering = true;
  }

  reset();

  // Populate the dropdown menus with required options
  vm.bckgClrOptions = formBuilder.backgroundColorOptions();
  vm.cornerOpts = formBuilder.borderRadius();
  vm.borderClrs = formBuilder.borderColorOptions();
  vm.borderTypes = formBuilder.borderCssOptions();
  vm.fontSize = formBuilder.fontSize();


  // Split the current css string into an array, parse it and select
  // any options already selected as default
  var currentCss = (vm.info.meta.columnCss).split(" ");
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
  // Split the item css string into an array, parse it and select
  // any options already selected as default
  var itemCss = (vm.info.meta.itemCss).split(" ");
  for(var j = 0 ; j < itemCss.length ; j ++) {
    for(var property in vm.cornerOpts) {
      if(vm.cornerOpts[property] === itemCss[j]) {
        vm.itemchosenRadius = vm.cornerOpts[property];
        break;
      }
    }
    for(var property in vm.borderClrs) {
      if(vm.borderClrs[property] === itemCss[j]) {
        vm.itemchosenBorderClr = vm.borderClrs[property];
        break;
      }
    }
    for(var property in vm.borderTypes) {
      if(vm.borderTypes[property] === itemCss[j]) {
        vm.itemchosenBorderType = vm.borderTypes[property];
        break;
      }
    }
  }
  /*
   * Function called by ng-change directive on the columnCss models
   */
  vm.makeCssChange = function() {
    vm.info.meta.columnCss = vm.chosenRadius + ' ' + vm.chosenBckColor;
  };

  /*
   * Function called by ng-change directive on the itemCss models
   */
  vm.makeItemCssChange = function() {
    vm.info.meta.itemCss = baseItemCss + vm.itemchosenBorderType + ' ' + vm.itemchosenBorderClr + ' ' + vm.itemchosenRadius;
  };

  vm.readerAddOffering = function() {
    vm.addOffering = true;
  };

  vm.cancelAdd = function() {
    reset();
  }

  var validDetails = function() {
    if(vm.mainText.length > 0) {
      if(vm.subText.length >0) {
        return true;
      }
    }
    return false;
  };


  /*
   * Function used to add an offering to the list
   */
  vm.add = function() {
    if(! validDetails() ) {
      return;
    }

    if(angular.isUndefined(vm.mainSize)){
      vm.mainSize = 'rl_font_1_5';
    }
    if(angular.isUndefined(vm.subSize)) {
      vm.subSize = 'rl_font_1_2';
    }
    var offering = {
      status: '',
      date: '',
      quota: -1,
      order: vm.info.data.length + 1,
      visible: vm.showOffering,
      tag: '',
      lines: [
        {
          "text":vm.mainText,
          "css":"rl_padding_left_15 " + vm.mainSize,
          "style":""
        },
        {
          "text": vm.subText,
          "css":"rl_padding_left_15 " + vm.subSize,
          "style":""
        }
      ]
    };
    vm.info.data.push(offering);
    reset();
  };

  vm.removeOffering = function(index) {
    vm.info.data.splice(index,1);
  };


}
