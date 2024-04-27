using Core;
using Core.DTO;
using Core.Service;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class ClienteService : IClienteService
    {
        private readonly DesafioCadastroContext _context;
        private readonly ILogradouroService _logradouroService;

        public ClienteService(DesafioCadastroContext context, ILogradouroService logradouroService)
        {
            _context = context;
            _logradouroService = logradouroService;
        }

        public int Create(Cliente cliente)
        {
            _context.Add(cliente);
            _context.SaveChanges();

            return cliente.Id;
        }

        public void Delete(int idCliente)
        {
            var _cliente = _context.Clientes.Find(idCliente);
            _context.Remove(_cliente);
            _context.SaveChanges();

        }

        public void Edit(Cliente cliente)
        {
            _context.Update(cliente);
            _context.SaveChanges();
        }

        public Cliente Get(int idCliente)
        {
            return _context.Clientes.Find(idCliente);
        }

        public IEnumerable<ClienteDTO> GetAll(int pageNumber, int pageQuantity)
        {
            return _context.Clientes.Skip(pageNumber * pageQuantity)
                .Take(pageQuantity)
                .Select(b =>
                new ClienteDTO()
                {
                    Id = b.Id,
                    Name = b.Name,
                    Email = b.Email,
                    Logotipo = b.Logotipo,
                    Addresses = _logradouroService.Count(b.Id)
                }).ToList();
        }
    }
}
