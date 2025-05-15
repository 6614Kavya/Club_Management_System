using EmployeeAdminPortal.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace EmployeeAdminPortal.Data
{
    public class ApplicationDBContext : IdentityDbContext<User, IdentityRole, string>
    {
        public ApplicationDBContext(DbContextOptions options) : base(options)
        {
        }

        //Add property for the collection that we are going to store in the DB
        public DbSet<Employee> Employees { get; set; }
        //public DbSet<IdentityUser> IdentityUsers { get; set; }
        //public DbSet<User> Users { get; set; }
        public DbSet<Club> Clubs { get; set; }
        public DbSet<Field> Fields { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<FieldPart> FieldParts { get; set; }
        //public DbSet<UserClub> UserClubs { get; set; }
        //public DbSet<UserField> UserFields { get; set; }
        //public DbSet<UserTeam> UserTeams { get; set; }
        public DbSet<UserClubRole> UserClubRoles { get; set; }
        public DbSet<UserFieldRole> UserFieldRoles { get; set; }
        public DbSet<UserTeamRole> UserTeamRoles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>(entity =>
            {
                //entity.HasKey(x => x.Id);
                entity.Property(x => x.Email).IsRequired();
            });

            modelBuilder.Entity<Club>(entity =>
            {
                entity.HasKey(x => x.Id);
                entity.Property(x => x.Name).IsRequired();
            });

            modelBuilder.Entity<Field>(entity =>
            {
                entity.HasKey(x => x.Id);
                //entity.Property(x => x.Name).IsRequired();

                entity.HasOne(a => a.Club)
                .WithMany(b => b.FieldList)
                .HasForeignKey(a => a.ClubId);
            });

            modelBuilder.Entity<Team>(entity =>
            {
                entity.HasKey(x => x.Id);
                //entity.Property(x => x.Name).IsRequired();

                entity.HasOne(a => a.Club)
                .WithMany(b => b.TeamList)
                .HasForeignKey(a => a.ClubId);
            });

            modelBuilder.Entity<UserClubRole>(entity =>
            {
                entity.HasKey(uc => new { uc.UserId, uc.ClubId });

                entity.HasOne(uc => uc.User)
                .WithMany(c => c.UserClubRoles)
                .HasForeignKey(uc => uc.UserId);

                entity.HasOne(uc => uc.Club)
                .WithMany(c => c.UserClubRoles)
                .HasForeignKey(uc => uc.ClubId);
            });

            modelBuilder.Entity<UserFieldRole>(entity =>
            {
                entity.HasKey(uf => new { uf.UserId, uf.FieldId });

                entity.HasOne(uf => uf.User)
                .WithMany(f => f.UserFieldRoles)
                .HasForeignKey(uf => uf.UserId);

                entity.HasOne(uf => uf.Field)
                .WithMany(f => f.UserFieldRoles)
                .HasForeignKey(uf => uf.FieldId);
            });

            modelBuilder.Entity<UserTeamRole>(entity =>
            {
                entity.HasKey(ut => new { ut.UserId, ut.TeamId });

                entity.HasOne(ut => ut.User)
                .WithMany(t => t.UserTeamRoles)
                .HasForeignKey(ut => ut.UserId);

                entity.HasOne(ut => ut.Team)
                .WithMany(t => t.UserTeamRoles)
                .HasForeignKey(ut => ut.TeamId);
            });

            modelBuilder.Entity<FieldPart>(entity =>
            {
                entity.HasKey(x => x.Id);

                entity.HasOne(a => a.Field)
                .WithMany(b => b.FieldPart)
                .HasForeignKey(x => x.FieldId);
            });

        }
    }
}
