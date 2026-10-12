document.addEventListener("DOMContentLoaded", function() {

    function cleanUrl(){
        let currentUrl = window.location.href;

        if (currentUrl.includes(".html")) {
            currentUrl = currentUrl.replace(".html", "");
        }

        if(currentUrl.includes("index")){
            currentUrl = currentUrl.replace("index", "");
        }

        if(currentUrl.includes("#")){
            currentUrl = currentUrl.split("#")[0];
        }

        if (window.location.href !== currentUrl) {
            window.history.replaceState({}, document.title, currentUrl);
        }
    }

    function actualiserFond() {
        const hauteurFenetre = window.innerHeight;
        const progression = Math.min(window.scrollY / (hauteurFenetre*3), 1);
        const opacite = 1 - progression;
        document.body.style.setProperty("--fond-opacity", opacite);
    }

    var symb_menu = document.getElementById("symbole");
    var menu = document.getElementById("menu");
    var btnmode = document.getElementById("btnmode");

    var styleLight = document.getElementById("light");
    var styleDark = document.getElementById("dark");

    // Fonction pour appliquer le thème
    function appliquerTheme(isDark) {
        if (isDark) {
            if (styleDark) styleDark.disabled = false;
            if (styleLight) styleLight.disabled = true;
            if (btnmode) btnmode.checked = true;
            localStorage.setItem('theme', 'dark');
        } else {
            if (styleDark) styleDark.disabled = true;
            if (styleLight) styleLight.disabled = false;
            if (btnmode) btnmode.checked = false;
            localStorage.setItem('theme', 'light');
        }
    }

    // Charger le thème sauvegardé dès l'ouverture de n'importe quelle page
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        appliquerTheme(true);
    } else {
        appliquerTheme(false);
    }

    // Gestion du clic sur le bouton mode
    if (btnmode) {
        btnmode.addEventListener('change', function() {
            document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
            appliquerTheme(this.checked);
        });
    }

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

    window.addEventListener("scroll", actualiserFond, {passive: true});
    window.addEventListener("resize", actualiserFond);
    actualiserFond();
    cleanUrl();
    window.addEventListener("hashchange", cleanUrl);
});