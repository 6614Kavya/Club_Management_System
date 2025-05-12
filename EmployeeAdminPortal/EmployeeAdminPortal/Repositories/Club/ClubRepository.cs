using System;
using AutoMapper;
using EmployeeAdminPortal.Data;
using EmployeeAdminPortal.Models;
using EmployeeAdminPortal.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeAdminPortal.Repositories.Club
{
    public class ClubRepository : IClubRepository
    {
        private readonly ApplicationDBContext _context;
        private readonly IMapper _mapper;
        public ClubRepository(ApplicationDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<bool> CreateClubAsync(CreateClubDto createClubDto)
        {
            
            Models.Entities.Club newClub = _mapper.Map<Models.Entities.Club>(createClubDto);
            await _context.Clubs.AddAsync(newClub);

            var result = await _context.SaveChangesAsync();
            return result > 0;
        }

        public async Task<Models.Entities.Club[]> GetAllClubsAsync()
        {
            var result = await _context.Clubs
        .Include(c => c.FieldList) // related fields
        .Include(c => c.TeamList)
        .ToListAsync();

            return result.ToArray();
        }

        public async Task<Models.Entities.Club> GetClubByIdAsync(Guid id)
        {
            var result = await _context.Clubs.FindAsync(id);

            return result;
        }

        public async Task<Models.Entities.Club> UpdateClubAsync(Guid Id, CreateClubDto createClubDto)
        {
            var existingClub = await _context.Clubs.FindAsync(Id);

            if (existingClub == null)
            {
                return null;
            }

            existingClub = _mapper.Map<Models.Entities.Club>(createClubDto);

            await _context.SaveChangesAsync();

            return existingClub;
        }

        public async Task<bool> DeleteClubByIdAsync(Guid id)
        {
            var club = await _context.Clubs.FindAsync(id);

            if (club == null) {
                return false;
            }

            _context.Clubs.Remove(club);
            _context.SaveChanges();

            return true;
        }

    }
}
