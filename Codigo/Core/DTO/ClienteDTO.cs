using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTO
{
    public class ClienteDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public string Email { get; set; }

        public string Logotipo { get; set; }

        public int Addresses { get; set; }
    }
}
