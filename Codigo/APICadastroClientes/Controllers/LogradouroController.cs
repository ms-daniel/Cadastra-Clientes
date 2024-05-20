using AutoMapper;
using Core;
using Core.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
        [Route ("/create")]
        public IActionResult Create([FromForm] LogradouroViewModel logradouroViewModel)
        {
            var cliente = _clienteService.Get(logradouroViewModel.ClienteId);
            if (cliente == null)
            {
                return NotFound($"Cliente não encontrado");
            }

            var logradouro = _mapper.Map<Logradouro>(logradouroViewModel);
            _logradouroService.Create(logradouro);

            return Ok();
        }

        /// <summary>
        /// Delete a address
        /// </summary>
        /// <param name="id">address id</param>
        /// <returns></returns>
        [HttpPost]
        [Route("delete/{id}")]
        public IActionResult Delete(int id)
        {
            _logradouroService.Delete(id);

            return Ok();
        }

        /// <summary>
        /// Get a address
        /// </summary>
        /// <param name="id"> client id</param>
        /// <returns></returns>
        [HttpGet]
        [Route("get/{id}")]
        public IActionResult Get(int id)
        {
            var logradouro = _logradouroService.Get(id);

            if (logradouro == null)
            {
                return NotFound($"Nenhum logradouro encontrado");
            }

            var logradouroViewModel = _mapper.Map<LogradouroViewModel>(logradouro);

            return Ok(logradouroViewModel);
        }

        /// <summary>
        /// Get all logradouros from database
        /// </summary>
        /// <param name="pageNumber"> number of page</param>
        /// <param name="pageQuantity">how much clients</param>
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


    }
}
