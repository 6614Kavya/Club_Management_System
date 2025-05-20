using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using EmployeeAdminPortal.Models;
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
        private readonly UserManager<Entities.User> _userManager;
        private readonly SignInManager<Entities.User> _signInManager;

        public userController(IUserService userService, UserManager<Entities.User> userManager,
    SignInManager<Entities.User> signInManager)
        {
            _userService = userService;
            _userManager = userManager;
            _signInManager = signInManager;
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

        //[Authorize]
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

        [HttpGet("userDetails/{id}")]
        public async Task<ActionResult<UserRoleDetailsDto>> GetUserDetailsById(string id)
        {          
            var userDetails = await _userService.GetUserDetails(id);

            if (userDetails == null) return NotFound();

            return Ok(userDetails);
        }

        [HttpPost("assignClubAdmin")]
        public async Task<IActionResult> AssignClubAdminRole([FromBody] AssignRoleDto model)
        {
            var result = await _userService.AssignRole(model);

            return Ok(new { result });
        }

        [HttpPost("assignFieldAdmin")]
        public async Task<IActionResult> AssignFieldAdminRole([FromBody] AssignRoleDto model)
        {
            var result = await _userService.AssignRole(model);

            return Ok(new { result });
        }

        [HttpPost("assignTeamManger")]
        public async Task<IActionResult> AssignTeamManagerRole([FromBody] AssignRoleDto model)
        {
            var result = await _userService.AssignRole(model);

            return Ok(new { result });
        }

        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpPost("set-active-role")]
        public async Task<IActionResult> SetActiveRole([FromBody] ActiveRoleDto dto)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            var existingClaims = await _userManager.GetClaimsAsync(user);

            // Remove any previous context claims
            foreach (var claim in existingClaims.Where(c => c.Type == "ActiveRole" || c.Type == "ContextId"))
            {
                await _userManager.RemoveClaimAsync(user, claim);
            }

            // Add new role and context claims
            await _userManager.AddClaimAsync(user, new Claim("ActiveRole", dto.Role));

            if (dto.Role == "ClubAdmin" && dto.ClubId.HasValue)
                await _userManager.AddClaimAsync(user, new Claim("ContextId", dto.ClubId.Value.ToString()));
            else if (dto.Role == "FieldAdmin" && dto.FieldId.HasValue)
                await _userManager.AddClaimAsync(user, new Claim("ContextId", dto.FieldId.Value.ToString()));

            await _signInManager.SignInAsync(user, isPersistent: false);

            // generate and return new JWT
            var token = await _userService.CreateToken(user);

            return Ok(new { token });
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
