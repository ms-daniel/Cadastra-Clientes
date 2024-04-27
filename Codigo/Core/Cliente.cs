using System;
using System.Collections.Generic;

namespace Core;

public partial class Cliente
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? Logotipo { get; set; }

    public virtual ICollection<Logradouro> Logradouros { get; set; } = new List<Logradouro>();
}
