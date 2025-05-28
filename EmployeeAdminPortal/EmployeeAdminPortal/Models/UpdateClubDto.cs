namespace EmployeeAdminPortal.Models
{
    public class UpdateClubDto
    {
        public string? Name { get; set; }
        public string? ShortName { get; set; }
        public string? Address { get; set; }
        public string? Description { get; set; }
        public string? CountryCode { get; set; }
        public bool? Activated { get; set; } // Must be nullable
        public string? ImageUrl { get; set; }
    }

}
