using EmployeeAdminPortal.Repositories;
using EmployeeAdminPortal.Repositories.Club;
using EmployeeAdminPortal.Repositories.Field;
using EmployeeAdminPortal.Repositories.Team;
using EmployeeAdminPortal.Repositories.User;
using EmployeeAdminPortal.Services.Club;
using EmployeeAdminPortal.Services.Field;
using EmployeeAdminPortal.Services.Team;
using EmployeeAdminPortal.Services.User;

namespace EmployeeAdminPortal.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddAppRepositories(this IServiceCollection services) 
        {
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IClubRepository, ClubRepository>();
            services.AddScoped<IFieldRepository, FieldRepository>();
            services.AddScoped<ITeamRepository, TeamRepository>();

            return services;
        }

        public static IServiceCollection AddAppServices(this IServiceCollection services)
        {
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IClubService, ClubService>();
            services.AddScoped<IFieldService, FieldService>();
            services.AddScoped<ITeamService, TeamService>();

            return services;
        }
    }
}
