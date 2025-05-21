namespace EmployeeAdminPortal.Models
{
    public class FieldDetailsDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string? Description { get; set; }
        public bool HasLighting { get; set; }
        public bool HasHeating { get; set; }

        public Guid ClubId { get; set; }
        public string ClubName { get; set; }

        public List<FieldAdminDto> FieldAdmins { get; set; }
    }

    public class FieldAdminDto
    {
        public string UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
    }
}
