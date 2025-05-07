using AutoMapper;
using EmployeeAdminPortal.Data;
using EmployeeAdminPortal.Models;
using EmployeeAdminPortal.Models.Entities;
using EmployeeAdminPortal.Repositories.Booking;

namespace EmployeeAdminPortal.Services.Booking
{
    public class BookingService : IBookingService
    {
        private readonly IBookingRepository _bookingRepository;
        private readonly IMapper _mapper;
        private readonly ApplicationDBContext _dbContext;
        public BookingService(IBookingRepository bookingRepository, IMapper mapper, ApplicationDBContext applicationDBContext) 
        {
            _bookingRepository = bookingRepository;
            _mapper = mapper;
            _dbContext = applicationDBContext;
        }
        public async Task<Models.Entities.Booking> CreateBooking(CreateBookingDto model)
        {
            // Check field part existence
            var fieldPart = await _dbContext.FieldParts.FindAsync(model.FieldPartId);
            if (fieldPart == null)
                throw new Exception("Invalid field part");

            // Conflict check
            bool hasConflict = await _bookingRepository.HasConflictAsync(model.FieldPartId, model.StartTime, model.EndTime);
            if (hasConflict)
                throw new Exception("Time slot already booked");

            // Create booking entity
            //var booking = new Models.Entities.Booking
            //{
            //    Id = Guid.NewGuid(),
            //    FieldPartId = model.FieldPartId,
            //    StartTime = model.StartTime,
            //    EndTime = model.EndTime,
            //    BookingStatus = "Pending",
            //    //CreatedAt = DateTime.UtcNow
            //};

            return await _bookingRepository.CreateBookingAsync(model);
        }

        public async Task<bool> DeleteBookingById(Guid bookingId)
        {
            var result = await _bookingRepository.DeleteBookingByIdAsync(bookingId);

            return result;
        }

        public async Task<Models.Entities.Booking[]> GetAllBookings()
        {
            var result = await _bookingRepository.GetAllBookingsAsync();
            return result;
        }

        public async Task<Models.Entities.Booking> GetBookingById(Guid bookingId)
        {
            var result = await _bookingRepository.GetBookingByIdAsync(bookingId);
            return result;
        }

        public async Task<Models.Entities.Booking> UpdateBooking(Guid bookingId, CreateBookingDto model)
        {
            var result = await _bookingRepository.UpdateBookingAsync(bookingId, model);

            return result;
        }
    }
}
