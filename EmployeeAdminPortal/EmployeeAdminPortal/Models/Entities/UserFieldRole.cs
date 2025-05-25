namespace EmployeeAdminPortal.Models.Entities
{
    public class UserFieldRole
    {
        public string UserId { get; set; }
        public User User { get; set; }

        public Guid FieldId { get; set; }
        public Field Field { get; set; }

        public string Role { get; set; }
        public bool IsDeleted { get; set; } = false;
    }
}
