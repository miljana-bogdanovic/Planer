using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
 namespace Projekat.Models
{
    [Table("Planer")]
    public class Nedelja 
    {
        [Key]
        [Column("ID")]
        public int ID { get; set;} 
        public virtual List<Dan> Dani { get; set; }
    }
}