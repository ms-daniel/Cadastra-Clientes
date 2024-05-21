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

        public IEnumerable<Logradouro> GetByClient(int pageNumber, int pageQuantity, char order, int idClient)
        {
            //var query = _context.Logradouros.Where(p => p.ClienteId == idClient).AsNoTracking();

            IQueryable<Logradouro> query = _context.Logradouros;

            query = order switch
            {
                'C' => query.OrderBy(logra => logra.Id),
                'D' => query.OrderByDescending(logra => logra.Id),
                _ => query.OrderBy(logra => logra.Id),
            };

            // Obter os clientes paginados
            var logras = query
                .AsNoTracking()
                .Where(p => p.ClienteId == idClient)
                .Skip((pageNumber - 1) * pageQuantity)
                .Take(pageQuantity)
                .ToList();

            return logras;
        }

        public int Count(int idClient)
        {
            return _context.Logradouros.AsNoTracking().Count(a => a.ClienteId == idClient);
        }

        public int CountAll()
        {
            return _context.Logradouros.Count();
        }

        public IEnumerable<Logradouro> GetAll(int pageNumber, int pageQuantity, char order)
        {
            IQueryable<Logradouro> query = _context.Logradouros;

            query = order switch
            {
                'C' => query.OrderBy(logra => logra.Id),
                'D' => query.OrderByDescending(logra => logra.Id),
                _ => query.OrderBy(logra => logra.Id),
            };

            // Obter os clientes paginados
            var logras = query
                .AsNoTracking()
                .Skip((pageNumber - 1) * pageQuantity)
                .Take(pageQuantity)
                .ToList();


            return logras;
        }
    }
}
