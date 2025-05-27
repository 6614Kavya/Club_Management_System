using System.Text;
using EmployeeAdminPortal.Data;
using EmployeeAdminPortal.Extensions;
using EmployeeAdminPortal.Repositories.User;
using EmployeeAdminPortal.Repositories;
using EmployeeAdminPortal.Services.User;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
        options.JsonSerializerOptions.WriteIndented = true; // optional
        //options.JsonSerializerOptions.ReferenceHandler = null; // Or use IgnoreCycles if circular refs are possible
        //options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    });


var allowedOrigins = builder.Configuration.GetValue<string>("allowedOrigins");

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(allowedOrigins!).AllowAnyHeader().AllowAnyMethod();
    });
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddSwaggerExplorer();

builder.Services.AddAutoMapper(typeof(Program));

//Repositories and services
builder.Services.AddAppRepositories();
builder.Services.AddAppServices();

//Inject DBContext class so that we can use it in controllers or any other class
builder.Services.InjectDbContext(builder.Configuration);

builder.Services.AddIdentityAuth(builder.Configuration);


builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("ManageUsers", policy =>
    {
        policy.RequireAuthenticatedUser();
        policy.RequireRole("SuperAdmin");
    });
});

//Services from Identity core
builder.Services.AddIdentityHandlersAndStores();

//Identity service configurations
builder.Services.ConfigureIdentityOptions();


var app = builder.Build();

// Configure the HTTP request pipeline.
app.ConfigureSwaggerExplorer();

//app.MapGroup("/api").MapIdentityApi<IdentityUser>();

app.UseHttpsRedirection();

app.UseCors();

//app.AddIdentityAuthMiddlewares();
app.UseAuthentication();  // 
app.Use(async (context, next) =>
{
    var user = context.User;
    if (user.Identity?.IsAuthenticated == true)
    {
        var roles = string.Join(",", user.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value));
        Console.WriteLine($"Authenticated user: {user.Identity.Name}, Roles: {roles}");
    }
    else
    {
        Console.WriteLine("Unauthenticated request.");
    }
    await next();
});
app.UseAuthorization();   // 

//app.UseEndpoints(endpoints =>
//{
//    endpoints.MapControllers();
//});

app.MapControllers();

using(var scope = app.Services.CreateScope())
{
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

    var roles = new[] { "SuperAdmin", "ClubAdmin", "FieldAdmin", "TeamManager", "IndividualUser" };

    foreach (var role in roles)
    {
        if (!await roleManager.RoleExistsAsync(role))
        {
            await roleManager.CreateAsync(new IdentityRole(role));
        }
    }
}

app.Run();
