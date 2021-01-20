using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BojanZelenkovic.Models
{
    public class OrganizacionaJedinica
    {
        public int Id { get; set; }

        [Required]
        [StringLength(50,ErrorMessage ="Tekstualna vrednost sa najvise 50 karaktera!")]
        public string Ime { get; set; }

        [Range(2010,2020,ErrorMessage ="Celobrojna vrednost iz intervala [2010,2020]")]
        public int GodinaOsnivanja { get; set; }

        public ICollection<Zaposleni> Zaposleni { get; set; }

    }
}