using AutoMapper;
using Core;
using Core.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace Cadastro_de_Clientes.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/v1/logradouro")]
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
        /// Get all clients from database
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("getall")]
        public IActionResult GetAll()
        {
            var logradouros = _logradouroService.GetAll();
            var logradouroList = _mapper.Map<List<LogradouroViewModel>>(logradouros);

            return Ok(logradouroList);
        }


    }
}
