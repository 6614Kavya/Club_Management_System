using AutoMapper;
using EmployeeAdminPortal.Models.Entities;
using EmployeeAdminPortal.Models;

namespace EmployeeAdminPortal.Mappings
{
    public class ClunManagementProfile : Profile
    {
        public ClunManagementProfile()
        {
            CreateMap<CreateClubDto, Club>()
            .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null)); //skip null values and only overwrite the fields that have values

            CreateMap<CreateFieldDto, Field>()
            .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

            CreateMap<CreateTeamDto, Team>()
            .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

            CreateMap<CreateBookingDto, Booking>()
            .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

            CreateMap<AssignRoleDto, UserClubRole>()
            .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

            CreateMap<AssignRoleDto, UserFieldRole>()
            .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

            CreateMap<AssignRoleDto, UserTeamRole>()
            .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
        }
    }
}
