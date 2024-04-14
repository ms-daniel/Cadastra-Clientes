using System.ComponentModel.DataAnnotations;

namespace Cadastro_de_Clientes.Model
{
    public class Cliente
    {
        [Key]
        public int id { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string logotipo { get; set; }

    }
}
