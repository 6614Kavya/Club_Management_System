namespace EmployeeAdminPortal.Models.Entities
{
    public class UserClub
    {
        public User User { get; set; }
        public string UserId { get; set; }

        public Club Club { get; set; }
        public Guid ClubId { get; set; }
    }
}
