var FED = FED || {};


// Set data
FED.gameData = [
    { set: 1, team1: "Boomsquad", team1Score: 4, team2: "Burning Snow", team2Score: 1 },
    { set: 2, team1: "Boomsquad", team1Score: 3, team2: "Burning Snow", team2Score: 4 },
    { set: 3, team1: "Boomsquad", team1Score: 0, team2: "Burning Snow", team2Score: 4 },
    { set: 4, team1: "Boomsquad", team1Score: 2, team2: "Burning Snow", team2Score: 3 },
  { set: 5, team1: "Boomsquad", team1Score: 4, team2: "Burning Snow", team2Score: 3 }
];

FED.matchesData = [
    { date: "Monday, 9:00am", team1: "Chasing", team1Score: "3", team2: "Amsterdam Money Gang", team2Score: "1"},
        { date: "Monday, 9:00am", team1: "Boomsquad", team1Score: "3", team2: "Beast Amsterdam", team2Score: "0"},
        { date: "Monday, 10:00am", team1: "Beast Amsterdam", team1Score: "3", team2: "Amsterdam Money Gang", team2Score: "0"},
        { date: "Monday, 10:00am", team1: "Chasing", team1Score: "3", team2: "Burning Snow", team2Score: "0"},
        { date: "Monday, 11:00am", team1: "Boomsquad", team1Score: "3", team2: "Amsterdam Money Gang", team2Score: "0"},
        { date: "Monday, 11:00am", team1: "Burning Snow", team1Score: "3", team2: "Beast Amsterdam", team2Score: "0"},
        { date: "Monday, 12:00pm", team1: "Chasing", team1Score: "3", team2: "Beast Amsterdam", team2Score: "0"},
        { date: "Monday, 12:00pm", team1: "Boomsquad", team1Score: "3", team2: "Burning Snow", team2Score: "0"},
        { date: "Monday, 1:00pm", team1: "Chasing", team1Score: "3", team2: "Boomsquad", team2Score: "0"},
        { date: "Monday, 1:00pm", team1: "Burning Snow", team1Score: "3", team2: "Amsterdam Money Gang", team2Score: "0"}
];



// # Pool data #
FED.poolData = [
{ team: "Chasing", Win: "2", Lost: "2", Sw: "7", Sl: "9", Pw: "35", Pl: "39"},
{ team: "Boomsquad", Win: "2", Lost: "2", Sw: "9", Sl: "8", Pw: "36", Pl: "34"},
{ team: "Burning Snow", Win: "3", Lost: "1", Sw: "11", Sl: "4", Pw: "36", Pl: "23"},
{ team: "Beast Amsterdam", Win: "2", Lost: "2", Sw: "6", Sl: "8", Pw: "30", Pl: "34"},
{ team: "Amsterdam Money Gang", Win: "1", Lost: "3", Sw: "6", Sl: "10", Pw: "30", Pl: "37"}
];

FED.hidePage = function(){
    $("#wrapper").append("<div id='loader'>loading</div>")
}

FED.showPage = function(){
    $("#page").addClass("loaded")
    $("#loader").remove();
}

FED.showNav = function(){
    $("html").toggleClass("show-nav")
}

FED.hideNav = function(){
    $("html").removeClass("show-nav")
}

$(".nav-btn").bind('click', function () {
    FED.showNav();
});


$("#nav a").bind('click', function () {
    FED.hideNav();
});