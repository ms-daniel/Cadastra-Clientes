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
    public class LogradouroService : ILogradouroService
    {
        private readonly DesafioCadastroContext _context;

        public LogradouroService (DesafioCadastroContext context)
        {
            _context = context;
        }

        public int Create(Logradouro logradouro)
        {
            _context.Add(logradouro);
            _context.SaveChanges();

            return logradouro.Id;
        }

        public void Delete(int idLogradouro)
        {
            var _logradouro = _context.Logradouros.Find(idLogradouro);
            _context.Remove(_logradouro);
            _context.SaveChanges();
        }

        public void Edit(Logradouro logradouro)
        {
            _context.Update(logradouro);
            _context.SaveChanges();
        }

        public Logradouro Get(int idLogradouro)
        {
            return _context.Logradouros.Find(idLogradouro);
        }

        public IEnumerable<Logradouro> GetAll()
        {
            return _context.Logradouros.AsNoTracking();
        }
    }
}
