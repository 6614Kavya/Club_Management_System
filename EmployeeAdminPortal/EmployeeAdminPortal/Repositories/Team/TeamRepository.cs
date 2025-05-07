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

        public Task<bool> DeleteTeamByIdAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<Models.Entities.Team[]> GetAllTeamsAsync()
        {
            var result = await _context.Teams.ToListAsync();

            return result.ToArray();
        }

        public async Task<Models.Entities.Team> GetTeamByIdAsync(Guid id)
        {
            var result = await _context.Teams.FindAsync(id);

            return result;
        }

        public async Task<Models.Entities.Team> UpdateTeamAsync(Guid id, CreateTeamDto createTeamDto)
        {
            var existingTeam = await _context.Teams.FindAsync(id);

            if (existingTeam == null)
            {
                return null;
            }

            existingTeam = _mapper.Map<Models.Entities.Team>(createTeamDto);

            await _context.SaveChangesAsync();

            return existingTeam;
        }
    }
}
