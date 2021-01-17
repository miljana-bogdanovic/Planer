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
           return await Context.Nedelje.ToListAsync();
       }
       [Route("UpisiNedelju")]
       [HttpPost]
       public async Task UpisiNedelju([FromBody] Nedelja nedelja)
       {
            Context.Nedelje.Add(nedelja);
            await Context.SaveChangesAsync();
       }
    }
}
