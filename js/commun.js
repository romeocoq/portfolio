document.addEventListener("DOMContentLoaded", function() {

    var symb_menu = document.getElementById("symbole");
    var menu = document.getElementById("menu");
    var btnmode = document.getElementById("btnmode");

    var styleLight = document.getElementById("light");
    var styleDark = document.getElementById("dark");

    // Gestion de l'ouverture/fermeture du menu mobile
    if (symb_menu && menu) {
        symb_menu.addEventListener("click", function() {
            if (symb_menu.textContent === "☰") {
                menu.style.display = "block";
                symb_menu.textContent = "×";
            } else {
                menu.style.display = "none";
                symb_menu.textContent = "☰";
            }
        });
    }

    // Gestion du basculement Mode Sombre / Mode Clair
    if (btnmode && styleDark && styleLight) {
        btnmode.addEventListener('click', function() {
            document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
            styleDark.disabled = !styleDark.disabled;
            styleLight.disabled = !styleLight.disabled;
        });
    }

});