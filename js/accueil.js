document.addEventListener("DOMContentLoaded", function() {

    // --- CARROUSEL ---
    var conteneur = document.getElementById('conteneur-projet');
    var btnSuiv = document.querySelector('.suiv');
    var btnPrec = document.querySelector('.prec');
    var projets = document.querySelectorAll('.proj');

    if (conteneur && btnSuiv && btnPrec && projets.length > 0) {
        let index = 0;

        function getProjectWidth() {
            var proj = projets[0];
            var style = window.getComputedStyle(proj);
            var marginLeft = parseInt(style.marginLeft);
            var marginRight = parseInt(style.marginRight);
            return proj.offsetWidth + marginLeft + marginRight;
        }

        btnSuiv.addEventListener('click', function() {
            if (index < projets.length - 1) { index++; }
            var projectWidth = getProjectWidth();
            conteneur.style.transform = `translateX(-${index * projectWidth}px)`;
        });

        btnPrec.addEventListener('click', function() {
            if (index > 0) { index--; }
            var projectWidth = getProjectWidth();
            conteneur.style.transform = `translateX(-${index * projectWidth}px)`;
        });
    }

    // --- AFFICHAGE FORMATIONS & DIPLÔMES ---
    var bac = document.getElementById("bac");
    var dipBac = document.getElementById("diplome-bac");
    var lycee = document.getElementById("lycee");
    var divLycee = document.getElementById("div-lycee");
    var fac = document.getElementById("fac");
    var divFac = document.getElementById("div-fac");

    if (bac && dipBac) {
        bac.addEventListener('mouseover', function() { dipBac.style.display = "block"; });
        bac.addEventListener('mouseleave', function() { dipBac.style.display = "none"; });
    }

    if (lycee && divLycee) {
        lycee.addEventListener('mouseover', function() { divLycee.style.display = "flex"; });
        lycee.addEventListener('mouseleave', function() { divLycee.style.display = "none"; });
    }

    if (fac && divFac) {
        fac.addEventListener('mouseover', function() { divFac.style.display = "flex"; });
        fac.addEventListener('mouseleave', function() { divFac.style.display = "none"; });
    }

});