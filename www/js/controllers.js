angular.module('pointkeeper.controllers', [])

.controller('AppCtrl', function($scope, Modal, Game, ActionSheet) {
 
  mixpanel.track("Loaded App");

  $scope.players = Game.defaultPlayers();
  $scope.newplayer = Game.newPlayer();
  $scope.subHeaderText = Game.startText;

  $scope.addNewPlayerBlock = function() {
    $scope.players.push({
      name: undefined
      , score: 0
      , configured: false
    });
    mixpanel.track("Added New Player");
  }

  $scope.configurePlayer = function(player) {
    if (player.name) {
      player.configured = true;
      angular.forEach(document.getElementsByClassName("player-input"), function(input){
        input.blur();
      });
    }
    mixpanel.track("Configured Player");
  }

  $scope.newGame = function() {

    mixpanel.track("Clicked New Game");

    var makeNewGame = function() {
      $scope.subHeaderText = Game.startText;
      $scope.players = Game.defaultPlayers();
      if (!$scope.$$phase) $scope.$apply();
      mixpanel.track("Started New Game");
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

    mixpanel.track("Clicked Reset Game");

    var resetGame = function() {
      angular.forEach($scope.players, function(player){
        player.score = 0;
      });
      if (!$scope.$$phase) $scope.$apply();
      mixpanel.track("Reset Game");
    }

    if (navigator.notification) {

      navigator.notification.confirm(
        'Set all current scores to zero?', 
        function(buttonIndex) {
          if (buttonIndex == 2) {
            resetGame();
          }
        },            
        'Reset Game',           
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
    mixpanel.track("Opened " + $scope.modifyText + " Score");
    $scope.modifyScoreModal.show();
  };

  $scope.closeModifyScoreModal = function() {
    mixpanel.track("Closed Modify Score");
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

      mixpanel.track("Modified Score");

      $scope.closeModifyScoreModal();

      if ($scope.operator == "minus") $scope.playerToModifyScore.score -= parseInt($scope.modify.score);
      else if ($scope.operator == "plus") $scope.playerToModifyScore.score += parseInt($scope.modify.score);

    }

  }

  $scope.clickedPlayer = function(player) {

    mixpanel.track("Clicked Remove Player");

    // Show the action sheet
    ActionSheet.show({

      // The text of the red destructive button
      destructiveText: 'Remove',

      // The title text at the top
      titleText: 'Remove ' + player.name + ' from the game?',

      // The text of the cancel button
      cancelText: 'Cancel',

      // Called when the sheet is cancelled, either from triggering the
      // cancel button, or tapping the backdrop, or using escape on the keyboard
      cancel: function() {
        mixpanel.track("Cancelled Remove Player");
      },

      // Called when the destructive button is clicked. Return true to close the
      // action sheet. False to keep it open
      destructiveButtonClicked: function() {
        mixpanel.track("Removed Player");
        $scope.players.splice($scope.players.indexOf(player), 1);     
        return true;
      }
    });

  }

})

;
