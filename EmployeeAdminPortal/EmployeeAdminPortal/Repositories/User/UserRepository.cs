
//using EmployeeAdminPortal.Models.Entities;
using Entities = EmployeeAdminPortal.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using EmployeeAdminPortal.Models;
using AutoMapper;
using EmployeeAdminPortal.Data;

namespace EmployeeAdminPortal.Repositories.User
{
    public class UserRepository : IUserRepository
    {
        private readonly UserManager<Entities.User> _userManager;
        private readonly IMapper _mapper;
        private readonly ApplicationDBContext _dbContext;

        public UserRepository(UserManager<Entities.User> userManager, IMapper mapper, ApplicationDBContext dBContext)
        {
            _userManager = userManager;
            _mapper = mapper;
            _dbContext = dBContext;
        }
        public async Task<bool> CreateUserAsync(Entities.User user, string password)
        {
            var result = await _userManager.CreateAsync(user, password);
            await _userManager.AddToRoleAsync(user, "SuperAdmin");
            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    Console.WriteLine($"{error.Code}: {error.Description}");
                }
            }
            return result.Succeeded;
        }

        public async Task<bool> AssignRoles( AssignRoleDto assignRoleDto)
        {
            //var result = await _userManager.AddToRoleAsync(user, "SuperAdmin");
            //var user = await _userManager.FindByIdAsync(assignRoleDto.UserId);
            //if (user == null) return false;

            var allUserIds = _userManager.Users.Select(u => u.Id).ToList();
            Console.WriteLine("Known users:");
            foreach (var id in allUserIds)
                Console.WriteLine(id);

            var user = await _userManager.FindByIdAsync(assignRoleDto.UserId);
            if (user == null)
            {
                Console.WriteLine($"User not found with ID: {assignRoleDto.UserId}");
                return false;
            }


            //Add to ASP.NET Identity role
            if (!await _userManager.IsInRoleAsync(user, assignRoleDto.Role))
            {
                var identityResult = await _userManager.AddToRoleAsync(user, assignRoleDto.Role);
                if (!identityResult.Succeeded)
                    return false;
            }

            //Add custom role info
            if (assignRoleDto.Role == "ClubAdmin")
            {
                var alreadyExists = await _dbContext.UserClubRoles
                    .AnyAsync(r => r.UserId == assignRoleDto.UserId && r.ClubId == assignRoleDto.ClubId);

                if (!alreadyExists)
                {
                    var newClubAdmin = new Entities.UserClubRole
                    {
                        UserId = assignRoleDto.UserId,
                        ClubId = assignRoleDto.ClubId,
                        Role = assignRoleDto.Role
                    };
                    await _dbContext.UserClubRoles.AddAsync(newClubAdmin);
                }
            }
            else if (assignRoleDto.Role == "FieldAdmin")
            {
                var alreadyExists = await _dbContext.UserFieldRoles
                    .AnyAsync(r => r.UserId == assignRoleDto.UserId && r.FieldId == assignRoleDto.FieldId);

                if (!alreadyExists)
                {
                    var newFieldAdmin = new Entities.UserFieldRole
                    {
                        UserId = assignRoleDto.UserId,
                        FieldId = assignRoleDto.FieldId,
                        Role = assignRoleDto.Role
                    };
                    await _dbContext.UserFieldRoles.AddAsync(newFieldAdmin);
                }
            }
            else if (assignRoleDto.Role == "TeamManager")
            {
                var alreadyExists = await _dbContext.UserTeamRoles
                    .AnyAsync(r => r.UserId == assignRoleDto.UserId && r.TeamId == assignRoleDto.TeamId);

                if (!alreadyExists)
                {
                    var newTeamManager = new Entities.UserTeamRole
                    {
                        UserId = assignRoleDto.UserId,
                        TeamId = assignRoleDto.TeamId,
                        Role = assignRoleDto.Role
                    };
                    await _dbContext.UserTeamRoles.AddAsync(newTeamManager);
                }
            }
            else
            {
                return false;
            }
            
            var result = await _dbContext.SaveChangesAsync();

                return result>0;
        }

        public async Task<UserRoleDetailsDto> GetUserByIdAsync(string id)
        {
            //return await _userManager.FindByIdAsync(id);

            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return null;
            }

            var globalRoles = await _userManager.GetRolesAsync(user);

            var clubRoles = await _dbContext.UserClubRoles
                .Where(r => r.UserId == id)
                .Include(r => r.Club)
                .Select(r => new ClubRoleDto
                {
                    ClubId = r.ClubId,
                    ClubName = r.Club.Name,
                    Role = r.Role
                }
                ).ToListAsync();

            var fieldRoles = await _dbContext.UserFieldRoles
                .Where(r => r.UserId == id)
                .Include(r => r.Field)
                .Select(r => new FieldRoleDto
                {
                    FieldId = r.FieldId,
                    FieldName = r.Field.Name,
                    Role = r.Role
                }).ToListAsync();

            var teamRoles = await _dbContext.UserTeamRoles
                .Where(r => r.UserId == id)
                .Include(r => r.Team)
                .Select(r => new TeamRoleDto
                {
                    TeamId = r.TeamId,
                    TeamName = r.Team.Name,
                    Role = r.Role
                }).ToListAsync();

            return new UserRoleDetailsDto
            {
                UserId = id,
                email = user.Email,
                GlobalRoles = globalRoles.ToList(),
                ClubRoles = clubRoles.ToList(),
                FieldRoles = fieldRoles.ToList(),
                TeamRoles = teamRoles.ToList()
            };
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
