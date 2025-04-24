using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace EmployeeAdminPortal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IConfiguration _configuration;

        public UserController(UserManager<IdentityUser> userManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> CreateUser([FromBody] RegisterUserDto model)
        {
            if (!ModelState.IsValid) {
                return BadRequest(ModelState);
            }

            var user = new IdentityUser
            {
                UserName = model.Email,
                Email = model.Email,
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                return Ok(new { succeeded = true });
            }

            else {
                return BadRequest(new {succeeded = false, errors = result.Errors});
            }
        }

        [HttpPost("signin")]
        public async Task<IActionResult> SignInUser([FromBody] SignInUserDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
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

                return Ok(new { token });
            }
            else return BadRequest("Username or password is incorrect");
        }
    }
}

public class RegisterUserDto
{
    public string Email { get; set; }
    public string Password { get; set; }
}

public class SignInUserDto
{
    public string Email { get; set; }
    public string Password { get; set; }
}
