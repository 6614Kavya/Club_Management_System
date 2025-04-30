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
        public DbSet<UserClub> UserClubs { get; set; }
        public DbSet<UserField> UserFields { get; set; }
        public DbSet<UserTeam> UserTeams { get; set; }

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
                entity.Property(x => x.Name).IsRequired();
            });

            modelBuilder.Entity<Team>(entity =>
            {
                entity.HasKey(x => x.Id);
                entity.Property(x => x.Name).IsRequired();
            });

            modelBuilder.Entity<UserClub>(entity =>
            {
                entity.HasKey(uc => new { uc.UserId, uc.ClubId });

                entity.HasOne(uc => uc.User)
                .WithMany(c => c.UserClubs)
                .HasForeignKey(uc => uc.UserId);

                entity.HasOne(uc => uc.Club)
                .WithMany(c => c.UserClubs)
                .HasForeignKey(uc => uc.ClubId);
            });

            modelBuilder.Entity<UserField>(entity =>
            {
                entity.HasKey(uf => new { uf.UserId, uf.FieldId });

                entity.HasOne(uf => uf.User)
                .WithMany(f => f.UserFields)
                .HasForeignKey(uf => uf.UserId);

                entity.HasOne(uf => uf.Field)
                .WithMany(f => f.UserFields)
                .HasForeignKey(uf => uf.FieldId);
            });

            modelBuilder.Entity<UserTeam>(entity =>
            {
                entity.HasKey(ut => new { ut.UserId, ut.TeamId });

                entity.HasOne(ut => ut.User)
                .WithMany(t => t.UserTeams)
                .HasForeignKey(ut => ut.UserId);

                entity.HasOne(ut => ut.Team)
                .WithMany(t => t.UserTeams)
                .HasForeignKey(ut => ut.TeamId);
            });

        }
    }
}
