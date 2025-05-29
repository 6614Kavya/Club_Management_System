using EmployeeAdminPortal.Models;
using EmployeeAdminPortal.Services.Field;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeAdminPortal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FieldController : ControllerBase
    {
        private readonly IFieldService _fieldService;
        public FieldController(IFieldService fieldService) 
        {
            _fieldService = fieldService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllFields()
        {
            var result = await _fieldService.GetAllFields();

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetFieldById(Guid id) 
        {
            var result = await _fieldService.GetFieldById(id);  
            
            return Ok(result);
        }

        [HttpGet("{clubId}/fields")]
        public async Task<IActionResult> GetFieldByClubId(Guid clubId)
        {
            var result = await _fieldService.GetFieldsByClubId(clubId);

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateField(CreateFieldDto createFieldDto)
        {
            var result = await _fieldService.CreateField(createFieldDto);

            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteField(Guid id)
        {
            var result = await _fieldService.DeleteFieldById(id);

            return Ok(result);
        }

        [HttpPost("{fieldId}/upload-image")]
        public async Task<IActionResult> UploadFieldImage([FromRoute] Guid fieldId, IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            var result = await _fieldService.UploadFieldImageAsync(fieldId, file);

            if (result == null)
                return NotFound();

            return Ok(new { imageUrl = result });
        }
    }
}
