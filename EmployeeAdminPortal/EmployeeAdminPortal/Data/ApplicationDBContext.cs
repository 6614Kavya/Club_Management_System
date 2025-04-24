using EmployeeAdminPortal.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace EmployeeAdminPortal.Data
{
    public class ApplicationDBContext : IdentityDbContext
    {
        public ApplicationDBContext(DbContextOptions options) : base(options)
        {
        }

        //Add property for the collection that we are going to store in the DB
        public DbSet<Employee> Employees { get; set; }
        //public DbSet<IdentityUser> IdentityUsers { get; set; }
    }
}
