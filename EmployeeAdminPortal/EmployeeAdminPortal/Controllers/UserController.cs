using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using EmployeeAdminPortal.Services.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Entities = EmployeeAdminPortal.Models.Entities;

namespace EmployeeAdminPortal.Controllers
{
    
    [ApiController]
    [Route("api/[controller]")]
    public class userController : ControllerBase
    {
        //private readonly UserManager<IdentityUser> _userManager;
        //private readonly IConfiguration _configuration;
        private readonly IUserService _userService;

        public userController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> CreateUser([FromBody] RegisterUserDto model)
        {
            if (!ModelState.IsValid) {
                return BadRequest(ModelState);
            }

            var result = await _userService.RegisterUser(model);

            if (result) return Ok(new { succeeded = true });
            else return BadRequest(new { succeeded = false });
        }

        [HttpPost("signin")]
        public async Task<IActionResult> SignInUser([FromBody] SignInUserDto model)
        {
            var token = await _userService.SignInUser(model);
            if (token == null) return BadRequest("Username or password is incorrect");

            return Ok(new { token });
        }

        [Authorize]
        [HttpGet("userDetails")]
        public async Task<ActionResult<Entities.User>> GetUserDetails()
        {
            //string userID = User.Claims.First(x => x.Type == "UserID").Value;
            //var userDetails = await _userService.GetUserDetails(userID);
            //return userDetails;

            var userIdClaim = User.Claims.FirstOrDefault(x => x.Type == "UserID");
            if (userIdClaim == null) return Unauthorized();

            string userID = userIdClaim.Value;
            var userDetails = await _userService.GetUserDetails(userID);

            if (userDetails == null) return NotFound();

            return Ok(userDetails);
        }
    }
}

public class RegisterUserDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [MinLength(6)]
    public string Password { get; set; }
}

public class SignInUserDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [MinLength(6)]
    public string Password { get; set; }
}
