(function() {
  'use strict';
  angular
    .module('app')
    .directive('uiNav', ['$timeout', function($timeout) {
      return{
        restrict: 'AC',
        link : function link(scope, el, attr) {

          $timeout(function() {
            el.find('a').bind('click', function(e) {
              var li = angular.element(this).parent();
              var active = li.parent()[0].querySelectorAll('.active');
              li.toggleClass('active');
              angular.element(active).removeClass('active');
            });
          }, 0)

        }
      }
    }]);



    // function uiNav() {
    //   var directive = {
    //     restrict: 'AC',
    //     link: link
    //   };
    //   return directive;
    // }
    // function link(scope, el, attr) {
    //   el.find('a').bind('click', function(e) {
    //     alert(11)
    //     var li = angular.element(this).parent();
    //     var active = li.parent()[0].querySelectorAll('.active');
    //     li.toggleClass('active');
    //     angular.element(active).removeClass('active');
    //   });
    // }
})();
