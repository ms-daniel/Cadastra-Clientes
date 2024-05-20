using Core.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Service
{
    public interface ILogradouroService
    {
        int Create(Logradouro logradouro);
        void Edit(Logradouro logradouro);
        void Delete(int idLogradouro);
        Logradouro? Get(int idLogradouro);
        IEnumerable<Logradouro> GetByClient(int idClient);

        int Count(int idClient);

        int CountAll();

        IEnumerable<Logradouro> GetAll(int pageNumber, int pageQuantity, char order);
    }
}
