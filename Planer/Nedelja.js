

import { Dan } from "./Dan.js";
import { Obaveza } from "./Obaveza.js";

export class Nedelja{
    constructor()
    {
        this.daniUNedelji=[];
        const dani=["Ponedeljak", "Utorak", "Sreda", "Cetvrtak", "Petak", "Subota", "Nedelja"];
        dani.forEach((naziv) => {
            this.daniUNedelji.push(new Dan(naziv));
        });
        this.kontejner=null;
        
    }
    crtaj(host)
    {
        
        this.kontejner=document.createElement("div");
        this.kontejner.className="kontejner";
        host.appendChild(this.kontejner);
        this.crtajFormu(this.kontejner);
        this.crtajNedelju(this.kontejner);
        

    }
    crtajFormu(host)
    {
        const kontejnerForma=document.createElement("div");
        kontejnerForma.className="kontejnerForma";
        host.appendChild(kontejnerForma);
        
        //naslov
        var naslovForme=document.createElement("h1");
        naslovForme.innerHTML="Zadatak";
        kontejnerForma.appendChild(naslovForme);

        //predmet
        let divPredmet = document.createElement("div");
        var labela= document.createElement("label");
        labela.innerHTML="Unesi predmet";
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
            if(this.daniUNedelji[i].listaObaveza.length>2)
            alert("Previse si ambiciozna, vec ucis 3 predmeta tog dana, izaberi drugi!");
            else {
            this.daniUNedelji[i].dodajObavezu(naziv, boja, hitnoCheck);
            this.daniUNedelji[i].arzurirajDan();
            }
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
            let j=this.daniUNedelji[i].listaObaveza.findIndex(obaveza => obaveza.predmet==naziv)
            if (j<0)
                alert("Trazena stavka ne postoji, pa se ne moze izmeniti!");
            else {
            this.daniUNedelji[i].listaObaveza[j].hitno=hitnoCheck;
            this.daniUNedelji[i].listaObaveza[j].boja=boja;
            this.daniUNedelji[i].arzurirajDan();
            }
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
             let j=this.daniUNedelji[i].listaObaveza.findIndex(obaveza => obaveza.predmet==naziv)
             if (j<0)
                 alert("Trazena stavka ne postoji, pa se ne moze izbrisati!");
             else {
                this.daniUNedelji[i].listaObaveza.splice(j, 1);
             this.daniUNedelji[i].arzurirajDan();
             }
         }
        }
        crtajNedelju(host)
        { 
        const kontejnerNedelja=document.createElement("div");
        kontejnerNedelja.className="kontejnerNedelja";
        host.appendChild(kontejnerNedelja);

        this.daniUNedelji.forEach((dan)=> {
            let danKontejner=document.createElement("div");
            danKontejner.className="kontejnerDan";
            dan.crtajDan(danKontejner);
            kontejnerNedelja.appendChild(danKontejner);
            
        })

    
    }
}