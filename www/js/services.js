angular.module('pointkeeper.services', [])

.service("Game", function (){

  this.defaultPlayers = function() {

    var players = [];
    // players.push({
    //   name: "Player 1"
    //   , score: 0
    // });
    // players.push({
    //   name: "Player 2"
    //   , score: 0
    // })

    return players;
    
  };

  this.newPlayer = function() {
    var player = {};
    player.name = "";
    player.score = 0;
    return player;
  };

  this.startText = "No players";

});
