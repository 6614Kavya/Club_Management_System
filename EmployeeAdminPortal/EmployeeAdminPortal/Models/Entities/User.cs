using Microsoft.AspNetCore.Identity;

namespace EmployeeAdminPortal.Models.Entities
{
    public class User : IdentityUser
    {
        //public Guid Id { get; set; }
        public string Name { get; set; }
        //public string Email { get; set; }
        public string Password { get; set; }
        //public ICollection<Club> Clubs { get; set; }
        //public ICollection<Field> Fields { get; set; }
        //public ICollection<Team> Teams { get; set; }

        public ICollection<UserClub> UserClubs { get; set; }
        public ICollection<UserField> UserFields { get; set; }
        public ICollection<UserTeam> UserTeams { get; set; }
    }
}
