using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Projekat.Models;
using Microsoft.EntityFrameworkCore;

namespace Projekat.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlanerController : ControllerBase
    {
       public PlanerContext Context {get;set;}
        public PlanerController(PlanerContext context)
        {
            Context=context;
        }

       [Route("PreuzmiNedelje")]
       [HttpGet]
       public async Task<List<Nedelja>> PreuzmiNedelje()
       {
           return await Context.Nedelje.Include(p=>p.Dani).ToListAsync();
       }
       [Route("UpisiNedelju")]
       [HttpPost]
       public async Task UpisiNedelju([FromBody] Nedelja nedelja)
       {
            Context.Nedelje.Add(nedelja);
            await Context.SaveChangesAsync();
       }
       [Route("IzmeniNedelju")]
       [HttpPut]
       public async Task IzmeniNedelju([FromBody] Nedelja nedelja)
       {
           //var staraNedelja = await Context.Nedelje.FindAsync(nedelja.ID);
           Context.Update<Nedelja>(nedelja);
           await Context.SaveChangesAsync();
       }

       [Route("IzbrisiNedelju/{id}")]
       [HttpDelete]
       public async Task IzbrisiNedelju(int id)
       {
           var nedelja=await Context.FindAsync<Nedelja>(id);
           Context.Remove(nedelja);
           await Context.SaveChangesAsync();
       }
       [Route("UpisiDane/{idNedelje}")]
       [HttpPost]
       public async Task UpisiDane(int idNedelje, [FromBody] Dan dan)
       {
           var nedelja=await Context.Nedelje.FindAsync(idNedelje);
           dan.Nedelja=nedelja;
            Context.Dani.Add(dan);
            await Context.SaveChangesAsync();
       }
    }
}
