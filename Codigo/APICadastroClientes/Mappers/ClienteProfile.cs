using AutoMapper;
using Models;
using Core.DTO;

namespace Mappers
{
    public class ClienteProfile : Profile 
    {
        public ClienteProfile()
        {
            CreateMap<ClientSetViewModel, ClienteDTO>().ReverseMap();
            CreateMap<ClientGetViewModel, ClienteDTO>().ReverseMap();
        }
    }
}
