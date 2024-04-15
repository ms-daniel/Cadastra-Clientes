using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class ClienteViewModel
    {
        public string Nome { get; set; }
        public string Email { get; set; }

        public IFormFile LogotipoImg { get; set; }

    }
}
