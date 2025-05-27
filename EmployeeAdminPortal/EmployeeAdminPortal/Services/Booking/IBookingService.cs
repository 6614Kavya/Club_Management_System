using EmployeeAdminPortal.Models;
using Entities = EmployeeAdminPortal.Models.Entities;

namespace EmployeeAdminPortal.Services.Booking
{
    public interface IBookingService
    {
        Task<Entities.Booking> CreateBooking(CreateBookingDto model);
        Task<BookingDto[]> GetAllBookings();
        Task<Entities.Booking> GetBookingById(Guid bookingId);
        Task<BookingDto[]> GetBookingByFieldId(Guid fieldId);
        Task<BookingDto[]> GetFilteredBookingByFieldId(Guid fieldId, string status);

        Task<Entities.Booking> UpdateBooking(Guid bookingId, CreateBookingDto model);
        Task<bool> UpdateBookingStatus(Guid bookingId, string newStatus);
        Task<bool> DeleteBookingById(Guid bookingId);
        Task<Entities.Booking[]> GetBookingByStatusAsync(string status);
        Task<BookingDto[]> GetBookingByTeamId(Guid teamId);
        Task<BookingDto[]> GetFilteredBookingByTeamId(Guid teamId, string status);

    }
}
