namespace EmployeeAdminPortal.Models.Entities
{
    public class Field
    {
    
        public Guid Id { get; set; }
        public string Name { get; set; }
        public ICollection<UserField> UserFields { get; set; }
    }
}
