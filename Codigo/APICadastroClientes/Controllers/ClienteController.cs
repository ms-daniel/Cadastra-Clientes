using Models;
using Core.Service;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Core;
using Service;
using Microsoft.AspNetCore.Authorization;
using Core.DTO;
using HeyRed.Mime;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using Microsoft.IdentityModel.Tokens;

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
            var cliente = _mapper.Map<Cliente>(clienteViewModel);

            if (clienteViewModel.LogotipoImg != null)
            {
                //storage img
                var imgPath = Path.Combine("Storage", clienteViewModel.Name);

                if (!Directory.Exists(imgPath))
                {
                    Directory.CreateDirectory(imgPath);
                }

                imgPath = Path.Combine(imgPath, clienteViewModel.LogotipoImg.FileName);

                using (Stream fileStream = new FileStream(imgPath, FileMode.Create))
                {
                    clienteViewModel.LogotipoImg.CopyTo(fileStream);
                }

                cliente.Logotipo = imgPath;
            }
            try
            {
                _clienteService.Create(cliente);
            }
            catch (DbUpdateException ex)
            {
                var innerEx = ex.InnerException;
                if (innerEx is SqlException sqlEx && sqlEx.Number == 2627)
                {
                    return BadRequest(new { error = "SqlUE" } );
                }
                else
                {
                    throw;
                }
            }

            return Ok();
        }

        [HttpPut]
        [Route("edit")]
        public IActionResult Edit([FromForm] ClientSetViewModel clienteViewModel)
        {
            try
            {
                var clienteExistent = _clienteService.Get(clienteViewModel.Id);

                if (clienteExistent == null)
                {
                    return NotFound(new { error = "Client not found" });
                }

                if (clienteViewModel.LogotipoImg != null)
                {
                    var imgPath = Path.Combine("Storage", clienteExistent.Name);
                    var imgPathUpdate = Path.Combine("Storage", clienteViewModel.Name);

                    if (clienteViewModel.LogotipoImg != null && Directory.Exists(imgPath))
                    {
                        Directory.Delete(imgPath, true);
                    }

                    if (!Directory.Exists(imgPathUpdate))
                    {
                        Directory.CreateDirectory(imgPathUpdate);
                    }

                    imgPath = Path.Combine(imgPathUpdate, clienteViewModel.LogotipoImg.FileName);

                    using (Stream fileStream = new FileStream(imgPath, FileMode.Create))
                    {
                        clienteViewModel.LogotipoImg.CopyTo(fileStream);
                    }

                    clienteExistent.Logotipo = imgPath;
                }
                if(clienteExistent.Name != clienteViewModel.Name)
                {
                    clienteExistent.Name = clienteViewModel.Name;
                }
                if(clienteExistent.Email != clienteViewModel.Email)
                {
                    clienteExistent.Email = clienteViewModel.Email;
                }

                _clienteService.Edit(clienteExistent);

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
                return NoContent();
            }

            byte[] imagemBytes = System.IO.File.ReadAllBytes(cliente.Logotipo);
            var tipoConteudo = MimeTypesMap.GetMimeType(cliente.Logotipo);

            return File(imagemBytes, tipoConteudo);
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

                var imgPath = Path.Combine("Storage", cliente.Name);

                // Excluir a pasta que contém a imagem, se existir
                if ((cliente.Logotipo != null || cliente.Logotipo != "") && Directory.Exists(imgPath))
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
