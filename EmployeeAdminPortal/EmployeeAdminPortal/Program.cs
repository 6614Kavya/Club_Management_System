using System.Text;
using EmployeeAdminPortal.Data;
using EmployeeAdminPortal.Extensions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

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

//Inject DBContext class so that we can use it in controllers or any other class
builder.Services.InjectDbContext(builder.Configuration);

builder.Services.AddIdentityAuth(builder.Configuration);


builder.Services.AddAuthorization();

//Services from Identity core
builder.Services.AddIdentityHandlersAndStores();

//Identity service configurations
builder.Services.ConfigureIdentityOptions();


var app = builder.Build();

// Configure the HTTP request pipeline.
app.ConfigureSwaggerExplorer();

app.MapGroup("/api").MapIdentityApi<IdentityUser>();

app.UseHttpsRedirection();

app.UseCors();

app.AddIdentityAuthMiddlewares();

app.MapControllers();

app.Run();
