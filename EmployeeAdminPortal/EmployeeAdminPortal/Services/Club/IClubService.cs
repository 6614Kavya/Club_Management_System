using EmployeeAdminPortal.Models;
using Microsoft.AspNetCore.Mvc;
using Entities = EmployeeAdminPortal.Models.Entities;

namespace EmployeeAdminPortal.Services.Club
{
    public interface IClubService
    {
        Task<bool> CreateClub(CreateClubDto model);
        Task<ClubDetailsDto[]> GetAllClubs();
        Task<ClubDetailsDto> GetClubById(Guid clubId);
        Task<Entities.Club> UpdateClub(Guid clubId, CreateClubDto model);
        Task<bool> DeleteClubById(Guid clubId);
    }
}
