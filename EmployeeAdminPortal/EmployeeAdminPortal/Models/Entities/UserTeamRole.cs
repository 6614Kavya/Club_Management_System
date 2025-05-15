namespace EmployeeAdminPortal.Models.Entities
{
    public class UserTeamRole
    {
        public string UserId { get; set; }
        public User User { get; set; }

        public Guid TeamId { get; set; }
        public Team Team { get; set; }

        public string Role { get; set; }
    }
}
