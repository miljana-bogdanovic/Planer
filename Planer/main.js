import {Nedelja} from "./Nedelja.js";

const nedelja=new Nedelja();
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

nedelja.crtaj(document.body);
