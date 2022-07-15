using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using EsercitazioneChry_Insert_Update_Delete.DB;
using EsercitazioneChry_Insert_Update_Delete.Entities;
using EsercitazioneChry_Insert_Update_Delete.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace EsercitazioneChry_Insert_Update_Delete.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonController : ControllerBase
    {
        private readonly Repository repository;
        public PersonController(Repository repository)
        {
            this.repository = repository;
        }

        [HttpPost("InsertPerson")]
        public async Task<IActionResult> Post([FromBody] PersonModel model)
        {
            if (model != null)
            {
                Person p = new Person();
                p.Nome = model.Nome;
                p.Cognome = model.Cognome;
                this.repository.InsertPerson(p);
            }
            return Ok(model);
        }

        [HttpPatch("UpdatePerson")]
        public async Task<IActionResult> UpdatePerson([FromBody] PersonModel model)
        {
            if (model != null)
            {
                Person p = new Person();
                p.ID = Guid.Parse(model.ID);
                p.Nome = model.Nome;
                p.Cognome = model.Cognome;
                this.repository.UpdatePerson(p);
            }
            return Ok(200);
        }

        [HttpGet("GetAllPersons")]
        public IEnumerable<Person> GetAllPersons()
        {
            List<Person> myPerson = this.repository.GetAllPersons();
            return myPerson;
        }

        [HttpDelete("DeletePerson")]
        public String DeletePerson([FromQuery] string id) // elimina uno con id
        {
            String res = "Delete";

            if (id != null)
            {
                res = this.repository.DeletePersonByID(id);
                return res;
            }
            return res = "Persona non cancellata";
        }


    }
}