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
           return  await Context.Planer.Include(p=>p.Dani).ThenInclude(p=>p.Obaveze).ToListAsync();
       }
       [Route("UpisiNedelju")]
       [HttpPost]
       public async Task UpisiNedelju([FromBody] Nedelja nedelja)
       {
            Context.Planer.Add(nedelja);
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
       [Route("PreuzmiDane")]
       [HttpGet]
       public async Task<List<Dan>> PreuzmiDane()
       {
           return await Context.Dani.Include(p=>p.Obaveze).ToListAsync();
       }
       [Route("UpisiDane/{idNedelje}")]
       [HttpPost]
       public async Task UpisiDane(int idNedelje, [FromBody] Dan dan)
       {
           var nedelja=await Context.Planer.FindAsync(idNedelje);
           dan.Nedelja=nedelja;
            Context.Dani.Add(dan);
            await Context.SaveChangesAsync();
       }
       [Route("IzbrisiDan/{id}")]
       [HttpDelete]
       public async Task IzbrisiDan(int id)
       {
           var dan=await Context.FindAsync<Dan>(id);
           Context.Remove(dan);
           await Context.SaveChangesAsync();
       }

       [Route("UpisiObaveze/{idDana}")]
       [HttpPost]
       public async Task UpisiObaveze(int idDana, [FromBody] Obaveza obaveza)
       {
           var dan=await Context.Dani.FindAsync(idDana);
            obaveza.Dan=dan;
            Context.Obaveze.Add(obaveza);
            await Context.SaveChangesAsync();
       }
       [Route("IzmeniObavezu")]
       [HttpPut]
       public async Task IzmeniObavezu([FromBody] Obaveza obaveza)
       {
           //var staraNedelja = await Context.Nedelje.FindAsync(nedelja.ID);
           Context.Obaveze.Update(obaveza);
           await Context.SaveChangesAsync();
       }
        [Route("IzbrisiObavezu/{id}")]
       [HttpDelete]
       public async Task IzbrisiObavezu(int id)
       {
           var obaveza=await Context.FindAsync<Obaveza>(id);
           Context.Remove(obaveza);
           await Context.SaveChangesAsync();
       }
    }
}
