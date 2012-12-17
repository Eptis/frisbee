// Game view
FED.GameView = Backbone.View.extend({
  el: $("#sets"),

  initialize: function (){
    this.collection = new FED.Game(FED.gameData);
    this.render(this.collection.models);
    // console.log("init Game view");
  },

  render: function (data){
    var that = this;
    that.renderGame(data);
    _.each(data, function (set) {
      that.renderSet(set);
    }, this);
  },

  renderGame: function (game) {
    var team1game = game[0].attributes.team1;
    var team2game = game[0].attributes.team2;
    var team1SetsWon = 0;
    var team2SetsWon = 0;

    _.each(game, function (set) {
      if (set.attributes.team1Score > set.attributes.team2Score){
        team1SetsWon++;
      }else if(set.attributes.team1Score < set.attributes.team2Score){
        team2SetsWon++;
      }else if(set.attributes.team1Score == set.attributes.team2Score){
        team1SetsWon++;
        team2SetsWon++;
      }
    });

    var result = "";
    result +="<tr>";
    if(team1SetsWon > team2SetsWon){
      result +="<td class='winner'>" + team1game + "</td>";
    }else{
      result +="<td>" + team1game + "</td>";
    }
    result +="<td>" + team1SetsWon + " - " + team2SetsWon + "</td>";
    if(team1SetsWon < team2SetsWon){
      result +="<td class='winner'>" + team2game + "</td>";
    }else{
      result +="<td>" + team2game + "</td>";
    }
    result +="</tr>";
    $("#game").append(result);
  },

  renderSet: function (set) {
    var setView = new FED.SetView({
      model: set
    });
    this.$el.append(setView.render().el);
  }

});
// console.log("game/sets view has loaded!");
var game_view = new FED.GameView();
