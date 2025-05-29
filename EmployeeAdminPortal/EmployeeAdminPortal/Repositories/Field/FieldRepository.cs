using AutoMapper;
using EmployeeAdminPortal.Data;
using EmployeeAdminPortal.Models;
using EmployeeAdminPortal.Models.Entities;
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

        public async Task<bool> DeleteFieldByIdAsync(Guid id)
        {
            var field = await _context.Fields.FindAsync(id);

            if (field == null)
            {
                return false;
            }

            field.IsDeleted = true;

            _context.SaveChanges();

            return true;
        }

        public async Task<FieldDetailsDto[]> GetAllFieldsAsync()
        {
            var fields = await _context.Fields
        .Select(f => new FieldDetailsDto
        {
            Id = f.Id,
            Name = f.Name,
            Address = f.Address,
            Description = f.Description,
            HasLighting = f.HasLighting,
            HasHeating = f.HasHeating,
            ClubId = f.ClubId,
            ClubName= f.Club.Name,
            FieldAdmins = f.UserFieldRoles
                .Where(r => r.Role == "FieldAdmin")
                .Select(r => new FieldAdminDto
                {
                    UserId = r.UserId,
                    Name = r.User.Name,
                    Email = r.User.Email
                })
                .ToList()
        })
        .ToListAsync();

            return fields.ToArray();
        }

        public async Task<Models.Entities.Field> GetFieldByIdAsync(Guid id)
        {
            //var result = await _context.Fields.FindAsync(id);
            var field = await _context.Fields
                .Include(f => f.FieldPart)
                .FirstOrDefaultAsync(f => f.Id == id);

            return field;
        }

        public async Task<Models.Entities.Field[]> GetFieldsByClubId(Guid clubId)
        {
            var fields = await _context.Fields
                .Include(f => f.FieldPart)
                .Where(f => f.ClubId == clubId)
                .ToListAsync();

            return fields.ToArray();
        }

        public async Task<Models.Entities.Field> UpdateFieldAsync(Guid id, UpdateFieldDto updateFieldDto)
        {
            var existingField = await _context.Fields.FindAsync(id);

            if (existingField == null)
            {
                return null;
            }

            _mapper.Map(updateFieldDto, existingField);

            await _context.SaveChangesAsync();

            return existingField;
        }
    }
}
