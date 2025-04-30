
//using EmployeeAdminPortal.Models.Entities;
using Entities = EmployeeAdminPortal.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeAdminPortal.Repositories.User
{
    public class UserRepository : IUserRepository
    {
        private readonly UserManager<Entities.User> _userManager;

        public UserRepository(UserManager<Entities.User> userManager)
        {
            _userManager = userManager;
        }
        public async Task<bool> CreateUserAsync(Entities.User user, string password)
        {
            var result = await _userManager.CreateAsync(user, password);
            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    Console.WriteLine($"{error.Code}: {error.Description}");
                }
            }
            return result.Succeeded;
        }

        public async Task<Entities.User> GetUserByIdAsync(string id)
        {
            return await _userManager.FindByIdAsync(id);
            
        }

        public async Task<Entities.User> GetUserByEmailAsync(string email)
        {
            return await _userManager.FindByEmailAsync(email);
        }

        public async Task<bool> CheckPasswordAsync(Entities.User user, string password)
        {
            return await _userManager.CheckPasswordAsync(user, password);
        }
    }
}
