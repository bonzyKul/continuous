'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$http', '$modal',
	function($scope, Authentication, $http, $modal) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

        $scope.colorOptions = ['5cb85c','ffeb13','ff0000'];

        $scope.event = {'title':'','details':'','release':'','cardColor':''};

        $scope.columnWidth = function() {
            return Math.floor((100 / $scope.columns.length) * 100) / 100;
        };

        $scope.updateCard = function(column, card) {
                $scope.opts = {
                    backdrop: true,
                    backdropClick: true,
                    dialogFade: false,
                    keyboard: true,
                    headerText: 'Update Card',
                    templateUrl : '/modules/core/views/card-details.client.view.html',
                    controller : ModalInstanceCtrl,
                    scope: $scope,
                    resolve: {
                        items: function() {
                            return angular.copy({
                                title: card.title,
                                Details: card.details,
                                Release: card.release,
                                cardColor: card.ragStatus
                            });
                        }
                    } // empty storage
                };

                var modalInstance = $modal.open($scope.opts);

                modalInstance.result.then(function(result){
                    //if(result.deleteEvent === 'Y'){
                    //    //console.log('delete pressed');
                    //    var eventsdatumId = event.id;
                    //
                    //    $http.delete('/eventsData/' + eventsdatumId).success(function(status){
                    //        //console.log(eventsdatumId);
                    //        $('#calendar').fullCalendar('removeEvents',eventsdatumId);
                    //    }).error(function(errorResponse) {
                    //        console.log(errorResponse);
                    //    });
                    //} else {
                        card.title = result.title;
                        //card.details = result.details;
                        card.release = result.release;
                        card.ragStatus = result.cardColor;

                        angular.forEach($scope.columns, function(col) {
                           if (col.name === column.name) {
                               angular.forEach(col.cards, function(cd) {
                                  if (cd.title === card.title) {
                                      //cd.details = card.details;
                                      cd.release = card.release;
                                      cd.ragStatus = card.ragStatus;
                                  }
                               });
                           }
                        });
                        //var deployment = result.deployment;
                        //if(deployment) {
                        //    event.color = '#085c1b';
                        //}
                        //var eventsdatumId = event.id;
                        //var eventsdatum = {
                        //    name: event.title,
                        //    startDate: event.start,
                        //    endDate: event.end,
                        //    color: event.color,
                        //    deployment: deployment
                        //};
                        //$http.put('/eventsdata/' + eventsdatumId, eventsdatum).success(function(status) {
                        //    if(status) {
                        //        $('#calendar').fullCalendar('updateEvent',event,true);
                        //    }
                        //}).error(function(errorResponse){
                        //    console.log(errorResponse);
                        //});
                    //}
                },function(){
                    //on cancel button press
                });
        };

        var ModalInstanceCtrl = function($scope, $modalInstance, items) {

            $scope.event = items;


            $scope.ok = function () {
                $modalInstance.close($scope.event);
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

            //$scope.delete = function() {
            //    $scope.event.deleteEvent = 'Y';
            //    $modalInstance.close($scope.event);
            //}
        };


        //$scope.initFunc = function() {
        //    console.log('init function called');
        //
        //    var panelCol = $('.panel-body');
        //    panelCol.css('max-height', (window.innerHeight - 300) + 'px');
        //
        //   panelCol.hover(function(){
        //        $(this).find('.panel-footer').slideDown(250);
        //    },function(){
        //        $(this).find('.panel-footer').slideUp(250); //.fadeOut(205)
        //    });
        //};

        $scope.columns = [
            {'name': 'Backlog',cards: [{'title': 'item1', 'drag':true, 'release':"",'ragStatus':'#5cb85c'},
                {'title': 'item2', 'drag':true, 'release':"",'ragStatus':'#5cb85c'},
                {'title': 'item3', 'drag':true, 'release':"",'ragStatus':'#ffeb13'},
                {'title': 'item4', 'drag':true, 'release':"",'ragStatus':'#5cb85c'},
                {'title': 'item5', 'drag':true, 'release':"",'ragStatus':'#ff0000'},
                {'title': 'item6', 'drag':true, 'release':"",'ragStatus':'#5cb85c'}], 'hideCol':false},
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
                var releaseVar = "";
                var columnName = event.dest.sortableScope.$parent.column.name;
                if (columnName === 'Backlog') {
                    releaseVar = "";
                } else {
                    releaseVar = prompt('Enter Release Info !');
                    if (releaseVar === "") {
                      releaseVar = "Rel";
                    }
                }
                angular.forEach($scope.columns, function(col) {
                    if (col.name === columnName) {
                        angular.forEach(col.cards, function(card) {
                            if (card.title === event.source.itemScope.modelValue.title) {
                                card.release = releaseVar;
                            }
                        });
                    }
                });
            }
        };
	}
]);
