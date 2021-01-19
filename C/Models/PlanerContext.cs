using Microsoft.EntityFrameworkCore;
namespace Projekat.Models
{
    
    public class PlanerContext : DbContext
    {
        public DbSet<Nedelja> Planer { get; set;}
        public DbSet<Dan> Dani { get; set;}
        public DbSet<Obaveza> Obaveze{ get; set;}
        public PlanerContext(DbContextOptions options) : base(options) 
        {

        }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Dan>()
                .HasMany(s => s.Obaveze)
                .WithOne(s => s.Dan)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Nedelja>()
                .HasMany(s => s.Dani)
                .WithOne(s => s.Nedelja)
                .OnDelete(DeleteBehavior.Cascade);

            base.OnModelCreating(modelBuilder);
        }
    }
}