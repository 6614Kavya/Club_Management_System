namespace EmployeeAdminPortal.Models.Entities
{
    public class Club
    {
        public required Guid Id { get; set; }
        public required string Name { get; set; }
        public int CountryCode { get; set; }
        public Boolean Activated { get; set; }

        public string? Description { get; set; }
        public ICollection<Field> FieldList { get; set; }
        public ICollection<Team> TeamList { get; set; }
        public ICollection<UserClub> UserClubs { get; set; }
    }
}
