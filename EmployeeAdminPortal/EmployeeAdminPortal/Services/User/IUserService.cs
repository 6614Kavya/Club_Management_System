using Microsoft.AspNetCore.Mvc;
using Entities = EmployeeAdminPortal.Models.Entities;

namespace EmployeeAdminPortal.Services.User
{
    public interface IUserService
    {
        Task<bool> RegisterUser (RegisterUserDto model);
        Task<string> SignInUser (SignInUserDto model);
        Task<Entities.User> GetUserDetails(string userId);
    }
}
