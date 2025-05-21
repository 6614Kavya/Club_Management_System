using EmployeeAdminPortal.Models;
using Entities = EmployeeAdminPortal.Models.Entities;


namespace EmployeeAdminPortal.Services.Field
{
    public interface IFieldService
    {
        Task<Models.Entities.Field> CreateField(CreateFieldDto model);
        Task<FieldDetailsDto[]> GetAllFields();
        Task<Entities.Field> GetFieldById(Guid fieldId);
        Task<Entities.Field[]> GetFieldsByClubId(Guid clubId);
        Task<Entities.Field> UpdateField(Guid fieldId, CreateFieldDto model);
        Task<bool> DeleteFieldById(Guid fieldId);
    }
}
