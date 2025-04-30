namespace EmployeeAdminPortal.Models.Entities
{
    public class Club
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public ICollection<UserClub> UserClubs { get; set; }
    }
}
