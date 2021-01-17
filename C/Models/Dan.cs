using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
namespace Projekat.Models
{
    [Table("Dani")]
    public class Dan
    {
        [Key]
        [Column("ID")]
        public int ID {get; set;}
        [Column("Naziv")]
        [MaxLength(10)]
        public string Naziv {get; set;}

         public virtual List<Obaveza> Obaveze { get; set; }
         public Nedelja Nedelja {get; set;}
    }

}