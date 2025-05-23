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

            //model.StartTime = DateTime.SpecifyKind(model.StartTime, DateTimeKind.Utc);
            //model.EndTime = DateTime.SpecifyKind(model.EndTime, DateTimeKind.Utc);

            model.StartTime = TimeZoneInfo.ConvertTimeToUtc(model.StartTime);
            model.EndTime = TimeZoneInfo.ConvertTimeToUtc(model.EndTime);


            // Conflict check
            await _bookingRepository.ValidateBookingConflictAsync(model.FieldPartId, model.StartTime, model.EndTime);

            model.BookingStatus = "Pending";

            return await _bookingRepository.CreateBookingAsync(model);
            //if (hasConflict)
            //    throw new Exception("Time slot already booked");

            //if (hasConflict)
            //{
            //    throw new Exception("Time slot already booked");
            //}
            //else
            //{
            //    return await _bookingRepository.CreateBookingAsync(model);
            //}

            
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

        public async Task<Models.Entities.Booking[]> GetBookingByFieldId(Guid fieldId)
        {
            var result = await _bookingRepository.GetBookingsByFieldId(fieldId);
            return result;
        }

        public async Task<Models.Entities.Booking> GetBookingById(Guid bookingId)
        {
            var result = await _bookingRepository.GetBookingByIdAsync(bookingId);
            return result;
        }

        public async Task<Models.Entities.Booking[]> GetBookingByStatusAsync(string status)
        {
            return await _bookingRepository.GetBookingByStatusAsync(status);
        }

        public async Task<Models.Entities.Booking> UpdateBooking(Guid bookingId, CreateBookingDto model)
        {
            var result = await _bookingRepository.UpdateBookingAsync(bookingId, model);

            return result;
        }

        public async Task<bool> UpdateBookingStatus(Guid bookingId, string newStatus)
        {
            return await _bookingRepository.UpdateBookingStatusAsync(bookingId, newStatus);
        }

    }
}
