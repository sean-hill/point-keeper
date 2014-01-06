angular.module('pointkeeper.controllers', [])

.controller('AppCtrl', function($scope, Modal, Game) {
 
  $scope.players = Game.defaultPlayers();
  $scope.newplayer = Game.newPlayer();
  $scope.subHeaderText = Game.startText;

  Modal.fromTemplateUrl('new-player.html', function(modal) {
    modal.focusScore = Game.focusInput;
    $scope.newPlayerModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  $scope.openNewPlayerModal = function() {
    $scope.newPlayerModal.show();
    $scope.newPlayerModal.focusScore();
  };

  $scope.closeNewPlayerModal = function() {
    $scope.newPlayerModal.hide();
  };

  $scope.addNewPlayer = function() {

    if ($scope.newplayer.name) {
      $scope.players.push($scope.newplayer);
      $scope.newplayer = Game.newPlayer();
      $scope.closeNewPlayerModal();
      $scope.subHeaderText = "Game Players";
    }

  }

  $scope.newGame = function() {
    $scope.subHeaderText = Game.startText;
    $scope.players = Game.defaultPlayers();
  }

  Modal.fromTemplateUrl('modify-score.html', function(modal) {
    modal.focusScore = Game.focusInput;
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
      $scope.modifyScoreTitle = "Subtract points";
    } else if (operator == "plus") {
      $scope.modifyScoreTitle = "Add points";
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
