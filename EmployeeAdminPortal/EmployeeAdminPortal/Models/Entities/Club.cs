namespace EmployeeAdminPortal.Models.Entities
{
    public class Club
    {
        public required Guid Id { get; set; }
        public required string Name { get; set; }
        public string? ShortName { get; set; }
        public string? Address { get; set; }
        public string? CountryCode { get; set; }
        public Boolean Activated { get; set; }

        public string? Description { get; set; }
        public string? ImageUrl { get; set; }
        public bool IsDeleted { get; set; } = false;
        public ICollection<Field> FieldList { get; set; }
        public ICollection<Team> TeamList { get; set; }
        //public ICollection<UserClub> UserClubs { get; set; }
        public ICollection<UserClubRole> UserClubRoles { get; set; }

    }
}
