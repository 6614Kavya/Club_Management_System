using System.Text;
using EmployeeAdminPortal.Data;
using EmployeeAdminPortal.Models.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace EmployeeAdminPortal.Extensions
{
    public static class IdentityExtensions
    {
        public static IServiceCollection AddIdentityHandlersAndStores(this IServiceCollection services)
        {
            //services.AddIdentityApiEndpoints<User>()
            //        .AddEntityFrameworkStores<ApplicationDBContext>();
            //return services;

            services.AddIdentity<User, IdentityRole>(options =>
            {
                // Optional: Add additional password/user settings here
                options.User.RequireUniqueEmail = true;
            })
            .AddEntityFrameworkStores<ApplicationDBContext>()
            .AddDefaultTokenProviders(); // Needed for password reset, email confirmation, etc.

            return services;

        }

        public static IServiceCollection ConfigureIdentityOptions(this IServiceCollection services)
        {
            services.Configure<IdentityOptions>(options =>
            {
                options.User.RequireUniqueEmail = true;
            });
            return services;

            //services.AddIdentity<User, IdentityRole>(options =>
            //{
            //    // Optional: Add additional password/user settings here
            //    options.User.RequireUniqueEmail = true;
            //})
            //.AddEntityFrameworkStores<ApplicationDBContext>()
            //.AddDefaultTokenProviders(); // Needed for password reset, email confirmation, etc.

            //return services;
        }

        //Authenticaion + Authorization
        public static IServiceCollection AddIdentityAuth(this IServiceCollection services, IConfiguration config)
        {
            //services.AddIdentity<User, IdentityRole>()
            //        .AddEntityFrameworkStores<ApplicationDBContext>()
            //        .AddDefaultTokenProviders();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(y =>
            {
                y.SaveToken = false;
                y.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                        config["AppSettings:JWTSecret"]!)),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                };
            }
                );
            return services;
        }




        public static WebApplication AddIdentityAuthMiddlewares(this WebApplication app)
        {
            app.UseAuthentication();

            app.UseAuthorization();
            return app;
        }
    }
}

















//using System.Text;
//using EmployeeAdminPortal.Data;
//using Microsoft.AspNetCore.Authentication.JwtBearer;
//using Microsoft.AspNetCore.Identity;
//using Microsoft.IdentityModel.Tokens;

//namespace EmployeeAdminPortal.Extensions
//{
//    public static class IdentityExtensions
//    {
//        public static IServiceCollection AddIdentityHandlersAndStores(this IServiceCollection services)
//        {
//            services.AddIdentityApiEndpoints<IdentityUser>()
//                    .AddEntityFrameworkStores<ApplicationDBContext>();
//            return services;
//        }

//        public static IServiceCollection ConfigureIdentityOptions(this IServiceCollection services)
//        {
//            services.Configure<IdentityOptions>(options =>
//            {
//                options.User.RequireUniqueEmail = true;
//            });
//            return services;
//        }

//        //Authenticaion + Authorization
//        public static IServiceCollection AddIdentityAuth(this IServiceCollection services, IConfiguration config)
//        {
//            services.AddAuthentication(x =>
//            {
//                x.DefaultAuthenticateScheme =
//                x.DefaultChallengeScheme =
//                x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
//            }).AddJwtBearer(y =>
//            {
//                y.SaveToken = false;
//                y.TokenValidationParameters = new TokenValidationParameters
//                {
//                    ValidateIssuerSigningKey = true,
//                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
//                        config["AppSettings:JWTSecret"]!))
//                };
//            }
//                );
//            return services;
//        }

//        public static WebApplication AddIdentityAuthMiddlewares(this WebApplication app)
//        {
//            app.UseAuthentication();

//            app.UseAuthorization();
//            return app;
//        }
//    }
//}

