using System.Text;
using EmployeeAdminPortal.Data;
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
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Inject DBContext class so that we can use it in controllers or any other class
builder.Services.AddDbContext<ApplicationDBContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddAuthentication(x =>
                {
                    x.DefaultAuthenticateScheme =
                    x.DefaultChallengeScheme =
                    x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                }).AddJwtBearer(y=>
                {
                    y.SaveToken = false;
                    y.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                            builder.Configuration["AppSettings:JWTSecret"]!))
                    };
                }
                );


builder.Services.AddAuthorization();

//Services from Identity core
builder.Services.AddIdentityApiEndpoints<IdentityUser>().AddEntityFrameworkStores<ApplicationDBContext>();

//Identity service configurations
builder.Services.Configure<IdentityOptions>(options =>
{
    options.User.RequireUniqueEmail = true;
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGroup("/api").MapIdentityApi<IdentityUser>();

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
