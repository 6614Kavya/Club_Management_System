using AutoMapper;
using EmployeeAdminPortal.Models;
using EmployeeAdminPortal.Repositories.Club;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeAdminPortal.Services.Club
{
    public class ClubService : IClubService
    {
        private readonly IClubRepository _clubRepository;
        private readonly IMapper _mapper;

        public ClubService(IClubRepository clubRepository, IMapper mapper)
        {
            _clubRepository = clubRepository;
            _mapper = mapper;
        }
        public async Task<bool> CreateClub(CreateClubDto model)
        {
            var result = await _clubRepository.CreateClubAsync(model);

            if (!result)
            {
                Console.WriteLine("Failed to create user");
            }

            return result;
        }

        public async Task<ClubDetailsDto[]> GetAllClubs()
        {
            var result = await _clubRepository.GetAllClubsAsync();
            return result;
        }

        public async Task<ClubDetailsDto> GetClubById(Guid clubId)
        {
            var result = await _clubRepository.GetClubByIdAsync(clubId);
            return result;
        }

        public async Task<Models.Entities.Club> UpdateClub(Guid clubId, UpdateClubDto model)
        {
            var result = await _clubRepository.UpdateClubAsync(clubId, model);

            return result;
        }

        public async Task<bool> DeleteClubById(Guid clubId)
        {
            var result = await _clubRepository.DeleteClubByIdAsync(clubId);

            return result;
        }


    }
}
