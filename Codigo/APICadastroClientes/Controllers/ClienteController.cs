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
        public IActionResult Add([FromForm] ClienteViewModel clienteViewModel)
        {
            //storage img
            var imgPath = Path.Combine("Storage", clienteViewModel.Nome);

            if (!Directory.Exists(imgPath))
            {
                Directory.CreateDirectory(imgPath);
            }

            imgPath = Path.Combine(imgPath , clienteViewModel.LogotipoImg.FileName);
            Stream fileStream = new FileStream(imgPath, FileMode.Create);


            clienteViewModel.LogotipoImg.CopyToAsync(fileStream);

            var cliente = _mapper.Map<Cliente>(clienteViewModel);
            cliente.Logotipo = imgPath;

            _clienteService.Create(cliente);

            return Ok();
        }

        [HttpPost]
        [Route("{id}/download")]
        public IActionResult DownloadLogotipoImg(int id)
        {
            var clienteImg = _clienteService.Get(id);
            var dataBytes = System.IO.File.ReadAllBytes(clienteImg.Logotipo);

            return File(dataBytes, "Image/png");
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
