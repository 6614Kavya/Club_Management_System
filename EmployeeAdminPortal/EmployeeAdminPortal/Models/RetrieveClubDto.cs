namespace EmployeeAdminPortal.Models
{
    public class ClubDetailsDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string ShortName { get; set; }
        public string Address { get; set; }
        public string CountryCode { get; set; }
        public bool Activated { get; set; }
        public string? Description { get; set; }

        public List<ClubAdminDto> ClubAdmins { get; set; }
    }

    public class ClubAdminDto
    {
        public string UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
    }
}
