using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BojanZelenkovic.Models
{
    public class Zaposleni
    {
        public int Id { get; set; }

        [Required]
        [StringLength(70,ErrorMessage ="Tekstualna vrednost sa najvise od 70 karaktera!")]
        public string ImeIPrezime { get; set; }

        [Required]
        [StringLength(50, ErrorMessage = "Tekstualna vrednost sa manje od 51 karaktera!")]
        public string Rola { get; set; }

        [Range(1960, 2019, ErrorMessage = "Celbrojna vrednost iz izmedju 1960 i 2020")]
        public int GodinaRodjenja { get; set; }

        [Required]
        [Range(2010, 2020, ErrorMessage = "Celbrojna vrednost iz intervala [2010,2020]")]
        public int GodinaZaposlenja { get; set; }

        [Required]
        [Range(251, 9999, ErrorMessage = "Decimalna vrednost veca od 250 a manja od 10 000")]
        public decimal Plata { get; set; }

        public OrganizacionaJedinica OrganizacionaJedinica { get; set; }

        public int OrganizacionaJedinicaId { get; set; }
    }
}