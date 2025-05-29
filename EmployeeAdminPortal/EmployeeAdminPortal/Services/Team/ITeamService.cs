using EmployeeAdminPortal.Models;
using Entities = EmployeeAdminPortal.Models.Entities;

namespace EmployeeAdminPortal.Services.Team
{
    public interface ITeamService
    {
        Task<bool> CreateTeam(CreateTeamDto model);
        Task<TeamDetailsDto[]> GetAllTeams();
        Task<Entities.Team> GetTeamById(Guid teamId);
        Task<Entities.Team> UpdateTeam(Guid teamId, UpdateTeamDto model);
        Task<bool> DeleteTeamById(Guid teamId);
        Task<Models.Entities.Team[]> GetTeamsByClubId(Guid clubId);
        Task<string?> UploadTeamImageAsync(Guid teamId, IFormFile file);
    }
}
