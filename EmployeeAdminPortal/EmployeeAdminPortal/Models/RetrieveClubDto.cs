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
        public string? ImageUrl { get; set; }

        public List<ClubAdminDto> ClubAdmins { get; set; }
        public List<FieldDto> FieldList { get; set; }
        public List<TeamDto> TeamList { get; set; }
    }

    public class ClubAdminDto
    {
        public string UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
    }

    public class FieldDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
    }

    public class TeamDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
    }
}
