namespace EmployeeAdminPortal.Models
{
    public class CreateClubDto
    {
        //public Guid Id { get; set; }
        public required string Name { get; set; }
        public string ShortName { get; set; }
        public string Address { get; set; }
        public string? Description { get; set; }
        public string CountryCode { get; set; }
        public Boolean Activated { get; set; }

    }
}
