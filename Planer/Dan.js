import {Obaveza} from "./Obaveza.js"
export class Dan {
    constructor(ime)
   {
       this.naziv=ime;
       this.listaObaveza=[];
       this.kontejnerDana=null;
   }
   crtajDan(host)
   {
    this.kontejnerDana=host;
    let naslov=document.createElement("h1");
    naslov.innerHTML=this.naziv;
    host.appendChild(naslov);    
    this.listaObaveza.forEach((obaveza) => {
       obaveza.crtajObavezu(host);
   })
   }
   dodajObavezu(predmet, boja, hitno){
       this.listaObaveza.push(new Obaveza(predmet, boja, hitno, this.naziv));
    
   }
   arzurirajDan()
   {
       while(this.kontejnerDana.firstChild)
        this.kontejnerDana.removeChild(this.kontejnerDana.lastChild);
        this.crtajDan(this.kontejnerDana);

   }
}