using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
namespace Projekat.Models
{
    [Table("Obaveze")]
    public class Obaveza
    {
        [Key]
        [Column("ID")]
        public int ID {get; set;}
        [Column("Predmet")]
        [MaxLength(255)]
        public string Predmet { get; set; }
        
        [Column("Boja")]
        [MaxLength(255)]
        public string Boja { get; set; }

        [Column("Hitno")]
        public int Hitno { get; set; }

        [JsonIgnore]
        public Dan Dan { get; set; }


    }
}