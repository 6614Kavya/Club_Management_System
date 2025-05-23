
using EmployeeAdminPortal.Repositories;
using Entities = EmployeeAdminPortal.Models.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using EmployeeAdminPortal.Models;

namespace EmployeeAdminPortal.Services.User
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;
        private readonly UserManager<Entities.User> _userManager;
        public UserService(IUserRepository userRepository, IConfiguration configuration, UserManager<Entities.User> userManager)
        {
            _userRepository = userRepository;
            _configuration = configuration;
            _userManager = userManager;
        }

        public async Task<string> AssignRole(AssignRoleDto model)
        {
            var result = await _userRepository.AssignRoles(model);

            return result
        ? "Role assigned successfully."
        : "Failed to assign role.";
        }

        public async Task<UserRoleDetailsDto> GetUserDetails(string userId)
        {
            //string userID = User.Claims.First(x => x.Type == "UserID").Value;
            var userDetails = await _userRepository.GetUserByIdAsync(userId);
            return (userDetails);
        }

        public async Task<bool> RegisterUser(RegisterUserDto model)
        {
            var user = new Entities.User
            {
                UserName = model.Email,
                Email = model.Email,
                Name = model.Email,
                Password = model.Password
            };
            var result = await _userRepository.CreateUserAsync(user, model.Password);
            //await _userRepository.AssignRoles(user);

            if (!result)
            {
                Console.WriteLine("Failed to create user");
            }

            return result;
        }

        public async Task<string> SignInUser(SignInUserDto model)
        {
            var user = await _userRepository.GetUserByEmailAsync(model.Email);

            if (user != null && await _userRepository.CheckPasswordAsync(user, model.Password))
            {
                // Get user roles
                var roles = await _userManager.GetRolesAsync(user);
                var roleClaims = roles.Select(r => new Claim(ClaimTypes.Role, r));

                // Base claims
                var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.UserName ?? user.Email ?? ""),
        }.Union(roleClaims);

                // Generate signing key
                var signInKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                             _configuration["AppSettings:JWTSecret"]!));

                // Create token
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    // Data for payload
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.UtcNow.AddDays(10),

                    // Sign-in key and the encryption algorithm
                    SigningCredentials = new SigningCredentials(
                        signInKey,
                        SecurityAlgorithms.HmacSha256
                    )
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken); // encrypted token

                return token;
            }
            else return null;
        }

        public async Task<string> CreateToken(Entities.User user)
        {
            // 1. Fetch role-based claims
            var roles = await _userManager.GetRolesAsync(user);
            var roleClaims = roles.Select(r => new Claim(ClaimTypes.Role, r));

            // 2. Fetch custom claims (e.g., ActiveRole, ContextId)
            var userClaims = await _userManager.GetClaimsAsync(user);

            // 3. Base identity claims
            var claims = new List<Claim>
    {
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        new Claim(ClaimTypes.Name, user.UserName ?? user.Email ?? "")
    }
            .Union(roleClaims)
            .Union(userClaims); // 👈 Merge custom claims here

            // 4. Generate signing key
            var signInKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configuration["AppSettings:JWTSecret"]!)
            );

            // 5. Create token descriptor
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(10),
                SigningCredentials = new SigningCredentials(signInKey, SecurityAlgorithms.HmacSha256)
            };

            // 6. Create and return token
            var tokenHandler = new JwtSecurityTokenHandler();
            var securityToken = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(securityToken);
        }

        public async Task<List<UserSummaryDto>> GetAllUsers()
        {
            //string userID = User.Claims.First(x => x.Type == "UserID").Value;
            return await _userRepository.GetAllUsersAsync();
        }


    }
}
