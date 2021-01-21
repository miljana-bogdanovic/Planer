
import { Dan } from "./Dan.js";
import { Obaveza } from "./Obaveza.js";

export class Nedelja{
    constructor(naziv)
    {
        this.ime=naziv;
        this.daniUNedelji=[];
        this.kontejner=null;
        const dani = ["Ponedeljak", "Utorak", "Sreda", "Cetvrtak", "Petak", "Subota", "Nedelja"];
        dani.forEach(naziv=> {
            this.daniUNedelji.push(new Dan(naziv, 0));
    
        });
    }
    crtaj(host)
    {
        let najveciKontejner=document.createElement("div");
        najveciKontejner.className="najveciKontejner";
        host.appendChild(najveciKontejner);
        let naslov=document.createElement("h1");
        naslov.className="naslovStranice";
        naslov.innerHTML=this.ime;
        najveciKontejner.appendChild(naslov);

        this.kontejner=document.createElement("div");
        this.kontejner.className="kontejner";
        najveciKontejner.appendChild(this.kontejner);
        
        this.crtajFormu(this.kontejner);
        this.crtajNedelju(this.kontejner);
    }
    crtajFormu(host)
    {
        const kontejnerForma=document.createElement("div");
        kontejnerForma.className="kontejnerForma";
        host.appendChild(kontejnerForma);
        
        //naslov
        var naslovForme=document.createElement("h2");
        naslovForme.innerHTML="Zadatak";
        naslovForme.className="naslovForme";
        kontejnerForma.appendChild(naslovForme);

        //predmet
        let divPredmet = document.createElement("div");
        var labela= document.createElement("label");
        labela.innerHTML="Unesi predmet: ";
        divPredmet.appendChild(labela);

        let unosPredmeta= document.createElement("input");
        unosPredmeta.className="Predmet";
        divPredmet.appendChild(unosPredmeta);
        kontejnerForma.appendChild(divPredmet);

        //dan
        let opcija=null;
        let divDan = document.createElement("div");
        labela=document.createElement("label");
        labela.innerHTML="Izaberi dan: ";
        let selekcijaDana= document.createElement("select");
        selekcijaDana.className="selekcijaDana";

        divDan.appendChild(labela);
        divDan.appendChild(selekcijaDana);

        this.daniUNedelji.forEach((dan, i)=>{
            opcija=document.createElement("option");
            opcija.innerHTML=dan.naziv;
            opcija.value=dan.naziv;
            selekcijaDana.appendChild(opcija);
        })
        kontejnerForma.appendChild(divDan);

        //boja
        opcija=null;
        let divBoja = document.createElement("div");
        labela=document.createElement("label");
        labela.innerHTML="Izaberi boju: ";
        let selekcijaBoje= document.createElement("select");
        selekcijaBoje.className="selekcijaBoje";

        divBoja.appendChild(labela);
        divBoja.appendChild(selekcijaBoje);

        let boje = ["crvena", "zuta", "zelena", "plava", "narandzasta"];
        boje.forEach((boja, i)=>{
            opcija=document.createElement("option");
            opcija.innerHTML=boja;
            opcija.value=boja;
            selekcijaBoje.appendChild(opcija);
        })
        kontejnerForma.appendChild(divBoja);

        //hitno
        let divHitno = document.createElement("div");
        labela=document.createElement("label");
        labela.innerHTML="Hitno";
        divHitno.appendChild(labela);
        let hitno = document.createElement("input");
        hitno.setAttribute("type", "checkbox");
        divHitno.appendChild(hitno);
        hitno.className=".hitnoCheck";
        kontejnerForma.appendChild(divHitno);

        //dugme Dodaj
        const dugme = document.createElement("button");
        dugme.innerHTML="Dodaj";
        dugme.className="dugme";
        kontejnerForma.appendChild(dugme);
        dugme.onclick=(ev)=>{
            const naziv=kontejnerForma.querySelector(".Predmet").value;
            const dan=selekcijaDana.value;
            const boja=selekcijaBoje.value;
            const hitnoCheck=hitno.checked ? 1 : 0;
            let i=this.daniUNedelji.findIndex(trazeniDan => trazeniDan.naziv==dan);
            this.daniUNedelji[i].dodajObavezu(naziv, boja, hitnoCheck);
        }
        //Dugme izmeni
        const dugmeIzmeni = document.createElement("button");
        dugmeIzmeni.innerHTML="Izmeni";
        dugmeIzmeni.className="dugme";
        kontejnerForma.appendChild(dugmeIzmeni);
        dugmeIzmeni.onclick=(ev)=>{
            const naziv=kontejnerForma.querySelector(".Predmet").value;
            const dan=selekcijaDana.value;
            const boja=selekcijaBoje.value;
            const hitnoCheck=hitno.checked ? 1 : 0;
            
            let i=this.daniUNedelji.findIndex(trazeniDan => trazeniDan.naziv==dan);
            this.daniUNedelji[i].izmeniObavezu(naziv, boja, hitnoCheck);
        }
         //Dugme izbrisi
         const dugmeIzbrisi = document.createElement("button");
         dugmeIzbrisi.innerHTML="Izbrisi";
         dugmeIzbrisi.className="dugme";
         kontejnerForma.appendChild(dugmeIzbrisi);
         dugmeIzbrisi.onclick=(ev)=>{
             const naziv=kontejnerForma.querySelector(".Predmet").value;
             const dan=selekcijaDana.value;
             const boja=selekcijaBoje.value;
             const hitnoCheck=hitno.checked ? 1 : 0;
             let i=this.daniUNedelji.findIndex(trazeniDan => trazeniDan.naziv==dan);
             this.daniUNedelji[i].izbrisiObavezu(naziv, boja, hitno);
            }
        //dugme Snimi
           /* const dugmeSnimi = document.createElement("button");
            dugmeSnimi.innerHTML="Snimi";
            dugmeSnimi.className="dugme";
            kontejnerForma.appendChild(dugmeSnimi);
            dugmeSnimi.onclick=(ev)=>{
                this.daniUNedelji.forEach( dan => 
                    {
                        fetch("https://localhost:5001/Planer/UpisiObaveze/" + dan.id, 
                        {
                         method: "POST",
                         headers: {
                             "Content-Type": "application/json"
                         },
                        body: JSON.stringify(
                            {
                            predmet:predmet,
                            boja: boja,
                            hitno: hitno
                            })
                        })
                    
                    });
         */
        }
    
        crtajNedelju(host)
        { 
        const kontejnerNedelja=document.createElement("div");
        kontejnerNedelja.className="kontejnerNedelja";
        host.appendChild(kontejnerNedelja);

        this.daniUNedelji.forEach((dan, i)=>{
            let kontejner=document.createElement("div");
            kontejner.className="kontejnerDan";
            kontejnerNedelja.appendChild(kontejner);
            dan.crtajDan(kontejner);
        }); 
    }
}
   

    
    

    
