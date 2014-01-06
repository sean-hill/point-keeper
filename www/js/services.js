angular.module('pointkeeper.services', [])

.service("Players", function (){

  this.defaults = function() {

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

  this.new = function() {
    var player = {};
    player.name = "";
    player.score = 0;
    return player;
  };

});
