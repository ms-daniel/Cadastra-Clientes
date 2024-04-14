using System.ComponentModel.DataAnnotations;

namespace Cadastro_de_Clientes.Model
{
    public class ClienteModel
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; private set; }
        public string Email { get; private set; }
        public string Logotipo { get; private set; }

        public ClienteModel(string name, string email, string logotipo)
        {
            this.Name = name;
            this.Email = email;
            this.Logotipo = logotipo;
        }

    }
}
