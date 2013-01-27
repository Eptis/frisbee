var FED = FED || {};


FED.hidePage = function(){
    $("#wrapper").prepend('<div class="loader"><div class="ball-arc2nd"><div class="point2nd"></div></div><div class="ball-arc3nd"><div class="point3nd"></div></div><div class="ball-arc4nd"><div class="point4nd"></div></div></div>')
}

FED.showPage = function(){
    $("#page").addClass("loaded");
    $("#wrapper .loader").remove();
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



