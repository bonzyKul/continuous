'use strict';

angular.module('core').controller('UpdateCardDetailsController', ['$scope',
	function($scope, $modalInstance) {

        $scope.colorOptions = ['5CB85C','FFEB13','FF0000'];

        $scope.card = {};
        $scope.editTitle = false;

        $scope.editingDetails = false;
        $scope.editingTitle = false;

        $scope.cancel = function() {

        };

        $scope.update =  function(card) {
            console.log(card.title);
        };

        $scope.$on('OpenCardDetails', function(e, column,card) {
            console.log('in broadcasted event');
            console.log(column.name);
            $scope.card = card;

            $scope.editingDetails = false;
            $scope.editingTitle = false;

            $scope.showCardDetails = true;
        });
	}
]);
