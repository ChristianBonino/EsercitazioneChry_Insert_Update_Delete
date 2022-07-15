using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EsercitazioneChry_Insert_Update_Delete.Entities
{
    public class Person
    {
        public Guid ID { get; set; }
        public string Nome { get; set; }
        public string Cognome { get; set; }
    }
}
