using Models;
using Core.Service;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Core;
using Service;
using Microsoft.AspNetCore.Authorization;
using Core.DTO;
using HeyRed.Mime;

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
        [HttpGet]
        [Route("images/{id}")]
        public IActionResult DownloadLogotipoImg(int id)
        {
            var cliente = _clienteService.Get(id);
            
            if (cliente == null)
            {
                return NotFound($"Cliente não encontrado");
            }
            else if (cliente.Logotipo == null)
            {
                return NotFound(new { msg = "CsLT" });
            }

            byte[] imagemBytes = System.IO.File.ReadAllBytes(cliente.Logotipo);
            var tipoConteudo = MimeTypesMap.GetMimeType(cliente.Logotipo);

            return File(imagemBytes, tipoConteudo);
        }

        [HttpGet]
        [Route("logotipoUrl/{id}")]
        public IActionResult GetLogotipoUrl(int id)
        {
            var cliente = _clienteService.Get(id);

            if (cliente == null)
            {
                return NotFound($"Cliente não encontrado");
            }

            return Ok(new { logotipoUrl = cliente.Logotipo }); // Supondo que cliente.Logotipo seja a URL do logotipo
        }

        /// <summary>
        /// Delete a client
        /// </summary>
        /// <param name="id">client id</param>
        /// <returns></returns>
        [HttpDelete]
        [Route("delete/{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var cliente = _clienteService.Get(id);
                if (cliente == null)
                {
                    return NotFound(); // Cliente não encontrado
                }

                var imgPath = Path.Combine("Storage", cliente.Logotipo);
                // Excluir a pasta que contém a imagem, se existir
                if (!string.IsNullOrEmpty(cliente.Logotipo) && Directory.Exists(imgPath))
                {
                    Directory.Delete(imgPath, true);
                }

                _clienteService.Delete(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
            
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
