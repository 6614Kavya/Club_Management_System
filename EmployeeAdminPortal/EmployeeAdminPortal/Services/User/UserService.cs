
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

namespace EmployeeAdminPortal.Services.User
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;
        public UserService(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }

        public async Task<Entities.User> GetUserDetails(string userId)
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
                var signInKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                            _configuration["AppSettings:JWTSecret"]!));

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    //Data for payload
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserID", user.Id.ToString()),
                    }),
                    Expires = DateTime.UtcNow.AddDays(10),

                    //SignIn key and the encryption algorithm
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
    }
}
