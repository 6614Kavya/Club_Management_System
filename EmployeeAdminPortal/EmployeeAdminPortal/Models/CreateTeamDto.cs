namespace EmployeeAdminPortal.Models
{
    public class CreateTeamDto
    {
        public required string Name { get; set; }
        public Guid ClubId { get; set; }

    }
}
