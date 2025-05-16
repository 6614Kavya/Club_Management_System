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

        public async Task<bool> DeleteBookingByIdAsync(Guid id)
        {
            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null)
            {
                return false;
            }

            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Models.Entities.Booking[]> GetAllBookingsAsync()
        {
            return await _context.Bookings
                    .Include(b => b.FieldPart)
                        .ThenInclude(fp => fp.Field)
                    .ToArrayAsync();
        }

        public async Task<Models.Entities.Booking> GetBookingByIdAsync(Guid id)
        {
            return await _context.Bookings
                    .Include(b => b.FieldPart)
                        .ThenInclude(fp => fp.Field)
                    .FirstOrDefaultAsync(b => b.Id == id);
        }

        public async Task ValidateBookingConflictAsync(Guid fieldPartId, DateTime startTime, DateTime endTime)
        {
            if (startTime >= endTime)
            {
                throw new ArgumentException("Start time must be earlier than end time");
            }

            bool isOverlapping = await _context.Bookings.AnyAsync(b =>
                b.FieldPartId == fieldPartId &&
                ((startTime < b.EndTime) && (endTime > b.StartTime))
            );

            if (isOverlapping)
            {
                throw new InvalidOperationException("Time slot already booked");
            }
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

        public async Task<Models.Entities.Booking> UpdateBookingAsync(Guid id, CreateBookingDto createBookingDto)
        {
            var existingBooking = await _context.Bookings.FindAsync(id);
            if (existingBooking == null)
            {
                return null;
            }

            //Check for conflict before updating
            await ValidateBookingConflictAsync(createBookingDto.FieldPartId, createBookingDto.StartTime, createBookingDto.EndTime);

            existingBooking.FieldPartId = createBookingDto.FieldPartId;
            existingBooking.StartTime = createBookingDto.StartTime;
            existingBooking.EndTime = createBookingDto.EndTime;
            existingBooking.BookingPurpose = createBookingDto.BookingPurpose;

            await _context.SaveChangesAsync();
            return existingBooking;
        }

        //for super admins, club admins and field admins to accept bookings of individual users
        public async Task<bool> ConfirmBookingAsync(Guid bookingId)
        {
            var booking = await _context.Bookings.FindAsync(bookingId);
            if (booking == null || booking.BookingStatus != "Pending")
                return false;

            await ValidateBookingConflictAsync(booking.FieldPartId, booking.StartTime, booking.EndTime);

            booking.BookingStatus = "Accepted";
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Models.Entities.Booking[]> GetBookingsByFieldId(Guid fieldId)
        {
            var result = await _context.Bookings
                .Where(b => b.FieldPart.FieldId == fieldId)
                .ToListAsync();

            return result.ToArray();
        }
    }
}
