using EmployeeAdminPortal.Models;

namespace EmployeeAdminPortal.Repositories.Field
{
    public interface IFieldRepository
    {
        Task<Models.Entities.Field> CreateFieldAsync(Models.Entities.Field field);
        Task<Models.Entities.Field[]> GetAllFieldsAsync();
        Task<Models.Entities.Field> GetFieldByIdAsync(Guid id);
        Task<Models.Entities.Field[]> GetFieldsByClubId(Guid clubId);
        Task<Models.Entities.Field> UpdateFieldAsync(Guid id, CreateFieldDto createFieldDto);
        Task<bool> DeleteFieldByIdAsync(Guid id);
    }
}
