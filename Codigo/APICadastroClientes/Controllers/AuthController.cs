using Cadastro_de_Clientes.Services;
using Microsoft.AspNetCore.Mvc;
using Core;

namespace Cadastro_de_Clientes.Controllers
{
    [ApiController]
    [Route("api/v1/auth")]
    public class AuthController : Controller
    {
        [HttpPost]
        public IActionResult Auth(string username, string password)
        {
            if (username == "desafio" && password == "123456")
            {
                var token = TokenService.GenerateToken(new Cliente());
                return Ok(token);
            }

            return BadRequest("Usuário ou senha inválido");
        }
    }
}
