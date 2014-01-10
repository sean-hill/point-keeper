angular.module('pointkeeper.controllers', [])

.controller('AppCtrl', function($scope, Modal, Game) {
 
  $scope.players = Game.defaultPlayers();
  $scope.newplayer = Game.newPlayer();
  $scope.subHeaderText = Game.startText;

  $scope.addNewPlayerBlock = function() {
    $scope.players.push({
      name: undefined
      , score: 0
      , configured: false
    });
  }

  $scope.configurePlayer = function(player) {
    if (player.name) player.configured = true;
  }

  $scope.newGame = function() {

    var makeNewGame = function() {
      $scope.subHeaderText = Game.startText;
      $scope.players = Game.defaultPlayers();
      if (!$scope.$$phase) $scope.$apply();
    }

    if (navigator.notification) {

      navigator.notification.confirm(
        'This will erase your current game and start another.', 
        function(buttonIndex) {
          if (buttonIndex == 2) {
            makeNewGame();
          }
        },            
        'New Game',           
        ['Cancel','Ok']        
      );

    } else {

      if (window.confirm("This will erase your current game and start another.")) {
        makeNewGame();
      }

    }
  }

  $scope.resetGame = function() {

    var resetGame = function() {
      angular.forEach($scope.players, function(player){
        player.score = 0;
      });
      if (!$scope.$$phase) $scope.$apply();
    }

    if (navigator.notification) {

      navigator.notification.confirm(
        'Set all current scores to zero?', 
        function(buttonIndex) {
          if (buttonIndex == 2) {
            resetGame();
          }
        },            
        'New Game',           
        ['No','Yes']        
      );

    } else {

      if (window.confirm('Set all current scores to zero?')) {
        resetGame();
      }

    }
  }

  Modal.fromTemplateUrl('modify-score.html', function(modal) {
    $scope.modifyScoreModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  $scope.openModifyScoreModal = function() {
    $scope.modifyScoreModal.show();
  };

  $scope.closeModifyScoreModal = function() {
    $scope.modifyScoreModal.hide();
  };

  $scope.changeScore = function(player, operator) {

    $scope.playerToModifyScore = player;
    $scope.modify = {};
    $scope.operator = operator;

    if (operator == "minus") {
      $scope.modifyText = "Subtract";
      $scope.modifyScoreTitle = $scope.modifyText + " points";
    } else if (operator == "plus") {
      $scope.modifyText = "Add";
      $scope.modifyScoreTitle =  $scope.modifyText + " points";
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
