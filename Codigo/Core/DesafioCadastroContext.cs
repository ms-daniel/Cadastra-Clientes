using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Core;

public partial class DesafioCadastroContext : DbContext
{
    public DesafioCadastroContext()
    {
    }

    public DesafioCadastroContext(DbContextOptions<DesafioCadastroContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Cliente> Clientes { get; set; }

    public virtual DbSet<Logradouro> Logradouros { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=localhost;Database=CADASTRO_CLIENTES;User=sa;Password=manager;Trusted_Connection=False;TrustServerCertificate=True;"); //connection string

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Cliente>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Clientes__3214EC27F94C8745");

            entity.HasIndex(e => e.Email, "UQ__Clientes__A9D105340637FC7A").IsUnique();

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Email).HasMaxLength(255);
            entity.Property(e => e.Logotipo).HasMaxLength(255);
            entity.Property(e => e.Nome).HasMaxLength(255);
        });

        modelBuilder.Entity<Logradouro>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Logradou__3214EC278F16CC7F");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Bairro).HasMaxLength(100);
            entity.Property(e => e.Cep)
                .HasMaxLength(20)
                .HasColumnName("CEP");
            entity.Property(e => e.Cidade).HasMaxLength(100);
            entity.Property(e => e.ClienteId).HasColumnName("Cliente_ID");
            entity.Property(e => e.Estado).HasMaxLength(100);
            entity.Property(e => e.Numero).HasMaxLength(50);
            entity.Property(e => e.Rua).HasMaxLength(255);

            entity.HasOne(d => d.Cliente).WithMany(p => p.Logradouros)
                .HasForeignKey(d => d.ClienteId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__Logradour__Clien__3A81B327");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
