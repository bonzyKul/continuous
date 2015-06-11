'use strict';

angular.module('core').directive('colorSelector', [
	function() {
		return {
			//template: '/modules/core/views/color-selector.html',
			restrict: 'E',
            scope: { options: '=', model: '=ngModel', prefix: '@', showRadios: '=', showHexCode: '='},
            replace: true,
			link: function(scope) {
                if (scope.model === undefined || scope.model === ''){
                    scope.model = scope.options[0];
                }

                scope.selectColor = function(color){
                    console.log(color);
                    scope.model = color;
                };


			}
		};
	}
]);
