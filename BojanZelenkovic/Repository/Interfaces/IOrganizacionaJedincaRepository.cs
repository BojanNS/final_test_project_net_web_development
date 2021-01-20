using BojanZelenkovic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BojanZelenkovic.Repository.Interfaces
{
    public interface IOrganizacionaJedincaRepository
    {
        IEnumerable<OrganizacionaJedinica> GetAll();

        OrganizacionaJedinica GetById(int id);

        IQueryable<OrganizacionaJedinica> GetTradicija();

        IQueryable<OrganizacionaJedinica> GetBrojnost();

        IQueryable<OrganizacionaJedinicaDTO> PostPlate(OrganizacionaJedinicaPretraga pretragaModel);
    }
}
