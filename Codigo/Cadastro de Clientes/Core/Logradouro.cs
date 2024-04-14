using System;
using System.Collections.Generic;

namespace Core;

public partial class Logradouro
{
    public int Id { get; set; }

    public int? ClienteId { get; set; }

    public string Rua { get; set; } = null!;

    public string? Numero { get; set; }

    public string? Bairro { get; set; }

    public string Cidade { get; set; } = null!;

    public string Estado { get; set; } = null!;

    public string Cep { get; set; } = null!;

    public virtual Cliente? Cliente { get; set; }
}
