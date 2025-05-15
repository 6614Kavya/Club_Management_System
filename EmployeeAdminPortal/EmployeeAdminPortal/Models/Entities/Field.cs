namespace EmployeeAdminPortal.Models.Entities
{
    public class Field
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Address { get; set; }
        public string? Description { get; set; }
        public string[]? Facilities { get; set; }
        public Boolean HasLighting { get; set; }
        public Boolean HasHeating { get; set; }

        //one to many with Club
        public Club Club { get; set; }
        public Guid ClubId { get; set; }

        public ICollection<FieldPart>? FieldPart { get; set; }
        //public ICollection<UserField>? UserFields { get; set; }
        public ICollection<UserFieldRole>? UserFieldRoles { get; set; }

    }
}
