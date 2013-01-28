var FED = FED || {};


FED.hidePage = function(){
    $("#page").removeClass("loaded");
    $("#spinner").addClass("loading")
}

FED.showPage = function(){
    $("#page").addClass("loaded");
    $("#wrapper .loader").remove();
    $("#spinner").removeClass("loading")
}

FED.hideNav = function(){
    $("html").removeClass("show-nav")
}


$(".nav-btn").bind('click', function () {
    $("html").toggleClass("show-nav")
});


$("#navigatie a").bind('click', function () {
    FED.hideNav();
});



