// # Define match model #
var FED = FED || {}

FED.MatchModel = Backbone.Model.extend({
  defaults: {
    "date": "unknown",
    "team1": "unknown",
    "team2": "unknown",
    "team1Score": "unknown",
    "team2Score": "unknown"
  }
  // ,

  // url: FED.config.api + 'tournaments/' + FED.config.tournamentID + '/',

  // loadData: function(data){
  //   this.set(data)
  // },

  // initialize: function(){

  //   this.fetch({
  //     url: FED.config.api + FED.config.tournamentID + "/?callback=?",
  //     context: this,
  //     success: this.loadData,
  //     dataType: "json",
  //     headers: {
  //       Authorization: "bearer "+ FED.config.auth_token
  //     }
  //   });
  // }
});
