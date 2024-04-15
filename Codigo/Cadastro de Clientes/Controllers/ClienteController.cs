using Models;
using Core.Service;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Core;

namespace Cadastro_de_Clientes.Controllers
{
    [ApiController]
    [Route("api/v1/cliente")]
    public class ClienteController : ControllerBase
    {
        private readonly IClienteService _clienteService;
        IMapper _mapper;

        public ClienteController(IClienteService clienteService, IMapper mapper)
        {
            _clienteService = clienteService;
            _mapper = mapper;
        }

        /// <summary>
        /// Add a new cliente on database
        /// </summary>
        /// <param name="cliente"> data </param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult Add(ClienteViewModel cliente)
        {
            var clienteCore = _mapper.Map<Cliente>(cliente);
            _clienteService.Create(clienteCore);

            return Ok();
        }

        /// <summary>
        /// Get all clientes from database
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult GetAll()
        {
            var clientes = _clienteService.GetAll();
            var clienteList = _mapper.Map<List<ClienteViewModel>>(clientes);
            
            return Ok(clienteList);
        }
    }
}
