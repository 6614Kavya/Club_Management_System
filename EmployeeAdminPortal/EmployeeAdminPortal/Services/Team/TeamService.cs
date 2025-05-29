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
        private readonly IWebHostEnvironment _environment;

        public TeamService(ITeamRepository teamRepository, IMapper mapper, IWebHostEnvironment environment)
        {
            _teamRepository = teamRepository;
            _mapper = mapper;
            _environment = environment;
        }
        public async Task<bool> CreateTeam(CreateTeamDto model)
        {
            var result = await _teamRepository.CreateTeamAsync(model);

            if (!result)
            {
                Console.WriteLine("Failed to create team");
            }

            return result;
        }

        public async Task<bool> DeleteTeamById(Guid teamId)
        {
            var result = await _teamRepository.DeleteTeamByIdAsync(teamId);

            return result;
        }

        public async Task<TeamDetailsDto[]> GetAllTeams()
        {
            var result = await _teamRepository.GetAllTeamsAsync();

            return result;
        }

        public async Task<Models.Entities.Team> GetTeamById(Guid teamId)
        {
            var result = await _teamRepository.GetTeamByIdAsync(teamId);

            return result;
        }

        public async Task<Models.Entities.Team[]> GetTeamsByClubId(Guid clubId)
        {
            var result = await _teamRepository.GetTeamsByClubId(clubId);

            return result;
        }

        public async Task<Models.Entities.Team> UpdateTeam(Guid teamId, UpdateTeamDto model)
        {
            var result = await _teamRepository.UpdateTeamAsync(teamId, model);

            return result;
        }

        public async Task<string?> UploadTeamImageAsync(Guid teamId, IFormFile file)
        {
            var team = await _teamRepository.GetTeamByIdAsync(teamId);
            if (team == null)
                return null;

            var folderPath = Path.Combine(_environment.WebRootPath, "images", "teams");
            Directory.CreateDirectory(folderPath);

            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
            var filePath = Path.Combine(folderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var relativePath = $"/images/teams/{fileName}";
            team.ImageUrl = relativePath;

            var updateDto = new UpdateTeamDto
            {
                Name = team.Name,
                ImageUrl = team.ImageUrl,
            };

            await _teamRepository.UpdateTeamAsync(teamId, updateDto);

            return relativePath;
        }
    }
}
