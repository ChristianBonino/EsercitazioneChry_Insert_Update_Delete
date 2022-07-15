using EsercitazioneChry_Insert_Update_Delete.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EsercitazioneChry_Insert_Update_Delete.DB
{
    public class Repository
    {
        private DBContext DBContext;
        public Repository(DBContext DBContext)
        {
            this.DBContext = DBContext;
        }
        public List<Person> GetPersons()
        {
            //select * from persons
            List<Person> result = this.DBContext.Persons.ToList();
            return result;
        }

        public void InsertPerson(Person person)
        {
            this.DBContext.Persons.Add(person);
            this.DBContext.SaveChanges();
        }
        public List<Person> GetAllPersons()
        {
            //select * from persons
            List<Person> result = this.DBContext.Persons.OrderBy(p => p.Nome).ThenBy(p => p.Cognome).ThenBy(p => p.ID).ToList();
            return result;
        }

        public void DeletePerson(Person person)
        {
            this.DBContext.Persons.Remove(person);
            this.DBContext.SaveChanges();
        }

        internal Person GetPersonByID(string v)
        {
            throw new NotImplementedException();
        }

        internal List<Person> GetPersonWithFilter(string v)
        {
            throw new NotImplementedException();
        }

        public String DeletePersonByID(string id)
        {
            //select * from persons where id = "id"
            Person item = this.DBContext.Persons.Where(p => p.ID.ToString() == id).FirstOrDefault();
            try
            {
                if (item != null)
                {
                    this.DBContext.Persons.Remove(item);
                    this.DBContext.SaveChanges();
                };
                return "Record eliminato";
            }
            catch (Exception ex)
            {
                return ex.ToString() + ": " + id; // stampa messaggio errore
            }
        }

        public void UpdatePerson(Person p)
        {
            this.DBContext.Persons.Update(p);
            this.DBContext.SaveChanges();

            //Person toUpdate = this.DBContext.Persons
            //        //.Where(p => p.ID != null && p.ID.Value.ToString() == ID) nel caso fosse nullable
            //        .Where(p => p.ID.ToString() == ID)
            //        .FirstOrDefault();
            //toUpdate.Nome = Nome;
            //toUpdate.Cognome = Cognome;
            //this.DBContext.Persons.Update(toUpdate);
            //this.DBContext.SaveChanges();
        }
    }
}
