using EmployeeAdminPortal.Models;
using Entities = EmployeeAdminPortal.Models.Entities;

namespace EmployeeAdminPortal.Services.Team
{
    public interface ITeamService
    {
        Task<bool> CreateTeam(CreateTeamDto model);
        Task<Entities.Team[]> GetAllTeams();
        Task<Entities.Team> GetTeamById(Guid teamId);
        Task<Entities.Team> UpdateTeam(Guid teamId, CreateTeamDto model);
        Task<bool> DeleteTeamById(Guid teamId);
    }
}
