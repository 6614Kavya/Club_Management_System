using EmployeeAdminPortal.Data;
using Microsoft.EntityFrameworkCore;

namespace EmployeeAdminPortal.Extensions
{
    public static class EFCoreExtensions
    {
        //AddDbContext is already there in IServiceCollection
        public static IServiceCollection InjectDbContext(this IServiceCollection services, IConfiguration config) 
        {
            services.AddDbContext<ApplicationDBContext>(options => options.UseSqlServer(config.GetConnectionString("DefaultConnection")));
            return services;
        }
    }
}
