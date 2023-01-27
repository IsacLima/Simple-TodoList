document.getElementsByClassName("nav__img")[0].addEventListener("click", function(event){ openTt()});

document.getElementsByClassName("cancel")[0].addEventListener("click", function(event){ closeTt()});


function openTt(){
    document.getElementsByClassName("empty")[0].style.display = "none"
    document.getElementsByClassName("floatbox")[0].style.display = "flex"
    document.getElementsByClassName("nav")[0].style.display = "none"
}

function closeTt(){
    document.getElementsByClassName("empty")[0].style.display = "flex"
    document.getElementsByClassName("floatbox")[0].style.display = "none"
    document.getElementsByClassName("nav")[0].style.display = "flex"
    
}