'use strict';
angular.module('CMS')

.factory('eventService', function(formBuilder) {
  var eventService = {};

  function watchCase($viewValue, $modelValue, scope) {
   if (scope.model.organisation === undefined) {
      return false;
    } else {
      return !(scope.model.organisation.meta.enabled);
    }
  }

  eventService.getJSONObject = function() {
   return {
    "id":1,
    "cId":"",
    "name":"",
    "nameLowercase" : "",
    "model_type":"",
    "template_meta":

    {
        "copiedFrom":"",
        "type":"template1_seminar",
        "panel_hover_css" : "",
        "submission_container_css" : "",
        "attendee_edit_hover_css" : "",
        "description":""

    }

    ,
    "period":"",
    "available":true,
    "active":true,
    "active_start":"",
    "active_finish":"",
    "notes": "_",
    "contact":{
      "meta":{
        "enabled":false
      },
      "data":{
        "surname":"",
        "forename":"",
        "position":"",
        "email":"",
        "email2":"",
        "phone":""
      }
    },
    "organisation":
    {
      "meta":{
        "enabled":true,
        "template":"organisation_minimum",
        "ui_text_attendee":"Delegate",
        "ui_text_to_display":"",
        "requireContactDetails":true,
        "allowChooser":true,
        "allowCountyFilter":true,
        "addressfilterfield":"",
        "sectorNo_text":""
      },
      "data":{
        "orgId":"",
        "name":"",
        "email":"",
        "email2":"",
        "address":"",
        "County":""
      }
    }
    ,
    "attendees_meta":{
      "maxNo":10,
      "max_per_entry":-1,
      "request_lunch":false,
      "request_position":true,
      "positions":[
      ]
    },
    "overview":
    {

      "meta":{
        "visible":true,
        "css" : "b_solid",
        "style" : "font-size:1em"
      },
      "data":[
      ]
    },

    "offerings":
    {
      "meta":{
        "visible":true,
        "columns":3,
        "columnCss": "",
        "columnStyle": "padding-bottom:10px;",
        "itemCss" : "",
        "itemStyle" : "border-width: 3px; rl_font_1_5 rl_padding_left_15"
      },
      "data":[
      ]
    }

  }
};


eventService.getFirstStep = function(vm) {
  return [
  {
    key: 'name',
    type: 'input',
    templateOptions: {
      type: 'text',
      label: 'Enter a header which will be displayed as an overview',
      placeholder: 'Main display heading',
      required: true,
      focus: true
    }
  },
  {
    key: 'model_type',
    name: 'Select event type',
    type: 'groupedSelect',
    templateOptions: {
      label: "Choose the type of event *",
      options: ["Seminar", "Workshop"],
      required: true
    }
  },
  {
    key: 'description',
    model: vm.event.template_meta,
    type: 'textarea',
    templateOptions: {
      label : "Enter a description here",
      placeholder: 'Optional text to describe the event in more detail',
      rows : 3
    }
  },
  {
    key: 'available',
    type: 'checkbox',
    className: "alert alert-warning",
    templateOptions: {
      label: 'Do you wish to make this event available?',
    }
  },
  {
    key: 'active',
    type: 'checkbox',
    className: "alert alert-warning",
    templateOptions: {
      label: 'Do you wish to make this event active?',
    }
  },
 ];
};

eventService.getSecondStep = function(vm) {
  return [
      {
        key: 'meta',
        model: vm.event.overview,
        type: 'overviewMeta'
      },
      {
        key: 'data',
        model: vm.event.overview,
        type: 'entries'
      }
  ];
};

eventService.getThirdStep = function(vm) {
  return [
    {
      className: "alert alert-warning",
      key: 'columns',
      model: vm.event.offerings.meta,
      type: 'input',
      templateOptions: {
        label: 'Set the number of required columns, 1-4',
        type: 'number',
        "max": 4,
        "min": 1
      }
    },
    {
      className: "alert alert-warning",
      key: 'visible',
      model: vm.event.offerings.meta,
      type: 'checkbox',
      templateOptions: {
        label: 'Do you want to make this section visible to the reader?'
      }
    },
    {
      key: 'vm.event.offerings',
      type: 'offerings'
    }
  ];
};

eventService.getFourthStep = function(vm) {
  return [
  {
    key: 'meta.enabled',
    className: "alert alert-warning",
    model: vm.event.organisation,
    type: 'checkbox',
    templateOptions: {
      label : "Would you like to enable organisational information?"
    }
  },
  {
    key: 'meta.ui_text_to_display',
    model: vm.event.organisation,
    type: 'input',
    templateOptions: {
      type: 'text',
      label : "Enter the text you would like to display to the end user"
    },
    hideExpression: watchCase
  },
  {
    key: 'meta.requireContactDetails',
    className: "alert alert-warning",
    model: vm.event.organisation,
    type: 'checkbox',
    templateOptions: {
      label : "Require contact details?"
    },
    hideExpression: watchCase
  },
  {
    key: 'meta.allowChooser',
    model: vm.event.organisation,
    className: "alert alert-warning",
    type: 'checkbox',
    templateOptions: {
      label : "Allow chooser?"
    },
    hideExpression: watchCase

  },
  {
    key: 'meta.allowCountyFilter',
    model: vm.event.organisation,
    className: "alert alert-warning",
    type: 'checkbox',
    templateOptions: {
      label : "Allow filtering by County?"
    },
    hideExpression: watchCase
  },
  {
    key: 'meta.sectorNo_text',
    model: vm.event.organisation,
    type: 'input',
    templateOptions: {
      type: 'text',
      label : "Enter the text you would like to display for the unique identifier"
    },
    hideExpression: watchCase
  },
  {
    key: "meta.template",
    model: vm.event.organisation,
    className: "alert alert-warning",
    type: "radio",
    templateOptions: {
      "label": "Which template would you like to use?",
      "options": [
        {
          "name": "Minimal",
          "value": "organisation_minimum"
        },
        {
          "name": "Maximum",
          "value": "organisation_maximum"
        }
      ]
    }
  }

  ];
};

eventService.getFifthStep = function(vm) {
  return [
  {
    key: 'maxNo',
    model: vm.event.attendees_meta,
    type: 'input',
    className: "alert alert-warning",
    templateOptions: {
      label: 'Set maximum number of attendees!',
      type: 'number',
      "max": 100,
      "min": 1
    }
  },
  {
    key: 'request_lunch',
    model: vm.event.attendees_meta,
    type: 'checkbox',
    className: "alert alert-warning",
    templateOptions: {
      label: 'Should lunch be made available?'
    }
  },
  {
    key: 'request_position',
    model: vm.event.attendees_meta,
    type: 'checkbox',
    className: "alert alert-warning",
    templateOptions: {
      label: 'Enable attendee positions?',
    }
  },
  {
    key: 'positions',
    model: vm.event.attendees_meta,
    type: 'attendee',
    hideExpression: function() {
     return !(vm.event.attendees_meta.request_position);
    }
  },
  ];
};


eventService.getSixthStep = function(vm) {
  return [

  {
    className: 'col-sm-6',
    key: 'panel_hover_css',
    model: vm.event.template_meta,
    name: 'Nothing selected',
    type: 'another',
    templateOptions: {
      label : "Colour change on hover over panel",
      "options" : formBuilder.hoverCssOptions()
    }
  }
  ,
  {
    className: 'col-sm-6',
    key: 'attendee_edit_hover_css',
    model: vm.event.template_meta,
    name: 'Nothing selected',
    type: 'another',
    templateOptions: {
      label : "Colour change on hover over attendee section",
      "options" : formBuilder.hoverCssOptions()
    }
  },
  {
    className: 'row',
    name: 'Nothing selected',
    type: 'templateMeta'
  }

  ];
};


return eventService;


  });
