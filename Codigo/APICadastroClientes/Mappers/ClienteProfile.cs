using AutoMapper;
using Models;
using Core.DTO;
using Core;

namespace Mappers
{
    public class ClienteProfile : Profile 
    {
        public ClienteProfile()
        {
            CreateMap<ClientSetViewModel, ClienteDTO>().ReverseMap();
            CreateMap<ClientGetViewModel, ClienteDTO>().ReverseMap();
            CreateMap<ClientSetViewModel, Cliente>().ReverseMap();
            CreateMap<ClienteDTO, Cliente>().ReverseMap();
        }
    }
}
