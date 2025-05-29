using AutoMapper;
using EmployeeAdminPortal.Models;
using EmployeeAdminPortal.Models.Entities;
using EmployeeAdminPortal.Repositories.Field;

namespace EmployeeAdminPortal.Services.Field
{
    public class FieldService : IFieldService
    {
        private readonly IFieldRepository _fieldRepository;
        private readonly IWebHostEnvironment _environment;
        private readonly IMapper _mapper;
        public FieldService(IFieldRepository fieldRepository, IWebHostEnvironment environment, IMapper mapper)
        {
            _fieldRepository = fieldRepository;
            _environment = environment;
            _mapper = mapper;
        }
        public async Task<Models.Entities.Field> CreateField(CreateFieldDto model)
        {
            var field = new Models.Entities.Field
            {
                ClubId = model.ClubId,
                Address = model.Address,
                Name = model.Name,
                FieldPart = new List<FieldPart>()
            };

            int[] bitMasks = [0b0001, 0b0010, 0b0100, 0b1000, 0b0011, 0b1100, 0b1111];

            for (int i = 0; i < 7; i++)
            {
                field.FieldPart.Add(new FieldPart
                {
                    Id = Guid.NewGuid(),
                    Bitmask = bitMasks[i],
                    IsBooked = false,
                    FieldId = field.Id, 
                });
            }

            var result = await _fieldRepository.CreateFieldAsync(field);

            return field;
        }

        public async Task<bool> DeleteFieldById(Guid fieldId)
        {
            var result = await _fieldRepository.DeleteFieldByIdAsync(fieldId);

            return result;
        }

        public async Task<FieldDetailsDto[]> GetAllFields()
        {
            var result = await _fieldRepository.GetAllFieldsAsync();

            return result;
        }

        public async Task<Models.Entities.Field> GetFieldById(Guid fieldId)
        {
            var result = await _fieldRepository.GetFieldByIdAsync(fieldId);

            return result;
        }

        public async Task<Models.Entities.Field[]> GetFieldsByClubId(Guid clubId)
        {
            var result = await _fieldRepository.GetFieldsByClubId(clubId);

            return result;
        }

        public async Task<Models.Entities.Field> UpdateField(Guid fieldId, UpdateFieldDto model)
        {
            var result = await _fieldRepository.UpdateFieldAsync(fieldId, model);

            return result;
        }

        public async Task<string?> UploadFieldImageAsync(Guid fieldId, IFormFile file)
        {
            var field = await _fieldRepository.GetFieldByIdAsync(fieldId);
            if (field == null)
                return null;

            var folderPath = Path.Combine(_environment.WebRootPath, "images", "fields");
            Directory.CreateDirectory(folderPath);

            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
            var filePath = Path.Combine(folderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var relativePath = $"/images/fields/{fileName}";
            field.ImageUrl = relativePath;

            var updateDto = new UpdateFieldDto
            {
                Name = field.Name,
                Address = field.Address,
                Description = field.Description,
                ImageUrl = field.ImageUrl,
            };

            await _fieldRepository.UpdateFieldAsync(fieldId, updateDto);

            return relativePath;
        }
    }
}