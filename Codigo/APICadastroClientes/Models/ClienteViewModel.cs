using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class ClientSetViewModel
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }

        public IFormFile LogotipoImg { get; set; }

    }

    public class ClientGetViewModel
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public string Email { get; set; }

        public string Logotipo { get; set; }

        public int Addresses { get; set; }

    }
}
