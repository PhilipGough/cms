'use strict';
angular.module('CMS.create', ['mgo-angular-wizard', 'ui.tinymce'])
.config(function($stateProvider){
  $stateProvider.state('main.create', {
    url: 'create',
    data : { title: 'Create Event' },
    views: {
      'layoutMainContent': {
        controller: CreateEventCtrl,
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
      },
      getRequiredObject: function() {}
    }
  });
});


'use strict';
angular.module('CMS.edit', ['mgo-angular-wizard', 'ui.tinymce'])
.config(function($stateProvider){
  $stateProvider.state('main.edit', {
    url: 'edit/:objectId',
    data : { title: 'Edit Event' },
    views: {
      'layoutMainContent': {
        controller: CreateEventCtrl,
        controllerAs: 'vm',
        templateUrl: 'partials/create.tpl.html'
      }
    },
    params: {
     obj: null,
     objectId: ''
    },
    resolve: {
      getHeadingInfo : function() {
        return {
          header: 'Edit an event',
          message: 'Follow the steps in the form below to edit the chosen event.'
        }
      },
      getRequiredObject : function($stateParams, restFactory) {
        if ($stateParams.obj !== null) {
            return $stateParams.obj;
        } else {
            return restFactory.makeGETrequest('ent_dev', $stateParams.objectId)
            .then(function(response) {
                return response.data;
            });
        }
      }
    }
  });
});

function CreateEventCtrl(restFactory, eventService, getHeadingInfo, $state, $timeout, getRequiredObject) {

  var vm = this;
  vm.stateMessage = getHeadingInfo;
  vm.finishWizard = onSubmit;
  vm.event = {};
  vm.ready = false;


  /*
   * Display data to user and cancel the loading directive
   */
   function stopLoading(){
     vm.ready = true;
   }

  if($state.current.url === 'create'){
      vm.event = eventService.getJSONObject();
      $timeout(stopLoading, 500);
  } else {
      vm.event = getRequiredObject;
      $timeout(stopLoading, 500);
  }


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
    if(vm.event.model_type === 'Workshop') {
          vm.event.template_meta.type = 'template1_workshops';
    }
    if($state.current.url === 'create'){
      var thisId = Math.floor((Math.random() * 1000) + 1);
      vm.event.id = thisId;
      restFactory.makePOSTrequest('ent_dev', angular.toJson(vm.event) )
      .then(function() {
          $state.go('main.home');
      });
    }
    else {
        restFactory.makePUTrequest('ent_dev', angular.toJson(vm.event), $state.params.objectId )
        .then(function() {
          $state.go('main.home');
        });
    }


  }



};
