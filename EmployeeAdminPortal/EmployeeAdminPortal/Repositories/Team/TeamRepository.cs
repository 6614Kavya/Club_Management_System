using AutoMapper;
using EmployeeAdminPortal.Data;
using EmployeeAdminPortal.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeAdminPortal.Repositories.Team
{
    public class TeamRepository : ITeamRepository
    {
        private readonly ApplicationDBContext _context;
        private readonly IMapper _mapper;

        public TeamRepository(ApplicationDBContext applicationDBContext, IMapper mapper)
        {
            _context = applicationDBContext;
            _mapper = mapper;
        }
        public async Task<bool> CreateTeamAsync(CreateTeamDto createTeamDto)
        {
            Models.Entities.Team newTeam = _mapper.Map<Models.Entities.Team>(createTeamDto);
            _context.Teams.Add(newTeam);

            var result = await _context.SaveChangesAsync();
            return result > 0;
        }

        public async Task<bool> DeleteTeamByIdAsync(Guid id)
        {
            var team = await _context.Teams.FindAsync(id);

            if (team == null)
            {
                return false;
            }

            team.IsDeleted = true;

            _context.SaveChanges();

            return true;
        }

        public async Task<TeamDetailsDto[]> GetAllTeamsAsync()
        {
            var teams = await _context.Teams
        .Select(t => new TeamDetailsDto
        {
            Id = t.Id,
            Name = t.Name,
            ClubId = t.ClubId,
            ClubName = t.Club.Name,
            TeamManagers = t.UserTeamRoles
                .Where(r => r.Role == "TeamManager")
                .Select(r => new TeamManagerDto
                {
                    UserId = r.UserId,
                    Name = r.User.Name,
                    Email = r.User.Email
                })
                .ToList()
        })
        .ToListAsync();

            return teams.ToArray();
        }

        public async Task<Models.Entities.Team> GetTeamByIdAsync(Guid id)
        {
            //var result = await _context.Fields.FindAsync(id);
            var team = await _context.Teams
                .FirstOrDefaultAsync(f => f.Id == id);

            return team;
        }

        public async Task<Models.Entities.Team[]> GetTeamsByClubId(Guid clubId)
        {
            var teams = await _context.Teams
                .Where(t => t.ClubId == clubId)
                .ToListAsync();

            return teams.ToArray();
        }

        public async Task<Models.Entities.Team> UpdateTeamAsync(Guid id, CreateTeamDto createTeamDto)
        {
            var existingTeam = await _context.Teams.FindAsync(id);

            if (existingTeam == null)
            {
                return null;
            }

            _mapper.Map(createTeamDto, existingTeam);

            await _context.SaveChangesAsync();

            return existingTeam;
        }
    }
}
