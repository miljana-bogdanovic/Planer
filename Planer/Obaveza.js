export class Obaveza{
    constructor( predmet, boja, hitno, dan) {
        this.predmet=predmet;
        this.boja=boja;
        this.hitno=hitno;
        this.dan=dan.naziv;
        this.id=0;
    }
    odrediBoju(boja, host)
    {
        if (boja=="crvena")
        host.style.backgroundColor= "#e50000";
        else if (boja=="zelena")
        host.style.backgroundColor=  "#198c19";
        else if (boja=="plava")
        host.style.backgroundColor=  "#9999ff";
        else if (boja=="zuta")
        host.style.backgroundColor=  "#ffff4d";
        else  host.style.backgroundColor=  "#ffa500";
    }
    crtajObavezu(host){
        let obaveza=document.createElement("div");
        obaveza.classList.add("obaveza");
        obaveza.innerHTML=this.predmet;
        this.odrediBoju(this.boja, obaveza);
        if(this.hitno==1)
            obaveza.classList.add(
            "hitno"
            );
        host.appendChild(obaveza);
        obaveza.onclick=(ev) => {
           let forma= host.parentNode.parentNode.firstChild;
           let stavka=forma.querySelector(".Predmet");
           stavka.value=this.predmet;
           stavka=forma.querySelector(".selekcijaBoje");
           stavka.value=this.boja;
           stavka=forma.querySelector(".selekcijaDana");


           stavka.value=this.dan;
           stavka=forma.querySelector("input[type=checkbox]");
            //stavka=forma.querySelector(".hitnoCheck");
           if (this.hitno)
                stavka.checked=true;
                else
                stavka.checked=false;
           
        }
    }
    arzurirajObavezu(predmet, boja, hitno)
    {
        this.predmet=predmet;
        this.boja=boja;
        this.hitno=hitno;
    }
}