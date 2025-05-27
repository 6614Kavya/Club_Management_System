namespace EmployeeAdminPortal.Models.Entities
{
    public class Booking
    {
        public Guid Id { get; set; }
        public Guid FieldPartId { get; set; }  //foreign key
        public FieldPart FieldPart { get; set; }  //navigation property

        //public DateOnly SelectedDate { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string BookingStatus { get; set; } = "Pending";
        public string BookingPurpose { get; set; }

        public Guid? TeamId { get; set; }
        public Team? Team { get; set; }

    }
}
