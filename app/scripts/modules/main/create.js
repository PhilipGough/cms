'use strict';
angular.module('CMS.create', ['mgo-angular-wizard', 'ui.tinymce'])
.config(function($stateProvider){
  $stateProvider.state('main.create', {
    url: 'create',
    data : { title: 'Create Event' },
    views: {
      'layoutMainContent': {
        controller: 'CreateEventCtrl',
        controllerAs: 'vm',
        templateUrl: 'partials/create.tpl.html'
      }
    },
    resolve: {
      getHeadingInfo : function() {
        return {
          header: 'Create and add an event',
          message: 'Follow the steps in the form below to add a new event to the system.'
        }
      }
    }
  });
})

.controller('CreateEventCtrl', [ 'restFactory', 'eventService', 'getHeadingInfo', '$state',
                 function(restFactory, eventService, getHeadingInfo, $state) {

  var vm = this;
  vm.stateMessage = getHeadingInfo;
  vm.finishWizard = onSubmit;
  vm.event = {};
  vm.event = eventService.getJSONObject();
  vm.onSubmit = onSubmit;
  vm.exitValidation = function(form) {
      return form && !form.$invalid;
  };

  vm.fields = [];
  vm.fields['step1'] = eventService.getFirstStep(vm);
  vm.fields['step2'] = eventService.getSecondStep(vm);
  vm.fields['step3'] = eventService.getThirdStep(vm);
  vm.fields['step4'] = eventService.getFourthStep(vm);
  vm.fields['step5'] = eventService.getFifthStep(vm);
  vm.fields['step6'] = eventService.getSixthStep(vm);

  function onSubmit() {
    var thisId = Math.floor((Math.random() * 1000) + 1);
    vm.event.id = thisId;
    if(vm.event.model_type === 'Workshop') {
          vm.event.template_meta.type = 'template1_workshops';
    }

    restFactory.makePOSTrequest('ent_dev', angular.toJson(vm.event) )
    .then(function() {
      $state.go('main.home');
    });

  }


}]);
