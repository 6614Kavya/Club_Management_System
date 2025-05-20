using EmployeeAdminPortal.Models;
using Microsoft.AspNetCore.Mvc;
using Entities = EmployeeAdminPortal.Models.Entities;

namespace EmployeeAdminPortal.Services.User
{
    public interface IUserService
    {
        Task<bool> RegisterUser (RegisterUserDto model);
        Task<string> SignInUser (SignInUserDto model);
        Task<string> AssignRole(AssignRoleDto model);
        Task<UserRoleDetailsDto> GetUserDetails(string userId);
        Task<string> CreateToken(Entities.User user);
    }
}
