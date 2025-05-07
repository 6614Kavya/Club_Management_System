using EmployeeAdminPortal.Models;
using EmployeeAdminPortal.Models.Entities;
using EmployeeAdminPortal.Repositories.Field;

namespace EmployeeAdminPortal.Services.Field
{
    public class FieldService : IFieldService
    {
        private readonly IFieldRepository _fieldRepository;
        public FieldService(IFieldRepository fieldRepository)
        {
            _fieldRepository = fieldRepository;
        }
        public async Task<Models.Entities.Field> CreateField(CreateFieldDto model)
        {
            var field = new Models.Entities.Field {
                Address = model.Address,
                Name = model.Name,
                FieldPart = new List<FieldPart>()
            };

            for (int i = 0; i < 4; i++)
            {
                field.FieldPart.Add(new FieldPart
                {
                    Id = Guid.NewGuid(),
                    Name = model.Name,
                    IsBooked = false,
                    FieldId = field.Id,
                });
            }

            var result = await _fieldRepository.CreateFieldAsync(field);

            return field;
        }

        public Task<bool> DeleteFieldById(Guid fieldId)
        {
            throw new NotImplementedException();
        }

        public Task<Models.Entities.Field[]> GetAllFields()
        {
            throw new NotImplementedException();
        }

        public Task<Models.Entities.Field> GetFieldById(Guid fieldId)
        {
            throw new NotImplementedException();
        }

        public Task<Models.Entities.Field> UpdateField(Guid fieldId, CreateFieldDto model)
        {
            throw new NotImplementedException();
        }
    }
}
