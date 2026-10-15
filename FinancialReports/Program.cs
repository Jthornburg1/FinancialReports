using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddDbContext<ReportsDbContext>(options =>
    options.UseSqlite("Data Source=financialreports.db"));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

var transactions = new[]
    {
        new Transaction(1, "Checking", 1250.00m),
        new Transaction(2, "Checking", -85.50m),
        new Transaction(3, "Savings", 500.00m)
    };

app.MapGet("/transactions", () => transactions);

app.MapGet("/reports/summary", () => new
{
    count = transactions.Length,
    netAmount = transactions.Sum(t => t.Amount)
});

app.MapGet("reports/accounts", () =>
    transactions
        .GroupBy(t => t.Account)
        .Select(group => new
        {
            account = group.Key,
            netAmount = group.Sum(t => t.Amount)
        })
);

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}

public record Transaction(int Id, string Account, decimal Amount);
