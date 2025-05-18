using EmployeeAdminPortal.Models;
using Entities = EmployeeAdminPortal.Models.Entities;

namespace EmployeeAdminPortal.Services.Booking
{
    public interface IBookingService
    {
        Task<Entities.Booking> CreateBooking(CreateBookingDto model);
        Task<Entities.Booking[]> GetAllBookings();
        Task<Entities.Booking> GetBookingById(Guid bookingId);
        Task<Entities.Booking[]> GetBookingByFieldId(Guid fieldId);
        Task<Entities.Booking> UpdateBooking(Guid bookingId, CreateBookingDto model);
        Task<bool> UpdateBookingStatus(Guid bookingId, string newStatus);
        Task<bool> DeleteBookingById(Guid bookingId);
    }
}
