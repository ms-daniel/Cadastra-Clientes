using AutoMapper;
using Models;
using Core;

namespace Mappers
{
    public class ClienteProfile : Profile 
    {
        public ClienteProfile()
        {
            CreateMap<ClienteViewModel, Cliente>().ReverseMap();
        }
    }
}
