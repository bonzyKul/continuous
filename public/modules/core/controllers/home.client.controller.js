'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

        $scope.columnWidth = function() {
            return Math.floor((100 / 5) * 100) / 100;
        };




        $scope.columns = [
            {'name': 'Backlog',cards: [{'title': 'item1', 'drag':true},
                {'title': 'item2', 'drag':true},
                {'title': 'item3', 'drag':true},
                {'title': 'item4', 'drag':true},
                {'title': 'item5', 'drag':true},
                {'title': 'item6', 'drag':true}]},
            {'name': 'Discovery',cards: []},
            {'name': 'Design',cards: []},
            {'name': 'Build',cards: []},
            {'name': 'Pilot',cards: []}
        ];

        $scope.addCard = function(column) {
            angular.forEach($scope.columns, function(col){
               if(col.name === column.name) {
                   column.cards.push({'title': 'item8','drag':true});
               }
            });
        };

        $scope.list1 = [
            {'title': 'item1', 'drag':true},
            {'title': 'item2', 'drag':true},
            {'title': 'item3', 'drag':true},
            {'title': 'item4', 'drag':true},
            {'title': 'item5', 'drag':true},
            {'title': 'item6', 'drag':true}
        ];

        $scope.list2 = [];

        $scope.sortableOptions = {
            //containment: '#sortable-container1'
        };

        $scope.sortableOptions1 = {
            //containment: '#sortable-container2'
        };

        $scope.dragControlListeners = {
            itemMoved: function (event) {console.log(event.source.itemScope.modelValue.title);

            }
        };
	}
]);
