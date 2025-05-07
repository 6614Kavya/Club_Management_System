namespace EmployeeAdminPortal.Models.Entities
{
    public class Booking
    {
        public Guid Id { get; set; }
        public Guid FieldPartId { get; set; }  //foreign key
        public FieldPart FieldPart { get; set; }  //navigation property

        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string BookingStatus { get; set; }
    }
}
