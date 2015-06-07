'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

        $scope.columnWidth = function() {
            return Math.floor((100 / 5) * 100) / 100;
        };

        $scope.toggleMenu = function(e) {
            //e.preventDefault();
            $('#wrapper').toggleClass('active');
        };

        $scope.initFunc = function() {
            console.log('init function called');

            var panelCol = $('.panel-body');
            panelCol.css('max-height', (window.innerHeight - 300) + 'px');

           panelCol.hover(function(){
                $(this).find('.panel-footer').slideDown(250);
            },function(){
                $(this).find('.panel-footer').slideUp(250); //.fadeOut(205)
            });
        }

        $scope.release = "1506";

        $scope.columns = [
            {'name': 'Backlog',cards: [{'title': 'item1', 'drag':true},
                {'title': 'item2', 'drag':true},
                {'title': 'item3', 'drag':true},
                {'title': 'item4', 'drag':true},
                {'title': 'item5', 'drag':true},
                {'title': 'item6', 'drag':true}], 'hideCol':false},
            {'name': 'Discovery',cards: [], 'hideCol':false},
            {'name': 'Design',cards: [], 'hideCol':false},
            {'name': 'Build',cards: [], 'hideCol':false},
            {'name': 'Pilot',cards: [], 'hideCol':false}
        ];


        $scope.hiddenCol = function(column) {
            angular.forEach($scope.columns, function(col) {
                if(col.name === column.name) {
                    if(column.hideCol == true) {
                        column.hideCol = false;
                    } else {
                        column.hideCol = true;
                    }
                }
            });
        };


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

        $scope.removeCard = function(column, card) {
            angular.forEach($scope.columns, function(col) {
                if (col.name === column.name) {
                    col.cards.splice(col.cards.indexOf(card), 1);
                }
            });
        };


        $scope.dragControlListeners = {
            itemMoved: function (event) {
                //console.log(event.source.itemScope.modelValue.title);
                //console.log(event.source.index);
                //console.log(event.dest.sortableScope.$parent.column.name);
                var columnName = event.dest.sortableScope.$parent.column.name;
                if (columnName === 'Backlog') {
                    $scope.release = "";
                } else {
                    $scope.release = prompt('Enter Release Info !');
                    if ($scope.release === "") {
                      $scope.release = "Rel";
                    }
                }

            }
        };
	}
]);
