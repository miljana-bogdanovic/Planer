import {Nedelja} from "./Nedelja.js";

/*const nedelja=new Nedelja();
nedelja.daniUNedelji[0].dodajObavezu("Rac mreze", "crvena", 0);
nedelja.daniUNedelji[0].dodajObavezu("Operativni sis", "zuta", 0);
nedelja.daniUNedelji[1].dodajObavezu("Strukture pod", "zelena", 1);
nedelja.daniUNedelji[1].dodajObavezu("Rac mreze", "crvena", 1);
nedelja.daniUNedelji[2].dodajObavezu("Operativni sis", "zuta", 0);
nedelja.daniUNedelji[2].dodajObavezu("Web programiranje", "narandzasta", 0);
nedelja.daniUNedelji[3].dodajObavezu("Web rpogramiranje", "narandzasta", 0);
nedelja.daniUNedelji[3].dodajObavezu("Objektno orjentisano prog", "zelena", 0);
nedelja.daniUNedelji[3].dodajObavezu("Baze podataka", "plava", 0);
nedelja.daniUNedelji[4].dodajObavezu("Web programiranje", "narandzasta", 1);
nedelja.daniUNedelji[5].dodajObavezu("Objektno orjentisano prog", "zelena", 1);

nedelja.crtaj(document.body);*/

fetch("https://localhost:5001/Planer/PreuzmiNedelje").then(p =>
{
    p.json().then(data=>{
        //debugger;
        console.log(data);
        
        data.forEach(nedeljaBaza => {
            const nedeljaPrikaz=new Nedelja();
            nedeljaPrikaz.crtaj(document.body);
            nedeljaPrikaz.daniUNedelji.forEach((dan, i) => 
            { 
            dan.id=nedeljaBaza.dani[i].id;
            nedeljaBaza.dani[i].obaveze.forEach((ob, j )=> 
                {
                    dan.upisiObavezu(ob.predmet, ob.boja, ob.hitno, dan);
                    dan.listaObaveza[j].id=ob.id;
                });
            });
            console.log(nedeljaPrikaz);
        });
        //ukoliko nema nedelja u bazi kreiraja se nova i upisuje
        if(data.length==0)
        {

            const nedelja=new Nedelja();
            fetch("https://localhost:5001/Planer/UpisiNedelju", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                {
                    dani : nedelja.daniUNedelji
           
                })
            }).then(p => 
            {
                if (p.ok) 
                {
                    nedelja.crtaj(document.body);
                }
            });
            fetch("https://localhost:5001/Planer/PreuzmiNedelje").then(p =>
            {
            p.json().then(data=>{
                data.forEach(nedeljaBaza => {
                    nedelja.daniUNedelji.forEach((dan, i) => 
                    { 
                        dan.id=nedeljaBaza.dani[i].id;
                    });

            });
        });
    });
    }
});
});
