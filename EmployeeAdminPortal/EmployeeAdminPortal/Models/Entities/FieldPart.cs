namespace EmployeeAdminPortal.Models.Entities
{
    public class FieldPart
    {
        public Guid Id { get; set; }
        public int Bitmask { get; set; }
        public Boolean IsBooked { get; set; }
        public Guid FieldId { get; set; }
        public Field Field { get; set; }
    }
}
