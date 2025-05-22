using EmployeeAdminPortal.Models;

namespace EmployeeAdminPortal.Repositories.Club
{
    public interface IClubRepository
    {
        Task<bool> CreateClubAsync(CreateClubDto createClubDto);
        Task<ClubDetailsDto[]> GetAllClubsAsync();
        Task<ClubDetailsDto> GetClubByIdAsync(Guid id);
        Task<Models.Entities.Club> UpdateClubAsync(Guid id, UpdateClubDto createClubDto);
        Task<bool> DeleteClubByIdAsync(Guid id);
    }
}
