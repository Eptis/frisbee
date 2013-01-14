// define individual Set view
FED.resultView = Backbone.View.extend({
  tagName: "li",
  
  // Render view
  render: function (data) {
    // console.log("render resultView");
    console.log(data);

// new code
    // variables
    var games = [];
    var results = [];

    // check if there is data
    if(data != 0){
      _.each(data, function (set){
        // check each set and push team1 and team2 to games
        var singlegame = set.team1.toLowerCase().replace(/\s+/g, '') + set.team2.toLowerCase().replace(/\s+/g, '');
        games.push(singlegame);
      });
      
       // check for unique games
      var games = _.uniq(games);

      // just checking
      // console.log(games);

      _.each(data, function (item){
        // creating game names
        var singleitem = item.team1.toLowerCase().replace(/\s+/g, '') + item.team2.toLowerCase().replace(/\s+/g, '');
        
        var index = _.indexOf(games, singleitem);

        console.log(index);

        if(results.length == 0){
          results.push({game: index, team1: item.team1, team2: item.team2, team1score: 0, team2score: 0});
        }else if(results.length != 0){

         _.each(results, function (result){
            if(result.game == index){
              console.log("it's the same");
            }else{
              console.log("it's not the same");
              results.push({game: index, team1: item.team1, team2: item.team2, team1score: 0, team2score: 0});
            }
          });


        }
        
      });


      console.log(results);
      
      return "<li><span>team1</span><span class='result'>0 - 0</span><span>team2</span></li>";
    }else{
      return "<li><span>undefined</span><span class='result'>0 - 0</span><span>undefined</span></li>";  
    }

// old code
/*
    // check if there is data
    if(data != 0){
      // create array
      var games = [];

      // loop through data
      _.each(data, function (set){
        // check each set and push team1 and team2 to games
        var game = set.team1.toLowerCase() + set.team2.toLowerCase();
        games.push(game);
      });

      // check for unique games
      var uniqGames = _.uniq(games);
      
      // create result array
      var results = [];

      // loop again to compare
      _.each(data, function (set){
        // create games again
        var game = set.team1.toLowerCase() + set.team2.toLowerCase();
        // index van de set
        var indexSet = _.indexOf(uniqGames, game);

        // check if indexSet and results isn't empty
        if (indexSet != -1 && results.length === 0){
          // create var
          var score1;
          var score2;

          // check who has won
          if(set.team1Score > set.team2Score){
            score1 = 1;
            score2 = 0;
          }else if(set.team1Score < set.team2Score){
            score1 = 0;
            score2 = 1;
          }else if(set.team1Score < set.team2Score){
            score1 = 0;
            score2 = 0;
          }

          console.log("pushing 1");
          // push first result into results
          results.push({game: indexSet, team1: set.team1, team2: set.team2, team1score: score1, team2score: score2});
          

        }else if(indexSet != -1 && results.length != 0){
          // loop through results
          _.each(results, function (result){
            // check if the same game already exists in results
            if (result.game === indexSet){
              // check who has won
              if(set.team1Score > set.team2Score){
                result.team1score += 1;
              }else if(set.team1Score < set.team2Score){
                result.team2score += 1;
              }
              console.log("changing 1");

            }else{
              // create new game in results
              var score1;
              var score2;

              // check who has won
              if(set.team1Score > set.team2Score){
                score1 = 1;
                score2 = 0;
              }else if(set.team1Score < set.team2Score){
                score1 = 0;
                score2 = 1;
              }else if(set.team1Score < set.team2Score){
                score1 = 0;
                score2 = 0;
              }

              console.log("pushing 2");
              // push first into results
              results.push({game: indexSet, team1: set.team1, team2: set.team2, team1score: score1, team2score: score2});
            }
          });

        };
      });
      
      // test results
      console.log(results);


      var resultsHTML = "";
      _.each(results, function (result){
        resultsHTML += "<li>"
        if(result.team1score > result.team2score){ resultsHTML += "<span>"+result.team1+"<i class='icon-star icon-white'></i></span>" }else{ resultsHTML += "<span>"+result.team1+"</span>" }
        resultsHTML += "<span class='result'>"+result.team1score+" - "+result.team2score+"</span>"
        if(result.team1score < result.team2score){ resultsHTML += "<span>"+result.team2+"<i class='icon-star icon-white'></i></span>" }else{ resultsHTML += "<span>"+result.team2+"</span>" }
        resultsHTML += "</li>";
      });

      return resultsHTML;

    }else{
      return "<li><span>undefined</span><span class='result'>0 - 0</span><span>undefined</span></li>";  
    }

*/    
  }
});