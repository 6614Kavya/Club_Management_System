namespace EmployeeAdminPortal.Models
{
    public class CreateFieldDto
    {
        public required string Name { get; set; }
        public required string Address { get; set; }
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }
        public Guid ClubId { get; set; }
        public string[]? Facilities { get; set; }
        public Boolean HasLighting { get; set; }
        public Boolean HasHeating { get; set; }
    }
}
