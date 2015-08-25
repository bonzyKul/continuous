'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$http', '$modal','$rootScope',
	function($scope, Authentication, $http, $modal, $rootScope) {
		// This provides Authentication context.
		$scope.authentication = Authentication;



        $scope.card = {};

        $scope.columnWidth = function() {
            return Math.floor((100 / $scope.columns.length) * 100) / 100;
        };

        $scope.updateCard = function(column, card) {

            var modalInstance = $modal.open({
                templateUrl: '/modules/core/views/card-details.client.view.html',
                controller: modalController,
                size: 'lg',
                resolve: {
                    items: function() {
                        return angular.copy({
                            title: card.title,
                            Details: card.details,
                            release: card.release,
                            cardColor: card.ragStatus,
                            column: column,
                            architect: card.architect,
                            analyst: card.Analyst,
                            designer: card.designer,
                            buildCell: card.buildCell
                        });
                    }
                }
            });

            modalInstance.result.then(function(result) {
                console.log(result.title);

                angular.forEach($scope.columns, function(col) {
                   if(col.name === column.name) {
                       angular.forEach(col.cards, function(cd) {
                          if (cd.title === card.title) {
                              if (col.name === 'Backlog') {
                                  cd.details = result.Details;
                              } else {
                                  cd.details = result.Details;
                                  if (result.cardColor) {
                                      cd.ragStatus = '#' + result.cardColor;
                                  } else {
                                      cd.ragStatus = '#5CB85C';
                                  }
                                  cd.release = result.release;
                                  cd.architect = result.architect;
                                  cd.designer = result.designer;
                                  cd.Analyst = result.analyst;
                                  cd.buildCell = result.buildCell
                              }

                          }
                       });
                   }
                });


                console.log('modal closed');
            }, function() {
                console.log('modal dismissed');
            });

            //setTimeout(function() {
            //    $scope.$apply(function(){
            //        console.log('broadcasting event');
            //        $rootScope.$broadcast('OpenCardDetails', column, card);
            //    });
            //}, 500);
        };

        var modalController = function($scope, $modalInstance, items) {

            $scope.colorOptions = ['5CB85C','FFEB13','FF0000'];

            console.log(items.column.name);

            $scope.card = items;

            $scope.ok = function () {
                //events();
                $modalInstance.close($scope.card);
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };

        $scope.$on('OpenCardDetails', function(e, column,card) {
            console.log('in broadcast event');
            console.log(column.name);
            $scope.card = card;
        });


        $scope.columns = [
            {'name': 'Backlog',cards: [{'id': '1', 'title': 'item1', 'drag':true, 'release':"",'ragStatus':'#5cb85c', 'details':"",'architect':"", 'Analyst':"",'designer':"",'buildCell':""},
                {'id': '2','title': 'item2', 'drag':true, 'release':"",'ragStatus':'#5cb85c', 'details':"",'architect':"", 'Analyst':"",'designer':"",'buildCell':""},
                {'id': '3','title': 'item3', 'drag':true, 'release':"",'ragStatus':'#ffeb13', 'details':"",'architect':"", 'Analyst':"",'designer':"",'buildCell':""},
                {'id': '4','title': 'item4', 'drag':true, 'release':"",'ragStatus':'#5cb85c', 'details':"",'architect':"", 'Analyst':"",'designer':"",'buildCell':""},
                {'id': '5','title': 'item5', 'drag':true, 'release':"",'ragStatus':'#ff0000', 'details':"",'architect':"", 'Analyst':"",'designer':"",'buildCell':""},
                {'id': '6','title': 'item6', 'drag':true, 'release':"",'ragStatus':'#5cb85c', 'details':"",'architect':"", 'Analyst':"",'designer':"",'buildCell':""}], 'hideCol':false},
            {'name': 'Discovery',cards: [], 'hideCol':false},
            {'name': 'Design',cards: [], 'hideCol':false},
            {'name': 'Build',cards: [], 'hideCol':false},
            {'name': 'Pilot',cards: [], 'hideCol':false}
        ];


        $scope.hiddenCol = function(column) {
            angular.forEach($scope.columns, function(col) {
                if(col.name === column.name) {
                    if(column.hideCol === true) {
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
                var releaseVar = '';
                var columnName = event.dest.sortableScope.$parent.column.name;
                if (columnName === 'Backlog') {
                    releaseVar = '';
                } else {
                    //releaseVar = prompt('Enter Release Info !');
                }
                angular.forEach($scope.columns, function(col) {
                    if (col.name === columnName) {
                        angular.forEach(col.cards, function(card) {
                            if (card.title === event.source.itemScope.modelValue.title) {
                                if (releaseVar === ' ' || releaseVar.length === 0) {
                                    releaseVar = 'Rel';
                                }
                                card.release = releaseVar;
                            }
                        });
                    }
                });
            }
        };
	}
]);
