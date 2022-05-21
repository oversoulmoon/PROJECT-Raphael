document.getElementById("navicon").addEventListener("click", function(e){
    var navbar = document.getElementById("menu");
    navbar.style.display = "block";
    navbar.style.transform += "translateX(-150px)";
    document.addEventListener("click", exitListiner);
})
function exitListiner(evt){
    if(evt.target.tagName != "UL" && evt.target.id != "navicon" && evt.target.tagName != "LI"){
        document.getElementById("menu").style.transform += "translateX(150px)";
        document.removeEventListener("click", exitListiner);
    }
}