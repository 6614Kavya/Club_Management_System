using AutoMapper;
using EmployeeAdminPortal.Data;
using EmployeeAdminPortal.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeAdminPortal.Repositories.Field
{
    public class FieldRepository : IFieldRepository
    {
        private readonly ApplicationDBContext _context;
        private readonly IMapper _mapper;

        public FieldRepository(ApplicationDBContext applicationDBContext, IMapper mapper)
        {
            _context = applicationDBContext;
            _mapper = mapper;
        }
        public async Task<Models.Entities.Field> CreateFieldAsync(Models.Entities.Field createFieldDto)
        {
            Models.Entities.Field newField = createFieldDto;
            var result = _context.Fields.AddAsync(newField);

            await _context.SaveChangesAsync();
            return newField;

            //var result = await _context.SaveChangesAsync();
            //return result > 0;
        }

        public Task<bool> DeleteFieldByIdAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<Models.Entities.Field[]> GetAllFieldsAsync()
        {
            var result = await _context.Fields.ToListAsync();

            return result.ToArray();
        }

        public async Task<Models.Entities.Field> GetFieldByIdAsync(Guid id)
        {
            var result = await _context.Fields.FindAsync(id);

            return result;
        }

        public async Task<Models.Entities.Field> UpdateFieldAsync(Guid id, CreateFieldDto createFieldDto)
        {
            var existingField = await _context.Fields.FindAsync(id);

            if (existingField == null)
            {
                return null;
            }

            existingField = _mapper.Map<Models.Entities.Field>(createFieldDto);

            await _context.SaveChangesAsync();

            return existingField;
        }
    }
}
