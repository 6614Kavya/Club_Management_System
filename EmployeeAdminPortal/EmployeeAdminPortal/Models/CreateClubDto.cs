namespace EmployeeAdminPortal.Models
{
    public class CreateClubDto
    {
        //public Guid Id { get; set; }
        public required string Name { get; set; }
        public string? Description { get; set; }
        public int CountryCode { get; set; }
    }
}
