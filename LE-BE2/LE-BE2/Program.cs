using Microsoft.EntityFrameworkCore;
using SynonymReplacer.Models;

var builder = WebApplication.CreateBuilder(args);

var connectionString = "host=localhost;user=greenroutine;password=greenroutine;database=LearningEnvironment";
builder.Services.AddDbContext<QuizDbContext>(options => options.UseMySql(connectionString, new MySqlServerVersion(new Version(8, 0, 36))));
// Add services to the container.
builder.Services.AddControllersWithViews();

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "AllowReactApp",
        builder =>
            builder
                .WithOrigins("http://localhost:5173") // React app's URL
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials()
    );
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseCors("AllowReactApp");

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(name: "default", pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
