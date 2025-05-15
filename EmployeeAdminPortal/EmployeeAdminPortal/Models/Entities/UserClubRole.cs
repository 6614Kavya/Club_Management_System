namespace EmployeeAdminPortal.Models.Entities
{
    public class UserClubRole
    {
        public string UserId { get; set; }
        public User User { get; set; }

        public Guid ClubId { get; set; }
        public Club Club { get; set; }

        public string Role { get; set; }
    }
}
