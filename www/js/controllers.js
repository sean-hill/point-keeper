angular.module('pointkeeper.controllers', [])

.controller('AppCtrl', function($scope, Modal, Players) {
 
  $scope.players = Players.defaults();
  $scope.newplayer = Players.new();

  Modal.fromTemplateUrl('new-player.html', function(modal) {
    $scope.newPlayerModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  $scope.openNewPlayerModal = function() {
    $scope.newPlayerModal.show();
  };

  $scope.closeNewPlayerModal = function() {
    $scope.newPlayerModal.hide();
  };

  $scope.addNewPlayer = function() {

    if ($scope.newplayer.name) {
      $scope.players.push($scope.newplayer);
      $scope.newplayer = Players.new();
      $scope.closeNewPlayerModal();
    }

  }

  $scope.newGame = function() {
    $scope.players = Players.defaults();
  }

  Modal.fromTemplateUrl('modify-score.html', function(modal) {
    modal.focusScore = function() {
      var input = this.el.querySelector('input, textarea');
      input && input.focus && input.focus();
    }
    $scope.modifyScoreModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  $scope.openModifyScoreModal = function() {
    $scope.modifyScoreModal.show();
    $scope.modifyScoreModal.focusScore();
  };

  $scope.closeModifyScoreModal = function() {
    $scope.modifyScoreModal.hide();
  };

  $scope.changeScore = function(player, operator) {

    $scope.playerToModifyScore = player;
    $scope.modify = {};
    $scope.operator = operator;

    if (operator == "minus") {
      $scope.modifyScoreTitle = "Subtract score";
    } else if (operator == "plus") {
      $scope.modifyScoreTitle = "Add score";
    }

    $scope.openModifyScoreModal();
  }

  $scope.modifyScore = function() {

    if ($scope.modify.score) {

      $scope.closeModifyScoreModal();

      if ($scope.operator == "minus") $scope.playerToModifyScore.score -= parseInt($scope.modify.score);
      else if ($scope.operator == "plus") $scope.playerToModifyScore.score += parseInt($scope.modify.score);

    }

  }

})

;
