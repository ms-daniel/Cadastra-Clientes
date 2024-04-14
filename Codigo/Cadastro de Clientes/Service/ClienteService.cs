using Core;
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

        public ClienteService(DesafioCadastroContext context)
        {
            _context = context;
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

        public IEnumerable<Cliente> GetAll()
        {
            return _context.Clientes.AsNoTracking();
        }
    }
}
