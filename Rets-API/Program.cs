using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Rets_API.Data;
using DotNetEnv;

var builder = WebApplication.CreateBuilder(args);

// ⛔ Disable HTTPS redirection
builder.Services.Configure<Microsoft.AspNetCore.HttpsPolicy.HttpsRedirectionOptions>(options =>
{
  options.HttpsPort = null;
});


builder.Services.AddMemoryCache();

// Load environment variables from .env file if in development mode
if (builder.Environment.IsDevelopment())
{
  Env.Load();
}

// Access the environment variables
// string connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? Environment.GetEnvironmentVariable("DATABASE_URL");
string? connectionString = Environment.GetEnvironmentVariable("DATABASE_URL"); 

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString, npgsqlOptions =>
    {
        npgsqlOptions.EnableRetryOnFailure();
        npgsqlOptions.CommandTimeout(60);
    })
    .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking)
);


builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
  c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
});

builder.Services.AddCors(options =>
{
  options.AddDefaultPolicy(policy =>
  {
    policy.WithOrigins(
          "http://localhost:8100",
          "https://rets-backend.onrender.com",
          "capacitor://localhost",
          "https://localhost",
          "http://10.78.177.197:8100"
      )
      .AllowAnyHeader()
      .AllowAnyMethod();
  });
});


builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
var app = builder.Build();

app.UseCors();

if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
    });
}

app.UseAuthorization();

app.MapControllers();

app.Run();