using Microsoft.EntityFrameworkCore;
namespace Projekat.Models
{
    
    public class PlanerContext : DbContext
    {
        public DbSet<Nedelja> Nedelje { get; set;}
        public DbSet<Dan> Dani { get; set;}
        public DbSet<Obaveza> Obaveze{ get; set;}
        public PlanerContext(DbContextOptions options) : base(options) 
        {

        }
    }
}