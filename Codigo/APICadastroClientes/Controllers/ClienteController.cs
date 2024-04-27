using Models;
using Core.Service;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Core;
using Service;
using Microsoft.AspNetCore.Authorization;
using Core.DTO;

namespace APICadastroClientes.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/client")]
    public class ClienteController : ControllerBase
    {
        private readonly IClienteService _clienteService;
        private IMapper _mapper;

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
        [Route("create")]
        public IActionResult Create([FromForm] ClientSetViewModel clienteViewModel)
        {
            var clienteDTO = _mapper.Map<ClienteDTO>(clienteViewModel);
            var cliente = _mapper.Map<Cliente>(clienteDTO);

            //storage img
            var imgPath = Path.Combine("Storage", clienteViewModel.Name);

            if (clienteViewModel.LogotipoImg != null)
            {
                if (!Directory.Exists(imgPath))
                {
                    Directory.CreateDirectory(imgPath);
                }

                imgPath = Path.Combine(imgPath, clienteViewModel.LogotipoImg.FileName);
                Stream fileStream = new FileStream(imgPath, FileMode.Create);


                clienteViewModel.LogotipoImg.CopyToAsync(fileStream);
                cliente.Logotipo = imgPath;
            }
            
            _clienteService.Create(cliente);

            return Ok();
        }

        /// <summary>
        /// Download a logotipo from client id
        /// </summary>
        /// <param name="id">id client</param>
        /// <returns></returns>
        [HttpPost]
        [Route("download/{id}")]
        public IActionResult DownloadLogotipoImg(int id)
        {
            var cliente = _clienteService.Get(id);
            
            if (cliente == null)
            {
                return NotFound($"Cliente não encontrado");
            }

            var dataBytes = System.IO.File.ReadAllBytes(cliente.Logotipo);

            return File(dataBytes, "Image/png");
        }

        /// <summary>
        /// Delete a client
        /// </summary>
        /// <param name="id">client id</param>
        /// <returns></returns>
        [HttpPost]
        [Route("delete/{id}")]
        public IActionResult Delete(int id)
        {
            _clienteService.Delete(id);
            return Ok();
        }

        /// <summary>
        /// Get one client
        /// </summary>
        /// <param name="id"> client id</param>
        /// <returns></returns>
        [HttpGet]
        [Route("get/{id}")]
        public IActionResult Get(int id)
        {
            var cliente = _clienteService.Get(id);

            if (cliente == null)
            {
                return NotFound($"Nenhum cliente encontrado");
            }

            var clienteViewModel = _mapper.Map<ClienteDTO>(cliente);

            return Ok(clienteViewModel);
        }

        /// <summary>
        /// Get all clients from database
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("getall")]
        public IActionResult GetAll(int pageNumber, int pageQuantity)
        {
            var clientes = _clienteService.GetAll(pageNumber, pageQuantity);
            var clienteList = _mapper.Map<List<ClientGetViewModel>>(clientes);
            
            return Ok(clienteList);
        }
    }
}
