namespace EmployeeAdminPortal.Models
{
    public class AssignRoleDto
    {
        public string UserId { get; set; }
        public Guid ClubId { get; set; }
        public Guid FieldId { get; set; }
        public Guid TeamId { get; set; }
        public string Role { get; set; }
    }
}
