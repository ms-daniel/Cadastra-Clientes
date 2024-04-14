using Core;
using Core.Service;
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
            throw new NotImplementedException();
        }

        public void Delete(int idCliente)
        {
            throw new NotImplementedException();
        }

        public void Edit(Cliente cliente)
        {
            throw new NotImplementedException();
        }

        public Cliente Get(int idCliente)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Cliente> GetAll()
        {
            throw new NotImplementedException();
        }
    }
}
