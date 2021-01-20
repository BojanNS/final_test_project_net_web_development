using BojanZelenkovic.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BojanZelenkovic.Models;
using System.Data.Entity;
namespace BojanZelenkovic.Repository
{
    public class OrganizacionaJedinicaRepository : IOrganizacionaJedincaRepository
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        public IEnumerable<OrganizacionaJedinica> GetAll()
        {
            return db.Jedinice.Include(x => x.Zaposleni);
        }

        public IQueryable<OrganizacionaJedinica> GetBrojnost()
        {
            return db.Jedinice.Include(x => x.Zaposleni).OrderByDescending(x => x.Zaposleni.Count).AsQueryable();
        }

        public OrganizacionaJedinica GetById(int id)
        {
            OrganizacionaJedinica jedinica = db.Jedinice.Include(x => x.Zaposleni).FirstOrDefault(x => x.Id == id);

            if (jedinica == null)
            {
                return null;
            }

            return jedinica;
        }

        public IQueryable<OrganizacionaJedinica> GetTradicija()
        {
            var listaJedinica = db.Jedinice.Include(x => x.Zaposleni).OrderByDescending(x => x.GodinaOsnivanja).ToList();
            var returnlista = new List<OrganizacionaJedinica>();
            returnlista.Add(listaJedinica[0]);
            returnlista.Add(listaJedinica[listaJedinica.Count - 1]);

            return returnlista.OrderBy(x => x.GodinaOsnivanja).AsQueryable();
        }

        public IQueryable<OrganizacionaJedinicaDTO> PostPlate(OrganizacionaJedinicaPretraga pretragaModel)
        {
            var listaJedinica = db.Jedinice.Include(x => x.Zaposleni);

            var returnLista = new List<OrganizacionaJedinicaDTO>();

            foreach (var jedinica in listaJedinica)
            {
                decimal plata = 0m;
                foreach (var zaposleni in jedinica.Zaposleni)
                {
                    plata += zaposleni.Plata;
                }

                decimal prosecnaPlata = plata / jedinica.Zaposleni.Count;
                returnLista.Add(new OrganizacionaJedinicaDTO() { Id = jedinica.Id, Ime = jedinica.Ime, GodinaOsnivanja = jedinica.GodinaOsnivanja, ProsecnaPlata = prosecnaPlata });
            }

            return returnLista.Where(x => x.ProsecnaPlata > pretragaModel.Granica).OrderBy(x => x.ProsecnaPlata).AsQueryable();
        }
    }
}