import {Obaveza} from "./Obaveza.js"
export class Dan {
    constructor(ime, id)
   {
       this.id=id;
       this.naziv=ime;
       this.listaObaveza=[];
       this.kontejnerDana=null;
   }
   crtajDan(host)
   {
    this.kontejnerDana=host;
    let naslov=document.createElement("h2");
    naslov.innerHTML=this.naziv;
    naslov.className="Naslov";
    this.kontejnerDana.appendChild(naslov);    
    this.listaObaveza.forEach((obaveza) => {
       obaveza.crtajObavezu(host);
   })
   }
   dodajObavezu(predmet, boja, hitno){
    if(this.listaObaveza.length>2)
    alert("Previse predmeta za isti dan,  izaberi drugi!");
    else 
    {
    if(!this.listaObaveza.find(p=> (p.predmet==predmet || p.boja==boja)))
    {
       // console.log(this.id);
            fetch("https://localhost:5001/Planer/UpisiObaveze/" + this.id, 
            {
               
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                {
                    predmet:predmet,
                    boja: boja,
                    hitno: hitno,
                    dan: this.naziv
           
                })
            }).then(p => 
            {
                if (p.ok) 
                {

                    this.listaObaveza.push(new Obaveza(predmet, boja, hitno, this.naziv));
                    this.arzurirajID();
                    this.arzurirajDan();
                }
            });
    }
    else
    {
        alert("Vec postoji taj predmet/boja za taj dan!");
    }
    }
    }
    upisiObavezu(predmet, boja, hitno)
    {
        this.listaObaveza.push(new Obaveza(predmet, boja, hitno, this));
        this.arzurirajDan();
    }
    izmeniObavezu(predmet, boja, hitno)
    {
        const i=this.listaObaveza.findIndex(p=> p.predmet==predmet);
       //debugger;
        fetch("https://localhost:5001/Planer/IzmeniObavezu/" , 
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                {
                    predmet:predmet,
                    boja: boja,
                    hitno: hitno,
                    dan: this.naziv,
                    id: this.listaObaveza[i].id
                })
            }).then(p=>
                {
                    if (p.ok)
                    {
                    this.listaObaveza[i].arzurirajObavezu(predmet, boja,hitno);
                    this.arzurirajDan();
                    }

                })
    }
    izbrisiObavezu(predmet, boja, hitno)
    {
        const i=this.listaObaveza.findIndex(obaveza => obaveza.predmet==predmet);
        fetch("https://localhost:5001/Planer/IzbrisiObavezu/" + this.listaObaveza[i].id, 
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
            
        }).then(p=>
            {   
                if (p.ok)
                {
                this.listaObaveza=this.listaObaveza.filter(o=> o.predmet!=predmet)
                this.arzurirajDan();
                }

            })
    }
    
   
   arzurirajDan()
   {
       while(this.kontejnerDana.firstChild)
        this.kontejnerDana.removeChild(this.kontejnerDana.lastChild);
        this.crtajDan(this.kontejnerDana);

   }
   arzurirajID(){
    fetch("https://localhost:5001/Planer/PreuzmiDane" ).then(p =>
    {
        p.json().then(data=>{
            //console.log(data);
            let i=data[ data.findIndex(dan => dan.id==this.id)]
           // console.log(i);
            i.obaveze.forEach((obaveza,j) => {
                this.listaObaveza[j].id=obaveza.id;
                });
            });
        });
   }
}
