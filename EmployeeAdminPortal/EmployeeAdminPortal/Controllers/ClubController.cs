using EmployeeAdminPortal.Models;
using EmployeeAdminPortal.Services.Club;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeAdminPortal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClubController : ControllerBase
    {
        private readonly IClubService _clubService;

        public ClubController(IClubService clubService)
        {
            _clubService = clubService;
        }

        // GET: api/<TeamController>
        [HttpGet("clubs")]
        public async Task<IActionResult> GetAllClubs()
        {
            var result = await _clubService.GetAllClubs();

            return Ok(result);
        }

        // GET api/<TeamController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetClubById(Guid id)
        {
            var result = await _clubService.GetClubById(id);

            return Ok(result);
        }

        // POST api/<TeamController>
        [HttpPost("createClub")]
        public async Task<IActionResult> CreateClub ([FromBody]CreateClubDto createClubDto)
        {
            var result = await _clubService.CreateClub(createClubDto);

            if (result) return Ok(new { succeeded = true });
            else return BadRequest(new { succeeded = false });
        }

        [HttpGet("getClubAdmins/{id}")]
        public async Task<IActionResult> GetClubAdmins(Guid id)
        {
            var result = await _clubService.GetClubById(id);

            return Ok(result);
        }

        // PUT api/<TeamController>/5
        [HttpPatch("updateClub/{id}")]
        public async Task<IActionResult> UpdateClub(Guid id, [FromBody] UpdateClubDto createClubDto)
        {
            var result = await _clubService.UpdateClub(id, createClubDto);

            return Ok(result);
        }

        // DELETE api/<TeamController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClub(Guid id)
        {
            var result = await _clubService.DeleteClubById(id);

            return Ok(result);
        }

        [HttpPost("{clubId}/upload-image")]
        public async Task<IActionResult> UploadClubImage([FromRoute] Guid clubId, IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            var result = await _clubService.UploadClubImageAsync(clubId, file);

            if (result == null)
                return NotFound();

            return Ok(new { imageUrl = result });
        }


    }
}
