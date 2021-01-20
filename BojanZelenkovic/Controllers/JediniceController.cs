using BojanZelenkovic.Models;
using BojanZelenkovic.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BojanZelenkovic.Controllers
{
    public class JediniceController : ApiController
    {
        private IOrganizacionaJedincaRepository _organizacionaJedincaRepository { get; set; }

        public JediniceController(IOrganizacionaJedincaRepository organizacionaJedincaRepository)
        {
            this._organizacionaJedincaRepository = organizacionaJedincaRepository;
        }

        public IEnumerable<OrganizacionaJedinica> Get()
        {
            return _organizacionaJedincaRepository.GetAll();
        }

        public IHttpActionResult GetById(int id)
        {
            OrganizacionaJedinica jedinica = _organizacionaJedincaRepository.GetById(id);

            if (jedinica == null)
            {
                return NotFound();
            }

            return Ok(jedinica);
        }

        [HttpGet]
        [Route("api/tradicija")]
        public IQueryable<OrganizacionaJedinica> Tradicija()
        {
            return _organizacionaJedincaRepository.GetTradicija();
        }


        [HttpGet]
        [Route("api/brojnost")]
        public IQueryable<OrganizacionaJedinica> Brojnost()
        {
            return _organizacionaJedincaRepository.GetBrojnost();
        }

        [HttpPost]
        [Route("api/plate")]
        public IQueryable<OrganizacionaJedinicaDTO> Plate(OrganizacionaJedinicaPretraga pretragaModel)
        {
            return _organizacionaJedincaRepository.PostPlate(pretragaModel);
        }
    }
}
