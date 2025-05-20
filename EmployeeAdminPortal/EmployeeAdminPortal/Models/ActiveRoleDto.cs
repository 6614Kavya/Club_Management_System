namespace EmployeeAdminPortal.Models
{
    public class ActiveRoleDto
    {
        public string Role { get; set; } 
        public Guid? ClubId { get; set; }
        public Guid? FieldId { get; set; }
        public Guid? TeamId { get; set; }
    }
}
