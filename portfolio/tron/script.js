function fermer(id){document.getElementById(id).style.display = "none";}

function Joueur(numero, liste_touches, coords, touche_saut, nom=""){
    this.numero = numero;
    this.liste_touches = liste_touches;
    this.coords = coords;
    this.touche_saut = touche_saut;
    this.nom = nom;
    this.direction = 2;
    this.saut = false;
    this.score = 0;
    this.visites = [];
    this.touche = false;
    this.peut_sauter = true;
}

Joueur.prototype.changer_coords = function(){
    if(this.direction === 0){this.coords[0]-=1;}
    else{
        if(this.direction === 1){this.coords[1]+=1;}
        else{
            if(this.direction === 2){this.coords[0]+=1;}
            else{this.coords[1]-=1;}
        }
    }
}

Joueur.prototype.changer_touches = function(tab,nv_saut){
    for(var i=0;i<this.liste_touches.length;i++){
        this.liste_touches[i]=tab[i];
    }
    this.touche_saut = nv_saut;
}

Joueur.prototype.est_dans_les_limites = function(){return this.coords[0] >= 0 && this.coords[0] <= 79 && this.coords[1] >= 0 && this.coords[1] <= 58;}

Joueur.prototype.ajouter_visites = function(coords){this.visites.push(coords);}

Joueur.prototype.reset_visites = function(){this.visites = [];}


