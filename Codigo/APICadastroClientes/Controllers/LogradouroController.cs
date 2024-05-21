using AutoMapper;
using Core;
using Core.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Models;

namespace APICadastroClientes.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/logradouro")]
    public class LogradouroController : ControllerBase
    {
        private readonly ILogradouroService _logradouroService;
        private readonly IClienteService _clienteService;
        IMapper _mapper;

        public LogradouroController(ILogradouroService logradouroService, IClienteService clienteService, IMapper mapper)
        {
            _logradouroService = logradouroService;
            _clienteService = clienteService;
            _mapper = mapper;
        }

        [HttpPost]
        [Route ("create")]
        public IActionResult Create([FromForm] LogradouroViewModel logradouroViewModel)
        {
            var cliente = _clienteService.Get(logradouroViewModel.ClienteId);
            if (cliente == null)
            {
                return NotFound($"Client not found");
            }

            var logradouro = _mapper.Map<Logradouro>(logradouroViewModel);
            _logradouroService.Create(logradouro);

            return Ok();
        }

        [HttpPut]
        [Route("edit")]
        public IActionResult Edit([FromForm] LogradouroViewModel logradouroViewModel)
        {
            try
            {
                var logradouro = _logradouroService.Get(logradouroViewModel.Id);

                if (logradouro == null)
                {
                    return NotFound(new { error = "Address not found" });
                }

                logradouroViewModel.ClienteId = (int)logradouro.ClienteId;

                _mapper.Map(logradouroViewModel, logradouro);

                _logradouroService.Edit(logradouro);

                return Ok();
            }
            catch (DbUpdateException ex)
            {
                var innerEx = ex.InnerException;
                if (innerEx is SqlException sqlEx && sqlEx.Number == 2627)
                {
                    return BadRequest(new { error = "SqlUE" });
                }
                else
                {
                    throw;
                }
            }

            return Ok();
        }

        /// <summary>
        /// Delete a address
        /// </summary>
        /// <param name="id">address id</param>
        /// <returns></returns>
        [HttpDelete]
        [Route("delete/{id}")]
        public IActionResult Delete(int id)
        {
            _logradouroService.Delete(id);

            return Ok();
        }

        /// <summary>
        /// Get a address
        /// </summary>
        /// <param name="id"> address id</param>
        /// <returns></returns>
        [HttpGet]
        [Route("get/{id}")]
        public IActionResult Get(int id)
        {
            var logradouro = _logradouroService.Get(id);

            if (logradouro == null)
            {
                return NotFound($"any address or client were found");
            }

            var cliente = _clienteService.Get((int)logradouro.ClienteId);

            var logradouroSetViewModel = _mapper.Map<LogradouroSetViewModel>(logradouro);

            logradouroSetViewModel.ClienteName = cliente.Name;

            return Ok(logradouroSetViewModel);
        }

        /// <summary>
        /// Get all logradouros from database
        /// </summary>
        /// <param name="pageNumber"> number of page</param>
        /// <param name="pageQuantity">how much addresses</param>
        /// <param name="order">c for crescent and d for descrescent</param>
        /// <returns></returns>
        [HttpGet]
        [Route("getall")]
        public IActionResult GetAll(int pageNumber, int pageQuantity, char order)
        {
            var logra = _logradouroService.GetAll(pageNumber, pageQuantity, order);
            var lograList = _mapper.Map<List<LogradouroViewModel>>(logra);
            var total = _logradouroService.CountAll();

            var response = new
            {
                addresses = lograList,
                Total = total
            };

            return Ok(response);
        }

        /// <summary>
        /// Get all logradouros from database
        /// </summary>
        /// <param name="pageNumber"> number of page</param>
        /// <param name="pageQuantity">how much addresses</param>
        /// <param name="order">c for crescent and d for descrescent</param>
        /// <returns></returns>
        [HttpGet]
        [Route("getbyclient/{id}")]
        public IActionResult GetByClient(int clientId)
        {
            var logra = _logradouroService.GetByClient(clientId);
            var lograList = _mapper.Map<List<LogradouroViewModel>>(logra);
            var total = _logradouroService.Count(clientId);

            var response = new
            {
                addresses = lograList,
                Total = total
            };

            return Ok(response);
        }


    }
}
