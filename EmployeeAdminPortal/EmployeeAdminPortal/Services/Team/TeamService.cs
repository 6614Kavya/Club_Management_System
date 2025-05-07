using AutoMapper;
using EmployeeAdminPortal.Models;
using EmployeeAdminPortal.Models.Entities;
using EmployeeAdminPortal.Repositories.Club;
using EmployeeAdminPortal.Repositories.Team;

namespace EmployeeAdminPortal.Services.Team
{
    public class TeamService : ITeamService
    {
        private readonly ITeamRepository _teamRepository;
        private readonly IMapper _mapper;

        public TeamService(ITeamRepository teamRepository, IMapper mapper)
        {
            _teamRepository = teamRepository;
            _mapper = mapper;
        }
        public async Task<bool> CreateTeam(CreateTeamDto model)
        {
            var result = await _teamRepository.CreateTeamAsync(model);

            if (!result)
            {
                Console.WriteLine("Failed to create user");
            }

            return result;
        }

        public async Task<bool> DeleteTeamById(Guid teamId)
        {
            var result = await _teamRepository.DeleteTeamByIdAsync(teamId);

            return result;
        }

        public async Task<Models.Entities.Team[]> GetAllTeams()
        {
            var result = await _teamRepository.GetAllTeamsAsync();
            return result;
        }

        public async Task<Models.Entities.Team> GetTeamById(Guid teamId)
        {
            var result = await _teamRepository.GetTeamByIdAsync(teamId);
            return result;
        }

        public async Task<Models.Entities.Team> UpdateTeam(Guid teamId, CreateTeamDto model)
        {
            var result = await _teamRepository.UpdateTeamAsync(teamId, model);

            return result;
        }
    }
}
