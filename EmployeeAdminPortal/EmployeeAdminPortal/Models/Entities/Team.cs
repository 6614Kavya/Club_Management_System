namespace EmployeeAdminPortal.Models.Entities
{
    public class Team
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public ICollection<UserTeam> UserTeams { get; set; }
    }
}
