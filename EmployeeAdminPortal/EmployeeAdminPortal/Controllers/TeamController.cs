using EmployeeAdminPortal.Models;
using EmployeeAdminPortal.Services.Team;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EmployeeAdminPortal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamController : ControllerBase
    {
        private readonly ITeamService _teamService;
        public TeamController(ITeamService teamService)
        {
            _teamService = teamService;
        }
        // GET: api/<TeamController>
        [HttpGet]
        public async Task<IActionResult> GetAllTeams()
        {
            var result = await _teamService.GetAllTeams();

            return Ok(result);
        }

        // GET api/<TeamController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTeamById(Guid id)
        {
            var result = await _teamService.GetTeamById(id);

            return Ok(result);
        }

        [HttpGet("{clubId}/teams")]
        public async Task<IActionResult> GetTeamByClubId(Guid clubId)
        {
            var result = await _teamService.GetTeamsByClubId(clubId);

            return Ok(result);
        }

        // POST api/<TeamController>
        [HttpPost]
        public async Task<IActionResult> CreateTeam(CreateTeamDto createTeamDto)
        {
            var result = await _teamService.CreateTeam(createTeamDto);

            return Ok(result);
        }

        // PUT api/<TeamController>/5
        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateTeam(Guid id, [FromBody] UpdateTeamDto updateTeamDto)
        {
            var result = await _teamService.UpdateTeam(id, updateTeamDto);

            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeam(Guid id)
        {
            var result = await _teamService.DeleteTeamById(id);

            return Ok(result);
        }

        [HttpPost("{teamId}/upload-image")]
        public async Task<IActionResult> UploadTeamImage([FromRoute] Guid teamId, IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            var result = await _teamService.UploadTeamImageAsync(teamId, file);

            if (result == null)
                return NotFound();

            return Ok(new { imageUrl = result });
        }
    }
}
