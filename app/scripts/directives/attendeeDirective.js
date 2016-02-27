'use strict';
angular.module('CMS')

.directive('attendeePosition', attendeePosition);
/**
 * Function returns a directive which manages positions in the Attendee section
 * @return {obj} - The directive object with a referenced template and scope link
 */
function attendeePosition() {
    var directive = {
        restrict: 'EA',
        templateUrl: 'partials/directivePartials/attendeeSection.tpl.html',
        link: link
    };

    return directive;
}
/**
 * Directive link function
 *
 */
function link(scope, element, attrs) {

  /*
   * Remove a position from the table
   * Reset other positions id
   */
  scope.removePosition = function(id) {
    for(var i = 0 ; i < scope.model.positions.length; i++) {
        if(scope.model.positions[i].id === id) {
           scope.model.positions.splice(i,1);
           break;
        }
    }
    for(i = 0 ; i < scope.model.positions.length; i++) {
      scope.model.positions[i].id = i + 1;
    }
  };
  /*
   * Add position
   * Create object and ush it to the data structure
   */
  scope.addPosition = function() {
    scope.position.value
    var position = {
      id: scope.model.positions.length + 1,
      name: scope.position.value
    }
    scope.model.positions.push(position);
  };
}
