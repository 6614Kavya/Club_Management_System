using EmployeeAdminPortal.Models;

namespace EmployeeAdminPortal.Repositories.Booking
{
    public interface IBookingRepository
    {
        Task<Models.Entities.Booking> CreateBookingAsync(CreateBookingDto createBookingDto);
        Task<Models.Entities.Booking[]> GetAllBookingsAsync();
        Task<Models.Entities.Booking> GetBookingByIdAsync(Guid id);
        Task<bool> ConfirmBookingAsync(Guid bookingId);
        Task<Models.Entities.Booking> UpdateBookingAsync(Guid id, CreateBookingDto createBookingDto);
        Task<bool> DeleteBookingByIdAsync(Guid id);
        Task ValidateBookingConflictAsync(Guid fieldPartId, DateTime startTime, DateTime endTime);
        Task<bool> HasConflictAsync(Guid fieldPartId, DateTime startTime, DateTime endTime);
        Task<IEnumerable<Models.Entities.Booking>> GetBookingsByFieldPartAsync(Guid fieldPartId);
        Task<Models.Entities.Booking[]> GetBookingsByFieldId(Guid fieldId);
    }
}
