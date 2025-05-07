namespace EmployeeAdminPortal.Models
{
    public class CreateBookingDto
    {
        public Guid FieldPartId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string BookingStatus { get; set; } = "Pending";
    }
}
