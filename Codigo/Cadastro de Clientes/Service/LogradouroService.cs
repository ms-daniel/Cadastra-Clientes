using Core;
using Core.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    internal class LogradouroService : ILogradouroService
    {
        private readonly DesafioCadastroContext _context;

        public LogradouroService (DesafioCadastroContext context)
        {
            _context = context;
        }

        public int Create(Logradouro logradouro)
        {
            throw new NotImplementedException();
        }

        public void Delete(int idLogradouro)
        {
            throw new NotImplementedException();
        }

        public void Edit(Logradouro logradouro)
        {
            throw new NotImplementedException();
        }

        public Logradouro Get(int idLogradouro)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Logradouro> GetAll()
        {
            throw new NotImplementedException();
        }
    }
}
