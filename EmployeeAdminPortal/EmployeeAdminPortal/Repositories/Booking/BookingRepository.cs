using AutoMapper;
using EmployeeAdminPortal.Data;
using EmployeeAdminPortal.Models;
using EmployeeAdminPortal.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace EmployeeAdminPortal.Repositories.Booking
{
    public class BookingRepository : IBookingRepository
    {
        private readonly ApplicationDBContext _context;
        private readonly IMapper _mapper;
        public BookingRepository(ApplicationDBContext applicationDBContext, IMapper mapper)
        {
            _context = applicationDBContext;
            _mapper = mapper;
        }
        public async Task<Models.Entities.Booking> CreateBookingAsync(CreateBookingDto createBookingDto)
        {
            Models.Entities.Booking newBooking = _mapper.Map<Models.Entities.Booking>(createBookingDto);
            await _context.Bookings.AddAsync(newBooking);
            await _context.SaveChangesAsync();
            return newBooking;

        }

        public Task<bool> DeleteBookingByIdAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<Models.Entities.Booking[]> GetAllBookingsAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Models.Entities.Booking> GetBookingByIdAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> HasConflictAsync(Guid fieldPartId, DateTime startTime, DateTime endTime)
        {
            return await _context.Bookings.AnyAsync(b =>
            b.FieldPartId == fieldPartId &&
            endTime < startTime); ;
        }

        public async Task<IEnumerable<Models.Entities.Booking>> GetBookingsByFieldPartAsync(Guid fieldPartId)
        {
            return await _context.Bookings
                .Where(b => b.FieldPartId == fieldPartId)
                .ToListAsync();
        }

        public Task<Models.Entities.Booking> UpdateBookingAsync(Guid id, CreateBookingDto createBookingDto)
        {
            throw new NotImplementedException();
        }
    }
}
