namespace EmployeeAdminPortal.Models
{
    public class BookingDto
    {
        public Guid Id { get; set; }
        public string BookingPurpose { get; set; }
        public string BookingStatus { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }

        public Guid FieldPartId { get; set; }
        public string FieldName { get; set; }

        public Guid? TeamId { get; set; }
        public string TeamName { get; set; }
    }

}
