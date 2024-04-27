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
            // Obter os clientes paginados
            var clientes = _context.Clientes
                .Skip((pageNumber - 1) * pageQuantity)
                .Take(pageQuantity)
                .ToList(); // Materializar os dados do banco de dados

            // Mapear os clientes para DTOs
            var clientesDTO = clientes.Select(cliente =>
            {
                // Contar o número de logradouros para este cliente
                int numLogradouros = _logradouroService.Count(cliente.Id);

                // Criar o DTO do cliente
                return new ClienteDTO
                {
                    Id = cliente.Id,
                    Name = cliente.Name,
                    Email = cliente.Email,
                    Logotipo = cliente.Logotipo,
                    Addresses = numLogradouros
                };
            });

            return clientesDTO.ToList(); // Converte para lista
        }

    }
}
