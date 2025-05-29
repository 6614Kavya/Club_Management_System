using EmployeeAdminPortal.Models;

namespace EmployeeAdminPortal.Repositories.Team
{
    public interface ITeamRepository
    {
        Task<bool> CreateTeamAsync(CreateTeamDto createTeamDto);
        Task<TeamDetailsDto[]> GetAllTeamsAsync();
        Task<Models.Entities.Team> GetTeamByIdAsync(Guid id);
        Task<Models.Entities.Team> UpdateTeamAsync(Guid id, UpdateTeamDto updateTeamDto);
        Task<bool> DeleteTeamByIdAsync(Guid id);
        Task<Models.Entities.Team[]> GetTeamsByClubId(Guid clubId);
    }
}
