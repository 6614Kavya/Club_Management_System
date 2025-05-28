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
        private readonly IWebHostEnvironment _environment;

        public ClubService(IClubRepository clubRepository, IMapper mapper, IWebHostEnvironment environment)
        {
            _clubRepository = clubRepository;
            _mapper = mapper;
            _environment = environment;
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

        public async Task<string?> UploadClubImageAsync(Guid clubId, IFormFile file)
        {
            var club = await _clubRepository.GetClubByIdAsync(clubId);
            if (club == null)
                return null;

            var folderPath = Path.Combine(_environment.WebRootPath, "images", "clubs");
            Directory.CreateDirectory(folderPath);

            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
            var filePath = Path.Combine(folderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var relativePath = $"/images/clubs/{fileName}";
            club.ImageUrl = relativePath;

            var updateDto = new UpdateClubDto
            {
                Name = club.Name,
                ShortName = club.ShortName,
                Address = club.Address,
                CountryCode = club.CountryCode,
                Description = club.Description,
                Activated = club.Activated,
                ImageUrl = club.ImageUrl,
            };

            await _clubRepository.UpdateClubAsync(clubId, updateDto);

            return relativePath;
        }


    }
}
