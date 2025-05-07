using AutoMapper;
using EmployeeAdminPortal.Models;
using EmployeeAdminPortal.Models.Entities;

namespace EmployeeAdminPortal.Mappings
{
    public class ClubProfile : Profile
    {
        public ClubProfile() { 

            CreateMap<CreateClubDto, Club>()
            .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null)); //skip null values and only overwrite the fields that have values

            CreateMap<CreateFieldDto, Field>()
            .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

            CreateMap<CreateTeamDto, Team>()
            .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

            CreateMap<CreateBookingDto, Booking>()
            .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
        }
    }
}
