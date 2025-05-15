using EmployeeAdminPortal.Models;
using Microsoft.AspNetCore.Mvc;
using Entities = EmployeeAdminPortal.Models.Entities;
namespace EmployeeAdminPortal.Repositories
{
    public interface IUserRepository
    {
        Task<UserRoleDetailsDto> GetUserByIdAsync (string id);
        Task<Entities.User> GetUserByEmailAsync(string email);
        Task<bool> CreateUserAsync (Entities.User user, string password);
        Task<bool> AssignRoles(AssignRoleDto assignRoleDto);
        Task<bool> CheckPasswordAsync (Entities.User user, string password);
    }
}
