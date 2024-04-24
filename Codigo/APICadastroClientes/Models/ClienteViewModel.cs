using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class ClienteViewModel
    {
        [Required]
        public string Nome { get; set; }
        [Required]
        public string Email { get; set; }

        public IFormFile LogotipoImg { get; set; }

    }
}
