using AutoMapper;
using Core;
using Models;

namespace Mappers
{
    public class LogradouroProfile : Profile
    {
        public LogradouroProfile()
        { 
            CreateMap<LogradouroViewModel, Logradouro>().ReverseMap();
        }
    }
}