document.addEventListener("DOMContentLoaded", function () {

    function est_dans(val, liste){
        for(let i = 0; i < liste.length; i++){
            if(liste[i][0] === val[0] && liste[i][1] === val[1]){
                return true;
            }
        }
        return false;
    }

    function est_dans_les_limites_coords(coords){
        return coords[0] >= 0 && coords[0] <= 79 && coords[1] >= 0 && coords[1] <= 58;
    }

    const btn_commencer = document.getElementById("commencer");
    const form = document.getElementById("form");
    const btn_touches = document.getElementById("touches");
    const form_touches = document.getElementById("form_touches");

    var j1 = new Joueur(1,["Q", "W", "D", "Z"],[1,28],"S");
    var j2 = new Joueur(2,["K", ";", "M", "O"],[1,30],"L");
    
    let partie_en_cours = false;

    const regles = document.getElementById("regles"); 
    regles.addEventListener("change", function(){
        if (regles.checked) {
            document.getElementById("texteRegles").style.display = "block";
        }
        else {
            document.getElementById("texteRegles").style.display = "none";
        }
    });

    btn_commencer.addEventListener("click", function () {
        if(partie_en_cours){
            window.location.reload();
        }
        else {
            document.getElementById("overlay").style.display = "block";
        }
    });

    btn_touches.addEventListener("click",function(){
        document.getElementById("overlay_touches").style.display = "block";
    });

    form_touches.addEventListener("submit", function(event){
        event.preventDefault();

        const nv_touches_j1 = [document.getElementById("gauche_j1").value, document.getElementById("bas_j1").value, document.getElementById("droite_j1").value, document.getElementById("haut_j1").value];
        const nv_touches_j2 = [document.getElementById("gauche_j2").value, document.getElementById("bas_j2").value, document.getElementById("droite_j2").value, document.getElementById("haut_j2").value];
        const nv_touches_sauts = [document.getElementById("saut_j1").value, document.getElementById("saut_j2").value];

        let valide = true;

        function verifieDoublons(tab, sauts){
            for(let i=0;i<tab.length;i++){
                let touche1 = tab[i].toLowerCase();
                for(let j=i+1;j<tab.length;j++){
                    if(touche1 === tab[j].toLowerCase()) valide = false;
                }
                for(let s of sauts){
                    if(touche1 === s.toLowerCase()) valide = false;
                }
            }
        }
        verifieDoublons(nv_touches_j1, nv_touches_sauts);
        verifieDoublons(nv_touches_j2, nv_touches_sauts);

        for(let i=0; i<nv_touches_j1.length;i++){
            if(est_dans(nv_touches_j1[i], nv_touches_j2)){valide = false;}
        }

        if(nv_touches_sauts[0].toLowerCase() === nv_touches_sauts[1].toLowerCase()){valide = false;}

        if(valide){
            j1.changer_touches(nv_touches_j1,nv_touches_sauts[0]);
            j2.changer_touches(nv_touches_j2,nv_touches_sauts[1]);
            document.getElementById("overlay_touches").style.display = "none";
        }
        else{
            document.getElementById("invalides").textContent = "Touches invalides";
        }
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        j1.nom = document.getElementById("nom_j1").value.trim();
        j2.nom = document.getElementById("nom_j2").value.trim();

        if (j1.nom.length===0 || j2.nom.length===0){
            document.getElementById("incorrect").textContent = "Entrez les noms";
            return;
        }

        btn_commencer.value = "Rejouer";

        partie_en_cours = true;
        document.getElementById("victoire").textContent = "";
        document.getElementById("touches").disabled = true;
        document.getElementById("j1").textContent = j1.nom;
        document.getElementById("j2").textContent = j2.nom;
        document.getElementById("overlay").style.display = "none";

        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        const score = document.getElementById("score");

        function dessiner(ctx,joueur,coords, vi){
            ctx.beginPath();
            let couleur;
            let couleur2;
            if(joueur===0){
                couleur2 = "#7673D9";
                couleur = "blue";
            }
            else{
                couleur2 = "#D96A6A";
                couleur = "red";
            }
            if (vi.length > 0){
                ctx.fillStyle = couleur;
                ctx.shadowColor = couleur2;
                ctx.shadowBlur = 8;
                ctx.fillRect(vi[vi.length-1][0]*10, vi[vi.length-1][1]*10, 10, 10);
            }
        
            ctx.shadowBlur = 0;
            ctx.fillStyle = couleur;
            ctx.beginPath();
            ctx.arc(coords[0]*10+5, coords[1]*10+5, 5, 0, Math.PI*2);
            ctx.fill();
        }

        function changer_coords_simulation(coords, direction, dem){
            if(dem){
                let nv_coords = [coords[0],coords[1]];
                if(direction === 0){nv_coords[0] -= 1;}
                else if(direction === 1){nv_coords[1] += 1;}
                else if(direction === 2){nv_coords[0] += 1;}
                else{nv_coords[1] -= 1;}
                return nv_coords;
            }
            return coords;
        }

        j1.saut = false;
        j2.saut = false;
        j1.reset_visites();
        j2.reset_visites();
        j1.score = 0;
        j2.score = 0;
        score.textContent = "0 - 0";
        j1.touche = false;
        j2.touche = false;

        if (!j1.touche){
            for(let i=0;i<j1.liste_touches.length;i++){
                const touche = j1.liste_touches[i];
                document.addEventListener("keydown", function(event){
                    if (event.key.toLowerCase() === touche.toLowerCase()) {
                        if(Math.abs(i - j1.direction) !== 2){
                            j1.direction = i;
                            j1.touche = true;
                        }
                    }
                });
            }
        }

        if (!j2.touche){
            for(let i=0;i<j2.liste_touches.length;i++){
                const touche = j2.liste_touches[i];
                document.addEventListener("keydown", function(event){
                    if (event.key.toLowerCase() === touche.toLowerCase()) {
                        if(Math.abs(i - j2.direction) !== 2){
                            j2.direction = i;
                            j2.touche = true;
                        }
                    }
                });
            }
        }

        

        document.addEventListener("keydown", function(event){
            if(event.key.toLowerCase() === j1.touche_saut.toLowerCase() && j1.peut_sauter){
                j1.saut = true;
                j1.peut_sauter = false;
                j1.changer_coords();
            }
            if(event.key.toLowerCase() === j2.touche_saut.toLowerCase() && j2.peut_sauter){
                j2.saut = true;
                j2.peut_sauter = false;
                j2.changer_coords();
            }
        });


        function demarrerManche(){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            j1.coords = [1,28];
            j2.coords = [1,30];
            j1.direction = 2;
            j2.direction = 2;
            j1.reset_visites();
            j2.reset_visites();
            j1.saut = false;
            j2.saut = false;
            var dem = false;

        const interval = setInterval(function(){
            j1.touche = false;
            j2.touche = false;
            let prec_j1 = [j1.coords[0], j1.coords[1]];
            let prec_j2 = [j2.coords[0], j2.coords[1]];

            let prochaine_j1 = changer_coords_simulation(j1.coords, j1.direction, dem);
            let prochaine_j2 = changer_coords_simulation(j2.coords, j2.direction, dem);

            let collision_j1 = !est_dans_les_limites_coords(prochaine_j1) || est_dans(prochaine_j1, j1.visites) || est_dans(prochaine_j1, j2.visites) || (prochaine_j1[0] === prec_j2[0] && prochaine_j1[1] === prec_j2[1] && prochaine_j2[0] === prec_j1[0] && prochaine_j2[1] === prec_j1[1]) || (prochaine_j1[0] === prochaine_j2[0] && prochaine_j1[1] === prochaine_j2[1]);
            let collision_j2 = !est_dans_les_limites_coords(prochaine_j2) || est_dans(prochaine_j2, j2.visites) || est_dans(prochaine_j2, j1.visites) || (prochaine_j1[0] === prec_j2[0] && prochaine_j1[1] === prec_j2[1] && prochaine_j2[0] === prec_j1[0] && prochaine_j2[1] === prec_j1[1]) || (prochaine_j1[0] === prochaine_j2[0] && prochaine_j1[1] === prochaine_j2[1]);

            if(collision_j1 || collision_j2){
                dem = false;
                j1.peut_sauter = true;
                j2.peut_sauter = true;
                if(collision_j1 && collision_j2){
                    j1.score += 1;
                    j2.score += 1;
                } else {
                    if(collision_j1) j2.score += 1;
                    if(collision_j2) j1.score += 1;
                }

                clearInterval(interval);
                score.textContent = j1.score + " - " + j2.score;

                if(j1.score === 3 || j2.score === 3){
                    dem = false;
                    const p_victoire = document.getElementById("victoire");
                    if(j1.score === 3 && j2.score === 3) p_victoire.textContent = "Match nul !";
                    else if(j1.score === 3) p_victoire.textContent = "Victoire de " + j1.nom;
                    else p_victoire.textContent = "Victoire de " + j2.nom;

                    partie_en_cours = false;
                    document.getElementById("touches").disabled = false;
                } else {
                    setTimeout(demarrerManche, 250);
                }
                return;
            }

            j1.coords = prochaine_j1;
            j2.coords = prochaine_j2;

            dessiner(ctx, 0, j1.coords, j1.visites);
            dessiner(ctx, 1, j2.coords, j2.visites);

            if(j1.saut){
                j1.saut = false;
                j1.ajouter_visites([j1.coords[0], j1.coords[1]]);
            }
            else {
                j1.ajouter_visites([j1.coords[0], j1.coords[1]]);
            }


            if(j2.saut){
                j2.saut = false;
                j2.ajouter_visites([j2.coords[0], j2.coords[1]]);
            }
            else {
                j2.ajouter_visites([j2.coords[0], j2.coords[1]]);
            }
            dem = true;
        }, 125);
    }

        demarrerManche();
    });
});