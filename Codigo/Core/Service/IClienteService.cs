using Core.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Service
{
    public interface IClienteService
    {
        int Create(Cliente cliente);
        void Edit(Cliente cliente);
        void Delete(int idCliente);
        Cliente? Get(int idCliente);

        IEnumerable<ClienteDTO> GetAll(int pageNumber, int pageQuantity);
    }
}
