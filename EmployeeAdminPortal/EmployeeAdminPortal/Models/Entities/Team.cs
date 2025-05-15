namespace EmployeeAdminPortal.Models.Entities
{
    public class Team
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }

        //one to many with Club
        public Club Club { get; set; }
        public Guid ClubId { get; set; }
        //public ICollection<UserTeam> UserTeams { get; set; }
        public ICollection<UserTeamRole> UserTeamRoles { get; set; }

    }
}
