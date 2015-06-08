'use strict';

angular.module('core').directive('colorSelector', function(){
    return {
        restrict: 'E',
        scope: { options: '=', model: '=ngModel', prefix: '@', showRadios: '=', showHexCode: '='},
        require: 'ngModel',
        template: '/modules/core/views/color-selector.html',
        link: function(scope) {
            if (scope.model === undefined || scope.model === ''){
                scope.model = scope.options[0];
            }

            scope.selectColor = function(color){
                scope.model = color;
            };
        }
    };
});
