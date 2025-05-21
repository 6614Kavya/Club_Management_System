namespace EmployeeAdminPortal.Models
{
    public class TeamDetailsDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public Guid ClubId { get; set; }
        public string ClubName { get; set; }

        public List<TeamManagerDto> TeamManagers { get; set; }
    }

    public class TeamManagerDto
    {
        public string UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
    }
}
