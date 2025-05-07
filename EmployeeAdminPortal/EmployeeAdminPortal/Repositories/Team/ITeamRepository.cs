using EmployeeAdminPortal.Models;

namespace EmployeeAdminPortal.Repositories.Team
{
    public interface ITeamRepository
    {
        Task<bool> CreateTeamAsync(CreateTeamDto createTeamDto);
        Task<Models.Entities.Team[]> GetAllTeamsAsync();
        Task<Models.Entities.Team> GetTeamByIdAsync(Guid id);
        Task<Models.Entities.Team> UpdateTeamAsync(Guid id, CreateTeamDto createTeamDto);
        Task<bool> DeleteTeamByIdAsync(Guid id);
    }
}
