using AutoMapper;
using Models;
using Core;

namespace Mappers
{
    public class ClienteProfile : Profile 
    {
        public ClienteProfile()
        {
            CreateMap<ClientSetViewModel, Cliente>().ReverseMap();
            CreateMap<ClientGetViewModel, Cliente>().ReverseMap();
        }
    }
}
