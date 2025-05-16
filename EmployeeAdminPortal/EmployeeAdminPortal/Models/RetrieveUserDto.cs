namespace EmployeeAdminPortal.Models
{
    public class UserRoleDetailsDto
    {
        public string UserId { get; set; }
        public string email { get; set; }
        public List<string> GlobalRoles { get; set; } = new();

        public List<ClubRoleDto> ClubRoles { get; set; } = new();
        public List<FieldRoleDto> FieldRoles { get; set; } = new();
        public List<TeamRoleDto> TeamRoles { get; set; } = new();



    }

    public class ClubRoleDto
    {
        public Guid ClubId { get; set; }
        public string ClubName { get; set; }
        public string Role { get; set; }

    }

    public class FieldRoleDto
    {
        public Guid FieldId { get; set; }
        public string FieldName { get; set; }
        public string Role { get; set; }

    }

    public class TeamRoleDto
    {
        public Guid TeamId { get; set; }
        public string TeamName { get; set; }
        public string Role { get; set; }

    }

    public class UserDto
    {
        public string UserId { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
    }
}
