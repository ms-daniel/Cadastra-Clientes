using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Models;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace APICadastroClientes.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IConfiguration _config;

        public LoginController(IConfiguration config)
        {
            _config = config;
        }

        [HttpPost]
        public IActionResult Post(string? username, string? password, [FromBody] LoginModel? model)
        {
            if (model != null && model.Username != "" && !model.Username.Equals("string"))
            {
                username = model.Username;
                password = model.Password;
            }
            //your logic for login process
            //If login usrename and password are correct then proceed to generate token
            if(username == "desafio" && password == "123456")
            {
                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                var Sectoken = new JwtSecurityToken(_config["Jwt:Issuer"],
                  _config["Jwt:Issuer"],
                  null,
                  expires: DateTime.Now.AddMinutes(120),
                  signingCredentials: credentials);

                var token = new JwtSecurityTokenHandler().WriteToken(Sectoken);

                return Ok(new { token = token});
            } else
            {
                return BadRequest( new { fromServer = "Usuario ou senha incorretos" });
            }
        }
    }
}