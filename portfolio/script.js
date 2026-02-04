document.addEventListener("DOMContentLoaded", function() {

    var symb_menu = document.getElementById("symbole");
    var menu = document.getElementById("menu");
    var btnmode = document.getElementById("btnmode");

    var styleLight = document.getElementById("light");
    var styleDark = document.getElementById("dark");

    var conteneur = document.getElementById('conteneur-projet');
    var btnSuiv = document.querySelector('.suiv');
    var btnPrec = document.querySelector('.prec');

    let index = 0;
    var projets = document.querySelectorAll('.proj');
    
    function getProjectWidth() {
        var proj = projets[0];
        var style = window.getComputedStyle(proj);
        var marginLeft = parseInt(style.marginLeft);
        var marginRight = parseInt(style.marginRight);
        return proj.offsetWidth + marginLeft + marginRight;
    }
    
    var projectWidth = getProjectWidth();

    var bac = document.getElementById("bac");
    var dipBac = document.getElementById("diplome-bac");
    var lycee = document.getElementById("lycee");
    var divLycee = document.getElementById("div-lycee");
    var fac = document.getElementById("fac");
    var divFac = document.getElementById("div-fac");


    bac.addEventListener('mouseover', function(){
        dipBac.style.display = "block";
    });

    bac.addEventListener('mouseleave', function(){
        dipBac.style.display = "none";
    });

    lycee.addEventListener('mouseover', function(){
        divLycee.style.display = "flex";
    });

    fac.addEventListener('mouseleave', function(){
        divFac.style.display = "none";
    });

    fac.addEventListener('mouseover', function(){
        divFac.style.display = "flex";
    });

    lycee.addEventListener('mouseleave', function(){
        divLycee.style.display = "none";
    });

    btnSuiv.addEventListener('click', function() {
        if (index < projets.length - 1){index++;}
        projectWidth = getProjectWidth();
        conteneur.style.transform = `translateX(-${index * projectWidth}px)`;
    });

    btnPrec.addEventListener('click', function() {
        if (index > 0){index--;}
        projectWidth = getProjectWidth();
        conteneur.style.transform = `translateX(-${index * projectWidth}px)`;
    });

    symb_menu.addEventListener("click", function() {
        if(symb_menu.textContent == "☰") {
            menu.style.display = "block";
            symb_menu.textContent = "×";
        } else {
            menu.style.display = "none";
            symb_menu.textContent = "☰";
        }
    });

    btnmode.addEventListener('click',function(){
        document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
        styleDark.disabled = !styleDark.disabled;
        styleLight.disabled = !styleLight.disabled;

    });

});
